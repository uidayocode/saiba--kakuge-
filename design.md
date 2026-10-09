# 『電脳巫女 弾幕祓（でんのうみこ だんまくばらい）』 実装設計書 v1.0

対象ファイル: `game.html`(Sonnet担当) / `data.js`(Haiku担当)
目的: 2人が互いのファイルを見なくても作業できるよう、**インターフェース(データ契約)** と **ゲーム数値** を先に固定する。

---

## 0. 全体方針と共通ルール

### 0.1 座標・単位(両者共通の契約)
| 項目 | 規約 |
|---|---|
| 論理解像度 | 480 x 640 px(原点は左上、x右+、y下+) |
| 時間 | すべて**秒**(s)。タイムラインも秒基準 |
| 速度 | px/s、加速度 px/s²、角速度 deg/s |
| 角度 | **度(deg)**。0=右、90=下、180=左、270=上(時計回り+)。vx=cos, vy=sin |
| 自機狙い | 発射位置から自機へのatan2 |
| 色 | 色トークン名(0.2参照)で指定。16進は書かない |
| 画面外 | 弾は画面外40px、敵は画面外60pxで消滅(入場前の敵は対象外) |

### 0.2 色トークン(data.jsとゲーム側で共通の列挙)
`pink #ff4fa3` / `cyan #19f3ff` / `yellow #ffe94d` / `green #7cff6b` / `violet #a56bff` / `red #ff3b5c` / `orange #ffa13c` / `white #f4f7ff` / `gold #ffd24a` / `blue #4d7cff`

### 0.3 弾の形状トークン(列挙。エンジン側で描画と当たり半径を持つ)
| shape | 見た目 | 描画サイズ | 当たり半径(px) |
|---|---|---|---|
| `orb_s` | 小玉 | 半径5 | 3 |
| `orb_m` | 中玉 | 半径8 | 5 |
| `orb_l` | 大玉 | 半径14 | 9 |
| `needle` | 針(進行方向に回転) | 3x12 | 2.5 |
| `pix` | 角ばったデータ片(四角) | 7x7 | 3 |

当たり判定は「自機半径 + 弾の当たり半径」の円判定。描画より判定が小さいので初心者向き。

### 0.4 敵の形状トークン(`enemy.shape`の列挙)
`fox`(無限ループ狐) / `kappa`(メモリリーク河童) / `oni404`(404鬼) / `bug`(バグ虫、小型) / `zombie`(ゾンビプロセス、頑丈) / `goshintai`(ボス専用)。未知の値は菱形の汎用描画にフォールバックする。

### 0.5 作業分担と結合手順
1. 両者はこの設計書の3章(データスキーマ)と7章(サンプル)だけを共有すれば並行作業できる。
2. Sonnetは7章のサンプルをそのまま仮の`data.js`として使って開発を始める。
3. エンジンは起動時に `validateGameData(GAME_DATA)` を実行し、スキーマ違反を**コンソールとデバッグ画面に全件列挙**する(致命的なものは画面に「DATA ERROR」を出す)。Haikuは書き終えたらこれを通す。
4. `data.js`は**純粋なデータのみ**(関数・外部参照・`eval`禁止)。UTF-8。`window.GAME_DATA = {...};` の1文のみ。
5. 読み込みは `<script src="data.js" charset="utf-8"></script>` を本体`<script>`より前に置く。

---

## 1. ゲームの状態遷移

### 1.1 シーン一覧
```
BOOT ─(任意キー: AudioContext起動)→ TITLE
TITLE ─(Z/Enter)→ DIFFICULTY ─(Z/Enter)→ PLAY
TITLE ─(放置30秒)→ RANKING(アトラクト) ─(任意キー/20秒)→ TITLE
PLAY ─(ボス撃破→クリア演出)→ RESULT
PLAY ─(残機0で被弾→GAME OVER演出)→ RESULT
RESULT ─(Z)→ NAME_ENTRY(10位以内のとき) / RANKING(圏外のとき)
RESULT ─(X/Esc)→ TITLE(記録せず戻る。ヒント表示あり)
NAME_ENTRY ─(Z/Enter 確定)→ RANKING
RANKING ─(Z/Enter)→ TITLE   ─(R)→ PLAY(同じ難易度ですぐ再挑戦)
```
- DIFFICULTYでXまたはEsc → TITLE。
- PAUSEはPLAY上のオーバーレイ(Esc)。メニュー: 再開 / 最初から / タイトルへ(上下+Z)。ウィンドウのblur/visibilitychangeでも自動ポーズ。

