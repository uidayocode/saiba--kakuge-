/* ================================================================
 * オンライン対戦（net.js）
 *   Snap       : 試合（Match）の状態を丸ごと複製する。ロールバックの巻き戻しに使う
 *   Net        : 相手との通信。WebRTC のデータチャネルで直接つなぐ。
 *                最初の仲介（相手を見つけるだけ）は PeerJS の公開サーバーを使う（登録不要）
 *   NetSession : ロールバック。相手の入力は「直前と同じ」と予想して進め、
 *                本当の入力が届いて違っていたら、そのフレームまで巻き戻して計算し直す
 * 試合は「同じ seed・同じ入力 → 同じ結果」になる（決定的）ことが前提。
 * 対戦シーンから Match の中身を直接書き換えると、両者の試合がずれるので注意。
 * ================================================================ */
/* game.html の中から DennoNet(env) を呼んで組み立てる（env: Game / FX / NullFX / Match / HASH を返すゲッター） */
window.DennoNet = function (E) {
'use strict';

/* ---------------- Snap: 状態の複製 ---------------- */
const Snap = {
  shared: null,
  /* キャラデータなど、試合中に変わらないものは複製せず同じものを指す */
  init() {
    if (this.shared) return;
    const S = new Set(), st = [E.Game.chars, E.Game.data];
    while (st.length) {
      const o = st.pop();
      if (!o || typeof o !== 'object' || S.has(o)) continue;
      S.add(o);
      for (const k in o) { const v = o[k]; if (v && typeof v === 'object') st.push(v); }
    }
    S.add(E.FX); S.add(E.NullFX);
    this.shared = S;
  },
  clone(o, map) {
    if (o === null || typeof o !== 'object') return o;
    if (this.shared.has(o)) return o;
    const got = map.get(o);
    if (got) return got;
    if (ArrayBuffer.isView(o)) { const c = o.slice(); map.set(o, c); return c; }
    if (Array.isArray(o)) {
      const c = new Array(o.length); map.set(o, c);
      for (let i = 0; i < o.length; i++) c[i] = this.clone(o[i], map);
      return c;
    }
    const c = Object.create(Object.getPrototypeOf(o)); map.set(o, c);
    const ks = Object.keys(o);
    for (let i = 0; i < ks.length; i++) c[ks[i]] = this.clone(o[ks[i]], map);
    return c;
  },
  save(m) {
    this.init();
    const fx = m.fx; m.fx = E.NullFX;
    const c = this.clone(m, new Map());
    m.fx = fx;
    return c;
  },
  load(s, fx) { this.init(); const m = this.clone(s, new Map()); m.fx = fx || E.NullFX; return m; },
  /* 同期ずれ検出用のチェックサム（勝敗に関わる値だけ） */
  sum(m) {
    let h = 2166136261 >>> 0;
    const add = v => { h = Math.imul(h ^ (v | 0), 16777619) >>> 0; };
    const q = x => Math.round((x || 0) * 64);
    const str = s => { s = String(s || ''); for (let i = 0; i < s.length; i++) add(s.charCodeAt(i)); };
    add(m.frame); add(m.rng.s); add(m.round); add(m.timer); add(m.wins[0]); add(m.wins[1]); str(m.phase);
    for (const f of m.fighters) {
      add(q(f.x)); add(q(f.y)); add(q(f.vx)); add(q(f.vy)); add(f.hp); add(q(f.gauge)); add(q(f.shield));
      add(f.facing); str(f.state); add(f.stateT); add(f.hitstop);
    }
    for (const p of m.projs.list) { add(q(p.x)); add(q(p.y)); }
    return h >>> 0;
  }
};

/* ---------------- NetTest: 接続テスト ----------------
 * 1) 仲介サーバー（部屋番号の受け渡し）に届くか
 * 2) 回線の種類: 2つの STUN サーバーから見た自分の外向きの番号（ポート）が同じなら「直接つながりやすい」、
 *    違えば「相手によってはつながらない」（対称型NAT）、外向きの番号が取れなければ UDP が通らない
 * 3) 中継サーバー（Net.TURN が設定されていれば）が使えるか */
const NetTest = {
  state: 'idle', res: null, t0: 0,
  start() {
    this.stop();
    this.state = 'running'; this.t0 = performance.now();
    const r = this.res = { signal: 'wait', nat: 'wait', turn: Net.TURN.length ? 'wait' : 'none' };
    /* 1) 仲介サーバー */
    try {
      const id = Net.PREFIX + 't' + Net.rnd(10, 'abcdefghijklmnopqrstuvwxyz0123456789');
      const ws = new WebSocket(Net.server() + '?key=' + Net.KEY + '&id=' + id + '&token=' + Net.rnd(12, 'abcdefghijklmnopqrstuvwxyz0123456789') + '&version=1.5.4');
      this.ws = ws;
      ws.onmessage = e => { let m = null; try { m = JSON.parse(e.data); } catch (er) { return; } if (m && m.type === 'OPEN') { r.signal = 'ok'; try { ws.close(); } catch (er) { } } else if (m && m.type === 'ERROR') r.signal = 'ng'; };
      ws.onerror = () => { if (r.signal === 'wait') r.signal = 'ng'; };
      ws.onclose = () => { if (r.signal === 'wait') r.signal = 'ng'; };
    } catch (e) { r.signal = 'ng'; }
    /* 2) 3) STUN / TURN */
    try {
      const pc = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun.cloudflare.com:3478' }].concat(Net.TURN) });
      this.pc = pc;
      const ports = {}; let relay = false;
      pc.onicecandidate = e => {
        const c = e.candidate;
        if (!c) { this.finishIce(ports, relay); return; }
        const t = / typ (\w+)/.exec(c.candidate), typ = t ? t[1] : '';
        const parts = c.candidate.split(' '), port = parts[5], base = (/ rport (\d+)/.exec(c.candidate) || [])[1];
        if (typ === 'srflx') { const k = base || 'x'; (ports[k] = ports[k] || {})[port] = 1; }
        if (typ === 'relay') relay = true;
      };
      pc.createDataChannel('t');
      pc.createOffer().then(o => pc.setLocalDescription(o)).catch(() => { r.nat = 'ng'; });
      this.ports = ports; this.relayRef = () => relay;
    } catch (e) { r.nat = 'ng'; if (r.turn === 'wait') r.turn = 'ng'; }
  },
  finishIce(ports, relay) {
    const r = this.res; if (!r || r.nat !== 'wait') return;
    const sets = Object.keys(ports).map(k => Object.keys(ports[k]).length);
    if (!sets.length) r.nat = 'udp';                         /* 外向きの番号が取れない = UDP が通らない */
    else r.nat = sets.some(n => n > 1) ? 'sym' : 'open';    /* 同じ自分から 2つの番号 = 相手ごとに番号が変わる回線 */
    if (r.turn === 'wait') r.turn = relay ? 'ok' : 'ng';
  },
  /* 毎フレーム呼ぶ。8秒で打ち切り */
  poll() {
    if (this.state !== 'running') return;
    const r = this.res, late = performance.now() - this.t0 > 8000;
    if (late) {
      if (r.signal === 'wait') r.signal = 'ng';
      if (r.nat === 'wait') this.finishIce(this.ports || {}, this.relayRef ? this.relayRef() : false);
    }
    if (r.signal !== 'wait' && r.nat !== 'wait' && r.turn !== 'wait') { this.state = 'done'; this.stop(true); }
  },
  stop(keep) {
    try { if (this.ws) this.ws.close(); } catch (e) { } this.ws = null;
    try { if (this.pc) this.pc.close(); } catch (e) { } this.pc = null;
    if (!keep) { this.state = 'idle'; }
  }
};

/* ---------------- Net: 通信 ---------------- */
const Net = {
  SERVER: 'wss://0.peerjs.com:443/peerjs', KEY: 'peerjs', PREFIX: 'denno-houno-',
  ICE: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' }],
  /* 中継サーバー（TURN）。直接つながらないときだけ使われる。例:
   * { urls: ['turn:xxx.metered.live:80', 'turn:xxx.metered.live:443?transport=tcp', 'turns:xxx.metered.live:443'], username: '...', credential: '...' } */
  TURN: (() => {
    /* Metered の Open Relay（無料枠 月50GB。ユーザーのアカウント） */
    const u = '8dccf83b38918bd185fe278d', c = 'oU1a/TYS+1yBCrXn';
    return [
      { urls: 'stun:stun.relay.metered.ca:80' },
      { urls: 'turn:global.relay.metered.ca:80', username: u, credential: c },
      { urls: 'turn:global.relay.metered.ca:80?transport=tcp', username: u, credential: c },
      { urls: 'turn:global.relay.metered.ca:443', username: u, credential: c },
      { urls: 'turns:global.relay.metered.ca:443?transport=tcp', username: u, credential: c }
    ];
  })(),
  iceServers() { return this.ICE.concat(this.TURN); },
  state: 'idle',          /* idle / signaling / waiting(部屋で待機) / connecting / open / closed / error */
  role: null, code: '', err: '', myId: '', peerId: '',
  ws: null, pc: null, ch: {}, inbox: [], candQ: [], hb: 0, pingT: 0, rtt: 0, deadline: 0,
  route: '', routeT: 0,     /* 通信の経路: 'lan'（同じネットワーク）/ 'direct'（直接）/ 'relay'（中継サーバー経由）/ ''（不明） */
  onInput: null,          /* 入力パケットの受け手（NetSession） */
  sim: null,              /* テスト用: { lat: ms, jit: ms, loss: 0..1 } で遅延・パケット落ちを再現 */
  server() {
    const p = (E.HASH && E.HASH.p) || {};
    return typeof p.signal === 'string' ? p.signal : this.SERVER;
  },
  rnd(n, chars) { let s = ''; for (let i = 0; i < n; i++) s += chars[Math.floor(Math.random() * chars.length)]; return s; },
  /* 部屋を作る（4桁の部屋番号） */
  host() {
    this.close(true);
    this.role = 'host'; this.code = this.rnd(4, '0123456789'); this.myId = this.PREFIX + this.code;
    this.openWs();
  },
  /* 部屋に入る */
  join(code) {
    this.close(true);
    this.role = 'guest'; this.code = code; this.peerId = this.PREFIX + code;
    this.myId = this.PREFIX + 'g' + this.rnd(10, 'abcdefghijklmnopqrstuvwxyz0123456789');
    this.openWs();
  },
  openWs() {
    this.state = 'signaling'; this.err = '';
    this.deadline = performance.now() + 15000;
    const url = this.server() + '?key=' + this.KEY + '&id=' + encodeURIComponent(this.myId) + '&token=' + this.rnd(12, 'abcdefghijklmnopqrstuvwxyz0123456789') + '&version=1.5.4';
    let ws;
    try { ws = new WebSocket(url); } catch (e) { this.fail('仲介サーバーにつながりません'); return; }
    this.ws = ws;
    ws.onmessage = e => { let m = null; try { m = JSON.parse(e.data); } catch (er) { return; } this.onSig(m); };
    ws.onerror = () => { if (this.state === 'signaling') this.fail('仲介サーバーにつながりません'); };
    ws.onclose = () => { if (this.ws === ws) this.ws = null; if (this.state === 'signaling' || this.state === 'waiting') this.fail('仲介サーバーとの接続が切れました'); };
    clearInterval(this.hb);
    this.hb = setInterval(() => this.wsSend({ type: 'HEARTBEAT' }), 5000);
  },
  /* 大部屋: 対戦する2人だけを直接つなぐ。最初の仲介は部屋（ホスト）経由で行う
   * role: 'host'（P1・相手の申し込みを待つ）/ 'guest'（P2・申し込む）。sig: 仲介メッセージの送り先 */
  viaRoom(role, peerId, sig, n) {
    this.close(true);
    this.role = role; this.peerId = peerId; this.myId = ''; this.code = ''; this.sig = sig; this.roomN = n;
    this.state = 'connecting'; this.deadline = performance.now() + 25000;
    if (role === 'guest') this.offer();
  },
  wsSend(o) { if (this.sig) { this.sig(o); return; } try { if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify(o)); } catch (e) { /* 無視 */ } },
  onSig(m) {
    switch (m.type) {
      case 'OPEN':
        if (this.role === 'host') { this.state = 'waiting'; this.deadline = 0; }
        else this.offer();
        break;
      case 'ID-TAKEN':
        /* 部屋番号がたまたま使われていた → 別の番号で作り直す */
        if (this.role === 'host') this.host(); else this.join(this.code);
        break;
      case 'ERROR': this.fail('仲介サーバーのエラー: ' + ((m.payload && m.payload.msg) || '')); break;
      case 'OFFER':
        if (this.role !== 'host' || this.pc) return;   /* すでに相手がいる */
        this.peerId = m.src; this.answer(m.payload);
        break;
      case 'ANSWER':
        if (this.pc && m.payload && m.payload.sdp) this.pc.setRemoteDescription(m.payload.sdp).then(() => this.flushCand()).catch(() => this.fail('接続の準備に失敗しました'));
        break;
      case 'CANDIDATE':
        if (m.payload && m.payload.candidate) {
          if (this.pc && this.pc.remoteDescription) this.pc.addIceCandidate(m.payload.candidate).catch(() => { });
          else this.candQ.push(m.payload.candidate);
        }
        break;
      case 'EXPIRE': if (this.state !== 'open') this.fail('部屋が見つかりません（番号を確かめてください）'); break;
      case 'LEAVE': if (this.state !== 'open' && this.role === 'guest') this.fail('相手が部屋を閉じました'); break;
      default: break;
    }
  },
  flushCand() { const q = this.candQ; this.candQ = []; q.forEach(c => this.pc.addIceCandidate(c).catch(() => { })); },
  newPc() {
    /* #relay=1 で中継サーバーだけを使う（確認用） */
    const hp = (E.HASH && E.HASH.p) || {};
    const pc = new RTCPeerConnection({ iceServers: this.iceServers(), iceTransportPolicy: hp.relay ? 'relay' : 'all' });
    pc.onicecandidate = e => { if (e.candidate) this.wsSend({ type: 'CANDIDATE', payload: { candidate: e.candidate, type: 'data', connectionId: this.cid }, dst: this.peerId }); };
    pc.onconnectionstatechange = () => {
      const s = pc.connectionState;
      if (s === 'failed') { if (this.state === 'open') this.lost(); else this.fail('相手とつながりませんでした（ネットワークの制限かもしれません）'); }
      else if (s === 'closed' && this.state === 'open') this.lost();
    };
    this.pc = pc;
    return pc;
  },
  offer() {
    this.state = 'connecting'; this.deadline = performance.now() + 20000;
    const cid = this.cid = 'dc_' + this.rnd(10, 'abcdefghijklmnopqrstuvwxyz0123456789');
    const pc = this.newPc();
    this.chan(pc.createDataChannel('ctl', { ordered: true }));
    this.chan(pc.createDataChannel('inp', { ordered: false, maxRetransmits: 0 }));
    pc.createOffer().then(o => pc.setLocalDescription(o)).then(() => {
      this.wsSend({ type: 'OFFER', payload: { sdp: pc.localDescription, type: 'data', connectionId: cid, label: cid, reliable: false, serialization: 'json', browser: 'chrome' }, dst: this.peerId });
    }).catch(() => this.fail('接続の準備に失敗しました'));
  },
  answer(payload) {
    this.state = 'connecting'; this.deadline = performance.now() + 20000;
    this.cid = payload.connectionId;
    const pc = this.newPc();
    pc.ondatachannel = e => this.chan(e.channel);
    pc.setRemoteDescription(payload.sdp).then(() => { this.flushCand(); return pc.createAnswer(); })
      .then(a => pc.setLocalDescription(a)).then(() => {
        this.wsSend({ type: 'ANSWER', payload: { sdp: pc.localDescription, type: 'data', connectionId: payload.connectionId, browser: 'chrome' }, dst: this.peerId });
      }).catch(() => this.fail('接続の準備に失敗しました'));
  },
  chan(c) {
    this.ch[c.label] = c;
    c.onopen = () => this.checkOpen();
    c.onmessage = e => this.recv(e.data);
    c.onclose = () => { if (this.state === 'open') this.lost(); };
  },
  /* 使われている候補の組（selected candidate pair）の種類から経路を判定する */
  checkRoute() {
    const pc = this.pc;
    if (!pc || !pc.getStats) return;
    pc.getStats().then(st => {
      let pair = null; const byId = {};
      st.forEach(r => { byId[r.id] = r; });
      st.forEach(r => { if (r.type === 'transport' && r.selectedCandidatePairId) pair = byId[r.selectedCandidatePairId]; });
      if (!pair) st.forEach(r => { if (r.type === 'candidate-pair' && r.state === 'succeeded' && (r.nominated || r.selected) && !pair) pair = r; });
      if (!pair) return;
      const lc = byId[pair.localCandidateId], rc = byId[pair.remoteCandidateId];
      const lt = lc && lc.candidateType, rt = rc && rc.candidateType;
      this.route = (lt === 'relay' || rt === 'relay') ? 'relay' : (lt === 'host' && rt === 'host') ? 'lan' : 'direct';
    }).catch(() => { });
  },
  checkOpen() {
    const a = this.ch.ctl, b = this.ch.inp;
    if (this.state === 'open' || !a || !b || a.readyState !== 'open' || b.readyState !== 'open') return;
    this.state = 'open'; this.deadline = 0; this.lastRecv = performance.now();
    /* つながったら仲介サーバーはもう要らない（部屋番号も空く） */
    clearInterval(this.hb); try { if (this.ws) this.ws.close(); } catch (e) { /* 無視 */ } this.ws = null;
    clearInterval(this.pingT);
    this.pingT = setInterval(() => this.sendInp({ t: 'ping', s: performance.now() }), 500);
    /* 経路はつながった直後と、その後も3秒ごとに調べ直す（途中で切り替わることがある） */
    clearInterval(this.routeT); this.route = ''; this.checkRoute();
    this.routeT = setInterval(() => this.checkRoute(), 3000);
  },
  /* 確実に届く順番どおりのチャネル（キャラ選択・再戦など） */
  send(o) {
    const c = this.ch.ctl; if (!c || c.readyState !== 'open') return;
    const s = JSON.stringify(o);
    if (this.sim && this.sim.lat) setTimeout(() => { try { c.send(s); } catch (e) { /* 無視 */ } }, this.sim.lat);
    else try { c.send(s); } catch (e) { /* 無視 */ }
  },
  /* 落ちてもよい速いチャネル（入力。毎回まとめて送るので1つ落ちても次で補える） */
  sendInp(o) {
    const c = this.ch.inp; if (!c || c.readyState !== 'open') return;
    const s = JSON.stringify(o), S = this.sim;
    if (S) {
      if (S.loss && Math.random() < S.loss) return;
      const d = (S.lat || 0) + (S.jit ? Math.random() * S.jit : 0);
      if (d > 0) { setTimeout(() => { try { c.send(s); } catch (e) { /* 無視 */ } }, d); return; }
    }
    try { c.send(s); } catch (e) { /* 無視 */ }
  },
  recv(data) {
    let m = null; try { m = JSON.parse(data); } catch (e) { return; }
    this.lastRecv = performance.now();
    if (m.t === 'ping') { this.sendInp({ t: 'pong', s: m.s }); return; }
    if (m.t === 'pong') { const r = performance.now() - m.s; this.rtt = this.rtt ? this.rtt * 0.8 + r * 0.2 : r; return; }
    if (m.t === 'bye') { this.lost('相手が退出しました'); return; }
    if ((m.t === 'i' || m.t === 'chk') && this.onInput) { this.onInput(m); return; }
    this.inbox.push(m);
  },
  /* 受け取ったメッセージを種類で取り出す */
  take(t) { const i = this.inbox.findIndex(m => m.t === t); return i < 0 ? null : this.inbox.splice(i, 1)[0]; },
  /* 接続待ちのタイムアウト（シーンの update から呼ぶ） */
  poll() {
    /* 相手から何も届かなくなった（ブラウザを閉じた・回線が切れた） */
    if (this.state === 'open' && performance.now() - this.lastRecv > 8000) { this.lost('相手からの応答がありません（切断されました）'); return; }
    if (this.deadline && performance.now() > this.deadline && (this.state === 'signaling' || this.state === 'connecting')) {
      this.fail(this.state === 'signaling' ? '仲介サーバーにつながりません' : '相手とつながりませんでした（ネットワークの制限かもしれません）');
    }
  },
  lost(msg) { if (this.state !== 'open') return; this.state = 'closed'; this.err = msg || '相手との接続が切れました'; this.cleanup(); },
  fail(msg) { this.state = 'error'; this.err = msg; this.cleanup(); },
  cleanup() {
    clearInterval(this.hb); clearInterval(this.pingT); clearInterval(this.routeT); this.hb = 0; this.pingT = 0; this.routeT = 0; this.deadline = 0; this.route = '';
    try { if (this.ws) this.ws.close(); } catch (e) { /* 無視 */ }
    try { if (this.pc) this.pc.close(); } catch (e) { /* 無視 */ }
    this.ws = null; this.pc = null; this.ch = {}; this.candQ = []; this.onInput = null;
  },
  /* 自分から切る。quiet なら状態だけ戻す */
  close(quiet) {
    if (this.state === 'open') { try { this.ch.ctl.send(JSON.stringify({ t: 'bye' })); } catch (e) { /* 無視 */ } }
    this.cleanup();
    this.state = 'idle'; this.inbox = []; this.rtt = 0; this.sig = null; this.roomN = 0;
    if (!quiet) { this.role = null; this.code = ''; this.err = ''; }
  },
  isOpen() { return this.state === 'open'; }
};
/* ページを閉じるときは相手に知らせる */
window.addEventListener('pagehide', () => { if (Net.state === 'open') Net.close(); });

