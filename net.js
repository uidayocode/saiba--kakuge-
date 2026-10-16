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
  TURN: [],
  iceServers() { return this.ICE.concat(this.TURN); },
  state: 'idle',          /* idle / signaling / waiting(部屋で待機) / connecting / open / closed / error */
  role: null, code: '', err: '', myId: '', peerId: '',
  ws: null, pc: null, ch: {}, inbox: [], candQ: [], hb: 0, pingT: 0, rtt: 0, deadline: 0,
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
  wsSend(o) { try { if (this.ws && this.ws.readyState === 1) this.ws.send(JSON.stringify(o)); } catch (e) { /* 無視 */ } },
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
    const pc = new RTCPeerConnection({ iceServers: this.iceServers() });
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
  checkOpen() {
    const a = this.ch.ctl, b = this.ch.inp;
    if (this.state === 'open' || !a || !b || a.readyState !== 'open' || b.readyState !== 'open') return;
    this.state = 'open'; this.deadline = 0; this.lastRecv = performance.now();
    /* つながったら仲介サーバーはもう要らない（部屋番号も空く） */
    clearInterval(this.hb); try { if (this.ws) this.ws.close(); } catch (e) { /* 無視 */ } this.ws = null;
    clearInterval(this.pingT);
    this.pingT = setInterval(() => this.sendInp({ t: 'ping', s: performance.now() }), 500);
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
    clearInterval(this.hb); clearInterval(this.pingT); this.hb = 0; this.pingT = 0; this.deadline = 0;
    try { if (this.ws) this.ws.close(); } catch (e) { /* 無視 */ }
    try { if (this.pc) this.pc.close(); } catch (e) { /* 無視 */ }
    this.ws = null; this.pc = null; this.ch = {}; this.candQ = []; this.onInput = null;
  },
  /* 自分から切る。quiet なら状態だけ戻す */
  close(quiet) {
    if (this.state === 'open') { try { this.ch.ctl.send(JSON.stringify({ t: 'bye' })); } catch (e) { /* 無視 */ } }
    this.cleanup();
    this.state = 'idle'; this.inbox = []; this.rtt = 0;
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

return { Snap: Snap, Net: Net, NetSession: NetSession, NetTest: NetTest };
};