### 1.2 PLAYシーン内サブ状態
| サブ状態 | 内容 | 次へ |
|---|---|---|
| `READY` | 「祓 開始」1.5秒、自機が下から入場 | `STAGE` |
| `STAGE` | タイムライン進行(道中) | `boss`イベント到達かつ(`waitClear`なら敵ゼロ、または+8秒)で`BOSS_WARNING` |
| `BOSS_WARNING` | 赤い「WARNING」点滅2.5秒、弾は全消去 | `BOSS_INTRO` |
| `BOSS_INTRO` | ボス入場(`entry.time`秒)+イントロ会話(各行2.5秒、Zでスキップ)。無敵 | `BOSS_FIGHT` |
| `BOSS_FIGHT` | フェーズ1→N。フェーズ切替は1.5秒の間(弾はアイテム化) | 最終フェーズ撃破で`BOSS_DEFEAT` |
| `BOSS_DEFEAT` | 0.6倍スロー1秒、爆発、**「浄化完了」** 表示、撃破会話 | `STAGE_CLEAR` |
| `STAGE_CLEAR` | ボーナス集計3秒(Zで短縮) | RESULTへ |
| `GAME_OVER` | 「GAME OVER」1.5秒(グリッチ) | RESULTへ |

### 1.3 入力の取りこぼし対策
- 各シーン入場から0.5秒は決定キー入力を無視(連打でショット→次の画面を誤って飛ばすのを防ぐ)。
- キーリピートは無視(`event.repeat`)。メニューの上下のみ長押しリピートを許可。

---

## 2. ゲームシステム仕様(数値)

### 2.1 自機(電脳巫女)
| 項目 | 値 |
|---|---|
| 初期位置 | (240, 560) |
| 移動可能範囲 | x 14〜466, y 20〜620 |
| 通常速度 / 低速(Shift) | 260 px/s / 120 px/s(斜めは正規化) |
| 当たり半径 | 見習い 2.0 / 鬼 3.0 px(描画は白点r=3+朱色の縁。低速時のみ表示。ただし被弾直後・ボム中は常時表示) |
| グレイズ半径 | 見習い 20 / 鬼 16 px(弾の当たり半径に加算した距離で判定) |
| アイテム回収半径 | 通常 36 / 低速 56 px。画面上部(y<150)に入ると全アイテム自動回収 |
| 被弾後の無敵 | 見習い 3.0s / 鬼 2.0s(点滅) |
| 救済(ボム受付) | 被弾判定後、見習い 0.25s / 鬼 0.12s以内にXでボムすれば被弾取り消し |
| リスポーン | 被弾確定で自機は消え0.6s後に(240,600)から(240,560)へ復帰 |

### 2.2 ショット(お札)とパワー
- Z/Space長押しでオート連射。発射間隔0.07s、弾速1000 px/s、1発のダメージ1.0。
- パワーは0〜100の連続値(`P`アイテム1個=+5)。レベルは `floor(power/25)+1`(1〜5、100でLv5)。
- 初期パワー: 見習い 50(Lv3) / 鬼 25(Lv2)。被弾確定で-25(Pアイテムを2個ばらまく)。ボス戦突入時に最低50を保証。

| Lv | ショット構成(x軸オフセット px、角度offset deg) |
|---|---|
| 1 | 2発 直進(-8, +8) |
| 2 | 3発 直進(-10, 0, +10) |
| 3 | 4発 直進(-14, -5, +5, +14) |
| 4 | Lv3 + 斜め2発(±10°、ダメージ0.6) |
| 5 | Lv3 + 斜め4発(±8°, ±18°、ダメージ0.6) |

(おおよその火力 Lv3で約53/秒。ボスHPはこの値を前提にデータ側で設計する)

### 2.3 ボム「大祓(おおはらえ)」
- Xで発動(残ボム>0かつ発動中でない)。持続2.0秒、無敵3.0秒(発動開始から)。
- 自機位置から半径0→520pxの浄化リングが0.6秒で拡大。リング内の弾は即消去(それ以降も2.0秒間、新しく出た弾も消し続ける)。消した弾は「火花」になり1発あたり基礎10点。
- ダメージ: 画面内の通常敵に毎秒40、ボスに毎秒25。
- そのフェーズ中に被弾 or ボムを使うと、そのスペルの撃破ボーナスは無効。
- ボム数: 見習い 3 / 鬼 2。被弾確定で初期値に戻る(ボムアイテムは無し)。

### 2.4 残機
- 「残機」は追加ライフ数。0の状態で被弾確定するとゲームオーバー(コンティニュー無し)。
- 初期残機: 見習い **5** / 鬼 **2**。上限7。エクステンド(+1)は**表示スコア**が 60,000 と 150,000 に達したとき。
- 被弾確定時は画面内の敵弾を**全消去**する(次の弾に即再被弾しないための救済)。

### 2.5 スコア計算
すべての得点は `addScore(基礎点)` を通し、`基礎点 x scoreMul(難易度)` を四捨五入して加算する。

| 項目 | 基礎点 |
|---|---|
| 敵撃破 | `enemy.score`(データ定義) |
| ショット命中 | 1ヒット +5 |
| グレイズ | 弾1発につき1回 +50(同時にグレイズ数+1) |
| Pアイテム | 取得時 +0(満タン時は+300) |
| 点アイテム(青い四角) | +300 |
| 弾消去(フェーズ切替・ボム) | 弾1発 +10 |
| スペル撃破ボーナス | `phase.bonus x (0.5 + 0.5 x 残り時間/制限時間)`。被弾・ボム使用なしの場合のみ |
| ボス撃破 | `boss.score`(標準30,000) |
| ステージクリア | 残機 x 20,000 + 残ボム x 5,000 + 全体でノーミスなら +50,000 |