/* ---------------- NetSession: ロールバック ---------------- */
class NetSession {
  /* local: 自分が操作するスロット（ホスト 0 / ゲスト 1）。args: Match の引数（seed 込み） */
  constructor(local, args) {
    this.local = local; this.remote = 1 - local;
    this.delay = 2;        /* 自分の入力を何フレーム先に使うか（予想の外れを減らす） */
    this.maxRb = 10;       /* 予想で先に進めてよいフレーム数。これ以上は相手の入力を待つ */
    this.inp = [[], []];   /* フレームごとの入力 */
    this.known = -1;       /* 相手の入力が途切れずに届いている最後のフレーム */
    this.peerAck = -1;     /* 相手が受け取った自分の入力の最後のフレーム */
    this.frame = 0;        /* 次に進めるフレーム */
    this.used = [];        /* そのフレームで使った相手の入力（予想を含む） */
    this.snaps = new Map();
    this.rbFrom = -1;
    this.remoteFrame = 0; this.tickN = 0; this.waitT = 0;
    this.stats = { rb: 0, rbFrames: 0, maxRb: 0, stall: 0 };
    this.chk = {}; this.remoteChk = {}; this.tsum = {}; this.desync = -1;
    this.match = new E.Match(Object.assign({}, args, { fx: E.FX }));
    Net.onInput = m => this.onMsg(m);
  }
  onMsg(m) {
    if (m.t === 'chk') { this.remoteChk[m.f] = m.h; this.cmpChk(m.f); return; }
    if (m.ack > this.peerAck) this.peerAck = m.ack;
    if (m.fr > this.remoteFrame) this.remoteFrame = m.fr;
    const R = this.inp[this.remote];
    for (let k = 0; k < m.a.length; k++) {
      const f = m.s + k;
      if (f <= this.known) continue;
      if (f !== this.known + 1) break;
      R[f] = m.a[k]; this.known = f;
      /* もう進めたフレームで、予想と違っていた → そこから計算し直す */
      if (f < this.frame && this.used[f] !== m.a[k] && (this.rbFrom < 0 || f < this.rbFrom)) this.rbFrom = f;
    }
    /* 確定したフレームの巻き戻し用データは要らない（これから巻き戻す所は残す） */
    for (const f of this.snaps.keys()) if (f <= this.known && (this.rbFrom < 0 || f < this.rbFrom)) this.snaps.delete(f);
  }
  sendInputs() {
    const L = this.inp[this.local], to = this.frame + this.delay;
    let from = this.peerAck + 1;
    if (to - from > 150) from = to - 150;   /* 長く届いていないとき（通常は起きない） */
    const a = [];
    for (let f = Math.max(0, from); f <= to; f++) a.push(L[f] | 0);
    Net.sendInp({ t: 'i', s: Math.max(0, from), a: a, ack: this.known, fr: this.frame });
  }
  /* 1 フレーム分。進めたら true、相手を待つなら false */
  tick(mask) {
    this.tickN++;
    const lf = this.frame + this.delay;
    if (this.inp[this.local][lf] === undefined) this.inp[this.local][lf] = mask | 0;
    this.sendInputs();
    if (this.rbFrom >= 0) this.rollback();
    this.finalize();
    /* 予想で進みすぎ → 待つ */
    if (this.frame - this.known > this.maxRb) { this.stats.stall++; this.waitT++; return false; }
    /* 相手より先に進んでいたら、ときどき 1 フレーム待って足並みをそろえる */
    const est = this.remoteFrame + (Net.rtt / 2) / (1000 / 60);
    const ahead = this.frame - est;
    if (ahead > 2 && this.tickN % (ahead > 5 ? 2 : 4) === 0) { this.stats.stall++; return false; }
    this.waitT = 0;
    this.stepFrame(this.frame);
    this.frame++;
    return true;
  }
  stepFrame(f) {
    const m = this.match, R = this.inp[this.remote];
    const li = this.inp[this.local][f] | 0;
    const pred = f > this.known;
    const ri = pred ? (this.known >= 0 ? R[this.known] | 0 : 0) : R[f] | 0;
    if (pred) this.snaps.set(f, Snap.save(m));
    this.used[f] = ri;
    m.step(this.local === 0 ? [li, ri] : [ri, li]);
    /* ときどき状態のチェックサムを取っておき、入力が確定したら相手と見比べる（finalize） */
    if (f % 30 === 0) this.tsum[f] = Snap.sum(m);
  }
  /* 入力が確定したフレームのチェックサムを送る（巻き戻しが済んだ後に呼ぶ） */
  finalize() {
    for (const k in this.tsum) {
      const f = +k;
      if (f > this.known || f >= this.frame || (this.rbFrom >= 0 && f >= this.rbFrom)) continue;
      const h = this.tsum[k]; delete this.tsum[k];
      this.chk[f] = h;
      Net.send({ t: 'chk', f: f, h: h });
      this.cmpChk(f);
    }
  }
  rollback() {
    const r = this.rbFrom; this.rbFrom = -1;
    const s = this.snaps.get(r);
    if (!s) return;
    const target = this.frame;
    this.match = Snap.load(s, E.NullFX);   /* 計算し直しの途中は演出・音を出さない */
    for (let f = r; f < target; f++) {
      this.stepFrame(f);
      /* 正しい入力では試合がここで終わっていた → その先は無かったことにする */
      if (this.match.ended) { this.frame = f + 1; break; }
    }
    this.match.fx = E.FX;
    this.stats.rb++; this.stats.rbFrames += target - r; this.stats.maxRb = Math.max(this.stats.maxRb, target - r);
  }
  cmpChk(f) {
    if (this.chk[f] === undefined || this.remoteChk[f] === undefined) return;
    if (this.chk[f] !== this.remoteChk[f] && this.desync < 0) this.desync = f;
    delete this.chk[f]; delete this.remoteChk[f];
  }
  /* 全フレームの入力が確定しているか（試合終了の判定に使う） */
  settled() { return this.known >= this.frame - 1 && this.rbFrom < 0; }
  /* リプレイ用: 確定した入力の列 */
  record() {
    const out = [];
    for (let f = 0; f < this.frame; f++) {
      const li = this.inp[this.local][f] | 0, ri = this.inp[this.remote][f] | 0;
      out.push(this.local === 0 ? [li, ri] : [ri, li]);
    }
    return out;
  }
}

