/* =====================================================================
 * 電脳巫女の見た目（影絵＋ネオンの縁）
 * エンジン側でもそのまま使えるよう、グローバルに MikoVisual を1つだけ公開する。
 *
 *   MikoVisual.solve(body, pose)            … 設計書4.9のFK。キャラ空間(x前+, y上+)の関節14点
 *   MikoVisual.clipPose(ch, clipName, t)    … data.js のクリップを時刻 t で評価（ループ対応）
 *   MikoVisual.draw(ctx, joints, opts)      … 関節から衣装の形を作り、影絵で描く
 *        opts = { x, y, facing, scale, color, flash, alpha, chains, id }  id = キャラ（miko/komainu/oni404/fox）
 *        chains = { ponytail, ribbon, sleeveF, sleeveB, haoriTail }（任意）各値は節の位置 [[x,y],...]（足元原点・x前+・y下+）
 *        x,y = 足元の画面座標 / facing = 1 右向き, -1 左向き / color = 縁のネオン色
 * ===================================================================== */
(function () {
"use strict";
const CH = ["rootX","rootY","rot","torso","head","uarmF","farmF","uarmB","farmB","thighF","shinF","footF","thighB","shinB","footB"];
const NCH = CH.length, DEG = Math.PI / 180, isNum = v => typeof v === "number" && isFinite(v);

function ease(n, u, bk) {
  const c1 = isNum(bk) ? bk : 1.70158, c3 = c1 + 1, c2 = c1 * 1.525;
  switch (n) {
    case "inQuad": return u * u; case "outQuad": return 1 - (1 - u) * (1 - u);
    case "inOutQuad": return u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
    case "inCubic": return u * u * u; case "outCubic": return 1 - Math.pow(1 - u, 3);
    case "inOutCubic": return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
    case "outExpo": return u >= 1 ? 1 : 1 - Math.pow(2, -10 * u); case "inExpo": return u <= 0 ? 0 : Math.pow(2, 10 * u - 10);
    case "inBack": return c3 * u * u * u - c1 * u * u; case "outBack": return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2);
    case "inOutBack": return u < .5 ? (Math.pow(2 * u, 2) * ((c2 + 1) * 2 * u - c2)) / 2 : (Math.pow(2 * u - 2, 2) * ((c2 + 1) * (u * 2 - 2) + c2) + 2) / 2;
    case "outElastic": { const c4 = 2 * Math.PI / 3; return u <= 0 ? 0 : u >= 1 ? 1 : Math.pow(2, -10 * u) * Math.sin((u * 10 - .75) * c4) + 1; }
    case "hold": return u < 1 ? 0 : 1; default: return u;
  }
}
function poseArr(p) { const a = new Float64Array(NCH); for (let i = 0; i < NCH; i++) a[i] = p && isNum(p[CH[i]]) ? p[CH[i]] : 0; return a; }
function clipPose(ch, name, t) {
  const base0 = poseArr(ch.basePose), clip = ch.clips && ch.clips[name];
  if (!clip) return base0;
  let base = base0;
  if (clip.base && clip.base !== name && ch.clips[clip.base]) base = clipPose(ch, clip.base, 0);
  const L = Math.max(1, clip.length | 0);
  const tt = clip.loop ? ((t % L) + L) % L : Math.max(0, Math.min(L, t));
  const keys = (clip.keys || []).slice().sort((a, b) => a.f - b.f), out = new Float64Array(NCH);
  for (let c = 0; c < NCH; c++) {
    const f = [0], v = [base[c]], e = [null], b = [null];
    for (const k of keys) {
      const val = k.p === "base" ? base[c] : (k.p && isNum(k.p[CH[c]]) ? k.p[CH[c]] : null);
      if (val === null) continue;
      if (k.f === 0) { v[0] = val; e[0] = k.ease; b[0] = k.back; continue; }
      f.push(k.f); v.push(val); e.push(k.ease); b.push(k.back);
    }
    if (clip.loop) { f.push(L); v.push(v[0]); e.push(e[0]); b.push(b[0]); }
    if (tt >= f[f.length - 1]) { out[c] = v[v.length - 1]; continue; }
    let i = 1; while (i < f.length - 1 && f[i] < tt) i++;
    const u = (tt - f[i - 1]) / Math.max(1e-6, f[i] - f[i - 1]);
    out[c] = v[i - 1] + (v[i] - v[i - 1]) * ease(e[i], Math.max(0, Math.min(1, u)), b[i]);
  }
  return out;
}

const J = { P:0, NECK:1, HEAD:2, SH:3, EF:4, HF:5, EB:6, HB:7, KF:8, AF:9, TF:10, KB:11, AB:12, TB:13 };
function solve(b, pose) {
  const x = new Float64Array(14), y = new Float64Array(14);
  const tT = 180 - pose[3], tH = tT - pose[4];
  const tUF = tT + 180 + pose[5], tFF = tUF + pose[6], tUB = tT + 180 + pose[7], tFB = tUB + pose[8];
  const tThF = pose[9], tShF = tThF - pose[10], tFtF = tShF + 90 + pose[11];
  const tThB = pose[12], tShB = tThB - pose[13], tFtB = tShB + 90 + pose[14];
  const S = t => Math.sin(t * DEG), C = t => -Math.cos(t * DEG);
  const go = (i, f, l, t) => { x[i] = x[f] + l * S(t); y[i] = y[f] + l * C(t); };
  go(J.NECK, J.P, b.torsoLen, tT); go(J.HEAD, J.NECK, b.neckLen + b.headR, tH);
  x[J.SH] = x[J.NECK] - b.shoulderDrop * S(tT); y[J.SH] = y[J.NECK] - b.shoulderDrop * C(tT);
  go(J.EF, J.SH, b.uArmLen, tUF); go(J.HF, J.EF, b.fArmLen, tFF); go(J.EB, J.SH, b.uArmLen, tUB); go(J.HB, J.EB, b.fArmLen, tFB);
  go(J.KF, J.P, b.thighLen, tThF); go(J.AF, J.KF, b.shinLen, tShF); go(J.TF, J.AF, 0.75 * b.footLen, tFtF);
  go(J.KB, J.P, b.thighLen, tThB); go(J.AB, J.KB, b.shinLen, tShB); go(J.TB, J.AB, 0.75 * b.footLen, tFtB);
  const low = Math.min(y[J.AF], y[J.TF], y[J.AB], y[J.TB]) - b.footH / 2;
  const H = -low + pose[1], rot = pose[2], cr = Math.cos(rot * DEG), sr = Math.sin(rot * DEG);
  for (let i = 0; i < 14; i++) { const px = x[i], py = y[i]; x[i] = px * cr + py * sr + pose[0]; y[i] = -px * sr + py * cr + H; }
  return { x, y };
}

/* ---- 形の部品（足元原点・画面向き y下+ の座標で作る） ---- */
function hull(pts) {
  const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lo = [], up = [];
  for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
  return lo.slice(0, -1).concat(up.slice(0, -1));
}
function polyPath(pts) { const g = new Path2D(); pts.forEach((q, i) => i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1])); g.closePath(); return g; }
function capsule(a, b, r0, r1) {
  const pts = [];
  for (let k = 0; k < 16; k++) { const t = k / 16 * Math.PI * 2; pts.push([a[0] + Math.cos(t) * r0, a[1] + Math.sin(t) * r0], [b[0] + Math.cos(t) * r1, b[1] + Math.sin(t) * r1]); }
  return polyPath(hull(pts));
}
function circle(c, r) { const g = new Path2D(); g.arc(c[0], c[1], r, 0, Math.PI * 2); return g; }
function ell(c, rx, ry) { const g = new Path2D(); g.ellipse(c[0], c[1], rx, ry, 0, 0, Math.PI * 2); return g; }
const add = (a, b, k) => [a[0] + b[0] * (k == null ? 1 : k), a[1] + b[1] * (k == null ? 1 : k)];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const unit = v => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };
const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const perpL = v => [v[1], -v[0]];

