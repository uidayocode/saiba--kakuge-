#!/usr/bin/env python3
"""game.html と分かれている .js を 1 つの HTML にまとめる（友達にファイル 1 つで渡せるように）。
使い方: python3 tools/build_single.py  →  dist/denno-houno.html
ゲームを直したら毎回これを実行して、dist/ もいっしょにコミットする。"""
import os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = open(os.path.join(ROOT, 'game.html'), encoding='utf-8').read()
# data.js が無いときの予備（data.sample.js）は、まとめた版では要らない
src = re.sub(r'<script src="data\.js"[^>]*></script>\s*<script>.*?__dataMissing.*?</script>',
             '<script src="data.js" charset="utf-8"></script>', src, count=1, flags=re.S)
def inline(m):
    name = m.group(1)
    body = open(os.path.join(ROOT, name), encoding='utf-8').read()
    assert '</script' not in body, name
    return '<script>/* ---- ' + name + ' ---- */\n' + body + '\n</script>'
out, n = re.subn(r'<script src="([\w.]+\.js)" charset="utf-8"></script>', inline, src)
os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
dst = os.path.join(ROOT, 'dist', 'denno-houno.html')
open(dst, 'w', encoding='utf-8').write(out)
print('inlined', n, 'scripts ->', dst, os.path.getsize(dst), 'bytes')