/* ---------------- Room: 大部屋（最大6人・負け抜け・観戦・チャット） ----------------
 * ホストが部屋の中心。みんなはホストとだけつながり、メンバー表・順番・チャット・観戦用の入力はホストが配る。
 * 対戦する 2人だけは Net（上）で直接つなぐ（その仲介もホスト経由）。
 * 観戦: P1 側の対戦者が「確定した入力」をホストへ送り、ホストが観戦者に配る。観戦者は同じ試合を少し遅れて再生する */
const AZ = 'abcdefghijklmnopqrstuvwxyz0123456789';
/* 仲介サーバー（PeerJS）への接続。onMsg(m) / onDown() */
function sigSocket(id, onMsg, onDown) {
  const url = Net.server() + '?key=' + Net.KEY + '&id=' + encodeURIComponent(id) + '&token=' + Net.rnd(12, AZ) + '&version=1.5.4';
  let ws;
  try { ws = new WebSocket(url); } catch (e) { setTimeout(onDown, 0); return { send() { }, close() { } }; }
  const S = {
    closed: false,
    send(o) { try { if (ws.readyState === 1) ws.send(JSON.stringify(o)); } catch (e) { /* 無視 */ } },
    close() { S.closed = true; clearInterval(hb); try { ws.close(); } catch (e) { /* 無視 */ } }
  };
  const hb = setInterval(() => S.send({ type: 'HEARTBEAT' }), 5000);
  ws.onmessage = e => { let m = null; try { m = JSON.parse(e.data); } catch (er) { return; } if (!S.closed) onMsg(m); };
  ws.onerror = ws.onclose = () => { clearInterval(hb); if (!S.closed) { S.closed = true; onDown(); } };
  return S;
}
/* 部屋の中の 1本の接続（確実に届く順番どおりのチャネル 1本） */
class Link {
  constructor(peerId, sig, h) {
    this.peerId = peerId; this.sig = sig; this.h = h;
    this.pc = null; this.ch = null; this.candQ = []; this.state = 'connecting';
    this.t0 = performance.now(); this.lastRecv = this.t0;
    /* 生存確認は setInterval で（タブが裏にあっても動くように） */
    this.timer = setInterval(() => this.tick(), 1000);
  }
  newPc() {
    const hp = (E.HASH && E.HASH.p) || {};
    const pc = new RTCPeerConnection({ iceServers: Net.iceServers(), iceTransportPolicy: hp.relay ? 'relay' : 'all' });
    pc.onicecandidate = e => { if (e.candidate) this.sig({ type: 'CANDIDATE', payload: { candidate: e.candidate, type: 'data', connectionId: this.cid }, dst: this.peerId }); };
    pc.onconnectionstatechange = () => { if (pc.connectionState === 'failed') this.down(); };
    this.pc = pc;
    return pc;
  }
  offer() {
    this.cid = 'dc_' + Net.rnd(10, AZ);
    const pc = this.newPc();
    this.chan(pc.createDataChannel('room', { ordered: true }));
    pc.createOffer().then(o => pc.setLocalDescription(o)).then(() => {
      this.sig({ type: 'OFFER', payload: { sdp: pc.localDescription, type: 'data', connectionId: this.cid, label: this.cid, reliable: true, serialization: 'json', browser: 'chrome' }, dst: this.peerId });
    }).catch(() => this.down());
  }
  answer(p) {
    this.cid = p.connectionId;
    const pc = this.newPc();
    pc.ondatachannel = e => this.chan(e.channel);
    pc.setRemoteDescription(p.sdp).then(() => { this.flush(); return pc.createAnswer(); })
      .then(a => pc.setLocalDescription(a)).then(() => {
        this.sig({ type: 'ANSWER', payload: { sdp: pc.localDescription, type: 'data', connectionId: this.cid, browser: 'chrome' }, dst: this.peerId });
      }).catch(() => this.down());
  }
  onSig(m) {
    const pc = this.pc; if (!pc || !m.payload) return;
    if (m.type === 'ANSWER' && m.payload.sdp) pc.setRemoteDescription(m.payload.sdp).then(() => this.flush()).catch(() => this.down());
    else if (m.type === 'CANDIDATE' && m.payload.candidate) {
      if (pc.remoteDescription) pc.addIceCandidate(m.payload.candidate).catch(() => { });
      else this.candQ.push(m.payload.candidate);
    }
  }
  flush() { const q = this.candQ; this.candQ = []; q.forEach(c => this.pc.addIceCandidate(c).catch(() => { })); }
  chan(c) {
    this.ch = c;
    c.onopen = () => { if (this.state !== 'connecting') return; this.state = 'open'; this.lastRecv = performance.now(); this.h.open(this); };
    c.onmessage = e => {
      this.lastRecv = performance.now();
      let m = null; try { m = JSON.parse(e.data); } catch (er) { return; }
      if (m && m.t !== 'hb' && this.state === 'open') this.h.msg(m, this);
    };
    c.onclose = () => this.down();
  }
  send(o) { const c = this.ch; if (!c || c.readyState !== 'open') return; try { c.send(JSON.stringify(o)); } catch (e) { /* 無視 */ } }
  tick() {
    const now = performance.now();
    if (this.state === 'open') { this.send({ t: 'hb' }); if (now - this.lastRecv > 20000) this.down(); }
    else if (this.state === 'connecting' && now - this.t0 > 25000) this.down();
  }
  down() { if (this.state === 'down') return; this.close(); this.h.down(this); }
  close() { this.state = 'down'; clearInterval(this.timer); try { if (this.pc) this.pc.close(); } catch (e) { /* 無視 */ } }
}