/* 揺れ物 (ChainSim) の節の列から、先細りの帯の外形を作る。nodes は [[x,y],...]（足元原点・y下+）。 */
function strip(nodes, w0, w1) {
  const n = nodes.length, L = [], R = [];
  for (let i = 0; i < n; i++) {
    const a = nodes[Math.max(0, i - 1)], b = nodes[Math.min(n - 1, i + 1)];
    let tx = b[0] - a[0], ty = b[1] - a[1]; const l = Math.hypot(tx, ty) || 1; tx /= l; ty /= l;
    const w = (w0 + (w1 - w0) * (i / (n - 1))) / 2;
    L.push([nodes[i][0] - ty * w, nodes[i][1] + tx * w]); R.push([nodes[i][0] + ty * w, nodes[i][1] - tx * w]);
  }
  return L.concat(R.reverse());
}

/* 衣装: 後ろ髪・袴・大きな袖・白衣・御幣。layer "main" は体の一枚シルエット、"front" は手前の腕。
 * ch（任意）= エンジンの ChainSim が計算した節の位置 { ponytail, ribbon, sleeveF, sleeveB, haoriTail }。
 * 各値は [[x,y],...]（足元原点、x前+、y下+）。あれば髪・リボン・袖・羽織の先をその位置に置き換える。 */
