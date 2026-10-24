# 링크

| 항목 | URL |
|---|---|
| **Vercel 배포 (프로덕션)** | **https://2026ordinationofdeaconesses.vercel.app** *(예정 — 배포 전)* |
| GitHub 레포 | https://github.com/HoneyWater8/2026_ordination_of_deaconesses |
| Vercel 프로젝트 대시보드 | https://vercel.com/su-heon-choi-s-projects/2026_ordination_of_deaconesses |
| 참고 레포 (아멘 제자 17기 졸업) | https://github.com/HoneyWater8/2026_amen17_graduation |
| 참고 레포 (2026 하나로 가족 한마당) | https://github.com/HoneyWater8/2026_hanaro_family_festival |
| 카카오 공유 디버거 (OG 캐시 초기화) | https://developers.kakao.com/tool/debugger/sharing |

## 레포 내 문서

| 문서 | 내용 |
|---|---|
| [../README.md](../README.md) | 프로젝트 개요 · 배포 절차 · 콘텐츠 교체 방법 |
| [../CLAUDE.md](../CLAUDE.md) | 코드 컨벤션 · 되돌리면 안 되는 것 |
| [./requirements.md](./requirements.md) | 담당자 요청 · 미결 사항 |
| [../FE-legacy/README.md](../FE-legacy/README.md) | 디자인 확정 스펙 (구현 기준) |
| [../FE-legacy/DESIGN_PROCESS.md](../FE-legacy/DESIGN_PROCESS.md) | 시안 선정 경과 |
| [./worklog/README.md](./worklog/README.md) | 작업로그 인덱스 |
| [./memory/MEMORY.md](./memory/MEMORY.md) | 메모리 인덱스 |

## Vercel

| 항목 | 값 |
|---|---|
| 팀 | `su-heon-choi-s-projects` (`team_i5Fp7jSWD7stWHUbGSzKpoSA` — 앞선 두 레포와 동일) |
| 프로젝트명 | `2026_ordination_of_deaconesses` (`prj_uzgJdGJyB6dGoEoz0zXDwoqdFL0q`) |
| Root Directory | `FE` |
| Git 연동 | `HoneyWater8/2026_ordination_of_deaconesses` — `main` push 시 자동 프로덕션 배포 |
| 최초 배포 | 아직 없음 |

> 배포 도메인은 `FE/index.html`의 OG 태그 3곳(`og:url` · `og:image` · `twitter:image`)과 카카오 「제품 링크 관리」에 같은 값으로 들어가 있습니다. 첫 배포 후 실제 별칭과 일치하는지 확인해야 합니다.

## 카카오

| 용도 | 앱 | 환경 변수 | 도메인 등록 위치 |
|---|---|---|---|
| 지도 | `2026_hanaro_family_festival` (무료 쿼터) — 2026-10-23 새 플랫폼 키 | `VITE_KAKAO_MAP_KEY` | 그 키의 JavaScript SDK 도메인 |
| 공유 | `2026_ordination_of_deaconesses` | `VITE_KAKAO_JS_KEY` (미수령) | [앱] → 제품 링크 관리 → 사이트 도메인 (등록 완료) |
