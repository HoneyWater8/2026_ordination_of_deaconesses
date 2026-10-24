# Site font subsets

Ordain Batang is a subset of Gowun Batang Regular and Bold (The Gowun Batang Project Authors).
Ordain Sans is a subset of Pretendard Regular, Bold and ExtraBold (Kil Hyung-jin).
Ordain Garamond is a subset of Cormorant Garamond and Cormorant Garamond Italic
(The Cormorant Project Authors), instanced from the variable fonts at weight 600.
All are distributed under the SIL Open Font License 1.1; the original licenses
and copyright notices are included alongside this file.

The subset font family and internal names have been changed to respect the
Reserved Font Names (Pretendard declares "Pretendard" as a Reserved Font Name).
Glyph outlines, layout features, and metrics are preserved.

Pinned sources:

- https://github.com/google/fonts/tree/c1eda9233c33ad7775b27efd794f931095cf6133/ofl/gowunbatang
- https://github.com/google/fonts/tree/3dd78844021e948ceb633d1dcee3f7885561b5d9/ofl/cormorantgaramond
- https://github.com/orioncactus/pretendard/tree/5c41199ea0024a9e0b2cb31735265056e5472d76/packages/pretendard/dist (v1.3.9)

Generation: `python scripts/prepare-fonts.py --download` from the repository root.
Later runs can reuse the local source cache without `--download`.
Requires Python packages `fonttools` and `brotli`, plus `npm ci` in `FE`.
The site build checks source text against the committed font manifest; new
characters require regeneration before publishing. Font generation is not part
of deployment, so normal builds do not need Python or external font requests.
