# -*- coding: utf-8 -*-
"""
사진 다운샘플링 — 갤러리(그리드 thumb + 확대 full) · 임직자(정사각 원형용)

원본은 스마트폰·카메라 촬영본이라 장당 수 MB에 이른다. 그대로 올리면 모바일에서
로딩이 감당이 안 되므로 줄여서 FE/public/ 아래에 넣는다. (아멘 제자 17기 졸업 레포의 같은 스크립트를 따름)

    gallery    thumb  800w   2열 그리드의 넓은 칸 416px x DPR 2배
               full  1280w   확대 보기 — 루트 폭 460px x DPR 2~3배
    ordainees        300x300 원형 사진 약 96px x DPR 3배. 정사각으로 자른다 (세로 기준 40%)

사용법:
    pip install pillow

    # 갤러리 — 원본 이름순으로 --start 번호(기본 1)부터 FE/public/gallery/{thumb,full}/NN.webp
    python scripts/resize-photos.py --source assets/photo-originals/gallery --slug gallery

    # 임직자 — 파일 이름을 「이름.jpg」로 바꿔 둔 폴더. 명단(FE/src/data/ordination.ts)의
    # 원문 순서 번호로 FE/public/ordainees/NN.webp를 만든다. 명단에 없는 이름은 건너뛰고 알린다.
    python scripts/resize-photos.py --ordainees assets/photo-originals/ordainees

그다음 FE/src/data/ordination.ts에서 갤러리는 photosOf("gallery", [비율, …], "갤러리")에 사진마다
원본 비율(아래에 출력된다)을 적고 gallery.rows(줄마다 사진 수)를 맞춘다. 임직자는 ordaineePhotos를 true로 바꾼다.

기존 출력은 덮어쓰지 않는다. 사진을 바꿀 때만 --force를 준다.
원본 폴더(assets/photo-originals/)는 .gitignore 처리되어 저장소에 올라가지 않는다.
"""
import argparse
import os
import re
import sys
import unicodedata
from PIL import Image, ImageOps

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(REPO, 'FE', 'public')
DATA = os.path.join(REPO, 'FE', 'src', 'data', 'ordination.ts')

# slug → [(하위 폴더, 최대 폭, 품질)]
PRESETS = {
    'gallery': [('thumb', 800, 80), ('full', 1280, 82)],
}
PORTRAIT_SIZE, PORTRAIT_Q = 300, 80
# HEIC는 Pillow 기본 설치로 열 수 없다 — 아이폰 사진은 JPEG로 받아 둔다.
IMAGE_EXT = ('.jpg', '.jpeg', '.png', '.webp')

sys.stdout.reconfigure(encoding='utf-8')
sys.stderr.reconfigure(encoding='utf-8')
parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
parser.add_argument('--source', help='갤러리 원본 파일 또는 새 사진만 모아 둔 폴더')
parser.add_argument('--slug', choices=sorted(PRESETS), help='출력 이름 (현재 gallery)')
parser.add_argument('--start', type=int, default=1, help='첫 출력 번호. 기존 사진 다음 번호를 지정')
parser.add_argument('--ordainees', help='「이름.jpg」로 정리한 임직자 사진 폴더')
parser.add_argument('--force', action='store_true', help='기존 출력 덮어쓰기 (사진 교체)')
args = parser.parse_args()
if not args.ordainees and not (args.source and args.slug):
    parser.error('--source와 --slug를 함께 지정하거나 --ordainees를 지정하세요.')
if args.start < 1:
    parser.error('--start는 1 이상이어야 합니다.')


def load(path):
    im = Image.open(path)
    # 스마트폰 촬영본은 EXIF 회전 정보를 갖고 있어 그대로 저장하면 눕는다.
    return ImageOps.exif_transpose(im).convert('RGB')


def guard(target):
    if os.path.exists(target) and not args.force:
        parser.error(f'기존 파일을 덮어쓸 수 없습니다: {target}. 교체라면 --force, 추가라면 --start를 확인하세요.')


