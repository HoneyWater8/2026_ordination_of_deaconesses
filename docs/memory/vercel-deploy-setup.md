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
| 프로덕션 도메인 | https://2026ordinationofdeaconesses.vercel.app — OG 하드코딩·카카오 제품 링크 관리와 일치 |
| 첫 배포 | 2026-10-24 — `main` 첫 푸시(커밋 `7f09c32`) → Git 자동 배포, 빌드 13초. 보호 없이 공개 |

**2026-10-23에 한 것** — 사용자가 이름을 지정하고 CLI 로그인을 마친 뒤:
`vercel project add` → `vercel link` → `vercel api PATCH`로 `rootDirectory: FE`·`framework: vite` → `VITE_KAKAO_MAP_KEY` 등록 → `vercel project web-analytics enable` → `vercel git connect`. 졸업 프로젝트 설정을 API로 읽어 대조했고 Root Directory·프레임워크·Node 24.x·배포 보호(`all_except_custom_domains`)·Web Analytics·GitHub `main` 연결이 같습니다. 졸업 때 사용자가 대시보드에서 직접 했던 Git 연동·Root Directory를 이번엔 CLI로 처리했습니다.

**Why (직접 배포 금지):** Git 자동 배포가 연결되어 있어 직접 배포를 섞으면 저장소 커밋과 실제 배포 코드가 어긋납니다 (졸업 레포 2026-09-22 사용자 지시).

**How to apply:**

- 배포는 [[ask-before-commit-push]]에 따른 `main` 푸시로만. 푸시 후 Ready를 확인하고(아래처럼 커밋 해시로) 실제 도메인에서 확인합니다. `vercel.json` 헤더처럼 배포해야만 보이는 변경은 실제 응답(`curl -I`)으로 봅니다.
- **Ready 확인은 커밋 해시로** 합니다 — `vercel api "/v6/deployments?projectId=…"`의 `meta.githubCommitSha`. `vercel ls`의 첫 Production 줄은 새 배포가 아직 없으면 직전 배포를 보여 줘 「Ready」로 착각합니다 (2026-10-24 실제로 착각).
- **푸시가 배포로 이어지지 않을 때가 있습니다.** 2026-10-24 `59298a1` 푸시 후 13분간 배포 기록이 전혀 없었습니다(실패·취소도 아님). Git 연결·빌드 무시 설정·Vercel과 GitHub 상태 페이지는 모두 정상이었습니다. 사용자 승인을 받아 빈 커밋(`git commit --allow-empty`)을 푸시하자 14초 만에 배포됐습니다. 평소에는 푸시 후 20초 안에 배포가 잡히므로, 1~2분 지나도 없으면 이 경우를 의심합니다. 빈 커밋도 푸시라 사용자 확인을 받습니다.
  - 2026-10-25 `7d8945f`에서 **두 번째로** 같은 일이 생겼습니다(6시간 반 동안 배포 없음). 사용자가 대시보드 **Redeploy**를 눌렀지만 직전 배포의 커밋 `77891d4`를 다시 빌드했을 뿐입니다 — Redeploy는 새 커밋을 가져오지 않습니다. 빈 커밋 `43045b0` 푸시 후 30초 안에 배포됐습니다. 그러니 이 경우엔 Redeploy보다 빈 커밋을 먼저 권합니다.
- 프로젝트의 `gitProviderOptions.createDeployments: disabled`(졸업은 `enabled`)는 GitHub 저장소의 Deployments 기록 생성 여부일 뿐 Vercel 빌드와 무관합니다 (Vercel REST API 문서).
- `vercel.json`의 1시간 캐시 헤더는 404 응답에도 붙습니다. 썸네일처럼 아직 없는 고정 경로에 파일을 새로 넣으면, 먼저 404를 받은 브라우저는 최대 1시간 옛 응답을 쓸 수 있습니다.
- Windows Git Bash에서 `vercel api /v9/...`를 쓰면 경로가 Windows 경로로 바뀌어 실패합니다 → `MSYS_NO_PATHCONV=1`을 붙입니다.
- `vercel link`는 `FE/.gitignore`를 오염시키고 `.env.local`에 `VERCEL_OIDC_TOKEN`을 추가합니다. 토큰은 출력·커밋하지 않습니다.
- **사용 한도 (2026-10-25 점검)** — 팀은 지금 **Hobby**입니다(졸업 때 올린 Pro는 해지됨). 한도는 팀 공유이고 팀에는 이 프로젝트와 졸업 프로젝트 둘이 있습니다. Hobby 월 한도: Fast Data Transfer 100GB · CDN 요청 1,000,000 · Web Analytics 5만 이벤트(넘으면 3일 유예 뒤 집계만 멈춤). 실제 사이트 방문 1회(끝까지 스크롤 + 사진 2장 확대)가 Vercel에서 **약 2MB · 요청 92개**라, 먼저 닿는 것은 CDN 요청(끝까지 본 방문 약 1만 회/월)입니다. 졸업 때 장애는 **Blob 영상 전송 10GB 한도**(14.6GB)였고 이 프로젝트는 Blob이 없으며 영상은 YouTube, 지도는 카카오가 전송합니다. 넘으면 사이트가 `503 DEPLOYMENT_PAUSED`가 될 수 있습니다. `vercel usage`는 Hobby 기간 사용량을 보여 주지 않아 대시보드 Usage에서 봅니다 — 예배(11-08) 전후로 확인합니다.
- 운영 기간(언제 내릴지)은 아직 정해지지 않았습니다. 졸업은 상시 공개·최소 1년 유지였지만 이 프로젝트에 그대로 적용하지 않습니다.