function costumeMiko(j, ch) {
  ch = ch || {};
  const P = i => [j.x[i], -j.y[i]];
  const pel = P(J.P), neck = P(J.NECK), head = P(J.HEAD), sh = P(J.SH);
  const tUp = unit(sub(neck, pel)), back = perpL(tUp), fwd = [-back[0], -back[1]], down = [0, 1];
  const parts = [], r = 15;
  const put = (g, layer, eye) => parts.push({ g, layer: layer || "main", eye: !!eye });
  // 羽織の裾（腰の後ろで揺れる）
  if (ch.haoriTail && ch.haoriTail.length > 1) put(polyPath(strip(ch.haoriTail, 15, 11)));
  // 後ろ髪（ポニーテールの節があれば、その位置で先端を揺らす。無ければ背中の中ほどまでの固定形）
  if (ch.ponytail && ch.ponytail.length > 1) {
    put(polyPath([add(head, [0, -r * 1.05]), add(head, back, r * 1.15), add(add(neck, back, r * 0.8), down, 6), add(head, fwd, r * 0.2)]));
    put(polyPath(strip(ch.ponytail, 17, 4)));
  } else {
    put(polyPath([add(head, [0, -r * 1.05]), add(head, back, r * 1.15), add(add(neck, back, r * 0.9), down, 18),
                  add(add(lerp(neck, pel, 0.75), back, r * 0.55), down, 4), add(lerp(neck, pel, 0.5), back, 2), add(head, fwd, r * 0.2)]));
  }
  // 袴（腰から足首までを1枚の末広がりに）と足袋
  put(capsule(P(J.AB), P(J.TB), 4, 3)); put(capsule(P(J.AF), P(J.TF), 4, 3));
  put(polyPath(hull([add(pel, back, 13), add(pel, fwd, 13), add(P(J.KF), fwd, 9), add(P(J.KB), back, 9),
                     add(P(J.AF), fwd, 13), add(P(J.AF), back, 9), add(P(J.AB), back, 13), add(P(J.AB), fwd, 9)])));
  const sleeve = (E, H, layer, nodes) => {
    if (nodes && nodes.length > 1) {
      // 袖の先は ChainSim の節に沿って垂れ・揺れる
      put(polyPath(hull([add(sh, back, 4), add(sh, fwd, 6), P(E), P(H), add(P(E), down, 9), add(P(H), down, 7)].concat(strip(nodes, 15, 11)))), layer);
    } else {
      put(polyPath(hull([add(sh, back, 4), add(sh, fwd, 6), P(E), P(H), add(P(H), down, 24), add(P(E), down, 22), add(lerp(sh, P(E), 0.5), down, 14)])), layer);
    }
    put(circle(P(H), 4.5), layer);
  };
  sleeve(J.EB, J.HB, "main", ch.sleeveB);
  // 白衣と帯
  put(polyPath(hull([add(pel, back, 12), add(pel, fwd, 11), add(neck, back, 11), add(neck, fwd, 11), add(sh, fwd, 12)])));
  // 頭・前髪・リボン（髪飾りは後ろへ流れる2枚の帯にして、角に見えないようにする）
  put(circle(add(head, back, 2.5), r + 1.5));
  put(circle(add(head, fwd, 2.5), r - 2));
  put(polyPath([add(head, [0, -r - 1]), add(add(head, fwd, r * 0.9), [0, -r * 0.35]), add(add(head, fwd, r * 0.15), [0, -r * 0.2])]));
  const knot = add(add(head, back, r * 0.95), [0, -r * 0.15]);
  if (ch.ribbon && ch.ribbon.length > 1) put(polyPath(strip(ch.ribbon, 9, 4)));
  else put(polyPath([knot, add(add(knot, back, 15), [0, -9]), add(add(knot, back, 17), [0, 1])]));
  put(polyPath([knot, add(add(knot, back, 12), [0, 12]), add(add(knot, back, 5), [0, 15])]));
  put(ell(add(add(head, fwd, r * 0.55), [0, -1]), 2.4, 1.3), "main", true);
  // 手前の袖と御幣
  const hf = P(J.HF), fa = unit(sub(hf, P(J.EF))), n = perpL(fa), tip = add(hf, fa, 44);
  put(capsule(add(hf, fa, -8), tip, 1.8, 1.6), "front");
  put(polyPath([tip, add(add(tip, n, 4), fa, -6), add(add(tip, n, -9), fa, -10), add(add(tip, n, -2), fa, -16), add(add(tip, n, -12), fa, -20)]), "front");
  sleeve(J.EF, J.HF, "front", ch.sleeveF);
  return parts;
}


