# 메모리 인덱스

이 프로젝트의 메모리는 **레포 안 `docs/memory/`** 에서 관리합니다. 홈 디렉터리가 아닙니다.
이 파일은 `CLAUDE.md`가 `@docs/memory/MEMORY.md`로 import 하므로 세션 시작 시 자동으로 로드됩니다.

## 목록

- [참고 레포 두 곳](./reference-prior-repos.md) — 졸업(직접 기준)·가족 한마당(지도 출처) 로컬 경로. 졸업 커밋 형식은 Claude Code 시기 것을 따를 것
- [이전 프로젝트 컨벤션 답습 선호](./prefers-mirroring-prior-project.md) — 새 구조를 발명하지 말 것. 조사 → 질문 → 승인 → 실행
- [관습적·담백한 UI 선호](./prefers-plain-conventional-ui.md) — 장식을 더하지 말고 먼저 제안할 것
- [커밋·푸시는 지시받을 때만](./ask-before-commit-push.md) — push가 곧 공개 배포. 사용자는 「커밋 및 푸시 진행해」로 지시한다
- [개인 GitHub identity](./github-identity.md) — HoneyWater8 / 전역 git config는 회사 이메일이라 주의
- [카카오 앱 설정](./kakao-app-setup.md) — 지도·공유가 **다른 앱의 키**. 지도는 가족 한마당 앱(무료 쿼터). 공유 키 2026-10-25 등록
- [Vercel 배포 설정](./vercel-deploy-setup.md) — 2026-10-23 CLI로 생성·졸업과 같은 설정·Git 연결. 2026-10-24 첫 배포. main 자동 배포만 사용. 푸시가 배포로 안 이어지면 빈 커밋(Redeploy는 옛 커밋을 다시 빌드)
- [자산 파이프라인](./asset-pipeline.md) — 원본은 커밋하지 않음. 임직자 사진 66명(얼굴 인식 자르기)·갤러리 8장(칸을 사진 비율대로) 반영. 로고(배경 제거)·탭 아이콘(살구꽃)·공유 썸네일 제작 방법. 영상은 YouTube 임베드
- [Windows 개발 서버 잔류 프로세스](./windows-dev-server.md) — 백그라운드 `npx vite`를 끄면 자식 node가 남아 포트를 잡는다
- [사용자 집계 설정](./analytics-setup.md) — Vercel·GA4(`G-YBDXKFTNVQ`, 2026-10-25) 연결. 맞춤 측정기준 6개 등록 완료(2026-10-25). **2026-12 초 전에 Vercel 대시보드 캡처**
- [발주자 피드백 흐름](./client-feedback-loop.md) — 2026-10-24 담당 전도사에게 링크 공유됨(푸시 = 발주자 화면). 붙여 넣은 카톡은 원본·익명화본에 이어 적기. 2026-10-25 꽃 캡션의 말씀 제외(꽃 이름만 유지), 마지막 화면에 민수기 17:8
- [공개 범위](./public-exposure.md) — 임직자 실명·사진 공개. 사이트 `noindex`(2026-10-25). GitHub 저장소는 사용자 결정으로 공개 유지. 운영 기간 미정. `robots.txt`는 두지 않음

## 작성 규칙

메모리 1개 = 파일 1개 = 사실 1개. frontmatter를 갖춥니다.

```markdown
---
name: <파일명과 같은 kebab-case slug>
description: <한 줄 요약 — 이 메모리가 필요한 상황을 판단하는 근거>
metadata:
  type: user | feedback | project | reference
---

<사실 본문. feedback·project는 **Why:** 와 **How to apply:** 를 이어 쓴다.>
<관련 메모리는 [[slug]] 로 링크한다.>
```

| type | 담는 것 |
|---|---|
| `user` | 사용자가 누구인지 — 역할·전문성·선호 |
| `feedback` | 일하는 방식에 대한 지시 — 교정과 확인된 접근 모두. **이유를 반드시 포함** |
| `project` | 코드·git 히스토리에서 유도되지 않는 진행 중인 작업·목표·제약. 상대 날짜는 절대 날짜로 |
| `reference` | 외부 자료 포인터 — URL·대시보드·경로 |

**쓰지 말 것**

- 레포가 이미 기록하는 것 (코드 구조, 과거 수정 이력, git 히스토리, `README.md`·`docs/requirements.md`·`CLAUDE.md`에 있는 내용)
- 그 대화에서만 의미 있는 것
- 코드 컨벤션 → `CLAUDE.md`로, 무엇을 했는지 → `docs/worklog/`로

**갱신** — 저장 전에 같은 내용을 다루는 파일이 있는지 먼저 확인하고, 있으면 새로 만들지 말고 그 파일을 고칩니다. 틀린 것으로 밝혀진 메모리는 지웁니다. 파일을 추가·삭제하면 위 「목록」을 함께 갱신합니다.
