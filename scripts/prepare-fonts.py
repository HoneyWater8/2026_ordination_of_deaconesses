"""동일 서체의 필요한 글자만 WOFF2로 저장한다. pip install fonttools brotli 필요.

기본 실행은 Git 제외 캐시를 재사용하며 --download는 고정 버전 원본을 받는다.
소스가 없으면 --download를 안내한다. 웹 빌드 자체는 Python·외부 다운로드 없이 동작한다.

Cormorant Garamond는 가변 폰트라 쓰는 굵기(600)로 고정한 뒤 자른다.
Pretendard는 OFL Reserved Font Name이 있어 부분 폰트에 원래 이름을 쓸 수 없다 —
세 서체 모두 내부 이름을 Ordain *로 바꾼다.
"""
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
from urllib.parse import quote
from urllib.request import urlopen

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / 'assets/font-work'
OUTPUT = ROOT / 'FE/src/assets/fonts'
LICENSES = ROOT / 'FE/public/licenses/fonts'
# 캐시 폴더 → (원본 URL 앞부분, {파일: SHA-256}, 라이선스 파일)
SOURCES = {
    'gowunbatang': ('https://raw.githubusercontent.com/google/fonts/c1eda9233c33ad7775b27efd794f931095cf6133/ofl/gowunbatang', {
        'GowunBatang-Regular.ttf': '466c593e7147412e748af4856d5ad14709b5a860bdf62b9c2546f2c5874e9849',
        'GowunBatang-Bold.ttf': 'dbfcaa646e5831e7478524924f02906f550285a5050699b4e38c9950b3ec4b94',
        'OFL.txt': '49a57cc769fa9affd6eefb9070a61e3d3f6b757c97cafb15848bc6d1c81acc78',
    }, 'OFL.txt'),
    'cormorantgaramond': ('https://raw.githubusercontent.com/google/fonts/3dd78844021e948ceb633d1dcee3f7885561b5d9/ofl/cormorantgaramond', {
        'CormorantGaramond[wght].ttf': 'b20b7d9626dd956b2c5e558692ad328b1f19e3275e2782db4fa07670d83f35e0',
        'CormorantGaramond-Italic[wght].ttf': '0f48ea6abb2084537854f7174c470991a463b13036309e3b50a81511611c530d',
        'OFL.txt': '60700d351cac4650c51f3f9db318d2a420f8b45052dba2715eb5fec41f0f6956',
    }, 'OFL.txt'),
    'pretendard': ('https://raw.githubusercontent.com/orioncactus/pretendard/5c41199ea0024a9e0b2cb31735265056e5472d76/packages/pretendard/dist', {
        'public/static/Pretendard-Regular.otf': '3ffbacde6ab8411f1d2db54bb9b1f0b3ee2a738932033722cf0388c06aed1c93',
        'public/static/Pretendard-Bold.otf': '2e91915fab54df71cc9598ebf608b2bdb54c6fe3c066ac61dff0bc44fca71cc7',
        'public/static/Pretendard-ExtraBold.otf': 'c35fe941b7568d52a96010561540e47f9d3948dfde66ba25bc1908233e0a40cd',
        'LICENSE.txt': 'b04538c9abec39a3db75108cf0af0fd9c77032fe8aa2cf38345b4d250e98e38e',
    }, 'LICENSE.txt'),
}
# (캐시 폴더, 원본 파일, 가변축 고정값, 내부 이름, 스타일, 출력 파일)
FONTS = [
    ('gowunbatang', 'GowunBatang-Regular.ttf', None, 'Ordain Batang', 'Regular', 'batang-400.woff2'),
    ('gowunbatang', 'GowunBatang-Bold.ttf', None, 'Ordain Batang', 'Bold', 'batang-700.woff2'),
    ('pretendard', 'public/static/Pretendard-Regular.otf', None, 'Ordain Sans', 'Regular', 'sans-400.woff2'),
    ('pretendard', 'public/static/Pretendard-Bold.otf', None, 'Ordain Sans', 'Bold', 'sans-700.woff2'),
    ('pretendard', 'public/static/Pretendard-ExtraBold.otf', None, 'Ordain Sans', 'ExtraBold', 'sans-800.woff2'),
    ('cormorantgaramond', 'CormorantGaramond[wght].ttf', {'wght': 600}, 'Ordain Garamond', 'SemiBold', 'garamond-600.woff2'),
    ('cormorantgaramond', 'CormorantGaramond-Italic[wght].ttf', {'wght': 600}, 'Ordain Garamond', 'SemiBold Italic', 'garamond-600-italic.woff2'),
]

def cached(family, filename):
    # 하위 경로가 있는 원본(Pretendard)도 캐시에서는 파일 이름만으로 둔다.
    return CACHE / family / Path(filename).name

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--download', action='store_true')
    args = parser.parse_args()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    LICENSES.mkdir(parents=True, exist_ok=True)
    for family, (base, files, license_file) in SOURCES.items():
        for filename, expected in files.items():
            target = cached(family, filename)
            if args.download:
                target.parent.mkdir(parents=True, exist_ok=True)
                target.write_bytes(urlopen(f'{base}/{quote(filename)}', timeout=60).read())
            if not target.exists():
                raise SystemExit('Run python scripts/prepare-fonts.py --download to fetch pinned font sources.')
            if hashlib.sha256(target.read_bytes()).hexdigest() != expected:
                raise ValueError(f'Unexpected font source: {family}/{filename}')
        (LICENSES / f'{family}-{Path(license_file).name}').write_bytes(cached(family, license_file).read_bytes())

    codepoints = json.loads(subprocess.check_output(['node', 'FE/scripts/font-text.mjs', '--collect'], cwd=ROOT, text=True, encoding='utf8'))
    manifest = {'sourceCodepoints': codepoints, 'fonts': []}
    for directory, filename, axes, family, style, output in FONTS:
        font = TTFont(cached(directory, filename), recalcTimestamp=False)
        if axes:
            font = instancer.instantiateVariableFont(font, axes)
        wanted = set(codepoints) & set(font.getBestCmap())
        options = subset.Options()
        options.flavor = 'woff2'
        options.name_IDs = ['*']
        options.name_legacy = True
        options.name_languages = ['*']
        sub = subset.Subsetter(options=options)
        sub.populate(unicodes=wanted)
        sub.subset(font)
        # OFL의 Reserved Font Name을 지키며 원래 저작권·라이선스 레코드는 보존한다.
        # 가변 폰트에서 고정한 인스턴스의 이름 레코드(25·STAT 등)도 함께 덮어쓴다.
        names = {1: family, 2: style, 3: f'{family}-{style}-Subset', 4: f'{family} {style}',
                 6: f'{family.replace(" ", "")}-{style.replace(" ", "")}', 16: family, 17: style,
                 18: f'{family} {style}', 21: family, 22: style, 25: family.replace(' ', '')}
        for record in font['name'].names:
            if record.nameID in names:
                record.string = names[record.nameID].encode(record.getEncoding())
        font.flavor = 'woff2'
        target = OUTPUT / output
        font.save(target)
        # 생성 직후 cmap에 실제 글자가 남아 있는지 확인한다.
        with TTFont(target) as check:
            assert wanted <= set(check.getBestCmap()), f'Missing glyphs in {output}'
        body = target.read_bytes()
        manifest['fonts'].append({'file': output, 'bytes': len(body), 'sha256': hashlib.sha256(body).hexdigest(), 'codepoints': sorted(wanted)})
        print(f'{output}: {len(body)} bytes, {len(wanted)} glyph codepoints')
    (OUTPUT / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n', encoding='utf8')

if __name__ == '__main__':
    main()