アイテムドロップ: 敵撃破時に `drops.power` 個の`P`(赤い札型)と`drops.point`個の点アイテムが散る。アイテムは0.3秒上昇→下降(最大落下速度150 px/s)。

### 2.6 難易度テーブル(エンジン定数。弾幕データは1種類で、倍率で調整)
| キー | 見習い(`easy`) | 鬼(`oni`) |
|---|---|---|
| ラベル / 説明 | 見習い / はじめての方へ | 鬼 / 上級者向け |
| 初期残機 / ボム | 5 / 3 | 2 / 2 |
| 自機当たり半径 / グレイズ半径 | 2.0 / 20 | 3.0 / 16 |
| `bulletSpeedMul` | 0.75 | 1.15 |
| `bulletCountMul` | 0.7 | 1.3 |
| `intervalMul`(発射間隔) | 1.25 | 0.85 |
| `enemyHpMul` | 0.9 | 1.2 |
| `bossHpMul` | 0.85 | 1.15 |
| `bossTimeMul`(制限時間) | 1.2 | 1.0 |
| `scoreMul` | 1.0 | 1.5 |
| 初期パワー | 50 | 25 |

弾数の補正: `count = max(最小値, round(count x bulletCountMul))`。最小値は ring=6、fan/aimed=1、spiral の arms=1、random/rain=1。弾速は `speed x bulletSpeedMul`(`accel`にも同倍率)。間隔は `interval x intervalMul`(下限1/60s)。

### 2.7 ボスのダメージと勝敗
- ボス/敵はy<8の間(画面外)は無敵。ボスはフェーズ切替中・イントロ中も無敵。
- フェーズはHP0で撃破、または制限時間切れで**次のフェーズへ(撃破扱いではない=ボーナス無し)**。時間切れでボス敗北にはならない(初心者対策)。
- 残り5秒から制限時間表示が赤になり、1秒ごとにtickを鳴らす。

### 2.8 目安の弾数(データ作成の上限)
画面内の敵弾: 道中(見習い基準) ≦150、ボス通常 ≦250、スペル ≦400(鬼でも ≦700)。プール容量は1600。

### 2.9 運勢(おみくじ)の判定
- `score >= minScore[難易度]` を満たす最初の運勢(上位から順に判定)。
- クリアできていない場合は `maxRankIfNotCleared`(標準=`kichi`)より上位は出さない。
- しきい値は暫定。実機プレイで調整できるよう**data.jsのみで変更可能**にする。

---

## 3. data.js スキーマ(厳密)

### 3.1 トップレベル
```
window.GAME_DATA = {
  version: 1,
  texts:     { ... },            // 3.2
  patterns:  { "<id>": Pattern }, // 3.3
  enemies:   { "<id>": Enemy },   // 3.4
  stage:     Stage,               // 3.5
  bosses:    { "<id>": Boss },    // 3.6
  dialogues: { "<id>": Line[] },  // 3.7
  omikuji:   Omikuji              // 3.8
};
```
IDは `[a-z0-9_]+` の半角英数小文字。IDの参照先が存在しない場合は検証エラー。

### 3.2 texts(演出テキスト。省略可。省略時はエンジン既定文)
| フィールド | 型 | 説明 / 例 |
|---|---|---|
| `title` | string | `"電脳巫女 弾幕祓"` |
| `titleEn` | string | `"CYBER MIKO : DANMAKU HARAI"` |
| `tagline` | string | `"神社のサーバーに、バグ妖怪が侵入した。"` |
| `story` | string[] | 難易度選択画面のあらすじ。各行24字以内、最大4行 |
| `hints` | string[] | タイトル/ランキング下部のTIPS。各行30字以内、3〜6個 |
| `banners` | object | `{ ready:"祓 開始", warning:"WARNING", purify:"浄化完了", clear:"STAGE CLEAR", gameover:"GAME OVER", spellFail:"ボーナス失敗" }` |
| `glitchWords` | string[] | 被弾時にグリッチ上に一瞬出す文字。例 `["SEGFAULT","NULL","404","0xDEADBEEF"]`(4〜8個) |

### 3.3 Pattern(弾幕パターン)
`patterns` は `id → Pattern` の辞書。1つのPatternは「発射器(エミッタ)」1個の挙動を表す。

**共通フィールド**
| フィールド | 型 | 単位 | 必須 | 既定 | 説明 |
|---|---|---|---|---|---|
| `type` | string | - | 必須 | - | `ring` `spiral` `aimed` `fan` `random` `rain` |
| `bullet` | `{shape, color}` | - | 必須 | - | 0.3 / 0.2の列挙 |
| `speed` | number | px/s | 型により必須 | - | 初速。`random` `rain` では不使用(speedMin/Max) |
| `accel` | number | px/s² | 任意 | 0 | 加速(負で減速)。速度は `minSpeed`〜`maxSpeed`で制限 |
| `minSpeed` / `maxSpeed` | number | px/s | 任意 | 20 / 600 | 加減速の下限・上限 |
| `turn` | number | deg/s | 任意 | 0 | 弾が曲がる角速度(正=時計回り) |
| `delay` | number | s | 任意 | 0 | 開始から最初の発射までの待ち |
| `shots` | int | 回 | 任意 | 1 | 発射回数(1回の発射=後述の弾群を同時に出す) |
| `interval` | number | s | 任意 | 0.5 | 発射と発射の間隔(下限0.03) |
| `split` | object | - | 任意 | なし | 下記。1段階のみ(子弾は分裂しない) |

