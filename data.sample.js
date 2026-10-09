window.GAME_DATA = {
  version: 1,
  texts: {
    title: "電脳巫女 弾幕祓",
    titleEn: "CYBER MIKO : DANMAKU HARAI",
    tagline: "神社のサーバーに、バグ妖怪が侵入した。",
    story: ["ご神体AIが暴走し、境内に", "バグ妖怪があふれ出した。", "電脳巫女よ、デバッグ(お祓い)せよ！"],
    hints: ["Shiftで低速移動。当たり判定の点が見える", "ボムは被弾の直後でも間に合うことがある"],
    banners: { ready: "祓 開始", warning: "WARNING", purify: "浄化完了",
               clear: "STAGE CLEAR", gameover: "GAME OVER", spellFail: "ボーナス失敗" },
    glitchWords: ["SEGFAULT", "NULL", "404", "0xDEADBEEF"]
  },
  patterns: {
    fox_aim3: { type: "aimed", bullet: { shape: "orb_m", color: "orange" },
      speed: 150, count: 3, spreadDeg: 30, aimErrorDeg: 0, delay: 0, shots: 3, interval: 0.6 },
    delete_rain: { type: "rain", bullet: { shape: "pix", color: "green" },
      speedMin: 160, speedMax: 260, count: 3, xMin: 10, xMax: 470, angleDeg: 90, angleJitterDeg: 6,
      delay: 0, shots: 24, interval: 0.12 },
    ring_drift: { type: "ring", bullet: { shape: "orb_m", color: "pink" },
      speed: 110, count: 20, offsetDeg: 0, rotatePerShot: 9, delay: 0.3, shots: 4, interval: 0.3 }
  },
  enemies: {
    loop_fox: { name: "無限ループ狐", shape: "fox", color: "orange", hp: 8, radius: 14, score: 200,
      move: { type: "stopgo", vy: 120, toY: 140, stay: 3.0, exitVx: 0, exitVy: -100 },
      attacks: [ { pattern: "fox_aim3", start: 1.2, repeatEvery: 1.8 } ],
      drops: { power: 1, point: 1 } }
  },
  stage: {
    id: "stage1", name: "第一面", subtitle: "境内サーバー・参道",
    timeline: [
      { t: 1.0, type: "banner", text: "STAGE 1  参道のバグ祓い", duration: 2.5 },
      { t: 3.0, type: "spawn", enemy: "loop_fox", x: 100, count: 3, interval: 0.7, dx: 60, mirror: true },
      { t: 62.0, type: "boss", boss: "mitama_zero", waitClear: true }
    ]
  },
  bosses: {
    mitama_zero: {
      name: "暴走御神体AI ミタマ零号", shape: "goshintai", color: "pink", radius: 28, score: 30000,
      entry: { x: 240, y: 130, time: 2.0 },
      introDialogue: "boss_intro", defeatDialogue: "boss_defeat",
      phases: [
        { id: "p3", name: "禁呪「全件DELETE」", hp: 900, timeLimit: 35, bonus: 12000, color: "green", intro: 1.5,
          move: { type: "sway", y: 130, ampX: 100, freq: 0.12 },
          sequence: [ { patterns: ["delete_rain"], hold: 2.0 }, { patterns: ["ring_drift"], hold: 1.8 } ] }
      ]
    }
  },
  dialogues: {
    boss_intro:  [ { who: "boss", text: "ぜんぶ…けす…ぜんぶ…" }, { who: "miko", text: "ご神体、いま祓います！" } ],
    boss_defeat: [ { who: "boss", text: "セーブ…されて…いな…" }, { who: "miko", text: "浄化完了。再起動どうぞ" } ]
  },
  omikuji: {
    categories: [ { id: "wish", label: "願望" }, { id: "deploy", label: "デプロイ" },
                  { id: "bug", label: "バグ" }, { id: "wait", label: "待ち人" } ],
    maxRankIfNotCleared: "kichi",
    ranks: [
      { id: "daikichi", label: "大吉", reading: "だいきち", color: "gold", minScore: { easy: 220000, oni: 330000 },
        summary: "本番環境も神の加護あり",
        fortunes: { wish: "全て叶う。コードも通る", deploy: "金曜夜でも事故らない",
                    bug: "再現しない。そっと消える", wait: "来る。しかもレビュー付き" } },
      { id: "daikyo", label: "大凶", reading: "だいきょう", color: "violet", minScore: { easy: 0, oni: 0 },
        summary: "バックアップを取るべし",
        fortunes: { wish: "まず保存せよ", deploy: "月曜まで待て",
                    bug: "仕様です、と言い張れ", wait: "来ない。でも次がある" } }
    ]
  }
};
