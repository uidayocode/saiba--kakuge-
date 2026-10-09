window.GAME_DATA = {
  version: 1,
  texts: {
    title: "電脳巫女 弾幕祓",
    titleEn: "CYBER MIKO : DANMAKU HARAI",
    tagline: "神社のサーバーに、バグ妖怪が侵入した。",
    story: [
      "ご神体AIが暴走し、境内に",
      "バグ妖怪があふれ出した。",
      "電脳巫女よ、デバッグ(お祓い)せよ！"
    ],
    hints: [
      "Shiftで低速移動。当たり判定の点が見える",
      "ボムは被弾の直後でも間に合うことがある",
      "弾のすぐ近くを通ると、かすり点が入る",
      "お札は押しっぱなしで連射される",
      "残機とボムの数は難易度によって変わる"
    ],
    banners: {
      ready: "祓 開始",
      warning: "WARNING",
      purify: "浄化完了",
      clear: "STAGE CLEAR",
      gameover: "GAME OVER",
      spellFail: "ボーナス失敗"
    },
    glitchWords: ["SEGFAULT", "NULL", "404", "0xDEADBEEF", "STACK OVERFLOW"]
  },

  patterns: {
    bug_aim: {
      type: "aimed", bullet: { shape: "orb_s", color: "cyan" },
      speed: 130, count: 1, aimErrorDeg: 8, delay: 0, shots: 1, interval: 1.0
    },
    bug_rain: {
      type: "rain", bullet: { shape: "pix", color: "cyan" },
      speedMin: 120, speedMax: 170, count: 2, xMin: 10, xMax: 470,
      angleDeg: 90, angleJitterDeg: 5, delay: 0, shots: 6, interval: 1.0
    },
    fox_aim_fan: {
      type: "aimed", bullet: { shape: "orb_m", color: "orange" },
      speed: 150, count: 3, spreadDeg: 30, aimErrorDeg: 0, delay: 0, shots: 2, interval: 0.6
    },
    fox_spiral: {
      type: "spiral", bullet: { shape: "orb_s", color: "yellow" },
      speed: 100, arms: 2, angleStep: 18, startDeg: 90, delay: 0, shots: 8, interval: 0.25
    },
    kappa_drop: {
      type: "fan", bullet: { shape: "orb_s", color: "blue" },
      speed: 50, accel: 70, minSpeed: 40, maxSpeed: 260,
      count: 5, spreadDeg: 50, centerDeg: 90, delay: 0, shots: 1, interval: 1.0
    },
    kappa_sweep: {
      type: "fan", bullet: { shape: "pix", color: "blue" },
      speed: 110, count: 4, spreadDeg: 60, centerDeg: 90, sweepPerShot: 15,
      delay: 0, shots: 5, interval: 0.5
    },
    oni_ring_turn: {
      type: "ring", bullet: { shape: "orb_m", color: "red" },
      speed: 80, turn: 25, count: 8, offsetDeg: 0, rotatePerShot: 7,
      delay: 0, shots: 2, interval: 1.2
    },
    oni_split: {
      type: "aimed", bullet: { shape: "orb_l", color: "orange" },
      speed: 110, count: 1, delay: 0, shots: 2, interval: 1.5,
      split: { after: 1.0, count: 8, speed: 80, spreadDeg: 360, shape: "orb_s", color: "orange" }
    },
    zombie_random: {
      type: "random", bullet: { shape: "pix", color: "violet" },
      count: 6, angleMinDeg: 40, angleMaxDeg: 140, speedMin: 80, speedMax: 150,
      delay: 0, shots: 3, interval: 1.2
    },

    boss_p1_aim: {
      type: "aimed", bullet: { shape: "orb_m", color: "pink" },
      speed: 130, count: 5, spreadDeg: 40, aimErrorDeg: 4, delay: 0.5, shots: 8, interval: 1.0
    },
    boss_p1_ring: {
      type: "ring", bullet: { shape: "orb_m", color: "white" },
      speed: 75, count: 14, offsetDeg: 0, rotatePerShot: 6, delay: 0.6, shots: 6, interval: 0.9
    },
    boss_p2_spiral_a: {
      type: "spiral", bullet: { shape: "orb_s", color: "cyan" },
      speed: 100, arms: 3, angleStep: 9, startDeg: 90, delay: 0, shots: 30, interval: 0.15
    },
    boss_p2_spiral_b: {
      type: "spiral", bullet: { shape: "orb_m", color: "violet" },
      speed: 90, arms: 2, angleStep: 14, startDeg: 0, delay: 0, shots: 24, interval: 0.2
    },
    boss_p2_ring: {
      type: "ring", bullet: { shape: "orb_s", color: "cyan" },
      speed: 95, count: 18, offsetDeg: 5, aimBase: true, rotatePerShot: 10,
      delay: 0, shots: 6, interval: 1.0
    },
    boss_p3_rain: {
      type: "rain", bullet: { shape: "pix", color: "green" },
      speedMin: 150, speedMax: 250, count: 3, xMin: 10, xMax: 470,
      angleDeg: 90, angleJitterDeg: 6, delay: 0, shots: 30, interval: 0.12
    },
    boss_p3_aim: {
      type: "aimed", bullet: { shape: "orb_m", color: "yellow" },
      speed: 160, count: 3, spreadDeg: 24, aimErrorDeg: 3, layers: 2, speedStep: 40,
      delay: 0, shots: 10, interval: 1.0
    },
    boss_p3_aim_accel: {
      type: "aimed", bullet: { shape: "orb_s", color: "blue" },
      speed: 100, accel: 80, minSpeed: 60, maxSpeed: 300, count: 2, spreadDeg: 20,
      delay: 0.5, shots: 12, interval: 0.7
    },
    boss_p4_fan_sweep: {
      type: "fan", bullet: { shape: "orb_m", color: "red" },
      speed: 150, count: 9, spreadDeg: 120, centerDeg: 90, sweepPerShot: 22,
      delay: 0, shots: 20, interval: 0.35
    },
    boss_p4_random: {
      type: "random", bullet: { shape: "needle", color: "gold" },
      count: 6, angleMinDeg: 30, angleMaxDeg: 150, speedMin: 120, speedMax: 230,
      delay: 0, shots: 10, interval: 0.4
    },
    boss_p4_split: {
      type: "aimed", bullet: { shape: "orb_l", color: "orange" },
      speed: 140, count: 1, delay: 0.3, shots: 6, interval: 1.2,
      split: { after: 0.9, count: 12, speed: 90, spreadDeg: 360, shape: "orb_m", color: "red" }
    }
  },

  enemies: {
    bug: {
      name: "バグ虫", shape: "bug", color: "cyan", hp: 2, radius: 9, score: 50,
      move: { type: "straight", vx: 0, vy: 120 },
      attacks: [
        { pattern: "bug_aim", start: 1.0, repeatEvery: 2.0 },
        { pattern: "bug_rain", start: 4.0, repeatEvery: 8.0 }
      ],
      drops: { power: 0, point: 1 }
    },
    fox: {
      name: "無限ループ狐", shape: "fox", color: "orange", hp: 8, radius: 14, score: 200,
      move: { type: "sine", vy: 60, amp: 60, freq: 0.5, phaseDeg: 0 },
      attacks: [
        { pattern: "fox_aim_fan", start: 1.2, repeatEvery: 2.4 },
        { pattern: "fox_spiral", start: 2.5, repeatEvery: 5.0 }
      ],
      drops: { power: 1, point: 1 }
    },
    kappa: {
      name: "メモリリーク河童", shape: "kappa", color: "green", hp: 10, radius: 13, score: 250,
      move: { type: "stopgo", vy: 120, toY: 150, stay: 3.0, exitVx: 0, exitVy: -100 },
      attacks: [
        { pattern: "kappa_drop", start: 1.8, repeatEvery: 1.8 },
        { pattern: "kappa_sweep", start: 2.5, repeatEvery: 6.0 }
      ],
      drops: { power: 1, point: 2 }
    },
    oni404: {
      name: "404鬼", shape: "oni404", color: "red", hp: 14, radius: 16, score: 400,
      move: { type: "arc", vx: 40, vy: 90, turnDeg: 35 },
      attacks: [
        { pattern: "oni_ring_turn", start: 1.0, repeatEvery: 3.5 },
        { pattern: "oni_split", start: 2.0, repeatEvery: 4.0 }
      ],
      drops: { power: 2, point: 1 }
    },
    zombie: {
      name: "ゾンビプロセス", shape: "zombie", color: "violet", hp: 30, radius: 20, score: 600,
      move: { type: "straight", vx: 0, vy: 70 },
      attacks: [
        { pattern: "zombie_random", start: 1.5, repeatEvery: 4.0 }
      ],
      drops: { power: 3, point: 2 }
    }
  },

  stage: {
    id: "stage1",
    name: "第一面",
    subtitle: "境内サーバー・参道",
    timeline: [
      { t: 0.0, type: "banner", text: "STAGE 1  参道のバグ祓い", duration: 2.5 },
      { t: 1.0, type: "spawn", enemy: "bug", x: 40, count: 4, interval: 0.5, dx: 50, mirror: true },
      { t: 5.0, type: "spawn", enemy: "bug", x: 240, count: 3, interval: 0.6, dx: 0,
        move: { type: "sine", vy: 120, amp: 80, freq: 0.8, phaseDeg: 0 } },
      { t: 10.0, type: "spawn", enemy: "fox", x: 120, count: 2, interval: 1.2, dx: 240 },
      { t: 16.0, type: "spawn", enemy: "fox", x: 60, count: 1, interval: 0.8, dx: 0, mirror: true },
      { t: 20.0, type: "spawn", enemy: "fox", x: 210, count: 2, interval: 0.7, dx: 60 },
      { t: 26.0, type: "spawn", enemy: "kappa", x: 120, count: 2, interval: 1.0, dx: 240 },
      { t: 32.0, type: "spawn", enemy: "kappa", x: 240, count: 1, interval: 0.8, dx: 0 },
      { t: 36.0, type: "spawn", enemy: "kappa", x: 60, count: 2, interval: 0.8, dx: 360 },
      { t: 41.0, type: "spawn", enemy: "oni404", x: 60, count: 2, interval: 1.5, dx: 360 },
      { t: 46.0, type: "spawn", enemy: "oni404", x: 180, count: 1, interval: 0.8, dx: 0, mirror: true },
      { t: 51.0, type: "spawn", enemy: "oni404", x: 100, count: 2, interval: 1.0, dx: 60 },
      { t: 55.0, type: "spawn", enemy: "zombie", x: 240, count: 1, interval: 0.8, dx: 0 },
      { t: 56.0, type: "spawn", enemy: "bug", x: 60, count: 3, interval: 0.6, dx: 70, mirror: true },
      { t: 58.0, type: "spawn", enemy: "zombie", x: 120, count: 2, interval: 1.0, dx: 240 },
      { t: 60.0, type: "spawn", enemy: "bug", x: 200, count: 3, interval: 0.5, dx: 40 },
      { t: 62.0, type: "boss", boss: "mitama_zero", waitClear: true }
    ]
  },

  bosses: {
    mitama_zero: {
      name: "暴走御神体AI ミタマ零号",
      shape: "goshintai",
      color: "pink",
      radius: 28,
      score: 30000,
      entry: { x: 240, y: 130, time: 2.0 },
      introDialogue: "boss_intro",
      defeatDialogue: "boss_defeat",
      phases: [
        {
          id: "p1", name: null, hp: 600, timeLimit: 25, bonus: 0, color: "pink", intro: 1.5,
          move: { type: "still", x: 240, y: 130 },
          sequence: [
            { patterns: ["boss_p1_aim"], hold: 2.0 },
            { patterns: ["boss_p1_ring"], hold: 2.5 }
          ]
        },
        {
          id: "p2", name: "呪符「無限ループ参照」", hp: 800, timeLimit: 35, bonus: 10000, color: "cyan", intro: 1.5,
          move: { type: "sway", y: 130, ampX: 100, freq: 0.12 },
          sequence: [
            { patterns: ["boss_p2_spiral_a"], hold: 2.5 },
            { patterns: ["boss_p2_ring"], hold: 2.0 },
            { patterns: ["boss_p2_spiral_b"], hold: 2.5 }
          ]
        },
        {
          id: "p3", name: "禁呪「全件DELETE」", hp: 900, timeLimit: 35, bonus: 12000, color: "green", intro: 1.5,
          move: {
            type: "hop",
            points: [{ x: 110, y: 150 }, { x: 370, y: 150 }, { x: 240, y: 100 }],
            every: 4.0, travel: 1.2
          },
          sequence: [
            { patterns: ["boss_p3_rain"], hold: 2.5 },
            { patterns: ["boss_p3_aim", "boss_p3_aim_accel"], hold: 2.0 }
          ]
        },
        {
          id: "p4", name: "終曲「強制終了(SIGKILL)」", hp: 1000, timeLimit: 40, bonus: 15000, color: "red", intro: 1.5,
          move: { type: "sway", y: 120, ampX: 120, freq: 0.15 },
          sequence: [
            { patterns: ["boss_p4_fan_sweep"], hold: 2.5 },
            { patterns: ["boss_p4_random"], hold: 2.0 },
            { patterns: ["boss_p4_split"], hold: 2.5 }
          ]
        }
      ]
    }
  },

  dialogues: {
    boss_intro: [
      { who: "boss", text: "ぜんぶ…けす…ぜんぶ…" },
      { who: "miko", text: "ご神体、いま祓います！" },
      { who: "boss", text: "再起動は…させない…" }
    ],
    boss_defeat: [
      { who: "boss", text: "セーブ…されて…いな…" },
      { who: "miko", text: "浄化完了。再起動どうぞ" },
      { who: "miko", text: "次は、ちゃんと保存しておくこと" }
    ]
  },

  omikuji: {
    categories: [
      { id: "wish", label: "願望" },
      { id: "deploy", label: "デプロイ" },
      { id: "bug", label: "バグ" },
      { id: "wait", label: "待ち人" }
    ],
    maxRankIfNotCleared: "kichi",
    ranks: [
      {
        id: "daikichi", label: "大吉", reading: "だいきち", color: "gold",
        minScore: { easy: 220000, oni: 330000 },
        summary: "本番環境も神の加護あり",
        fortunes: {
          wish: "全て叶う。コードも一発で通る",
          deploy: "金曜の夜でも障害が起きない",
          bug: "再現しない。そっと消えていく",
          wait: "来る。しかもレビュー付きで"
        }
      },
      {
        id: "chukichi", label: "中吉", reading: "ちゅうきち", color: "cyan",
        minScore: { easy: 170000, oni: 260000 },
        summary: "ログを丁寧に残せば吉",
        fortunes: {
          wish: "願いは少し遅れて届く",
          deploy: "ロールバック手順を一度確認せよ",
          bug: "一つ直すと一つ増える。想定内",
          wait: "そのうち返事が来る。たぶん"
        }
      },
      {
        id: "shokichi", label: "小吉", reading: "しょうきち", color: "green",
        minScore: { easy: 130000, oni: 200000 },
        summary: "小さな改善が大きな安定に",
        fortunes: {
          wish: "小さな願いから順番に叶う",
          deploy: "まずテスト環境で試すと吉",
          bug: "見つかるが、致命的ではない",
          wait: "返信は来る。少し待て"
        }
      },
      {
        id: "kichi", label: "吉", reading: "きち", color: "blue",
        minScore: { easy: 90000, oni: 140000 },
        summary: "コミットメッセージは丁寧に",
        fortunes: {
          wish: "努力が実る。ほどほどに",
          deploy: "デプロイは平日の昼に",
          bug: "原因は意外と身近にある",
          wait: "連絡が来る。通知を確認せよ"
        }
      },
      {
        id: "suekichi", label: "末吉", reading: "すえきち", color: "white",
        minScore: { easy: 55000, oni: 85000 },
        summary: "明日の自分に期待しよう",
        fortunes: {
          wish: "願いは保留。まず寝よう",
          deploy: "今日はやめておくのが吉",
          bug: "ログを見れば道は見える",
          wait: "今は来ない。夕方には来る"
        }
      },
      {
        id: "kyo", label: "凶", reading: "きょう", color: "orange",
        minScore: { easy: 25000, oni: 40000 },
        summary: "本番環境に触るべからず",
        fortunes: {
          wish: "願いは別の神社へ持っていけ",
          deploy: "金曜日のリリースは見送り",
          bug: "そのバグ、仕様かもしれない",
          wait: "来ない。でも忘れられてもいない"
        }
      },
      {
        id: "daikyo", label: "大凶", reading: "だいきょう", color: "violet",
        minScore: { easy: 0, oni: 0 },
        summary: "最悪の次は、確実に上がる",
        fortunes: {
          wish: "まず保存せよ。次は必ず叶う",
          deploy: "月曜まで待てば、きっと大丈夫",
          bug: "仕様です、と言い張れ。勝てる",
          wait: "来ない。でも次がある、前向きに"
        }
      }
    ]
  }
};
