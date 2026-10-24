---
name: vercel-deploy-setup
description: Vercel 프로젝트는 2026-10-23 CLI로 만들어 졸업 프로젝트와 같은 설정으로 맞췄다. main 자동 배포만 쓰고 직접 배포 명령은 쓰지 않는다
metadata:
  type: project
---

배포 절차 자체는 `README.md` 「배포 (Vercel)」에 있습니다. 여기에는 문서만 봐서는 안 보이는 것만 적습니다.

| 항목 | 값 |
|---|---|
| 팀 | `su-heon-choi-s-projects` / `team_i5Fp7jSWD7stWHUbGSzKpoSA` (앞선 두 레포와 같은 팀) |
| 프로젝트 | `2026_ordination_of_deaconesses` / `prj_uzgJdGJyB6dGoEoz0zXDwoqdFL0q` |
| 예정 도메인 | https://2026ordinationofdeaconesses.vercel.app — 2026-10-23 확인 시 미사용(`DEPLOYMENT_NOT_FOUND`) |
| 배포 | **0건** (2026-10-23 기준) |

**2026-10-23에 한 것** — 사용자가 이름을 지정하고 CLI 로그인을 마친 뒤:
`vercel project add` → `vercel link` → `vercel api PATCH`로 `rootDirectory: FE`·`framework: vite` → `VITE_KAKAO_MAP_KEY` 등록 → `vercel project web-analytics enable` → `vercel git connect`. 졸업 프로젝트 설정을 API로 읽어 대조했고 Root Directory·프레임워크·Node 24.x·배포 보호(`all_except_custom_domains`)·Web Analytics·GitHub `main` 연결이 같습니다. 졸업 때 사용자가 대시보드에서 직접 했던 Git 연동·Root Directory를 이번엔 CLI로 처리했습니다.

**Why (직접 배포 금지):** Git 자동 배포가 연결되어 있어 직접 배포를 섞으면 저장소 커밋과 실제 배포 코드가 어긋납니다 (졸업 레포 2026-09-22 사용자 지시).

**How to apply:**

- 배포는 [[ask-before-commit-push]]에 따른 `main` 푸시로만. 첫 푸시가 곧 첫 프로덕션 배포입니다.
- 첫 배포 후 확인: 프로덕션 별칭이 예정 도메인과 같은지(다르면 `FE/index.html` OG 3곳·카카오 제품 링크 관리 수정), 배포 주소에서 지도([[kakao-app-setup]]), 썸네일 응답.
- Windows Git Bash에서 `vercel api /v9/...`를 쓰면 경로가 Windows 경로로 바뀌어 실패합니다 → `MSYS_NO_PATHCONV=1`을 붙입니다.
- `vercel link`는 `FE/.gitignore`를 오염시키고 `.env.local`에 `VERCEL_OIDC_TOKEN`을 추가합니다. 토큰은 출력·커밋하지 않습니다.
- 운영 기간(언제 내릴지)은 아직 정해지지 않았습니다. 졸업은 상시 공개·최소 1년 유지였지만 이 프로젝트에 그대로 적용하지 않습니다.