/* ---- ほかのキャラ（style.html の画風比較で作った形を、影絵用に移したもの） ----
 * 座標は足元原点・y下+。ch = 揺れ物の節（あれば尻尾や髪をその位置で揺らす） */
function bodyFrame(j) {
  const P = i => [j.x[i], -j.y[i]];
  const pel = P(J.P), neck = P(J.NECK), head = P(J.HEAD), sh = P(J.SH);
  const tUp = unit(sub(neck, pel)), back = perpL(tUp), fwd = [-back[0], -back[1]], down = [0, 1];
  const parts = [];
  const put = (g, layer, eye) => parts.push({ g, layer: layer || "main", eye: !!eye });
  const legs = (rT, rS, rF) => {
    for (const [K, A, T] of [[J.KB, J.AB, J.TB], [J.KF, J.AF, J.TF]]) {
      put(capsule(pel, P(K), rT, rT * 0.85)); put(capsule(P(K), P(A), rT * 0.8, rS)); put(capsule(P(A), P(T), rF, rF * 0.8));
    }
  };
  const arm = (E, H, rU, rF, rH, layer) => {
    put(capsule(sh, P(E), rU, rU * 0.9), layer); put(capsule(P(E), P(H), rU * 0.85, rF), layer); put(circle(P(H), rH), layer);
  };
  return { P, pel, neck, head, sh, tUp, back, fwd, down, parts, put, legs, arm };
}
/* なめらかな閉じた形（点を通る曲線） */
function smooth(pts) {
  const g = new Path2D(), n = pts.length;
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let m0 = mid(pts[n - 1], pts[0]); g.moveTo(m0[0], m0[1]);
  for (let i = 0; i < n; i++) { const p = pts[i], m = mid(p, pts[(i + 1) % n]); g.quadraticCurveTo(p[0], p[1], m[0], m[1]); }
  g.closePath(); return g;
}
/* 根元から先へ、太さが途中で膨らむ曲がった房（尻尾・たてがみの房） */
function plume(base, dir, L, bend, wMax, wEnd) {
  const n = perpL(dir), pts = [];
  for (let k = 0; k <= 8; k++) {
    const u = k / 8, curl = bend * u * u;
    const c = add(add(base, dir, L * u), n, curl * L);
    pts.push(c);
  }
  const L1 = [], R1 = [];
  for (let k = 0; k <= 8; k++) {
    const u = k / 8, a = pts[Math.max(0, k - 1)], b = pts[Math.min(8, k + 1)], t = unit(sub(b, a)), nn = perpL(t);
    /* 根元は少し細く、中ほどで一番太く、先は細くとがる */
    const w = (k === 8 ? wEnd : Math.max(wEnd, wMax * Math.pow(Math.sin(Math.PI * (0.12 + 0.86 * u)), 0.7))) / 2;
    L1.push(add(pts[k], nn, w)); R1.push(add(pts[k], nn, -w));
  }
  return smooth(L1.concat(R1.reverse()));
}
function costumeKomainu(j, ch) {
  ch = ch || {};
  const { P, pel, neck, head, sh, tUp, back, fwd, down, parts, put } = bodyFrame(j);
  const r = 14;
  /* 尾: 炎のように巻き上がる大きな房（揺れ物があればその向き） */
  const tb = add(pel, back, 10);
  let tdir = unit(add(back, tUp, 1.3));
  if (ch.shortTail && ch.shortTail.length > 1) { const e = ch.shortTail[ch.shortTail.length - 1]; tdir = unit(add(tdir, unit(sub(e, ch.shortTail[0])), 0.3)); }
  put(plume(tb, tdir, 66, -0.4, 34, 4));
  put(plume(add(tb, tUp, 6), unit(add(tdir, back, 0.7)), 44, -0.55, 22, 3));
  put(plume(add(tb, tUp, -2), unit(add(tdir, tUp, -0.5)), 38, 0.4, 18, 3));
  /* 後ろ脚: 太い腿 → 細いすね → 大きな足 */
  const leg = (K, A, T, layer) => {
    put(polyPath(hull([add(pel, back, 12), add(pel, fwd, 8), add(P(K), back, 9), add(P(K), fwd, 9)])), layer);
    put(capsule(P(K), P(A), 10.5, 8), layer);
    put(ell(lerp(P(A), P(T), 0.55), 12.5, 7), layer);
  };
  leg(J.KB, J.AB, J.TB); leg(J.KF, J.AF, J.TF);
  /* 前脚（腕）: 付け根が太く、先は大きな前足 */
  const arm = (E, H, layer) => {
    put(capsule(sh, P(E), 12, 9.5), layer); put(capsule(P(E), P(H), 9, 7.5), layer);
    const d = unit(sub(P(H), P(E))); put(ell(add(P(H), d, 3), 11, 9), layer);
  };
  arm(J.EB, J.HB);
  /* 胴: 盛り上がった胸から腰へ締まる */
  put(smooth([add(pel, back, 13), add(add(lerp(pel, neck, 0.5), back, 15), tUp, 2), add(neck, back, 14), add(add(neck, fwd, 16), tUp, 4),
              add(add(sh, fwd, 22), down, 8), add(add(lerp(pel, neck, 0.45), fwd, 16), down, 4), add(pel, fwd, 10)]));
  /* たてがみ: 渦を巻く雲のような房（とがらせない） */
  /* たてがみ: 頭の上と後ろから、後ろへなびく数本の長い房（すっきりした形） */
  const hb = add(head, back, 2), upW = [0, -1];
  const locks = [   /* 付け根のずらし（上へ, 後ろへ）, 向き（後ろ寄り↔上寄り）, 長さ, 太さ */
    [12, 0, 0.55, 52, 17], [6, 6, 0.3, 58, 19], [-1, 9, 0.1, 54, 18], [-8, 8, -0.15, 44, 15]
  ];
  for (const [u, bk, lift, L, w] of locks) {
    const d = unit(add(back, upW, lift));
    put(plume(add(add(hb, upW, u), back, bk), d, L, 0.22, w, 2));
  }
  put(circle(add(head, back, 3), r * 1.05));
  for (const id of ["maneTuft1", "maneTuft2"]) if (ch[id] && ch[id].length > 1) put(polyPath(strip(ch[id], 12, 3)));
  /* 頭: 四角い額と、前に突き出た鼻づら・下あご */
  put(smooth([add(head, [-r * 0.9, -r * 0.9]), add(head, [r * 0.5, -r * 1.0]), add(add(head, fwd, r * 1.6), [0, -r * 0.2]),
              add(add(head, fwd, r * 1.7), [0, r * 0.5]), add(add(head, fwd, r * 0.9), [0, r * 0.95]), add(head, [-r * 0.6, r * 0.9])]));
  put(polyPath([add(head, [-r * 0.5, -r * 0.8]), add(head, [-r * 0.35, -r * 1.55]), add(head, [r * 0.15, -r * 0.85])]));
  put(ell(add(add(head, fwd, r * 0.6), [0, -r * 0.3]), 3.2, 1.6), "main", true);
  arm(J.EF, J.HF, "front");
  return parts;
}
function costumeOni(j, ch) {
  ch = ch || {};
  const { P, pel, neck, head, sh, tUp, back, fwd, down, parts, put } = bodyFrame(j);
  const r = 17;
  /* 脚: 太い腿から締まるすね、大きな足 */
  const leg = (K, A, T) => {
    put(capsule(pel, P(K), 16, 13)); put(capsule(P(K), P(A), 12.5, 9.5));
    put(ell(lerp(P(A), P(T), 0.5), 15, 8));
  };
  leg(J.KB, J.AB, J.TB); leg(J.KF, J.AF, J.TF);
  /* 腰巻: 虎皮のぎざぎざの裾 */
  {
    const kb = lerp(pel, P(J.KB), 0.7), kf = lerp(pel, P(J.KF), 0.7), pts = [add(pel, back, 24), add(pel, fwd, 23)];
    const a = add(kf, fwd, 12), b = add(kb, back, 12);
    for (let k = 0; k <= 6; k++) { const q = lerp(a, b, k / 6); pts.push(k % 2 ? add(q, down, -7) : add(q, down, 4)); }
    put(polyPath(pts));
  }
  if (ch.loincloth && ch.loincloth.length > 1) put(polyPath(strip(ch.loincloth, 22, 10)));
  /* 腕: 盛り上がった肩、太い上腕、拳 */
  const arm = (E, H, layer) => {
    put(circle(sh, 17), layer);
    put(capsule(sh, P(E), 15, 12.5), layer); put(capsule(P(E), P(H), 12.5, 10), layer);
    put(circle(P(H), 12.5), layer);
  };
  arm(J.EB, J.HB);
  /* 胴: 厚い胸板、締まった腰（曲線で） */
  put(smooth([add(pel, back, 19), add(add(lerp(pel, neck, 0.5), back, 24), tUp, 0), add(add(neck, back, 30), down, 4), add(neck, back, 14),
              add(neck, fwd, 14), add(add(neck, fwd, 32), down, 4), add(add(lerp(pel, neck, 0.55), fwd, 27), tUp, 0), add(pel, fwd, 20)]));
  /* ざんばら髪 */
  const hair = [];
  for (let k = 0; k < 11; k++) { const t = Math.PI * (0.95 + k / 10 * 1.1), rr = k % 2 ? r * 1.15 : r * 1.7; hair.push(add(add(head, back, 5), [Math.cos(t) * rr, Math.sin(t) * rr])); }
  hair.push(add(head, [0, r * 0.4]));
  put(polyPath(hair));
  for (const id of ["hairTuft1", "hairTuft2"]) if (ch[id] && ch[id].length > 1) put(polyPath(strip(ch[id], 12, 3)));
  /* 頭とあご（四角くがっしり） */
  put(smooth([add(head, [-r * 0.95, -r * 0.7]), add(head, [r * 0.7, -r * 0.9]), add(add(head, fwd, r * 1.1), [0, -r * 0.1]),
              add(add(head, fwd, r * 1.05), [0, r * 0.8]), add(head, [0, r * 1.1]), add(head, [-r * 0.9, r * 0.6])]));
  /* 反り返った2本の角 */
  const horn = (b0, b1, tip, cp) => { const g = new Path2D(); g.moveTo(b0[0], b0[1]); g.quadraticCurveTo(cp[0], cp[1], tip[0], tip[1]); g.quadraticCurveTo(cp[0] + 6, cp[1] + 4, b1[0], b1[1]); g.closePath(); return g; };
  put(horn(add(head, [-r * 0.6, -r * 0.75]), add(head, [-r * 0.1, -r * 0.9]), add(head, [-r * 1.05, -r * 2.15]), add(head, [-r * 0.35, -r * 1.6])));
  put(horn(add(head, [r * 0.2, -r * 0.9]), add(head, [r * 0.75, -r * 0.65]), add(head, [r * 0.55, -r * 2.2]), add(head, [r * 0.85, -r * 1.5])));
  put(polyPath([add(add(head, fwd, r * 0.15), [0, -r * 0.25]), add(add(head, fwd, r * 0.85), [0, -r * 0.4]), add(add(head, fwd, r * 0.8), [0, -r * 0.05])]), "main", true);
  /* 金棒: 先が太く、とげのでこぼこが輪郭に出る */
  const hf = P(J.HF), fa = unit(sub(hf, P(J.EF))), cd = unit(add(fa, [0, -0.6])), nn = perpL(cd);
  put(capsule(add(hf, cd, -10), add(hf, cd, 70), 5, 11), "front");
  for (let k = 0; k < 4; k++) for (const sgn of [1, -1]) {
    const L = 32 + k * 12, w = 5 + (L + 10) / 80 * 6, b0 = add(add(hf, cd, L - 3), nn, sgn * w), b1 = add(add(hf, cd, L + 3), nn, sgn * w);
    put(polyPath([b0, b1, add(add(hf, cd, L), nn, sgn * (w + 6))]), "front");
  }
  arm(J.EF, J.HF, "front");
  return parts;
}
function costumeFox(j, ch) {
  ch = ch || {};
  const { P, pel, neck, head, sh, tUp, back, fwd, down, parts, put } = bodyFrame(j);
  const r = 13;
  /* 3本のふさふさの尻尾（根元は細く、中ほどが膨らみ、先がとがる。外へ反る） */
  const base = add(pel, back, 6);
  const tails = ["tailA", "tailB", "tailC"], angs = [[-8, 64, 0.5], [-48, 78, 0.5], [-92, 62, 0.5]];
  angs.forEach(([ang, L, bend], k) => {
    const DEGR = Math.PI / 180;
    let dir = unit([back[0] * Math.cos(ang * DEGR) + tUp[0] * Math.sin(-ang * DEGR), back[1] * Math.cos(ang * DEGR) + tUp[1] * Math.sin(-ang * DEGR)]);
    const c = ch[tails[k]];
    void c;   /* 尻尾は揺れ物に引っぱられない（体の動きにだけついていく。びよびよ防止） */
    put(plume(base, dir, L, -bend * 0.5, 24, 2));
  });
  /* 脚: 細く長い。ひざ下までの短い袴 */
  const leg = (K, A, T) => { put(capsule(pel, P(K), 7.5, 6)); put(capsule(P(K), P(A), 6, 4.5)); put(capsule(P(A), P(T), 4.5, 3.2)); };
  leg(J.KB, J.AB, J.TB); leg(J.KF, J.AF, J.TF);
  put(polyPath(hull([add(pel, back, 11), add(pel, fwd, 11), add(lerp(pel, P(J.KF), 0.8), fwd, 12), add(lerp(pel, P(J.KB), 0.8), back, 12),
                     add(lerp(pel, P(J.KF), 0.8), back, 4), add(lerp(pel, P(J.KB), 0.8), fwd, 4)])));
  /* 腕と、垂れる袖 */
  const arm = (E, H, layer, sleeve) => {
    put(capsule(sh, P(E), 6, 5), layer); put(capsule(P(E), P(H), 5, 4), layer); put(circle(P(H), 4.5), layer);
    put(polyPath(hull([add(sh, back, 3), add(sh, fwd, 5), P(E), add(P(E), down, 14), add(lerp(sh, P(E), 0.5), down, 10)])), layer);
    if (sleeve && sleeve.length > 1) put(polyPath(strip(sleeve, 12, 7)), layer);
  };
  arm(J.EB, J.HB);
  /* 細身の着物 */
  put(smooth([add(pel, back, 10), add(lerp(pel, neck, 0.5), back, 9), add(neck, back, 9), add(neck, fwd, 8), add(add(lerp(pel, neck, 0.55), fwd, 10), tUp, 2), add(pel, fwd, 10)]));
  /* 狐の面: 長い鼻先、大きな耳 */
  put(polyPath([add(head, [-r * 0.9, -r * 0.4]), add(head, [-r * 0.75, -r * 2.2]), add(head, [-r * 0.05, -r * 0.85])]));
  put(polyPath([add(head, [r * 0.05, -r * 0.85]), add(head, [r * 0.5, -r * 2.25]), add(head, [r * 0.85, -r * 0.35])]));
  put(smooth([add(head, [-r, -r * 0.5]), add(head, [-r * 0.6, r * 0.8]), add(head, [r * 0.3, r * 0.9]),
              add(add(head, fwd, r * 1.85), [0, r * 0.3]), add(head, [r * 0.6, -r * 0.8]), add(head, [-r * 0.4, -r])]));
  put(polyPath([add(add(head, fwd, r * 0.15), [0, -r * 0.05]), add(add(head, fwd, r * 0.85), [0, -r * 0.4]), add(add(head, fwd, r * 0.7), [0, r * 0.05])]), "main", true);
  arm(J.EF, J.HF, "front", ch.sleeve);
  return parts;
}
const COSTUMES = { miko: costumeMiko, komainu: costumeKomainu, oni404: costumeOni, fox: costumeFox };
function costume(j, ch, id) { return (COSTUMES[id] || costumeMiko)(j, ch); }