def list_images(src):
    if os.path.isfile(src):
        return [src]
    return sorted(os.path.join(src, f) for f in os.listdir(src)
                  if f.lower().endswith(IMAGE_EXT) and os.path.isfile(os.path.join(src, f)))


total_in = total_out = 0

if args.source:
    files = list_images(os.path.abspath(args.source))
    if not files:
        parser.error(f'{args.source}: 변환할 사진이 없습니다.')
    # 추가 사진 때문에 이미 배치된 사진을 덮어쓰지 않도록 생성 전에 모두 확인한다.
    for i in range(args.start, args.start + len(files)):
        for sub, _, _ in PRESETS[args.slug]:
            guard(os.path.join(PUBLIC, args.slug, sub, f'{i:02d}.webp'))
    for sub, _, _ in PRESETS[args.slug]:
        os.makedirs(os.path.join(PUBLIC, args.slug, sub), exist_ok=True)
    for i, path in enumerate(files, args.start):
        total_in += os.path.getsize(path)
        im = load(path)
        for sub, width, quality in PRESETS[args.slug]:
            out = im.copy()
            if out.width > width:
                out = out.resize((width, round(out.height * width / out.width)), Image.LANCZOS)
            dst = os.path.join(PUBLIC, args.slug, sub, f'{i:02d}.webp')
            out.save(dst, 'WEBP', quality=quality, method=6)
            total_out += os.path.getsize(dst)
        # 갤러리 칸은 사진 비율대로 잡으므로 데이터에 옮겨 적을 비율을 알려 준다.
        print(f'  {i:02d}  {im.width}x{im.height}  비율 {im.width / im.height:.3f}  ({os.path.basename(path)})')
    print(f'{args.slug}: {len(files)}장 → {args.start:02d}~{args.start + len(files) - 1:02d}')

if args.ordainees:
    # 명단은 데이터 파일 한 곳에서만 관리한다 — 원문 순서가 곧 사진 번호다.
    source = open(DATA, encoding='utf-8').read()
    block = source[source.index('ordainees: ['):]
    names = re.findall(r"'([^']+)'", block[:block.index(']')])
    index = {unicodedata.normalize('NFC', n): i + 1 for i, n in enumerate(names)}
    files = list_images(os.path.abspath(args.ordainees))
    out_dir = os.path.join(PUBLIC, 'ordainees')
    os.makedirs(out_dir, exist_ok=True)
    matched, unknown = [], []
    for path in files:
        # macOS·카카오톡에서 받은 파일명은 자모가 분리된 NFD일 수 있다.
        name = unicodedata.normalize('NFC', os.path.splitext(os.path.basename(path))[0]).strip()
        if name not in index:
            unknown.append(name)
            continue
        dst = os.path.join(out_dir, f'{index[name]:02d}.webp')
        guard(dst)
        matched.append((name, path, dst))
    for name, path, dst in matched:
        total_in += os.path.getsize(path)
        # 정사각으로 자르되 세로는 가운데보다 조금 위(40%)를 기준으로 — 인물 사진은 얼굴이 위쪽에 있다.
        # 얼굴이 크게 치우친 사진은 원본을 미리 잘라 둔다.
        out = ImageOps.fit(load(path), (PORTRAIT_SIZE, PORTRAIT_SIZE), Image.LANCZOS, centering=(0.5, 0.4))
        out.save(dst, 'WEBP', quality=PORTRAIT_Q, method=6)
        total_out += os.path.getsize(dst)
    missing = [n for n in names if n not in {m[0] for m in matched}
               and not os.path.exists(os.path.join(out_dir, f'{index[n]:02d}.webp'))]
    print(f'ordainees: {len(matched)}명 변환')
    if unknown:
        print('  명단에 없는 파일:', ', '.join(unknown))
    if missing:
        print(f'  아직 사진이 없는 {len(missing)}명:', ', '.join(missing))

print(f'IN  {total_in / 1024 / 1024:.1f} MB')
print(f'OUT {total_out / 1024 / 1024:.1f} MB')
