# 2026-10-24 · 첫 커밋·푸시와 프로덕션 배포 확인

> 사용자 지시("커밋 및 푸시 진행해")로 세 커밋을 만들어 `main`에 푸시. Git 자동 배포가 13초 만에 Ready가 됐고, 실제 도메인에서 OG·지도·YouTube를 확인했다.

## 한 일

- 커밋 3개 — 졸업 레포 첫날과 같은 순서
  - `13779ee` init — `.gitignore` · `FE-legacy/` · 대화 익명화본
  - `c288df8` 프로젝트 구조 수립 및 성경 속 꽃 초대장 구현
  - `7f09c32` 작업로그·메모리 체계 도입 및 Vercel 구성
- `git push -u origin main` → Vercel Production 배포
- README · `docs/urls.md` · 요구사항 · 메모리의 「배포 전」 표기를 현행화

## 판단한 것

**1. 세 커밋으로 나눈 기준**

졸업 레포의 첫 세 커밋(`init` → 구조 수립·구현 → 작업로그·메모리)을 따랐습니다. 2026-10-24 YouTube 임베드는 구현 커밋 이전에 끝난 변경이라 중간 상태(자체 호스팅 영상 슬롯)를 되살려 따로 커밋하지 않고 구현 커밋의 최종 상태에 포함했습니다. 그 경위는 작업로그 `2026-10-24-youtube-embed.md`가 남깁니다.

**2. 커밋 메시지는 Claude Code 시기 형식**

졸업 레포는 Claude Code 시기(본문 + `Co-Authored-By`·`Claude-Session`)와 Codex 시기(제목 한 줄)가 섞여 있습니다. 메모리 [[reference-prior-repos]]대로 앞쪽 형식을 썼습니다.

**3. 줄바꿈**

커밋 때 Git for Windows의 `autocrlf` 경고가 나왔지만 저장소에는 LF로 들어갑니다(`git ls-files --eol` → `i/lf`). 졸업 레포와 같은 상태라 설정을 바꾸지 않았습니다.

## 확인한 것

| 항목 | 결과 |
|---|---|
| 커밋 identity | ✅ `HoneyWater8 <kjyjyh8@gmail.com>` |
| 커밋 대상 | ✅ `.env.local` · `.vercel/` · 대화 원문 · 폰트 원본 · `dist` 미포함 |
| 배포 | ✅ Production Ready (빌드 13초) |
| 프로덕션 별칭 | ✅ `https://2026ordinationofdeaconesses.vercel.app` — OG 하드코딩·카카오 제품 링크 관리와 일치 |
| 공개 접근 | ✅ HTTP 200, 배포 보호 없음 |
| OG 태그 | ✅ 제목·설명·이미지 경로가 실제 응답에 포함 |
| 캐시 헤더 | ✅ `/assets/` 1년 immutable, `/icons/` 1시간 |
| 번들 | ✅ 지도 키·YouTube ID 포함 |
| 배포 주소에서 지도 | ✅ SDK 로드 · 타일 10개 · 교회 핀 — 지도 키의 SDK 도메인에 배포 주소 등록됨 |
| 배포 주소에서 YouTube | ✅ 플레이어 표시 |
| `/icons/thumbnail.png` | ❌ **404** — 사용자 제작 대기 (예상된 상태) |
| 실기기 (iPhone·카카오 인앱) | ❌ **미확인** |

## 남긴 것

**썸네일 전에는 링크를 공유하지 않는 편이 낫습니다.** 카카오는 OG 정보를 URL 단위로 캐싱해, 썸네일 없이 한 번 공유되면 이미지 없는 카드가 캐시에 남을 수 있습니다. 썸네일을 넣은 뒤 공유 디버거로 확인합니다. 또 `/icons/`의 1시간 캐시 헤더가 404 응답에도 붙어, 그 사이 404를 받은 브라우저는 최대 1시간 옛 응답을 씁니다.

**공유 키를 받으면** `VITE_KAKAO_JS_KEY`를 Production·Preview에 등록하고 재배포(푸시)해야 번들에 들어갑니다 — `VITE_` 값은 빌드 시점에 박힙니다.

**이 문서 현행화 변경은 아직 커밋하지 않았습니다** ([[ask-before-commit-push]]).