const Room = {
  MAX: 6,
  state: 'idle',   /* idle / signaling / connecting / joining / open / closed / error */
  role: null, code: '', myId: '', hostId: '', name: '', err: '', deadline: 0, watch: false,
  sock: null, sockOk: false, reT: 0, links: {},
  members: [], order: [], cur: null, champ: null, streak: 0, cap: 0, n: 0, autoAt: 0,
  log: [], spec: null, pendingStart: 0, myMatch: 0, sigQ: [], ver: 0,
  onChat: null,    /* チャットが届いたとき（音など。ゲーム側で設定） */
  active() { return this.state === 'open'; },
  isHost() { return this.role === 'host'; },
  member(id) { for (const m of this.members) if (m.id === id) return m; return null; },
  nameOf(id) { const m = this.member(id); return m ? m.name : '？'; },
  isFighter(id) { const c = this.cur; return !!c && (c.a === id || c.b === id); },
  cleanName(s) { s = String(s || '').replace(/[\u0000-\u001f\u007f]/g, '').trim().slice(0, 10); return s || 'ななし'; },
  cleanText(s) { return String(s || '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 60); },
  reset() {
    this.role = null; this.code = ''; this.myId = ''; this.hostId = ''; this.deadline = 0;
    this.members = []; this.order = []; this.cur = null; this.champ = null; this.streak = 0; this.cap = 0; this.n = 0; this.autoAt = 0;
    this.log = []; this.spec = null; this.pendingStart = 0; this.myMatch = 0; this.sigQ = []; this.ver++;
  },
  /* 部屋を作る（4桁の部屋番号。1対1の部屋とは別の番号の空間） */
  create(name, watch) {
    this.close(); this.reset(); this.watch = !!watch;
    this.role = 'host'; this.name = this.cleanName(name);
    this.code = Net.rnd(4, '0123456789'); this.myId = this.hostId = Net.PREFIX + 'r' + this.code;
    this.state = 'signaling'; this.err = ''; this.deadline = performance.now() + 15000;
    this.openSock();
  },
  join(code, name, watch) {
    this.close(); this.reset(); this.watch = !!watch;
    this.role = 'guest'; this.name = this.cleanName(name); this.code = code;
    this.hostId = Net.PREFIX + 'r' + code; this.myId = Net.PREFIX + 'rg' + Net.rnd(10, AZ);
    this.state = 'signaling'; this.err = ''; this.deadline = performance.now() + 15000;
    this.openSock();
  },
  openSock() {
    const s = sigSocket(this.myId, m => { if (this.sock === s) this.onSock(m); }, () => { if (this.sock === s) this.onSockDown(); });
    this.sock = s;
  },
  /* ホストの仲介サーバー接続が切れたら、少し待ってつなぎ直す（その間は新しい人が入れない） */
  retrySock() {
    clearTimeout(this.reT);
    this.reT = setTimeout(() => { if (this.state === 'open' && this.isHost() && !this.sock) this.openSock(); }, 5000);
  },
  onSockDown() {
    this.sock = null; this.sockOk = false;
    if (this.isHost() && this.state === 'open') this.retrySock();
    else if (this.state === 'signaling' || this.state === 'connecting') this.fail('仲介サーバーにつながりません');
  },
  newLink(peerId) {
    return new Link(peerId, o => { if (this.sock) this.sock.send(o); }, {
      open: L => this.linkOpen(L), msg: (m, L) => this.linkMsg(m, L), down: L => this.linkDown(L)
    });
  },
  onSock(m) {
    switch (m.type) {
      case 'OPEN':
        this.sockOk = true;
        if (this.isHost()) { if (this.state === 'signaling') this.opened(); }
        else if (this.state === 'signaling') {
          this.state = 'connecting'; this.deadline = performance.now() + 25000;
          const L = this.links.host = this.newLink(this.hostId); L.offer();
        }
        break;
      case 'ID-TAKEN':
        if (this.isHost() && this.state === 'signaling') this.create(this.name, this.watch);   /* たまたま使われていた番号 → 作り直す */
        else if (this.isHost()) { const s = this.sock; this.sock = null; if (s) s.close(); this.retrySock(); }
        else if (this.state === 'signaling') this.join(this.code, this.name, this.watch);
        break;
      case 'ERROR': if (this.state === 'signaling' || this.state === 'connecting') this.fail('仲介サーバーのエラー: ' + ((m.payload && m.payload.msg) || '')); break;
      case 'EXPIRE': if (!this.isHost() && this.state !== 'open') this.fail('部屋が見つかりません（番号を確かめてください）'); break;
      case 'OFFER':
        if (this.isHost() && this.state === 'open' && m.src && m.payload) {
          const old = this.links[m.src]; if (old) old.close();
          const L = this.links[m.src] = this.newLink(m.src); L.answer(m.payload);
        }
        break;
      case 'ANSWER': case 'CANDIDATE': {
        const L = this.isHost() ? this.links[m.src] : this.links.host;
        if (L) L.onSig(m);
        break;
      }
      default: break;
    }
  },
  linkOpen(L) {
    if (this.isHost()) return;   /* 名乗り（hello）を待つ */
    this.state = 'joining';
    L.send({ t: 'hello', name: this.name, watch: this.watch });
    /* ホストとつながったら仲介サーバーはもう要らない */
    const s = this.sock; this.sock = null; if (s) s.close();
  },
  linkMsg(m, L) { if (this.isHost()) this.hostMsg(L.peerId, m); else this.guestMsg(m); },
  linkDown(L) {
    if (this.isHost()) {
      if (this.links[L.peerId] === L) delete this.links[L.peerId];
      this.removeMember(L.peerId);
      return;
    }
    if (this.links.host !== L) return;
    if (this.state === 'open') { this.state = 'closed'; this.err = '部屋との接続が切れました'; this.cleanup(); }
    else if (this.state !== 'idle' && this.state !== 'error' && this.state !== 'closed') this.fail('部屋とつながりませんでした（ネットワークの制限かもしれません）');
  },
  /* ---- ホスト側 ---- */
  opened() {
    this.state = 'open'; this.deadline = 0;
    this.members = [{ id: this.myId, name: this.name, wins: 0, watch: this.watch }]; this.order = [this.myId];
    this.sys('部屋を作りました（部屋番号 ' + this.code + '）');
  },
  uniqueName(n) {
    let s = n, k = 2;
    while (this.members.some(m => m.name === s)) s = n + k++;
    return s;
  },
  hostMsg(id, m) {
    if (m.t !== 'hello' && !this.member(id)) return;
    switch (m.t) {
      case 'hello': {
        if (this.member(id)) return;
        const L = this.links[id]; if (!L) return;
        if (this.members.length >= this.MAX) { L.send({ t: 'full' }); delete this.links[id]; setTimeout(() => L.close(), 500); return; }
        const name = this.uniqueName(this.cleanName(m.name));
        this.members.push({ id: id, name: name, wins: 0, watch: !!m.watch }); this.order.push(id);
        L.send({ t: 'log', list: this.log.slice(-30) });
        this.sys(name + ' さんが入りました' + (m.watch ? '（観戦だけ）' : ''));
        this.bcast();
        /* 試合の途中から来た人も、最初から早送りで観戦できるように */
        const S = this.spec;
        if (this.cur && S && S.n === this.cur.n && S.start) L.send({ t: 'specAll', n: S.n, msg: S.start, inp: S.inp });
        break;
      }
      case 'chat': this.hostChat(id, m.text); break;
      case 'watch': this.hostWatch(id, m.on); break;
      case 'sig': this.route(id, m.to, m.m); break;
      case 'spec': if (this.spec && this.spec.skip && this.spec.skip[0] === id) this.hostSpec(m); break;
      case 'specStart': if (this.cur && this.cur.a === id) this.hostSpecStart(m.n, m.msg); break;
      case 'res': if (this.isFighter(id)) this.hostResult(m.n, m.win); break;
      case 'abort': if (this.isFighter(id)) this.hostAbort(m.n); break;
      case 'leave': { const L = this.links[id]; if (L) { delete this.links[id]; L.close(); } this.removeMember(id); break; }
      default: break;
    }
  },
  stateMsg() {
    return {
      t: 'state', members: this.members, order: this.order, cur: this.cur, champ: this.champ, streak: this.streak, cap: this.cap,
      autoIn: this.autoAt ? Math.max(0, this.autoAt - performance.now()) : 0, sockOk: this.sockOk
    };
  },
  /* メンバー全員へ（ホスト自身は除く）。skip に入っている人には送らない */
  toAll(o, skip) {
    for (const m of this.members) {
      if (m.id === this.myId || (skip && skip.indexOf(m.id) >= 0)) continue;
      const L = this.links[m.id]; if (L) L.send(o);
    }
  },
  bcast() { this.ver++; this.toAll(this.stateMsg()); },
  sys(text) { const e = { sys: true, text: text }; this.addLog(e); this.toAll({ t: 'chat', e: e }); },
  hostChat(id, text) {
    text = this.cleanText(text); const M = this.member(id);
    if (!text || !M) return;
    const now = performance.now();
    if (M.lastChat && now - M.lastChat < 400) return;   /* 連打よけ */
    M.lastChat = now;
    const e = { id: id, name: M.name, text: text };
    this.addLog(e); this.toAll({ t: 'chat', e: e });
  },
  route(from, to, m) {
    if (to === this.myId) this.deliverSig(from, JSON.parse(JSON.stringify(m)));
    else { const L = this.links[to]; if (L) L.send({ t: 'sig', from: from, m: m }); }
  },
  /* 対戦する人（観戦だけの人を除く）の順番 */
  players() { return this.order.filter(id => { const M = this.member(id); return M && !M.watch; }); },
  /* 次に対戦する 2人。勝ち残りがいれば、その人と順番の先頭の人 */
  nextPair() {
    const o = this.players();
    if (o.length < 2) return null;
    if (this.champ && o.indexOf(this.champ) >= 0) return [this.champ, o.find(x => x !== this.champ)];
    return [o[0], o[1]];
  },
  /* 次の対戦を始める（ホストだけ） */
  startMatch() {
    if (!this.isHost() || !this.active() || this.cur) return false;
    const p = this.nextPair(); if (!p) return false;
    const a = p[0], b = p[1];
    this.cur = { n: ++this.n, a: a, b: b }; this.autoAt = 0; this.spec = null;
    this.sys('対戦: ' + this.nameOf(a) + ' vs ' + this.nameOf(b));
    this.bcast();
    return true;
  },
  setCap(v) { if (!this.isHost()) return; this.cap = v; this.sys(v ? '連勝の上限: ' + v + '連勝で交代' : '連勝の上限: なし'); this.bcast(); },
  toEnd(id) { const i = this.order.indexOf(id); if (i < 0) return; this.order.splice(i, 1); this.order.push(id); },
  toFront(id) { const i = this.order.indexOf(id); if (i < 0) return; this.order.splice(i, 1); this.order.unshift(id); },
  hostResult(n, win) { if (this.cur && this.cur.n === n) this.finish(win, ''); },
  /* 決着: 負けた人は順番の最後へ、勝った人は残る。引き分けは挑戦者が後ろへ */
  finish(win, why) {
    const c = this.cur; this.cur = null;
    const draw = win !== c.a && win !== c.b;
    const w = draw ? c.a : win, l = w === c.a ? c.b : c.a;
    if (!draw) {
      const M = this.member(w); if (M) M.wins++;
      this.streak = this.champ === w ? this.streak + 1 : 1; this.champ = w;
    }
    this.toEnd(l); if (!draw) this.toFront(w);
    if (why) this.sys(why);
    else if (draw) this.sys('引き分け');
    else this.sys(this.nameOf(w) + ' の勝ち！' + (this.streak >= 2 ? '（' + this.streak + '連勝）' : ''));
    if (this.cap && this.champ && this.streak >= this.cap) {
      this.sys(this.nameOf(this.champ) + ' さんは ' + this.streak + '連勝したので交代です');
      this.toEnd(this.champ); this.champ = null; this.streak = 0;
    }
    this.autoAt = this.players().length >= 2 ? performance.now() + 15000 : 0;
    this.bcast();
  },
  /* 観戦だけにする / 対戦にも出る（次の対戦から） */
  hostWatch(id, on) {
    const M = this.member(id); if (!M || M.watch === !!on) return;
    M.watch = !!on;
    if (on && this.champ === id) { this.champ = null; this.streak = 0; }
    if (this.players().length < 2) this.autoAt = 0;
    this.sys(M.name + (on ? ' さんは観戦だけにしました' : ' さんが対戦の順番に入りました'));
    this.bcast();
  },
  setWatch(on) {
    this.watch = !!on;
    if (!this.active()) return;
    this.toHost({ t: 'watch', on: this.watch }, () => this.hostWatch(this.myId, this.watch));
  },
  hostAbort(n) {
    if (!this.cur || this.cur.n !== n) return;
    const c = this.cur; this.cur = null; this.autoAt = 0;
    this.sys(this.nameOf(c.a) + ' と ' + this.nameOf(c.b) + ' の接続がうまくいかず、対戦を中止しました');
    this.bcast();
  },
  removeMember(id) {
    const M = this.member(id); if (!M) return;
    const c = this.cur;
    if (c && (c.a === id || c.b === id)) {
      const other = c.a === id ? c.b : c.a;
      this.finish(other, M.name + ' さんが抜けたので ' + this.nameOf(other) + ' の勝ち');
    }
    this.members = this.members.filter(m => m.id !== id);
    this.order = this.order.filter(x => x !== id);
    if (this.champ === id) { this.champ = null; this.streak = 0; }
    if (this.players().length < 2) this.autoAt = 0;
    this.sys(M.name + ' さんが抜けました');
    this.bcast();
  },
  hostSpecStart(n, msg) {
    const c = this.cur; if (!c || c.n !== n) return;
    this.spec = { n: n, start: msg, inp: [], skip: [c.a, c.b] };
    this.toAll({ t: 'specStart', n: n, msg: msg }, [c.a, c.b]);
    if (!this.isFighter(this.myId)) this.pendingStart = n;
  },
  hostSpec(m) {
    /* 決着の知らせが先に届いて cur が空になっていても、最後の入力は配る */
    const S = this.spec;
    if (!S || S.n !== m.n || m.s !== S.inp.length / 2) return;
    for (let i = 0; i < m.a.length; i++) S.inp.push(m.a[i] | 0);
    this.toAll(m, S.skip);
  },
  /* ---- 参加者側 ---- */
  guestMsg(m) {
    switch (m.t) {
      case 'state':
        this.members = m.members || []; this.order = m.order || []; this.cur = m.cur || null;
        this.champ = m.champ || null; this.streak = m.streak | 0; this.cap = m.cap | 0; this.sockOk = !!m.sockOk;
        this.autoAt = m.autoIn > 0 ? performance.now() + m.autoIn : 0;
        if (this.state !== 'open') { this.state = 'open'; this.deadline = 0; }
        this.ver++;
        break;
      case 'log': this.log = (m.list || []).map(e => Object.assign({}, e, { at: 0 })); this.ver++; break;   /* 入る前の発言（小さい表示には出さない） */
      case 'chat': if (m.e) this.addLog(m.e); break;
      case 'sig': this.deliverSig(m.from, m.m); break;
      case 'specStart': this.spec = { n: m.n, start: m.msg, inp: [] }; this.pendingStart = m.n; break;
      case 'specAll': this.spec = { n: m.n, start: m.msg, inp: (m.inp || []).slice() }; this.pendingStart = m.n; break;
      case 'spec': {
        const S = this.spec;
        if (S && S.n === m.n && m.s === S.inp.length / 2) for (let i = 0; i < m.a.length; i++) S.inp.push(m.a[i] | 0);
        break;
      }
      case 'full': this.fail('部屋がいっぱいです（' + this.MAX + '人まで）'); break;
      case 'closed': this.state = 'closed'; this.err = 'ホストが部屋を閉じました'; this.cleanup(); break;
      default: break;
    }
  },
  /* ---- みんな共通 ---- */
  addLog(e) {
    e = Object.assign({}, e, { at: performance.now() });
    this.log.push(e); if (this.log.length > 80) this.log.shift();
    this.ver++;
    if (this.onChat) { try { this.onChat(e); } catch (er) { /* 無視 */ } }
  },
  say(text) {
    text = this.cleanText(text);
    if (!text || !this.active()) return;
    if (this.isHost()) this.hostChat(this.myId, text);
    else if (this.links.host) this.links.host.send({ t: 'chat', text: text });
  },
  toHost(o, hostFn) { if (this.isHost()) hostFn(); else if (this.links.host) this.links.host.send(o); },
  report(n, win) { this.toHost({ t: 'res', n: n, win: win }, () => this.hostResult(n, win)); },
  abort(n) { this.toHost({ t: 'abort', n: n }, () => this.hostAbort(n)); },
  specStart(n, msg) { this.toHost({ t: 'specStart', n: n, msg: msg }, () => this.hostSpecStart(n, msg)); },
  sendSpec(n, s, a) { const m = { t: 'spec', n: n, s: s, a: a }; this.toHost(m, () => this.hostSpec(m)); },
  /* 対戦する 2人の直接接続。仲介メッセージは部屋を通して送る（試合番号つき） */
  sendSig(to, m) {
    if (this.isHost()) this.route(this.myId, to, m);
    else if (this.links.host) this.links.host.send({ t: 'sig', to: to, m: m });
  },
  deliverSig(from, m) {
    if (Net.sig && Net.peerId === from && Net.roomN === m.n) Net.onSig(Object.assign({}, m, { src: from }));
    else if (m.n > this.myMatch) { this.sigQ.push({ from: from, m: m }); if (this.sigQ.length > 300) this.sigQ.shift(); }
  },
  /* 自分が対戦者に選ばれたら呼ぶ（P1 = 申し込みを待つ側、P2 = 申し込む側） */
  startLink(c) {
    this.myMatch = c.n;
    const first = c.a === this.myId, peer = first ? c.b : c.a;
    Net.viaRoom(first ? 'host' : 'guest', peer, o => this.sendSig(peer, { n: c.n, type: o.type, payload: o.payload }), c.n);
    const q = this.sigQ; this.sigQ = [];
    q.forEach(x => { if (x.from === peer && x.m.n === c.n) Net.onSig(Object.assign({}, x.m, { src: peer })); });
  },
  /* 毎フレーム（ゲームのループから） */
  poll() {
    if (this.state === 'idle') return;
    const now = performance.now();
    if (this.deadline && now > this.deadline && this.state !== 'open') this.fail(this.state === 'signaling' ? '仲介サーバーにつながりません' : '部屋とつながりませんでした（ネットワークの制限かもしれません）');
    if (this.isHost() && this.active() && this.autoAt && now >= this.autoAt) { this.autoAt = 0; this.startMatch(); }
  },
  fail(msg) { this.state = 'error'; this.err = msg; this.cleanup(); },
  cleanup() {
    clearTimeout(this.reT); this.deadline = 0;
    const s = this.sock; this.sock = null; if (s) s.close();
    const L = this.links; this.links = {};
    for (const k in L) L[k].close();
    this.ver++;
  },
  /* 自分から抜ける（ホストなら部屋を閉じる） */
  close() {
    if (this.state === 'open') {
      if (this.isHost()) this.toAll({ t: 'closed' });
      else if (this.links.host) this.links.host.send({ t: 'leave' });
      /* 送ったメッセージが出ていくのを少し待ってから切る */
      const L = this.links, s = this.sock; this.links = {}; this.sock = null;
      setTimeout(() => { for (const k in L) L[k].close(); if (s) s.close(); }, 300);
    }
    this.cleanup();
    if (Net.sig) Net.close();
    this.state = 'idle'; this.err = '';
    this.reset();
  }
};
window.addEventListener('pagehide', () => { if (Room.state !== 'idle') Room.close(); });

return { Snap: Snap, Net: Net, NetSession: NetSession, NetTest: NetTest, Room: Room };
};
