---
name: analytics-setup
description: 사용자 집계는 Vercel(기본)+GA4(행동) 두 축. Vercel은 활성화했고 GA4는 측정 ID 대기. Hobby 보존 1개월이라 2026-12 초 전에 캡처
metadata:
  type: project
---

졸업 레포와 같은 두 축입니다 — 가족 한마당에서 페이지뷰·UV를 아예 수집하지 못한 것이 아쉬웠던 지점이라 졸업부터 사전에 붙였습니다.

| | Vercel Web Analytics | Google Analytics 4 |
|---|---|---|
| 상태 (2026-10-23) | ✅ CLI로 활성화. `<Analytics />` 연결 | ⏳ **측정 ID 미수령** — `index.html`에 자리만 표시 |
| 보존 | **1개월** (Hobby) | 14개월 |

**Why 둘 다인가:** Hobby는 커스텀 이벤트를 지원하지 않아 "말씀 시트를 열었나 / 어디까지 봤나"는 GA4가 맡습니다. 코드의 `track()` 호출은 이미 들어가 있어 스니펫만 넣으면 수집이 시작됩니다.

**How to apply:**

- GA4 ID를 받으면 `FE/index.html`에 **구글 표준 스니펫을 그대로** 넣습니다 (`?ga_debug=1` 디버그 분기 포함 — 졸업 `index.html` 참고). 모듈로 감싸 동적 로드하지 않습니다 — 졸업 레포에서 `page_view`가 `en` 없이 나가 GA가 버렸습니다(2026-09-11).
- 전송 확인은 Network의 `collect?v=2` **payload의 `en`**까지 봅니다. `204`는 처리 성공이 아닙니다 (졸업 레포에서 오판한 지점).
- ⏰ 예배가 2026-11-08이라 Vercel 데이터는 **2026년 12월 초 전에** 대시보드를 캡처해야 남습니다.