`split`: `{ after: s, count: int, speed: px/s, spreadDeg?: deg(既定360), shape?, color? }`
弾が生まれて`after`秒後に、その位置から`count`発の子弾を放射状(`spreadDeg`の扇、中心は元弾の進行方向、360なら全周)に出して元弾は消える。

**型ごとの追加フィールド**
| type | フィールド(型・単位・既定) | 1回の発射で出る弾 |
|---|---|---|
| `ring` | `count` int(必須,>=3) / `offsetDeg` deg(0) / `rotatePerShot` deg(0)=発射ごとに回転 / `aimBase` bool(false)=trueなら基準角を自機狙いにして`offsetDeg`を加算 | `count`発を360°等間隔 |
| `spiral` | `arms` int(1) / `angleStep` deg(必須)=発射ごとの回転量 / `startDeg` deg(90) | `arms`発(360/arms間隔)。基準角は `startDeg + angleStep x 発射回数` |
| `aimed` | `count` int(1)=n-way / `spreadDeg` deg(0)=全体の開き / `layers` int(1)=速度違いの重ね数 / `speedStep` px/s(0)=層ごとの速度加算 / `aimErrorDeg` deg(0)=±のランダム誤差 | 自機方向を中心に`count`発 x `layers`層 |
| `fan` | `count` int(必須) / `spreadDeg` deg(必須) / `centerDeg` deg(90) / `sweepPerShot` deg(0)=発射ごとに中心が動く / `aimBase` bool(false)=trueなら`centerDeg`を自機狙いからのオフセットにする | `centerDeg`中心の扇に`count`発(1発なら中心のみ) |
| `random` | `count` int(1) / `angleMinDeg` deg(20) / `angleMaxDeg` deg(160) / `speedMin` px/s(必須) / `speedMax` px/s(必須) / `spawnJitterX` px(0)=発射位置x±ランダム | 角度・速度が乱数の`count`発 |
| `rain` | `count` int(1) / `xMin` px(10) / `xMax` px(470) / `angleDeg` deg(90) / `angleJitterDeg` deg(0) / `speedMin` px/s(必須) / `speedMax` px/s(必須) | 発射元に関係なく画面上端(y=-10)のランダムxから`count`発 |

**エミッタの解釈ルール(エンジン実装者向け)**
- 発射位置は「持ち主(敵/ボス)の現在位置 + 呼び出し側のoriginOffset」。持ち主が倒れたらエミッタは破棄(既に出た弾は残る)。`rain`だけは位置を使わない。
- n回目(0始まり)の発射時刻 = `delay + n x interval`。`shots`回で終了。
- 難易度倍率(2.6)は弾生成時に適用する。

### 3.4 Enemy(雑魚敵)
| フィールド | 型 | 単位 | 必須 | 説明 |
|---|---|---|---|---|
| `name` | string | - | 必須 | 表示名(デバッグ・図鑑用)。例 `"無限ループ狐"` |
| `shape` | string | - | 必須 | 0.4の列挙 |
| `color` | string | - | 必須 | 0.2の色トークン |
| `hp` | number | - | 必須 | 基本HP(Lv3ショット1発=1ダメージ基準) |
| `radius` | number | px | 必須 | 被弾(自機ショットを受ける)半径。描画サイズもこれ基準 |
| `score` | int | 点 | 必須 | 撃破基礎点 |
| `move` | Move | - | 必須 | 下記 |
| `attacks` | Attack[] | - | 任意 | 空なら撃たない |
| `drops` | `{power:int, point:int}` | 個 | 任意 | 既定 `{power:0, point:1}` |

**Move**(`type`で分岐。座標は敵ローカルの生成位置が起点)
| type | フィールド | 挙動 |
|---|---|---|
| `straight` | `vx`, `vy` (px/s) | 等速直進 |
| `sine` | `vy` px/s, `amp` px, `freq` Hz, `phaseDeg` deg(0) | `x(t)=x0+amp*sin(2π*freq*t+φ)-amp*sin(φ)`、yは等速 |
| `stopgo` | `vy` px/s(入場速度), `toY` px(停止y), `stay` s, `exitVx`, `exitVy` px/s | toYまで進み、`stay`秒停止し、その後`exitV*`で退場 |
| `arc` | `vx`, `vy` px/s, `turnDeg` deg/s | 速度ベクトルが毎秒`turnDeg`回転 |

`mirror:true`で生成された敵は、`vx`・`exitVx`・`turnDeg`・`amp`の符号を反転して左右対称に動く。

**Attack**: `{ pattern: "<patternId>", start: s(生成からの経過), repeatEvery?: s }`
`repeatEvery`指定時は`start`から`repeatEvery`秒ごとに同パターンを再起動(省略時は1回のみ)。敵が`stopgo`の場合、`start`は停止到達後になるようデータ側で設計する。

