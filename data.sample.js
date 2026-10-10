window.GAME_DATA = {
  version: 1,
  texts: {
    title: "電脳奉納試合",
    titleEn: "CYBER SHRINE : VOTIVE BOUT",
    tagline: "境内サーバーで、神と神がぶつかる。",
    hints: ["必殺ボタンだけでも技が出る「かんたん操作」", "ゲージが満タンになると大祓が撃てる", "ガードは相手と反対の方向キー"],
    howto: ["移動: 方向キー / スティック", "弱・強: 通常技", "必殺: かんたん操作ならボタンだけで出る", "投げ: 弱+強 かガードを崩せる", "ゲージ満タンで 大祓(超必殺)"],
    banners: { round: "ROUND {n}", finalRound: "FINAL ROUND", fight: "FIGHT!", ko: "浄化完了", timeup: "TIME UP", draw: "DRAW", perfect: "PERFECT", superReady: "大祓 READY", win: "WIN" },
    glitchWords: ["SEGFAULT", "NULL", "404", "0xDEADBEEF", "STACK OVERFLOW"]
  },
  roster: ["miko"],
  stage: {
    name: "電脳神社・参道", subtitle: "ネオン鳥居の境内",
    colors: { skyTop: "#05060f", skyBottom: "#120a2e", torii: "#ff3b5c", grid: "#19f3ff", floor: "#0b0a22", lantern: "#ffd24a", accent: "#ff4fa3" }
  },
  fortunes: {
    ranks: [
      { id: "daikichi", label: "大吉", reading: "だいきち", color: "gold", minPoints: 90,
        lines: ["本番環境も神の加護あり", "ご利益、フル稼働", "今日はコミットが全部通る"] },
      { id: "kichi", label: "吉", reading: "きち", color: "green", minPoints: 45,
        lines: ["まずまずの勝ち。油断は禁物", "無難に納品完了", "バックアップを忘れずに"] },
      { id: "daikyo", label: "大凶", reading: "だいきょう", color: "violet", minPoints: 0,
        lines: ["辛勝。まず保存せよ", "勝ちは勝ち。月曜まで待て", "仕様です、と言い張れ"] }
    ]
  },
  characters: {
    miko: {
      id: "miko",
      name: "電脳巫女", nameEn: "CYBER MIKO", title: "バランス型",
      blurb: "お札の飛び道具と堅実な立ち回りで戦う、基本のキャラ。",
      ratings: { power: 3, speed: 3, range: 4, defense: 3 },
      stats: {
        hp: 1000, walkF: 3.4, walkB: 2.8, jumpVy: 15, jumpVx: 3.6, gravity: 0.75,
        airJumps: 0, prejump: 4, landLag: 3,
        dashF: { frames: 18, speed: 7.0 }, dashB: { frames: 18, speed: 5.5, invuln: 6 },
        gaugeMul: 1.0
      },
      boxes: {
        push: { stand: { w: 52, h: 100 }, crouch: { w: 56, h: 70 }, air: { w: 44, h: 100 } },
        hurt: {
          stand:  [ { x: -18, y: 138, w: 38, h: 38 }, { x: -26, y: 60, w: 54, h: 82 }, { x: -24, y: 0, w: 48, h: 64 } ],
          crouch: [ { x: -14, y: 70, w: 40, h: 42 }, { x: -28, y: 0, w: 58, h: 74 } ],
          air:    [ { x: -24, y: 20, w: 50, h: 140 } ]
        }
      },
      look: {
        palette:   { skin: "#ffe0cc", hair: "#1a1033", primary: "#f4f7ff", secondary: "#ff3b5c", accent: "#ffd24a", glow: "#19f3ff", outline: "#0a0620", eye: "#19f3ff" },
        paletteP2: { skin: "#ffe0cc", hair: "#2b1033", primary: "#e8ddff", secondary: "#a56bff", accent: "#ffd24a", glow: "#ff4fa3", outline: "#0a0620", eye: "#ff4fa3" },
        body: {
          torsoLen: 52, torsoWTop: 30, torsoWBottom: 24, neckLen: 8, headR: 15, shoulderDrop: 6,
          uArmLen: 30, fArmLen: 28, handR: 6, thighLen: 40, shinLen: 40, footLen: 20, footH: 8,
          limbW: { uArm: [11, 9], fArm: [9, 7], thigh: [16, 13], shin: [12, 9] }
        },
        colors: { head: "skin", neck: "skin", torso: "primary", uArm: "primary", fArm: "primary", hand: "skin", thigh: "secondary", shin: "secondary", foot: "accent" },
        prop: { kind: "gohei", len: 46, thick: 4, angle: 0, color: "accent" },
        neon: { tubeW: 3, glowW: 8, glowAlpha: 0.24, coreW: 1, fill: 0.9 },
        decor: [
          { id: "hairBack", attach: "head", at: "end", shape: "ellipse", x: -6, y: 2, rx: 17, ry: 17, color: "hair", z: "back" },
          { id: "hairTop", attach: "head", at: "end", shape: "poly", x: 0, y: 0, pts: [[-16, 2], [-12, 16], [0, 20], [12, 16], [17, 6], [8, 10], [0, 9], [-8, 7]], color: "hair", z: "front" },
          { id: "eye", attach: "head", at: "end", shape: "line", x: 5, y: 3, x2: 8, y2: 0, w: 3, color: "eye", glow: true, z: "front" },
          { id: "kanzashi", attach: "head", at: "end", shape: "circle", x: -8, y: 15, r: 4, color: "accent", glow: true, z: "front" },
          { id: "collar", attach: "torso", at: "end", shape: "rect", x: -2, y: -8, w: 26, h: 10, color: "secondary", z: "front" },
          { id: "obi", attach: "torso", at: "start", shape: "rect", x: -2, y: 6, w: 28, h: 9, color: "accent", z: "front" },
          { id: "circuit", attach: "torso", at: "mid", shape: "rect", x: 6, y: 0, w: 3, h: 20, color: "glow", glow: true, z: "front" }
        ],
        chains: [
          { id: "ponytail", anchor: { bone: "head", at: "end", x: -12, y: 6 }, segs: 5, segLen: 11, widthStart: 9, widthEnd: 3, color: "hair", style: "tuft", stiffness: 0.08, damping: 0.12, gravity: 0.35, rest: -75, z: "back" },
          { id: "ribbon", anchor: { bone: "head", at: "end", x: -13, y: 10 }, segs: 4, segLen: 12, widthStart: 7, widthEnd: 4, color: "secondary", style: "ribbon", stiffness: 0.06, damping: 0.14, gravity: 0.3, rest: -95, z: "back" },
          { id: "sleeveF", anchor: { bone: "farmF", at: "end", x: 0, y: 0 }, segs: 4, segLen: 9, widthStart: 14, widthEnd: 10, color: "primary", style: "ribbon", stiffness: 0.02, damping: 0.15, gravity: 0.6, inertia: 1.2, kick: 1.2, rest: 0, z: "front" },
          { id: "sleeveB", anchor: { bone: "farmB", at: "end", x: 0, y: 0 }, segs: 4, segLen: 9, widthStart: 14, widthEnd: 10, color: "primary", style: "ribbon", stiffness: 0.02, damping: 0.15, gravity: 0.6, rest: 0, z: "back" },
          { id: "haoriTail", anchor: { bone: "torso", at: "start", x: -12, y: 2 }, segs: 3, segLen: 14, widthStart: 14, widthEnd: 10, color: "primary", style: "ribbon", stiffness: 0.05, damping: 0.14, gravity: 0.5, rest: -20, z: "back" }
        ]
      },
      feel: {
        breath: { amp: 0.012, period: 90 },
        jump: { sx: 0.94, sy: 1.08, frames: 4 }, land: { sx: 1.10, sy: 0.88, frames: 6 }, dash: { sx: 1.06, sy: 0.97, frames: 5 },
        hitShake: { amp: [1, 2, 3, 3.5] }, recoil: { x: [3, 6, 10, 14], rot: [2, 4, 7, 10], frames: 4 },
        squashHit: { sx: 1.06, sy: 0.94, frames: 3 }
      },
      basePose: { rootX: 0, rootY: 0, rot: 0, torso: 6, head: -3, uarmF: 38, farmF: 75, uarmB: 14, farmB: 60, thighF: 22, shinF: 34, footF: 12, thighB: -14, shinB: 14, footB: 28 },
      clips: {
        idle: { length: 72, loop: true, plant: "feet", blend: 6, keys: [
          { f: 0, ease: "inOutQuad", p: "base" },
          { f: 36, ease: "inOutQuad", p: { torso: 8, head: -4, uarmF: 42, farmF: 70, uarmB: 18, farmB: 56, thighF: 26, shinF: 42, footF: 16, thighB: -15, shinB: 18, footB: 33 } } ] },
        walkF: { length: 32, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 16, sfx: "step" } ], keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 8, thighF: 30, shinF: 10, footF: -20, thighB: -24, shinB: 28, footB: 20, uarmF: 30, farmF: 80, uarmB: 44, farmB: 62 } },
          { f: 8, ease: "inOutQuad", p: { thighF: 6, shinF: 8, footF: 2, thighB: 28, shinB: 60, footB: 30, uarmF: 36, uarmB: 36 } },
          { f: 16, ease: "inOutQuad", p: { thighF: -24, shinF: 28, footF: 20, thighB: 30, shinB: 10, footB: -20, uarmF: 44, uarmB: 30 } },
          { f: 24, ease: "inOutQuad", p: { thighF: 28, shinF: 60, footF: 30, thighB: 6, shinB: 8, footB: 2, uarmF: 36, uarmB: 36 } } ] },
        walkB: { length: 40, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 20, sfx: "step" } ], keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 18, shinF: 22, footF: 4, thighB: -22, shinB: 24, footB: 2 } },
          { f: 10, ease: "inOutQuad", p: { thighF: 4, shinF: 8, footF: 2, thighB: -6, shinB: 44, footB: 26 } },
          { f: 20, ease: "inOutQuad", p: { thighF: -22, shinF: 24, footF: 2, thighB: 18, shinB: 22, footB: 4 } },
          { f: 30, ease: "inOutQuad", p: { thighF: -6, shinF: 44, footF: 26, thighB: 4, shinB: 8, footB: 2 } } ] },
        crouch: { length: 60, loop: true, plant: "feet", blend: 4, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 30, head: -12, uarmF: 50, farmF: 90, uarmB: 35, farmB: 80, thighF: 75, shinF: 125, footF: 50, thighB: 60, shinB: 125, footB: 65 } },
          { f: 30, ease: "inOutQuad", p: { torso: 32, head: -13, thighF: 77, shinF: 128, footF: 51, thighB: 62, shinB: 128, footB: 66 } } ] },
        jumpUp: { length: 18, plant: "root", blend: 3, keys: [
          { f: 6, ease: "outCubic", p: { torso: 2, thighF: 60, shinF: 95, footF: 35, thighB: 18, shinB: 55, footB: 30, uarmF: 75, farmF: 60, uarmB: 50, farmB: 70 } },
          { f: 18, ease: "inOutQuad", p: { torso: 0, head: 0, thighF: 68, shinF: 105, thighB: 22, shinB: 62 } } ] },
        jumpFall: { length: 24, loop: true, plant: "root", blend: 6, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 30, shinF: 40, footF: 20, thighB: -6, shinB: 44, footB: 30, uarmF: 60, farmF: 50, uarmB: 40, farmB: 60 } },
          { f: 12, ease: "inOutQuad", p: { thighF: 26, shinF: 34, thighB: -2, shinB: 38, uarmF: 68, uarmB: 46 } } ] },
        dashF: { length: 18, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "linear", p: { torso: 24, head: -8, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: -20, farmF: 70, uarmB: 60, farmB: 80 } },
          { f: 9, ease: "inOutQuad", p: { torso: 26, thighF: -35, shinF: 50, footF: 10, thighB: 50, shinB: 80, footB: 30, uarmF: 55, farmF: 80, uarmB: -25, farmB: 70 } },
          { f: 17, ease: "inOutQuad", p: { torso: 24, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: -20, uarmB: 60 } } ] },
        dashB: { length: 18, plant: "feet", blend: 2, keys: [
          { f: 4, ease: "outCubic", p: { rootY: 22, rot: -6, torso: -8, thighF: 30, shinF: 60, footF: 25, thighB: 10, shinB: 50, footB: 35 } },
          { f: 12, ease: "inOutQuad", p: { rootY: 10, rot: -3, torso: -4 } },
          { f: 17, ease: "inQuad", p: { rootY: 0, rot: 0, torso: 6, thighF: 40, shinF: 70, footF: 30, thighB: 20, shinB: 60, footB: 40 } } ] },
        landing: { length: 6, plant: "feet", blend: 1, keys: [
          { f: 0, ease: "linear", p: { torso: 30, thighF: 60, shinF: 100, footF: 40, thighB: 40, shinB: 90, footB: 50, uarmF: 50, farmF: 80, uarmB: 35, farmB: 70 } },
          { f: 5, ease: "inOutQuad", p: "base" } ] },
        guardStand: { length: 30, loop: true, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 10, head: 2, uarmF: 52, farmF: 118, uarmB: 44, farmB: 112, thighF: 26, shinF: 42, footF: 16, thighB: -15, shinB: 18, footB: 33 } },
          { f: 15, ease: "inOutQuad", p: { torso: 8, uarmF: 50, farmF: 120 } } ] },
        guardCrouch: { length: 30, loop: true, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 30, head: -12, uarmF: 52, farmF: 118, uarmB: 44, farmB: 112, thighF: 75, shinF: 125, footF: 50, thighB: 60, shinB: 125, footB: 65 } },
          { f: 15, ease: "inOutQuad", p: { torso: 32, uarmF: 50, farmF: 120 } } ] },
        hurtHigh: { length: 16, plant: "feet", blend: 1, keys: [
          { f: 2, ease: "outExpo", p: { torso: -16, head: -22, rootX: -6, uarmF: -5, farmF: 25, uarmB: -20, farmB: 30, thighF: 16, shinF: 28, footF: 12, thighB: -18, shinB: 20, footB: 30 } },
          { f: 12, ease: "inOutQuad", p: { torso: -8, head: -12, rootX: -3 } } ] },
        hurtLow: { length: 16, plant: "feet", blend: 1, keys: [
          { f: 2, ease: "outExpo", p: { torso: 34, head: 14, rootX: -4, uarmF: 10, farmF: 40, uarmB: -8, farmB: 30, thighF: 36, shinF: 60, footF: 24, thighB: -8, shinB: 40, footB: 25 } },
          { f: 12, ease: "inOutQuad", p: { torso: 26, head: 8 } } ] },
        hurtAir: { length: 24, plant: "root", blend: 1, keys: [
          { f: 3, ease: "outCubic", p: { rot: -25, torso: -14, head: -18, uarmF: -20, farmF: 20, uarmB: -30, farmB: 20, thighF: 30, shinF: 50, footF: 20, thighB: 10, shinB: 50, footB: 20 } },
          { f: 24, ease: "inOutQuad", p: { rot: -80, torso: -6, thighF: 40, shinF: 70 } } ] },
        down: { length: 40, loop: true, plant: "root", blend: 3, keys: [
          { f: 0, ease: "inOutQuad", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: 20, farmF: 10, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } },
          { f: 20, ease: "inOutQuad", p: { head: -3, uarmF: 22 } } ] },
        wakeup: { length: 18, plant: "root", blend: 1, keys: [
          { f: 0, ease: "linear", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: 20, farmF: 10, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } },
          { f: 8, ease: "outCubic", p: { rot: -30, rootY: -30, torso: 35, head: 10, uarmF: 25, farmF: 60, uarmB: 15, farmB: 50, thighF: 60, shinF: 110, footF: 50, thighB: 40, shinB: 100, footB: 60 } },
          { f: 17, ease: "inOutQuad", p: "base" } ] },
        thrown: { length: 20, loop: true, plant: "root", blend: 2, keys: [
          { f: 0, ease: "inOutQuad", p: { rot: -20, rootY: -10, torso: -10, head: -15, uarmF: 70, farmF: 30, uarmB: 60, farmB: 40, thighF: 40, shinF: 60, footF: 20, thighB: 20, shinB: 50, footB: 20 } },
          { f: 10, ease: "inOutQuad", p: { rot: -26, uarmF: 80, uarmB: 50, thighF: 34 } } ] },
        intro: { length: 60, plant: "feet", blend: 6, keys: [
          { f: 20, ease: "inOutCubic", p: { torso: 42, head: 10, uarmF: 25, farmF: 105, uarmB: 25, farmB: 105 } },
          { f: 34, ease: "linear", p: { torso: 42, head: 10 } },
          { f: 52, ease: "inOutCubic", p: "base" } ] },
        win: { length: 90, loop: true, plant: "feet", blend: 6, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: -4, head: -6, uarmF: 150, farmF: 25, uarmB: 20, farmB: 50, thighF: 20, shinF: 28, footF: 8, thighB: -12, shinB: 12, footB: 24 } },
          { f: 45, ease: "inOutQuad", p: { uarmF: 158, torso: -6 } } ] },
        lose: { length: 40, plant: "feet", blend: 6, keys: [
          { f: 20, ease: "outCubic", p: { torso: 38, head: 20, uarmF: 10, farmF: 30, uarmB: 5, farmB: 25, thighF: 50, shinF: 90, footF: 40, thighB: 30, shinB: 80, footB: 50 } } ] },

        "5L": { length: 16, plant: "feet", blend: 2, keys: [
          { f: 2, ease: "inOutQuad", p: { torso: 2, rootX: -3, uarmF: 6, farmF: 112 } },
          { f: 5, ease: "outExpo", p: { torso: 14, head: -5, rootX: 7, uarmF: 90, farmF: 4, thighF: 30, shinF: 40, footF: 10 } },
          { f: 8, ease: "linear", p: { uarmF: 94, farmF: 0, rootX: 9 } },
          { f: 15, ease: "inOutQuad", p: "base" } ] },
        "5H": { length: 32, plant: "feet", blend: 3,
          squash: [ { f: 9, sx: 1, sy: 1 }, { f: 11, sx: 1.04, sy: 0.96, ease: "outExpo" }, { f: 15, sx: 1, sy: 1, ease: "outCubic" } ],
          keys: [
          { f: 4, ease: "inOutQuad", p: { torso: -8, rootX: -6, uarmF: 150, farmF: 40, uarmB: 60, farmB: 80 } },
          { f: 9, ease: "inQuad", p: { torso: -12, rootX: -8, uarmF: 172, farmF: 15, head: -8 } },
          { f: 11, ease: "outBack", back: 1.2, p: { torso: 26, head: -8, rootX: 12, uarmF: 85, farmF: 8, uarmB: -20, farmB: 20, thighF: 36, shinF: 38, footF: 2, thighB: -22, shinB: 10, footB: 22 } },
          { f: 15, ease: "linear", p: { torso: 30, rootX: 15, uarmF: 60, farmF: 6 } },
          { f: 31, ease: "inOutQuad", p: "base" } ] },
        "2L": { base: "crouch", length: 17, plant: "feet", blend: 2, keys: [
          { f: 2, ease: "inOutQuad", p: { rootX: -2, uarmF: 15, farmF: 110 } },
          { f: 5, ease: "outExpo", p: { uarmF: 88, farmF: 5, rootX: 6, torso: 36 } },
          { f: 8, ease: "linear", p: { uarmF: 92 } },
          { f: 16, ease: "inOutQuad", p: "base" } ] },
        "2H": { base: "crouch", length: 34, plant: "feet", blend: 3, keys: [
          { f: 3, ease: "inOutQuad", p: { torso: 38, rootX: -4, uarmF: -30, farmF: 60 } },
          { f: 9, ease: "outExpo", p: { torso: 46, head: -4, rootX: 10, uarmF: 60, farmF: 4, uarmB: -10, farmB: 20 } },
          { f: 13, ease: "linear", p: { rootX: 14, uarmF: 72 } },
          { f: 33, ease: "inOutQuad", p: "base" } ] },
        "jL": { base: "jumpFall", length: 18, plant: "root", blend: 2, keys: [
          { f: 2, ease: "inOutQuad", p: { uarmF: 20, farmF: 100 } },
          { f: 4, ease: "outExpo", p: { uarmF: 88, farmF: 6, torso: 10 } },
          { f: 13, ease: "linear", p: { uarmF: 92 } },
          { f: 17, ease: "inOutQuad", p: "base" } ] },
        "jH": { base: "jumpFall", length: 24, plant: "root", blend: 2, keys: [
          { f: 3, ease: "inOutQuad", p: { uarmF: 165, farmF: 30, torso: -8 } },
          { f: 8, ease: "outExpo", p: { uarmF: 70, farmF: 5, torso: 22, thighF: 40, shinF: 50 } },
          { f: 14, ease: "linear", p: { uarmF: 55, torso: 26 } },
          { f: 23, ease: "inOutQuad", p: "base" } ] },
        throw: { length: 27, plant: "feet", blend: 2, keys: [
          { f: 2, ease: "inOutQuad", p: { torso: 8, uarmF: 60, farmF: 20, uarmB: 60, farmB: 20 } },
          { f: 5, ease: "outCubic", p: { torso: 20, rootX: 8, uarmF: 85, farmF: 5, uarmB: 85, farmB: 5 } },
          { f: 7, ease: "linear", p: { rootX: 10 } },
          { f: 26, ease: "inOutQuad", p: "base" } ] },
        throwHit: { length: 48, plant: "feet", blend: 1, keys: [
          { f: 0, ease: "linear", p: { torso: 20, rootX: 8, uarmF: 85, farmF: 5, uarmB: 85, farmB: 5 } },
          { f: 12, ease: "inOutCubic", p: { torso: -10, rootX: 0, uarmF: 170, farmF: 10, uarmB: 170, farmB: 10, thighF: 26, shinF: 36, footF: 10 } },
          { f: 26, ease: "outExpo", p: { torso: 35, rootX: 10, uarmF: 40, farmF: 5, uarmB: 40, farmB: 5 } },
          { f: 30, ease: "linear", p: { rootX: 12 } },
          { f: 47, ease: "inOutQuad", p: "base" } ] },
        sp1: { length: 42, plant: "feet", blend: 3, keys: [
          { f: 5, ease: "inOutQuad", p: { torso: -6, rootX: -4, uarmF: 120, farmF: 60, uarmB: 40, farmB: 70 } },
          { f: 13, ease: "outExpo", p: { torso: 12, rootX: 5, uarmF: 88, farmF: 8, uarmB: 60, farmB: 10, thighF: 30, shinF: 40, footF: 10 } },
          { f: 20, ease: "linear", p: { uarmF: 90, rootX: 7 } },
          { f: 41, ease: "inOutQuad", p: "base" } ] },
        sp2: { length: 41, plant: "feet", blend: 2, keys: [
          { f: 3, ease: "inOutQuad", p: { torso: 18, rootX: -4, thighF: 48, shinF: 80, footF: 30, thighB: 30, shinB: 70, footB: 40, uarmF: 20, farmF: 90 } },
          { f: 6, ease: "outExpo", p: { torso: -8, head: -10, rootX: 2, uarmF: 170, farmF: 10, uarmB: 150, farmB: 20, thighF: 20, shinF: 10, footF: -10, thighB: -8, shinB: 30, footB: 20 } },
          { f: 13, ease: "linear", p: { torso: -14, uarmF: 176, thighF: 26 } },
          { f: 27, ease: "inOutQuad", p: { torso: 2, uarmF: 70, farmF: 50, uarmB: 30, farmB: 50, thighF: 30, shinF: 50, footF: 20, thighB: -10, shinB: 24, footB: 20 } },
          { f: 40, ease: "inOutQuad", p: "base" } ] },
        super: { length: 72, plant: "feet", blend: 3, keys: [
          { f: 4, ease: "inOutQuad", p: { torso: -10, rootX: -4, uarmF: 170, farmF: 20, uarmB: 170, farmB: 20 } },
          { f: 10, ease: "outExpo", p: { torso: 24, head: -6, rootX: 10, uarmF: 85, farmF: 4, uarmB: 80, farmB: 8, thighF: 36, shinF: 40, footF: 4, thighB: -26, shinB: 10, footB: 26 } },
          { f: 36, ease: "linear", p: { rootX: 14, uarmF: 92 } },
          { f: 71, ease: "inOutQuad", p: "base" } ] }
      },
      moves: {
        "5L": { kind: "normal", name: "立ち弱", stance: "stand", startup: 5, active: 3, recovery: 8,
          boxes: [ { f0: 6, f1: 8, x: 34, y: 92, w: 56, h: 30 } ],
          hit: { damage: 30, chip: 0, level: "mid", hitstun: 15, blockstun: 11, hitstop: 6, knock: { hit: 8, block: 10 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          cancel: { into: ["5L", "2L", "5H", "2H", "sp1", "sp2", "super"], frames: 10 },
          trail: { from: "prop", color: "glow", width: 9, frames: 6 }, sfx: "swingL" },
        "2L": { kind: "normal", name: "しゃがみ弱", stance: "crouch", startup: 5, active: 3, recovery: 9,
          boxes: [ { f0: 6, f1: 8, x: 34, y: 18, w: 60, h: 24 } ],
          hit: { damage: 26, chip: 0, level: "low", hitstun: 16, blockstun: 12, hitstop: 6, knock: { hit: 8, block: 10 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          cancel: { into: ["5L", "2L", "5H", "2H", "sp1", "sp2", "super"], frames: 10 },
          trail: { from: "prop", color: "glow", width: 8, frames: 6 }, sfx: "swingL" },
        "5H": { kind: "normal", name: "立ち強", stance: "stand", startup: 11, active: 4, recovery: 17,
          boxes: [ { f0: 12, f1: 15, x: 40, y: 85, w: 78, h: 40 } ],
          hit: { damage: 72, chip: 0, level: "mid", hitstun: 24, blockstun: 16, hitstop: 10, knock: { hit: 14, block: 18 }, effect: "stun", gauge: { hit: 45, block: 22 }, impact: 3 },
          cancel: { into: ["sp1", "sp2", "super"], frames: 12 },
          trail: { from: "prop", color: "glow", width: 14, frames: 8 }, sfx: "swingH" },
        "2H": { kind: "normal", name: "しゃがみ強", stance: "crouch", startup: 9, active: 4, recovery: 21,
          boxes: [ { f0: 10, f1: 13, x: 30, y: 0, w: 96, h: 26 } ],
          hit: { damage: 60, chip: 0, level: "low", hitstun: 0, blockstun: 12, hitstop: 10, knock: { hit: 0, block: 18 }, effect: "launch", launch: { vx: 3, vy: 6.5 }, juggle: 0, gauge: { hit: 40, block: 20 }, impact: 3 },
          cancel: { into: ["sp1", "super"], frames: 10 },
          trail: { from: "prop", color: "glow", width: 14, frames: 8 }, sfx: "swingH" },
        "jL": { kind: "normal", name: "ジャンプ弱", stance: "air", startup: 4, active: 9, recovery: 5, landLag: 3,
          boxes: [ { f0: 5, f1: 13, x: 20, y: 40, w: 56, h: 50 } ],
          hit: { damage: 28, chip: 0, level: "mid", hitstun: 16, blockstun: 12, hitstop: 6, knock: { hit: 6, block: 8 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          sfx: "swingL" },
        "jH": { kind: "normal", name: "ジャンプ強", stance: "air", startup: 8, active: 6, recovery: 10, landLag: 4,
          boxes: [ { f0: 9, f1: 14, x: 24, y: -8, w: 62, h: 74 } ],
          hit: { damage: 60, chip: 0, level: "mid", hitstun: 22, blockstun: 16, hitstop: 10, knock: { hit: 10, block: 14 }, effect: "stun", gauge: { hit: 45, block: 22 }, impact: 3 },
          trail: { from: "prop", color: "glow", width: 14, frames: 8 }, sfx: "swingH" },
        throw: { kind: "throw", name: "投げ", stance: "stand", startup: 5, active: 2, recovery: 20, boxes: [], hit: null,
          throw: {
            box: { x: 10, y: 20, w: 64, h: 100 }, techable: true, damage: 120, grabFrames: 30, afterRecovery: 18, attackerClip: "throwHit",
            hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 12, ease: "inOutCubic", x: 24, y: 170, rot: -100 }, { f: 26, ease: "outExpo", x: 70, y: 30, rot: -150 }, { f: 30, ease: "linear", x: 76, y: 20, rot: -160 } ],
            launch: { vx: 3, vy: 7 }, hitstop: 12, impact: 3, gauge: { hit: 40 } },
          sfx: "grab" },
        sp1: { kind: "special", name: "護符弾", stance: "stand", startup: 13, active: 1, recovery: 28, boxes: [], hit: null,
          spawn: [ { at: 14, projectile: "fuda", x: 56, y: 104 } ], sfx: "cast" },
        sp2: { kind: "special", name: "昇り鈴", stance: "stand", startup: 6, active: 7, recovery: 28, landLag: 6,
          boxes: [ { f0: 7, f1: 13, x: 12, y: 30, w: 62, h: 140 } ],
          hit: { damage: 78, chip: 6, level: "mid", hitstun: 0, blockstun: 22, hitstop: 10, knock: { hit: 0, block: 14 }, effect: "launch", launch: { vx: 2.5, vy: 10 }, juggle: 3, gauge: { hit: 60, block: 30 }, impact: 3 },
          motion: [ { f0: 7, f1: 7, vx: 2.5, vy: 11 } ],
          invuln: [ { f0: 1, f1: 9, type: "strike" } ],
          sfx: "rise" },
        super: { kind: "super", name: "大祓「八百万デバッグ」", stance: "stand", startup: 10, active: 26, recovery: 36, cost: 1000, flash: 40,
          boxes: [ { f0: 11, f1: 36, x: 20, y: 0, w: 300, h: 170 } ],
          hit: { damage: 44, chip: 8, level: "mid", hitstun: 22, blockstun: 20, hitstop: 4, knock: { hit: 0, block: 8 }, effect: "stun", gauge: { hit: 0, block: 0 }, impact: 2 },
          multi: { count: 5, every: 5, final: { damage: 130, chip: 14, level: "mid", hitstun: 0, blockstun: 24, hitstop: 18, knock: { hit: 0, block: 30 }, effect: "launch", launch: { vx: 4, vy: 9 }, juggle: 0, gauge: { hit: 0, block: 0 }, impact: 4 } },
          invuln: [ { f0: 1, f1: 10, type: "all" } ],
          spawn: [ { at: 11, projectile: "oharae_beam", x: 40, y: 90 } ],
          sfx: "super" }
      },
      projectiles: {
        fuda: { life: 90, vx: 8.5, vy: 0, box: { x: -17, y: -14, w: 34, h: 28 }, hits: 1, maxActive: 1, priority: 1,
          hit: { damage: 52, chip: 7, level: "mid", hitstun: 20, blockstun: 14, hitstop: 8, knock: { hit: 10, block: 14 }, effect: "stun", gauge: { hit: 30, block: 15 }, impact: 2 },
          look: { style: "fuda", color: "glow", size: 1.0 } },
        oharae_beam: { life: 36, vx: 0, vy: 0, box: null, hit: null, hits: 1, maxActive: 1, priority: 0, follow: true,
          look: { style: "beam", color: "accent", size: 1.0 } }
      },
      quotes: {
        select: "デバッグ、始めます。",
        intro: ["電脳巫女、参ります！"],
        win: ["浄化完了。再起動どうぞ。", "ご利益、納品しました。"],
        lose: ["バックアップ…あったかな…"]
      }
    }
  }
};