function rgba(h, a) { const n = parseInt(h.slice(1), 16); return "rgba(" + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + "," + a + ")"; }

/* 影絵: 全部品を「光る太い線」で描いてから黒で塗る → 外側の輪郭だけが光る。手前の腕は細い縁で別に重ねる */
function draw(ctx, joints, o) {
  const c = o.color || "#ff4a6b", parts = costume(joints, o.chains, o.id || "miko"), flash = o.flash || 0;
  ctx.save();
  ctx.translate(o.x, o.y); ctx.scale((o.facing || 1) * (o.scale || 1), o.scale || 1);
  ctx.globalAlpha = o.alpha == null ? 1 : o.alpha;
  ctx.lineJoin = "round";
  for (const layer of ["main", "front"]) {
    const ps = parts.filter(p => p.layer === layer && !p.eye), front = layer === "front";
    if (!ps.length) continue;
    /* 縁取りは全部品を1つの形にまとめて、まとめて描く（部品ごとに描くより大幅に軽い） */
    const all = new Path2D(); for (const p of ps) all.addPath(p.g);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = rgba(c, front ? 0.10 : 0.16); ctx.lineWidth = front ? 8 : 14; ctx.stroke(all);
    ctx.strokeStyle = rgba(c, front ? 0.18 : 0.30); ctx.lineWidth = front ? 4 : 7; ctx.stroke(all);
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = front ? rgba(c, 0.8) : c; ctx.lineWidth = front ? 1.6 : 3; ctx.stroke(all);
    const fill = flash > 0 ? "rgb(" + Math.round(6 + 240 * flash) + "," + Math.round(7 + 240 * flash) + "," + Math.round(13 + 240 * flash) + ")" : "#06070d";
    for (const p of ps) { ctx.fillStyle = fill; ctx.fill(p.g); }
  }
  ctx.globalCompositeOperation = "lighter";
  for (const p of parts) if (p.eye) { ctx.lineWidth = 5; ctx.strokeStyle = rgba(c, 0.35); ctx.stroke(p.g); ctx.fillStyle = "#ffffff"; ctx.fill(p.g); }
  ctx.restore();
}

window.MikoVisual = { solve, clipPose, draw, costume, J, has: id => !!COSTUMES[id] };
})();
