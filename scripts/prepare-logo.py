# -*- coding: utf-8 -*-
"""
하나로교회 로고 — 흰 배경을 투명하게 바꿔 무손실 WebP로 저장한다. pip install pillow

    원본  assets/logo/hanaro.png  (2026 하나로 가족 한마당 레포 FE/public/icons/hanaro.png, 450x450, 흰 배경)
    출력  FE/src/assets/logo.webp (빌드 시 해시 경로 · 1년 캐시)

붉은 띠 안의 「행복한 만남! 영원한 누림!」도 흰색이라 흰색을 일괄로 지우면 띠 글자에 구멍이 뚫린다.
그래서 붉은 띠로 둘러싸인 영역(띠 + 안쪽 글자)은 원본 그대로 두고, 나머지는
「흰색 → 투명」 색 변환(color to alpha)으로 바꾼다. 붓글씨 획 안쪽의 빈 공간도 투명해지고,
획 가장자리는 흰 테두리 없이 반투명 경계가 된다.

사용법:  python scripts/prepare-logo.py
"""
import os
import sys
from PIL import Image, ImageDraw

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(REPO, 'assets', 'logo', 'hanaro.png')
OUT = os.path.join(REPO, 'FE', 'src', 'assets', 'logo.webp')
# 화면에서 최대 60px — DPR 3배에 여유를 둔다
SIZE = 240
# 원본의 거의 흰 잡티는 눈에 안 보이는 반투명(알파 1~6)으로 남는다 — 완전 투명으로 정리
NOISE = 6

sys.stdout.reconfigure(encoding='utf-8')
im = Image.open(SRC).convert('RGBA')
w, h = im.size
px = im.load()

# 1) 붉은 띠
mask = Image.new('L', (w, h), 0)
mp = mask.load()
for y in range(h):
    for x in range(w):
        r, g, b, _ = px[x, y]
        if r > 150 and g < 130 and b < 130:
            mp[x, y] = 255

# 2) 가장자리에서 붉지 않은 픽셀을 따라 채운다(128). 끝까지 0으로 남는 곳 = 붉은 띠에 둘러싸인 안쪽.
#    검은 획도 붉지 않으므로 채움이 통과한다 — 획 안쪽 빈 공간은 바깥으로 분류된다.
for x in range(w):
    for y in (0, h - 1):
        if mp[x, y] == 0:
            ImageDraw.floodfill(mask, (x, y), 128)
for y in range(h):
    for x in (0, w - 1):
        if mp[x, y] == 0:
            ImageDraw.floodfill(mask, (x, y), 128)


def to_alpha(r, g, b):
    """흰색 → 투명. 흰 바탕 위에서 보이던 색을 그대로 유지하는 최소 알파와 색을 구한다."""
    a = max(255 - r, 255 - g, 255 - b)
    if a <= NOISE:
        return (0, 0, 0, 0)
    f = lambda c: max(0, min(255, round(255 - (255 - c) * 255 / a)))
    return (f(r), f(g), f(b), a)


out = Image.new('RGBA', (w, h))
op = out.load()
kept = 0
for y in range(h):
    for x in range(w):
        r, g, b, _ = px[x, y]
        if mp[x, y] == 128:
            op[x, y] = to_alpha(r, g, b)
        else:
            op[x, y] = (r, g, b, 255)
            kept += 1

# 3) 내용만 잘라 정사각 캔버스 가운데에 두고 줄인다. 알파를 곱한 상태에서 줄여야 가장자리가 어두워지지 않는다.
box = out.getchannel('A').getbbox()
out = out.crop(box)
side = max(out.size)
canvas = Image.new('RGBA', (side, side), (0, 0, 0, 0))
canvas.paste(out, ((side - out.width) // 2, (side - out.height) // 2))
small = canvas.convert('RGBa').resize((SIZE, SIZE), Image.LANCZOS).convert('RGBA')
small.save(OUT, 'WEBP', lossless=True, quality=100, method=6)

print(f'붉은 띠 영역 {kept}px 원본 유지 · 내용 {box} → {SIZE}x{SIZE}')
print(f'OUT {OUT} ({os.path.getsize(OUT)} B)')
