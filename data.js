window.GAME_DATA = {
  version: 1,
  texts: {
    title: "電脳奉納試合",
    titleEn: "CYBER SHRINE : VOTIVE BOUT",
    tagline: "境内サーバーで、神と神がぶつかる。",
    hints: ["必殺ボタンだけでも技が出る「かんたん操作」", "ゲージが満タンになると大祓が撃てる", "ガードは相手と反対の方向キー", "パッドの割り当ては入力設定で変えられる"],
    howto: ["移動: 方向キー / スティック", "弱・強: 通常技", "必殺: かんたん操作ならボタンだけで出る", "投げ: 弱+強 かガードを崩せる", "ゲージ満タンで 大祓(超必殺)"],
    banners: { round: "ROUND {n}", finalRound: "FINAL ROUND", fight: "FIGHT!", ko: "浄化完了", timeup: "TIME UP", draw: "DRAW", perfect: "PERFECT", superReady: "大祓 READY", win: "WIN" },
    glitchWords: ["SEGFAULT", "NULL", "404", "0xDEADBEEF", "STACK OVERFLOW"]
  },
  roster: ["miko", "komainu", "oni404", "fox", "tengu", "maneki", "chochin", "kappa", "onmyo", "byakko"],
  stage: {
    name: "電脳神社・参道", subtitle: "ネオン鳥居の境内",
    colors: { skyTop: "#05060f", skyBottom: "#120a2e", torii: "#ff3b5c", grid: "#19f3ff", floor: "#0b0a22", lantern: "#ffd24a", accent: "#ff4fa3" }
  },
  fortunes: {
    ranks: [
      { id: "daikichi", label: "大吉", reading: "だいきち", color: "gold", minPoints: 90,
        lines: ["本番環境も神の加護あり", "ご利益、フル稼働", "今日はコミットが全部通る"] },
      { id: "chukichi", label: "中吉", reading: "ちゅうきち", color: "yellow", minPoints: 75,
        lines: ["デプロイ成功。テストも緑", "強めの一撃、神も驚く", "次の試合も期待してます"] },
      { id: "shokichi", label: "小吉", reading: "しょうきち", color: "green", minPoints: 60,
        lines: ["地味に強い。堅実に納品", "派手さはないが安定運用", "ログは丁寧に残しておこう"] },
      { id: "kichi", label: "吉", reading: "きち", color: "cyan", minPoints: 45,
        lines: ["まずまずの勝ち。油断は禁物", "無難に納品完了", "バックアップを忘れずに"] },
      { id: "suekichi", label: "末吉", reading: "すえきち", color: "blue", minPoints: 30,
        lines: ["ギリギリ通った。次は慎重に", "勝ちは勝ち。胸を張れ", "明日はもう少し余裕を持て"] },
      { id: "kyo", label: "凶", reading: "きょう", color: "violet", minPoints: 15,
        lines: ["辛勝。バックアップを取るべし", "勝ったが、設計書は読み直せ", "今日は早めに保存を押せ"] },
      { id: "daikyo", label: "大凶", reading: "だいきょう", color: "red", minPoints: 0,
        lines: ["勝ちは勝ち。月曜まで待て", "仕様です、と胸を張って言え", "次は神も驚く準備をしておこう"] }
    ]
  },
  characters: {
    miko: {
      id: "miko",
      name: "電脳巫女", nameEn: "CYBER MIKO", title: "バランス型",
      blurb: "お札の飛び道具と堅実な立ち回りで戦う、基本のキャラ。",
      ratings: { power: 3, speed: 3, range: 4, defense: 3 },
      stats: {
        dmgMul: 0.95, hp: 1000, walkF: 3.4, walkB: 2.8, jumpVy: 15, jumpVx: 3.6, gravity: 0.75,
        airJumps: 0, prejump: 4, landLag: 3,
        dashF: { frames: 18, speed: 8.0 }, dashB: { frames: 18, speed: 5.5, invuln: 6 },
        gaugeMul: 1.0
      },
      boxes: {
        push: { stand: { w: 52, h: 100 }, crouch: { w: 56, h: 70 }, air: { w: 44, h: 100 } },
        hurt: {
          stand:  [ { x: -9, y: 139, w: 32, h: 32 }, { x: -26, y: 60, w: 54, h: 82 }, { x: -24, y: 0, w: 48, h: 64 } ],
          crouch: [ { x: 17, y: 92, w: 32, h: 32 }, { x: -28, y: 0, w: 58, h: 74 } ],
          air:    [ { x: -24, y: 20, w: 50, h: 149 }, { x: -12, y: 137, w: 32, h: 32 } ]
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
      basePose: { rootX: 0, rootY: 0, rot: 0, torso: 6, head: -3, uarmF: 20, farmF: 140, uarmB: 14, farmB: 60, thighF: 22, shinF: 34, footF: 12, thighB: -14, shinB: 14, footB: 28 },
      clips: {
        sp3: {length: 46,plant: "feet",blend: 3,squash: [{f: 9,sx: 1,sy: 1},{f: 11,sx: 1.04,sy: 0.96,ease: "outExpo"},{f: 15,sx: 1,sy: 1,ease: "outCubic"}],keys: [{f: 10,ease: "outQuad",p: {torso: 10,uarmF: 30,farmF: 120,thighF: 40,shinF: 70,rootY: -6}},{f: 18,ease: "outExpo",p: {torso: 40,head: 6,uarmF: 88,farmF: 0,uarmB: -50,farmB: 10,rootX: 20,rootY: -12,thighF: 78,shinF: 80,footF: 10,thighB: -50,shinB: 0,footB: 30}},{f: 24,ease: "linear",p: {torso: 40,head: 6,uarmF: 88,farmF: 0,uarmB: -50,farmB: 10,rootX: 20,rootY: -12,thighF: 78,shinF: 80,footF: 10,thighB: -50,shinB: 0,footB: 30}},{f: 46,ease: "inOutQuad",p: "base"}]},
        idle: { length: 72, loop: true, plant: "feet", blend: 6, keys: [
          { f: 0, ease: "inOutQuad", p: "base" },
          { f: 36, ease: "inOutQuad", p: { torso: 8, head: -4, uarmF: 24, farmF: 135, uarmB: 18, farmB: 56, thighF: 26, shinF: 42, footF: 16, thighB: -15, shinB: 18, footB: 33 } } ] },
        walkF: { length: 32, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 16, sfx: "step" } ], keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 8, thighF: 30, shinF: 10, footF: -20, thighB: -24, shinB: 28, footB: 20, uarmF: 12, farmF: 145, uarmB: 44, farmB: 62 } },
          { f: 8, ease: "inOutQuad", p: { thighF: 6, shinF: 8, footF: 2, thighB: 28, shinB: 60, footB: 30, uarmF: 18, uarmB: 36 } },
          { f: 16, ease: "inOutQuad", p: { thighF: -24, shinF: 28, footF: 20, thighB: 30, shinB: 10, footB: -20, uarmF: 26, uarmB: 30 } },
          { f: 24, ease: "inOutQuad", p: { thighF: 28, shinF: 60, footF: 30, thighB: 6, shinB: 8, footB: 2, uarmF: 18, uarmB: 36 } } ] },
        walkB: { length: 40, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 20, sfx: "step" } ], keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 18, shinF: 22, footF: 4, thighB: -22, shinB: 24, footB: 2 } },
          { f: 10, ease: "inOutQuad", p: { thighF: 4, shinF: 8, footF: 2, thighB: -6, shinB: 44, footB: 26 } },
          { f: 20, ease: "inOutQuad", p: { thighF: -22, shinF: 24, footF: 2, thighB: 18, shinB: 22, footB: 4 } },
          { f: 30, ease: "inOutQuad", p: { thighF: -6, shinF: 44, footF: 26, thighB: 4, shinB: 8, footB: 2 } } ] },
        crouch: { length: 60, loop: true, plant: "feet", blend: 4, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 30, head: -12, uarmF: 32, farmF: 155, uarmB: 35, farmB: 80, thighF: 75, shinF: 125, footF: 50, thighB: 60, shinB: 125, footB: 65 } },
          { f: 30, ease: "inOutQuad", p: { torso: 32, head: -13, thighF: 77, shinF: 128, footF: 51, thighB: 62, shinB: 128, footB: 66 } } ] },
        jumpUp: { length: 18, plant: "root", blend: 3, keys: [
          { f: 6, ease: "outCubic", p: { torso: 2, thighF: 60, shinF: 95, footF: 35, thighB: 18, shinB: 55, footB: 30, uarmF: 57, farmF: 125, uarmB: 50, farmB: 70 } },
          { f: 18, ease: "inOutQuad", p: { torso: 0, head: 0, thighF: 68, shinF: 105, thighB: 22, shinB: 62 } } ] },
        jumpFall: { length: 24, loop: true, plant: "root", blend: 6, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 30, shinF: 40, footF: 20, thighB: -6, shinB: 44, footB: 30, uarmF: 42, farmF: 115, uarmB: 40, farmB: 60 } },
          { f: 12, ease: "inOutQuad", p: { thighF: 26, shinF: 34, thighB: -2, shinB: 38, uarmF: 50, uarmB: 46 } } ] },
        dashF: { length: 18, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "linear", p: { torso: 24, head: -8, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: -38, farmF: 135, uarmB: 60, farmB: 80 } },
          { f: 9, ease: "inOutQuad", p: { torso: 26, thighF: -35, shinF: 50, footF: 10, thighB: 50, shinB: 80, footB: 30, uarmF: 37, farmF: 145, uarmB: -25, farmB: 70 } },
          { f: 17, ease: "inOutQuad", p: { torso: 24, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: -38, uarmB: 60 } } ] },
        dashB: { length: 18, plant: "feet", blend: 2, keys: [
          { f: 4, ease: "outCubic", p: { rootY: 22, rot: -6, torso: -8, thighF: 30, shinF: 60, footF: 25, thighB: 10, shinB: 50, footB: 35 } },
          { f: 12, ease: "inOutQuad", p: { rootY: 10, rot: -3, torso: -4 } },
          { f: 17, ease: "inQuad", p: { rootY: 0, rot: 0, torso: 6, thighF: 40, shinF: 70, footF: 30, thighB: 20, shinB: 60, footB: 40 } } ] },
        landing: { length: 6, plant: "feet", blend: 1, keys: [
          { f: 0, ease: "linear", p: { torso: 30, thighF: 60, shinF: 100, footF: 40, thighB: 40, shinB: 90, footB: 50, uarmF: 32, farmF: 145, uarmB: 35, farmB: 70 } },
          { f: 5, ease: "inOutQuad", p: "base" } ] },
        guardStand: { length: 30, loop: true, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 10, head: 2, uarmF: 52, farmF: 118, uarmB: 44, farmB: 112, thighF: 26, shinF: 42, footF: 16, thighB: -15, shinB: 18, footB: 33 } },
          { f: 15, ease: "inOutQuad", p: { torso: 8, uarmF: 50, farmF: 120 } } ] },
        guardCrouch: { length: 30, loop: true, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 30, head: -12, uarmF: 52, farmF: 118, uarmB: 44, farmB: 112, thighF: 75, shinF: 125, footF: 50, thighB: 60, shinB: 125, footB: 65 } },
          { f: 15, ease: "inOutQuad", p: { torso: 32, uarmF: 50, farmF: 120 } } ] },
        hurtHigh: { length: 16, plant: "feet", blend: 1, keys: [
          { f: 2, ease: "outExpo", p: { torso: -16, head: -22, rootX: -6, uarmF: -5, farmF: 25, uarmB: -20, farmB: 30, thighF: 20, shinF: 34, footF: 12, thighB: -18, shinB: 10, footB: 24 } },
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
          { f: 0, ease: "linear", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: 2, farmF: 75, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } },
          { f: 8, ease: "outCubic", p: { rot: -30, rootY: -30, torso: 35, head: 10, uarmF: 7, farmF: 125, uarmB: 15, farmB: 50, thighF: 60, shinF: 110, footF: 50, thighB: 40, shinB: 100, footB: 60 } },
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

        "5L": {length: 16,plant: "feet",blend: 2,keys: [{f: 3,ease: "outQuad",p: {torso: 0,uarmF: 55,farmF: 110,rootX: -3}},{f: 5,ease: "outExpo",p: {torso: 14,head: -2,uarmF: 96,farmF: 0,rootX: 8,thighF: 30,shinF: 30}},{f: 8,ease: "linear",p: {torso: 12,uarmF: 94,farmF: 4,rootX: 8}},{f: 16,ease: "inOutQuad",p: "base"}]},
        "5H": {length: 32,plant: "feet",blend: 3,squash: [{f: 9,sx: 1,sy: 1},{f: 11,sx: 1.04,sy: 0.96,ease: "outExpo"},{f: 15,sx: 1,sy: 1,ease: "outCubic"}],keys: [{f: 6,ease: "outQuad",p: {torso: -12,head: -10,uarmF: 175,farmF: 15,uarmB: -20,farmB: 40,rootX: -6,thighF: 16,thighB: -22}},{f: 11,ease: "outExpo",p: {torso: 30,head: 4,uarmF: 100,farmF: -2,uarmB: -40,farmB: 30,rootX: 16,thighF: 48,shinF: 44,footF: 10,thighB: -30,shinB: 6}},{f: 15,ease: "linear",p: {torso: 30,head: 4,uarmF: 100,farmF: -2,uarmB: -40,farmB: 30,rootX: 16,thighF: 48,shinF: 44,footF: 10,thighB: -30,shinB: 6}},{f: 32,ease: "inOutQuad",p: "base"}]},
        "2L": {base: "crouch",length: 17,plant: "feet",blend: 2,keys: [{f: 3,ease: "outQuad",p: {uarmF: 40,farmF: 120,rootX: -2}},{f: 5,ease: "outExpo",p: {torso: 34,head: -16,uarmF: 112,farmF: 0,rootX: 10}},{f: 8,ease: "linear",p: {torso: 34,head: -16,uarmF: 112,farmF: 0,rootX: 10}},{f: 17,ease: "inOutQuad",p: "base"}]},
        "2H": {base: "crouch",length: 34,plant: "feet",blend: 3,keys: [{f: 5,ease: "outQuad",p: {torso: 20,head: -10,uarmF: -40,farmF: 30,uarmB: 40,rootX: -6}},{f: 9,ease: "outExpo",p: {torso: 44,head: -6,uarmF: 62,farmF: -2,uarmB: -40,farmB: 20,rootX: 12,rootY: -4}},{f: 13,ease: "linear",p: {torso: 44,head: -6,uarmF: 62,farmF: -2,uarmB: -40,farmB: 20,rootX: 12,rootY: -4}},{f: 34,ease: "inOutQuad",p: "base"}]},
        jL: {base: "jumpFall",length: 18,plant: "root",blend: 2,keys: [{f: 2,ease: "outQuad",p: {uarmF: 50,farmF: 110,thighF: 60,shinF: 110}},{f: 4,ease: "outExpo",p: {torso: 8,uarmF: 92,farmF: 0,thighF: 95,shinF: 120,uarmB: -20}},{f: 13,ease: "linear",p: {torso: 8,uarmF: 92,farmF: 0,thighF: 95,shinF: 120,uarmB: -20}},{f: 18,ease: "inOutQuad",p: "base"}]},
        jH: {base: "jumpFall",length: 24,plant: "root",blend: 2,keys: [{f: 4,ease: "outQuad",p: {torso: -15,uarmF: 175,farmF: 10}},{f: 8,ease: "outExpo",p: {torso: 30,uarmF: 55,farmF: 0,thighF: 50,shinF: 90,thighB: 10,shinB: 100}},{f: 14,ease: "linear",p: {torso: 30,uarmF: 55,farmF: 0,thighF: 50,shinF: 90,thighB: 10,shinB: 100}},{f: 24,ease: "inOutQuad",p: "base"}]},
        throw: {length: 27,plant: "feet",blend: 2,keys: [{f: 3,ease: "outQuad",p: {uarmF: 60,farmF: 60,uarmB: 50,farmB: 60}},{f: 5,ease: "outExpo",p: {torso: 28,head: 6,uarmF: 70,farmF: 40,uarmB: 72,farmB: 40,rootX: 10,thighF: 40,shinF: 40}},{f: 7,ease: "linear",p: {torso: 28,head: 6,uarmF: 70,farmF: 40,uarmB: 72,farmB: 40,rootX: 10,thighF: 40,shinF: 40}},{f: 27,ease: "inOutQuad",p: "base"}]},
        throwHit: { length: 48, plant: "feet", blend: 1, keys: [
          { f: 0, ease: "linear", p: { torso: 20, rootX: 8, uarmF: 85, farmF: 5, uarmB: 85, farmB: 5 } },
          { f: 12, ease: "inOutCubic", p: { torso: -10, rootX: 0, uarmF: 170, farmF: 10, uarmB: 170, farmB: 10, thighF: 26, shinF: 36, footF: 10 } },
          { f: 26, ease: "outExpo", p: { torso: 35, rootX: 10, uarmF: 40, farmF: 5, uarmB: 40, farmB: 5 } },
          { f: 30, ease: "linear", p: { rootX: 12 } },
          { f: 47, ease: "inOutQuad", p: "base" } ] },
        sp1: {length: 48,plant: "feet",blend: 3,keys: [{f: 7,ease: "outQuad",p: {torso: -18,head: -8,uarmF: -50,farmF: 70,uarmB: 70,farmB: 40,rootX: -6,thighF: 10,thighB: -20}},{f: 13,ease: "outExpo",p: {torso: 22,head: -4,uarmF: 132,farmF: 0,uarmB: -70,farmB: 10,rootX: 16,thighF: 52,shinF: 50,thighB: -32,shinB: 4}},{f: 18,ease: "linear",p: {torso: 22,head: -4,uarmF: 132,farmF: 0,uarmB: -70,farmB: 10,rootX: 16,thighF: 52,shinF: 50,thighB: -32,shinB: 4}},{f: 48,ease: "inOutQuad",p: "base"}]},
        sp2: { length: 41, plant: "feet", blend: 2, keys: [
          { f: 3, ease: "inOutQuad", p: { torso: 18, rootX: -4, thighF: 48, shinF: 80, footF: 30, thighB: 30, shinB: 70, footB: 40, uarmF: 20, farmF: 90 } },
          { f: 6, ease: "outExpo", p: { torso: -8, head: -10, rootX: 2, uarmF: 170, farmF: 10, uarmB: 150, farmB: 20, thighF: 20, shinF: 10, footF: -10, thighB: -8, shinB: 30, footB: 20 } },
          { f: 13, ease: "linear", p: { torso: -14, uarmF: 176, thighF: 26 } },
          { f: 27, ease: "inOutQuad", p: { torso: 2, uarmF: 70, farmF: 50, uarmB: 30, farmB: 50, thighF: 30, shinF: 50, footF: 20, thighB: -10, shinB: 24, footB: 20 } },
          { f: 40, ease: "inOutQuad", p: "base" } ] },
        super: {length: 72,plant: "feet",blend: 3,keys: [{f: 6,ease: "outQuad",p: {torso: 10,head: 6,uarmF: 70,farmF: 150,uarmB: 70,farmB: 150,thighF: 30,shinF: 60,rootY: -8}},{f: 10,ease: "outExpo",p: {torso: -8,head: -14,uarmF: 135,farmF: 0,uarmB: -130,farmB: 0,thighF: 42,shinF: 20,thighB: -42,shinB: 10}},{f: 56,ease: "linear",p: {torso: -8,head: -14,uarmF: 135,farmF: 0,uarmB: -130,farmB: 0,thighF: 42,shinF: 20,thighB: -42,shinB: 10}},{f: 72,ease: "inOutQuad",p: "base"}]},
      },
      moves: {
        sp3: { kind: "special", name: "踏込祓", stance: "stand", startup: 18, active: 6, recovery: 22,
          boxes: [{ f0: 19, f1: 24, x: 40, y: 85, w: 80, h: 44 }],
          hit: { damage: 76, chip: 5, level: "mid", hitstun: 22, blockstun: 14, hitstop: 10, knock: { hit: 16, block: 20 }, effect: "stun", gauge: { hit: 50, block: 25 }, impact: 3 },
          motion: [{ f0: 3, f1: 24, vx: 9 }], invuln: [{ f0: 1, f1: 24, type: "proj" }],
          trail: { from: "prop", color: "glow", width: 14, frames: 10 }, sfx: "swingH" },
        "5L": { kind: "normal", name: "立ち弱", stance: "stand", startup: 5, active: 3, recovery: 8,
          boxes: [ { f0: 6, f1: 8, x: 34, y: 92, w: 81, h: 30 } ],
          hit: { damage: 30, chip: 0, level: "mid", hitstun: 19, blockstun: 11, hitstop: 6, knock: { hit: 8, block: 10 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          cancel: { into: ["5L", "2L", "5H", "2H", "sp1", "sp2", "super"], frames: 14 },
          trail: { from: "prop", color: "glow", width: 9, frames: 6 }, sfx: "swingL" },
        "2L": { kind: "normal", otg: true, name: "しゃがみ弱", stance: "crouch", startup: 5, active: 3, recovery: 9,
          boxes: [ { f0: 6, f1: 8, x: 34, y: 18, w: 97, h: 24 } ],
          hit: { damage: 26, chip: 0, level: "low", hitstun: 20, blockstun: 12, hitstop: 6, knock: { hit: 8, block: 10 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          cancel: { into: ["5L", "2L", "5H", "2H", "sp1", "sp2", "super"], frames: 14 },
          trail: { from: "prop", color: "glow", width: 8, frames: 6 }, sfx: "swingL" },
        "5H": { kind: "normal", name: "立ち強", stance: "stand", startup: 11, active: 4, recovery: 17,
          boxes: [ { f0: 12, f1: 15, x: 40, y: 85, w: 89, h: 40 } ],
          hit: { damage: 78, chip: 0, level: "mid", hitstun: 24, blockstun: 16, hitstop: 10, knock: { hit: 14, block: 18 }, effect: "stun", gauge: { hit: 45, block: 22 }, impact: 3 },
          cancel: { into: ["sp1", "sp2", "super"], frames: 16 },
          trail: { from: "prop", color: "glow", width: 14, frames: 8 }, sfx: "swingH" },
        "2H": { kind: "normal", name: "しゃがみ強", stance: "crouch", startup: 9, active: 4, recovery: 21,
          boxes: [ { f0: 10, f1: 13, x: 30, y: 0, w: 43, h: 26 } ],
          hit: { damage: 60, chip: 0, level: "low", hitstun: 0, blockstun: 12, hitstop: 10, knock: { hit: 0, block: 18 }, effect: "launch", launch: { vx: 1.5, vy: 9.5 }, juggle: 3, gauge: { hit: 40, block: 20 }, impact: 3 },
          cancel: { into: ["sp2", "super", "jump"], frames: 14 },
          trail: { from: "prop", color: "glow", width: 14, frames: 8 }, sfx: "swingH" },
        "jL": { kind: "normal", name: "ジャンプ弱", stance: "air", startup: 4, active: 9, recovery: 5, landLag: 3,
          boxes: [ { f0: 5, f1: 13, x: 20, y: 40, w: 84, h: 50 } ],
          hit: { damage: 28, chip: 0, level: "mid", hitstun: 16, blockstun: 12, hitstop: 6, knock: { hit: 6, block: 8 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          cancel: { into: ["jH"], frames: 12 },
          sfx: "swingL" },
        "jH": { kind: "normal", name: "ジャンプ強", stance: "air", startup: 8, active: 6, recovery: 10, landLag: 4,
          boxes: [ { f0: 9, f1: 14, x: 24, y: -8, w: 53, h: 74 } ],
          hit: { damage: 60, chip: 0, level: "mid", hitstun: 22, blockstun: 16, hitstop: 10, knock: { hit: 10, block: 14 }, effect: "stun", gauge: { hit: 45, block: 22 }, impact: 3 },
          trail: { from: "prop", color: "glow", width: 14, frames: 8 }, sfx: "swingH" },
        throw: { kind: "throw", name: "投げ", stance: "stand", startup: 5, active: 2, recovery: 20, boxes: [], hit: null,
          throw: {
            box: { x: 10, y: 20, w: 64, h: 100 }, techable: true, damage: 120, grabFrames: 30, afterRecovery: 18, attackerClip: "throwHit",
            hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 12, ease: "inOutCubic", x: 24, y: 170, rot: -100 }, { f: 26, ease: "outExpo", x: 70, y: 30, rot: -150 }, { f: 30, ease: "linear", x: 76, y: 20, rot: -160 } ],
            launch: { vx: 3, vy: 7 }, hitstop: 12, impact: 3, gauge: { hit: 40 } },
          sfx: "grab" },
        sp1: { kind: "special", name: "護符弾", stance: "stand", startup: 13, active: 1, recovery: 34, boxes: [], hit: null,
          spawn: [ { at: 14, projectile: "fuda", x: 56, y: 66 } ], sfx: "cast" },
        sp2: { kind: "special", name: "昇り鈴", stance: "stand", startup: 6, active: 7, recovery: 28, landLag: 6,
          boxes: [ { f0: 7, f1: 13, x: 12, y: 30, w: 53, h: 140 } ],
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
          hit: { damage: 48, chip: 6, level: "mid", hitstun: 0, blockstun: 14, hitstop: 8, knock: { hit: 0, block: 14 }, effect: "launch", launch: { vx: 3, vy: 6 }, juggle: 0, gauge: { hit: 30, block: 15 }, impact: 2 },
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
    },
    komainu: {
      id: "komainu",
      name: "狛犬AI", nameEn: "KOMAINU AI", title: "突進・制圧型",
      blurb: "前傾で突っ込む四つ足型。頭突きと対空で相手の動きを押さえる。",
      ratings: { power: 4, speed: 4, range: 2, defense: 3 },
      stats: {
        dmgMul: 1.12, hp: 1120, walkF: 3.8, walkB: 3.0, jumpVy: 14.5, jumpVx: 4.2, gravity: 0.78,
        airJumps: 0, prejump: 4, landLag: 3,
        dashF: { frames: 20, speed: 9.5, run: true }, dashB: { frames: 18, speed: 6.0, invuln: 6 },
        gaugeMul: 1.0
      },
      boxes: {
        push: { stand: { w: 60, h: 104 }, crouch: { w: 64, h: 78 }, air: { w: 50, h: 104 } },
        hurt: {
          stand:  [ { x: 38, y: 127, w: 42, h: 29 }, { x: 26, y: 98, w: 26, h: 36 }, { x: -28, y: 56, w: 60, h: 76 }, { x: -26, y: 0, w: 56, h: 60 } ],
          crouch: [ { x: 39, y: 91, w: 42, h: 29 }, { x: 20, y: 56, w: 30, h: 38 }, { x: -30, y: 0, w: 64, h: 62 } ],
          air:    [ { x: -26, y: 16, w: 56, h: 133 }, { x: 26, y: 92, w: 26, h: 32 }, { x: 39, y: 120, w: 42, h: 29 } ]
        }
      },
      look: {
        palette:   { skin: "#c9d4ff", hair: "#6a7ab0", primary: "#7a86b8", secondary: "#19f3ff", accent: "#ffd24a", glow: "#19f3ff", outline: "#0a0620", eye: "#19f3ff" },
        paletteP2: { skin: "#ffd9c2", hair: "#4a3a2a", primary: "#c46a3a", secondary: "#ff4fa3", accent: "#ffd24a", glow: "#ff4fa3", outline: "#0a0620", eye: "#ff4fa3" },
        body: {
          torsoLen: 50, torsoWTop: 40, torsoWBottom: 30, neckLen: 10, headR: 14, shoulderDrop: 4,
          uArmLen: 40, fArmLen: 40, handR: 7, thighLen: 44, shinLen: 42, footLen: 24, footH: 9,
          limbW: { uArm: [14, 11], fArm: [12, 9], thigh: [18, 14], shin: [14, 10] }
        },
        colors: { head: "primary", neck: "primary", torso: "primary", uArm: "primary", fArm: "primary", hand: "skin", thigh: "primary", shin: "primary", foot: "secondary" },
        prop: { kind: "none", len: 0, thick: 0, angle: 0, color: "accent" },
        neon: { tubeW: 3.5, glowW: 9, glowAlpha: 0.22, coreW: 1, fill: 0.9 },
        decor: [
          { id: "mane1", attach: "head", at: "end", shape: "poly", x: 0, y: 0, pts: [[-6, 8], [-24, 26], [-10, 20]], color: "hair", z: "back" },
          { id: "mane2", attach: "head", at: "end", shape: "poly", x: 0, y: 0, pts: [[-2, 10], [-16, 34], [2, 18]], color: "hair", z: "back" },
          { id: "mane3", attach: "head", at: "end", shape: "poly", x: 0, y: 0, pts: [[4, 12], [-4, 34], [10, 16]], color: "hair", z: "front" },
          { id: "eyeA", attach: "head", at: "end", shape: "circle", x: 7, y: 3, r: 2.2, color: "eye", glow: true, z: "front" },
          { id: "eyeB", attach: "head", at: "end", shape: "circle", x: 7, y: -3, r: 2.2, color: "eye", glow: true, z: "front" },
          { id: "rope", attach: "torso", at: "mid", shape: "rect", x: 8, y: 0, w: 10, h: 30, color: "accent", z: "front" },
          { id: "circuit", attach: "torso", at: "mid", shape: "line", x: -12, y: -14, x2: 0, y2: 26, w: 2, color: "glow", glow: true, z: "back" }
        ],
        chains: [
          { id: "maneTuft1", anchor: { bone: "head", at: "end", x: -8, y: 4 }, segs: 3, segLen: 8, widthStart: 9, widthEnd: 3, color: "hair", style: "tuft", stiffness: 0.12, damping: 0.14, gravity: 0.3, inertia: 1.5, kick: 1.2, rest: -100, z: "back" },
          { id: "maneTuft2", anchor: { bone: "head", at: "end", x: -12, y: -2 }, segs: 3, segLen: 8, widthStart: 8, widthEnd: 3, color: "hair", style: "tuft", stiffness: 0.1, damping: 0.13, gravity: 0.35, inertia: 1.5, kick: 1.2, rest: -120, z: "back" },
          { id: "shortTail", anchor: { bone: "pelvis", at: "start", x: -14, y: 6 }, segs: 3, segLen: 9, widthStart: 10, widthEnd: 4, color: "glow", style: "tuft", stiffness: 0.06, damping: 0.1, gravity: 0.3, inertia: 1.4, kick: 1.0, rest: -105, z: "back" },
          { id: "ropeEnd", anchor: { bone: "torso", at: "start", x: 8, y: 4 }, segs: 2, segLen: 8, widthStart: 8, widthEnd: 6, color: "accent", style: "ribbon", stiffness: 0.04, damping: 0.18, gravity: 0.6, inertia: 0.8, kick: 0.8, rest: -60, z: "front" }
        ]
      },
      feel: {
        breath: { amp: 0.014, period: 84 },
        jump: { sx: 0.94, sy: 1.08, frames: 4 }, land: { sx: 1.10, sy: 0.88, frames: 6 }, dash: { sx: 1.10, sy: 0.95, frames: 5 },
        hitShake: { amp: [1, 2, 3, 3.5] }, recoil: { x: [3, 6, 10, 14], rot: [2, 4, 7, 10], frames: 4 },
        squashHit: { sx: 1.06, sy: 0.94, frames: 3 }
      },
      basePose: { rootX: 2, rootY: 0, rot: 0, torso: 38, head: 18, uarmF: 52, farmF: 12, uarmB: 50, farmB: 14, thighF: 14, shinF: 26, footF: 12, thighB: 8, shinB: 18, footB: 10 },
      clips: {
        sp3: {base: "jumpFall",length: 36,plant: "root",blend: 2,keys: [{f: 9,ease: "outQuad",p: {torso: 20,uarmF: 20,farmF: 60,uarmB: 20,farmB: 60,thighF: 60,shinF: 110,thighB: 50,shinB: 110}},{f: 16,ease: "outExpo",p: {torso: 40,head: 18,uarmF: 128,farmF: 0,uarmB: 120,farmB: 0,thighF: -10,shinF: 20,thighB: -40,shinB: 30}},{f: 24,ease: "linear",p: {torso: 40,head: 18,uarmF: 128,farmF: 0,uarmB: 120,farmB: 0,thighF: -10,shinF: 20,thighB: -40,shinB: 30}},{f: 36,ease: "inOutQuad",p: "base"}]},
        idle: { length: 84, loop: true, plant: "feet", blend: 6, keys: [
          { f: 0, ease: "inOutQuad", p: "base" },
          { f: 42, ease: "inOutQuad", p: { torso: 41, head: 16, uarmF: 56, farmF: 14, uarmB: 54, farmB: 16, thighF: 17, shinF: 30, footF: 13, thighB: 10, shinB: 22, footB: 12 } } ] },
        walkF: { length: 32, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 16, sfx: "step" } ], keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 40, thighF: 30, shinF: 10, footF: -20, thighB: -24, shinB: 28, footB: 20, uarmF: 42, farmF: 22, uarmB: 58, farmB: 22 } },
          { f: 8, ease: "inOutQuad", p: { thighF: 6, shinF: 8, footF: 2, thighB: 28, shinB: 60, footB: 30, uarmF: 48, uarmB: 48 } },
          { f: 16, ease: "inOutQuad", p: { thighF: -24, shinF: 28, footF: 20, thighB: 30, shinB: 10, footB: -20, uarmF: 56, uarmB: 40 } },
          { f: 24, ease: "inOutQuad", p: { thighF: 28, shinF: 60, footF: 30, thighB: 6, shinB: 8, footB: 2, uarmF: 48, uarmB: 48 } } ] },
        walkB: { length: 40, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 20, sfx: "step" } ], keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 40, thighF: 18, shinF: 22, footF: 4, thighB: -22, shinB: 24, footB: 2 } },
          { f: 10, ease: "inOutQuad", p: { thighF: 4, shinF: 8, footF: 2, thighB: -6, shinB: 44, footB: 26 } },
          { f: 20, ease: "inOutQuad", p: { thighF: -22, shinF: 24, footF: 2, thighB: 18, shinB: 22, footB: 4 } },
          { f: 30, ease: "inOutQuad", p: { thighF: -6, shinF: 44, footF: 26, thighB: 4, shinB: 8, footB: 2 } } ] },
        crouch: { length: 60, loop: true, plant: "feet", blend: 4, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 42, head: 8, uarmF: 58, farmF: 22, uarmB: 56, farmB: 22, thighF: 60, shinF: 112, footF: 52, thighB: 58, shinB: 110, footB: 52 } },
          { f: 30, ease: "inOutQuad", p: { torso: 44, head: 6, thighF: 62, shinF: 114, footF: 52, thighB: 58, shinB: 110, footB: 52 } } ] },
        jumpUp: { length: 18, plant: "root", blend: 3, keys: [
          { f: 6, ease: "outCubic", p: { torso: 36, thighF: 60, shinF: 95, footF: 35, thighB: 18, shinB: 55, footB: 30, uarmF: 75, farmF: 60, uarmB: 60, farmB: 70 } },
          { f: 18, ease: "inOutQuad", p: { torso: 38, head: 16, thighF: 68, shinF: 105, thighB: 22, shinB: 62 } } ] },
        jumpFall: { length: 24, loop: true, plant: "root", blend: 6, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 40, thighF: 30, shinF: 40, footF: 20, thighB: -6, shinB: 44, footB: 30, uarmF: 60, farmF: 50, uarmB: 58, farmB: 60 } },
          { f: 12, ease: "inOutQuad", p: { thighF: 26, shinF: 34, thighB: -2, shinB: 38, uarmF: 68, uarmB: 56 } } ] },
        dashF: { length: 20, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "linear", p: { torso: 46, head: 4, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: 30, farmF: 40, uarmB: 40, farmB: 50 } },
          { f: 10, ease: "inOutQuad", p: { torso: 48, thighF: -35, shinF: 50, footF: 10, thighB: 50, shinB: 80, footB: 30, uarmF: 60, farmF: 50, uarmB: 20, farmB: 40 } },
          { f: 19, ease: "inOutQuad", p: { torso: 46, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: 30, uarmB: 40 } } ] },
        dashB: { length: 18, plant: "feet", blend: 2, keys: [
          { f: 4, ease: "outCubic", p: { rootY: 22, rot: -6, torso: 20, thighF: 30, shinF: 60, footF: 25, thighB: 10, shinB: 50, footB: 35 } },
          { f: 12, ease: "inOutQuad", p: { rootY: 10, rot: -3, torso: 24 } },
          { f: 17, ease: "inQuad", p: { rootY: 0, rot: 0, torso: 40, thighF: 40, shinF: 70, footF: 30, thighB: 20, shinB: 60, footB: 40 } } ] },
        landing: { length: 6, plant: "feet", blend: 1, keys: [
          { f: 0, ease: "linear", p: { torso: 40, thighF: 60, shinF: 100, footF: 40, thighB: 40, shinB: 90, footB: 50, uarmF: 60, farmF: 60, uarmB: 58, farmB: 60 } },
          { f: 5, ease: "inOutQuad", p: "base" } ] },
        guardStand: { length: 30, loop: true, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 42, head: 12, uarmF: 58, farmF: 110, uarmB: 50, farmB: 100, thighF: 14, shinF: 26, footF: 12, thighB: 8, shinB: 18, footB: 10 } },
          { f: 15, ease: "inOutQuad", p: { torso: 40, uarmF: 56, farmF: 112 } } ] },
        guardCrouch: { length: 30, loop: true, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 44, head: 6, uarmF: 58, farmF: 110, uarmB: 50, farmB: 100, thighF: 60, shinF: 112, footF: 52, thighB: 58, shinB: 110, footB: 52 } },
          { f: 15, ease: "inOutQuad", p: { torso: 46, uarmF: 56, farmF: 112 } } ] },
        hurtHigh: { length: 16, plant: "feet", blend: 1, keys: [
          { f: 2, ease: "outExpo", p: { torso: 0, head: -20, rootX: -6, uarmF: 10, farmF: 30, uarmB: 0, farmB: 30, thighF: 16, shinF: 28, footF: 12, thighB: 6, shinB: 20, footB: 14 } },
          { f: 12, ease: "inOutQuad", p: { torso: 8, head: -12, rootX: -3 } } ] },
        hurtLow: { length: 16, plant: "feet", blend: 1, keys: [
          { f: 2, ease: "outExpo", p: { torso: 52, head: 14, rootX: -4, uarmF: 30, farmF: 40, uarmB: 20, farmB: 30, thighF: 36, shinF: 60, footF: 24, thighB: 10, shinB: 30, footB: 20 } },
          { f: 12, ease: "inOutQuad", p: { torso: 46, head: 8 } } ] },
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
          { f: 20, ease: "inOutCubic", p: { torso: 46, head: 14, uarmF: 30, farmF: 100, uarmB: 30, farmB: 100 } },
          { f: 34, ease: "linear", p: { torso: 46, head: 14 } },
          { f: 52, ease: "inOutCubic", p: "base" } ] },
        win: { length: 90, loop: true, plant: "feet", blend: 6, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 10, head: -4, uarmF: 150, farmF: 25, uarmB: 40, farmB: 50, thighF: 20, shinF: 28, footF: 8, thighB: -12, shinB: 12, footB: 24 } },
          { f: 45, ease: "inOutQuad", p: { uarmF: 158, torso: 8 } } ] },
        lose: { length: 40, plant: "feet", blend: 6, keys: [
          { f: 20, ease: "outCubic", p: { torso: 42, head: 20, uarmF: 10, farmF: 30, uarmB: 5, farmB: 25, thighF: 50, shinF: 90, footF: 40, thighB: 30, shinB: 80, footB: 50 } } ] },

        "5L": {length: 17,plant: "feet",blend: 2,keys: [{f: 3,ease: "outQuad",p: {torso: 30,uarmF: 20,farmF: 70,rootX: -3}},{f: 5,ease: "outExpo",p: {torso: 46,head: 10,uarmF: 104,farmF: 0,rootX: 8,thighF: 28,shinF: 36}},{f: 8,ease: "linear",p: {torso: 46,head: 10,uarmF: 104,farmF: 0,rootX: 8,thighF: 28,shinF: 36}},{f: 17,ease: "inOutQuad",p: "base"}]},
        "2L": {base: "crouch",length: 17,plant: "feet",blend: 2,keys: [{f: 3,ease: "outQuad",p: {uarmF: 30,farmF: 60,rootX: -2}},{f: 5,ease: "outExpo",p: {torso: 56,head: 4,uarmF: 96,farmF: 0,rootX: 10}},{f: 8,ease: "linear",p: {torso: 56,head: 4,uarmF: 96,farmF: 0,rootX: 10}},{f: 17,ease: "inOutQuad",p: "base"}]},
        "5H": {length: 35,plant: "feet",blend: 3,squash: [{f: 11,sx: 0.97,sy: 1.03},{f: 12,sx: 1.04,sy: 0.96,ease: "outExpo"},{f: 16,sx: 1,sy: 1,ease: "outCubic"}],keys: [{f: 7,ease: "outQuad",p: {torso: 14,head: 0,uarmF: 165,farmF: 30,uarmB: 120,farmB: 30,rootX: -6,thighF: 10}},{f: 12,ease: "outExpo",p: {torso: 62,head: 18,uarmF: 72,farmF: 0,uarmB: 20,farmB: 20,rootX: 16,thighF: 50,shinF: 50,thighB: -24,shinB: 10}},{f: 16,ease: "linear",p: {torso: 62,head: 18,uarmF: 72,farmF: 0,uarmB: 20,farmB: 20,rootX: 16,thighF: 50,shinF: 50,thighB: -24,shinB: 10}},{f: 35,ease: "inOutQuad",p: "base"}]},
        "2H": {base: "crouch",length: 36,plant: "feet",blend: 3,keys: [{f: 6,ease: "outQuad",p: {torso: 30,head: -10,uarmF: 20,farmF: 40,uarmB: 20,farmB: 40,rootX: -6}},{f: 10,ease: "outExpo",p: {torso: 78,head: 32,uarmF: -30,farmF: 20,uarmB: -40,farmB: 20,rootX: 16}},{f: 14,ease: "linear",p: {torso: 78,head: 32,uarmF: -30,farmF: 20,uarmB: -40,farmB: 20,rootX: 16}},{f: 36,ease: "inOutQuad",p: "base"}]},
        jL: {base: "jumpFall",length: 18,plant: "root",blend: 2,keys: [{f: 3,ease: "outQuad",p: {uarmF: 30,farmF: 70}},{f: 5,ease: "outExpo",p: {torso: 30,uarmF: 112,farmF: 0,uarmB: 40,farmB: 40}},{f: 13,ease: "linear",p: {torso: 30,uarmF: 112,farmF: 0,uarmB: 40,farmB: 40}},{f: 18,ease: "inOutQuad",p: "base"}]},
        jH: {base: "jumpFall",length: 25,plant: "root",blend: 2,keys: [{f: 5,ease: "outQuad",p: {torso: 10,head: -10,uarmF: 0,uarmB: 0}},{f: 9,ease: "outExpo",p: {torso: 82,head: 34,uarmF: -40,farmF: 20,uarmB: -50,farmB: 20,thighF: 10,shinF: 60,thighB: -30,shinB: 60}},{f: 15,ease: "linear",p: {torso: 82,head: 34,uarmF: -40,farmF: 20,uarmB: -50,farmB: 20,thighF: 10,shinF: 60,thighB: -30,shinB: 60}},{f: 25,ease: "inOutQuad",p: "base"}]},
        throw: {length: 27,plant: "feet",blend: 2,keys: [{f: 3,ease: "outQuad",p: {uarmF: 40,farmF: 60,uarmB: 40,farmB: 60}},{f: 5,ease: "outExpo",p: {torso: 50,uarmF: 96,farmF: 20,uarmB: 96,farmB: 20,rootX: 10,thighF: 34,shinF: 36}},{f: 7,ease: "linear",p: {torso: 50,uarmF: 96,farmF: 20,uarmB: 96,farmB: 20,rootX: 10,thighF: 34,shinF: 36}},{f: 27,ease: "inOutQuad",p: "base"}]},
        throwHit: { length: 46, plant: "feet", blend: 1, keys: [
          { f: 0, ease: "linear", p: { torso: 46, rootX: 8, uarmF: 88, farmF: 6, uarmB: 86, farmB: 6 } },
          { f: 12, ease: "inOutCubic", p: { torso: 30, rootX: 2, uarmF: 150, farmF: 10, uarmB: 150, farmB: 10, thighF: 26, shinF: 36, footF: 10 } },
          { f: 26, ease: "outExpo", p: { torso: 44, rootX: 10, uarmF: 40, farmF: 5, uarmB: 40, farmB: 5 } },
          { f: 30, ease: "linear", p: { rootX: 12 } },
          { f: 45, ease: "inOutQuad", p: "base" } ] },
        sp1: {length: 48,plant: "feet",blend: 3,keys: [{f: 8,ease: "outQuad",p: {torso: 30,head: 0,uarmF: 10,farmF: 40,uarmB: 10,farmB: 40,thighF: 40,shinF: 80,thighB: 30,shinB: 80,rootY: -10}},{f: 14,ease: "outExpo",p: {torso: 78,head: 28,uarmF: -40,farmF: 20,uarmB: -50,farmB: 20,rootX: 14,thighF: 60,shinF: 60,thighB: -40,shinB: 20}},{f: 32,ease: "linear",p: {torso: 78,head: 28,uarmF: -40,farmF: 20,uarmB: -50,farmB: 20,rootX: 14,thighF: 60,shinF: 60,thighB: -40,shinB: 20}},{f: 48,ease: "inOutQuad",p: "base"}]},
        sp2: { length: 40, plant: "feet", blend: 2, keys: [
          { f: 5, ease: "inOutQuad", p: { torso: 24, head: -6, rootX: -2, thighF: 60, shinF: 100, footF: 40, thighB: 50, shinB: 100, footB: 50, uarmF: 20, farmF: 80 } },
          { f: 7, ease: "linear", p: { torso: 24, head: -6, rootX: -2, thighF: 60, shinF: 100, footF: 40, thighB: 50, shinB: 100, footB: 50, uarmF: 20, farmF: 80 } },
          { f: 8, ease: "outExpo", p: { torso: 52, head: -14, rootX: 6, thighF: 70, shinF: 30, footF: -10, thighB: -10, shinB: 40, footB: 10, uarmF: 150, farmF: 10, uarmB: 140, farmB: 20 } },
          { f: 13, ease: "linear", p: { torso: 56, head: -16, uarmF: 160, farmF: 4 } },
          { f: 21, ease: "linear", p: { torso: 52, head: -16, uarmF: 160, farmF: 4 } },
          { f: 39, ease: "inOutQuad", p: "base" } ] },
        super: {length: 76,plant: "feet",blend: 3,keys: [{f: 7,ease: "outQuad",p: {torso: 20,head: -6,uarmF: 10,farmF: 60,uarmB: 10,farmB: 60,thighF: 60,shinF: 100,thighB: 40,shinB: 100,rootY: -12}},{f: 12,ease: "outExpo",p: {torso: 66,head: 24,uarmF: 100,farmF: 0,uarmB: 90,farmB: 0,rootX: 14,thighF: 50,shinF: 50,thighB: -40,shinB: 10}},{f: 62,ease: "linear",p: {torso: 66,head: 24,uarmF: 100,farmF: 0,uarmB: 90,farmB: 0,rootX: 14,thighF: 50,shinF: 50,thighB: -40,shinB: 10}},{f: 76,ease: "inOutQuad",p: "base"}]},
      },
      moves: {
        sp3: { kind: "special", name: "跳び掛かり", stance: "stand", startup: 16, active: 8, recovery: 12, landLag: 10,
          boxes: [{ f0: 17, f1: 24, x: 24, y: 60, w: 95, h: 54 }],
          hit: { damage: 72, chip: 5, level: "high", hitstun: 22, blockstun: 16, hitstop: 10, knock: { hit: 12, block: 16 }, effect: "stun", gauge: { hit: 50, block: 25 }, impact: 3,
            /* カウンターで当てたときだけ、のけぞりを長く・相手を引き寄せて弱につながるように */
            counterStun: 24, counterKnock: -80 },
          motion: [{ f0: 5, f1: 5, vx: 8, vy: 10.5 }], invuln: [{ f0: 1, f1: 20, type: "proj" }],
          trail: { from: "handF", color: "glow", width: 12, frames: 8 }, sfx: "swingH" },
        "5L": { kind: "normal", name: "立ち弱（前脚）", stance: "stand", startup: 5, active: 3, recovery: 9,
          boxes: [ { f0: 6, f1: 8, x: 36, y: 70, w: 80, h: 28 } ],
          hit: { damage: 32, chip: 0, level: "mid", hitstun: 20, blockstun: 11, hitstop: 6, knock: { hit: 8, block: 10 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          cancel: { into: ["5L", "2L", "5H", "2H", "sp1", "sp2", "super"], frames: 14 },
          trail: { from: "handF", color: "glow", width: 8, frames: 6 }, sfx: "swingL" },
        "2L": { kind: "normal", otg: true, name: "しゃがみ弱（爪）", stance: "crouch", startup: 5, active: 3, recovery: 9,
          boxes: [ { f0: 6, f1: 8, x: 36, y: 16, w: 70, h: 24 } ],
          hit: { damage: 28, chip: 0, level: "low", hitstun: 20, blockstun: 12, hitstop: 6, knock: { hit: 8, block: 10 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          cancel: { into: ["5L", "2L", "5H", "2H", "sp1", "sp2", "super"], frames: 14 },
          trail: { from: "handF", color: "glow", width: 8, frames: 6 }, sfx: "swingL" },
        "5H": { kind: "normal", name: "立ち強（薙ぎ払い）", stance: "stand", startup: 12, active: 4, recovery: 19,
          boxes: [ { f0: 13, f1: 16, x: 42, y: 70, w: 63, h: 40 } ],
          hit: { damage: 88, chip: 0, level: "mid", hitstun: 26, blockstun: 16, hitstop: 10, knock: { hit: 16, block: 20 }, effect: "stun", gauge: { hit: 45, block: 22 }, impact: 3 },
          cancel: { into: ["sp1", "sp2", "super"], frames: 16 },
          trail: { from: "handF", color: "glow", width: 14, frames: 8 }, sfx: "swingH" },
        "2H": { kind: "normal", name: "しゃがみ強（下段頭突き）", stance: "crouch", startup: 10, active: 4, recovery: 22,
          boxes: [ { f0: 11, f1: 14, x: 30, y: 0, w: 80, h: 28 } ],
          hit: { damage: 62, chip: 0, level: "low", hitstun: 0, blockstun: 14, hitstop: 10, knock: { hit: 0, block: 18 }, effect: "launch", launch: { vx: 1.5, vy: 9.5 }, juggle: 3, gauge: { hit: 40, block: 20 }, impact: 3 },
          cancel: { into: ["sp2", "super", "jump"], frames: 14 },
          trail: { from: "handF", color: "glow", width: 14, frames: 8 }, sfx: "swingH" },
        "jL": { kind: "normal", name: "ジャンプ弱（爪）", stance: "air", startup: 5, active: 8, recovery: 5, landLag: 3,
          boxes: [ { f0: 6, f1: 13, x: 22, y: 34, w: 90, h: 46 } ],
          hit: { damage: 30, chip: 0, level: "mid", hitstun: 16, blockstun: 12, hitstop: 6, knock: { hit: 6, block: 8 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          cancel: { into: ["jH"], frames: 12 },
          sfx: "swingL" },
        "jH": { kind: "normal", name: "ジャンプ強（頭突き）", stance: "air", startup: 9, active: 6, recovery: 10, landLag: 4,
          boxes: [ { f0: 10, f1: 15, x: 24, y: 60, w: 72, h: 50 } ],
          hit: { damage: 64, chip: 0, level: "mid", hitstun: 22, blockstun: 16, hitstop: 10, knock: { hit: 10, block: 14 }, effect: "stun", gauge: { hit: 45, block: 22 }, impact: 3 },
          trail: { from: "handF", color: "glow", width: 12, frames: 8 }, sfx: "swingH" },
        throw: { kind: "throw", name: "投げ", stance: "stand", startup: 5, active: 2, recovery: 20, boxes: [], hit: null,
          throw: {
            box: { x: 12, y: 20, w: 64, h: 100 }, techable: true, damage: 110, grabFrames: 28, afterRecovery: 18, attackerClip: "throwHit",
            hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 12, ease: "inOutCubic", x: 24, y: 170, rot: -100 }, { f: 26, ease: "outExpo", x: 70, y: 30, rot: -150 }, { f: 28, ease: "linear", x: 76, y: 20, rot: -160 } ],
            launch: { vx: 3, vy: 7 }, hitstop: 12, impact: 3, gauge: { hit: 40 } },
          sfx: "grab" },
        sp1: { kind: "special", name: "阿吽突進", stance: "stand", startup: 14, active: 14, recovery: 20,
          boxes: [ { f0: 15, f1: 28, x: 26, y: 30, w: 74, h: 84 } ],
          motion: [ { f0: 15, f1: 28, vx: 11 } ],
          hit: { damage: 70, chip: 8, level: "mid", hitstun: 0, blockstun: 20, hitstop: 10, knock: { hit: 0, block: 24 }, effect: "launch", launch: { vx: 3.5, vy: 6 }, juggle: 0, gauge: { hit: 60, block: 30 }, impact: 3 },
          trail: { from: "handF", color: "glow", width: 12, frames: 10 }, sfx: "swingH" },
        sp2: { kind: "special", name: "噛砕き", stance: "stand", startup: 8, active: 6, recovery: 26, landLag: 4,
          boxes: [ { f0: 9, f1: 14, x: 16, y: 40, w: 115, h: 110 } ],
          motion: [ { f0: 8, f1: 8, vx: 1.5, vy: 9 } ],
          hit: { damage: 75, chip: 6, level: "mid", hitstun: 0, blockstun: 20, hitstop: 10, knock: { hit: 0, block: 14 }, effect: "launch", launch: { vx: 2.5, vy: 10 }, juggle: 3, gauge: { hit: 60, block: 30 }, impact: 3 },
          invuln: [ { f0: 1, f1: 8, type: "strike" } ],
          sfx: "rise" },
        super: { kind: "super", name: "大祓「阿吽・無限突進」", stance: "stand", startup: 12, active: 30, recovery: 34, cost: 1000, flash: 40,
          boxes: [ { f0: 13, f1: 42, x: 20, y: 0, w: 150, h: 130 } ],
          motion: [ { f0: 13, f1: 40, vx: 6 } ],
          hit: { damage: 40, chip: 8, level: "mid", hitstun: 18, blockstun: 18, hitstop: 4, knock: { hit: 2, block: 6 }, effect: "stun", gauge: { hit: 0, block: 0 }, impact: 2 },
          multi: { count: 6, every: 5, final: { damage: 110, chip: 14, level: "mid", hitstun: 0, blockstun: 24, hitstop: 18, knock: { hit: 0, block: 30 }, effect: "launch", launch: { vx: 4, vy: 9 }, juggle: 0, gauge: { hit: 0, block: 0 }, impact: 4 } },
          invuln: [ { f0: 1, f1: 12, type: "all" } ],
          sfx: "super" }
      },
      projectiles: {},
      quotes: {
        select: "前へ、参ります。",
        intro: ["狛犬AI、突撃します！"],
        win: ["警備完了。通行を許可します。", "境内の安全、確認しました。"],
        lose: ["権限が…足りません…"]
      }
    },
    oni404: {
      id: "oni404",
      name: "404鬼", nameEn: "ONI-404", title: "重装・パワー型",
      blurb: "巨体と金棒の大振りで一撃が重い。動きは遅いが、404で場を制圧する。",
      ratings: { power: 5, speed: 1, range: 3, defense: 4 },
      stats: {
        dmgMul: 0.8, hp: 1100, walkF: 2.6, walkB: 2.2, jumpVy: 13.5, jumpVx: 2.8, gravity: 0.78,
        airJumps: 0, prejump: 5, landLag: 4,
        dashF: { frames: 22, speed: 6.3 }, dashB: { frames: 22, speed: 4.0, invuln: 4 },
        gaugeMul: 0.9
      },
      boxes: {
        push: { stand: { w: 72, h: 116 }, crouch: { w: 80, h: 88 }, air: { w: 64, h: 116 } },
        hurt: {
          stand:  [ { x: -15, y: 158, w: 40, h: 40 }, { x: -34, y: 60, w: 70, h: 86 }, { x: -30, y: 0, w: 62, h: 64 } ],
          crouch: [ { x: 14, y: 108, w: 40, h: 40 }, { x: -36, y: 0, w: 72, h: 78 } ],
          air:    [ { x: -30, y: 20, w: 62, h: 173 }, { x: -15, y: 153, w: 40, h: 40 } ]
        }
      },
      look: {
        palette:   { skin: "#d9344f", hair: "#2a1a3a", primary: "#ffa13c", secondary: "#2a1a3a", accent: "#ffe94d", glow: "#ff3b5c", outline: "#0a0620", eye: "#ffe94d" },
        paletteP2: { skin: "#8f1f3a", hair: "#101018", primary: "#ffe94d", secondary: "#2a1a3a", accent: "#ffa13c", glow: "#ffa13c", outline: "#0a0620", eye: "#ff3b5c" },
        body: {
          torsoLen: 58, torsoWTop: 42, torsoWBottom: 34, neckLen: 8, headR: 19, shoulderDrop: 6,
          uArmLen: 34, fArmLen: 32, handR: 8, thighLen: 46, shinLen: 44, footLen: 24, footH: 10,
          limbW: { uArm: [15, 12], fArm: [13, 10], thigh: [20, 16], shin: [16, 12] }
        },
        colors: { head: "skin", neck: "skin", torso: "glow", uArm: "primary", fArm: "primary", hand: "skin", thigh: "glow", shin: "glow", foot: "accent" },
        prop: { kind: "kanabo", len: 62, thick: 10, angle: 0, color: "accent" },
        neon: { tubeW: 4, glowW: 10, glowAlpha: 0.26, coreW: 1.2, fill: 0.92 },
        decor: [
          { id: "hornL", attach: "head", at: "end", shape: "tri", x: -6, y: 8, w: 12, h: 28, rot: -20, color: "accent", glow: true, z: "back" },
          { id: "hornR", attach: "head", at: "end", shape: "tri", x: 4, y: 10, w: 13, h: 30, rot: -12, color: "accent", glow: true, z: "front" },
          { id: "eyeA", attach: "head", at: "end", shape: "line", x: 4, y: 6, x2: 6, y2: -5, w: 3, color: "eye", glow: true, z: "front" },
          { id: "eyeB", attach: "head", at: "end", shape: "line", x: -2, y: 2, x2: 5, y2: -3, w: 3, color: "eye", glow: true, z: "front" },
          { id: "belly404", attach: "torso", at: "mid", shape: "text", x: 0, y: 0, text: "404", size: 12, color: "accent", glow: true, z: "front" },
          { id: "loinStripe1", attach: "pelvis", at: "start", shape: "rect", x: 2, y: 6, w: 28, h: 7, color: "accent", z: "front" },
          { id: "loinStripe2", attach: "pelvis", at: "start", shape: "rect", x: 2, y: -4, w: 28, h: 6, color: "primary", z: "front" }
        ],
        chains: [
          { id: "hairTuft1", anchor: { bone: "head", at: "end", x: -12, y: 4 }, segs: 3, segLen: 7, widthStart: 9, widthEnd: 4, color: "primary", style: "tuft", stiffness: 0.22, damping: 0.22, gravity: 0.25, inertia: 1.1, kick: 0.8, rest: -95, z: "back" },
          { id: "hairTuft2", anchor: { bone: "head", at: "end", x: -8, y: 10 }, segs: 3, segLen: 6, widthStart: 8, widthEnd: 3, color: "primary", style: "tuft", stiffness: 0.2, damping: 0.22, gravity: 0.3, inertia: 1.1, kick: 0.8, rest: -120, z: "back" },
          { id: "loincloth", anchor: { bone: "pelvis", at: "start", x: -14, y: 4 }, segs: 3, segLen: 9, widthStart: 14, widthEnd: 10, color: "accent", style: "ribbon", stiffness: 0.1, damping: 0.2, gravity: 0.6, inertia: 1.5, kick: 0.6, rest: -10, z: "back" }
        ]
      },
      feel: {
        breath: { amp: 0.010, period: 90 },
        jump: { sx: 0.96, sy: 1.05, frames: 4 }, land: { sx: 1.10, sy: 0.84, frames: 7 }, dash: { sx: 1.04, sy: 0.97, frames: 6 },
        hitShake: { amp: [1, 2, 3, 3.5] }, recoil: { x: [2, 4, 6, 8], rot: [1, 3, 5, 7], frames: 4 },
        squashHit: { sx: 1.04, sy: 0.95, frames: 3 }
      },
      basePose: { rootX: 0, rootY: 0, rot: 0, torso: 4, head: -2, uarmF: 10, farmF: 130, uarmB: 22, farmB: 40, thighF: 14, shinF: 20, footF: 6, thighB: -10, shinB: 14, footB: 24 },
      clips: {
        sp3: {length: 48,plant: "feet",blend: 3,squash: [{f: 14,sx: 0.97,sy: 1.03},{f: 15,sx: 1.04,sy: 0.96,ease: "outExpo"},{f: 20,sx: 1,sy: 1,ease: "outCubic"}],keys: [{f: 9,ease: "outQuad",p: {torso: 10,uarmF: 10,farmF: 130,uarmB: 20,farmB: 120,thighF: 30,shinF: 60}},{f: 16,ease: "outExpo",p: {torso: 40,head: 10,uarmF: 10,farmF: 140,uarmB: 40,farmB: 120,rootX: 18,thighF: 70,shinF: 70,thighB: -44,shinB: 4}},{f: 24,ease: "linear",p: {torso: 40,head: 10,uarmF: 10,farmF: 140,uarmB: 40,farmB: 120,rootX: 18,thighF: 70,shinF: 70,thighB: -44,shinB: 4}},{f: 48,ease: "inOutQuad",p: "base"}]},
        idle: { length: 90, loop: true, plant: "feet", blend: 6, keys: [
          { f: 0, ease: "inOutQuad", p: "base" },
          { f: 45, ease: "inOutQuad", p: { torso: 2, head: -3, uarmF: 20, farmF: 130, uarmB: 32, farmB: 40, thighF: 15, shinF: 21, footF: 6 } } ] },
        walkF: { length: 42, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 21, sfx: "step" } ], keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 6, thighF: 26, shinF: 12, footF: -12, thighB: -22, shinB: 26, footB: 16, uarmF: 14, farmF: 130, uarmB: 24, farmB: 40 } },
          { f: 10, ease: "inOutQuad", p: { thighF: 6, shinF: 10, footF: 2, thighB: 22, shinB: 50, footB: 24, uarmF: 18, uarmB: 28 } },
          { f: 21, ease: "inOutQuad", p: { thighF: -20, shinF: 26, footF: 16, thighB: 26, shinB: 12, footB: -12, uarmF: 16, uarmB: 40 } },
          { f: 31, ease: "inOutQuad", p: { thighF: 26, shinF: 50, footF: 24, thighB: 6, shinB: 10, footB: 2, uarmF: 14, uarmB: 28 } } ] },
        walkB: { length: 46, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 23, sfx: "step" } ], keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 18, shinF: 22, footF: 4, thighB: -22, shinB: 24, footB: 2 } },
          { f: 11, ease: "inOutQuad", p: { thighF: 4, shinF: 8, footF: 2, thighB: -6, shinB: 44, footB: 26 } },
          { f: 23, ease: "inOutQuad", p: { thighF: -22, shinF: 24, footF: 2, thighB: 18, shinB: 22, footB: 4 } },
          { f: 34, ease: "inOutQuad", p: { thighF: -6, shinF: 44, footF: 26, thighB: 4, shinB: 8, footB: 2 } } ] },
        crouch: { length: 60, loop: true, plant: "feet", blend: 4, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 26, head: -8, uarmF: 18, farmF: 160, uarmB: 30, farmB: 76, thighF: 70, shinF: 120, footF: 50, thighB: 56, shinB: 120, footB: 64 } },
          { f: 30, ease: "inOutQuad", p: { torso: 28, head: -9, thighF: 72, shinF: 122, footF: 50, thighB: 58, shinB: 122, footB: 64 } } ] },
        jumpUp: { length: 18, plant: "root", blend: 3, keys: [
          { f: 6, ease: "outCubic", p: { torso: 2, thighF: 56, shinF: 90, footF: 34, thighB: 18, shinB: 56, footB: 30, uarmF: 44, farmF: 154, uarmB: 50, farmB: 70 } },
          { f: 18, ease: "inOutQuad", p: { torso: 0, head: 0, thighF: 64, shinF: 100, thighB: 22, shinB: 62 } } ] },
        jumpFall: { length: 24, loop: true, plant: "root", blend: 6, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 30, shinF: 40, footF: 20, thighB: -6, shinB: 44, footB: 30, uarmF: 34, farmF: 144, uarmB: 40, farmB: 60 } },
          { f: 12, ease: "inOutQuad", p: { thighF: 26, shinF: 34, thighB: -2, shinB: 38, uarmF: 42, uarmB: 46 } } ] },
        dashF: { length: 22, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "linear", p: { torso: 16, head: -6, thighF: 40, shinF: 60, footF: 24, thighB: -30, shinB: 40, footB: 10, uarmF: -16, farmF: 154, uarmB: 40, farmB: 60 } },
          { f: 11, ease: "inOutQuad", p: { torso: 18, thighF: -26, shinF: 40, footF: 8, thighB: 40, shinB: 60, footB: 24, uarmF: 24, farmF: 160, uarmB: -10, farmB: 60 } },
          { f: 21, ease: "inOutQuad", p: { torso: 16, thighF: 40, shinF: 60, footF: 24, thighB: -30, shinB: 40, footB: 10, uarmF: -16, uarmB: 40 } } ] },
        dashB: { length: 22, plant: "feet", blend: 2, keys: [
          { f: 4, ease: "outCubic", p: { rootY: 14, rot: -4, torso: -6, thighF: 24, shinF: 50, footF: 20, thighB: 8, shinB: 40, footB: 30 } },
          { f: 14, ease: "inOutQuad", p: { rootY: 8, rot: -2, torso: -3 } },
          { f: 21, ease: "inQuad", p: { rootY: 0, rot: 0, torso: 6, thighF: 36, shinF: 60, footF: 26, thighB: 16, shinB: 54, footB: 36 } } ] },
        landing: { length: 6, plant: "feet", blend: 1, keys: [
          { f: 0, ease: "linear", p: { torso: 22, thighF: 50, shinF: 90, footF: 36, thighB: 36, shinB: 80, footB: 46, uarmF: 14, farmF: 160, uarmB: 30, farmB: 60 } },
          { f: 5, ease: "inOutQuad", p: "base" } ] },
        guardStand: { length: 30, loop: true, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 6, head: 2, uarmF: 56, farmF: 118, uarmB: 40, farmB: 112, thighF: 14, shinF: 20, footF: 6, thighB: -10, shinB: 14, footB: 24 } },
          { f: 15, ease: "inOutQuad", p: { torso: 5, uarmF: 54, farmF: 120 } } ] },
        guardCrouch: { length: 30, loop: true, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 26, head: -8, uarmF: 56, farmF: 118, uarmB: 40, farmB: 112, thighF: 70, shinF: 120, footF: 50, thighB: 56, shinB: 120, footB: 64 } },
          { f: 15, ease: "inOutQuad", p: { torso: 27, uarmF: 54, farmF: 120 } } ] },
        hurtHigh: { length: 16, plant: "feet", blend: 1, keys: [
          { f: 2, ease: "outExpo", p: { torso: -14, head: -22, rootX: -8, uarmF: -10, farmF: 30, uarmB: -20, farmB: 30, thighF: 14, shinF: 22, thighB: -10, shinB: 16 } },
          { f: 12, ease: "inOutQuad", p: { torso: -6, head: -12, rootX: -4 } } ] },
        hurtLow: { length: 16, plant: "feet", blend: 1, keys: [
          { f: 2, ease: "outExpo", p: { torso: 28, head: 12, rootX: -5, uarmF: 10, farmF: 40, uarmB: -8, farmB: 30, thighF: 34, shinF: 56, footF: 22, thighB: 10, shinB: 30, footB: 20 } },
          { f: 12, ease: "inOutQuad", p: { torso: 22, head: 8 } } ] },
        hurtAir: { length: 24, plant: "root", blend: 1, keys: [
          { f: 3, ease: "outCubic", p: { rot: -25, torso: -14, head: -18, uarmF: -20, farmF: 20, uarmB: -30, farmB: 20, thighF: 30, shinF: 50, footF: 20, thighB: 10, shinB: 50, footB: 20 } },
          { f: 24, ease: "inOutQuad", p: { rot: -80, torso: -6, thighF: 40, shinF: 70 } } ] },
        down: { length: 40, loop: true, plant: "root", blend: 3, keys: [
          { f: 0, ease: "inOutQuad", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: 20, farmF: 10, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } },
          { f: 20, ease: "inOutQuad", p: { head: -3, uarmF: 22 } } ] },
        wakeup: { length: 18, plant: "root", blend: 1, keys: [
          { f: 0, ease: "linear", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: -6, farmF: 104, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } },
          { f: 8, ease: "outCubic", p: { rot: -30, rootY: -30, torso: 35, head: 10, uarmF: -1, farmF: 154, uarmB: 15, farmB: 50, thighF: 60, shinF: 110, footF: 50, thighB: 40, shinB: 100, footB: 60 } },
          { f: 17, ease: "inOutQuad", p: "base" } ] },
        thrown: { length: 20, loop: true, plant: "root", blend: 2, keys: [
          { f: 0, ease: "inOutQuad", p: { rot: -20, rootY: -10, torso: -10, head: -15, uarmF: 70, farmF: 30, uarmB: 60, farmB: 40, thighF: 40, shinF: 60, footF: 20, thighB: 20, shinB: 50, footB: 20 } },
          { f: 10, ease: "inOutQuad", p: { rot: -26, uarmF: 80, uarmB: 50, thighF: 34 } } ] },
        intro: { length: 60, plant: "feet", blend: 6, keys: [
          { f: 20, ease: "inOutCubic", p: { torso: 12, head: 0, uarmF: 110, farmF: 50, uarmB: 60, farmB: 80 } },
          { f: 34, ease: "linear", p: { torso: 12, head: 0, uarmF: 110, farmF: 50 } },
          { f: 52, ease: "inOutCubic", p: "base" } ] },
        win: { length: 90, loop: true, plant: "feet", blend: 6, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: -4, head: -6, uarmF: 150, farmF: 25, uarmB: 20, farmB: 50, thighF: 20, shinF: 28, footF: 8, thighB: -12, shinB: 12, footB: 24 } },
          { f: 45, ease: "inOutQuad", p: { uarmF: 158, torso: -6 } } ] },
        lose: { length: 40, plant: "feet", blend: 6, keys: [
          { f: 20, ease: "outCubic", p: { torso: 38, head: 20, uarmF: 10, farmF: 30, uarmB: 5, farmB: 25, thighF: 50, shinF: 90, footF: 40, thighB: 30, shinB: 80, footB: 50 } } ] },

        "5L": {length: 21,plant: "feet",blend: 2,keys: [{f: 4,ease: "outQuad",p: {torso: 0,rootX: -3,uarmF: 10,farmF: 130,uarmB: 30,farmB: 90}},{f: 7,ease: "outExpo",p: {torso: 22,head: -5,rootX: 12,uarmF: 6,farmF: 150,uarmB: 98,farmB: 0,thighF: 34,shinF: 40}},{f: 10,ease: "linear",p: {torso: 22,head: -5,rootX: 12,uarmF: 6,farmF: 150,uarmB: 98,farmB: 0,thighF: 34,shinF: 40}},{f: 21,ease: "inOutQuad",p: "base"}]},
        "2L": {base: "crouch",length: 20,plant: "feet",blend: 2,keys: [{f: 3,ease: "outQuad",p: {uarmF: 10,farmF: 130,uarmB: 30,farmB: 90}},{f: 6,ease: "outExpo",p: {torso: 38,uarmF: 6,farmF: 150,uarmB: 100,farmB: 0,rootX: 12}},{f: 9,ease: "linear",p: {torso: 38,uarmF: 6,farmF: 150,uarmB: 100,farmB: 0,rootX: 12}},{f: 20,ease: "inOutQuad",p: "base"}]},
        "5H": {length: 44,plant: "feet",blend: 3,squash: [{f: 14,sx: 0.97,sy: 1.03},{f: 15,sx: 1.04,sy: 0.96,ease: "outExpo"},{f: 20,sx: 1,sy: 1,ease: "outCubic"}],keys: [{f: 8,ease: "outQuad",p: {torso: -14,head: -10,uarmF: 178,farmF: 20,uarmB: 150,farmB: 30,rootX: -6,thighF: 10,thighB: -20}},{f: 15,ease: "outExpo",p: {torso: 30,head: 4,uarmF: 78,farmF: 0,uarmB: 40,farmB: 30,rootX: 14,thighF: 44,shinF: 44,thighB: -26,shinB: 8}},{f: 20,ease: "linear",p: {torso: 30,head: 4,uarmF: 78,farmF: 0,uarmB: 40,farmB: 30,rootX: 14,thighF: 44,shinF: 44,thighB: -26,shinB: 8}},{f: 44,ease: "inOutQuad",p: "base"}]},
        "2H": {base: "crouch",length: 43,plant: "feet",blend: 3,keys: [{f: 7,ease: "outQuad",p: {torso: 30,uarmF: -30,farmF: 40,uarmB: 20,farmB: 60,rootX: -4}},{f: 12,ease: "outExpo",p: {torso: 50,head: -4,uarmF: 104,farmF: 0,uarmB: 20,farmB: 40,rootX: 12}},{f: 17,ease: "linear",p: {torso: 50,head: -4,uarmF: 104,farmF: 0,uarmB: 20,farmB: 40,rootX: 12}},{f: 43,ease: "inOutQuad",p: "base"}]},
        jL: {base: "jumpFall",length: 20,plant: "root",blend: 2,keys: [{f: 3,ease: "outQuad",p: {thighF: 40,shinF: 100,uarmB: 30,farmB: 90}},{f: 6,ease: "outExpo",p: {torso: 16,thighF: 100,shinF: 120,footF: 30,uarmB: 72,farmB: 0,uarmF: 6,farmF: 150}},{f: 14,ease: "linear",p: {torso: 16,thighF: 100,shinF: 120,footF: 30,uarmB: 72,farmB: 0,uarmF: 6,farmF: 150}},{f: 20,ease: "inOutQuad",p: "base"}]},
        jH: {base: "jumpFall",length: 29,plant: "root",blend: 2,keys: [{f: 6,ease: "outQuad",p: {torso: -14,uarmF: 178,farmF: 20}},{f: 11,ease: "outExpo",p: {torso: 30,uarmF: 44,farmF: 0,thighF: 40,shinF: 90,thighB: 10,shinB: 90}},{f: 17,ease: "linear",p: {torso: 30,uarmF: 44,farmF: 0,thighF: 40,shinF: 90,thighB: 10,shinB: 90}},{f: 29,ease: "inOutQuad",p: "base"}]},
        throw: {length: 30,plant: "feet",blend: 2,keys: [{f: 3,ease: "outQuad",p: {uarmF: 40,farmF: 90,uarmB: 40,farmB: 90}},{f: 6,ease: "outExpo",p: {torso: 24,uarmF: 86,farmF: 30,uarmB: 90,farmB: 24,rootX: 8,thighF: 34,shinF: 34}},{f: 8,ease: "linear",p: {torso: 24,uarmF: 86,farmF: 30,uarmB: 90,farmB: 24,rootX: 8,thighF: 34,shinF: 34}},{f: 30,ease: "inOutQuad",p: "base"}]},
        throwHit: { length: 52, plant: "feet", blend: 1, keys: [
          { f: 0, ease: "linear", p: { torso: 20, rootX: 8, uarmF: 85, farmF: 5, uarmB: 85, farmB: 5 } },
          { f: 14, ease: "inOutCubic", p: { torso: -10, rootX: 0, uarmF: 170, farmF: 10, uarmB: 170, farmB: 10, thighF: 26, shinF: 36, footF: 10 } },
          { f: 28, ease: "outExpo", p: { torso: 35, rootX: 10, uarmF: 40, farmF: 5, uarmB: 40, farmB: 5 } },
          { f: 32, ease: "linear", p: { rootX: 12 } },
          { f: 51, ease: "inOutQuad", p: "base" } ] },
        sp1: {length: 53,plant: "feet",blend: 3,keys: [{f: 10,ease: "outQuad",p: {torso: -12,head: -10,uarmF: 178,farmF: 20,uarmB: 160,farmB: 30,rootY: 4}},{f: 18,ease: "outExpo",p: {torso: 46,head: 10,uarmF: 46,farmF: 0,uarmB: 40,farmB: 20,rootX: 8,thighF: 60,shinF: 70,thighB: -10,shinB: 60,rootY: -10}},{f: 23,ease: "linear",p: {torso: 46,head: 10,uarmF: 46,farmF: 0,uarmB: 40,farmB: 20,rootX: 8,thighF: 60,shinF: 70,thighB: -10,shinB: 60,rootY: -10}},{f: 53,ease: "inOutQuad",p: "base"}]},
        sp2: {length: 46,plant: "feet",blend: 2,keys: [{f: 5,ease: "outQuad",p: {torso: 4,uarmF: 120,farmF: 60,uarmB: 120,farmB: 60}},{f: 9,ease: "outExpo",p: {torso: 28,head: 6,uarmF: 96,farmF: 40,uarmB: 100,farmB: 40,rootX: 10,thighF: 40,shinF: 40}},{f: 12,ease: "linear",p: {torso: 28,head: 6,uarmF: 96,farmF: 40,uarmB: 100,farmB: 40,rootX: 10,thighF: 40,shinF: 40}},{f: 46,ease: "inOutQuad",p: "base"}]},
        grabHit: { length: 46, plant: "feet", blend: 1, keys: [
          { f: 0, ease: "linear", p: { torso: 22, rootX: 8, uarmF: 88, farmF: 6, uarmB: 88, farmB: 6 } },
          { f: 14, ease: "inOutCubic", p: { torso: -8, rootX: 0, uarmF: 160, farmF: 10, uarmB: 160, farmB: 10, thighF: 26, shinF: 36 } },
          { f: 28, ease: "outExpo", p: { torso: 34, rootX: 10, uarmF: 40, farmF: 6, uarmB: 40, farmB: 6 } },
          { f: 32, ease: "linear", p: { rootX: 12 } },
          { f: 45, ease: "inOutQuad", p: "base" } ] },
        super: {length: 74,plant: "feet",blend: 3,keys: [{f: 10,ease: "outQuad",p: {torso: -16,head: -12,uarmF: 178,farmF: 10,uarmB: 175,farmB: 10,rootY: 6}},{f: 18,ease: "outExpo",p: {torso: 44,head: 10,uarmF: 64,farmF: 0,uarmB: 60,farmB: 0,rootX: 14,thighF: 56,shinF: 60,thighB: -30,shinB: 10,rootY: -8}},{f: 38,ease: "linear",p: {torso: 44,head: 10,uarmF: 64,farmF: 0,uarmB: 60,farmB: 0,rootX: 14,thighF: 56,shinF: 60,thighB: -30,shinB: 10,rootY: -8}},{f: 74,ease: "inOutQuad",p: "base"}]},
      },
      moves: {
        sp3: { kind: "special", name: "鬼の体当たり", stance: "stand", startup: 16, active: 8, recovery: 24, armor: { f0: 6, f1: 14 },
          boxes: [{ f0: 17, f1: 24, x: 30, y: 60, w: 88, h: 90 }],
          hit: { damage: 95, chip: 8, level: "mid", hitstun: 24, blockstun: 16, hitstop: 12, knock: { hit: 22, block: 24 }, effect: "stun", gauge: { hit: 50, block: 25 }, impact: 4 },
          motion: [{ f0: 4, f1: 26, vx: 7 }], invuln: [{ f0: 1, f1: 24, type: "proj" }],
          trail: { from: "prop", color: "accent", width: 14, frames: 10 }, sfx: "swingH" },
        "5L": { kind: "normal", name: "立ち弱", stance: "stand", startup: 7, active: 3, recovery: 11,
          boxes: [ { f0: 8, f1: 10, x: 36, y: 84, w: 74, h: 30 } ],
          hit: { damage: 42, chip: 0, level: "mid", hitstun: 22, blockstun: 12, hitstop: 7, knock: { hit: 10, block: 12 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          cancel: { into: ["5L", "2L", "5H", "sp1", "super"], frames: 14 },
          trail: { from: "prop", color: "accent", width: 10, frames: 6 }, sfx: "swingL" },
        "2L": { kind: "normal", otg: true, name: "しゃがみ弱", stance: "crouch", startup: 6, active: 3, recovery: 11,
          boxes: [ { f0: 7, f1: 9, x: 36, y: 14, w: 83, h: 26 } ],
          hit: { damage: 34, chip: 0, level: "low", hitstun: 22, blockstun: 13, hitstop: 7, knock: { hit: 10, block: 12 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          cancel: { into: ["5L", "2L", "5H", "sp1", "super"], frames: 14 },
          trail: { from: "prop", color: "accent", width: 9, frames: 6 }, sfx: "swingL" },
        "5H": { kind: "normal", name: "立ち強（金棒の大振り）", stance: "stand", startup: 15, active: 5, recovery: 24, armor: { f0: 6, f1: 14 },
          boxes: [ { f0: 16, f1: 20, x: 40, y: 80, w: 132, h: 46 } ],
          hit: { damage: 92, chip: 0, level: "mid", hitstun: 32, blockstun: 20, hitstop: 12, knock: { hit: 18, block: 22 }, effect: "stun", gauge: { hit: 45, block: 22 }, impact: 3 },
          cancel: { into: ["sp1", "sp2", "super"], frames: 16 },
          trail: { from: "prop", color: "accent", width: 14, frames: 8 }, sfx: "swingH" },
        "2H": { kind: "normal", name: "しゃがみ強（足払い）", stance: "crouch", startup: 12, active: 5, recovery: 26,
          boxes: [ { f0: 13, f1: 17, x: 34, y: 0, w: 146, h: 28 } ],
          hit: { damage: 85, chip: 0, level: "low", hitstun: 0, blockstun: 16, hitstop: 12, knock: { hit: 0, block: 18 }, effect: "launch", launch: { vx: 1.5, vy: 9.5 }, juggle: 3, gauge: { hit: 40, block: 20 }, impact: 3 },
          cancel: { into: ["sp1", "super", "jump"], frames: 14 },
          trail: { from: "prop", color: "accent", width: 14, frames: 8 }, sfx: "swingH" },
        "jL": { kind: "normal", name: "ジャンプ弱", stance: "air", startup: 6, active: 8, recovery: 6, landLag: 4,
          boxes: [ { f0: 7, f1: 14, x: 26, y: 40, w: 66, h: 50 } ],
          hit: { damage: 40, chip: 0, level: "mid", hitstun: 18, blockstun: 13, hitstop: 7, knock: { hit: 6, block: 8 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          cancel: { into: ["jH"], frames: 12 },
          sfx: "swingL" },
        "jH": { kind: "normal", name: "ジャンプ強（金棒落とし）", stance: "air", startup: 11, active: 6, recovery: 12, landLag: 4,
          boxes: [ { f0: 12, f1: 17, x: 24, y: 10, w: 76, h: 80 } ],
          hit: { damage: 84, chip: 0, level: "mid", hitstun: 26, blockstun: 18, hitstop: 11, knock: { hit: 10, block: 14 }, effect: "stun", gauge: { hit: 45, block: 22 }, impact: 3 },
          trail: { from: "prop", color: "accent", width: 14, frames: 8 }, sfx: "swingH" },
        throw: { kind: "throw", name: "投げ", stance: "stand", startup: 6, active: 2, recovery: 22, boxes: [], hit: null,
          throw: {
            box: { x: 10, y: 20, w: 70, h: 110 }, techable: true, damage: 150, grabFrames: 32, afterRecovery: 20, attackerClip: "throwHit",
            hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 14, ease: "inOutCubic", x: 24, y: 170, rot: -100 }, { f: 28, ease: "outExpo", x: 70, y: 30, rot: -150 }, { f: 32, ease: "linear", x: 76, y: 20, rot: -160 } ],
            launch: { vx: 3, vy: 7 }, hitstop: 12, impact: 3, gauge: { hit: 40 } },
          sfx: "grab" },
        sp1: { kind: "special", name: "404 NOT FOUND", stance: "stand", startup: 18, active: 1, recovery: 34, boxes: [], hit: null,
          spawn: [ { at: 19, projectile: "nf404", x: 50, y: 0 } ], sfx: "cast" },
        sp2: { kind: "special", name: "掴み", stance: "stand", startup: 9, active: 3, recovery: 34, boxes: [], hit: null,
          throw: {
            box: { x: 10, y: 20, w: 70, h: 110 }, techable: false, damage: 160, grabFrames: 30, afterRecovery: 16, attackerClip: "grabHit",
            hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 14, ease: "inOutCubic", x: 24, y: 170, rot: -100 }, { f: 28, ease: "outExpo", x: 70, y: 30, rot: -150 }, { f: 30, ease: "linear", x: 76, y: 20, rot: -160 } ],
            launch: { vx: 3, vy: 7 }, hitstop: 12, impact: 3, gauge: { hit: 40 } },
          sfx: "grab" },
        super: { kind: "super", name: "大祓「存在しません」", stance: "stand", startup: 18, active: 12, recovery: 44, cost: 1000, flash: 40,
          boxes: [ { f0: 19, f1: 30, x: 10, y: 0, w: 260, h: 180 } ],
          hit: { damage: 300, chip: 12, level: "mid", hitstun: 0, blockstun: 24, hitstop: 16, knock: { hit: 0, block: 16 }, effect: "launch", launch: { vx: 3.5, vy: 9 }, juggle: 0, gauge: { hit: 0, block: 0 }, impact: 4 },
          invuln: [ { f0: 1, f1: 8, type: "all" } ],
          sfx: "super" }
      },
      projectiles: {
        nf404: { life: 110, vx: 4.5, vy: 0, box: { x: -24, y: -4, w: 48, h: 26 }, hit: { damage: 52, chip: 8, level: "low", hitstun: 0, blockstun: 16, hitstop: 8, knock: { hit: 0, block: 10 }, effect: "launch", launch: { vx: 2.5, vy: 6 }, juggle: 0, gauge: { hit: 30, block: 15 }, impact: 2 }, hits: 1, maxActive: 1, priority: 2, ground: true,
          look: { style: "shock", color: "accent", size: 1.3 } }
      },
      quotes: {
        select: "そこの参拝者、404です。",
        intro: ["404鬼、推して参る！"],
        win: ["そのリクエスト、存在しません。", "ご利益は…ここまでだ。"],
        lose: ["404…まだ…終わらぬ…"]
      }
    },
    fox: {
      id: "fox",
      name: "無限ループ狐", nameEn: "INFINITE LOOP FOX", title: "俊敏・トリッキー型",
      blurb: "俊敏で軽い。三本の尻尾と分身で、読みにくい攻めを仕掛ける。",
      ratings: { power: 2, speed: 5, range: 3, defense: 1 },
      stats: {
        dmgMul: 1.02, hp: 958, walkF: 4.2, walkB: 3.6, jumpVy: 16.5, jumpVx: 4.8, gravity: 0.72,
        airJumps: 1, prejump: 3, landLag: 3,
        dashF: { frames: 14, speed: 12.0 }, dashB: { frames: 16, speed: 7.5, invuln: 8 },
        gaugeMul: 1.15
      },
      boxes: {
        push: { stand: { w: 46, h: 100 }, crouch: { w: 50, h: 70 }, air: { w: 40, h: 100 } },
        hurt: {
          stand:  [ { x: -13, y: 145, w: 27, h: 27 }, { x: -22, y: 56, w: 44, h: 74 }, { x: -20, y: 0, w: 40, h: 58 } ],
          crouch: [ { x: 13, y: 93, w: 27, h: 27 }, { x: -22, y: 0, w: 48, h: 66 } ],
          air:    [ { x: -20, y: 18, w: 42, h: 151 }, { x: -11, y: 142, w: 27, h: 27 } ]
        }
      },
      look: {
        palette:   { skin: "#fff0e0", hair: "#ffa13c", primary: "#f4f7ff", secondary: "#a56bff", accent: "#ffe94d", glow: "#ff4fa3", outline: "#0a0620", eye: "#ffe94d" },
        paletteP2: { skin: "#fff0e0", hair: "#ffe94d", primary: "#f4f7ff", secondary: "#19f3ff", accent: "#ffa13c", glow: "#a56bff", outline: "#0a0620", eye: "#19f3ff" },
        body: {
          torsoLen: 46, torsoWTop: 26, torsoWBottom: 20, neckLen: 8, headR: 13, shoulderDrop: 5,
          uArmLen: 30, fArmLen: 30, handR: 5, thighLen: 46, shinLen: 46, footLen: 20, footH: 7,
          limbW: { uArm: [9, 7], fArm: [7, 6], thigh: [13, 10], shin: [10, 7] }
        },
        colors: { head: "skin", neck: "skin", torso: "glow", uArm: "glow", fArm: "glow", hand: "skin", thigh: "secondary", shin: "secondary", foot: "accent" },
        prop: { kind: "none", len: 0, thick: 0, angle: 0, color: "accent" },
        neon: { tubeW: 2.8, glowW: 8, glowAlpha: 0.24, coreW: 1, fill: 0.88 },
        decor: [
          { id: "earL", attach: "head", at: "end", shape: "tri", x: -6, y: 8, w: 10, h: 24, rot: -16, color: "hair", z: "back" },
          { id: "earR", attach: "head", at: "end", shape: "tri", x: 2, y: 9, w: 10, h: 24, rot: -6, color: "hair", z: "front" },
          { id: "eye", attach: "head", at: "end", shape: "line", x: 4, y: 2, x2: 8, y2: 5, w: 2.5, color: "eye", glow: true, z: "front" },
          { id: "infinity", attach: "torso", at: "mid", shape: "text", x: -14, y: 6, text: "∞", size: 16, color: "glow", glow: true, z: "back" },
          { id: "obi", attach: "torso", at: "start", shape: "rect", x: 6, y: 6, w: 26, h: 8, color: "secondary", z: "front" }
        ],
        chains: [
          { id: "tailA", anchor: { bone: "pelvis", at: "start", x: -12, y: 10 }, segs: 6, segLen: 15, widthStart: 18, widthEnd: 6, color: "hair", style: "tuft", stiffness: 0.04, damping: 0.1, gravity: 0.3, inertia: 1.5, kick: 1.2, rest: -100, z: "back" },
          { id: "tailB", anchor: { bone: "pelvis", at: "start", x: -12, y: 10 }, segs: 6, segLen: 14, widthStart: 18, widthEnd: 6, color: "hair", style: "tuft", stiffness: 0.05, damping: 0.1, gravity: 0.3, inertia: 1.5, kick: 1.2, rest: -135, z: "back" },
          { id: "tailC", anchor: { bone: "pelvis", at: "start", x: -10, y: 14 }, segs: 6, segLen: 14, widthStart: 16, widthEnd: 6, color: "primary", style: "tuft", stiffness: 0.04, damping: 0.09, gravity: 0.25, inertia: 1.5, kick: 1.2, rest: -165, z: "front" },
          { id: "sleeve", anchor: { bone: "farmF", at: "end", x: 0, y: 0 }, segs: 2, segLen: 7, widthStart: 10, widthEnd: 8, color: "primary", style: "ribbon", stiffness: 0.03, damping: 0.16, gravity: 0.5, inertia: 1.1, kick: 1.0, rest: 0, z: "front" }
        ]
      },
      feel: {
        breath: { amp: 0.012, period: 54 },
        jump: { sx: 0.92, sy: 1.12, frames: 4 }, land: { sx: 1.12, sy: 0.90, frames: 5 }, dash: { sx: 1.08, sy: 0.96, frames: 4 },
        hitShake: { amp: [1, 2, 3, 3.5] }, recoil: { x: [4, 8, 12, 16], rot: [3, 6, 9, 12], frames: 4 },
        squashHit: { sx: 1.06, sy: 0.94, frames: 3 }
      },
      basePose: { rootX: 0, rootY: 0, rot: 0, torso: 2, head: -4, uarmF: 30, farmF: 30, uarmB: 14, farmB: 40, thighF: 22, shinF: 26, footF: 4, thighB: -14, shinB: 10, footB: 24 },
      clips: {
        jS: { base: "jumpFall", length: 28, plant: "root", blend: 2, keys: [{ f: 4, ease: "outQuad", p: { torso: -10, thighF: 50, shinF: 120, thighB: 40, shinB: 110, uarmF: 120, farmF: 40, uarmB: 120, farmB: 40 } }, { f: 6, ease: "outExpo", p: { torso: -20, head: -8, thighF: 38, shinF: 0, footF: -10, thighB: -30, shinB: 90, uarmF: -60, farmF: 20, uarmB: -70, farmB: 20 } }, { f: 26, ease: "linear", p: { torso: -20, thighF: 38, shinF: 0, footF: -10, thighB: -30, shinB: 90 } }, { f: 28, ease: "inOutQuad", p: "base" }] },
        sp3: {base: "crouch",length: 40,plant: "feet",blend: 3,keys: [{f: 6,ease: "outQuad",p: {torso: 30,thighF: 70,shinF: 120}},{f: 10,ease: "outExpo",p: {torso: -24,head: -10,thighF: 88,shinF: 0,footF: -10,thighB: 40,shinB: 110,uarmF: -20,farmF: 30,uarmB: -40,rootY: -24}},{f: 20,ease: "linear",p: {torso: -24,head: -10,thighF: 88,shinF: 0,footF: -10,thighB: 40,shinB: 110,uarmF: -20,farmF: 30,uarmB: -40,rootY: -24}},{f: 40,ease: "inOutQuad",p: "base"}]},
        idle: { length: 54, loop: true, plant: "feet", blend: 6, keys: [
          { f: 0, ease: "inOutQuad", p: "base" },
          { f: 27, ease: "inOutQuad", p: { torso: 4, head: -6, uarmF: 34, farmF: 26, uarmB: 18, farmB: 40 } } ] },
        walkF: { length: 28, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 14, sfx: "step" } ], keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 6, thighF: 26, shinF: 12, footF: -12, thighB: -26, shinB: 26, footB: 12, uarmF: 36, farmF: 30, uarmB: 20, farmB: 40 } },
          { f: 7, ease: "inOutQuad", p: { thighF: 6, shinF: 10, footF: 2, thighB: 24, shinB: 46, footB: 22, uarmF: 40, uarmB: 30 } },
          { f: 14, ease: "inOutQuad", p: { thighF: -26, shinF: 26, footF: 12, thighB: 26, shinB: 12, footB: -12, uarmF: 36, uarmB: 22 } },
          { f: 21, ease: "inOutQuad", p: { thighF: 24, shinF: 46, footF: 22, thighB: 6, shinB: 10, footB: 2, uarmF: 30, uarmB: 34 } } ] },
        walkB: { length: 30, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 15, sfx: "step" } ], keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 2, thighF: 18, shinF: 22, footF: 4, thighB: -22, shinB: 24, footB: 2 } },
          { f: 8, ease: "inOutQuad", p: { thighF: 4, shinF: 8, footF: 2, thighB: -6, shinB: 44, footB: 26 } },
          { f: 15, ease: "inOutQuad", p: { thighF: -22, shinF: 24, footF: 2, thighB: 18, shinB: 22, footB: 4 } },
          { f: 23, ease: "inOutQuad", p: { thighF: -6, shinF: 44, footF: 26, thighB: 4, shinB: 8, footB: 2 } } ] },
        crouch: { length: 50, loop: true, plant: "feet", blend: 4, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 28, head: -12, uarmF: 40, farmF: 80, uarmB: 26, farmB: 70, thighF: 80, shinF: 124, footF: 44, thighB: 60, shinB: 124, footB: 64 } },
          { f: 25, ease: "inOutQuad", p: { torso: 30, head: -13, thighF: 82, shinF: 126, footF: 44, thighB: 62, shinB: 126, footB: 64 } } ] },
        jumpUp: { length: 18, plant: "root", blend: 3, keys: [
          { f: 6, ease: "outCubic", p: { torso: 2, thighF: 60, shinF: 95, footF: 35, thighB: 18, shinB: 55, footB: 30, uarmF: 75, farmF: 60, uarmB: 50, farmB: 70 } },
          { f: 18, ease: "inOutQuad", p: { torso: 0, head: 0, thighF: 68, shinF: 105, thighB: 22, shinB: 62 } } ] },
        jumpFall: { length: 24, loop: true, plant: "root", blend: 6, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 30, shinF: 40, footF: 20, thighB: -6, shinB: 44, footB: 30, uarmF: 60, farmF: 50, uarmB: 40, farmB: 60 } },
          { f: 12, ease: "inOutQuad", p: { thighF: 26, shinF: 34, thighB: -2, shinB: 38, uarmF: 68, uarmB: 46 } } ] },
        dashF: { length: 14, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "linear", p: { torso: 22, head: -8, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: -20, farmF: 70, uarmB: 60, farmB: 80 } },
          { f: 7, ease: "inOutQuad", p: { torso: 24, thighF: -35, shinF: 50, footF: 10, thighB: 50, shinB: 80, footB: 30, uarmF: 55, farmF: 80, uarmB: -25, farmB: 70 } },
          { f: 13, ease: "inOutQuad", p: { torso: 22, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: -20, uarmB: 60 } } ] },
        dashB: { length: 16, plant: "feet", blend: 2, keys: [
          { f: 3, ease: "outCubic", p: { rootY: 18, rot: -6, torso: -8, thighF: 30, shinF: 60, footF: 25, thighB: 10, shinB: 50, footB: 35 } },
          { f: 10, ease: "inOutQuad", p: { rootY: 9, rot: -3, torso: -4 } },
          { f: 15, ease: "inQuad", p: { rootY: 0, rot: 0, torso: 6, thighF: 40, shinF: 70, footF: 30, thighB: 20, shinB: 60, footB: 40 } } ] },
        landing: { length: 6, plant: "feet", blend: 1, keys: [
          { f: 0, ease: "linear", p: { torso: 30, thighF: 60, shinF: 100, footF: 40, thighB: 40, shinB: 90, footB: 50, uarmF: 50, farmF: 80, uarmB: 35, farmB: 70 } },
          { f: 5, ease: "inOutQuad", p: "base" } ] },
        guardStand: { length: 30, loop: true, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 8, head: 2, uarmF: 50, farmF: 116, uarmB: 40, farmB: 110, thighF: 22, shinF: 26, footF: 4, thighB: -14, shinB: 10, footB: 24 } },
          { f: 15, ease: "inOutQuad", p: { torso: 6, uarmF: 48, farmF: 118 } } ] },
        guardCrouch: { length: 30, loop: true, plant: "feet", blend: 2, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: 28, head: -12, uarmF: 50, farmF: 116, uarmB: 40, farmB: 110, thighF: 80, shinF: 124, footF: 44, thighB: 60, shinB: 124, footB: 64 } },
          { f: 15, ease: "inOutQuad", p: { torso: 30, uarmF: 48, farmF: 118 } } ] },
        hurtHigh: { length: 16, plant: "feet", blend: 1, keys: [
          { f: 2, ease: "outExpo", p: { torso: -16, head: -22, rootX: -6, uarmF: -5, farmF: 25, uarmB: -20, farmB: 30, thighF: 22, shinF: 38, footF: 12, thighB: -18, shinB: 10, footB: 20 } },
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
          { f: 20, ease: "inOutCubic", p: { torso: 36, head: 0, uarmF: 25, farmF: 105, uarmB: 25, farmB: 105 } },
          { f: 34, ease: "linear", p: { torso: 36, head: 0 } },
          { f: 52, ease: "inOutCubic", p: "base" } ] },
        win: { length: 90, loop: true, plant: "feet", blend: 6, keys: [
          { f: 0, ease: "inOutQuad", p: { torso: -4, head: -6, uarmF: 150, farmF: 25, uarmB: 20, farmB: 50, thighF: 20, shinF: 28, footF: 8, thighB: -12, shinB: 12, footB: 24 } },
          { f: 45, ease: "inOutQuad", p: { uarmF: 158, torso: -6 } } ] },
        lose: { length: 40, plant: "feet", blend: 6, keys: [
          { f: 20, ease: "outCubic", p: { torso: 38, head: 20, uarmF: 10, farmF: 30, uarmB: 5, farmB: 25, thighF: 50, shinF: 90, footF: 40, thighB: 30, shinB: 80, footB: 50 } } ] },

        "5L": {length: 14,plant: "feet",blend: 2,keys: [{f: 2,ease: "outQuad",p: {uarmF: 40,farmF: 120,rootX: -2}},{f: 4,ease: "outExpo",p: {torso: 10,uarmF: 96,farmF: 0,rootX: 6,thighF: 28,shinF: 30}},{f: 7,ease: "linear",p: {torso: 10,uarmF: 96,farmF: 0,rootX: 6,thighF: 28,shinF: 30}},{f: 14,ease: "inOutQuad",p: "base"}]},
        "2L": {base: "crouch",length: 15,plant: "feet",blend: 2,keys: [{f: 2,ease: "outQuad",p: {thighF: 60,shinF: 120}},{f: 4,ease: "outExpo",p: {torso: 10,head: -10,thighF: 84,shinF: 14,footF: 0,rootX: 6,uarmF: 40,farmF: 60}},{f: 7,ease: "linear",p: {torso: 10,head: -10,thighF: 84,shinF: 14,footF: 0,rootX: 6,uarmF: 40,farmF: 60}},{f: 15,ease: "inOutQuad",p: "base"}]},
        "5H": {length: 29,plant: "feet",blend: 3,keys: [{f: 6,ease: "outQuad",p: {torso: -14,head: -10,uarmF: 178,farmF: 30,rootY: 6,thighF: 10,thighB: -20}},{f: 10,ease: "outExpo",p: {torso: 28,head: 4,uarmF: 84,farmF: 0,uarmB: -30,rootX: 12,thighF: 44,shinF: 40,thighB: -30}},{f: 14,ease: "linear",p: {torso: 28,head: 4,uarmF: 84,farmF: 0,uarmB: -30,rootX: 12,thighF: 44,shinF: 40,thighB: -30}},{f: 29,ease: "inOutQuad",p: "base"}]},
        "2H": {base: "crouch",length: 30,plant: "feet",blend: 3,keys: [{f: 4,ease: "outQuad",p: {torso: 30,thighF: 50,shinF: 110}},{f: 8,ease: "outExpo",p: {torso: 44,head: -14,thighF: 92,shinF: 4,footF: -10,rootX: 8,uarmF: 0,farmF: 30,uarmB: 60}},{f: 12,ease: "linear",p: {torso: 44,head: -14,thighF: 92,shinF: 4,footF: -10,rootX: 8,uarmF: 0,farmF: 30,uarmB: 60}},{f: 30,ease: "inOutQuad",p: "base"}]},
        jL: {base: "jumpFall",length: 18,plant: "root",blend: 2,keys: [{f: 2,ease: "outQuad",p: {thighF: 50,shinF: 110}},{f: 4,ease: "outExpo",p: {torso: -6,thighF: 92,shinF: 0,footF: 0,uarmF: 20,farmF: 60}},{f: 13,ease: "linear",p: {torso: -6,thighF: 92,shinF: 0,footF: 0,uarmF: 20,farmF: 60}},{f: 18,ease: "inOutQuad",p: "base"}]},
        jH: {base: "jumpFall",length: 22,plant: "root",blend: 2,keys: [{f: 4,ease: "outQuad",p: {torso: -10,uarmF: 175,farmF: 30}},{f: 7,ease: "outExpo",p: {torso: 40,uarmF: 60,farmF: 0,uarmB: -40,thighF: 50,shinF: 100,thighB: 10,shinB: 100}},{f: 13,ease: "linear",p: {torso: 40,uarmF: 60,farmF: 0,uarmB: -40,thighF: 50,shinF: 100,thighB: 10,shinB: 100}},{f: 22,ease: "inOutQuad",p: "base"}]},
        throw: {length: 26,plant: "feet",blend: 2,keys: [{f: 3,ease: "outQuad",p: {uarmF: 50,farmF: 80,uarmB: 50,farmB: 80}},{f: 5,ease: "outExpo",p: {torso: 24,uarmF: 92,farmF: 20,uarmB: 92,farmB: 20,rootX: 8,thighF: 34,shinF: 34}},{f: 7,ease: "linear",p: {torso: 24,uarmF: 92,farmF: 20,uarmB: 92,farmB: 20,rootX: 8,thighF: 34,shinF: 34}},{f: 26,ease: "inOutQuad",p: "base"}]},
        throwHit: { length: 44, plant: "feet", blend: 1, keys: [
          { f: 0, ease: "linear", p: { torso: 20, rootX: 8, uarmF: 85, farmF: 5, uarmB: 85, farmB: 5 } },
          { f: 12, ease: "inOutCubic", p: { torso: -8, rootX: 0, uarmF: 165, farmF: 10, uarmB: 165, farmB: 10, thighF: 26, shinF: 36, footF: 10 } },
          { f: 24, ease: "outExpo", p: { torso: 35, rootX: 10, uarmF: 40, farmF: 5, uarmB: 40, farmB: 5 } },
          { f: 27, ease: "linear", p: { rootX: 12 } },
          { f: 43, ease: "inOutQuad", p: "base" } ] },
        sp1: {length: 45,plant: "feet",blend: 3,keys: [{f: 7,ease: "outQuad",p: {torso: 4,uarmF: 60,farmF: 150,uarmB: 60,farmB: 150}},{f: 12,ease: "outExpo",p: {torso: 18,uarmF: 132,farmF: 0,uarmB: -70,farmB: 10,rootX: 10,thighF: 44,shinF: 40,thighB: -30}},{f: 17,ease: "linear",p: {torso: 18,uarmF: 132,farmF: 0,uarmB: -70,farmB: 10,rootX: 10,thighF: 44,shinF: 40,thighB: -30}},{f: 45,ease: "inOutQuad",p: "base"}]},
        sp2: { length: 37, plant: "feet", blend: 2, keys: [
          { f: 7, ease: "inOutQuad", p: { torso: 10, rootX: -6, uarmF: 40, farmF: 80, uarmB: 40, farmB: 80 } },
          { f: 9, ease: "linear", p: { torso: 10, rootX: -6, uarmF: 40, farmF: 80, uarmB: 40, farmB: 80 } },
          { f: 10, ease: "outExpo", p: { torso: -4, rootX: -12, uarmF: 110, farmF: 10, uarmB: 110, farmB: 10 } },
          { f: 18, ease: "linear", p: { torso: 6, rootX: 8, uarmF: 60 } },
          { f: 36, ease: "inOutQuad", p: "base" } ] },
        super: {length: 82,plant: "feet",blend: 3,keys: [{f: 4,ease: "outQuad",p: {torso: 20,uarmF: 60,farmF: 150,uarmB: 60,farmB: 150,thighF: 60,shinF: 100,rootY: -10}},{f: 8,ease: "outExpo",p: {torso: 30,head: 4,uarmF: 110,farmF: 0,uarmB: 100,farmB: 0,rootX: 12,thighF: 50,shinF: 40,thighB: -36}},{f: 68,ease: "linear",p: {torso: 30,head: 4,uarmF: 110,farmF: 0,uarmB: 100,farmB: 0,rootX: 12,thighF: 50,shinF: 40,thighB: -36}},{f: 82,ease: "inOutQuad",p: "base"}]},
        clone: { length: 44, plant: "feet", blend: 1, keys: [
          { f: 0, ease: "linear", p: { torso: -10, rootX: -6, uarmF: -20, farmF: 60 } },
          { f: 12, ease: "outExpo", p: { torso: 24, rootX: 12, uarmF: 100, farmF: 6 } },
          { f: 30, ease: "linear", p: { torso: 24, rootX: 16, uarmF: 100 } },
          { f: 43, ease: "inOutQuad", p: "base" } ] }
      },
      moves: {
        jS: { kind: "special", name: "急降下蹴り", stance: "air", startup: 6, active: 18, recovery: 4, landLag: 10,
          boxes: [{ f0: 7, f1: 24, x: 4, y: -6, w: 63, h: 40 }],
          hit: { damage: 54, chip: 4, level: "high", hitstun: 18, blockstun: 12, hitstop: 9, knock: { hit: 10, block: 14 }, effect: "stun", gauge: { hit: 40, block: 20 }, impact: 3 },
          motion: [{ f0: 6, f1: 28, vx: 7.5, vy: -7 }], sfx: "swingH" },
        sp3: { kind: "special", name: "狐の滑り込み", stance: "stand", startup: 10, active: 10, recovery: 20,
          boxes: [{ f0: 11, f1: 20, x: 20, y: 0, w: 80, h: 26 }],
          hit: { damage: 58, chip: 4, level: "low", hitstun: 0, blockstun: 14, hitstop: 9, knock: { hit: 0, block: 18 }, effect: "launch", launch: { vx: 3, vy: 6 }, juggle: 0, gauge: { hit: 45, block: 22 }, impact: 3 },
          motion: [{ f0: 2, f1: 20, vx: 9.5 }], invuln: [{ f0: 1, f1: 20, type: "proj" }], sfx: "swingH" },
        "5L": { kind: "normal", name: "立ち弱", stance: "stand", startup: 4, active: 3, recovery: 7,
          boxes: [ { f0: 5, f1: 7, x: 30, y: 84, w: 50, h: 26 } ],
          hit: { damage: 24, chip: 0, level: "mid", hitstun: 17, blockstun: 10, hitstop: 6, knock: { hit: 6, block: 8 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          cancel: { into: ["5L", "2L", "5H", "2H", "sp1", "sp2", "super"], frames: 14 },
          trail: { from: "handF", color: "glow", width: 7, frames: 5 }, sfx: "swingL" },
        "2L": { kind: "normal", otg: true, name: "しゃがみ弱", stance: "crouch", startup: 4, active: 3, recovery: 8,
          boxes: [ { f0: 5, f1: 7, x: 30, y: 14, w: 68, h: 22 } ],
          hit: { damage: 20, chip: 0, level: "low", hitstun: 17, blockstun: 10, hitstop: 6, knock: { hit: 6, block: 8 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          cancel: { into: ["5L", "2L", "5H", "2H", "sp1", "sp2", "super"], frames: 14 },
          sfx: "swingL" },
        "5H": { kind: "normal", name: "立ち強（上段）", stance: "stand", startup: 10, active: 4, recovery: 15,
          boxes: [ { f0: 11, f1: 14, x: 34, y: 60, w: 53, h: 60 } ],
          hit: { damage: 52, chip: 0, level: "high", hitstun: 20, blockstun: 14, hitstop: 9, knock: { hit: 12, block: 16 }, effect: "stun", gauge: { hit: 45, block: 22 }, impact: 3 },
          cancel: { into: ["sp1", "sp2", "super"], frames: 16 },
          trail: { from: "handF", color: "glow", width: 12, frames: 8 }, sfx: "swingH" },
        "2H": { kind: "normal", name: "しゃがみ強（足払い）", stance: "crouch", startup: 8, active: 4, recovery: 18,
          boxes: [ { f0: 9, f1: 12, x: 26, y: 0, w: 88, h: 24 } ],
          hit: { damage: 50, chip: 0, level: "low", hitstun: 0, blockstun: 14, hitstop: 9, knock: { hit: 0, block: 16 }, effect: "launch", launch: { vx: 1.5, vy: 9.5 }, juggle: 3, gauge: { hit: 40, block: 20 }, impact: 3 },
          cancel: { into: ["sp1", "super", "jump"], frames: 10 },
          sfx: "swingH" },
        "jL": { kind: "normal", name: "ジャンプ弱", stance: "air", startup: 4, active: 9, recovery: 5, landLag: 3,
          boxes: [ { f0: 5, f1: 13, x: 20, y: 40, w: 73, h: 46 } ],
          hit: { damage: 22, chip: 0, level: "mid", hitstun: 15, blockstun: 11, hitstop: 5, knock: { hit: 5, block: 7 }, effect: "stun", gauge: { hit: 25, block: 12 }, impact: 1 },
          cancel: { into: ["jH", "jS"], frames: 12 },
          sfx: "swingL" },
        "jH": { kind: "normal", name: "ジャンプ強", stance: "air", startup: 7, active: 6, recovery: 9, landLag: 4,
          boxes: [ { f0: 8, f1: 13, x: 22, y: 0, w: 46, h: 70 } ],
          hit: { damage: 50, chip: 0, level: "mid", hitstun: 20, blockstun: 14, hitstop: 9, knock: { hit: 9, block: 12 }, effect: "stun", gauge: { hit: 45, block: 22 }, impact: 3 },
          trail: { from: "handF", color: "glow", width: 10, frames: 7 }, sfx: "swingH" },
        throw: { kind: "throw", name: "投げ", stance: "stand", startup: 5, active: 2, recovery: 19, boxes: [], hit: null,
          throw: {
            box: { x: 8, y: 20, w: 56, h: 100 }, techable: true, damage: 100, grabFrames: 28, afterRecovery: 16, attackerClip: "throwHit",
            hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 12, ease: "inOutCubic", x: 24, y: 170, rot: -100 }, { f: 24, ease: "outExpo", x: 70, y: 30, rot: -150 }, { f: 28, ease: "linear", x: 76, y: 20, rot: -160 } ],
            launch: { vx: 3, vy: 6 }, hitstop: 10, impact: 3, gauge: { hit: 40 } },
          sfx: "grab" },
        sp1: { kind: "special", name: "分身斬り", stance: "stand", startup: 12, active: 1, recovery: 32, boxes: [], hit: null,
          spawn: [ { at: 13, projectile: "clone", x: 24, y: 60 } ], sfx: "cast" },
        sp2: { kind: "special", name: "狐火転移", stance: "stand", startup: 10, active: 1, recovery: 26, boxes: [], hit: null,
          teleport: { at: 11, to: "behind", gap: 70 },
          invuln: [ { f0: 1, f1: 12, type: "all" } ],
          sfx: "teleport" },
        super: { kind: "super", name: "大祓「無限ループ分身舞」", stance: "stand", startup: 8, active: 40, recovery: 34, cost: 1000, flash: 40,
          boxes: [ { f0: 9, f1: 48, x: 12, y: 10, w: 90, h: 120 } ],
          hit: { damage: 24, chip: 8, level: "mid", hitstun: 14, blockstun: 14, hitstop: 4, knock: { hit: 2, block: 4 }, effect: "stun", gauge: { hit: 0, block: 0 }, impact: 2 },
          multi: { count: 8, every: 5, final: { damage: 100, chip: 14, level: "mid", hitstun: 0, blockstun: 24, hitstop: 16, knock: { hit: 0, block: 20 }, effect: "launch", launch: { vx: 4, vy: 9 }, juggle: 0, gauge: { hit: 0, block: 0 }, impact: 4 } },
          teleport: { at: 9, to: "front", gap: 50 },
          invuln: [ { f0: 1, f1: 8, type: "all" } ],
          sfx: "super" }
      },
      projectiles: {
        clone: { life: 44, vx: 6.5, vy: 0, box: { x: -20, y: -30, w: 40, h: 60 }, hit: { damage: 20, chip: 4, level: "mid", hitstun: 16, blockstun: 12, hitstop: 8, knock: { hit: 6, block: 10 }, effect: "stun", gauge: { hit: 20, block: 10 }, impact: 2 }, hits: 2, hitEvery: 12, maxActive: 1, priority: 1,
          look: { style: "ghost", clip: "clone", color: "glow", size: 1.0 } }
      },
      quotes: {
        select: "ループ、回ります。",
        intro: ["無限ループ狐、いきます！"],
        win: ["終了条件に到達しました。", "おつかれさま。無限に勝ちました。"],
        lose: ["ループから…抜けられない…"]
      }
    },
    /* ---- 追加キャラ（newchars.js で生成） ---- */
    tengu: {
      id: "tengu",
      name: "電脳天狗",
      nameEn: "CYBER TENGU",
      title: "遠距離・空中型",
      blurb: "羽うちわの風で寄せつけない。空中で一度だけ止まり、上から風を撃ち下ろす。",
      ratings: { power: 3, speed: 3, range: 5, defense: 2 },
      stats: { dmgMul: 1.14, hp: 950, walkF: 3, walkB: 2.9, jumpVy: 15.5, jumpVx: 3.8, gravity: 0.68, airJumps: 0, prejump: 4, landLag: 3, dashF: { frames: 18, speed: 8.7 }, dashB: { frames: 18, speed: 6.5, invuln: 6 }, gaugeMul: 1 },
      boxes: { push: { stand: { w: 52, h: 100 }, crouch: { w: 56, h: 70 }, air: { w: 44, h: 100 } }, hurt: { stand: [ { x: -9, y: 143, w: 32, h: 32 }, { x: -26, y: 60, w: 54, h: 82 }, { x: -24, y: 0, w: 48, h: 64 } ], crouch: [ { x: 17, y: 94, w: 32, h: 32 }, { x: -28, y: 0, w: 58, h: 74 } ], air: [ { x: -24, y: 20, w: 50, h: 153 }, { x: -12, y: 141, w: 32, h: 32 } ] } },
      look: { palette: { skin: "#ffe0cc", hair: "#1a1033", primary: "#f4f7ff", secondary: "#ff3b5c", accent: "#ffd24a", glow: "#19f3ff", outline: "#0a0620", eye: "#19f3ff" }, paletteP2: { skin: "#ffe0cc", hair: "#2b1033", primary: "#e8ddff", secondary: "#a56bff", accent: "#ffd24a", glow: "#ff4fa3", outline: "#0a0620", eye: "#ff4fa3" }, body: { torsoLen: 52, torsoWTop: 30, torsoWBottom: 24, neckLen: 8, headR: 15, shoulderDrop: 6, uArmLen: 31, fArmLen: 29, handR: 6, thighLen: 42, shinLen: 42, footLen: 20, footH: 8, limbW: { uArm: [ 11, 9 ], fArm: [ 9, 7 ], thigh: [ 16, 13 ], shin: [ 12, 9 ] } }, colors: { head: "skin", neck: "skin", torso: "primary", uArm: "primary", fArm: "primary", hand: "skin", thigh: "secondary", shin: "secondary", foot: "accent" }, prop: { kind: "gohei", len: 46, thick: 4, angle: 0, color: "accent" }, neon: { tubeW: 3, glowW: 8, glowAlpha: 0.24, coreW: 1, fill: 0.9 }, decor: [], chains: [] },
      feel: { breath: { amp: 0.012, period: 90 }, jump: { sx: 0.94, sy: 1.08, frames: 4 }, land: { sx: 1.1, sy: 0.88, frames: 6 }, dash: { sx: 1.06, sy: 0.97, frames: 5 }, hitShake: { amp: [ 1, 2, 3, 3.5 ] }, recoil: { x: [ 3, 6, 10, 14 ], rot: [ 2, 4, 7, 10 ], frames: 4 }, squashHit: { sx: 1.06, sy: 0.94, frames: 3 } },
      basePose: { rootX: 0, rootY: 0, rot: 0, torso: 6, head: -3, uarmF: 20, farmF: 140, uarmB: 14, farmB: 60, thighF: 22, shinF: 34, footF: 12, thighB: -14, shinB: 14, footB: 28 },
      clips: {
        idle: { length: 72, loop: true, plant: "feet", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: "base" }, { f: 36, ease: "inOutQuad", p: { torso: 8, head: -4, uarmF: 24, farmF: 135, uarmB: 18, farmB: 56, thighF: 26, shinF: 42, footF: 16, thighB: -15, shinB: 18, footB: 33 } } ] },
        walkF: { length: 32, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 16, sfx: "step" } ], keys: [ { f: 0, ease: "inOutQuad", p: { torso: 8, thighF: 30, shinF: 10, footF: -20, thighB: -24, shinB: 28, footB: 20, uarmF: 12, farmF: 145, uarmB: 44, farmB: 62 } }, { f: 8, ease: "inOutQuad", p: { thighF: 6, shinF: 8, footF: 2, thighB: 28, shinB: 60, footB: 30, uarmF: 18, uarmB: 36 } }, { f: 16, ease: "inOutQuad", p: { thighF: -24, shinF: 28, footF: 20, thighB: 30, shinB: 10, footB: -20, uarmF: 26, uarmB: 30 } }, { f: 24, ease: "inOutQuad", p: { thighF: 28, shinF: 60, footF: 30, thighB: 6, shinB: 8, footB: 2, uarmF: 18, uarmB: 36 } } ] },
        walkB: { length: 40, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 20, sfx: "step" } ], keys: [ { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 18, shinF: 22, footF: 4, thighB: -22, shinB: 24, footB: 2 } }, { f: 10, ease: "inOutQuad", p: { thighF: 4, shinF: 8, footF: 2, thighB: -6, shinB: 44, footB: 26 } }, { f: 20, ease: "inOutQuad", p: { thighF: -22, shinF: 24, footF: 2, thighB: 18, shinB: 22, footB: 4 } }, { f: 30, ease: "inOutQuad", p: { thighF: -6, shinF: 44, footF: 26, thighB: 4, shinB: 8, footB: 2 } } ] },
        crouch: { length: 60, loop: true, plant: "feet", blend: 4, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 30, head: -12, uarmF: 32, farmF: 155, uarmB: 35, farmB: 80, thighF: 75, shinF: 125, footF: 50, thighB: 60, shinB: 125, footB: 65 } }, { f: 30, ease: "inOutQuad", p: { torso: 32, head: -13, thighF: 77, shinF: 128, footF: 51, thighB: 62, shinB: 128, footB: 66 } } ] },
        jumpUp: { length: 18, plant: "root", blend: 3, keys: [ { f: 6, ease: "outCubic", p: { torso: 2, thighF: 60, shinF: 95, footF: 35, thighB: 18, shinB: 55, footB: 30, uarmF: 57, farmF: 125, uarmB: 50, farmB: 70 } }, { f: 18, ease: "inOutQuad", p: { torso: 0, head: 0, thighF: 68, shinF: 105, thighB: 22, shinB: 62 } } ] },
        jumpFall: { length: 24, loop: true, plant: "root", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 30, shinF: 40, footF: 20, thighB: -6, shinB: 44, footB: 30, uarmF: 42, farmF: 115, uarmB: 40, farmB: 60 } }, { f: 12, ease: "inOutQuad", p: { thighF: 26, shinF: 34, thighB: -2, shinB: 38, uarmF: 50, uarmB: 46 } } ] },
        dashF: { length: 18, plant: "feet", blend: 2, keys: [ { f: 0, ease: "linear", p: { torso: 24, head: -8, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: -38, farmF: 135, uarmB: 60, farmB: 80 } }, { f: 9, ease: "inOutQuad", p: { torso: 26, thighF: -35, shinF: 50, footF: 10, thighB: 50, shinB: 80, footB: 30, uarmF: 37, farmF: 145, uarmB: -25, farmB: 70 } }, { f: 17, ease: "inOutQuad", p: { torso: 24, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: -38, uarmB: 60 } } ] },
        dashB: { length: 18, plant: "feet", blend: 2, keys: [ { f: 4, ease: "outCubic", p: { rootY: 22, rot: -6, torso: -8, thighF: 30, shinF: 60, footF: 25, thighB: 10, shinB: 50, footB: 35 } }, { f: 12, ease: "inOutQuad", p: { rootY: 10, rot: -3, torso: -4 } }, { f: 17, ease: "inQuad", p: { rootY: 0, rot: 0, torso: 6, thighF: 40, shinF: 70, footF: 30, thighB: 20, shinB: 60, footB: 40 } } ] },
        landing: { length: 6, plant: "feet", blend: 1, keys: [ { f: 0, ease: "linear", p: { torso: 30, thighF: 60, shinF: 100, footF: 40, thighB: 40, shinB: 90, footB: 50, uarmF: 32, farmF: 145, uarmB: 35, farmB: 70 } }, { f: 5, ease: "inOutQuad", p: "base" } ] },
        guardStand: { length: 30, loop: true, plant: "feet", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 10, head: 2, uarmF: 52, farmF: 118, uarmB: 44, farmB: 112, thighF: 26, shinF: 42, footF: 16, thighB: -15, shinB: 18, footB: 33 } }, { f: 15, ease: "inOutQuad", p: { torso: 8, uarmF: 50, farmF: 120 } } ] },
        guardCrouch: { length: 30, loop: true, plant: "feet", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 30, head: -12, uarmF: 52, farmF: 118, uarmB: 44, farmB: 112, thighF: 75, shinF: 125, footF: 50, thighB: 60, shinB: 125, footB: 65 } }, { f: 15, ease: "inOutQuad", p: { torso: 32, uarmF: 50, farmF: 120 } } ] },
        hurtHigh: { length: 16, plant: "feet", blend: 1, keys: [ { f: 2, ease: "outExpo", p: { torso: -16, head: -22, rootX: -6, uarmF: -5, farmF: 25, uarmB: -20, farmB: 30, thighF: 20, shinF: 34, footF: 12, thighB: -18, shinB: 10, footB: 24 } }, { f: 12, ease: "inOutQuad", p: { torso: -8, head: -12, rootX: -3 } } ] },
        hurtLow: { length: 16, plant: "feet", blend: 1, keys: [ { f: 2, ease: "outExpo", p: { torso: 34, head: 14, rootX: -4, uarmF: 10, farmF: 40, uarmB: -8, farmB: 30, thighF: 36, shinF: 60, footF: 24, thighB: -8, shinB: 40, footB: 25 } }, { f: 12, ease: "inOutQuad", p: { torso: 26, head: 8 } } ] },
        hurtAir: { length: 24, plant: "root", blend: 1, keys: [ { f: 3, ease: "outCubic", p: { rot: -25, torso: -14, head: -18, uarmF: -20, farmF: 20, uarmB: -30, farmB: 20, thighF: 30, shinF: 50, footF: 20, thighB: 10, shinB: 50, footB: 20 } }, { f: 24, ease: "inOutQuad", p: { rot: -80, torso: -6, thighF: 40, shinF: 70 } } ] },
        down: { length: 40, loop: true, plant: "root", blend: 3, keys: [ { f: 0, ease: "inOutQuad", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: 20, farmF: 10, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } }, { f: 20, ease: "inOutQuad", p: { head: -3, uarmF: 22 } } ] },
        wakeup: { length: 18, plant: "root", blend: 1, keys: [ { f: 0, ease: "linear", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: 2, farmF: 75, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } }, { f: 8, ease: "outCubic", p: { rot: -30, rootY: -30, torso: 35, head: 10, uarmF: 7, farmF: 125, uarmB: 15, farmB: 50, thighF: 60, shinF: 110, footF: 50, thighB: 40, shinB: 100, footB: 60 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        thrown: { length: 20, loop: true, plant: "root", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { rot: -20, rootY: -10, torso: -10, head: -15, uarmF: 70, farmF: 30, uarmB: 60, farmB: 40, thighF: 40, shinF: 60, footF: 20, thighB: 20, shinB: 50, footB: 20 } }, { f: 10, ease: "inOutQuad", p: { rot: -26, uarmF: 80, uarmB: 50, thighF: 34 } } ] },
        intro: { length: 60, plant: "feet", blend: 6, keys: [ { f: 20, ease: "inOutCubic", p: { torso: 42, head: 10, uarmF: 25, farmF: 105, uarmB: 25, farmB: 105 } }, { f: 34, ease: "linear", p: { torso: 42, head: 10 } }, { f: 52, ease: "inOutCubic", p: "base" } ] },
        win: { length: 90, loop: true, plant: "feet", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: -4, head: -6, uarmF: 150, farmF: 25, uarmB: 20, farmB: 50, thighF: 20, shinF: 28, footF: 8, thighB: -12, shinB: 12, footB: 24 } }, { f: 45, ease: "inOutQuad", p: { uarmF: 158, torso: -6 } } ] },
        lose: { length: 40, plant: "feet", blend: 6, keys: [ { f: 20, ease: "outCubic", p: { torso: 38, head: 20, uarmF: 10, farmF: 30, uarmB: 5, farmB: 25, thighF: 50, shinF: 90, footF: 40, thighB: 30, shinB: 80, footB: 50 } } ] },
        throwHit: { length: 48, plant: "feet", blend: 1, keys: [ { f: 0, ease: "linear", p: { torso: 20, rootX: 8, uarmF: 85, farmF: 5, uarmB: 85, farmB: 5 } }, { f: 12, ease: "inOutCubic", p: { torso: -10, rootX: 0, uarmF: 170, farmF: 10, uarmB: 170, farmB: 10, thighF: 26, shinF: 36, footF: 10 } }, { f: 26, ease: "outExpo", p: { torso: 35, rootX: 10, uarmF: 40, farmF: 5, uarmB: 40, farmB: 5 } }, { f: 30, ease: "linear", p: { rootX: 12 } }, { f: 47, ease: "inOutQuad", p: "base" } ] },
        "5L": { length: 17, plant: "feet", blend: 2, keys: [ { f: 3, ease: "outQuad", p: { uarmF: 50, farmF: 110, rootX: -3 } }, { f: 5, ease: "outExpo", p: { torso: 12, uarmF: 96, farmF: 0, rootX: 8, thighF: 30, shinF: 30 } }, { f: 8, ease: "linear", p: { torso: 12, uarmF: 96, farmF: 0, rootX: 8, thighF: 30, shinF: 30 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        "2L": { length: 17, plant: "feet", blend: 2, base: "crouch", keys: [ { f: 3, ease: "outQuad", p: { thighF: 70, shinF: 120 } }, { f: 5, ease: "outExpo", p: { torso: 10, head: -10, thighF: 86, shinF: 10, footF: 0, rootX: 6, uarmF: 40, farmF: 60 } }, { f: 8, ease: "linear", p: { torso: 10, head: -10, thighF: 86, shinF: 10, footF: 0, rootX: 6, uarmF: 40, farmF: 60 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        "5H": { length: 34, plant: "feet", blend: 3, keys: [ { f: 7, ease: "outQuad", p: { torso: -14, head: -8, uarmF: -30, farmF: 40, uarmB: 60, rootX: -6, thighB: -20 } }, { f: 12, ease: "outExpo", p: { torso: 24, head: 2, uarmF: 112, farmF: 0, uarmB: -50, farmB: 20, rootX: 14, thighF: 46, shinF: 40, thighB: -30 } }, { f: 16, ease: "linear", p: { torso: 24, head: 2, uarmF: 112, farmF: 0, uarmB: -50, farmB: 20, rootX: 14, thighF: 46, shinF: 40, thighB: -30 } }, { f: 34, ease: "inOutQuad", p: "base" } ] },
        "2H": { length: 34, plant: "feet", blend: 3, base: "crouch", keys: [ { f: 5, ease: "outQuad", p: { torso: 30, thighF: 50, shinF: 110 } }, { f: 9, ease: "outExpo", p: { torso: 40, head: -14, thighF: 94, shinF: 4, footF: -10, rootX: 8, uarmF: 0, farmF: 30, uarmB: 60 } }, { f: 13, ease: "linear", p: { torso: 40, head: -14, thighF: 94, shinF: 4, footF: -10, rootX: 8, uarmF: 0, farmF: 30, uarmB: 60 } }, { f: 34, ease: "inOutQuad", p: "base" } ] },
        jL: { length: 18, plant: "root", blend: 2, base: "jumpFall", keys: [ { f: 2, ease: "outQuad", p: { thighF: 50, shinF: 110 } }, { f: 4, ease: "outExpo", p: { torso: -6, thighF: 92, shinF: 0, uarmF: 20, farmF: 60 } }, { f: 13, ease: "linear", p: { torso: -6, thighF: 92, shinF: 0, uarmF: 20, farmF: 60 } }, { f: 18, ease: "inOutQuad", p: "base" } ] },
        jH: { length: 24, plant: "root", blend: 3, base: "jumpFall", keys: [ { f: 4, ease: "outQuad", p: { torso: -14, uarmF: 175, farmF: 20, uarmB: 175, farmB: 20 } }, { f: 8, ease: "outExpo", p: { torso: 36, uarmF: 50, farmF: 0, uarmB: 40, farmB: 0, thighF: 50, shinF: 100, thighB: 10, shinB: 100 } }, { f: 14, ease: "linear", p: { torso: 36, uarmF: 50, farmF: 0, uarmB: 40, farmB: 0, thighF: 50, shinF: 100, thighB: 10, shinB: 100 } }, { f: 24, ease: "inOutQuad", p: "base" } ] },
        throw: { length: 27, plant: "feet", blend: 3, keys: [ { f: 3, ease: "outQuad", p: { uarmF: 60, farmF: 60, uarmB: 50, farmB: 60 } }, { f: 5, ease: "outExpo", p: { torso: 26, uarmF: 72, farmF: 40, uarmB: 72, farmB: 40, rootX: 10, thighF: 40, shinF: 40 } }, { f: 7, ease: "linear", p: { torso: 26, uarmF: 72, farmF: 40, uarmB: 72, farmB: 40, rootX: 10, thighF: 40, shinF: 40 } }, { f: 27, ease: "inOutQuad", p: "base" } ] },
        sp1: { length: 47, plant: "feet", blend: 3, keys: [ { f: 8, ease: "outQuad", p: { torso: -16, head: -8, uarmF: -40, farmF: 60, uarmB: 60, rootX: -6, thighB: -20 } }, { f: 14, ease: "outExpo", p: { torso: 22, head: -4, uarmF: 120, farmF: 0, uarmB: -60, farmB: 10, rootX: 14, thighF: 50, shinF: 50, thighB: -30 } }, { f: 21, ease: "linear", p: { torso: 22, head: -4, uarmF: 120, farmF: 0, uarmB: -60, farmB: 10, rootX: 14, thighF: 50, shinF: 50, thighB: -30 } }, { f: 47, ease: "inOutQuad", p: "base" } ] },
        sp2: { length: 41, plant: "feet", blend: 3, keys: [ { f: 3, ease: "outQuad", p: { torso: 30, uarmF: 20, farmF: 100, thighF: 60, shinF: 100, rootY: -8 } }, { f: 6, ease: "outExpo", p: { torso: -10, head: -14, uarmF: 175, farmF: 0, uarmB: 150, farmB: 20, thighF: 40, shinF: 70, thighB: -10, shinB: 40 } }, { f: 17, ease: "linear", p: { torso: -10, head: -14, uarmF: 175, farmF: 0, uarmB: 150, farmB: 20, thighF: 40, shinF: 70, thighB: -10, shinB: 40 } }, { f: 41, ease: "inOutQuad", p: "base" } ] },
        sp3: { length: 36, plant: "root", blend: 3, base: "jumpFall", keys: [ { f: 9, ease: "outQuad", p: { torso: 20, uarmF: 120, farmF: 40, uarmB: 120, thighF: 70, shinF: 120 } }, { f: 16, ease: "outExpo", p: { torso: 40, head: 10, uarmF: 60, farmF: 0, uarmB: 50, thighF: 60, shinF: 90, thighB: 20, shinB: 90 } }, { f: 24, ease: "linear", p: { torso: 40, head: 10, uarmF: 60, farmF: 0, uarmB: 50, thighF: 60, shinF: 90, thighB: 20, shinB: 90 } }, { f: 36, ease: "inOutQuad", p: "base" } ] },
        jS: { length: 32, plant: "root", blend: 3, base: "jumpFall", keys: [ { f: 7, ease: "outQuad", p: { torso: -16, uarmF: 170, farmF: 20, uarmB: 150, thighF: 60, shinF: 100 } }, { f: 13, ease: "outExpo", p: { torso: 30, head: 10, uarmF: 60, farmF: 0, uarmB: -30, thighF: 40, shinF: 60, thighB: 0, shinB: 70 } }, { f: 22, ease: "linear", p: { torso: 30, head: 10, uarmF: 60, farmF: 0, uarmB: -30, thighF: 40, shinF: 60, thighB: 0, shinB: 70 } }, { f: 32, ease: "inOutQuad", p: "base" } ] },
        super: { length: 61, plant: "feet", blend: 3, keys: [ { f: 6, ease: "outQuad", p: { torso: -16, head: -12, uarmF: 178, farmF: 10, uarmB: 175, farmB: 10, rootY: 6 } }, { f: 10, ease: "outExpo", p: { torso: 30, head: 6, uarmF: 100, farmF: 0, uarmB: -60, farmB: 10, rootX: 14, thighF: 50, shinF: 50, thighB: -30 } }, { f: 35, ease: "linear", p: { torso: 30, head: 6, uarmF: 100, farmF: 0, uarmB: -60, farmB: 10, rootX: 14, thighF: 50, shinF: 50, thighB: -30 } }, { f: 61, ease: "inOutQuad", p: "base" } ] }
      },
      moves: {
        "5L": { kind: "normal", name: "立ち弱（扇突き）", stance: "stand", startup: 5, active: 3, recovery: 9, boxes: [ { f0: 6, f1: 8, x: 30, y: 92, w: 89, h: 30 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 1, damage: 28, hitstun: 19, blockstun: 11, hitstop: 6, knock: { hit: 8, block: 10 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "5L", "2L", "5H", "2H", "sp1", "sp2", "super" ], frames: 14 }, trail: { from: "handF", color: "glow", width: 9, frames: 6 }, sfx: "swingL" },
        "2L": { kind: "normal", otg: true, name: "しゃがみ弱（下駄蹴り）", stance: "crouch", startup: 5, active: 3, recovery: 9, boxes: [ { f0: 6, f1: 8, x: 30, y: 14, w: 76, h: 24 } ], hit: { chip: 0, level: "low", effect: "stun", impact: 1, damage: 24, hitstun: 20, blockstun: 12, hitstop: 6, knock: { hit: 8, block: 10 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "5L", "2L", "5H", "2H", "sp1", "sp2", "super" ], frames: 14 }, sfx: "swingL" },
        "5H": { kind: "normal", name: "立ち強（羽うちわ払い）", stance: "stand", startup: 12, active: 4, recovery: 18, boxes: [ { f0: 13, f1: 16, x: 40, y: 70, w: 104, h: 60 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 3, damage: 70, hitstun: 23, blockstun: 15, hitstop: 10, knock: { hit: 16, block: 20 }, gauge: { hit: 45, block: 22 } }, cancel: { into: [ "sp1", "sp2", "super" ], frames: 16 }, trail: { from: "handF", color: "glow", width: 16, frames: 8 }, sfx: "swingH" },
        "2H": { kind: "normal", name: "しゃがみ強（旋風脚）", stance: "crouch", startup: 9, active: 4, recovery: 21, boxes: [ { f0: 10, f1: 13, x: 26, y: 0, w: 86, h: 26 } ], hit: { chip: 0, level: "low", effect: "launch", impact: 3, damage: 56, hitstun: 0, blockstun: 12, hitstop: 10, knock: { hit: 0, block: 18 }, launch: { vx: 1.5, vy: 9.5 }, juggle: 3, gauge: { hit: 40, block: 20 } }, cancel: { into: [ "sp2", "super", "jump" ], frames: 14 }, sfx: "swingH" },
        jL: { kind: "normal", name: "ジャンプ弱", stance: "air", startup: 4, active: 9, recovery: 5, landLag: 3, boxes: [ { f0: 5, f1: 13, x: 20, y: 40, w: 80, h: 48 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 1, damage: 26, hitstun: 16, blockstun: 12, hitstop: 6, knock: { hit: 6, block: 8 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "jH", "jS" ], frames: 12 }, sfx: "swingL" },
        jH: { kind: "normal", name: "ジャンプ強（翼打ち）", stance: "air", startup: 8, active: 6, recovery: 10, landLag: 4, boxes: [ { f0: 9, f1: 14, x: 10, y: -6, w: 72, h: 80 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 3, damage: 58, hitstun: 22, blockstun: 16, hitstop: 10, knock: { hit: 10, block: 14 }, gauge: { hit: 45, block: 22 } }, trail: { from: "handF", color: "glow", width: 14, frames: 8 }, sfx: "swingH" },
        throw: { kind: "throw", name: "投げ", stance: "stand", startup: 5, active: 2, recovery: 20, boxes: [], hit: null, throw: { box: { x: 10, y: 20, w: 64, h: 100 }, techable: true, damage: 120, grabFrames: 30, afterRecovery: 18, attackerClip: "throwHit", hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 12, ease: "inOutCubic", x: 24, y: 170, rot: -100 }, { f: 26, ease: "outExpo", x: 70, y: 30, rot: -150 }, { f: 30, ease: "linear", x: 76, y: 20, rot: -160 } ], launch: { vx: 3, vy: 7 }, hitstop: 12, impact: 3, gauge: { hit: 40 } }, sfx: "grab" },
        sp1: { kind: "special", name: "かまいたち", stance: "stand", startup: 14, active: 1, recovery: 32, boxes: [], hit: null, spawn: [ { at: 15, projectile: "kaze", x: 60, y: 64 } ], sfx: "wind" },
        sp2: { kind: "special", name: "突風昇り", stance: "stand", startup: 6, active: 7, recovery: 28, landLag: 6, boxes: [ { f0: 7, f1: 13, x: 10, y: 30, w: 48, h: 140 } ], hit: { chip: 6, level: "mid", effect: "launch", impact: 3, damage: 74, hitstun: 0, blockstun: 22, hitstop: 10, knock: { hit: 0, block: 14 }, launch: { vx: 2.5, vy: 10 }, juggle: 3, gauge: { hit: 60, block: 30 } }, motion: [ { f0: 7, f1: 7, vx: 2.5, vy: 11 } ], invuln: [ { f0: 1, f1: 9, type: "strike" } ], sfx: "rise" },
        sp3: { kind: "special", name: "烏落とし", stance: "stand", startup: 16, active: 8, recovery: 12, landLag: 10, boxes: [ { f0: 17, f1: 24, x: 20, y: 50, w: 66, h: 60 } ], hit: { chip: 5, level: "high", effect: "stun", impact: 3, damage: 70, hitstun: 22, blockstun: 16, hitstop: 10, knock: { hit: 12, block: 16 }, gauge: { hit: 50, block: 25 } }, motion: [ { f0: 5, f1: 5, vx: 7.5, vy: 11 } ], invuln: [ { f0: 1, f1: 20, type: "proj" } ], trail: { from: "handF", color: "glow", width: 12, frames: 8 }, sfx: "swingH" },
        jS: { kind: "special", name: "空風（からかぜ）", stance: "air", airOnce: true, startup: 13, active: 1, recovery: 18, landLag: 14, boxes: [], hit: null, hover: { f0: 1, f1: 29 }, spawn: [ { at: 14, projectile: "kazeDown", x: 40, y: 70 } ], sfx: "wind" },
        super: { kind: "super", name: "大祓「天狗の大嵐」", stance: "stand", startup: 10, active: 1, recovery: 50, cost: 1000, flash: 40, boxes: [], hit: null, invuln: [ { f0: 1, f1: 12, type: "all" } ], spawn: [ { at: 11, projectile: "arashi", x: 70, y: 0 } ], sfx: "super" }
      },
      projectiles: {
        kaze: { life: 100, vx: 7, vy: 0, box: { x: -22, y: -16, w: 44, h: 32 }, hits: 1, maxActive: 1, priority: 1, hit: { chip: 6, level: "mid", effect: "launch", impact: 2, damage: 44, hitstun: 0, blockstun: 14, hitstop: 8, knock: { hit: 0, block: 14 }, launch: { vx: 3, vy: 6 }, juggle: 0, gauge: { hit: 30, block: 15 } }, look: { style: "slash", color: "glow", size: 1 } },
        kazeDown: { life: 70, vx: 6, vy: -4.5, box: { x: -20, y: -16, w: 40, h: 32 }, hits: 1, maxActive: 1, priority: 1, hit: { chip: 5, level: "mid", effect: "stun", impact: 2, damage: 40, hitstun: 18, blockstun: 13, hitstop: 8, knock: { hit: 10, block: 12 }, gauge: { hit: 30, block: 15 } }, look: { style: "slash", color: "glow", size: 0.9 } },
        arashi: { life: 90, vx: 4.2, vy: 0, box: { x: -50, y: 0, w: 100, h: 180 }, hits: 6, hitEvery: 7, maxActive: 1, priority: 3, ground: true, hit: { chip: 8, level: "mid", effect: "launch", impact: 3, damage: 44, hitstun: 0, blockstun: 12, hitstop: 5, knock: { hit: 0, block: 4 }, launch: { vx: 0.6, vy: 6.5 }, juggle: 8, gauge: { hit: 0, block: 0 } }, look: { style: "orb", color: "accent", size: 2.4 } }
      },
      quotes: { select: "風向き、良好。", intro: [ "電脳天狗、舞い降りる！" ], win: [ "鼻を高くして帰るがいい。", "そよ風で十分だったな。" ], lose: [ "向かい風…か…" ] }
    },
    maneki: {
      id: "maneki",
      name: "招き猫Bot",
      nameEn: "MANEKI-NEKO BOT",
      title: "投げ・一発逆転型",
      blurb: "動きは遅いが、手招きで相手を引き寄せる。近づけばガードできない大投げ。",
      ratings: { power: 5, speed: 1, range: 3, defense: 4 },
      stats: { dmgMul: 1.3, hp: 1100, walkF: 2.4, walkB: 2.2, jumpVy: 13.5, jumpVx: 2.8, gravity: 0.8, airJumps: 0, prejump: 5, landLag: 4, dashF: { frames: 22, speed: 6.3 }, dashB: { frames: 22, speed: 4, invuln: 4 }, gaugeMul: 0.95 },
      boxes: { push: { stand: { w: 72, h: 116 }, crouch: { w: 80, h: 88 }, air: { w: 64, h: 116 } }, hurt: { stand: [ { x: -17, y: 115, w: 38, h: 38 }, { x: -36, y: 30, w: 76, h: 86 }, { x: -28, y: 0, w: 56, h: 34 } ], crouch: [ { x: 8, y: 80, w: 38, h: 38 }, { x: -34, y: 0, w: 72, h: 82 } ], air: [ { x: -34, y: 20, w: 70, h: 104 }, { x: -15, y: 111, w: 38, h: 38 } ] } },
      look: { palette: { skin: "#d9344f", hair: "#2a1a3a", primary: "#ffa13c", secondary: "#2a1a3a", accent: "#ffe94d", glow: "#ff3b5c", outline: "#0a0620", eye: "#ffe94d" }, paletteP2: { skin: "#8f1f3a", hair: "#101018", primary: "#ffe94d", secondary: "#2a1a3a", accent: "#ffa13c", glow: "#ffa13c", outline: "#0a0620", eye: "#ff3b5c" }, body: { torsoLen: 44, torsoWTop: 42, torsoWBottom: 34, neckLen: 8, headR: 18, shoulderDrop: 6, uArmLen: 26, fArmLen: 24, handR: 8, thighLen: 30, shinLen: 30, footLen: 24, footH: 10, limbW: { uArm: [ 15, 12 ], fArm: [ 13, 10 ], thigh: [ 20, 16 ], shin: [ 16, 12 ] } }, colors: { head: "skin", neck: "skin", torso: "glow", uArm: "primary", fArm: "primary", hand: "skin", thigh: "glow", shin: "glow", foot: "accent" }, prop: { kind: "kanabo", len: 62, thick: 10, angle: 0, color: "accent" }, neon: { tubeW: 4, glowW: 10, glowAlpha: 0.26, coreW: 1.2, fill: 0.92 }, decor: [], chains: [] },
      feel: { breath: { amp: 0.01, period: 90 }, jump: { sx: 0.96, sy: 1.05, frames: 4 }, land: { sx: 1.1, sy: 0.84, frames: 7 }, dash: { sx: 1.04, sy: 0.97, frames: 6 }, hitShake: { amp: [ 1, 2, 3, 3.5 ] }, recoil: { x: [ 2, 4, 6, 8 ], rot: [ 1, 3, 5, 7 ], frames: 4 }, squashHit: { sx: 1.04, sy: 0.95, frames: 3 } },
      basePose: { rootX: 0, rootY: 0, rot: 0, torso: 4, head: -2, uarmF: 10, farmF: 130, uarmB: 22, farmB: 40, thighF: 14, shinF: 20, footF: 6, thighB: -10, shinB: 14, footB: 24 },
      clips: {
        idle: { length: 54, loop: true, plant: "feet", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 2, head: -2, uarmF: 95, farmF: 55, uarmB: 20, farmB: 40 } }, { f: 27, ease: "inOutQuad", p: { torso: 4, head: -4, uarmF: 95, farmF: 100, uarmB: 22, farmB: 42 } } ] },
        walkF: { length: 42, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 21, sfx: "step" } ], keys: [ { f: 0, ease: "inOutQuad", p: { torso: 6, thighF: 26, shinF: 12, footF: -12, thighB: -22, shinB: 26, footB: 16, uarmF: 14, farmF: 130, uarmB: 24, farmB: 40 } }, { f: 10, ease: "inOutQuad", p: { thighF: 6, shinF: 10, footF: 2, thighB: 22, shinB: 50, footB: 24, uarmF: 18, uarmB: 28 } }, { f: 21, ease: "inOutQuad", p: { thighF: -20, shinF: 26, footF: 16, thighB: 26, shinB: 12, footB: -12, uarmF: 16, uarmB: 40 } }, { f: 31, ease: "inOutQuad", p: { thighF: 26, shinF: 50, footF: 24, thighB: 6, shinB: 10, footB: 2, uarmF: 14, uarmB: 28 } } ] },
        walkB: { length: 46, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 23, sfx: "step" } ], keys: [ { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 18, shinF: 22, footF: 4, thighB: -22, shinB: 24, footB: 2 } }, { f: 11, ease: "inOutQuad", p: { thighF: 4, shinF: 8, footF: 2, thighB: -6, shinB: 44, footB: 26 } }, { f: 23, ease: "inOutQuad", p: { thighF: -22, shinF: 24, footF: 2, thighB: 18, shinB: 22, footB: 4 } }, { f: 34, ease: "inOutQuad", p: { thighF: -6, shinF: 44, footF: 26, thighB: 4, shinB: 8, footB: 2 } } ] },
        crouch: { length: 60, loop: true, plant: "feet", blend: 4, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 26, head: -8, uarmF: 18, farmF: 160, uarmB: 30, farmB: 76, thighF: 70, shinF: 120, footF: 50, thighB: 56, shinB: 120, footB: 64 } }, { f: 30, ease: "inOutQuad", p: { torso: 28, head: -9, thighF: 72, shinF: 122, footF: 50, thighB: 58, shinB: 122, footB: 64 } } ] },
        jumpUp: { length: 18, plant: "root", blend: 3, keys: [ { f: 6, ease: "outCubic", p: { torso: 2, thighF: 56, shinF: 90, footF: 34, thighB: 18, shinB: 56, footB: 30, uarmF: 44, farmF: 154, uarmB: 50, farmB: 70 } }, { f: 18, ease: "inOutQuad", p: { torso: 0, head: 0, thighF: 64, shinF: 100, thighB: 22, shinB: 62 } } ] },
        jumpFall: { length: 24, loop: true, plant: "root", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 30, shinF: 40, footF: 20, thighB: -6, shinB: 44, footB: 30, uarmF: 34, farmF: 144, uarmB: 40, farmB: 60 } }, { f: 12, ease: "inOutQuad", p: { thighF: 26, shinF: 34, thighB: -2, shinB: 38, uarmF: 42, uarmB: 46 } } ] },
        dashF: { length: 22, plant: "feet", blend: 2, keys: [ { f: 0, ease: "linear", p: { torso: 16, head: -6, thighF: 40, shinF: 60, footF: 24, thighB: -30, shinB: 40, footB: 10, uarmF: -16, farmF: 154, uarmB: 40, farmB: 60 } }, { f: 11, ease: "inOutQuad", p: { torso: 18, thighF: -26, shinF: 40, footF: 8, thighB: 40, shinB: 60, footB: 24, uarmF: 24, farmF: 160, uarmB: -10, farmB: 60 } }, { f: 21, ease: "inOutQuad", p: { torso: 16, thighF: 40, shinF: 60, footF: 24, thighB: -30, shinB: 40, footB: 10, uarmF: -16, uarmB: 40 } } ] },
        dashB: { length: 22, plant: "feet", blend: 2, keys: [ { f: 4, ease: "outCubic", p: { rootY: 14, rot: -4, torso: -6, thighF: 24, shinF: 50, footF: 20, thighB: 8, shinB: 40, footB: 30 } }, { f: 14, ease: "inOutQuad", p: { rootY: 8, rot: -2, torso: -3 } }, { f: 21, ease: "inQuad", p: { rootY: 0, rot: 0, torso: 6, thighF: 36, shinF: 60, footF: 26, thighB: 16, shinB: 54, footB: 36 } } ] },
        landing: { length: 6, plant: "feet", blend: 1, keys: [ { f: 0, ease: "linear", p: { torso: 22, thighF: 50, shinF: 90, footF: 36, thighB: 36, shinB: 80, footB: 46, uarmF: 14, farmF: 160, uarmB: 30, farmB: 60 } }, { f: 5, ease: "inOutQuad", p: "base" } ] },
        guardStand: { length: 30, loop: true, plant: "feet", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 6, head: 2, uarmF: 56, farmF: 118, uarmB: 40, farmB: 112, thighF: 14, shinF: 20, footF: 6, thighB: -10, shinB: 14, footB: 24 } }, { f: 15, ease: "inOutQuad", p: { torso: 5, uarmF: 54, farmF: 120 } } ] },
        guardCrouch: { length: 30, loop: true, plant: "feet", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 26, head: -8, uarmF: 56, farmF: 118, uarmB: 40, farmB: 112, thighF: 70, shinF: 120, footF: 50, thighB: 56, shinB: 120, footB: 64 } }, { f: 15, ease: "inOutQuad", p: { torso: 27, uarmF: 54, farmF: 120 } } ] },
        hurtHigh: { length: 16, plant: "feet", blend: 1, keys: [ { f: 2, ease: "outExpo", p: { torso: -14, head: -22, rootX: -8, uarmF: -10, farmF: 30, uarmB: -20, farmB: 30, thighF: 14, shinF: 22, thighB: -10, shinB: 16 } }, { f: 12, ease: "inOutQuad", p: { torso: -6, head: -12, rootX: -4 } } ] },
        hurtLow: { length: 16, plant: "feet", blend: 1, keys: [ { f: 2, ease: "outExpo", p: { torso: 28, head: 12, rootX: -5, uarmF: 10, farmF: 40, uarmB: -8, farmB: 30, thighF: 34, shinF: 56, footF: 22, thighB: 10, shinB: 30, footB: 20 } }, { f: 12, ease: "inOutQuad", p: { torso: 22, head: 8 } } ] },
        hurtAir: { length: 24, plant: "root", blend: 1, keys: [ { f: 3, ease: "outCubic", p: { rot: -25, torso: -14, head: -18, uarmF: -20, farmF: 20, uarmB: -30, farmB: 20, thighF: 30, shinF: 50, footF: 20, thighB: 10, shinB: 50, footB: 20 } }, { f: 24, ease: "inOutQuad", p: { rot: -80, torso: -6, thighF: 40, shinF: 70 } } ] },
        down: { length: 40, loop: true, plant: "root", blend: 3, keys: [ { f: 0, ease: "inOutQuad", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: 20, farmF: 10, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } }, { f: 20, ease: "inOutQuad", p: { head: -3, uarmF: 22 } } ] },
        wakeup: { length: 18, plant: "root", blend: 1, keys: [ { f: 0, ease: "linear", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: -6, farmF: 104, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } }, { f: 8, ease: "outCubic", p: { rot: -30, rootY: -30, torso: 35, head: 10, uarmF: -1, farmF: 154, uarmB: 15, farmB: 50, thighF: 60, shinF: 110, footF: 50, thighB: 40, shinB: 100, footB: 60 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        thrown: { length: 20, loop: true, plant: "root", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { rot: -20, rootY: -10, torso: -10, head: -15, uarmF: 70, farmF: 30, uarmB: 60, farmB: 40, thighF: 40, shinF: 60, footF: 20, thighB: 20, shinB: 50, footB: 20 } }, { f: 10, ease: "inOutQuad", p: { rot: -26, uarmF: 80, uarmB: 50, thighF: 34 } } ] },
        intro: { length: 60, plant: "feet", blend: 6, keys: [ { f: 20, ease: "inOutCubic", p: { torso: 12, head: 0, uarmF: 110, farmF: 50, uarmB: 60, farmB: 80 } }, { f: 34, ease: "linear", p: { torso: 12, head: 0, uarmF: 110, farmF: 50 } }, { f: 52, ease: "inOutCubic", p: "base" } ] },
        win: { length: 90, loop: true, plant: "feet", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: -4, head: -6, uarmF: 150, farmF: 25, uarmB: 20, farmB: 50, thighF: 20, shinF: 28, footF: 8, thighB: -12, shinB: 12, footB: 24 } }, { f: 45, ease: "inOutQuad", p: { uarmF: 158, torso: -6 } } ] },
        lose: { length: 40, plant: "feet", blend: 6, keys: [ { f: 20, ease: "outCubic", p: { torso: 38, head: 20, uarmF: 10, farmF: 30, uarmB: 5, farmB: 25, thighF: 50, shinF: 90, footF: 40, thighB: 30, shinB: 80, footB: 50 } } ] },
        throwHit: { length: 52, plant: "feet", blend: 1, keys: [ { f: 0, ease: "linear", p: { torso: 20, rootX: 8, uarmF: 85, farmF: 5, uarmB: 85, farmB: 5 } }, { f: 14, ease: "inOutCubic", p: { torso: -10, rootX: 0, uarmF: 170, farmF: 10, uarmB: 170, farmB: 10, thighF: 26, shinF: 36, footF: 10 } }, { f: 28, ease: "outExpo", p: { torso: 35, rootX: 10, uarmF: 40, farmF: 5, uarmB: 40, farmB: 5 } }, { f: 32, ease: "linear", p: { rootX: 12 } }, { f: 51, ease: "inOutQuad", p: "base" } ] },
        "5L": { length: 17, plant: "feet", blend: 2, keys: [ { f: 3, ease: "outQuad", p: { uarmF: 60, farmF: 100, rootX: -3 } }, { f: 5, ease: "outExpo", p: { torso: 14, uarmF: 92, farmF: 0, rootX: 8, thighF: 26, shinF: 26 } }, { f: 8, ease: "linear", p: { torso: 14, uarmF: 92, farmF: 0, rootX: 8, thighF: 26, shinF: 26 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        "2L": { length: 18, plant: "feet", blend: 2, base: "crouch", keys: [ { f: 3, ease: "outQuad", p: { uarmF: 40, farmF: 100 } }, { f: 5, ease: "outExpo", p: { torso: 30, head: -10, uarmF: 80, farmF: 0, rootX: 10 } }, { f: 8, ease: "linear", p: { torso: 30, head: -10, uarmF: 80, farmF: 0, rootX: 10 } }, { f: 18, ease: "inOutQuad", p: "base" } ] },
        "5H": { length: 37, plant: "feet", blend: 3, keys: [ { f: 7, ease: "outQuad", p: { torso: -12, head: -8, uarmF: 178, farmF: 30, uarmB: 30, rootX: -6, rootY: 4 } }, { f: 13, ease: "outExpo", p: { torso: 30, head: 6, uarmF: 70, farmF: 0, uarmB: -20, rootX: 14, thighF: 44, shinF: 40, thighB: -26 } }, { f: 17, ease: "linear", p: { torso: 30, head: 6, uarmF: 70, farmF: 0, uarmB: -20, rootX: 14, thighF: 44, shinF: 40, thighB: -26 } }, { f: 37, ease: "inOutQuad", p: "base" } ] },
        "2H": { length: 36, plant: "feet", blend: 3, base: "crouch", keys: [ { f: 6, ease: "outQuad", p: { torso: 30, uarmF: -20, farmF: 40 } }, { f: 10, ease: "outExpo", p: { torso: 44, head: -10, uarmF: 70, farmF: 0, uarmB: -30, rootX: 10, thighF: 80, shinF: 40 } }, { f: 14, ease: "linear", p: { torso: 44, head: -10, uarmF: 70, farmF: 0, uarmB: -30, rootX: 10, thighF: 80, shinF: 40 } }, { f: 36, ease: "inOutQuad", p: "base" } ] },
        jL: { length: 19, plant: "root", blend: 2, base: "jumpFall", keys: [ { f: 3, ease: "outQuad", p: { uarmF: 50, farmF: 100 } }, { f: 5, ease: "outExpo", p: { torso: 10, uarmF: 80, farmF: 0, thighF: 60, shinF: 80 } }, { f: 13, ease: "linear", p: { torso: 10, uarmF: 80, farmF: 0, thighF: 60, shinF: 80 } }, { f: 19, ease: "inOutQuad", p: "base" } ] },
        jH: { length: 28, plant: "root", blend: 3, base: "jumpFall", keys: [ { f: 6, ease: "outQuad", p: { torso: -10, uarmF: 160, uarmB: 160, thighF: 60, shinF: 100 } }, { f: 10, ease: "outExpo", p: { torso: 50, head: 10, uarmF: 40, uarmB: 40, thighF: 40, shinF: 60, thighB: 20, shinB: 60 } }, { f: 16, ease: "linear", p: { torso: 50, head: 10, uarmF: 40, uarmB: 40, thighF: 40, shinF: 60, thighB: 20, shinB: 60 } }, { f: 28, ease: "inOutQuad", p: "base" } ] },
        throw: { length: 27, plant: "feet", blend: 3, keys: [ { f: 3, ease: "outQuad", p: { uarmF: 60, farmF: 60, uarmB: 50, farmB: 60 } }, { f: 5, ease: "outExpo", p: { torso: 26, uarmF: 80, farmF: 30, uarmB: 80, farmB: 30, rootX: 10, thighF: 36, shinF: 36 } }, { f: 7, ease: "linear", p: { torso: 26, uarmF: 80, farmF: 30, uarmB: 80, farmB: 30, rootX: 10, thighF: 36, shinF: 36 } }, { f: 27, ease: "inOutQuad", p: "base" } ] },
        sp1: { length: 52, plant: "feet", blend: 3, keys: [ { f: 9, ease: "outQuad", p: { torso: -6, uarmF: 175, farmF: 80, uarmB: 20, rootX: -4 } }, { f: 16, ease: "outExpo", p: { torso: 20, head: 4, uarmF: 100, farmF: 0, uarmB: -10, rootX: 10, thighF: 36, shinF: 36 } }, { f: 26, ease: "linear", p: { torso: 10, uarmF: 150, farmF: 90, rootX: 4 } }, { f: 52, ease: "inOutQuad", p: "base" } ] },
        sp2: { length: 45, plant: "feet", blend: 3, keys: [ { f: 4, ease: "outQuad", p: { torso: 6, uarmF: 120, farmF: 60, uarmB: 120, farmB: 60 } }, { f: 8, ease: "outExpo", p: { torso: 30, head: 6, uarmF: 94, farmF: 30, uarmB: 98, farmB: 30, rootX: 12, thighF: 40, shinF: 40 } }, { f: 11, ease: "linear", p: { torso: 30, head: 6, uarmF: 94, farmF: 30, uarmB: 98, farmB: 30, rootX: 12, thighF: 40, shinF: 40 } }, { f: 45, ease: "inOutQuad", p: "base" } ] },
        sp3: { length: 47, plant: "feet", blend: 3, keys: [ { f: 8, ease: "outQuad", p: { torso: 30, uarmF: 20, farmF: 60, thighF: 50, shinF: 100, rootY: -8 } }, { f: 15, ease: "outExpo", p: { torso: 60, head: 20, uarmF: 80, farmF: 0, uarmB: 60, rootX: 14, thighF: 60, shinF: 60, thighB: -30, rootY: -10 } }, { f: 23, ease: "linear", p: { torso: 60, head: 20, uarmF: 80, farmF: 0, uarmB: 60, rootX: 14, thighF: 60, shinF: 60, thighB: -30, rootY: -10 } }, { f: 47, ease: "inOutQuad", p: "base" } ] },
        super: { length: 33, plant: "feet", blend: 3, keys: [ { f: 3, ease: "outQuad", p: { torso: 10, uarmF: 120, farmF: 50, uarmB: 120, farmB: 50 } }, { f: 6, ease: "outExpo", p: { torso: 30, uarmF: 92, farmF: 20, uarmB: 92, farmB: 20, rootX: 14, thighF: 44, shinF: 40 } }, { f: 11, ease: "linear", p: { torso: 30, uarmF: 92, farmF: 20, uarmB: 92, farmB: 20, rootX: 14, thighF: 44, shinF: 40 } }, { f: 33, ease: "inOutQuad", p: "base" } ] },
        grabHit: { length: 46, plant: "feet", blend: 1, keys: [ { f: 0, ease: "linear", p: { torso: 22, rootX: 8, uarmF: 88, farmF: 6, uarmB: 88, farmB: 6 } }, { f: 14, ease: "inOutCubic", p: { torso: -8, rootX: 0, uarmF: 160, farmF: 10, uarmB: 160, farmB: 10, thighF: 26, shinF: 36 } }, { f: 28, ease: "outExpo", p: { torso: 34, rootX: 10, uarmF: 40, farmF: 6, uarmB: 40, farmB: 6 } }, { f: 32, ease: "linear", p: { rootX: 12 } }, { f: 45, ease: "inOutQuad", p: "base" } ] },
        superGrab: { length: 54, plant: "feet", blend: 1, keys: [ { f: 0, ease: "linear", p: { torso: 22, rootX: 8, uarmF: 88, farmF: 6, uarmB: 88, farmB: 6 } }, { f: 16, ease: "inOutCubic", p: { torso: -8, rootX: 0, uarmF: 160, farmF: 10, uarmB: 160, farmB: 10, thighF: 26, shinF: 36 } }, { f: 32, ease: "outExpo", p: { torso: 34, rootX: 10, uarmF: 40, farmF: 6, uarmB: 40, farmB: 6 } }, { f: 36, ease: "linear", p: { rootX: 12 } }, { f: 53, ease: "inOutQuad", p: "base" } ] }
      },
      moves: {
        "5L": { kind: "normal", name: "立ち弱（猫パンチ）", stance: "stand", startup: 5, active: 3, recovery: 9, boxes: [ { f0: 6, f1: 8, x: 30, y: 66, w: 58, h: 32 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 1, damage: 32, hitstun: 19, blockstun: 11, hitstop: 7, knock: { hit: 8, block: 10 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "5L", "2L", "5H", "2H", "sp1", "sp2", "super" ], frames: 14 }, trail: { from: "handF", color: "glow", width: 10, frames: 5 }, sfx: "swingL" },
        "2L": { kind: "normal", otg: true, name: "しゃがみ弱", stance: "crouch", startup: 5, active: 3, recovery: 10, boxes: [ { f0: 6, f1: 8, x: 30, y: 12, w: 59, h: 24 } ], hit: { chip: 0, level: "low", effect: "stun", impact: 1, damage: 26, hitstun: 20, blockstun: 12, hitstop: 6, knock: { hit: 8, block: 10 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "5L", "2L", "5H", "2H", "sp1", "sp2", "super" ], frames: 14 }, sfx: "swingL" },
        "5H": { kind: "normal", name: "立ち強（招き張り手）", stance: "stand", startup: 13, active: 4, recovery: 20, boxes: [ { f0: 14, f1: 17, x: 34, y: 30, w: 52, h: 84 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 3, damage: 88, hitstun: 24, blockstun: 16, hitstop: 11, knock: { hit: 16, block: 20 }, gauge: { hit: 45, block: 22 } }, cancel: { into: [ "sp1", "sp2", "sp3", "super" ], frames: 16 }, trail: { from: "handF", color: "glow", width: 16, frames: 8 }, sfx: "swingH" },
        "2H": { kind: "normal", name: "しゃがみ強", stance: "crouch", startup: 10, active: 4, recovery: 22, boxes: [ { f0: 11, f1: 14, x: 26, y: 0, w: 61, h: 26 } ], hit: { chip: 0, level: "low", effect: "launch", impact: 3, damage: 62, hitstun: 0, blockstun: 12, hitstop: 10, knock: { hit: 0, block: 18 }, launch: { vx: 1.5, vy: 9.5 }, juggle: 3, gauge: { hit: 40, block: 20 } }, cancel: { into: [ "sp3", "super", "jump" ], frames: 14 }, sfx: "swingH" },
        jL: { kind: "normal", name: "ジャンプ弱", stance: "air", startup: 5, active: 8, recovery: 6, landLag: 3, boxes: [ { f0: 6, f1: 13, x: 16, y: 30, w: 60, h: 50 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 1, damage: 32, hitstun: 17, blockstun: 12, hitstop: 7, knock: { hit: 6, block: 8 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "jH" ], frames: 12 }, sfx: "swingL" },
        jH: { kind: "normal", name: "ジャンプ強（おなかプレス）", stance: "air", startup: 10, active: 6, recovery: 12, landLag: 5, boxes: [ { f0: 11, f1: 16, x: -14, y: -20, w: 96, h: 70 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 3, damage: 82, hitstun: 24, blockstun: 17, hitstop: 11, knock: { hit: 10, block: 14 }, gauge: { hit: 45, block: 22 } }, sfx: "swingH" },
        throw: { kind: "throw", name: "投げ", stance: "stand", startup: 5, active: 2, recovery: 20, boxes: [], hit: null, throw: { box: { x: 10, y: 20, w: 70, h: 110 }, techable: true, damage: 140, grabFrames: 30, afterRecovery: 22, attackerClip: "throwHit", hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 12, ease: "inOutCubic", x: 24, y: 170, rot: -100 }, { f: 26, ease: "outExpo", x: 70, y: 30, rot: -150 }, { f: 30, ease: "linear", x: 76, y: 20, rot: -160 } ], launch: { vx: 3, vy: 7 }, hitstop: 12, impact: 3, gauge: { hit: 40 } }, sfx: "grab" },
        sp1: { kind: "special", name: "手招き", stance: "stand", startup: 16, active: 6, recovery: 30, boxes: [ { f0: 17, f1: 22, x: 40, y: 30, w: 170, h: 90 } ], hit: { chip: 2, level: "mid", effect: "stun", impact: 2, damage: 30, hitstun: 30, blockstun: 10, hitstop: 8, knock: { hit: -180, block: 6 }, gauge: { hit: 40, block: 15 } }, cancel: { into: [ "5L", "5H", "sp3", "super" ], frames: 22 }, trail: { from: "handF", color: "accent", width: 18, frames: 10 }, sfx: "beckon" },
        sp2: { kind: "special", name: "招き落とし", stance: "stand", startup: 8, active: 3, recovery: 34, boxes: [], hit: null, throw: { box: { x: 8, y: 20, w: 76, h: 110 }, techable: false, damage: 150, grabFrames: 30, afterRecovery: 16, attackerClip: "grabHit", hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 14, ease: "inOutCubic", x: 24, y: 170, rot: -100 }, { f: 28, ease: "outExpo", x: 70, y: 30, rot: -150 }, { f: 30, ease: "linear", x: 76, y: 20, rot: -160 } ], launch: { vx: 3, vy: 7 }, hitstop: 12, impact: 4, gauge: { hit: 40 } }, sfx: "grab" },
        sp3: { kind: "special", name: "小判タックル", stance: "stand", startup: 15, active: 8, recovery: 24, boxes: [ { f0: 16, f1: 23, x: 26, y: 20, w: 72, h: 90 } ], hit: { chip: 7, level: "mid", effect: "launch", impact: 4, damage: 76, hitstun: 0, blockstun: 16, hitstop: 12, knock: { hit: 0, block: 24 }, launch: { vx: 3.5, vy: 6 }, juggle: 0, gauge: { hit: 50, block: 25 } }, motion: [ { f0: 4, f1: 25, vx: 7 } ], invuln: [ { f0: 1, f1: 23, type: "proj" } ], trail: { from: "handF", color: "accent", width: 14, frames: 10 }, sfx: "swingH" },
        super: { kind: "super", name: "大祓「千客万来」", stance: "stand", startup: 6, active: 5, recovery: 22, cost: 1000, flash: 40, boxes: [], hit: null, throw: { box: { x: 6, y: 0, w: 120, h: 150 }, techable: false, combo: true, comboScale: 0.75, damage: 280, grabFrames: 44, afterRecovery: 10, attackerClip: "superGrab", hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 14, ease: "inOutCubic", x: 20, y: 200, rot: -120 }, { f: 26, ease: "inOutCubic", x: -30, y: 160, rot: -240 }, { f: 40, ease: "outExpo", x: 70, y: 20, rot: -360 }, { f: 44, ease: "linear", x: 78, y: 10, rot: -370 } ], launch: { vx: 4, vy: 8 }, hitstop: 18, impact: 4, gauge: { hit: 0 } }, invuln: [ { f0: 1, f1: 6, type: "all" } ], sfx: "super" }
      },
      projectiles: {
      },
      quotes: { select: "いらっしゃいませ。", intro: [ "招き猫Bot、営業開始です。" ], win: [ "毎度ありがとうございました。", "またのお越しを。" ], lose: [ "本日は…閉店…です…" ] }
    },
    /* ---- 追加キャラ2（newchars2.js で生成） ---- */
    chochin: {
      id: "chochin",
      name: "提灯お化け",
      nameEn: "CHOCHIN-OBAKE",
      title: "ため撃ち型",
      blurb: "ふわふわ浮かぶ一つ目の提灯。必殺ボタン長押しで鬼火をため、強く撃ち出す。",
      ratings: { power: 3, speed: 2, range: 5, defense: 3 },
      stats: { dmgMul: 1.15, hp: 1150, walkF: 3.5, walkB: 2.9, jumpVy: 15.2, jumpVx: 3.2, gravity: 0.74, airJumps: 0, prejump: 4, landLag: 3, dashF: { frames: 22, speed: 8 }, dashB: { frames: 22, speed: 5.5, invuln: 6 }, gaugeMul: 1 },
      boxes: { push: { stand: { w: 72, h: 116 }, crouch: { w: 80, h: 88 }, air: { w: 64, h: 116 } }, hurt: { stand: [ { x: -26, y: 104, w: 56, h: 36 }, { x: -36, y: 46, w: 74, h: 60 }, { x: -18, y: 0, w: 36, h: 48 } ], crouch: [ { x: -4, y: 70, w: 58, h: 42 }, { x: -32, y: 0, w: 70, h: 72 } ], air: [ { x: -36, y: 20, w: 74, h: 92 }, { x: -26, y: 104, w: 56, h: 36 } ] } },
      look: { palette: { skin: "#d9344f", hair: "#2a1a3a", primary: "#ffa13c", secondary: "#2a1a3a", accent: "#ffe94d", glow: "#ff3b5c", outline: "#0a0620", eye: "#ffe94d" }, paletteP2: { skin: "#8f1f3a", hair: "#101018", primary: "#ffe94d", secondary: "#2a1a3a", accent: "#ffa13c", glow: "#ffa13c", outline: "#0a0620", eye: "#ff3b5c" }, body: { torsoLen: 46, torsoWTop: 42, torsoWBottom: 34, neckLen: 8, headR: 16, shoulderDrop: 6, uArmLen: 36, fArmLen: 36, handR: 8, thighLen: 26, shinLen: 24, footLen: 24, footH: 10, limbW: { uArm: [ 15, 12 ], fArm: [ 13, 10 ], thigh: [ 20, 16 ], shin: [ 16, 12 ] } }, colors: { head: "skin", neck: "skin", torso: "glow", uArm: "primary", fArm: "primary", hand: "skin", thigh: "glow", shin: "glow", foot: "accent" }, prop: { kind: "kanabo", len: 62, thick: 10, angle: 0, color: "accent" }, neon: { tubeW: 4, glowW: 10, glowAlpha: 0.26, coreW: 1.2, fill: 0.92 }, decor: [], chains: [] },
      feel: { breath: { amp: 0.01, period: 90 }, jump: { sx: 0.96, sy: 1.05, frames: 4 }, land: { sx: 1.1, sy: 0.84, frames: 7 }, dash: { sx: 1.04, sy: 0.97, frames: 6 }, hitShake: { amp: [ 1, 2, 3, 3.5 ] }, recoil: { x: [ 2, 4, 6, 8 ], rot: [ 1, 3, 5, 7 ], frames: 4 }, squashHit: { sx: 1.04, sy: 0.95, frames: 3 } },
      basePose: { rootX: 0, rootY: 0, rot: 0, torso: 4, head: -2, uarmF: 10, farmF: 130, uarmB: 22, farmB: 40, thighF: 14, shinF: 20, footF: 6, thighB: -10, shinB: 14, footB: 24 },
      clips: {
        idle: { length: 60, loop: true, plant: "feet", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 4, head: -2, uarmF: 30, farmF: 60, uarmB: 30, farmB: 50, rootY: 0 } }, { f: 30, ease: "inOutQuad", p: { torso: 6, head: -4, uarmF: 36, farmF: 70, uarmB: 34, farmB: 58, rootY: 6 } } ] },
        walkF: { length: 42, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 21, sfx: "step" } ], keys: [ { f: 0, ease: "inOutQuad", p: { torso: 6, thighF: 26, shinF: 12, footF: -12, thighB: -22, shinB: 26, footB: 16, uarmF: 14, farmF: 130, uarmB: 24, farmB: 40 } }, { f: 10, ease: "inOutQuad", p: { thighF: 6, shinF: 10, footF: 2, thighB: 22, shinB: 50, footB: 24, uarmF: 18, uarmB: 28 } }, { f: 21, ease: "inOutQuad", p: { thighF: -20, shinF: 26, footF: 16, thighB: 26, shinB: 12, footB: -12, uarmF: 16, uarmB: 40 } }, { f: 31, ease: "inOutQuad", p: { thighF: 26, shinF: 50, footF: 24, thighB: 6, shinB: 10, footB: 2, uarmF: 14, uarmB: 28 } } ] },
        walkB: { length: 46, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 23, sfx: "step" } ], keys: [ { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 18, shinF: 22, footF: 4, thighB: -22, shinB: 24, footB: 2 } }, { f: 11, ease: "inOutQuad", p: { thighF: 4, shinF: 8, footF: 2, thighB: -6, shinB: 44, footB: 26 } }, { f: 23, ease: "inOutQuad", p: { thighF: -22, shinF: 24, footF: 2, thighB: 18, shinB: 22, footB: 4 } }, { f: 34, ease: "inOutQuad", p: { thighF: -6, shinF: 44, footF: 26, thighB: 4, shinB: 8, footB: 2 } } ] },
        crouch: { length: 60, loop: true, plant: "feet", blend: 4, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 26, head: -8, uarmF: 18, farmF: 160, uarmB: 30, farmB: 76, thighF: 70, shinF: 120, footF: 50, thighB: 56, shinB: 120, footB: 64 } }, { f: 30, ease: "inOutQuad", p: { torso: 28, head: -9, thighF: 72, shinF: 122, footF: 50, thighB: 58, shinB: 122, footB: 64 } } ] },
        jumpUp: { length: 18, plant: "root", blend: 3, keys: [ { f: 6, ease: "outCubic", p: { torso: 2, thighF: 56, shinF: 90, footF: 34, thighB: 18, shinB: 56, footB: 30, uarmF: 44, farmF: 154, uarmB: 50, farmB: 70 } }, { f: 18, ease: "inOutQuad", p: { torso: 0, head: 0, thighF: 64, shinF: 100, thighB: 22, shinB: 62 } } ] },
        jumpFall: { length: 24, loop: true, plant: "root", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 30, shinF: 40, footF: 20, thighB: -6, shinB: 44, footB: 30, uarmF: 34, farmF: 144, uarmB: 40, farmB: 60 } }, { f: 12, ease: "inOutQuad", p: { thighF: 26, shinF: 34, thighB: -2, shinB: 38, uarmF: 42, uarmB: 46 } } ] },
        dashF: { length: 22, plant: "feet", blend: 2, keys: [ { f: 0, ease: "linear", p: { torso: 16, head: -6, thighF: 40, shinF: 60, footF: 24, thighB: -30, shinB: 40, footB: 10, uarmF: -16, farmF: 154, uarmB: 40, farmB: 60 } }, { f: 11, ease: "inOutQuad", p: { torso: 18, thighF: -26, shinF: 40, footF: 8, thighB: 40, shinB: 60, footB: 24, uarmF: 24, farmF: 160, uarmB: -10, farmB: 60 } }, { f: 21, ease: "inOutQuad", p: { torso: 16, thighF: 40, shinF: 60, footF: 24, thighB: -30, shinB: 40, footB: 10, uarmF: -16, uarmB: 40 } } ] },
        dashB: { length: 22, plant: "feet", blend: 2, keys: [ { f: 4, ease: "outCubic", p: { rootY: 14, rot: -4, torso: -6, thighF: 24, shinF: 50, footF: 20, thighB: 8, shinB: 40, footB: 30 } }, { f: 14, ease: "inOutQuad", p: { rootY: 8, rot: -2, torso: -3 } }, { f: 21, ease: "inQuad", p: { rootY: 0, rot: 0, torso: 6, thighF: 36, shinF: 60, footF: 26, thighB: 16, shinB: 54, footB: 36 } } ] },
        landing: { length: 6, plant: "feet", blend: 1, keys: [ { f: 0, ease: "linear", p: { torso: 22, thighF: 50, shinF: 90, footF: 36, thighB: 36, shinB: 80, footB: 46, uarmF: 14, farmF: 160, uarmB: 30, farmB: 60 } }, { f: 5, ease: "inOutQuad", p: "base" } ] },
        guardStand: { length: 30, loop: true, plant: "feet", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 6, head: 2, uarmF: 56, farmF: 118, uarmB: 40, farmB: 112, thighF: 14, shinF: 20, footF: 6, thighB: -10, shinB: 14, footB: 24 } }, { f: 15, ease: "inOutQuad", p: { torso: 5, uarmF: 54, farmF: 120 } } ] },
        guardCrouch: { length: 30, loop: true, plant: "feet", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 26, head: -8, uarmF: 56, farmF: 118, uarmB: 40, farmB: 112, thighF: 70, shinF: 120, footF: 50, thighB: 56, shinB: 120, footB: 64 } }, { f: 15, ease: "inOutQuad", p: { torso: 27, uarmF: 54, farmF: 120 } } ] },
        hurtHigh: { length: 16, plant: "feet", blend: 1, keys: [ { f: 2, ease: "outExpo", p: { torso: -14, head: -22, rootX: -8, uarmF: -10, farmF: 30, uarmB: -20, farmB: 30, thighF: 14, shinF: 22, thighB: -10, shinB: 16 } }, { f: 12, ease: "inOutQuad", p: { torso: -6, head: -12, rootX: -4 } } ] },
        hurtLow: { length: 16, plant: "feet", blend: 1, keys: [ { f: 2, ease: "outExpo", p: { torso: 28, head: 12, rootX: -5, uarmF: 10, farmF: 40, uarmB: -8, farmB: 30, thighF: 34, shinF: 56, footF: 22, thighB: 10, shinB: 30, footB: 20 } }, { f: 12, ease: "inOutQuad", p: { torso: 22, head: 8 } } ] },
        hurtAir: { length: 24, plant: "root", blend: 1, keys: [ { f: 3, ease: "outCubic", p: { rot: -25, torso: -14, head: -18, uarmF: -20, farmF: 20, uarmB: -30, farmB: 20, thighF: 30, shinF: 50, footF: 20, thighB: 10, shinB: 50, footB: 20 } }, { f: 24, ease: "inOutQuad", p: { rot: -80, torso: -6, thighF: 40, shinF: 70 } } ] },
        down: { length: 40, loop: true, plant: "root", blend: 3, keys: [ { f: 0, ease: "inOutQuad", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: 20, farmF: 10, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } }, { f: 20, ease: "inOutQuad", p: { head: -3, uarmF: 22 } } ] },
        wakeup: { length: 18, plant: "root", blend: 1, keys: [ { f: 0, ease: "linear", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: -6, farmF: 104, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } }, { f: 8, ease: "outCubic", p: { rot: -30, rootY: -30, torso: 35, head: 10, uarmF: -1, farmF: 154, uarmB: 15, farmB: 50, thighF: 60, shinF: 110, footF: 50, thighB: 40, shinB: 100, footB: 60 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        thrown: { length: 20, loop: true, plant: "root", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { rot: -20, rootY: -10, torso: -10, head: -15, uarmF: 70, farmF: 30, uarmB: 60, farmB: 40, thighF: 40, shinF: 60, footF: 20, thighB: 20, shinB: 50, footB: 20 } }, { f: 10, ease: "inOutQuad", p: { rot: -26, uarmF: 80, uarmB: 50, thighF: 34 } } ] },
        intro: { length: 60, plant: "feet", blend: 6, keys: [ { f: 20, ease: "inOutCubic", p: { torso: 12, head: 0, uarmF: 110, farmF: 50, uarmB: 60, farmB: 80 } }, { f: 34, ease: "linear", p: { torso: 12, head: 0, uarmF: 110, farmF: 50 } }, { f: 52, ease: "inOutCubic", p: "base" } ] },
        win: { length: 90, loop: true, plant: "feet", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: -4, head: -6, uarmF: 150, farmF: 25, uarmB: 20, farmB: 50, thighF: 20, shinF: 28, footF: 8, thighB: -12, shinB: 12, footB: 24 } }, { f: 45, ease: "inOutQuad", p: { uarmF: 158, torso: -6 } } ] },
        lose: { length: 40, plant: "feet", blend: 6, keys: [ { f: 20, ease: "outCubic", p: { torso: 38, head: 20, uarmF: 10, farmF: 30, uarmB: 5, farmB: 25, thighF: 50, shinF: 90, footF: 40, thighB: 30, shinB: 80, footB: 50 } } ] },
        throwHit: { length: 52, plant: "feet", blend: 1, keys: [ { f: 0, ease: "linear", p: { torso: 20, rootX: 8, uarmF: 85, farmF: 5, uarmB: 85, farmB: 5 } }, { f: 14, ease: "inOutCubic", p: { torso: -10, rootX: 0, uarmF: 170, farmF: 10, uarmB: 170, farmB: 10, thighF: 26, shinF: 36, footF: 10 } }, { f: 28, ease: "outExpo", p: { torso: 35, rootX: 10, uarmF: 40, farmF: 5, uarmB: 40, farmB: 5 } }, { f: 32, ease: "linear", p: { rootX: 12 } }, { f: 51, ease: "inOutQuad", p: "base" } ] },
        "5L": { length: 17, plant: "feet", blend: 2, keys: [ { f: 3, ease: "outQuad", p: { uarmF: 40, farmF: 60, head: -10 } }, { f: 5, ease: "outExpo", p: { torso: 10, head: 6, uarmF: 92, farmF: 0, rootX: 8 } }, { f: 8, ease: "linear", p: { torso: 10, head: 6, uarmF: 92, farmF: 0, rootX: 8 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        "2L": { length: 17, plant: "feet", blend: 2, base: "crouch", keys: [ { f: 3, ease: "outQuad", p: { uarmF: 120, farmF: 40 } }, { f: 5, ease: "outExpo", p: { torso: 24, head: -6, uarmF: 150, farmF: 10, rootX: 6 } }, { f: 8, ease: "linear", p: { torso: 24, head: -6, uarmF: 150, farmF: 10, rootX: 6 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        "5H": { length: 32, plant: "feet", blend: 3, keys: [ { f: 6, ease: "outQuad", p: { torso: -18, head: -10, rootX: -8, rootY: 6 } }, { f: 10, ease: "outExpo", p: { torso: 30, head: 10, rootX: 18, uarmF: 70, uarmB: 60 } }, { f: 14, ease: "linear", p: { torso: 30, head: 10, rootX: 18, uarmF: 70, uarmB: 60 } }, { f: 32, ease: "inOutQuad", p: "base" } ] },
        "2H": { length: 34, plant: "feet", blend: 3, base: "crouch", keys: [ { f: 5, ease: "outQuad", p: { torso: 20, uarmF: 120, farmF: 60 } }, { f: 9, ease: "outExpo", p: { torso: 40, head: -10, uarmF: 165, farmF: 0, rootX: 8 } }, { f: 13, ease: "linear", p: { torso: 40, head: -10, uarmF: 165, farmF: 0, rootX: 8 } }, { f: 34, ease: "inOutQuad", p: "base" } ] },
        jL: { length: 19, plant: "root", blend: 2, base: "jumpFall", keys: [ { f: 3, ease: "outQuad", p: { uarmF: 50, farmF: 80 } }, { f: 5, ease: "outExpo", p: { torso: 10, uarmF: 100, farmF: 0 } }, { f: 14, ease: "linear", p: { torso: 10, uarmF: 100, farmF: 0 } }, { f: 19, ease: "inOutQuad", p: "base" } ] },
        jH: { length: 25, plant: "root", blend: 3, base: "jumpFall", keys: [ { f: 5, ease: "outQuad", p: { torso: -20, head: -10 } }, { f: 9, ease: "outExpo", p: { torso: 50, head: 20, uarmF: 40, uarmB: 40 } }, { f: 15, ease: "linear", p: { torso: 50, head: 20, uarmF: 40, uarmB: 40 } }, { f: 25, ease: "inOutQuad", p: "base" } ] },
        throw: { length: 27, plant: "feet", blend: 3, keys: [ { f: 3, ease: "outQuad", p: { uarmF: 60, farmF: 60, uarmB: 50, farmB: 60 } }, { f: 5, ease: "outExpo", p: { torso: 20, uarmF: 80, farmF: 30, uarmB: 80, farmB: 30, rootX: 10 } }, { f: 7, ease: "linear", p: { torso: 20, uarmF: 80, farmF: 30, uarmB: 80, farmB: 30, rootX: 10 } }, { f: 27, ease: "inOutQuad", p: "base" } ] },
        sp1: { length: 27, plant: "feet", blend: 3, keys: [ { f: 6, ease: "outQuad", p: { torso: -10, head: -6, uarmF: 40, farmF: 90, uarmB: 40, farmB: 90, rootY: 4 } }, { f: 10, ease: "outExpo", p: { torso: 14, head: 4, uarmF: 92, farmF: 0, uarmB: 86, farmB: 0, rootX: 8 } }, { f: 19, ease: "linear", p: { torso: 14, head: 4, uarmF: 92, farmF: 0, uarmB: 86, farmB: 0, rootX: 8 } }, { f: 27, ease: "inOutQuad", p: "base" } ] },
        sp2: { length: 41, plant: "feet", blend: 3, keys: [ { f: 3, ease: "outQuad", p: { torso: 20, rootY: -8 } }, { f: 6, ease: "outExpo", p: { torso: -14, head: -16, uarmF: 170, farmF: 0, uarmB: 150, farmB: 10 } }, { f: 17, ease: "linear", p: { torso: -14, head: -16, uarmF: 170, farmF: 0, uarmB: 150, farmB: 10 } }, { f: 41, ease: "inOutQuad", p: "base" } ] },
        sp3: { length: 39, plant: "feet", blend: 3, keys: [ { f: 6, ease: "outQuad", p: { torso: 40, head: 20, rootY: -10 } }, { f: 11, ease: "outExpo", p: { torso: 80, head: 30, rootX: 12, rootY: -16 } }, { f: 29, ease: "linear", p: { torso: 80, head: 30, rootX: 12, rootY: -16 } }, { f: 39, ease: "inOutQuad", p: "base" } ] },
        super: { length: 59, plant: "feet", blend: 3, keys: [ { f: 6, ease: "outQuad", p: { torso: -16, head: -12, uarmF: 170, farmF: 10, uarmB: 170, farmB: 10, rootY: 6 } }, { f: 10, ease: "outExpo", p: { torso: 24, head: 6, uarmF: 96, farmF: 0, uarmB: 90, farmB: 0, rootX: 12 } }, { f: 35, ease: "linear", p: { torso: 24, head: 6, uarmF: 96, farmF: 0, uarmB: 90, farmB: 0, rootX: 12 } }, { f: 59, ease: "inOutQuad", p: "base" } ] }
      },
      moves: {
        "5L": { kind: "normal", name: "立ち弱（舌ぺろり）", stance: "stand", startup: 5, active: 3, recovery: 9, boxes: [ { f0: 6, f1: 8, x: 30, y: 96, w: 77, h: 26 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 1, damage: 28, hitstun: 19, blockstun: 11, hitstop: 6, knock: { hit: 8, block: 10 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "5L", "2L", "5H", "2H", "sp1", "sp2", "super" ], frames: 14 }, sfx: "swingL" },
        "2L": { kind: "normal", otg: true, name: "しゃがみ弱（足元の火）", stance: "crouch", startup: 5, active: 3, recovery: 9, boxes: [ { f0: 6, f1: 8, x: 26, y: 10, w: 71, h: 24 } ], hit: { chip: 0, level: "low", effect: "stun", impact: 1, damage: 24, hitstun: 20, blockstun: 12, hitstop: 6, knock: { hit: 8, block: 10 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "5L", "2L", "5H", "2H", "sp1", "sp2", "super" ], frames: 14 }, sfx: "swingL" },
        "5H": { kind: "normal", name: "立ち強（提灯体当たり）", stance: "stand", startup: 10, active: 4, recovery: 18, boxes: [ { f0: 11, f1: 14, x: 24, y: 40, w: 74, h: 90 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 3, damage: 80, hitstun: 23, blockstun: 15, hitstop: 10, knock: { hit: 16, block: 20 }, gauge: { hit: 45, block: 22 } }, cancel: { into: [ "sp1", "sp2", "super" ], frames: 16 }, sfx: "swingH" },
        "2H": { kind: "normal", name: "しゃがみ強（火払い）", stance: "crouch", startup: 9, active: 4, recovery: 21, boxes: [ { f0: 10, f1: 13, x: 24, y: 0, w: 86, h: 26 } ], hit: { chip: 0, level: "low", effect: "launch", impact: 3, damage: 56, hitstun: 0, blockstun: 12, hitstop: 10, knock: { hit: 0, block: 18 }, launch: { vx: 1.5, vy: 9.5 }, juggle: 3, gauge: { hit: 40, block: 20 } }, cancel: { into: [ "sp2", "super", "jump" ], frames: 14 }, sfx: "swingH" },
        jL: { kind: "normal", name: "ジャンプ弱", stance: "air", startup: 5, active: 9, recovery: 5, landLag: 3, boxes: [ { f0: 6, f1: 14, x: 20, y: 40, w: 76, h: 46 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 1, damage: 26, hitstun: 16, blockstun: 12, hitstop: 6, knock: { hit: 6, block: 8 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "jH" ], frames: 12 }, sfx: "swingL" },
        jH: { kind: "normal", name: "ジャンプ強（提灯落とし）", stance: "air", startup: 9, active: 6, recovery: 10, landLag: 4, boxes: [ { f0: 10, f1: 15, x: -10, y: -16, w: 92, h: 76 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 3, damage: 62, hitstun: 22, blockstun: 16, hitstop: 10, knock: { hit: 10, block: 14 }, gauge: { hit: 45, block: 22 } }, sfx: "swingH" },
        throw: { kind: "throw", name: "投げ", stance: "stand", startup: 5, active: 2, recovery: 20, boxes: [], hit: null, throw: { box: { x: 10, y: 20, w: 64, h: 100 }, techable: true, damage: 115, grabFrames: 30, afterRecovery: 22, attackerClip: "throwHit", hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 12, ease: "inOutCubic", x: 24, y: 170, rot: -100 }, { f: 26, ease: "outExpo", x: 70, y: 30, rot: -150 }, { f: 30, ease: "linear", x: 76, y: 20, rot: -160 } ], launch: { vx: 3, vy: 7 }, hitstop: 12, impact: 3, gauge: { hit: 40 } }, sfx: "grab" },
        sp1: { kind: "special", name: "鬼火（ため撃ち）", stance: "stand", startup: 10, active: 1, recovery: 16, boxes: [], hit: null, charge: { at: 10, max: 28 }, spawn: [ { at: 11, projectile: "onibi", x: 56, y: 64 } ], sfx: "cast" },
        sp2: { kind: "special", name: "昇り提灯", stance: "stand", startup: 6, active: 7, recovery: 28, landLag: 6, boxes: [ { f0: 7, f1: 13, x: 6, y: 30, w: 50, h: 140 } ], hit: { chip: 6, level: "mid", effect: "launch", impact: 3, damage: 72, hitstun: 0, blockstun: 22, hitstop: 10, knock: { hit: 0, block: 14 }, launch: { vx: 2.5, vy: 10 }, juggle: 0, gauge: { hit: 60, block: 30 } }, motion: [ { f0: 7, f1: 7, vx: 2, vy: 10.5 } ], invuln: [ { f0: 1, f1: 9, type: "strike" } ], sfx: "rise" },
        sp3: { kind: "special", name: "ころがり提灯", stance: "stand", startup: 11, active: 10, recovery: 18, boxes: [ { f0: 12, f1: 21, x: 20, y: 10, w: 79, h: 70 } ], hit: { chip: 6, level: "mid", effect: "launch", impact: 3, damage: 68, hitstun: 0, blockstun: 16, hitstop: 11, knock: { hit: 0, block: 22 }, launch: { vx: 3.5, vy: 6 }, juggle: 0, gauge: { hit: 50, block: 25 } }, motion: [ { f0: 3, f1: 21, vx: 7.5 } ], invuln: [ { f0: 1, f1: 21, type: "proj" } ], sfx: "swingH" },
        super: { kind: "super", name: "大祓「百鬼夜行」", stance: "stand", startup: 10, active: 1, recovery: 48, cost: 1000, flash: 40, boxes: [], hit: null, invuln: [ { f0: 1, f1: 12, type: "all" } ], spawn: [ { at: 11, projectile: "hyakki", x: 70, y: 90 } ], sfx: "super" }
      },
      projectiles: {
        onibi: { life: 110, vx: 6, vy: 0, box: { x: -16, y: -16, w: 32, h: 32 }, hits: 1, maxActive: 1, priority: 1, hit: { chip: 5, level: "mid", effect: "stun", impact: 2, damage: 48, hitstun: 18, blockstun: 14, hitstop: 8, knock: { hit: 10, block: 12 }, gauge: { hit: 30, block: 15 } }, chargeScale: { vx: [ 6, 9.5 ], size: [ 0.85, 1.9 ], dmg: [ 0.9, 1.9 ], beat: { k: 0.35, priority: 2 }, full: { hitstun: 0, effect: "launch", launch: { vx: 3, vy: 7 }, juggle: 0, impact: 3, blockstun: 20 } }, look: { style: "flame", color: "glow", size: 1 } },
        hyakki: { life: 110, vx: 4.5, vy: 0, box: { x: -46, y: -50, w: 92, h: 100 }, hits: 6, hitEvery: 7, maxActive: 1, priority: 3, hit: { chip: 8, level: "mid", effect: "launch", impact: 3, damage: 42, hitstun: 0, blockstun: 12, hitstop: 5, knock: { hit: 0, block: 4 }, launch: { vx: 0.6, vy: 6.5 }, juggle: 8, gauge: { hit: 0, block: 0 } }, look: { style: "flame", color: "accent", size: 2.6 } }
      },
      quotes: { select: "ぼうっ。", intro: [ "提灯お化け、灯ります！" ], win: [ "燃え尽きたかい？", "ためて、ためて…どーん。" ], lose: [ "火が…消える…" ] }
    },
    kappa: {
      id: "kappa",
      name: "河童ウイルス",
      nameEn: "KAPPA VIRUS",
      title: "罠・毒型",
      blurb: "皿の水で床に罠を置く。踏んだ相手は転んで、ウイルスで体力が減り続ける。",
      ratings: { power: 3, speed: 3, range: 3, defense: 3 },
      stats: { dmgMul: 1.18, hp: 1000, walkF: 3, walkB: 2.8, jumpVy: 15, jumpVx: 3.6, gravity: 0.7, airJumps: 0, prejump: 4, landLag: 3, dashF: { frames: 14, speed: 10.2 }, dashB: { frames: 16, speed: 7.2, invuln: 6 }, gaugeMul: 1 },
      boxes: { push: { stand: { w: 46, h: 100 }, crouch: { w: 50, h: 70 }, air: { w: 40, h: 100 } }, hurt: { stand: [ { x: 8, y: 115, w: 32, h: 32 }, { x: -32, y: 56, w: 60, h: 62 }, { x: -22, y: 0, w: 44, h: 60 } ], crouch: [ { x: 10, y: 80, w: 32, h: 32 }, { x: -26, y: 0, w: 62, h: 82 } ], air: [ { x: -28, y: 20, w: 58, h: 110 }, { x: -7, y: 117, w: 32, h: 32 } ] } },
      look: { palette: { skin: "#fff0e0", hair: "#ffa13c", primary: "#f4f7ff", secondary: "#a56bff", accent: "#ffe94d", glow: "#ff4fa3", outline: "#0a0620", eye: "#ffe94d" }, paletteP2: { skin: "#fff0e0", hair: "#ffe94d", primary: "#f4f7ff", secondary: "#19f3ff", accent: "#ffa13c", glow: "#a56bff", outline: "#0a0620", eye: "#19f3ff" }, body: { torsoLen: 40, torsoWTop: 26, torsoWBottom: 20, neckLen: 8, headR: 15, shoulderDrop: 5, uArmLen: 32, fArmLen: 31, handR: 5, thighLen: 36, shinLen: 36, footLen: 20, footH: 7, limbW: { uArm: [ 9, 7 ], fArm: [ 7, 6 ], thigh: [ 13, 10 ], shin: [ 10, 7 ] } }, colors: { head: "skin", neck: "skin", torso: "glow", uArm: "glow", fArm: "glow", hand: "skin", thigh: "secondary", shin: "secondary", foot: "accent" }, prop: { kind: "none", len: 0, thick: 0, angle: 0, color: "accent" }, neon: { tubeW: 2.8, glowW: 8, glowAlpha: 0.24, coreW: 1, fill: 0.88 }, decor: [], chains: [] },
      feel: { breath: { amp: 0.012, period: 54 }, jump: { sx: 0.92, sy: 1.12, frames: 4 }, land: { sx: 1.12, sy: 0.9, frames: 5 }, dash: { sx: 1.08, sy: 0.96, frames: 4 }, hitShake: { amp: [ 1, 2, 3, 3.5 ] }, recoil: { x: [ 4, 8, 12, 16 ], rot: [ 3, 6, 9, 12 ], frames: 4 }, squashHit: { sx: 1.06, sy: 0.94, frames: 3 } },
      basePose: { rootX: 0, rootY: 0, rot: 0, torso: 18, head: 10, uarmF: 34, farmF: 50, uarmB: 20, farmB: 50, thighF: 26, shinF: 34, footF: 8, thighB: -12, shinB: 22, footB: 24 },
      clips: {
        idle: { length: 54, loop: true, plant: "feet", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: "base" }, { f: 27, ease: "inOutQuad", p: { torso: 4, head: -6, uarmF: 34, farmF: 26, uarmB: 18, farmB: 40 } } ] },
        walkF: { length: 28, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 14, sfx: "step" } ], keys: [ { f: 0, ease: "inOutQuad", p: { torso: 6, thighF: 26, shinF: 12, footF: -12, thighB: -26, shinB: 26, footB: 12, uarmF: 36, farmF: 30, uarmB: 20, farmB: 40 } }, { f: 7, ease: "inOutQuad", p: { thighF: 6, shinF: 10, footF: 2, thighB: 24, shinB: 46, footB: 22, uarmF: 40, uarmB: 30 } }, { f: 14, ease: "inOutQuad", p: { thighF: -26, shinF: 26, footF: 12, thighB: 26, shinB: 12, footB: -12, uarmF: 36, uarmB: 22 } }, { f: 21, ease: "inOutQuad", p: { thighF: 24, shinF: 46, footF: 22, thighB: 6, shinB: 10, footB: 2, uarmF: 30, uarmB: 34 } } ] },
        walkB: { length: 30, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 15, sfx: "step" } ], keys: [ { f: 0, ease: "inOutQuad", p: { torso: 2, thighF: 18, shinF: 22, footF: 4, thighB: -22, shinB: 24, footB: 2 } }, { f: 8, ease: "inOutQuad", p: { thighF: 4, shinF: 8, footF: 2, thighB: -6, shinB: 44, footB: 26 } }, { f: 15, ease: "inOutQuad", p: { thighF: -22, shinF: 24, footF: 2, thighB: 18, shinB: 22, footB: 4 } }, { f: 23, ease: "inOutQuad", p: { thighF: -6, shinF: 44, footF: 26, thighB: 4, shinB: 8, footB: 2 } } ] },
        crouch: { length: 50, loop: true, plant: "feet", blend: 4, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 28, head: -12, uarmF: 40, farmF: 80, uarmB: 26, farmB: 70, thighF: 80, shinF: 124, footF: 44, thighB: 60, shinB: 124, footB: 64 } }, { f: 25, ease: "inOutQuad", p: { torso: 30, head: -13, thighF: 82, shinF: 126, footF: 44, thighB: 62, shinB: 126, footB: 64 } } ] },
        jumpUp: { length: 18, plant: "root", blend: 3, keys: [ { f: 6, ease: "outCubic", p: { torso: 2, thighF: 60, shinF: 95, footF: 35, thighB: 18, shinB: 55, footB: 30, uarmF: 75, farmF: 60, uarmB: 50, farmB: 70 } }, { f: 18, ease: "inOutQuad", p: { torso: 0, head: 0, thighF: 68, shinF: 105, thighB: 22, shinB: 62 } } ] },
        jumpFall: { length: 24, loop: true, plant: "root", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 30, shinF: 40, footF: 20, thighB: -6, shinB: 44, footB: 30, uarmF: 60, farmF: 50, uarmB: 40, farmB: 60 } }, { f: 12, ease: "inOutQuad", p: { thighF: 26, shinF: 34, thighB: -2, shinB: 38, uarmF: 68, uarmB: 46 } } ] },
        dashF: { length: 14, plant: "feet", blend: 2, keys: [ { f: 0, ease: "linear", p: { torso: 22, head: -8, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: -20, farmF: 70, uarmB: 60, farmB: 80 } }, { f: 7, ease: "inOutQuad", p: { torso: 24, thighF: -35, shinF: 50, footF: 10, thighB: 50, shinB: 80, footB: 30, uarmF: 55, farmF: 80, uarmB: -25, farmB: 70 } }, { f: 13, ease: "inOutQuad", p: { torso: 22, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: -20, uarmB: 60 } } ] },
        dashB: { length: 16, plant: "feet", blend: 2, keys: [ { f: 3, ease: "outCubic", p: { rootY: 18, rot: -6, torso: -8, thighF: 30, shinF: 60, footF: 25, thighB: 10, shinB: 50, footB: 35 } }, { f: 10, ease: "inOutQuad", p: { rootY: 9, rot: -3, torso: -4 } }, { f: 15, ease: "inQuad", p: { rootY: 0, rot: 0, torso: 6, thighF: 40, shinF: 70, footF: 30, thighB: 20, shinB: 60, footB: 40 } } ] },
        landing: { length: 6, plant: "feet", blend: 1, keys: [ { f: 0, ease: "linear", p: { torso: 30, thighF: 60, shinF: 100, footF: 40, thighB: 40, shinB: 90, footB: 50, uarmF: 50, farmF: 80, uarmB: 35, farmB: 70 } }, { f: 5, ease: "inOutQuad", p: "base" } ] },
        guardStand: { length: 30, loop: true, plant: "feet", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 8, head: 2, uarmF: 50, farmF: 116, uarmB: 40, farmB: 110, thighF: 22, shinF: 26, footF: 4, thighB: -14, shinB: 10, footB: 24 } }, { f: 15, ease: "inOutQuad", p: { torso: 6, uarmF: 48, farmF: 118 } } ] },
        guardCrouch: { length: 30, loop: true, plant: "feet", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 28, head: -12, uarmF: 50, farmF: 116, uarmB: 40, farmB: 110, thighF: 80, shinF: 124, footF: 44, thighB: 60, shinB: 124, footB: 64 } }, { f: 15, ease: "inOutQuad", p: { torso: 30, uarmF: 48, farmF: 118 } } ] },
        hurtHigh: { length: 16, plant: "feet", blend: 1, keys: [ { f: 2, ease: "outExpo", p: { torso: -16, head: -22, rootX: -6, uarmF: -5, farmF: 25, uarmB: -20, farmB: 30, thighF: 22, shinF: 38, footF: 12, thighB: -18, shinB: 10, footB: 20 } }, { f: 12, ease: "inOutQuad", p: { torso: -8, head: -12, rootX: -3 } } ] },
        hurtLow: { length: 16, plant: "feet", blend: 1, keys: [ { f: 2, ease: "outExpo", p: { torso: 34, head: 14, rootX: -4, uarmF: 10, farmF: 40, uarmB: -8, farmB: 30, thighF: 36, shinF: 60, footF: 24, thighB: -8, shinB: 40, footB: 25 } }, { f: 12, ease: "inOutQuad", p: { torso: 26, head: 8 } } ] },
        hurtAir: { length: 24, plant: "root", blend: 1, keys: [ { f: 3, ease: "outCubic", p: { rot: -25, torso: -14, head: -18, uarmF: -20, farmF: 20, uarmB: -30, farmB: 20, thighF: 30, shinF: 50, footF: 20, thighB: 10, shinB: 50, footB: 20 } }, { f: 24, ease: "inOutQuad", p: { rot: -80, torso: -6, thighF: 40, shinF: 70 } } ] },
        down: { length: 40, loop: true, plant: "root", blend: 3, keys: [ { f: 0, ease: "inOutQuad", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: 20, farmF: 10, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } }, { f: 20, ease: "inOutQuad", p: { head: -3, uarmF: 22 } } ] },
        wakeup: { length: 18, plant: "root", blend: 1, keys: [ { f: 0, ease: "linear", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: 20, farmF: 10, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } }, { f: 8, ease: "outCubic", p: { rot: -30, rootY: -30, torso: 35, head: 10, uarmF: 25, farmF: 60, uarmB: 15, farmB: 50, thighF: 60, shinF: 110, footF: 50, thighB: 40, shinB: 100, footB: 60 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        thrown: { length: 20, loop: true, plant: "root", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { rot: -20, rootY: -10, torso: -10, head: -15, uarmF: 70, farmF: 30, uarmB: 60, farmB: 40, thighF: 40, shinF: 60, footF: 20, thighB: 20, shinB: 50, footB: 20 } }, { f: 10, ease: "inOutQuad", p: { rot: -26, uarmF: 80, uarmB: 50, thighF: 34 } } ] },
        intro: { length: 60, plant: "feet", blend: 6, keys: [ { f: 20, ease: "inOutCubic", p: { torso: 36, head: 0, uarmF: 25, farmF: 105, uarmB: 25, farmB: 105 } }, { f: 34, ease: "linear", p: { torso: 36, head: 0 } }, { f: 52, ease: "inOutCubic", p: "base" } ] },
        win: { length: 90, loop: true, plant: "feet", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: -4, head: -6, uarmF: 150, farmF: 25, uarmB: 20, farmB: 50, thighF: 20, shinF: 28, footF: 8, thighB: -12, shinB: 12, footB: 24 } }, { f: 45, ease: "inOutQuad", p: { uarmF: 158, torso: -6 } } ] },
        lose: { length: 40, plant: "feet", blend: 6, keys: [ { f: 20, ease: "outCubic", p: { torso: 38, head: 20, uarmF: 10, farmF: 30, uarmB: 5, farmB: 25, thighF: 50, shinF: 90, footF: 40, thighB: 30, shinB: 80, footB: 50 } } ] },
        throwHit: { length: 44, plant: "feet", blend: 1, keys: [ { f: 0, ease: "linear", p: { torso: 20, rootX: 8, uarmF: 85, farmF: 5, uarmB: 85, farmB: 5 } }, { f: 12, ease: "inOutCubic", p: { torso: -8, rootX: 0, uarmF: 165, farmF: 10, uarmB: 165, farmB: 10, thighF: 26, shinF: 36, footF: 10 } }, { f: 24, ease: "outExpo", p: { torso: 35, rootX: 10, uarmF: 40, farmF: 5, uarmB: 40, farmB: 5 } }, { f: 27, ease: "linear", p: { rootX: 12 } }, { f: 43, ease: "inOutQuad", p: "base" } ] },
        "5L": { length: 17, plant: "feet", blend: 2, keys: [ { f: 3, ease: "outQuad", p: { uarmF: 60, farmF: 100, rootX: -3 } }, { f: 5, ease: "outExpo", p: { torso: 20, uarmF: 94, farmF: 0, rootX: 8, thighF: 30, shinF: 30 } }, { f: 8, ease: "linear", p: { torso: 20, uarmF: 94, farmF: 0, rootX: 8, thighF: 30, shinF: 30 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        "2L": { length: 17, plant: "feet", blend: 2, base: "crouch", keys: [ { f: 3, ease: "outQuad", p: { thighF: 70, shinF: 120 } }, { f: 5, ease: "outExpo", p: { torso: 14, head: -10, thighF: 86, shinF: 10, footF: 0, rootX: 6, uarmF: 40, farmF: 60 } }, { f: 8, ease: "linear", p: { torso: 14, head: -10, thighF: 86, shinF: 10, footF: 0, rootX: 6, uarmF: 40, farmF: 60 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        "5H": { length: 35, plant: "feet", blend: 3, keys: [ { f: 7, ease: "outQuad", p: { torso: -10, head: 0, uarmF: 0, uarmB: 0, rootX: -8 } }, { f: 12, ease: "outExpo", p: { torso: 60, head: 30, uarmF: 120, farmF: 20, uarmB: 120, farmB: 20, rootX: 16, thighF: 40, shinF: 40, thighB: -30 } }, { f: 17, ease: "linear", p: { torso: 60, head: 30, uarmF: 120, farmF: 20, uarmB: 120, farmB: 20, rootX: 16, thighF: 40, shinF: 40, thighB: -30 } }, { f: 35, ease: "inOutQuad", p: "base" } ] },
        "2H": { length: 34, plant: "feet", blend: 3, base: "crouch", keys: [ { f: 5, ease: "outQuad", p: { torso: 30, thighF: 50, shinF: 110 } }, { f: 9, ease: "outExpo", p: { torso: 40, head: -14, thighF: 94, shinF: 4, footF: -10, rootX: 8, uarmF: 0, farmF: 30, uarmB: 60 } }, { f: 13, ease: "linear", p: { torso: 40, head: -14, thighF: 94, shinF: 4, footF: -10, rootX: 8, uarmF: 0, farmF: 30, uarmB: 60 } }, { f: 34, ease: "inOutQuad", p: "base" } ] },
        jL: { length: 18, plant: "root", blend: 2, base: "jumpFall", keys: [ { f: 2, ease: "outQuad", p: { thighF: 50, shinF: 110 } }, { f: 4, ease: "outExpo", p: { torso: -6, thighF: 92, shinF: 0, uarmF: 20, farmF: 60 } }, { f: 13, ease: "linear", p: { torso: -6, thighF: 92, shinF: 0, uarmF: 20, farmF: 60 } }, { f: 18, ease: "inOutQuad", p: "base" } ] },
        jH: { length: 24, plant: "root", blend: 3, base: "jumpFall", keys: [ { f: 4, ease: "outQuad", p: { torso: -20, head: -20 } }, { f: 8, ease: "outExpo", p: { torso: 60, head: 40, uarmF: 40, uarmB: 40, thighF: 30, shinF: 80, thighB: 10, shinB: 80 } }, { f: 14, ease: "linear", p: { torso: 60, head: 40, uarmF: 40, uarmB: 40, thighF: 30, shinF: 80, thighB: 10, shinB: 80 } }, { f: 24, ease: "inOutQuad", p: "base" } ] },
        throw: { length: 27, plant: "feet", blend: 3, keys: [ { f: 3, ease: "outQuad", p: { uarmF: 60, farmF: 60, uarmB: 50, farmB: 60 } }, { f: 5, ease: "outExpo", p: { torso: 30, uarmF: 76, farmF: 30, uarmB: 76, farmB: 30, rootX: 10, thighF: 44, shinF: 40 } }, { f: 7, ease: "linear", p: { torso: 30, uarmF: 76, farmF: 30, uarmB: 76, farmB: 30, rootX: 10, thighF: 44, shinF: 40 } }, { f: 27, ease: "inOutQuad", p: "base" } ] },
        sp1: { length: 37, plant: "feet", blend: 3, keys: [ { f: 9, ease: "outQuad", p: { torso: -10, head: -30, uarmF: 150, farmF: 60, uarmB: 150, farmB: 60 } }, { f: 16, ease: "outExpo", p: { torso: 50, head: 50, uarmF: 70, farmF: 20, uarmB: 70, farmB: 20, rootX: 6 } }, { f: 25, ease: "linear", p: { torso: 50, head: 50, uarmF: 70, farmF: 20, uarmB: 70, farmB: 20, rootX: 6 } }, { f: 37, ease: "inOutQuad", p: "base" } ] },
        sp2: { length: 41, plant: "feet", blend: 3, keys: [ { f: 3, ease: "outQuad", p: { torso: 30, thighF: 60, shinF: 100, rootY: -8 } }, { f: 6, ease: "outExpo", p: { torso: -20, head: -30, uarmF: 20, farmF: 60, uarmB: 20, farmB: 60, thighF: 30, shinF: 70 } }, { f: 17, ease: "linear", p: { torso: -20, head: -30, uarmF: 20, farmF: 60, uarmB: 20, farmB: 60, thighF: 30, shinF: 70 } }, { f: 41, ease: "inOutQuad", p: "base" } ] },
        sp3: { length: 43, plant: "feet", blend: 3, keys: [ { f: 7, ease: "outQuad", p: { torso: 50, head: 30, thighF: 60, shinF: 100, rootY: -6 } }, { f: 13, ease: "outExpo", p: { torso: 80, head: 60, uarmF: 150, farmF: 0, uarmB: 150, farmB: 0, rootX: 10, rootY: -30, thighF: 0, shinF: 0, thighB: -20, shinB: 0 } }, { f: 31, ease: "linear", p: { torso: 80, head: 60, uarmF: 150, farmF: 0, uarmB: 150, farmB: 0, rootX: 10, rootY: -30, thighF: 0, shinF: 0, thighB: -20, shinB: 0 } }, { f: 43, ease: "inOutQuad", p: "base" } ] },
        super: { length: 59, plant: "feet", blend: 3, keys: [ { f: 6, ease: "outQuad", p: { torso: -16, head: -20, uarmF: 175, farmF: 10, uarmB: 175, farmB: 10, rootY: 6 } }, { f: 10, ease: "outExpo", p: { torso: 40, head: 20, uarmF: 100, farmF: 0, uarmB: 100, farmB: 0, rootX: 12, thighF: 40, shinF: 40 } }, { f: 35, ease: "linear", p: { torso: 40, head: 20, uarmF: 100, farmF: 0, uarmB: 100, farmB: 0, rootX: 12, thighF: 40, shinF: 40 } }, { f: 59, ease: "inOutQuad", p: "base" } ] }
      },
      moves: {
        "5L": { kind: "normal", name: "立ち弱（水かき突き）", stance: "stand", startup: 5, active: 3, recovery: 9, boxes: [ { f0: 6, f1: 8, x: 30, y: 84, w: 71, h: 28 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 1, damage: 28, hitstun: 19, blockstun: 11, hitstop: 6, knock: { hit: 8, block: 10 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "5L", "2L", "5H", "2H", "sp1", "sp2", "super" ], frames: 14 }, trail: { from: "handF", color: "glow", width: 9, frames: 6 }, sfx: "swingL" },
        "2L": { kind: "normal", otg: true, name: "しゃがみ弱（水かき蹴り）", stance: "crouch", startup: 5, active: 3, recovery: 9, boxes: [ { f0: 6, f1: 8, x: 30, y: 12, w: 68, h: 24 } ], hit: { chip: 0, level: "low", effect: "stun", impact: 1, damage: 24, hitstun: 20, blockstun: 12, hitstop: 6, knock: { hit: 8, block: 10 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "5L", "2L", "5H", "2H", "sp1", "sp2", "super" ], frames: 14 }, sfx: "swingL" },
        "5H": { kind: "normal", name: "立ち強（甲羅アタック）", stance: "stand", startup: 12, active: 5, recovery: 18, boxes: [ { f0: 13, f1: 17, x: 18, y: 40, w: 93, h: 80 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 3, damage: 74, hitstun: 23, blockstun: 15, hitstop: 10, knock: { hit: 16, block: 20 }, gauge: { hit: 45, block: 22 } }, cancel: { into: [ "sp1", "sp2", "sp3", "super" ], frames: 16 }, sfx: "swingH" },
        "2H": { kind: "normal", name: "しゃがみ強（足払い）", stance: "crouch", startup: 9, active: 4, recovery: 21, boxes: [ { f0: 10, f1: 13, x: 26, y: 0, w: 74, h: 26 } ], hit: { chip: 0, level: "low", effect: "launch", impact: 3, damage: 56, hitstun: 0, blockstun: 12, hitstop: 10, knock: { hit: 0, block: 18 }, launch: { vx: 1.5, vy: 9.5 }, juggle: 3, gauge: { hit: 40, block: 20 } }, cancel: { into: [ "sp2", "super", "jump" ], frames: 14 }, sfx: "swingH" },
        jL: { kind: "normal", name: "ジャンプ弱", stance: "air", startup: 4, active: 9, recovery: 5, landLag: 3, boxes: [ { f0: 5, f1: 13, x: 20, y: 30, w: 67, h: 48 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 1, damage: 26, hitstun: 16, blockstun: 12, hitstop: 6, knock: { hit: 6, block: 8 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "jH" ], frames: 12 }, sfx: "swingL" },
        jH: { kind: "normal", name: "ジャンプ強（皿頭突き）", stance: "air", startup: 8, active: 6, recovery: 10, landLag: 4, boxes: [ { f0: 9, f1: 14, x: 6, y: -6, w: 81, h: 80 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 3, damage: 60, hitstun: 22, blockstun: 16, hitstop: 10, knock: { hit: 10, block: 14 }, gauge: { hit: 45, block: 22 } }, sfx: "swingH" },
        throw: { kind: "throw", name: "投げ", stance: "stand", startup: 5, active: 2, recovery: 20, boxes: [], hit: null, throw: { box: { x: 10, y: 20, w: 64, h: 100 }, techable: true, damage: 130, grabFrames: 30, afterRecovery: 14, attackerClip: "throwHit", hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 12, ease: "inOutCubic", x: 24, y: 170, rot: -100 }, { f: 26, ease: "outExpo", x: 70, y: 30, rot: -150 }, { f: 30, ease: "linear", x: 76, y: 20, rot: -160 } ], launch: { vx: 3, vy: 7 }, hitstop: 12, impact: 3, gauge: { hit: 40 } }, sfx: "grab" },
        sp1: { kind: "special", name: "皿の水こぼし", stance: "stand", startup: 16, active: 1, recovery: 20, boxes: [], hit: null, spawn: [ { at: 17, projectile: "mizu", x: 130, y: 0 } ], sfx: "cast" },
        sp2: { kind: "special", name: "皿割り頭突き", stance: "stand", startup: 6, active: 7, recovery: 28, landLag: 6, boxes: [ { f0: 7, f1: 13, x: 6, y: 40, w: 56, h: 130 } ], hit: { chip: 6, level: "mid", effect: "launch", impact: 3, damage: 74, hitstun: 0, blockstun: 22, hitstop: 10, knock: { hit: 0, block: 14 }, launch: { vx: 2.5, vy: 10 }, juggle: 0, gauge: { hit: 60, block: 30 } }, motion: [ { f0: 7, f1: 7, vx: 2.5, vy: 11 } ], invuln: [ { f0: 1, f1: 9, type: "strike" } ], sfx: "rise" },
        sp3: { kind: "special", name: "甲羅すべり", stance: "stand", startup: 13, active: 10, recovery: 20, boxes: [ { f0: 14, f1: 23, x: 16, y: 0, w: 94, h: 32 } ], hit: { chip: 5, level: "low", effect: "launch", impact: 3, damage: 64, hitstun: 0, blockstun: 16, hitstop: 11, knock: { hit: 0, block: 22 }, launch: { vx: 3, vy: 6 }, juggle: 0, gauge: { hit: 50, block: 25 } }, motion: [ { f0: 3, f1: 23, vx: 8.5 } ], invuln: [ { f0: 1, f1: 23, type: "proj" } ], sfx: "swingH" },
        super: { kind: "super", name: "大祓「大洪水」", stance: "stand", startup: 10, active: 1, recovery: 48, cost: 1000, flash: 40, boxes: [], hit: null, invuln: [ { f0: 1, f1: 12, type: "all" } ], spawn: [ { at: 11, projectile: "nami", x: 70, y: 0 } ], sfx: "super" }
      },
      projectiles: {
        mizu: { life: 420, armAt: 45, vx: 0, vy: 0, ground: true, box: { x: -44, y: 0, w: 88, h: 14 }, hits: 1, maxActive: 2, replaceOld: true, priority: 0, hit: { chip: 0, level: "mid", effect: "launch", impact: 1, damage: 20, unblockable: true, hitstun: 0, blockstun: 0, hitstop: 6, knock: { hit: 0, block: 0 }, launch: { vx: 0.5, vy: 4.5 }, juggle: 0, gauge: { hit: 30, block: 0 }, poison: { every: 30, ticks: 6, dmg: 6 } }, look: { style: "puddle", color: "accent", size: 1 } },
        nami: { life: 100, vx: 5, vy: 0, ground: true, box: { x: -50, y: 0, w: 100, h: 120 }, hits: 5, hitEvery: 7, maxActive: 1, priority: 3, hit: { chip: 8, level: "mid", effect: "launch", impact: 3, damage: 46, hitstun: 0, blockstun: 12, hitstop: 5, knock: { hit: 0, block: 4 }, launch: { vx: 0.6, vy: 6.5 }, juggle: 8, gauge: { hit: 0, block: 0 }, poison: { every: 30, ticks: 8, dmg: 6 } }, look: { style: "shock", color: "accent", size: 2.4 } }
      },
      quotes: { select: "きゅうりは持ってきた？", intro: [ "河童ウイルス、感染開始。" ], win: [ "足元、気をつけて。", "感染、完了です。" ], lose: [ "皿が…乾く…" ] }
    },
    /* ---- 追加キャラ3（newchars3.js で生成） ---- */
    onmyo: {
      id: "onmyo",
      name: "白鶴",
      nameEn: "WHITE CRANE",
      title: "モード変化型",
      blurb: "打たれ弱い白い鶴。体力が半分で八咫烏に変わり、追い詰められるほど強い。",
      ratings: { power: 3, speed: 3, range: 4, defense: 1 },
      stats: { dmgMul: 0.9, hp: 860, walkF: 3.3, walkB: 2.9, jumpVy: 15, jumpVx: 3.6, gravity: 0.74, airJumps: 0, prejump: 4, landLag: 3, dashF: { frames: 18, speed: 8 }, dashB: { frames: 18, speed: 5.8, invuln: 6 }, gaugeMul: 1 },
      boxes: { push: { stand: { w: 52, h: 100 }, crouch: { w: 56, h: 70 }, air: { w: 44, h: 100 } }, hurt: { stand: [ { x: -9, y: 139, w: 32, h: 32 }, { x: -26, y: 60, w: 54, h: 82 }, { x: -24, y: 0, w: 48, h: 64 } ], crouch: [ { x: 17, y: 92, w: 32, h: 32 }, { x: -28, y: 0, w: 58, h: 74 } ], air: [ { x: -24, y: 20, w: 50, h: 149 }, { x: -12, y: 137, w: 32, h: 32 } ] } },
      look: { palette: { skin: "#ffe0cc", hair: "#1a1033", primary: "#f4f7ff", secondary: "#ff3b5c", accent: "#b67cff", glow: "#19f3ff", outline: "#0a0620", eye: "#19f3ff" }, paletteP2: { skin: "#ffe0cc", hair: "#2b1033", primary: "#e8ddff", secondary: "#a56bff", accent: "#b67cff", glow: "#ff4fa3", outline: "#0a0620", eye: "#ff4fa3" }, body: { torsoLen: 52, torsoWTop: 30, torsoWBottom: 24, neckLen: 8, headR: 17, shoulderDrop: 6, uArmLen: 30, fArmLen: 28, handR: 6, thighLen: 40, shinLen: 40, footLen: 20, footH: 8, limbW: { uArm: [ 11, 9 ], fArm: [ 9, 7 ], thigh: [ 16, 13 ], shin: [ 12, 9 ] } }, colors: { head: "skin", neck: "skin", torso: "primary", uArm: "primary", fArm: "primary", hand: "skin", thigh: "secondary", shin: "secondary", foot: "accent" }, prop: { kind: "gohei", len: 46, thick: 4, angle: 0, color: "accent" }, neon: { tubeW: 3, glowW: 8, glowAlpha: 0.24, coreW: 1, fill: 0.9 }, decor: [], chains: [] },
      feel: { breath: { amp: 0.012, period: 90 }, jump: { sx: 0.94, sy: 1.08, frames: 4 }, land: { sx: 1.1, sy: 0.88, frames: 6 }, dash: { sx: 1.06, sy: 0.97, frames: 5 }, hitShake: { amp: [ 1, 2, 3, 3.5 ] }, recoil: { x: [ 3, 6, 10, 14 ], rot: [ 2, 4, 7, 10 ], frames: 4 }, squashHit: { sx: 1.06, sy: 0.94, frames: 3 } },
      basePose: { rootX: 0, rootY: 0, rot: 0, torso: 6, head: -3, uarmF: 20, farmF: 140, uarmB: 14, farmB: 60, thighF: 22, shinF: 34, footF: 12, thighB: -14, shinB: 14, footB: 28 },
      clips: {
        idle: { length: 72, loop: true, plant: "feet", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: "base" }, { f: 36, ease: "inOutQuad", p: { torso: 8, head: -4, uarmF: 24, farmF: 135, uarmB: 18, farmB: 56, thighF: 26, shinF: 42, footF: 16, thighB: -15, shinB: 18, footB: 33 } } ] },
        walkF: { length: 32, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 16, sfx: "step" } ], keys: [ { f: 0, ease: "inOutQuad", p: { torso: 8, thighF: 30, shinF: 10, footF: -20, thighB: -24, shinB: 28, footB: 20, uarmF: 12, farmF: 145, uarmB: 44, farmB: 62 } }, { f: 8, ease: "inOutQuad", p: { thighF: 6, shinF: 8, footF: 2, thighB: 28, shinB: 60, footB: 30, uarmF: 18, uarmB: 36 } }, { f: 16, ease: "inOutQuad", p: { thighF: -24, shinF: 28, footF: 20, thighB: 30, shinB: 10, footB: -20, uarmF: 26, uarmB: 30 } }, { f: 24, ease: "inOutQuad", p: { thighF: 28, shinF: 60, footF: 30, thighB: 6, shinB: 8, footB: 2, uarmF: 18, uarmB: 36 } } ] },
        walkB: { length: 40, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 20, sfx: "step" } ], keys: [ { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 18, shinF: 22, footF: 4, thighB: -22, shinB: 24, footB: 2 } }, { f: 10, ease: "inOutQuad", p: { thighF: 4, shinF: 8, footF: 2, thighB: -6, shinB: 44, footB: 26 } }, { f: 20, ease: "inOutQuad", p: { thighF: -22, shinF: 24, footF: 2, thighB: 18, shinB: 22, footB: 4 } }, { f: 30, ease: "inOutQuad", p: { thighF: -6, shinF: 44, footF: 26, thighB: 4, shinB: 8, footB: 2 } } ] },
        crouch: { length: 60, loop: true, plant: "feet", blend: 4, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 30, head: -12, uarmF: 32, farmF: 155, uarmB: 35, farmB: 80, thighF: 75, shinF: 125, footF: 50, thighB: 60, shinB: 125, footB: 65 } }, { f: 30, ease: "inOutQuad", p: { torso: 32, head: -13, thighF: 77, shinF: 128, footF: 51, thighB: 62, shinB: 128, footB: 66 } } ] },
        jumpUp: { length: 18, plant: "root", blend: 3, keys: [ { f: 6, ease: "outCubic", p: { torso: 2, thighF: 60, shinF: 95, footF: 35, thighB: 18, shinB: 55, footB: 30, uarmF: 57, farmF: 125, uarmB: 50, farmB: 70 } }, { f: 18, ease: "inOutQuad", p: { torso: 0, head: 0, thighF: 68, shinF: 105, thighB: 22, shinB: 62 } } ] },
        jumpFall: { length: 24, loop: true, plant: "root", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 30, shinF: 40, footF: 20, thighB: -6, shinB: 44, footB: 30, uarmF: 42, farmF: 115, uarmB: 40, farmB: 60 } }, { f: 12, ease: "inOutQuad", p: { thighF: 26, shinF: 34, thighB: -2, shinB: 38, uarmF: 50, uarmB: 46 } } ] },
        dashF: { length: 18, plant: "feet", blend: 2, keys: [ { f: 0, ease: "linear", p: { torso: 24, head: -8, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: -38, farmF: 135, uarmB: 60, farmB: 80 } }, { f: 9, ease: "inOutQuad", p: { torso: 26, thighF: -35, shinF: 50, footF: 10, thighB: 50, shinB: 80, footB: 30, uarmF: 37, farmF: 145, uarmB: -25, farmB: 70 } }, { f: 17, ease: "inOutQuad", p: { torso: 24, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: -38, uarmB: 60 } } ] },
        dashB: { length: 18, plant: "feet", blend: 2, keys: [ { f: 4, ease: "outCubic", p: { rootY: 22, rot: -6, torso: -8, thighF: 30, shinF: 60, footF: 25, thighB: 10, shinB: 50, footB: 35 } }, { f: 12, ease: "inOutQuad", p: { rootY: 10, rot: -3, torso: -4 } }, { f: 17, ease: "inQuad", p: { rootY: 0, rot: 0, torso: 6, thighF: 40, shinF: 70, footF: 30, thighB: 20, shinB: 60, footB: 40 } } ] },
        landing: { length: 6, plant: "feet", blend: 1, keys: [ { f: 0, ease: "linear", p: { torso: 30, thighF: 60, shinF: 100, footF: 40, thighB: 40, shinB: 90, footB: 50, uarmF: 32, farmF: 145, uarmB: 35, farmB: 70 } }, { f: 5, ease: "inOutQuad", p: "base" } ] },
        guardStand: { length: 30, loop: true, plant: "feet", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 10, head: 2, uarmF: 52, farmF: 118, uarmB: 44, farmB: 112, thighF: 26, shinF: 42, footF: 16, thighB: -15, shinB: 18, footB: 33 } }, { f: 15, ease: "inOutQuad", p: { torso: 8, uarmF: 50, farmF: 120 } } ] },
        guardCrouch: { length: 30, loop: true, plant: "feet", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 30, head: -12, uarmF: 52, farmF: 118, uarmB: 44, farmB: 112, thighF: 75, shinF: 125, footF: 50, thighB: 60, shinB: 125, footB: 65 } }, { f: 15, ease: "inOutQuad", p: { torso: 32, uarmF: 50, farmF: 120 } } ] },
        hurtHigh: { length: 16, plant: "feet", blend: 1, keys: [ { f: 2, ease: "outExpo", p: { torso: -16, head: -22, rootX: -6, uarmF: -5, farmF: 25, uarmB: -20, farmB: 30, thighF: 20, shinF: 34, footF: 12, thighB: -18, shinB: 10, footB: 24 } }, { f: 12, ease: "inOutQuad", p: { torso: -8, head: -12, rootX: -3 } } ] },
        hurtLow: { length: 16, plant: "feet", blend: 1, keys: [ { f: 2, ease: "outExpo", p: { torso: 34, head: 14, rootX: -4, uarmF: 10, farmF: 40, uarmB: -8, farmB: 30, thighF: 36, shinF: 60, footF: 24, thighB: -8, shinB: 40, footB: 25 } }, { f: 12, ease: "inOutQuad", p: { torso: 26, head: 8 } } ] },
        hurtAir: { length: 24, plant: "root", blend: 1, keys: [ { f: 3, ease: "outCubic", p: { rot: -25, torso: -14, head: -18, uarmF: -20, farmF: 20, uarmB: -30, farmB: 20, thighF: 30, shinF: 50, footF: 20, thighB: 10, shinB: 50, footB: 20 } }, { f: 24, ease: "inOutQuad", p: { rot: -80, torso: -6, thighF: 40, shinF: 70 } } ] },
        down: { length: 40, loop: true, plant: "root", blend: 3, keys: [ { f: 0, ease: "inOutQuad", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: 20, farmF: 10, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } }, { f: 20, ease: "inOutQuad", p: { head: -3, uarmF: 22 } } ] },
        wakeup: { length: 18, plant: "root", blend: 1, keys: [ { f: 0, ease: "linear", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: 2, farmF: 75, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } }, { f: 8, ease: "outCubic", p: { rot: -30, rootY: -30, torso: 35, head: 10, uarmF: 7, farmF: 125, uarmB: 15, farmB: 50, thighF: 60, shinF: 110, footF: 50, thighB: 40, shinB: 100, footB: 60 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        thrown: { length: 20, loop: true, plant: "root", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { rot: -20, rootY: -10, torso: -10, head: -15, uarmF: 70, farmF: 30, uarmB: 60, farmB: 40, thighF: 40, shinF: 60, footF: 20, thighB: 20, shinB: 50, footB: 20 } }, { f: 10, ease: "inOutQuad", p: { rot: -26, uarmF: 80, uarmB: 50, thighF: 34 } } ] },
        intro: { length: 60, plant: "feet", blend: 6, keys: [ { f: 20, ease: "inOutCubic", p: { torso: 42, head: 10, uarmF: 25, farmF: 105, uarmB: 25, farmB: 105 } }, { f: 34, ease: "linear", p: { torso: 42, head: 10 } }, { f: 52, ease: "inOutCubic", p: "base" } ] },
        win: { length: 90, loop: true, plant: "feet", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: -4, head: -6, uarmF: 150, farmF: 25, uarmB: 20, farmB: 50, thighF: 20, shinF: 28, footF: 8, thighB: -12, shinB: 12, footB: 24 } }, { f: 45, ease: "inOutQuad", p: { uarmF: 158, torso: -6 } } ] },
        lose: { length: 40, plant: "feet", blend: 6, keys: [ { f: 20, ease: "outCubic", p: { torso: 38, head: 20, uarmF: 10, farmF: 30, uarmB: 5, farmB: 25, thighF: 50, shinF: 90, footF: 40, thighB: 30, shinB: 80, footB: 50 } } ] },
        throwHit: { length: 48, plant: "feet", blend: 1, keys: [ { f: 0, ease: "linear", p: { torso: 20, rootX: 8, uarmF: 85, farmF: 5, uarmB: 85, farmB: 5 } }, { f: 12, ease: "inOutCubic", p: { torso: -10, rootX: 0, uarmF: 170, farmF: 10, uarmB: 170, farmB: 10, thighF: 26, shinF: 36, footF: 10 } }, { f: 26, ease: "outExpo", p: { torso: 35, rootX: 10, uarmF: 40, farmF: 5, uarmB: 40, farmB: 5 } }, { f: 30, ease: "linear", p: { rootX: 12 } }, { f: 47, ease: "inOutQuad", p: "base" } ] },
        "5L": { length: 17, plant: "feet", blend: 2, keys: [ { f: 3, ease: "outQuad", p: { uarmF: 40, farmF: 100 } }, { f: 5, ease: "outExpo", p: { torso: 12, uarmF: 92, farmF: 0, rootX: 6 } }, { f: 8, ease: "linear", p: { torso: 12, uarmF: 92, farmF: 0, rootX: 6 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        "2L": { length: 17, plant: "feet", blend: 2, base: "crouch", keys: [ { f: 3, ease: "outQuad", p: { thighF: 60, shinF: 100 } }, { f: 5, ease: "outExpo", p: { torso: 14, head: -8, thighF: 86, shinF: 6, footF: 0, rootX: 6 } }, { f: 8, ease: "linear", p: { torso: 14, head: -8, thighF: 86, shinF: 6, footF: 0, rootX: 6 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        "5H": { length: 33, plant: "feet", blend: 3, keys: [ { f: 6, ease: "outQuad", p: { torso: -12, uarmF: 160, farmF: 30, rootX: -6 } }, { f: 11, ease: "outExpo", p: { torso: 28, head: 8, uarmF: 84, farmF: 0, uarmB: 30, rootX: 16, thighF: 40, shinF: 40 } }, { f: 15, ease: "linear", p: { torso: 28, head: 8, uarmF: 84, farmF: 0, uarmB: 30, rootX: 16, thighF: 40, shinF: 40 } }, { f: 33, ease: "inOutQuad", p: "base" } ] },
        "2H": { length: 34, plant: "feet", blend: 3, base: "crouch", keys: [ { f: 5, ease: "outQuad", p: { torso: 30, thighF: 50, shinF: 110 } }, { f: 9, ease: "outExpo", p: { torso: 40, head: -14, thighF: 94, shinF: 4, footF: -10, rootX: 8, uarmF: 0, farmF: 30, uarmB: 60 } }, { f: 13, ease: "linear", p: { torso: 40, head: -14, thighF: 94, shinF: 4, footF: -10, rootX: 8, uarmF: 0, farmF: 30, uarmB: 60 } }, { f: 34, ease: "inOutQuad", p: "base" } ] },
        jL: { length: 18, plant: "root", blend: 2, base: "jumpFall", keys: [ { f: 2, ease: "outQuad", p: { thighF: 50, shinF: 110 } }, { f: 4, ease: "outExpo", p: { torso: -6, thighF: 92, shinF: 0, uarmF: 20, farmF: 60 } }, { f: 13, ease: "linear", p: { torso: -6, thighF: 92, shinF: 0, uarmF: 20, farmF: 60 } }, { f: 18, ease: "inOutQuad", p: "base" } ] },
        jH: { length: 24, plant: "root", blend: 3, base: "jumpFall", keys: [ { f: 4, ease: "outQuad", p: { torso: -20, uarmF: 170, farmF: 20 } }, { f: 8, ease: "outExpo", p: { torso: 40, head: 20, uarmF: 60, farmF: 0, uarmB: 40, thighF: 30, shinF: 80 } }, { f: 14, ease: "linear", p: { torso: 40, head: 20, uarmF: 60, farmF: 0, uarmB: 40, thighF: 30, shinF: 80 } }, { f: 24, ease: "inOutQuad", p: "base" } ] },
        throw: { length: 27, plant: "feet", blend: 3, keys: [ { f: 3, ease: "outQuad", p: { uarmF: 60, farmF: 60, uarmB: 50, farmB: 60 } }, { f: 5, ease: "outExpo", p: { torso: 20, uarmF: 80, farmF: 30, uarmB: 80, farmB: 30, rootX: 10 } }, { f: 7, ease: "linear", p: { torso: 20, uarmF: 80, farmF: 30, uarmB: 80, farmB: 30, rootX: 10 } }, { f: 27, ease: "inOutQuad", p: "base" } ] },
        sp1: { length: 40, plant: "feet", blend: 3, keys: [ { f: 7, ease: "outQuad", p: { torso: -10, head: -6, uarmF: 40, farmF: 90, uarmB: 40, farmB: 90, rootY: 4 } }, { f: 13, ease: "outExpo", p: { torso: 14, head: 4, uarmF: 92, farmF: 0, uarmB: 86, farmB: 0, rootX: 8 } }, { f: 22, ease: "linear", p: { torso: 14, head: 4, uarmF: 92, farmF: 0, uarmB: 86, farmB: 0, rootX: 8 } }, { f: 40, ease: "inOutQuad", p: "base" } ] },
        sp2: { length: 40, plant: "feet", blend: 3, keys: [ { f: 3, ease: "outQuad", p: { torso: 20, rootY: -8 } }, { f: 5, ease: "outExpo", p: { torso: -14, head: -16, uarmF: 170, farmF: 0, uarmB: 150, farmB: 10 } }, { f: 16, ease: "linear", p: { torso: -14, head: -16, uarmF: 170, farmF: 0, uarmB: 150, farmB: 10 } }, { f: 40, ease: "inOutQuad", p: "base" } ] },
        sp3: { length: 40, plant: "feet", blend: 3, keys: [ { f: 7, ease: "outQuad", p: { torso: 40, head: 20, rootY: -10 } }, { f: 12, ease: "outExpo", p: { torso: 70, head: 30, rootX: 12, rootY: -24, uarmF: 120, uarmB: 120 } }, { f: 30, ease: "linear", p: { torso: 70, head: 30, rootX: 12, rootY: -24, uarmF: 120, uarmB: 120 } }, { f: 40, ease: "inOutQuad", p: "base" } ] },
        super: { length: 59, plant: "feet", blend: 3, keys: [ { f: 6, ease: "outQuad", p: { torso: -16, head: -12, uarmF: 170, farmF: 10, uarmB: 170, farmB: 10, rootY: 6 } }, { f: 10, ease: "outExpo", p: { torso: 24, head: 6, uarmF: 96, farmF: 0, uarmB: 90, farmB: 0, rootX: 12 } }, { f: 35, ease: "linear", p: { torso: 24, head: 6, uarmF: 96, farmF: 0, uarmB: 90, farmB: 0, rootX: 12 } }, { f: 59, ease: "inOutQuad", p: "base" } ] },
        inshift: { length: 34, plant: "feet", blend: 3, keys: [ { f: 3, ease: "outQuad", p: { torso: 30, head: 10, uarmF: 20, farmF: 60, uarmB: 20, farmB: 60, rootY: -10 } }, { f: 6, ease: "outExpo", p: { torso: -14, head: -20, uarmF: 175, farmF: 10, uarmB: 175, farmB: 10, rootY: 4 } }, { f: 22, ease: "linear", p: { torso: -14, head: -20, uarmF: 175, farmF: 10, uarmB: 175, farmB: 10, rootY: 4 } }, { f: 34, ease: "inOutQuad", p: "base" } ] },
        in5H: { length: 29, plant: "feet", blend: 3, keys: [ { f: 5, ease: "outQuad", p: { torso: 10, uarmF: 150, farmF: 60, rootX: -4 } }, { f: 9, ease: "outExpo", p: { torso: 40, head: 10, uarmF: 96, farmF: -10, uarmB: 20, rootX: 18, thighF: 46, shinF: 40 } }, { f: 13, ease: "linear", p: { torso: 40, head: 10, uarmF: 96, farmF: -10, uarmB: 20, rootX: 18, thighF: 46, shinF: 40 } }, { f: 29, ease: "inOutQuad", p: "base" } ] },
        insp1: { length: 40, plant: "feet", blend: 3, keys: [ { f: 8, ease: "outQuad", p: { torso: 20, head: -10, uarmF: 160, farmF: 40, uarmB: 150, farmB: 40, rootY: -6 } }, { f: 15, ease: "outExpo", p: { torso: 30, head: 0, uarmF: 90, farmF: 0, uarmB: 80, farmB: 0, rootX: 8 } }, { f: 24, ease: "linear", p: { torso: 30, head: 0, uarmF: 90, farmF: 0, uarmB: 80, farmB: 0, rootX: 8 } }, { f: 40, ease: "inOutQuad", p: "base" } ] },
        insp2: { length: 48, plant: "feet", blend: 3, keys: [ { f: 8, ease: "outQuad", p: { torso: 10, uarmF: 40, farmF: 60 } }, { f: 14, ease: "outExpo", p: { torso: 30, head: 4, uarmF: 92, farmF: -10, rootX: 10, thighF: 40, shinF: 40 } }, { f: 28, ease: "linear", p: { torso: 30, head: 4, uarmF: 92, farmF: -10, rootX: 10, thighF: 40, shinF: 40 } }, { f: 48, ease: "inOutQuad", p: "base" } ] },
        insp3: { length: 54, plant: "feet", blend: 3, keys: [ { f: 11, ease: "outQuad", p: { torso: -20, head: -10, uarmF: 175, farmF: 10, uarmB: 175, farmB: 10, thighF: 70, shinF: 110, thighB: 30, shinB: 100 } }, { f: 20, ease: "outExpo", p: { torso: 50, head: 20, uarmF: 110, farmF: 0, uarmB: 100, farmB: 0, rootX: 12, thighF: 60, shinF: 80, thighB: 20, shinB: 90 } }, { f: 42, ease: "linear", p: { torso: 50, head: 20, uarmF: 110, farmF: 0, uarmB: 100, farmB: 0, rootX: 12, thighF: 60, shinF: 80, thighB: 20, shinB: 90 } }, { f: 54, ease: "inOutQuad", p: "base" } ] },
        insuper: { length: 70, plant: "feet", blend: 3, keys: [ { f: 6, ease: "outQuad", p: { torso: 30, head: -12, uarmF: 150, farmF: 40, uarmB: 150, farmB: 40, rootY: -8 } }, { f: 10, ease: "outExpo", p: { torso: 50, head: 10, uarmF: 100, farmF: 0, uarmB: 110, farmB: 0, rootX: 16, thighF: 50, shinF: 50, thighB: -40 } }, { f: 56, ease: "linear", p: { torso: 50, head: 10, uarmF: 100, farmF: 0, uarmB: 110, farmB: 0, rootX: 16, thighF: 50, shinF: 50, thighB: -40 } }, { f: 70, ease: "inOutQuad", p: "base" } ] }
      },
      moves: {
        "5L": { kind: "normal", name: "立ち弱（掌打）", stance: "stand", startup: 5, active: 3, recovery: 9, boxes: [ { f0: 6, f1: 8, x: 30, y: 84, w: 62, h: 28 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 1, damage: 28, hitstun: 19, blockstun: 11, hitstop: 6, knock: { hit: 8, block: 10 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "5L", "2L", "5H", "2H", "sp1", "sp2", "super" ], frames: 14 }, trail: { from: "handF", color: "glow", width: 9, frames: 6 }, sfx: "swingL" },
        "2L": { kind: "normal", otg: true, name: "しゃがみ弱（足払い小）", stance: "crouch", startup: 5, active: 3, recovery: 9, boxes: [ { f0: 6, f1: 8, x: 28, y: 10, w: 72, h: 24 } ], hit: { chip: 0, level: "low", effect: "stun", impact: 1, damage: 24, hitstun: 20, blockstun: 12, hitstop: 6, knock: { hit: 8, block: 10 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "5L", "2L", "5H", "2H", "sp1", "sp2", "super" ], frames: 14 }, sfx: "swingL" },
        "5H": { kind: "normal", name: "立ち強（翼打ち）", stance: "stand", startup: 11, active: 4, recovery: 18, boxes: [ { f0: 12, f1: 15, x: 26, y: 60, w: 77, h: 56 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 3, damage: 76, hitstun: 23, blockstun: 15, hitstop: 10, knock: { hit: 16, block: 20 }, gauge: { hit: 45, block: 22 } }, cancel: { into: [ "sp1", "sp2", "sp3", "super" ], frames: 16 }, trail: { from: "handF", color: "glow", width: 14, frames: 8 }, sfx: "swingH" },
        "2H": { kind: "normal", name: "しゃがみ強（払い）", stance: "crouch", startup: 9, active: 4, recovery: 21, boxes: [ { f0: 10, f1: 13, x: 26, y: 0, w: 76, h: 26 } ], hit: { chip: 0, level: "low", effect: "launch", impact: 3, damage: 56, hitstun: 0, blockstun: 12, hitstop: 10, knock: { hit: 0, block: 18 }, launch: { vx: 1.5, vy: 9.5 }, juggle: 3, gauge: { hit: 40, block: 20 } }, cancel: { into: [ "sp2", "super", "jump" ], frames: 14 }, sfx: "swingH" },
        jL: { kind: "normal", name: "ジャンプ弱", stance: "air", startup: 4, active: 9, recovery: 5, landLag: 3, boxes: [ { f0: 5, f1: 13, x: 18, y: 30, w: 76, h: 46 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 1, damage: 26, hitstun: 16, blockstun: 12, hitstop: 6, knock: { hit: 6, block: 8 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "jH" ], frames: 12 }, sfx: "swingL" },
        jH: { kind: "normal", name: "ジャンプ強", stance: "air", startup: 8, active: 6, recovery: 10, landLag: 4, boxes: [ { f0: 9, f1: 14, x: 4, y: -10, w: 86, h: 74 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 3, damage: 60, hitstun: 22, blockstun: 16, hitstop: 10, knock: { hit: 10, block: 14 }, gauge: { hit: 45, block: 22 } }, sfx: "swingH" },
        throw: { kind: "throw", name: "投げ", stance: "stand", startup: 5, active: 2, recovery: 20, boxes: [], hit: null, throw: { box: { x: 10, y: 20, w: 64, h: 100 }, techable: true, damage: 120, grabFrames: 30, afterRecovery: 18, attackerClip: "throwHit", hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 12, ease: "inOutCubic", x: 24, y: 170, rot: -100 }, { f: 26, ease: "outExpo", x: 70, y: 30, rot: -150 }, { f: 30, ease: "linear", x: 76, y: 20, rot: -160 } ], launch: { vx: 3, vy: 7 }, hitstop: 12, impact: 3, gauge: { hit: 40 } }, sfx: "grab" },
        sp1: { kind: "special", name: "白羽扇", stance: "stand", startup: 13, active: 1, recovery: 26, boxes: [], hit: null, spawn: [ { at: 14, projectile: "haneU", x: 56, y: 80 }, { at: 14, projectile: "haneM", x: 56, y: 70 }, { at: 14, projectile: "haneD", x: 56, y: 60 } ], sfx: "wind" },
        sp2: { kind: "special", name: "舞い鶴", stance: "stand", startup: 5, active: 7, recovery: 28, landLag: 6, boxes: [ { f0: 6, f1: 12, x: 6, y: 40, w: 72, h: 130 } ], hit: { chip: 6, level: "mid", effect: "launch", impact: 3, damage: 72, hitstun: 0, blockstun: 22, hitstop: 10, knock: { hit: 0, block: 14 }, launch: { vx: 2.5, vy: 10 }, juggle: 0, gauge: { hit: 60, block: 30 } }, motion: [ { f0: 6, f1: 6, vx: 2, vy: 11 } ], invuln: [ { f0: 1, f1: 8, type: "strike" } ], sfx: "rise" },
        sp3: { kind: "special", name: "翔け鶴", stance: "stand", startup: 12, active: 10, recovery: 18, boxes: [ { f0: 13, f1: 22, x: 16, y: 10, w: 92, h: 70 } ], hit: { chip: 6, level: "mid", effect: "launch", impact: 3, damage: 66, hitstun: 0, blockstun: 16, hitstop: 11, knock: { hit: 0, block: 22 }, launch: { vx: 3.5, vy: 6 }, juggle: 0, gauge: { hit: 50, block: 25 } }, motion: [ { f0: 3, f1: 22, vx: 7.5 } ], invuln: [ { f0: 1, f1: 22, type: "proj" } ], sfx: "swingH" },
        super: { kind: "super", name: "大祓「千羽鶴」", stance: "stand", startup: 10, active: 1, recovery: 48, cost: 1000, flash: 40, boxes: [], hit: null, invuln: [ { f0: 1, f1: 12, type: "all" } ], spawn: [ { at: 11, projectile: "taikyoku", x: 70, y: 80 } ], sfx: "super" }
      },
      projectiles: {
        haneU: { life: 70, vx: 8, vy: 1.7, box: { x: -14, y: -9, w: 28, h: 18 }, hits: 1, maxActive: 1, priority: 1, hit: { chip: 2, level: "mid", effect: "stun", impact: 1, damage: 20, hitstun: 18, blockstun: 12, hitstop: 6, knock: { hit: 8, block: 8 }, gauge: { hit: 12, block: 6 } }, look: { style: "feather", color: "glow", size: 1 } },
        haneM: { life: 70, vx: 8.5, vy: 0, box: { x: -14, y: -9, w: 28, h: 18 }, hits: 1, maxActive: 1, priority: 1, hit: { chip: 2, level: "mid", effect: "stun", impact: 1, damage: 20, hitstun: 18, blockstun: 12, hitstop: 6, knock: { hit: 8, block: 8 }, gauge: { hit: 12, block: 6 } }, look: { style: "feather", color: "glow", size: 1 } },
        haneD: { life: 70, vx: 8, vy: -0.75, box: { x: -14, y: -9, w: 28, h: 18 }, hits: 1, maxActive: 1, priority: 1, hit: { chip: 2, level: "mid", effect: "stun", impact: 1, damage: 20, hitstun: 18, blockstun: 12, hitstop: 6, knock: { hit: 8, block: 8 }, gauge: { hit: 12, block: 6 } }, look: { style: "feather", color: "glow", size: 1 } },
        taikyoku: { life: 110, vx: 5.5, vy: 0, box: { x: -46, y: -50, w: 92, h: 100 }, hits: 6, hitEvery: 7, maxActive: 1, priority: 3, hit: { chip: 8, level: "mid", effect: "launch", impact: 3, damage: 42, hitstun: 0, blockstun: 12, hitstop: 5, knock: { hit: 0, block: 4 }, launch: { vx: 0.6, vy: 6.5 }, juggle: 8, gauge: { hit: 0, block: 0 } }, look: { style: "taiji", color: "glow", size: 3 } }
      },
      mode2: { key: "yin", name: "八咫烏", label: "陰", at: 0.5, gauge: 250, burst: "shift", passive: { desperate: 0.4, from: 0.5 }, stats: { dmgMul: 1, hp: 860, walkF: 3.9, walkB: 3.2, jumpVy: 15, jumpVx: 3.6, gravity: 0.74, airJumps: 0, prejump: 4, landLag: 3, dashF: { frames: 18, speed: 9.6 }, dashB: { frames: 18, speed: 6.4, invuln: 6 }, gaugeMul: 1 }, moves: { "5H": { kind: "normal", name: "立ち強（烏爪）", clip: "in5H", stance: "stand", startup: 9, active: 4, recovery: 16, boxes: [ { f0: 10, f1: 13, x: 24, y: 56, w: 85, h: 60 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 3, damage: 70, hitstun: 23, blockstun: 15, hitstop: 10, knock: { hit: 16, block: 20 }, gauge: { hit: 45, block: 22 } }, cancel: { into: [ "sp1", "sp2", "sp3", "super" ], frames: 16 }, trail: { from: "handF", color: "accent", width: 16, frames: 8 }, sfx: "swingH" }, sp1: { kind: "special", name: "陰玉", clip: "insp1", stance: "stand", startup: 15, active: 1, recovery: 24, boxes: [], hit: null, spawn: [ { at: 16, projectile: "indama", x: 56, y: 66 } ], sfx: "cast" }, sp2: { kind: "special", name: "影縫い", clip: "insp2", stance: "stand", startup: 14, active: 6, recovery: 28, boxes: [ { f0: 15, f1: 20, x: 40, y: 30, w: 170, h: 90 } ], hit: { chip: 2, level: "mid", effect: "stun", impact: 2, damage: 28, hitstun: 30, blockstun: 10, hitstop: 8, knock: { hit: -180, block: 6 }, gauge: { hit: 40, block: 15 } }, cancel: { into: [ "5L", "5H", "sp3", "super" ], frames: 22 }, trail: { from: "handF", color: "accent", width: 18, frames: 10 }, sfx: "beckon" }, sp3: { kind: "special", name: "八咫落とし", clip: "insp3", stance: "stand", startup: 20, active: 18, recovery: 16, boxes: [], hit: null, motion: [ { f0: 5, f1: 5, vx: 4.8, vy: 11.5 } ], invuln: [ { f0: 1, f1: 32, type: "proj" } ], throw: { box: { x: -6, y: -30, w: 86, h: 170 }, techable: false, damage: 135, grabFrames: 30, afterRecovery: 18, attackerClip: "throwHit", hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 12, ease: "inOutCubic", x: 24, y: 170, rot: -100 }, { f: 26, ease: "outExpo", x: 70, y: 30, rot: -150 }, { f: 30, ease: "linear", x: 76, y: 20, rot: -160 } ], launch: { vx: 3, vy: 7 }, hitstop: 14, impact: 4, gauge: { hit: 45 } }, sfx: "swingH" }, shift: { kind: "special", name: "陰転・八咫の羽ばたき", clip: "inshift", stance: "stand", startup: 6, active: 6, recovery: 22, boxes: [ { f0: 7, f1: 12, x: -120, y: 0, w: 260, h: 190 } ], hit: { chip: 0, level: "mid", effect: "launch", impact: 4, damage: 30, unblockable: true, hitstun: 0, blockstun: 0, hitstop: 14, knock: { hit: 0, block: 0 }, launch: { vx: 7, vy: 7.5 }, juggle: 0, gauge: { hit: 0, block: 0 } }, invuln: [ { f0: 1, f1: 30, type: "all" } ], sfx: "super" }, super: { kind: "super", name: "大祓「黒天」", clip: "insuper", stance: "stand", startup: 10, active: 26, recovery: 34, cost: 1000, flash: 40, boxes: [ { f0: 11, f1: 36, x: 20, y: 0, w: 110, h: 140 } ], motion: [ { f0: 11, f1: 34, vx: 7 } ], hit: { chip: 8, level: "mid", effect: "stun", impact: 2, damage: 36, hitstun: 18, blockstun: 18, hitstop: 4, knock: { hit: 2, block: 6 }, gauge: { hit: 0, block: 0 } }, multi: { count: 6, every: 5, final: { chip: 14, level: "mid", effect: "launch", impact: 4, damage: 120, hitstun: 0, blockstun: 24, hitstop: 18, knock: { hit: 0, block: 30 }, launch: { vx: 4, vy: 9 }, juggle: 0, gauge: { hit: 0, block: 0 } } }, invuln: [ { f0: 1, f1: 10, type: "all" } ], trail: { from: "handF", color: "accent", width: 18, frames: 10 }, sfx: "super" } }, projectiles: { indama: { life: 160, vx: 4.2, vy: 0, box: { x: -20, y: -20, w: 40, h: 40 }, hits: 2, hitEvery: 14, maxActive: 1, priority: 2, hit: { chip: 5, level: "mid", effect: "stun", impact: 2, damage: 34, hitstun: 20, blockstun: 14, hitstop: 7, knock: { hit: 4, block: 8 }, gauge: { hit: 25, block: 12 } }, look: { style: "taiji", color: "accent", size: 1.35, dark: true } } }, clips: { idle: { length: 48, loop: true, plant: "feet", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 22, head: -10, uarmF: 50, farmF: 70, uarmB: 40, farmB: 50, thighF: 34, shinF: 56, footF: 16, thighB: -18, shinB: 30, footB: 30, rootY: -8 } }, { f: 24, ease: "inOutQuad", p: { torso: 26, head: -12, uarmF: 54, farmF: 76, uarmB: 44, farmB: 54, thighF: 38, shinF: 62, footF: 18, thighB: -18, shinB: 34, footB: 32, rootY: -10 } } ] } } },
      quotes: { select: "白か黒か、決めるのはあなた。", intro: [ "白鶴、舞います。" ], win: [ "白い羽、黒い羽。どちらもわたし。", "陰きわまれば、陽となる。" ], lose: [ "羽が…散る…" ] }
    },
    /* ---- 追加キャラ4（newchars4.js で生成） ---- */
    byakko: {
      id: "byakko",
      name: "白虎",
      nameEn: "BYAKKO",
      title: "狩り・追い込み型",
      blurb: "爪で傷をつけて追い込む虎。爪痕が3つで、飛びかかりが狩りの一撃になる。",
      passive: { empower: 1.3 },
      ratings: { power: 4, speed: 3, range: 3, defense: 3 },
      stats: { dmgMul: 0.85, hp: 1100, walkF: 3.4, walkB: 2.8, jumpVy: 14.5, jumpVx: 3.4, gravity: 0.78, airJumps: 0, prejump: 4, landLag: 4, dashF: { frames: 18, speed: 8.6 }, dashB: { frames: 18, speed: 5.6, invuln: 6 }, gaugeMul: 1 },
      boxes: { push: { stand: { w: 52, h: 100 }, crouch: { w: 56, h: 70 }, air: { w: 44, h: 100 } }, hurt: { stand: [ { x: -9, y: 139, w: 32, h: 32 }, { x: -26, y: 60, w: 54, h: 82 }, { x: -24, y: 0, w: 48, h: 64 } ], crouch: [ { x: 17, y: 92, w: 32, h: 32 }, { x: -28, y: 0, w: 58, h: 74 } ], air: [ { x: -24, y: 20, w: 50, h: 149 }, { x: -12, y: 137, w: 32, h: 32 } ] } },
      look: { palette: { skin: "#ffe0cc", hair: "#1a1033", primary: "#f4f7ff", secondary: "#ff3b5c", accent: "#ffd166", glow: "#19f3ff", outline: "#0a0620", eye: "#19f3ff" }, paletteP2: { skin: "#ffe0cc", hair: "#2b1033", primary: "#e8ddff", secondary: "#a56bff", accent: "#ffd166", glow: "#ff4fa3", outline: "#0a0620", eye: "#ff4fa3" }, body: { torsoLen: 54, torsoWTop: 30, torsoWBottom: 24, neckLen: 8, headR: 16, shoulderDrop: 6, uArmLen: 32, fArmLen: 30, handR: 6, thighLen: 40, shinLen: 38, footLen: 20, footH: 8, limbW: { uArm: [ 11, 9 ], fArm: [ 9, 7 ], thigh: [ 16, 13 ], shin: [ 12, 9 ] } }, colors: { head: "skin", neck: "skin", torso: "primary", uArm: "primary", fArm: "primary", hand: "skin", thigh: "secondary", shin: "secondary", foot: "accent" }, prop: { kind: "gohei", len: 46, thick: 4, angle: 0, color: "accent" }, neon: { tubeW: 3, glowW: 8, glowAlpha: 0.24, coreW: 1, fill: 0.9 }, decor: [], chains: [] },
      feel: { breath: { amp: 0.012, period: 90 }, jump: { sx: 0.94, sy: 1.08, frames: 4 }, land: { sx: 1.1, sy: 0.88, frames: 6 }, dash: { sx: 1.06, sy: 0.97, frames: 5 }, hitShake: { amp: [ 1, 2, 3, 3.5 ] }, recoil: { x: [ 3, 6, 10, 14 ], rot: [ 2, 4, 7, 10 ], frames: 4 }, squashHit: { sx: 1.06, sy: 0.94, frames: 3 } },
      clips: {
        idle: { length: 64, loop: true, plant: "feet", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: "base" }, { f: 32, ease: "inOutQuad", p: { rootY: -9, torso: 12, head: -7, uarmF: 54, farmF: 104, uarmB: 32, farmB: 94, thighF: 38, shinF: 58, footF: 16, thighB: -20, shinB: 34, footB: 32 } } ] },
        walkF: { length: 32, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 16, sfx: "step" } ], keys: [ { f: 0, ease: "inOutQuad", p: { torso: 8, thighF: 30, shinF: 10, footF: -20, thighB: -24, shinB: 28, footB: 20, uarmF: 12, farmF: 145, uarmB: 44, farmB: 62 } }, { f: 8, ease: "inOutQuad", p: { thighF: 6, shinF: 8, footF: 2, thighB: 28, shinB: 60, footB: 30, uarmF: 18, uarmB: 36 } }, { f: 16, ease: "inOutQuad", p: { thighF: -24, shinF: 28, footF: 20, thighB: 30, shinB: 10, footB: -20, uarmF: 26, uarmB: 30 } }, { f: 24, ease: "inOutQuad", p: { thighF: 28, shinF: 60, footF: 30, thighB: 6, shinB: 8, footB: 2, uarmF: 18, uarmB: 36 } } ] },
        walkB: { length: 40, loop: true, plant: "feet", blend: 5, events: [ { f: 0, sfx: "step" }, { f: 20, sfx: "step" } ], keys: [ { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 18, shinF: 22, footF: 4, thighB: -22, shinB: 24, footB: 2 } }, { f: 10, ease: "inOutQuad", p: { thighF: 4, shinF: 8, footF: 2, thighB: -6, shinB: 44, footB: 26 } }, { f: 20, ease: "inOutQuad", p: { thighF: -22, shinF: 24, footF: 2, thighB: 18, shinB: 22, footB: 4 } }, { f: 30, ease: "inOutQuad", p: { thighF: -6, shinF: 44, footF: 26, thighB: 4, shinB: 8, footB: 2 } } ] },
        crouch: { length: 60, loop: true, plant: "feet", blend: 4, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 30, head: -12, uarmF: 32, farmF: 155, uarmB: 35, farmB: 80, thighF: 75, shinF: 125, footF: 50, thighB: 60, shinB: 125, footB: 65 } }, { f: 30, ease: "inOutQuad", p: { torso: 32, head: -13, thighF: 77, shinF: 128, footF: 51, thighB: 62, shinB: 128, footB: 66 } } ] },
        jumpUp: { length: 18, plant: "root", blend: 3, keys: [ { f: 6, ease: "outCubic", p: { torso: 2, thighF: 60, shinF: 95, footF: 35, thighB: 18, shinB: 55, footB: 30, uarmF: 57, farmF: 125, uarmB: 50, farmB: 70 } }, { f: 18, ease: "inOutQuad", p: { torso: 0, head: 0, thighF: 68, shinF: 105, thighB: 22, shinB: 62 } } ] },
        jumpFall: { length: 24, loop: true, plant: "root", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 4, thighF: 30, shinF: 40, footF: 20, thighB: -6, shinB: 44, footB: 30, uarmF: 42, farmF: 115, uarmB: 40, farmB: 60 } }, { f: 12, ease: "inOutQuad", p: { thighF: 26, shinF: 34, thighB: -2, shinB: 38, uarmF: 50, uarmB: 46 } } ] },
        dashF: { length: 18, plant: "feet", blend: 2, keys: [ { f: 0, ease: "linear", p: { torso: 24, head: -8, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: -38, farmF: 135, uarmB: 60, farmB: 80 } }, { f: 9, ease: "inOutQuad", p: { torso: 26, thighF: -35, shinF: 50, footF: 10, thighB: 50, shinB: 80, footB: 30, uarmF: 37, farmF: 145, uarmB: -25, farmB: 70 } }, { f: 17, ease: "inOutQuad", p: { torso: 24, thighF: 50, shinF: 80, footF: 30, thighB: -40, shinB: 50, footB: 10, uarmF: -38, uarmB: 60 } } ] },
        dashB: { length: 18, plant: "feet", blend: 2, keys: [ { f: 4, ease: "outCubic", p: { rootY: 22, rot: -6, torso: -8, thighF: 30, shinF: 60, footF: 25, thighB: 10, shinB: 50, footB: 35 } }, { f: 12, ease: "inOutQuad", p: { rootY: 10, rot: -3, torso: -4 } }, { f: 17, ease: "inQuad", p: { rootY: 0, rot: 0, torso: 6, thighF: 40, shinF: 70, footF: 30, thighB: 20, shinB: 60, footB: 40 } } ] },
        landing: { length: 6, plant: "feet", blend: 1, keys: [ { f: 0, ease: "linear", p: { torso: 30, thighF: 60, shinF: 100, footF: 40, thighB: 40, shinB: 90, footB: 50, uarmF: 32, farmF: 145, uarmB: 35, farmB: 70 } }, { f: 5, ease: "inOutQuad", p: "base" } ] },
        guardStand: { length: 30, loop: true, plant: "feet", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 10, head: 2, uarmF: 52, farmF: 118, uarmB: 44, farmB: 112, thighF: 26, shinF: 42, footF: 16, thighB: -15, shinB: 18, footB: 33 } }, { f: 15, ease: "inOutQuad", p: { torso: 8, uarmF: 50, farmF: 120 } } ] },
        guardCrouch: { length: 30, loop: true, plant: "feet", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { torso: 30, head: -12, uarmF: 52, farmF: 118, uarmB: 44, farmB: 112, thighF: 75, shinF: 125, footF: 50, thighB: 60, shinB: 125, footB: 65 } }, { f: 15, ease: "inOutQuad", p: { torso: 32, uarmF: 50, farmF: 120 } } ] },
        hurtHigh: { length: 16, plant: "feet", blend: 1, keys: [ { f: 2, ease: "outExpo", p: { torso: -16, head: -22, rootX: -6, uarmF: -5, farmF: 25, uarmB: -20, farmB: 30, thighF: 20, shinF: 34, footF: 12, thighB: -18, shinB: 10, footB: 24 } }, { f: 12, ease: "inOutQuad", p: { torso: -8, head: -12, rootX: -3 } } ] },
        hurtLow: { length: 16, plant: "feet", blend: 1, keys: [ { f: 2, ease: "outExpo", p: { torso: 34, head: 14, rootX: -4, uarmF: 10, farmF: 40, uarmB: -8, farmB: 30, thighF: 36, shinF: 60, footF: 24, thighB: -8, shinB: 40, footB: 25 } }, { f: 12, ease: "inOutQuad", p: { torso: 26, head: 8 } } ] },
        hurtAir: { length: 24, plant: "root", blend: 1, keys: [ { f: 3, ease: "outCubic", p: { rot: -25, torso: -14, head: -18, uarmF: -20, farmF: 20, uarmB: -30, farmB: 20, thighF: 30, shinF: 50, footF: 20, thighB: 10, shinB: 50, footB: 20 } }, { f: 24, ease: "inOutQuad", p: { rot: -80, torso: -6, thighF: 40, shinF: 70 } } ] },
        down: { length: 40, loop: true, plant: "root", blend: 3, keys: [ { f: 0, ease: "inOutQuad", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: 20, farmF: 10, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } }, { f: 20, ease: "inOutQuad", p: { head: -3, uarmF: 22 } } ] },
        wakeup: { length: 18, plant: "root", blend: 1, keys: [ { f: 0, ease: "linear", p: { rot: -90, rootY: -62, torso: 0, head: -5, uarmF: 2, farmF: 75, uarmB: 30, farmB: 15, thighF: 10, shinF: 20, footF: 0, thighB: 5, shinB: 15, footB: 0 } }, { f: 8, ease: "outCubic", p: { rot: -30, rootY: -30, torso: 35, head: 10, uarmF: 7, farmF: 125, uarmB: 15, farmB: 50, thighF: 60, shinF: 110, footF: 50, thighB: 40, shinB: 100, footB: 60 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        thrown: { length: 20, loop: true, plant: "root", blend: 2, keys: [ { f: 0, ease: "inOutQuad", p: { rot: -20, rootY: -10, torso: -10, head: -15, uarmF: 70, farmF: 30, uarmB: 60, farmB: 40, thighF: 40, shinF: 60, footF: 20, thighB: 20, shinB: 50, footB: 20 } }, { f: 10, ease: "inOutQuad", p: { rot: -26, uarmF: 80, uarmB: 50, thighF: 34 } } ] },
        intro: { length: 60, plant: "feet", blend: 6, keys: [ { f: 20, ease: "inOutCubic", p: { torso: 42, head: 10, uarmF: 25, farmF: 105, uarmB: 25, farmB: 105 } }, { f: 34, ease: "linear", p: { torso: 42, head: 10 } }, { f: 52, ease: "inOutCubic", p: "base" } ] },
        win: { length: 90, loop: true, plant: "feet", blend: 6, keys: [ { f: 0, ease: "inOutQuad", p: { torso: -4, head: -6, uarmF: 150, farmF: 25, uarmB: 20, farmB: 50, thighF: 20, shinF: 28, footF: 8, thighB: -12, shinB: 12, footB: 24 } }, { f: 45, ease: "inOutQuad", p: { uarmF: 158, torso: -6 } } ] },
        lose: { length: 40, plant: "feet", blend: 6, keys: [ { f: 20, ease: "outCubic", p: { torso: 38, head: 20, uarmF: 10, farmF: 30, uarmB: 5, farmB: 25, thighF: 50, shinF: 90, footF: 40, thighB: 30, shinB: 80, footB: 50 } } ] },
        throwHit: { length: 48, plant: "feet", blend: 1, keys: [ { f: 0, ease: "linear", p: { torso: 20, rootX: 8, uarmF: 85, farmF: 5, uarmB: 85, farmB: 5 } }, { f: 12, ease: "inOutCubic", p: { torso: -10, rootX: 0, uarmF: 170, farmF: 10, uarmB: 170, farmB: 10, thighF: 26, shinF: 36, footF: 10 } }, { f: 26, ease: "outExpo", p: { torso: 35, rootX: 10, uarmF: 40, farmF: 5, uarmB: 40, farmB: 5 } }, { f: 30, ease: "linear", p: { rootX: 12 } }, { f: 47, ease: "inOutQuad", p: "base" } ] },
        "5L": { length: 17, plant: "feet", blend: 2, keys: [ { f: 3, ease: "outQuad", p: { uarmF: 40, farmF: 110 } }, { f: 5, ease: "outExpo", p: { torso: 16, uarmF: 92, farmF: 0, rootX: 8, thighF: 40, shinF: 50 } }, { f: 8, ease: "linear", p: { torso: 16, uarmF: 92, farmF: 0, rootX: 8, thighF: 40, shinF: 50 } }, { f: 17, ease: "inOutQuad", p: "base" } ] },
        "2L": { length: 18, plant: "feet", blend: 2, base: "crouch", keys: [ { f: 3, ease: "outQuad", p: { uarmF: 120, farmF: 60 } }, { f: 5, ease: "outExpo", p: { torso: 30, head: -10, uarmF: 140, farmF: 10, rootX: 8 } }, { f: 8, ease: "linear", p: { torso: 30, head: -10, uarmF: 140, farmF: 10, rootX: 8 } }, { f: 18, ease: "inOutQuad", p: "base" } ] },
        "5H": { length: 35, plant: "feet", blend: 3, keys: [ { f: 7, ease: "outQuad", p: { torso: -10, uarmF: 170, farmF: 40, rootX: -6 } }, { f: 12, ease: "outExpo", p: { torso: 34, head: 10, uarmF: 80, farmF: -10, uarmB: 20, rootX: 18, thighF: 50, shinF: 50 } }, { f: 16, ease: "linear", p: { torso: 34, head: 10, uarmF: 80, farmF: -10, uarmB: 20, rootX: 18, thighF: 50, shinF: 50 } }, { f: 35, ease: "inOutQuad", p: "base" } ] },
        "2H": { length: 36, plant: "feet", blend: 3, base: "crouch", keys: [ { f: 6, ease: "outQuad", p: { torso: 30, thighF: 50, shinF: 110 } }, { f: 10, ease: "outExpo", p: { torso: 44, head: -14, thighF: 96, shinF: 4, footF: -10, rootX: 8, uarmF: 0, farmF: 30, uarmB: 60 } }, { f: 14, ease: "linear", p: { torso: 44, head: -14, thighF: 96, shinF: 4, footF: -10, rootX: 8, uarmF: 0, farmF: 30, uarmB: 60 } }, { f: 36, ease: "inOutQuad", p: "base" } ] },
        jL: { length: 19, plant: "root", blend: 2, base: "jumpFall", keys: [ { f: 3, ease: "outQuad", p: { thighF: 50, shinF: 110 } }, { f: 5, ease: "outExpo", p: { torso: -6, thighF: 92, shinF: 0, uarmF: 20, farmF: 60 } }, { f: 13, ease: "linear", p: { torso: -6, thighF: 92, shinF: 0, uarmF: 20, farmF: 60 } }, { f: 19, ease: "inOutQuad", p: "base" } ] },
        jH: { length: 26, plant: "root", blend: 3, base: "jumpFall", keys: [ { f: 5, ease: "outQuad", p: { torso: -20, uarmF: 175, farmF: 20, uarmB: 170 } }, { f: 9, ease: "outExpo", p: { torso: 46, head: 20, uarmF: 60, farmF: 0, uarmB: 50, thighF: 30, shinF: 80 } }, { f: 15, ease: "linear", p: { torso: 46, head: 20, uarmF: 60, farmF: 0, uarmB: 50, thighF: 30, shinF: 80 } }, { f: 26, ease: "inOutQuad", p: "base" } ] },
        throw: { length: 27, plant: "feet", blend: 3, keys: [ { f: 3, ease: "outQuad", p: { uarmF: 60, farmF: 60, uarmB: 50, farmB: 60 } }, { f: 5, ease: "outExpo", p: { torso: 20, uarmF: 80, farmF: 30, uarmB: 80, farmB: 30, rootX: 10 } }, { f: 7, ease: "linear", p: { torso: 20, uarmF: 80, farmF: 30, uarmB: 80, farmB: 30, rootX: 10 } }, { f: 27, ease: "inOutQuad", p: "base" } ] },
        sp1: { length: 38, plant: "feet", blend: 3, keys: [ { f: 7, ease: "outQuad", p: { torso: -14, uarmF: 175, farmF: 30, rootX: -4 } }, { f: 13, ease: "outExpo", p: { torso: 30, head: 6, uarmF: 70, farmF: -10, rootX: 14, thighF: 50, shinF: 50 } }, { f: 20, ease: "linear", p: { torso: 30, head: 6, uarmF: 70, farmF: -10, rootX: 14, thighF: 50, shinF: 50 } }, { f: 38, ease: "inOutQuad", p: "base" } ] },
        sp2: { length: 41, plant: "feet", blend: 3, keys: [ { f: 8, ease: "outQuad", p: { torso: 30, head: -10, uarmF: 170, farmF: 20, uarmB: 160, farmB: 20, thighF: 70, shinF: 110, rootY: -10 } }, { f: 15, ease: "outExpo", p: { torso: 60, head: 10, uarmF: 100, farmF: -10, uarmB: 90, farmB: 0, rootX: 14, thighF: 40, shinF: 70, thighB: -10, shinB: 90 } }, { f: 29, ease: "linear", p: { torso: 60, head: 10, uarmF: 100, farmF: -10, uarmB: 90, farmB: 0, rootX: 14, thighF: 40, shinF: 70, thighB: -10, shinB: 90 } }, { f: 41, ease: "inOutQuad", p: "base" } ] },
        sp3: { length: 44, plant: "feet", blend: 3, keys: [ { f: 7, ease: "outQuad", p: { torso: -16, head: -20, uarmF: 30, farmF: 80, uarmB: 30, farmB: 80 } }, { f: 12, ease: "outExpo", p: { torso: 20, head: 20, uarmF: 120, farmF: 20, uarmB: 120, farmB: 20, rootX: 6, thighF: 40, shinF: 40 } }, { f: 30, ease: "linear", p: { torso: 20, head: 20, uarmF: 120, farmF: 20, uarmB: 120, farmB: 20, rootX: 6, thighF: 40, shinF: 40 } }, { f: 44, ease: "inOutQuad", p: "base" } ] },
        super: { length: 72, plant: "feet", blend: 3, keys: [ { f: 4, ease: "outQuad", p: { torso: -16, head: -12, uarmF: 170, farmF: 10, uarmB: 170, farmB: 10, rootY: 6 } }, { f: 8, ease: "outExpo", p: { torso: 30, head: 6, uarmF: 96, farmF: 0, uarmB: 90, farmB: 0, rootX: 14, thighF: 50, shinF: 50 } }, { f: 62, ease: "linear", p: { torso: 30, head: 6, uarmF: 96, farmF: 0, uarmB: 90, farmB: 0, rootX: 14, thighF: 50, shinF: 50 } }, { f: 72, ease: "inOutQuad", p: "base" } ] }
      },
      basePose: { rootX: 0, rootY: -6, rot: 0, torso: 10, head: -6, uarmF: 50, farmF: 100, uarmB: 30, farmB: 90, thighF: 34, shinF: 52, footF: 14, thighB: -20, shinB: 30, footB: 30 },
      moves: {
        "5L": { kind: "normal", name: "立ち弱（掌底）", stance: "stand", startup: 5, active: 3, recovery: 9, boxes: [ { f0: 6, f1: 8, x: 30, y: 84, w: 66, h: 28 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 1, damage: 30, hitstun: 19, blockstun: 11, hitstop: 6, knock: { hit: 8, block: 10 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "5L", "2L", "5H", "2H", "sp1", "sp2", "super" ], frames: 14 }, sfx: "swingL" },
        "2L": { kind: "normal", otg: true, name: "しゃがみ弱（下段爪）", stance: "crouch", startup: 5, active: 3, recovery: 10, boxes: [ { f0: 6, f1: 8, x: 28, y: 10, w: 74, h: 24 } ], hit: { chip: 0, level: "low", effect: "stun", impact: 1, damage: 26, hitstun: 20, blockstun: 12, hitstop: 6, knock: { hit: 8, block: 10 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "5L", "2L", "5H", "2H", "sp1", "sp2", "super" ], frames: 14 }, sfx: "swingL" },
        "5H": { kind: "normal", name: "立ち強（虎爪打ち）", stance: "stand", startup: 12, active: 4, recovery: 19, boxes: [ { f0: 13, f1: 16, x: 24, y: 50, w: 90, h: 70 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 3, damage: 84, hitstun: 24, blockstun: 16, hitstop: 11, knock: { hit: 16, block: 20 }, gauge: { hit: 45, block: 22 }, mark: 1 }, cancel: { into: [ "sp1", "sp2", "sp3", "super" ], frames: 16 }, trail: { from: "handF", color: "accent", width: 16, frames: 8 }, sfx: "swingH" },
        "2H": { kind: "normal", name: "しゃがみ強（尾払い）", stance: "crouch", startup: 10, active: 4, recovery: 22, boxes: [ { f0: 11, f1: 14, x: 26, y: 0, w: 84, h: 26 } ], hit: { chip: 0, level: "low", effect: "launch", impact: 3, damage: 60, hitstun: 0, blockstun: 12, hitstop: 10, knock: { hit: 0, block: 18 }, launch: { vx: 1.5, vy: 9.5 }, juggle: 3, gauge: { hit: 40, block: 20 } }, cancel: { into: [ "sp1", "super", "jump" ], frames: 14 }, sfx: "swingH" },
        jL: { kind: "normal", name: "ジャンプ弱", stance: "air", startup: 5, active: 8, recovery: 6, landLag: 3, boxes: [ { f0: 6, f1: 13, x: 18, y: 30, w: 74, h: 48 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 1, damage: 30, hitstun: 17, blockstun: 12, hitstop: 7, knock: { hit: 6, block: 8 }, gauge: { hit: 25, block: 12 } }, cancel: { into: [ "jH" ], frames: 12 }, sfx: "swingL" },
        jH: { kind: "normal", name: "ジャンプ強（爪落とし）", stance: "air", startup: 9, active: 6, recovery: 11, landLag: 5, boxes: [ { f0: 10, f1: 15, x: 4, y: -14, w: 88, h: 80 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 3, damage: 70, hitstun: 23, blockstun: 16, hitstop: 11, knock: { hit: 10, block: 14 }, gauge: { hit: 45, block: 22 }, mark: 1 }, sfx: "swingH" },
        throw: { kind: "throw", name: "投げ（虎投げ）", stance: "stand", startup: 5, active: 2, recovery: 20, boxes: [], hit: null, throw: { box: { x: 10, y: 20, w: 70, h: 110 }, techable: true, damage: 130, grabFrames: 30, afterRecovery: 18, attackerClip: "throwHit", hold: [ { f: 0, x: 50, y: 60, rot: -10 }, { f: 12, ease: "inOutCubic", x: 24, y: 170, rot: -100 }, { f: 26, ease: "outExpo", x: 70, y: 30, rot: -150 }, { f: 30, ease: "linear", x: 76, y: 20, rot: -160 } ], launch: { vx: 3, vy: 7 }, hitstop: 12, impact: 3, gauge: { hit: 40 } }, sfx: "grab" },
        sp1: { kind: "special", name: "虎爪", stance: "stand", startup: 13, active: 1, recovery: 24, boxes: [], hit: null, spawn: [ { at: 14, projectile: "tsume", x: 60, y: 70 } ], sfx: "swingH" },
        sp2: { kind: "special", name: "飛びかかり", stance: "stand", startup: 15, active: 8, recovery: 18, landLag: 8, boxes: [ { f0: 16, f1: 23, x: 20, y: 40, w: 84, h: 80 } ], hit: { chip: 6, level: "high", effect: "stun", impact: 3, damage: 66, hitstun: 22, blockstun: 16, hitstop: 10, knock: { hit: 14, block: 18 }, gauge: { hit: 45, block: 22 } }, hunt: { need: 3, hit: { damage: 180, unblockable: true, hitstun: 0, effect: "launch", launch: { vx: 4.5, vy: 10.5 }, juggle: 0, hitstop: 22, impact: 4, knock: { hit: 0, block: 0 } } }, motion: [ { f0: 5, f1: 5, vx: 7.5, vy: 9.5 } ], invuln: [ { f0: 1, f1: 14, type: "proj" } ], trail: { from: "handF", color: "accent", width: 18, frames: 10 }, sfx: "swingH" },
        sp3: { kind: "special", name: "咆哮", stance: "stand", startup: 12, active: 8, recovery: 24, boxes: [ { f0: 13, f1: 20, x: 10, y: 10, w: 150, h: 160 } ], hit: { chip: 0, level: "mid", effect: "stun", impact: 3, damage: 34, hitstun: 26, blockstun: 18, hitstop: 10, knock: { hit: 40, block: 46 }, gauge: { hit: 40, block: 20 }, shieldMul: 7 }, invuln: [ { f0: 6, f1: 20, type: "proj" } ], sfx: "guardBreak" },
        super: { kind: "super", name: "大祓「白虎の牙」", stance: "stand", startup: 8, active: 30, recovery: 34, cost: 1000, flash: 40, boxes: [ { f0: 9, f1: 38, x: 20, y: 10, w: 104, h: 150 } ], motion: [ { f0: 9, f1: 36, vx: 3.4 } ], hit: { chip: 8, level: "mid", effect: "stun", impact: 2, damage: 34, hitstun: 18, blockstun: 18, hitstop: 4, knock: { hit: 2, block: 6 }, gauge: { hit: 0, block: 0 } }, multi: { count: 7, every: 4, final: { chip: 14, level: "mid", effect: "launch", impact: 4, damage: 130, hitstun: 0, blockstun: 24, hitstop: 18, knock: { hit: 0, block: 30 }, launch: { vx: 3, vy: 10 }, juggle: 0, gauge: { hit: 0, block: 0 } } }, invuln: [ { f0: 1, f1: 9, type: "all" } ], trail: { from: "handF", color: "accent", width: 20, frames: 10 }, sfx: "super" }
      },
      projectiles: {
        tsume: { life: 28, vx: 9.5, vy: 0, box: { x: -30, y: -34, w: 60, h: 68 }, hits: 1, maxActive: 1, priority: 1, hit: { chip: 5, level: "mid", effect: "stun", impact: 2, damage: 50, hitstun: 20, blockstun: 14, hitstop: 8, knock: { hit: 12, block: 12 }, gauge: { hit: 30, block: 15 }, mark: 1 }, look: { style: "slash", color: "accent", size: 0.9 } }
      },
      quotes: { select: "獲物は、逃がさない。", intro: [ "白虎、狩りを始める。" ], win: [ "狩り、完了。", "爪痕は、勲章にしておけ。" ], lose: [ "獲物に…逃げられた…" ] }
    }
  }
};
