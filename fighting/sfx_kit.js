/* 効果音の録音（CC0）。名前 → データURL の配列（複数あれば毎回ランダムに選ぶ）。
 * ファイルを読みに行かないので file:// でも動く。空の名前は game.html の合成音を使う。
 * 中身は scratchpad の build_kit で作る（出どころは SFX_CREDITS）。 */
window.SFX_KIT = window.SFX_KIT || {};
window.SFX_CREDITS = window.SFX_CREDITS || [];
