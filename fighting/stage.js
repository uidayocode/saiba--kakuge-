/* =====================================================================
 * ステージ「電脳神社・参道」（影絵＋ネオンの縁）
 * エンジンにそのまま組み込めるよう、グローバルに StageVisual を1つだけ公開する。
 *
 *   const stage = StageVisual.create(960, 540, groundY)
 *   stage.draw(ctx, cam, t, state)              … 背景一式（地面・反射の手前まで）
 *   stage.drawReflection(ctx, cam, t, drawFn)   … 濡れた参道への映り込み。drawFn(ctx) で
 *                                                 キャラを普段どおり描くと、上下反転して地面に映る
 *   stage.drawFront(ctx, cam, t, state)         … キャラより手前（舞う光の粒・霞・周辺減光）
 *
 *   cam   = { x }        … カメラの横位置(px)。0 が中央。奥のものほどゆっくり動く
 *   t     = 秒（連続値）
 *   state = { intro:0..1, ko:0..1, hit:0..1, hurry:0..1 }  すべて任意
 *          intro: ラウンド開始の点灯演出 / ko: KO時の暗転と赤み / hit: 強打の瞬間の明滅 / hurry: 残り時間わずか
 * ===================================================================== */
(function () {
"use strict";
const PAD = 320;                   // パララックス用に左右へ余分に描く幅
const NEON_RED = "#ff3b5c", NEON_PINK = "#ff5fa2", GOLD = "#ffc46b", CYAN = "#46e8ff";
const SIL = "#0c0920";             // 背景の建物のシルエット（キャラの黒 #06070d より少し明るく青い）

function rgba(h, a) { const n = parseInt(h.slice(1), 16); return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")"; }
function rand(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function layer(w, h) { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
/* 透明な所を切り落とした画像と、その位置を返す（描く画素を減らして軽くする） */
function trim(c) {
  const g = c.getContext("2d"), d = g.getImageData(0, 0, c.width, c.height).data;
  let x0 = c.width, y0 = c.height, x1 = -1, y1 = -1;
  for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) if (d[(y * c.width + x) * 4 + 3] > 2) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  if (x1 < 0) return { c: layer(1, 1), x: 0, y: 0 };
  x0 = Math.max(0, x0 - 2); y0 = Math.max(0, y0 - 2); x1 = Math.min(c.width - 1, x1 + 2); y1 = Math.min(c.height - 1, y1 + 2);
  const o = layer(x1 - x0 + 1, y1 - y0 + 1); o.getContext("2d").drawImage(c, -x0, -y0);
  return { c: o, x: x0, y: y0 };
}
/* trim した画像を、元の画像と同じ位置に描く */
function blit(ctx, T, x, y) { ctx.drawImage(T.c, x + T.x, y + T.y); }

/* 影絵の建物: 塗り → 外側の光の縁（作るときに一度だけ描くので shadowBlur を使ってよい） */
function silhouette(g, path, rim, rimA, rimW, fill) {
  g.save();
  g.lineJoin = "round";
  g.shadowColor = rgba(rim, rimA); g.shadowBlur = 14;
  g.strokeStyle = rgba(rim, rimA); g.lineWidth = rimW * 2.2; g.stroke(path);
  g.shadowBlur = 0;
  g.fillStyle = fill || SIL; g.fill(path);
  g.restore();
}

/* ステージの種類（色と、置くものの違い） */
const THEMES = {
  sando: { name: '電脳神社・参道', sub: 'ネオン鳥居の境内',
    sky: ['#04030c', '#0e0824', '#24103a', '#4a1747', '#5e1d4c'], red: NEON_RED, pink: NEON_PINK, gold: GOLD, cyan: CYAN,
    ridge: ['#140b2c', '#170c30'], city: true, hall: 1, toriiFar: true, lanterns: true, motes: 'petal', ground: ['#120a24', '#050409'], fog: '255,120,190', hor: '255,90,170' },
  honden: { name: '本殿・雪の夜', sub: '御神体の眠る奥の院',
    sky: ['#02040c', '#07122a', '#0d2244', '#1a3a66', '#22507a'], red: '#ffc46b', pink: '#8fd8ff', gold: '#ffe2a0', cyan: '#bfe9ff',
    ridge: ['#0b1730', '#0e1c38'], city: false, hall: 1.45, toriiFar: false, lanterns: true, motes: 'snow', ground: ['#0d1a30', '#03060c'], fog: '170,210,255', hor: '140,200,255' },
  umi: { name: 'データの海', sub: '境内サーバーの最深部',
    sky: ['#000305', '#011014', '#032628', '#06403c', '#0a5048'], red: '#3ff0c0', pink: '#46e8ff', gold: '#b8ff6b', cyan: '#46e8ff',
    ridge: null, city: false, hall: 0, toriiFar: true, lanterns: false, motes: 'bits', ground: ['#021c1c', '#000505'], fog: '70,232,200', hor: '60,240,200', sea: true }
};

function create(W, H, GY, themeId) {
  GY = GY || Math.round(H * 0.87);
  const TH = THEMES[themeId] || THEMES.sando;
  /* テーマの色で、下の描画に出てくる色の名前を上書き（同じ名前をこの関数の中だけで使う） */
  const NEON_RED = TH.red, NEON_PINK = TH.pink, GOLD = TH.gold, CYAN = TH.cyan;
  const R = rand(20261009);
  const LW = W + PAD * 2;

  /* ---- 空（固定） ---- */
  const sky = layer(W, H), sg = sky.getContext("2d");
  {
    const g = sg.createLinearGradient(0, 0, 0, GY);
    g.addColorStop(0.00, TH.sky[0]); g.addColorStop(0.40, TH.sky[1]); g.addColorStop(0.68, TH.sky[2]);
    g.addColorStop(0.86, TH.sky[3]); g.addColorStop(1.00, TH.sky[4]);
    sg.fillStyle = g; sg.fillRect(0, 0, W, H);
  }
  const stars = [];
  for (let i = 0; i < 80; i++) stars.push({ x: R() * W, y: R() * GY * 0.55, r: R() < 0.15 ? 1.4 : 0.8, ph: R() * 6.28, sp: 0.6 + R() * 1.6 });

  /* ---- ホログラムの月 ---- */
  const MR = 92, moon = layer(MR * 2 + 60, MR * 2 + 60), mg = moon.getContext("2d");
  {
    const c = MR + 30;
    const g = mg.createRadialGradient(c - 20, c - 25, 10, c, c, MR);
    const mc = TH.fog;
    g.addColorStop(0, "rgba(" + mc + ",0.30)"); g.addColorStop(0.7, "rgba(" + mc + ",0.13)"); g.addColorStop(1, "rgba(" + mc + ",0.05)");
    mg.fillStyle = g; mg.beginPath(); mg.arc(c, c, MR, 0, Math.PI * 2); mg.fill();
    mg.save(); mg.beginPath(); mg.arc(c, c, MR, 0, Math.PI * 2); mg.clip();
    mg.fillStyle = "rgba(" + mc + ",0.10)"; for (let y = c - MR; y < c + MR; y += 4) mg.fillRect(c - MR, y, MR * 2, 1.5);   // 走査線
    mg.fillStyle = "rgba(20,8,40,0.35)";                                                                                        // 欠けた部分のクレーター（六角形）
    for (const [dx, dy, s] of [[-30, -18, 16], [22, 26, 22], [34, -36, 10], [-14, 40, 9]]) {
      mg.beginPath(); for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2; mg[k ? "lineTo" : "moveTo"](c + dx + Math.cos(a) * s, c + dy + Math.sin(a) * s); } mg.closePath(); mg.fill();
    }
    mg.restore();
    mg.shadowColor = rgba(NEON_PINK, 0.8); mg.shadowBlur = 18; mg.strokeStyle = rgba(NEON_PINK, 0.55); mg.lineWidth = 2;
    mg.beginPath(); mg.arc(c, c, MR, 0, Math.PI * 2); mg.stroke();
  }

  /* ---- 遠景: 山並みと、その手前の街の灯（左右だけに置き、中央の拝殿を空ける） ---- */
  const far = layer(LW, H), fg = far.getContext("2d");
  const blinks = [];
  {
    const ridge = (base, amp, step, col, rimA, seedOff) => {
      const r2 = rand(777 + seedOff), p = new Path2D(); p.moveTo(0, H);
      let y = base; for (let x = 0; x <= LW; x += step) { y = base - amp * (0.5 + 0.5 * Math.sin(x * 0.004 + seedOff)) - r2() * amp * 0.35; p.lineTo(x, y); }
      p.lineTo(LW, H); p.closePath();
      fg.fillStyle = col; fg.fill(p);
      fg.strokeStyle = rgba(NEON_PINK, rimA); fg.lineWidth = 1.2; fg.stroke(p);
    };
    if (TH.ridge) { ridge(GY - 120, 70, 26, TH.ridge[0], 0.10, 1); ridge(GY - 92, 46, 18, TH.ridge[1], 0.14, 3); }
    // データの海: 水平線の向こうに浮かぶデータの柱
    if (TH.sea) {
      for (let k = 0; k < 26; k++) {
        const x = R() * LW, h = 30 + R() * 140, w = 6 + R() * 18, top = GY - 70 - h;
        fg.fillStyle = "rgba(10,60,60,0.55)"; fg.fillRect(x, top, w, h);
        fg.fillStyle = rgba(CYAN, 0.35); fg.fillRect(x, top, w, 1.5);
        for (let wy = top + 4; wy < top + h; wy += 6) if (R() < 0.3) { fg.fillStyle = rgba(GOLD, 0.35); fg.fillRect(x + 2, wy, w - 4, 1.2); }
      }
    }
    // 街: 左右の端に、高さの違うビル。窓の明かりは疎らに
    for (const [x0, x1] of (TH.city ? [[0, PAD + 250], [PAD + W - 250, LW]] : [])) {
      let x = x0;
      while (x < x1) {
        const w = 18 + R() * 34, h = 24 + R() * 92, top = GY - 70 - h;
        fg.fillStyle = "#120a28"; fg.fillRect(x, top, w, h + 80);
        fg.fillStyle = rgba(NEON_PINK, 0.18); fg.fillRect(x, top, w, 1);
        for (let wy = top + 6; wy < GY - 74; wy += 7) for (let wx = x + 4; wx < x + w - 4; wx += 6)
          if (R() < 0.12) { fg.fillStyle = R() < 0.6 ? rgba(CYAN, 0.45) : rgba(NEON_PINK, 0.45); fg.fillRect(wx, wy, 2, 2); }
        if (h > 80 && R() < 0.6) { fg.fillStyle = "#120a28"; fg.fillRect(x + w / 2 - 1, top - 18, 2, 18); blinks.push({ x: x + w / 2, y: top - 19, ph: R() * 6.28 }); }
        x += w + 2 + R() * 6;
      }
    }
  }

  /* ---- 中景: 拝殿（中央の奥） ---- */
  const hall = layer(LW, H), hg = hall.getContext("2d");
  const HALL = { cx: PAD + W / 2, base: GY - 62 };
  if (TH.hall) {
    const cx = HALL.cx, by = HALL.base, w = 300 * (TH.hall || 1);
    // 石段と基壇
    const st = new Path2D(); st.rect(cx - w * 0.62, by - 8, w * 1.24, 8); st.rect(cx - w * 0.55, by - 16, w * 1.1, 8);
    silhouette(hg, st, NEON_PINK, 0.35, 1.2);
    // 本体と柱の間の明かり
    const body = new Path2D(); body.rect(cx - w * 0.42, by - 86, w * 0.84, 70);
    silhouette(hg, body, NEON_PINK, 0.4, 1.4);
    const glow = hg.createLinearGradient(0, by - 80, 0, by - 18);
    glow.addColorStop(0, "rgba(255,196,107,0.05)"); glow.addColorStop(1, "rgba(255,196,107,0.30)");
    hg.fillStyle = glow;
    for (let k = 0; k < 5; k++) hg.fillRect(cx - w * 0.38 + k * w * 0.16 + 6, by - 78, w * 0.16 - 12, 60);
    // 入母屋の大屋根（端が反り上がる）
    const roof = new Path2D();
    roof.moveTo(cx - w * 0.66, by - 92);
    roof.quadraticCurveTo(cx - w * 0.50, by - 98, cx - w * 0.34, by - 132);
    roof.lineTo(cx - w * 0.10, by - 160); roof.lineTo(cx + w * 0.10, by - 160);
    roof.lineTo(cx + w * 0.34, by - 132);
    roof.quadraticCurveTo(cx + w * 0.50, by - 98, cx + w * 0.66, by - 92);
    roof.lineTo(cx + w * 0.60, by - 86); roof.lineTo(cx - w * 0.60, by - 86); roof.closePath();
    silhouette(hg, roof, NEON_PINK, 0.65, 1.6);
    hg.strokeStyle = rgba(NEON_PINK, 0.9); hg.lineWidth = 1.5; hg.beginPath();
    hg.moveTo(cx - w * 0.66, by - 92); hg.quadraticCurveTo(cx - w * 0.50, by - 98, cx - w * 0.34, by - 132); hg.stroke();
    hg.beginPath(); hg.moveTo(cx + w * 0.66, by - 92); hg.quadraticCurveTo(cx + w * 0.50, by - 98, cx + w * 0.34, by - 132); hg.stroke();
    // 千木（屋根の上で交差する飾り）
    hg.strokeStyle = rgba(NEON_PINK, 0.7); hg.lineWidth = 2;
    hg.beginPath(); hg.moveTo(cx - w * 0.14, by - 150); hg.lineTo(cx - w * 0.04, by - 178); hg.moveTo(cx + w * 0.14, by - 150); hg.lineTo(cx + w * 0.04, by - 178); hg.stroke();
    // 扁額（金色に光る「奉納」）としめ縄
    hg.fillStyle = "#1a1030"; hg.fillRect(cx - 26, by - 124, 52, 22);
    hg.strokeStyle = rgba(GOLD, 0.8); hg.lineWidth = 1.2; hg.strokeRect(cx - 26, by - 124, 52, 22);
    hg.fillStyle = rgba(GOLD, 0.95); hg.font = "bold 14px 'Shippori Mincho B1', 'Yu Mincho', serif"; hg.textAlign = "center"; hg.textBaseline = "middle";
    hg.shadowColor = rgba(GOLD, 0.9); hg.shadowBlur = 8; hg.fillText("奉 納", cx, by - 113); hg.shadowBlur = 0;
    hg.strokeStyle = rgba(GOLD, 0.6); hg.lineWidth = 3; hg.beginPath(); hg.moveTo(cx - w * 0.40, by - 84); hg.quadraticCurveTo(cx, by - 70, cx + w * 0.40, by - 84); hg.stroke();
    hg.fillStyle = "rgba(240,236,255,0.7)";
    for (let k = -2; k <= 2; k++) { const sx = cx + k * w * 0.16, sy = by - 77 + Math.abs(k) * -2.5; hg.fillRect(sx - 2, sy, 4, 4); hg.fillRect(sx, sy + 4, 4, 4); hg.fillRect(sx - 2, sy + 8, 4, 4); }
  }

  /* ---- 鳥居: 大鳥居1基（キャラの真後ろ）と、奥の小さな鳥居の列 ---- */
  function toriiPath(cx, by, s) {
    const p = new Path2D();
    const kw = 300 * s, kh = 14 * s, ph = 250 * s, pw = 14 * s, sp = 200 * s;
    // 笠木（両端が反り上がる）と島木
    p.moveTo(cx - kw / 2 - 10 * s, by - ph - 4 * s);
    p.quadraticCurveTo(cx, by - ph + 12 * s, cx + kw / 2 + 10 * s, by - ph - 4 * s);
    p.lineTo(cx + kw / 2, by - ph + kh); p.quadraticCurveTo(cx, by - ph + 12 * s + kh, cx - kw / 2, by - ph + kh); p.closePath();
    p.rect(cx - kw * 0.44, by - ph + kh + 2 * s, kw * 0.88, 8 * s);
    // 貫と額束
    p.rect(cx - kw * 0.40, by - ph + 52 * s, kw * 0.80, 10 * s);
    p.rect(cx - 8 * s, by - ph + kh + 10 * s, 16 * s, 42 * s);
    // 柱と根巻き
    p.rect(cx - sp / 2 - pw / 2, by - ph + kh, pw, ph - kh);
    p.rect(cx + sp / 2 - pw / 2, by - ph + kh, pw, ph - kh);
    p.rect(cx - sp / 2 - pw * 0.8, by - 16 * s, pw * 1.6, 16 * s);
    p.rect(cx + sp / 2 - pw * 0.8, by - 16 * s, pw * 1.6, 16 * s);
    return p;
  }
  const toriiFar = layer(LW, H), tfg = toriiFar.getContext("2d");
  for (const [dx, s, a] of (TH.toriiFar ? (TH.sea ? [[-360, 0.3, 0.3], [360, 0.3, 0.3], [-230, 0.4, 0.38], [230, 0.4, 0.38], [-120, 0.5, 0.45], [120, 0.5, 0.45]] : [[-330, 0.42, 0.35], [330, 0.42, 0.35], [-190, 0.55, 0.45], [190, 0.55, 0.45]]) : [])) {
    silhouette(tfg, toriiPath(PAD + W / 2 + dx, GY - 46, s), NEON_RED, a, 1.6, "#0e0a24");
  }
  const toriiBig = layer(LW, H), tbg = toriiBig.getContext("2d");
  const BIG = { cx: PAD + W / 2, by: GY - 14, s: 1.38 };
  silhouette(tbg, toriiPath(BIG.cx, BIG.by, BIG.s), NEON_RED, 0.85, 2.2, "#0b0820");
  {  // 大鳥居のしめ縄と紙垂
    const s = BIG.s, y = BIG.by - 250 * s + 70 * s, x0 = BIG.cx - 100 * s, x1 = BIG.cx + 100 * s;
    tbg.strokeStyle = rgba(GOLD, 0.55); tbg.lineWidth = 4; tbg.beginPath(); tbg.moveTo(x0, y); tbg.quadraticCurveTo(BIG.cx, y + 26, x1, y); tbg.stroke();
    tbg.fillStyle = "rgba(240,236,255,0.65)";
    for (let k = -2; k <= 2; k++) { if (!k) continue; const sx = BIG.cx + k * 52, sy = y + 18 - Math.abs(k) * 6; tbg.fillRect(sx - 3, sy, 5, 5); tbg.fillRect(sx, sy + 5, 5, 5); tbg.fillRect(sx - 3, sy + 10, 5, 5); tbg.fillRect(sx, sy + 15, 5, 5); }
  }
  // 大鳥居の笠木を走る光（ラウンド開始時に左から右へ点灯させるための線）
  const kasagi = { x0: BIG.cx - 150 * BIG.s - 10 * BIG.s, x1: BIG.cx + 150 * BIG.s + 10 * BIG.s, y: BIG.by - 250 * BIG.s };

  /* ---- 灯籠（左右の手前寄り） ---- */
  const lant = layer(LW, H), lg = lant.getContext("2d");
  const LANTERNS = TH.lanterns ? [{ x: PAD + 70, s: 1.0 }, { x: PAD + W - 70, s: 1.0 }, { x: PAD - 150, s: 0.9 }, { x: PAD + W + 150, s: 0.9 }] : [];
  for (const L of LANTERNS) {
    const x = L.x, b = GY - 2, s = L.s, p = new Path2D();
    p.rect(x - 22 * s, b - 10 * s, 44 * s, 10 * s);           // 基礎
    p.rect(x - 6 * s, b - 64 * s, 12 * s, 54 * s);            // 竿
    p.rect(x - 18 * s, b - 72 * s, 36 * s, 8 * s);            // 中台
    p.rect(x - 14 * s, b - 100 * s, 28 * s, 28 * s);          // 火袋
    p.moveTo(x - 30 * s, b - 100 * s); p.lineTo(x, b - 122 * s); p.lineTo(x + 30 * s, b - 100 * s); p.closePath();   // 笠
    p.rect(x - 3 * s, b - 132 * s, 6 * s, 10 * s);            // 宝珠
    silhouette(lg, p, NEON_RED, 0.45, 1.4, "#0a0719");
    L.fire = { x: x, y: b - 86 * s, w: 18 * s, h: 18 * s };
  }

  /* 光の玉（灯籠の火の周り）。作るときに1回だけ描く */
  const GLOW = layer(140, 140);
  { const gg = GLOW.getContext("2d"), g = gg.createRadialGradient(70, 70, 0, 70, 70, 70); g.addColorStop(0, "rgba(255,180,90,1)"); g.addColorStop(1, "rgba(255,180,90,0)"); gg.fillStyle = g; gg.fillRect(0, 0, 140, 140); }

  /* ---- 浮かぶお札のホログラム ---- */
  const OFUDA = [{ x: 70, y: 150, ch: "祓", p: 0.62, ph: 0.0 }, { x: 128, y: 220, ch: "結", p: 0.5, ph: 1.7 },
                 { x: W - 74, y: 160, ch: "奉", p: 0.62, ph: 2.9 }, { x: W - 132, y: 232, ch: "納", p: 0.5, ph: 4.1 }];

  /* ---- 霞（なめらかな塊を1枚に焼いて横に流す） ---- */
  const fog = layer(W * 2, 160), fgc = fog.getContext("2d");
  { const r3 = rand(42); for (let i = 0; i < 26; i++) { const x = r3() * W * 2, y = 60 + r3() * 70, rr = 60 + r3() * 90;
      const g = fgc.createRadialGradient(x, y, 0, x, y, rr); g.addColorStop(0, "rgba(" + TH.fog + ",0.10)"); g.addColorStop(1, "rgba(" + TH.fog + ",0)");
      fgc.fillStyle = g; fgc.fillRect(x - rr, y - rr, rr * 2, rr * 2); } }

  /* ---- 舞う光の粒（桜の花びらとデータ片）。位置は t から決まるので、止め絵でも同じ絵になる ---- */
  const MOTES = [];
  for (let i = 0; i < 42; i++) MOTES.push({ x: R() * (W + 200), y0: R() * H, v: 14 + R() * 26, sway: 8 + R() * 22, f: 0.3 + R() * 0.8, ph: R() * 6.28,
                                            petal: R() < 0.65, s: 1.5 + R() * 2.2, p: 0.8 + R() * 0.5 });

  const T_far = trim(far), T_hall = trim(hall), T_tf = trim(toriiFar), T_big = trim(toriiBig), T_lant = trim(lant);
  function px(cam, p) { return -PAD - (cam && cam.x || 0) * p; }

  function draw(ctx, cam, t, st) {
    st = st || {};
    const ko = st.ko || 0, intro = st.intro == null ? 1 : st.intro, hurry = st.hurry || 0, hit = st.hit || 0;
    /* KO では大鳥居・お札の明かりが落ちる。強打の瞬間は灯籠が揺れて火が強まる */
    const lit = 1 - 0.75 * ko;
    ctx.drawImage(sky, 0, 0);
    // 星
    for (const s of stars) { const a = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph)); ctx.fillStyle = "rgba(220,220,255," + a + ")"; ctx.fillRect(s.x - (cam && cam.x || 0) * 0.02, s.y, s.r, s.r); }
    // 月（ゆっくり明滅。数秒に一度、横にずれるグリッチ）
    {
      const mx = W * 0.74 - (cam && cam.x || 0) * 0.04, my = 128, gl = ((t % 7.3) < 0.12 || hit > 0.6) ? 6 : 0;
      ctx.globalAlpha = 0.85 + 0.15 * Math.sin(t * 1.3);
      ctx.drawImage(moon, mx - moon.width / 2 + gl, my - moon.height / 2);
      if (gl) { ctx.globalAlpha = 0.5; ctx.drawImage(moon, 0, moon.height * 0.45, moon.width, 10, mx - moon.width / 2 - 14, my - moon.height / 2 + moon.height * 0.45, moon.width, 10); }
      ctx.globalAlpha = 1;
      ctx.strokeStyle = rgba(NEON_PINK, 0.22); ctx.lineWidth = 1; ctx.setLineDash([4, 10]); ctx.lineDashOffset = -t * 12;
      ctx.beginPath(); ctx.arc(mx, my, MR + 16, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    }
    blit(ctx, T_far, px(cam, 0.12), 0);
    for (const b of blinks) { if (Math.sin(t * 2.2 + b.ph) > 0.6) { ctx.fillStyle = "rgba(255,60,90,0.9)"; ctx.fillRect(b.x + px(cam, 0.12) - 1, b.y - 1, 3, 3); } }
    // 地平線の霞（キャラの黒いシルエットが沈まないよう、立ち位置の高さを少し明るく）
    { const g = ctx.createLinearGradient(0, GY - 170, 0, GY); g.addColorStop(0, "rgba(" + TH.hor + ",0)"); g.addColorStop(1, "rgba(" + TH.hor + ",0.16)"); ctx.fillStyle = g; ctx.fillRect(0, GY - 170, W, 170); }
    blit(ctx, T_hall, px(cam, 0.28), 0);
    blit(ctx, T_tf, px(cam, 0.42), 0);
    // 霞（奥）
    { const off = ((t * 8 + (cam && cam.x || 0) * 0.5) % W + W) % W; ctx.globalAlpha = 0.9; ctx.drawImage(fog, -off, GY - 150); ctx.drawImage(fog, W * 2 - off, GY - 150); ctx.globalAlpha = 1; }
    // 大鳥居（ラウンド開始の点灯: 0→1 で暗い状態から光る）
    ctx.globalAlpha = (0.35 + 0.65 * intro) * lit; blit(ctx, T_big, px(cam, 0.6), 0); ctx.globalAlpha = 1;
    {  // 笠木を走る光
      const ox = px(cam, 0.6), k = Math.min(1, intro * 1.4), x1 = kasagi.x0 + (kasagi.x1 - kasagi.x0) * k;
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = rgba(NEON_RED, 0.55 * lit); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(kasagi.x0 + ox, kasagi.y - 4); ctx.quadraticCurveTo((kasagi.x0 + kasagi.x1) / 2 + ox, kasagi.y + 14, x1 + ox, kasagi.y - 4 + (x1 - kasagi.x0) / (kasagi.x1 - kasagi.x0) * 0); ctx.stroke();
      const run = ((t * 0.35) % 1), rx = kasagi.x0 + (kasagi.x1 - kasagi.x0) * run;   // 笠木の上をゆっくり走る光点
      const gg = ctx.createRadialGradient(rx + ox, kasagi.y + 4, 0, rx + ox, kasagi.y + 4, 40);
      gg.addColorStop(0, "rgba(255,120,150,0.5)"); gg.addColorStop(1, "rgba(255,120,150,0)");
      ctx.fillStyle = gg; ctx.fillRect(rx + ox - 40, kasagi.y - 36, 80, 80);
      ctx.globalCompositeOperation = "source-over";
    }
    // お札のホログラム
    ctx.font = "bold 18px 'Shippori Mincho B1', 'Yu Mincho', serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for (const o of OFUDA) {
      const x = o.x - (cam && cam.x || 0) * o.p * 0.5, y = o.y + Math.sin(t * 0.9 + o.ph) * 6, fl = (Math.sin(t * 13 + o.ph * 5) > 0.92) ? 0.4 : 1;
      ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 0.6 + o.ph) * 0.06);
      ctx.globalAlpha = 0.55 * fl * (0.4 + 0.6 * intro) * lit;
      ctx.fillStyle = "rgba(70,232,255,0.07)"; ctx.fillRect(-13, -32, 26, 64);
      ctx.strokeStyle = rgba(CYAN, 0.6); ctx.lineWidth = 1; ctx.strokeRect(-13, -32, 26, 64);
      ctx.fillStyle = rgba(CYAN, 0.25); ctx.fillRect(-13, -32 + ((t * 30 + o.ph * 20) % 64), 26, 2);   // 走る走査線
      ctx.fillStyle = rgba(CYAN, 0.95); ctx.fillText(o.ch, 0, -8);
      ctx.fillStyle = rgba(CYAN, 0.5); ctx.fillRect(-6, 10, 12, 1.5); ctx.fillRect(-6, 15, 12, 1.5); ctx.fillRect(-6, 20, 8, 1.5);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    // 灯籠と、その火のゆらぎ
    const lx = px(cam, 0.85) + Math.sin(t * 38) * hit * 4;
    blit(ctx, T_lant, lx, 0);
    ctx.globalCompositeOperation = "lighter";
    LANTERNS.forEach((L, i) => {
      const f = (0.75 + 0.25 * Math.sin(t * 9 + i * 2.1) * Math.sin(t * 3.7 + i)) * (1 + hit * 1.2) * (1 - 0.5 * ko), x = L.fire.x + lx, y = L.fire.y;
      ctx.fillStyle = "rgba(255,196,107," + (0.55 * f) + ")"; ctx.fillRect(x - L.fire.w / 2 + 3, y - L.fire.h / 2 + 3, L.fire.w - 6, L.fire.h - 6);
      ctx.globalAlpha = Math.max(0, Math.min(1, 0.28 * f)); ctx.drawImage(GLOW, x - 70, y - 70); ctx.globalAlpha = 1;
    });
    ctx.globalCompositeOperation = "source-over";
    // 参道（濡れた石畳）
    {
      const g = ctx.createLinearGradient(0, GY, 0, H); g.addColorStop(0, TH.ground[0]); g.addColorStop(1, TH.ground[1]);
      ctx.fillStyle = g; ctx.fillRect(0, GY, W, H - GY);
      const vx = W / 2 - (cam && cam.x || 0) * 1.0, vy = GY - 120;
      ctx.strokeStyle = TH.sea ? "rgba(70,232,200,0.22)" : "rgba(120,90,190,0.16)"; ctx.lineWidth = 1; ctx.beginPath();
      for (let k = -14; k <= 14; k++) { const xb = vx + k * 90; const xa = vx + (xb - vx) * (1 / 6.0); ctx.moveTo(vx + (xa - vx), GY); ctx.lineTo(xb, H); }
      const off = TH.sea ? (t * 10) % 1 : 0;   /* データの海は横線がゆっくり手前へ流れる */
      for (const yy of [6, 15, 28, 46, 70]) { const y2 = GY + yy * (1 + off * 0.25); ctx.moveTo(0, y2); ctx.lineTo(W, y2); }
      ctx.stroke();
    }
    // 映り込み（建物）
    reflectLayers(ctx, cam, t, intro);
    // 地面の境目の光
    ctx.fillStyle = rgba(NEON_RED, 0.35 + 0.25 * intro); ctx.fillRect(0, GY, W, 1.5);
    // 状態による色の変化
    if (hurry > 0) { ctx.fillStyle = "rgba(255,40,70," + (0.06 * hurry * (0.5 + 0.5 * Math.sin(t * 6))) + ")"; ctx.fillRect(0, 0, W, H); }
    if (ko > 0) { ctx.fillStyle = "rgba(10,0,8," + (0.45 * ko) + ")"; ctx.fillRect(0, 0, W, H); ctx.fillStyle = "rgba(255,30,60," + (0.10 * ko) + ")"; ctx.fillRect(0, 0, W, H); }
  }

  /* 地面に映す: 地面の帯の中で上下反転し、細い横帯ごとに少しずらして水面の揺れを出す */
  /* 映り込み: 地面のすぐ上 h 行ぶんを小さな画像に1回だけ描き、
   * それを横帯ごとに上下反転して少しずつずらして貼る（前は帯ごとに全体を描き直していて重かった） */
  const REF_H = H - GY, refC = layer(W, REF_H), refG = refC.getContext("2d");
  function reflect(ctx, t, drawSrc, alpha) {
    const h = REF_H, band = 4;
    refG.setTransform(1, 0, 0, 1, 0, 0); refG.globalAlpha = 1; refG.globalCompositeOperation = "source-over";
    refG.clearRect(0, 0, W, h);
    refG.save(); refG.translate(0, -(GY - h)); drawSrc(refG); refG.restore();
    for (let y = 0; y < h; y += band) {
      const fade = 1 - y / h, a = alpha * fade * fade;
      if (a < 0.01) continue;
      const bh = Math.min(band, h - y), xo = Math.sin(y * 0.35 + t * 2.4) * (0.6 + y * 0.03);
      ctx.save();
      ctx.globalAlpha = a;
      ctx.translate(xo, GY + y + bh); ctx.scale(1, -1);
      ctx.drawImage(refC, 0, h - y - bh, W, bh, 0, 0, W, bh);
      ctx.restore();
    }
  }
  function reflectLayers(ctx, cam, t, intro) {
    reflect(ctx, t, c => { blit(c, T_big, px(cam, 0.6), 0); blit(c, T_lant, px(cam, 0.85), 0); }, 0.28 * (0.4 + 0.6 * intro));
    reflect(ctx, t, c => {
      c.globalCompositeOperation = "lighter";
      const lx = px(cam, 0.85);
      c.globalAlpha = 0.6; LANTERNS.forEach((L) => { c.drawImage(GLOW, L.fire.x + lx - 50, L.fire.y - 50, 100, 100); }); c.globalAlpha = 1;
    }, 0.5);
  }
  function drawReflection(ctx, cam, t, drawFn) { reflect(ctx, t, drawFn, 0.32); }

  function drawFront(ctx, cam, t, st) {
    st = st || {};
    // 舞う光の粒
    for (const m of MOTES) {
      const y = ((m.y0 + t * m.v) % (H + 20)) - 10, x = ((m.x + Math.sin(t * m.f + m.ph) * m.sway - (cam && cam.x || 0) * m.p) % (W + 200) + W + 200) % (W + 200) - 100;
      ctx.save(); ctx.translate(x, y); ctx.rotate(t * m.f * 1.5 + m.ph);
      if (TH.motes === 'snow') { ctx.fillStyle = "rgba(235,245,255,0.75)"; ctx.beginPath(); ctx.arc(0, 0, m.s * 0.8, 0, Math.PI * 2); ctx.fill(); }
      else if (TH.motes === 'bits') { ctx.rotate(-(t * m.f * 1.5 + m.ph)); ctx.fillStyle = m.petal ? rgba(CYAN, 0.6) : rgba(GOLD, 0.5); ctx.font = (8 + m.s * 3).toFixed(0) + "px monospace"; ctx.fillText(m.petal ? "1" : "0", 0, 0); }
      else if (m.petal) { ctx.fillStyle = "rgba(255,150,195,0.55)"; ctx.beginPath(); ctx.ellipse(0, 0, m.s * 1.4, m.s * 0.7, 0, 0, Math.PI * 2); ctx.fill(); }
      else { ctx.fillStyle = "rgba(70,232,255,0.5)"; ctx.fillRect(-m.s / 2, -m.s / 2, m.s, m.s); }
      ctx.restore();
    }
    // 足元の霞（手前）
    { const g = ctx.createLinearGradient(0, GY - 40, 0, GY + 30); g.addColorStop(0, "rgba(" + TH.fog + ",0)"); g.addColorStop(0.6, "rgba(" + TH.fog + "," + (TH.motes === 'snow' ? 0.14 : 0.07) + ")"); g.addColorStop(1, "rgba(" + TH.fog + ",0)"); ctx.fillStyle = g; ctx.fillRect(0, GY - 40, W, 70); }
    // HUDの読みやすさのため上端を少し暗く + 周辺減光
    { const g = ctx.createLinearGradient(0, 0, 0, 90); g.addColorStop(0, "rgba(3,2,8,0.55)"); g.addColorStop(1, "rgba(3,2,8,0)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, 90); }
    { const g = ctx.createRadialGradient(W / 2, H * 0.55, H * 0.45, W / 2, H * 0.55, W * 0.75); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,0.5)"); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H); }
    if (st.hit) { ctx.fillStyle = "rgba(255,255,255," + (0.08 * st.hit) + ")"; ctx.fillRect(0, 0, W, H); }
  }

  return { draw, drawReflection, drawFront, groundY: GY, name: TH.name, subtitle: TH.sub };
}

window.StageVisual = { create, THEMES: Object.keys(THEMES).map(k => ({ id: k, name: THEMES[k].name, sub: THEMES[k].sub })) };
})();
