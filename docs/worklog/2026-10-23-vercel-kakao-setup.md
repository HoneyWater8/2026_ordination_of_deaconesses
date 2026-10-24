# 2026-10-23 · Vercel 프로젝트 구성 · 카카오 키 분리

> Vercel 프로젝트를 CLI로 만들어 졸업 프로젝트와 같은 설정으로 맞추고 GitHub에 연결. 카카오 지도는 가족 한마당 앱의 키, 공유는 새 앱의 키로 나눴다. 배포는 아직 0건.

## 한 일

- **GitHub** — 사용자가 `HoneyWater8/2026_ordination_of_deaconesses`(빈 레포) 생성. 로컬은 `git init -b main` + 로컬 identity + `origin` 연결
- **Vercel** — `vercel project add` → `vercel link` → `vercel api PATCH`(`rootDirectory: FE`, `framework: vite`) → `VITE_KAKAO_MAP_KEY` 등록(Production·Preview, 공개 값) → Web Analytics 활성화 → `vercel git connect`
- **카카오** — 사용자가 새 앱 `2026_ordination_of_deaconesses` 생성·제품 링크 관리에 배포 도메인 등록, 가족 한마당 앱에서 지도용 플랫폼 키 새로 발급
- `docs/urls.md` · README 「배포」 · 메모리(`vercel-deploy-setup`·`kakao-app-setup`)

## 판단한 것

**1. 설정은 졸업 프로젝트를 API로 읽어 맞춤**

졸업 때는 Root Directory·Git 연동을 사용자가 대시보드에서 했습니다. 이번엔 CLI(`vercel api`·`vercel git connect`)로 가능해 직접 처리하되, 먼저 졸업 프로젝트 설정을 읽어 같은 값으로 맞췄습니다 — Root Directory `FE` · Vite · Node 24.x · 배포 보호 `all_except_custom_domains` · Web Analytics · GitHub `main`.

**2. 키를 둘로 나눔**

사용자가 새 앱에서 카카오맵을 켜려 하자 가족 한마당 앱이 무료 쿼터를 받고 있어 요금이 발생한다는 안내가 나왔습니다. 공유 SDK와 지도 SDK는 별개 스크립트라 다른 앱의 키를 써도 되므로, 지도 `VITE_KAKAO_MAP_KEY` / 공유 `VITE_KAKAO_JS_KEY`로 나눴습니다 — 가족 한마당은 지도 키 하나로 둘 다 썼고, 졸업은 공유 키만 있었습니다.

**3. 키는 실제로 돌려 보고 정함**

사용자가 기억한 가족 한마당 키(`aa54…`)는 로컬 빌드·기록 어디에도 없었고 그 레포의 Vercel 프로젝트도 삭제된 상태라 대조할 곳이 없었습니다. 그래서 `localhost:5173`에서 실제 SDK로 지도 로드·장소 검색·주소 검색을 돌렸고, 새 키(`833b…`)와 이전 키 모두 동작했습니다. 사용자가 지정한 새 키를 씁니다. 같은 검색으로 교회 좌표(카카오 장소 「하나로교회」, 도로명 김포한강2로 167)를 얻어 데이터에 넣었습니다.

**4. 직접 배포하지 않음**

졸업 첫날은 Git 연결 전이라 `vercel --prod`로 첫 배포를 했지만, 2026-09-22 이후 규칙은 `main` 자동 배포만입니다. Git을 먼저 연결해 두었으므로 첫 푸시가 곧 첫 배포가 됩니다. 푸시는 사용자 지시가 있을 때만입니다.

## 확인한 것

| 항목 | 결과 |
|---|---|
| 예정 도메인 | ✅ 사용 전 `DEPLOYMENT_NOT_FOUND` — 이름이 비어 있음 |
| 프로젝트 설정 | ✅ API 재조회로 졸업과 동일함 확인 (`link.repo` = `2026_ordination_of_deaconesses`, `productionBranch` = `main`) |
| 환경 변수 | ✅ `VITE_KAKAO_MAP_KEY` Config · Production, Preview |
| `vercel link`의 `.gitignore` 오염 | ✅ 재현됨 → 되돌림. `git check-ignore -v`로 `.env.example`·`.gitkeep` 추적, `.env.local`·`.vercel`·`dist` 제외 확인 |
| 배포 주소에서 지도·공유 | ❌ **미확인** — 배포 전 |

## 남긴 것

**첫 배포 후 반드시 확인** — 프로덕션 별칭이 `2026ordinationofdeaconesses.vercel.app`인지(OG 3곳·카카오 제품 링크 관리와 같아야 함), 배포 주소에서 지도가 뜨는지(지도 키의 SDK 도메인에 배포 주소가 있어야 함 — 사용자는 "설정되어 있을 것"이라 했지만 도메인 목록은 키마다 따로다).

**공유 키 미수령** — 새 앱의 JavaScript 키를 받으면 `VITE_KAKAO_JS_KEY`를 Production·Preview에 공개 값으로 등록합니다. 그 전까지 공유 버튼은 네이티브 공유로 폴백합니다.

**Windows Git Bash에서 `vercel api /v9/...`는 경로 변환으로 실패**합니다 — `MSYS_NO_PATHCONV=1`.