### 3.5 Stage(道中タイムライン)
```
stage: { id: string, name: string, subtitle: string, timeline: Event[] }
```
`timeline`は`t`(秒、ステージ開始=0。READY終了時点)の昇順。最後のイベントは`boss`必須。目安の道中長は**60〜65秒**。

| type | フィールド | 説明 |
|---|---|---|
| `spawn` | `t` s, `enemy` id, `x` px, `y` px(-24), `count` int(1), `interval` s(0.4), `dx` px(0)=1体ごとのx加算, `dy` px(0), `mirror` bool(false)=左右反転コピーも同時生成(xは`480-x`), `move` Move(任意)=敵定義のmoveを上書き | 敵の出現。`count`体を`interval`秒ごとに |
| `banner` | `t`, `text` string, `duration` s(2.0) | ステージ名などの画面中央テロップ |
| `boss` | `t`, `boss` id, `waitClear` bool(true) | ボス戦開始のトリガー |

### 3.6 Boss
```
bosses["<id>"] = {
  name: string,               // "暴走御神体AI ミタマ零号"
  shape: "goshintai",
  color: ColorToken,
  radius: number,             // px, 被弾半径(26〜30)
  score: int,                 // 撃破基礎点 30000
  entry: { x:px, y:px, time:s }, // 入場先と所要時間
  introDialogue: "<id>", defeatDialogue: "<id>",
  phases: Phase[]             // 3〜4個
}
```
**Phase**
| フィールド | 型 | 単位 | 説明 |
|---|---|---|---|
| `id` | string | - | `p1`など |
| `name` | string \| null | - | スペル名。`null`なら通常攻撃(名前表示・ボーナスなし) |
| `hp` | int | - | 基本HP(標準難度基準) |
| `timeLimit` | number | s | 制限時間(開始のintro後から) |
| `bonus` | int | 点 | スペル撃破ボーナス基礎点(通常攻撃は0) |
| `color` | ColorToken | - | フェーズ中のボス主色・背景ティント |
| `intro` | number | s | 開始直後の無敵・攻撃待ち時間(既定1.5) |
| `move` | BossMove | - | 下記 |
| `sequence` | Step[] | - | 攻撃の並び。**末尾まで行ったら先頭に戻り**フェーズ終了までループ |

**BossMove**: `{type:"still", x, y}` / `{type:"sway", y, ampX, freq}`(xが中心240を軸にsin往復、単位px,px,Hz) / `{type:"hop", points:[{x,y},...], every:s, travel:s}`(`every`秒ごとに次の点へ`travel`秒かけて移動、巡回)。

**Step**: `{ patterns: string[], hold: number(s), originOffset?: {x:px, y:px} }`
- `patterns`は同時に起動(複数可)。`hold`秒後に次のStepを開始(最小0.1)。起動済みエミッタはStep切替後も自分の`shots`が終わるまで動き続ける(重なりOK)。

**推奨フェーズ構成(見習い基準HP。Lv3ショットで約53/秒、命中率7割を想定)**
| # | 名前 | HP | 制限 | ボーナス | 主な型 |
|---|---|---|---|---|---|
| 1 | `null`(通常攻撃) | 600 | 25 | 0 | aimed + 遅いring |
| 2 | 呪符「無限ループ参照」 | 800 | 35 | 10000 | spiral(2〜3arms)+ ring |
| 3 | 禁呪「全件DELETE」 | 900 | 35 | 12000 | rain(pix・緑)+ aimed |
| 4 | 終曲「強制終了(SIGKILL)」 | 1000 | 40 | 15000 | fan sweep + random + split付き大玉 |

(名前は東方作品のスペル名・キャラ名を使わないこと。IT用語ネタで統一する)

### 3.7 Dialogues
`dialogues["<id>"] = [ { who: "miko"|"boss", text: string }, ... ]` 各行24字以内、1会話2〜4行。`miko`は左、`boss`は右の吹き出し。

### 3.8 Omikuji
```
omikuji: {
  categories: [ { id:"wish", label:"願望" }, { id:"deploy", label:"デプロイ" },
                { id:"bug", label:"バグ" }, { id:"wait", label:"待ち人" } ],
  maxRankIfNotCleared: "kichi",
  ranks: [ Rank x7 ]   // 良い順: daikichi, chukichi, shokichi, kichi, suekichi, kyo, daikyo
}
Rank = { id, label:"大吉", reading:"だいきち", color:ColorToken,
         minScore:{ easy:int, oni:int },         // 大凶は両方0
         summary: string,                         // 20字以内の一言
         fortunes: { wish:string, deploy:string, bug:string, wait:string } } // 各28字以内
```
暫定しきい値:
| 運勢 | easy | oni |
|---|---|---|
| 大吉 | 220,000 | 330,000 |
| 中吉 | 170,000 | 260,000 |
| 小吉 | 130,000 | 200,000 |
| 吉 | 90,000 | 140,000 |
| 末吉 | 55,000 | 85,000 |
| 凶 | 25,000 | 40,000 |
| 大凶 | 0 | 0 |

