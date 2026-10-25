# CLAUDE.md

하나로교회 **권사 임직 감사예배** 모바일 초대장. 섹션마다 성경 속 꽃이 피고 지는 세로 스크롤 단일 페이지 정적 웹앱.

전체 개요는 [README.md](./README.md), 발주 배경·요구사항은 [docs/requirements.md](./docs/requirements.md).

## 구조

| 경로 | 내용 |
|---|---|
| `FE/` | Vite 8 + React 19 + TS 6. 런타임 의존성 3개(`react`/`react-dom`/`@vercel/analytics`). **서버·API 없음** |
| `FE-legacy/` | Claude Design 핸드오프 원본(이번 프로젝트분만). **구현 기준 스펙은 `FE-legacy/README.md`**, 채택안은 `final/` |
| `docs/` | 요구사항 · 작업로그 · 메모리 |
| `scripts/` | 부분 폰트 · 사진 변환 · 로고 배경 제거 (Python) |

구조·스택·컨벤션은 앞선 두 프로젝트를 그대로 따른다 — `C:\dev\2026_amen17_graduation`(직접 기준), `C:\dev\2026_hanaro_family_festival`(지도 구현의 출처).

## 코드 컨벤션

- 스타일은 **전부 인라인 `style={{}}`**. `src/index.css`는 리셋 · `@keyframes`(`od-` 접두사) · `.no-scrollbar` · `.od-anim`만 담당
- 색·폰트·모션은 반드시 `src/theme/tokens.ts`의 `BL` / `FF` / `MOTION` 경유. 하드코딩 금지
- 콘텐츠 문자열은 전부 `src/data/ordination.ts` 한 파일 (꽃 이름 포함). 꽃 **그림**만 `components/common/Flower.tsx`
- 컴포넌트는 named export(`export function Hero()`), 섹션 1개 = 파일 1개
- 파일 헤더는 `/* ───── 제목 ───── */` 박스 주석. 주석은 한국어로 **"왜"**를 설명
- 타입은 `type` 선언 + `import type` (`verbatimModuleSyntax: true`)
- 섹션 02~08은 `Section`(라벨 → 섹션 꽃 공급 · 배경 꽃 · GA `section_view`). 04(예배 순서)는 2026-10-24 뺐다. 첫 화면·마지막 화면은 고유 레이아웃이라 `useSectionView`만 직접 쓴다

## 되돌리면 안 되는 것

- `100dvh` 사용 (`100vh` 아님) · body 배경은 `BL.outer`
- 스크롤은 body가 아니라 `[data-scroll-root]`. IntersectionObserver의 root도 그 컨테이너 (`useReveal`·`useInView`·`useSectionView`)
- 오버레이(확대 보기 등)는 `position: fixed` + **앱 폭(460px)에 맞춰 가운데 정렬** — `inset: 0`이면 데스크톱에서 앱 바깥까지 덮는다. `Reveal` 안에서 여는 오버레이는 `createPortal`로 body에 (Reveal의 transform에 fixed가 갇힌다 — 2026-10-25 뺀 말씀 시트가 그렇게 했다)
- `BL.accent`는 24px 미만 텍스트 금지 (bg 위 4.14:1) → 작은 글씨는 `BL.label`. `BL.accent2`는 장식 전용
- `FF.latin`(Garamond)에 한글 금지 — 한 줄 안에서 서체가 갈라진다
- 꽃 애니메이션은 `.od-anim` (모션 감소 시 정지). **떨어지는 꽃잎은 모션 감소 시 아예 그리지 않는다** — 멈추면 섹션 위쪽에 박제된다
- 화면 밖 섹션의 무한 애니메이션은 일시정지 — 재생 상태는 **`animation` 축약값 안에** 넣는다(`... infinite paused`). `animationPlayState`를 따로 쓰면 재렌더 때 축약·개별 속성 충돌 경고
- 섹션 꽃잎은 `od-fall-y`(세로)와 `od-spin-x`(흔들림)를 **다른 레이어**에 둔다
- 섹션 라벨 번호(`05 Ordainees` 등)를 당기지 말 것 — 라벨이 배경 꽃의 좌우·기울기 시드라 뒤 섹션 꽃 배치가 바뀐다. 섹션을 넣고 빼면 교차 배경(`alt`·마지막 화면 bg2)이 번갈아 나오는지 확인
- 꽃 그라디언트 id는 `useId`로 섞는다 — 같은 꽃이 여러 번 그려지면 id가 겹쳐 색이 바뀐다
- GA4 초기화는 `index.html`의 구글 표준 스니펫 그대로 둘 것 (모듈로 감싸 동적 로드하면 `page_view`가 `en` 없이 나가 GA가 버림) — 측정 ID 수령 후 추가
- `setPointerCapture`는 드래그 임계값을 넘은 뒤에 (확대 보기 버튼이 click을 못 받음)
- 20주년 영상은 YouTube 표준 플레이어 + `loading="lazy"`. 포스터를 먼저 보여 주는 방식으로 바꾸지 말 것 — 아이폰에서 두 번 눌러야 재생된다. iframe의 Referer를 지우지 말 것 — YouTube가 재생 오류로 막는다
- `animation-fill-mode` — 진입은 `backwards`, 닫힘은 `forwards`
- 카카오 키는 **두 개**: 지도 `VITE_KAKAO_MAP_KEY`(가족 한마당 앱 — 무료 쿼터), 공유 `VITE_KAKAO_JS_KEY`(이 프로젝트 앱). 합치지 말 것
- 명단은 담당자 **원문 순서로 보관**하고 화면에서 가나다순 정렬. 사진 번호(`ordainees/NN.webp`)가 원문 순서를 따른다 — 사람을 추가할 땐 맨 뒤에
- `vercel link`는 `FE/.gitignore` 끝에 `.vercel`·`.env*`를 덧붙여 `!.env.example`을 무효화한다 → 링크 후 되돌리고 `git check-ignore -v`로 확인

## 검증

```sh
cd FE && npm run build && npm run lint
```

`build`는 부분 폰트 글자 검사부터 한다. 새 글자가 있으면 `python scripts/prepare-fonts.py` 후 폰트를 함께 커밋.

## 작업로그 · 메모리

이 프로젝트는 작업로그와 메모리를 **레포 안에서** 관리합니다. 홈 디렉터리(`~/.claude/projects/.../memory/`)가 아니라 아래 경로에 쓰세요.

- **작업로그** — `docs/worklog/`. 의미 있는 작업 단위가 끝날 때마다 파일 추가 + 인덱스 갱신. 규칙은 [docs/worklog/README.md](./docs/worklog/README.md)
- **메모리** — `docs/memory/`. 규칙은 [docs/memory/MEMORY.md](./docs/memory/MEMORY.md)

@docs/memory/MEMORY.md