文言はユーモアあり(例: 凶「本番環境に触るべからず」)。大凶でも前向きな一言を添える(文化祭向け)。

### 3.9 データ作成ガイドライン(Haiku向け)
- 敵は5種: `bug`(小型群れ)、`fox`、`kappa`、`oni404`、`zombie`。ボスは1体。
- 道中の流れ目安: 0〜10s bug群→10〜25s fox→25〜40s kappa→40〜55s oni404→55〜62s zombieとbug→62s以降 `boss`。
- 敵弾は1パターンあたりの毎秒発射数が、道中は約15発以下、ボスは約60発以下になるよう調整(見習い倍率適用前の値)。
- すべての`pattern`/`enemy`/`dialogue` IDが参照先に存在すること。

---

## 4. game.html 内部構成

1つの `<script>` 内をIIFE + `"use strict"` にする。ES Modulesは使わない(file://で動かすため)。順序は上から下へ依存。

### 4.1 ファイル先頭の構造
`<title>` → `<meta charset="utf-8">`、viewport → `<link>`(Google Fonts: DotGothic16 / Orbitron、display=swap) → `<style>` → `<canvas id="game">` → `<script src="data.js" charset="utf-8">` → 本体`<script>`。`<!DOCTYPE>/<html>/<head>/<body>`は書かない。

### 4.2 モジュール(関数・クラスと責務)
| 名前 | 責務 |
|---|---|
| `CONFIG` | 論理解像度、速度、半径、難易度テーブル(2.6)、弾形状テーブル(0.3)、色トークン(0.2)、プール容量 |
| `Util` | `clamp, lerp, deg2rad, wrapAngle, rand(min,max), pick(arr)`。`?seed=N`指定時は乱数を`mulberry32`に差し替え(テスト用) |
| `Input` | キー状態。アクション名(`left,right,up,down,shot,bomb,focus,pause,ok,cancel`)にマップ。`isDown / wasPressed`(フレーム内エッジ)。矢印/Space/Escapeの既定動作を`preventDefault`。blurで全解除 |
| `AudioEngine` | 6章。`init()`(初回キー押下で`AudioContext`生成+resume)、`play(name)`、`setMute()` |
| `Pool<T>` | 固定長の事前確保オブジェクト配列。`acquire() / release(idx)`(swap-removeでアクティブリストを詰める) |
| `Bullet` | `x,y,vx,vy,speed,angle,accel,turn,shape,color,hitR,grazed,age,splitAfter,splitDef` |
| `BulletSystem` | 弾プール管理。`spawn(def)`、`update(dt)`(移動・加減速・曲がり・分裂・画面外消去)、`clearAll(toSpark)`、`clearInRadius(x,y,r)` |
| `EmitterManager` | 稼働中エミッタのリスト。`start(patternId, ownerRef, originOffset)`、`update(dt)`、`cancelByOwner(owner)`。**パターン解釈**の中心(`fireRing/fireSpiral/fireAimed/fireFan/fireRandom/fireRain` を型で切替) |
| `Player` | 位置・低速・ショット生成・ボム・被弾状態機械(`ALIVE → DYING(救済窓) → RESPAWN → ALIVE`)・無敵 |
| `PlayerShotSystem` | 自機弾のプール、移動、命中判定用の走査 |
| `Enemy` / `EnemySystem` | 敵プール。`MOVES`レジストリ(`straight/sine/stopgo/arc`)。attackスケジュール。HP・被弾フラッシュ・撃破でドロップ |
| `StageRunner` | `GAME_DATA.stage.timeline`を経過時間で消化。`spawn`展開(count・dx・mirror)、`banner`、`boss`トリガー |
| `Boss` | フェーズ状態機械(`INTRO → ACTIVE → TRANSITION`)。HP/制限時間、`BossMove`、`sequence`ループ、スペル撃破判定、ボーナス |
| `ItemSystem` | P/点アイテム。上昇→落下、回収半径、自動回収 |
| `Collision` | 円判定。`shots×enemies/boss`、`bullets×player(被弾/グレイズ)`、`items×player`。空間分割なし |
| `ScoreManager` | `addScore`、スコア、ハイスコア、グレイズ数、エクステンド、ステージ集計、内訳(撃破/グレイズ/ボーナス) |
| `Omikuji` | `judge(score, diff, cleared)` → Rankオブジェクト |
| `RankingStore` | localStorage入出力(下記) |
| `FX` | パーティクルプール、画面揺れ、フラッシュ、グリッチ状態(0.5秒)、「浄化完了」演出、浮遊テキスト |
| `SpriteCache` | 弾・アイテムのグロー付きスプライトを**オフスクリーンcanvasに事前描画**(形状5 x 色10) |
| `Renderer` | `drawBackground / drawPlayer / drawEnemies / drawBoss / drawBullets / drawShots / drawItems / drawFX / drawHUD / drawDialogue / glitchPass`。`drawText(str,x,y,{size,color,align,glow})`ヘルパ |
| `SceneManager` + 各Scene | `Scene{enter(args), update(dt), render(ctx), exit()}`。`BootScene, TitleScene, DifficultyScene, PlayScene, ResultScene, NameEntryScene, RankingScene` と`PauseOverlay` |
| `validateGameData(d)` | 3章のスキーマ検査。エラー配列を返す。ID参照の整合、列挙値、必須欠落、タイムライン昇順、`boss`終端など |
| `Main` | 起動、`resize()`、`requestAnimationFrame`ループ、`visibilitychange`、フォント読込待ち(`document.fonts.load`を最大1.5秒、失敗してもフォールバックで続行) |

### 4.3 メインループとdt
- `dt = min((now - last)/1000, 1/30)`。全移動は`dt`で積分。
- 1フレームの更新順(PlayScene): 入力 → Player → StageRunner/Boss → EnemySystem → EmitterManager → BulletSystem → PlayerShotSystem → ItemSystem → Collision → ScoreManager/FX → サブ状態遷移判定。
- `timeScale`(BOSS_DEFEATで0.6、ポーズで0)をdtに乗せる。

### 4.4 プール容量
弾1600 / 自機弾200 / 敵64 / アイテム160 / パーティクル600 / 浮遊テキスト32。プール枯渇時は新規生成を黙って無視する(落ちない)。

### 4.5 RankingStore仕様
- キー: `denno-miko-danmaku:v1:ranking`(配列JSON)。最後に使った名前: `...:lastName`。
- 要素: `{ name:"AAA", score:int, diff:"easy"|"oni", rank:"daikichi", cleared:bool, date:"YYYY-MM-DD" }`。スコア降順、最大10件。同点は先に記録した方が上。
- `qualifies(score)`: 件数<10 または score>10位。score=0は対象外。
- `try/catch`必須。localStorage不可の場合はメモリ保持にフォールバックし、ランキング画面に「保存できません」を小さく表示。不正データは破棄して空配列扱い。
- 名前入力: 3文字、`A-Z 0-9 _ - !`。直接タイピングで入力(自動で次の桁へ)、上下で文字送り、左右で桁移動、Backspaceで1つ戻る、Z/Enterで確定。初期値は`lastName`(なければ`AAA`)。30秒操作がなければ自動確定。

### 4.6 サブ仕様
- **ハイスコア表示**: HUD中央のHIは保存済みランキング1位のスコア。
- **デバッグ**: `?debug=1`でFPS・弾数・判定円表示、`?boss=1`でボス直行、`?diff=oni`で難易度スキップ、`?seed=N`で乱数固定。
- **キオスク対応**: キャンバス上で`cursor:none`、`user-select:none`、`contextmenu`を抑止。`M`でミュート、`F`でフルスクリーン切替。

---

## 5. 描画スタイル

### 5.1 配色トークン
| 用途 | 値 |
|---|---|
| bodyの背景 | `#05060f` |
| 画面背景ベース | `#05060f`〜`#0b0a22`の縦グラデ |
| グリッド線 | `#14204a`(アルファ0.5) |
| ネオン朱(鳥居・自機アクセント) | `#ff3b5c` |
| テキスト | `#e6f1ff` / 副次 `#8fa3c8` |
| 警告 | `#ff2d55` |
| 自機ショット | 淡いシアン白 `#bfeaff`(アルファ0.7) |

全体が「暗いネオン」単一テーマ。`:root`に`color-scheme: dark`。

### 5.2 スケーリング
論理480x640を保ったまま`s=min(innerWidth/480, innerHeight/640)`で拡大、中央配置。バッキングストアは`dpr`考慮。`resize`はデバウンス(100ms)。

### 5.3 グロー表現(性能)
- 毎フレームの`shadowBlur`は**禁止**。グローはスプライトに焼き込み、`'lighter'`加算合成で`drawImage`。
- 弾は「外側に色のぼかし+中心に白いコア」の2層。
- 背景の鳥居群と文字雨はオフスクリーンに描いて流用。

### 5.4 キャラクター・弾の形と色
| 要素 | 形 | 色 |
|---|---|---|
| 自機(電脳巫女) | 縦長の菱形の胴(白)、朱色の袴ライン、頭に鈴飾り(金)、左右に陰陽球風オプション2個(低速時に前に寄る)。全高約30px | 白+朱+cyanグロー |
| 当たり判定の点 | 白い点(r=3)+朱色の縁。グレイズリングも低速時に | white / red |
| お札ショット | 6x16の縦長長方形。斜め弾は4x12 | 淡いシアン白 |
| fox | 菱形の体+三角の耳2つ+顔に「∞」 | orange |
| kappa | 丸い体+頭の皿+滴る小さな四角 | green |
| oni404 | 四角い体+2本の角+「404」 | red |
| bug | 小さな六角形+足3本、速く揺れる | cyan |
| zombie | 大きめの四角、半透明で点滅、ひび割れ | violet |
| goshintai | 神鏡風の八角形を二重に回転、しめ縄状の波線、中心に縦長の瞳。フェーズ色に追従 | phase color |
| アイテム | P=朱の札型、点=青い四角、火花=金の小点 | red / blue / gold |

### 5.5 背景演出(ネオン鳥居)
- 遠近グリッドが下へ流れる。鳥居は奥から手前へ3〜4基(スケール0.3→1.6、アルファ0.2→0.9)、ネオン朱の線画。
- 薄い文字雨(`0/1`と平仮名、アルファ0.15)。
- ボス戦ではフェーズ色に寄る。残り5秒で赤く脈動。
- 走査線オーバーレイ(アルファ0.06)とヴィネット。

### 5.6 演出
- **被弾グリッチ(0.5秒)**: 横帯の自己コピーずらし、赤/シアンのずれコピー、`glitchWords`を1つ表示、画面揺れ0.2秒。
- **敵撃破**: 破片8個+リング+`0/1`文字。
- **浄化完了**: 中央にネオン文字+拡大リング+全弾が火花に。
- **スペル宣言**: 名前の帯がカットイン、右上に常時表示。

### 5.7 UIレイアウト
```
y=0   | SCORE 000123450     HI 000200000  [見習い]|  上部バー y0-28
y=34  | ボスHPバー(x40-440, 高さ6) 残りフェーズ★    |
y=52  |                 禁呪「全件DELETE」  残り 28 |
      |             (プレイフィールド)             |
y=612 | 残機 ◆◆◆◆◆  ボム ●●●  POWER Lv3 GRAZE 123|  下部バー
```
- タイトル: ロゴ+「PRESS Z TO START」点滅+操作ヘルプ。
- 難易度選択: 左右2枚のパネル、あらすじ。
- 結果画面: スコア内訳→おみくじ巻物が開くアニメ(1.8秒)→運勢(巨大文字)→一言→4項目→「Z:次へ X:タイトルへ」。
- ランキング: 10行(順位・名前・スコア・難易度・運勢)。新記録行は点滅。

### 5.8 フォント
`'DotGothic16'`(日本語)、`'Orbitron'`(数字・英字)。フォールバック: `"Hiragino Kaku Gothic ProN","Yu Gothic","Meiryo",sans-serif` / `monospace`。オフラインでも崩れないこと。

---

## 6. 効果音(Web Audio合成)
- 初回keydownで`AudioContext`作成。`DynamicsCompressor`→`masterGain(0.3)`。
- ヘルパ `tone({type,f0,f1,dur,gain,attack,filter})`、`noise({dur,gain,filterType,fq0,fq1})`。
- SFXごとの最小間隔と同時発音20の上限。BGMなし。

| 名前 | きっかけ | 合成の概要 | 最小間隔 |
|---|---|---|---|
| shot | 自機ショット | triangle 900→600Hz 0.04s gain0.04 | 90ms |
| hitEnemy | 命中 | noise(hp3000)0.02s | 60ms |
| killEnemy | 撃破 | noise(lp2500→300)0.2s + sine400→80 | 40ms |
| graze | グレイズ | sine2400 0.03s | 40ms |
| item | 回収 | triangle 880→1320 0.06s | 30ms |
| powerUp | Lvアップ | 660/880/1100 | - |
| playerHit | 被弾 | noise 0.4s + saw300→50 | - |
| bomb | 大祓 | 200→1200スイープ + ベル和音 | - |
| warning | ボス警告 | square 440/660交互x3 | - |
| spellDeclare | スペル宣言 | 銅鑼110Hz + ベル1568 | - |
| spellClear | スペル撃破 | C-E-G-C | - |
| spellFail | 時間切れ | sine600→300 | - |
| purify | 浄化完了 | C5/E5/G5/C6和音+きらめき | - |
| extend | 残機増加 | 6音上昇 | - |
| tick | 残り5秒 | square1000 0.03s | - |
| menuMove/menuOk/menuCancel/pause/nameChar | UI | short square/triangle | 30ms |
| omikuji | 運勢確定 | 太鼓+吉以上は明るく、凶以下は下降音 | - |

---

## 7. data.js サンプル(仮データ)

```js
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
```

---

## 8. 動作確認チェックリスト
- file://で直接開いてエラーなく起動、`DATA ERROR`なし
- 最初のキー押下後に音が鳴る
- リサイズで480:640を保つ、余白も暗色
- dt補正で144Hzでも速度同じ、タブ切替で自動ポーズ
- オフラインでもフォールバックで崩れない
- data.js欠落/破損時に原因がわかるエラー表示
- 全遷移が通る、Xで即タイトル、Rで再挑戦、0.5秒入力ロック
- 矢印/Spaceでページがスクロールしない、ポーズが動く
- 低速時のみ判定点、グレイズ二重加算なし、ボム救済、被弾で全弾消去
- パワーLv1〜5、難易度ごとの残機/ボム/倍率、エクステンド上限7、上部自動回収
- 6種のパターン型、accel/turn/split、mirror
- ボス全フェーズ、時間切れで次フェーズ(ボーナスなし)
- validateGameDataが具体的なエラーを出す
- 弾700発で60fps近く、shadowBlurを毎フレーム使っていない
- グリッチ、撃破破片、浄化完了、SFX、Mでミュート、鳥居背景
- 運勢しきい値どおり、未クリアは吉まで、ランキング保存、localStorage無効でも動く
- 1プレイ2〜3分
