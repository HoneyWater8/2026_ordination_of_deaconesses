# 2026 권사 임직 감사예배 · 모바일 초대장

> 하나로교회 **권사 66명 임직 감사예배**에 성도와 손님을 초청하는 모바일 웹 페이지.

- ⛪ **일시** — **2026.11.08 (주) 오후 2시**
- 📍 **장소** — 김포 하나로교회 **B2 다윗성전** (경기 김포시 김포한강2로 167)
- 🌐 **배포** — https://2026ordinationofdeaconesses.vercel.app *(2026-10-24 첫 프로덕션 배포)*

섹션마다 **성경 속 꽃**이 피어나는 세로 스크롤 단일 페이지. 꽃은 그림만 두고(장절·구절·해설은 2026-10-25, 꽃 이름은 2026-10-27 담당 전도사 피드백으로 뺐다), 마지막 화면에 민수기 17:8을 맺는 말씀으로 둔다. 카카오톡으로 링크를 공유해 열람하는 것이 목적이며, **모바일 세로 화면이 기본 환경**입니다.

발주 배경과 담당자 요청은 [`docs/requirements.md`](./docs/requirements.md) 참고.

---

## 현재 상태

**디자인 구현·지도·20주년 영상·로고·탭 아이콘·공유 썸네일 완료, 2026-10-24 첫 배포. 임직자 사진 66명 · 갤러리 사진 8장 반영. 꽃 캡션의 말씀(장절·구절·「?」 해설) 제외. 마지막 화면에 민수기 17:8 전문. GA4 연결 · 아이폰·갤럭시·카카오톡 실기기 확인 · 전체 검토 반영 (2026-10-25). 담당 전도사 요청으로 모시는 글 한 줄 수정 · 꽃 이름 제외 · 마지막 화면에 교회 연락처 (2026-10-27).**

| 항목 | 상태 |
|---|---|
| 8개 섹션 레이아웃 · 꽃 연출 | ✅ 구현 (시안 B · 성경 속 꽃) |
| 말씀 (장절·구절 + 「?」 해설 시트) | ➖ 제외 — 담당 전도사 「말씀 부분은 빼자」 (2026-10-25). 꽃 그림·애니메이션은 유지 |
| 꽃 이름 | ➖ 제외 — 담당 전도사 「이모티콘만 남겨두면 좋을듯」 (2026-10-27). 2026-10-25 말씀을 뺄 때는 사용자 요청으로 남겼던 것 |
| 마지막 화면 말씀 | ✅ 민수기 17:8 개역개정 전문 — 졸업 레포 「맺는 말씀」처럼 본문 + 장절. 마지막 꽃을 종려나무 → 살구꽃으로 (2026-10-25 사용자 요청) |
| 예배 일시 · 달력 · D-day | ✅ 2026-11-08 (주) 오후 2시 |
| 예배 순서 | ➖ 섹션 제외 — 담당 전도사 "예배순서는 뺍시다 너무 많아서" (2026-10-24) |
| 임직자 명단 | ✅ **66명** (담당자 원문, 화면은 가나다순) |
| 임직자 사진 | ✅ **66명** 반영 (2026-10-25, 얼굴 기준 자르기). 2026-10-27 강민정 사진을 본인이 새로 올린 것으로 교체 (담당 전도사 요청) |
| 오시는 길 · 카카오 지도 | ✅ 지도 + 카카오맵·네이버지도·T맵 길찾기 + 주소 복사. 지도는 가까워지면 불러오고 터치를 받지 않음 (2026-10-25) |
| 검색 노출 | ➖ 막음 — `noindex` 메타 + `X-Robots-Tag` 헤더 (2026-10-25). 임직자 실명·사진이 있어 링크를 받은 사람만 보도록 |
| 갤러리 사진 8장 | ✅ 반영 (2026-10-25) — 칸을 사진 비율대로 (자르지 않음) |
| 20주년 기념 영상 | ✅ 교회 YouTube 채널 영상 임베드 (갤러리 사진 아래) |
| 교회 연락처 · 홈페이지 | ✅ 마지막 화면 교회명 아래 — 031-992-9191(누르면 전화) · hanaroch.org(새 창) (2026-10-27 담당 전도사 요청) |
| 로고 | ✅ 가족 한마당 레포의 하나로교회 로고 — 흰 배경 제거 (2026-10-24). 누르면 교회 홈페이지(`hanaroch.org`)를 새 창으로 (2026-10-25) |
| 공유 썸네일 · 탭 아이콘 | ✅ 1200×630 썸네일(로고·제목·일시·살구꽃) / ✅ 탭 아이콘은 첫 화면의 꽃(살구꽃) |
| 카카오톡 공유 | ✅ 공유 앱 JavaScript 키 등록 (2026-10-25) — 버튼에서 바로 카카오톡 대화방 선택 |
| 사용자 집계 | ✅ Vercel Web Analytics 활성화 / ✅ GA4 `G-YBDXKFTNVQ` (2026-10-25) |

---

## 기술 스택

| 영역 | 라이브러리 |
|---|---|
| Build/Dev | Vite 8 |
| UI | React 19 + TypeScript 6 |
| 배포 | Vercel (정적) |
| External | Kakao Maps SDK · Kakao JavaScript SDK (Share) · YouTube 임베드 |
| Fonts | Gowun Batang · Pretendard · Cormorant Garamond 기반 자체 호스팅 WOFF2 부분 폰트 |
| Lint | typescript-eslint, eslint-plugin-react-hooks |

런타임 의존성은 `react`, `react-dom`, `@vercel/analytics` 세 개뿐입니다. 라우터·상태관리·CSS 프레임워크·아이콘 라이브러리 없이 인라인 스타일과 로컬 state로 처리합니다. 서버 상태가 없어 서버리스 함수도 두지 않았습니다. 설정 파일(`tsconfig*`·`eslint.config.js`·`vite.config.ts`)과 의존성 버전은 [아멘 제자 17기 졸업](https://github.com/HoneyWater8/2026_amen17_graduation) 레포와 같습니다.

---

## 화면 구조

```
┌─ App (root, max-width 460px, height 100dvh) ──────────┐
│  [data-scroll-root] 세로 스크롤                         │
│    01 Hero      살구꽃      민수기 17:8                 │
│    02 Invite    샤론의 수선화 아가 2:1                  │
│    03 Date      백합화      이사야 35:1                 │
│    05 Ordainees 석류        출애굽기 28:33              │
│    06 Location  감람나무    시편 52:8                   │
│    07 Gallery   포도나무    요한복음 15:5               │
│    08 Notice    들의 백합화  마태복음 6:28              │
│    09 Footer    살구꽃      민수기 17:8 (본문을 화면에) │
│  [z 40] ShareFAB                                       │
└────────────────────────────────────────────────────────┘
```

| # | 섹션 | 핵심 요소 |
|---|---|---|
| 01 | **Hero** | 로고 · 교회명 · `Ordination Thanksgiving Service` · 「권사 *임직* / 감사예배」 · 꽃 구분선 · 일시·장소 · 모서리 살구꽃 가지와 흩날리는 꽃잎<br>하단 SCROLL 힌트 — 스크롤하지 않은 채 2.5초가 지나면 나타나고, 한 번이라도 스크롤하면 사라져 다시 나오지 않음 (졸업 레포와 같은 동작) |
| 02 | **모시는 글** | 담당자 초대글 원문(2026-10-27 담당 전도사가 「기쁨으로 초대하오니」로 한 줄 고침) + 「하나로교회」 |
| 03 | **예배 일시** | 날짜·시간 + D-day 배지 + 11월 달력(8일 강조, 일요일 「주」) |
| 05 | **임직받으시는 분** | 「66명의 권사님을 세웁니다」 + 4열 원형 사진 그리드(가나다순). 동명이인 접미사(`김영남B`)는 작게. 탭해도 확대하지 않음 |
| 06 | **오시는 길** | 카카오 지도(가까워지면 불러옴 · 터치를 받지 않아 지도 위에서도 스크롤됨 · 실패 시 안내 문구) + 장소 카드(주소 복사·지하철·주차) + 카카오맵·네이버지도(장소 페이지)·T맵 |
| 07 | **갤러리** | 사진 8장을 줄마다 1~2장(1·2·1·1·2·1) — 같은 줄은 높이를 맞추고 폭은 사진 비율대로 나눠 **자르지 않음**. 탭하면 확대 보기 + **20주년 기념 영상**(YouTube 표준 플레이어, 지연 로딩) |
| 08 | **안내** | 좌석 안내문 카드 |
| 09 | **Footer** | 살구꽃 · 민수기 17:8 본문(『 』) + 장절 · 로고 · 교회명 · 교회 전화 · 홈페이지 주소 / 하단에 저작권 · 제작자 표기 |

**번호 04가 비어 있는 이유** — 04는 예배 순서(우슬초 · 시편 51:7)였고 2026-10-24 담당 전도사 요청으로 뺐습니다. 섹션 라벨은 배경 꽃의 좌우·기울기를 정하는 시드라 번호를 당기지 않았습니다 — 당기면 뒤 섹션들의 꽃 배치가 바뀝니다. 대신 배경색이 계속 번갈아 나오도록 05~08과 마지막 화면의 교차 배경(bg/bg2)을 한 칸씩 뒤집었습니다.

**섹션 꽃** — 섹션마다 그 섹션의 꽃이 ① 제목 아래 구분선 가운데에서 피어나고(scale 0→1 + 회전) ② 배경 모서리에서 두 송이가 살랑이며 ③ 꽃잎이 섹션 높이만큼 천천히 떨어집니다. 꽃은 모두 코드로 그린 SVG입니다. 위 표의 장절은 그 꽃이 나오는 말씀으로, 화면에는 마지막 화면의 민수기 17:8만 나옵니다 — 처음의 `꽃 이름 | 장절 | ?` 캡션·구절과 「?」 해설 시트는 2026-10-25, 남겨 두었던 꽃 이름은 2026-10-27 담당 전도사 피드백으로 뺐습니다.

스크롤과 무관하게 떠 있는 요소:

- **ShareFAB** — 우하단 공유 버튼. 바텀시트로 링크 복사 / 카카오톡 공유. 핸들을 아래로 끌거나 배경 탭·`Esc`로 닫힘.

---

## 폴더 구조

```
2026_ordination_of_deaconesses/
├── FE/                                 # 프론트엔드 (Vite + React + Vercel)
│   ├── public/
│   │   ├── icons/                      # 공유 썸네일(thumbnail-v2) · 탭 아이콘(살구꽃) · 지도 앱·카카오톡 아이콘
│   │   ├── ordainees/                  # 임직자 사진 NN.webp (NN = 명단 원문 순서)
│   │   ├── gallery/                    # 갤러리 사진 — thumb(800w) · full(1280w) 2벌
│   │   └── licenses/fonts/             # 부분 폰트 원본·라이선스
│   ├── src/
│   │   ├── App.tsx                     # 8섹션 조립 + ShareFAB + Analytics
│   │   ├── main.tsx
│   │   ├── fonts.css                   # 부분 폰트 @font-face (Ordain Batang/Sans/Garamond)
│   │   ├── index.css                   # 글로벌 리셋 + @keyframes(od-*) + .od-anim
│   │   ├── assets/                     # WOFF2 7개 + manifest.json · 로고 logo.webp (빌드 시 해시 경로)
│   │   ├── theme/tokens.ts             # BL(색), FF(폰트), MOTION, LAYOUT
│   │   ├── data/
│   │   │   ├── types.ts                # OrdinationData · FlowerKind · SectionLabel
│   │   │   └── ordination.ts           # 행사 콘텐츠 전부 (교체 지점). UI 문구는 각 컴포넌트
│   │   ├── hooks/                      # useReveal · useInView · useSectionView ·
│   │   │                               #   useSectionFlower · usePrefersReducedMotion · useScrolled
│   │   ├── components/
│   │   │   ├── sections/               # Hero, Invite, Schedule, Ordainees,
│   │   │   │                           #   Location, Gallery, Notice, Footer
│   │   │   └── common/                 # Flower(꽃 7종 SVG), Section, SectionHead, SectionFlowers,
│   │   │                               #   FlowerOrn, Card, Calendar,
│   │   │                               #   Logo, Reveal, KakaoMap, CopyButton, Lightbox, YouTubeEmbed, ShareFAB, ScrollHint
│   │   └── utils/
│   │       ├── kakaoMap.ts             # Kakao Maps SDK 로더 (VITE_KAKAO_MAP_KEY)
│   │       ├── mapLinks.ts             # 카카오맵·네이버지도·T맵 딥링크
│   │       ├── kakaoShare.ts           # Kakao SDK 로더 + sendScrap (VITE_KAKAO_JS_KEY)
│   │       ├── share.ts                # 정식 URL · 클립보드 복사(대체 경로 포함) · 네이티브 공유 폴백
│   │       └── analytics.ts            # GA4 커스텀 이벤트 track() · 오류 trackError()·initErrorTracking()
│   ├── scripts/font-text.mjs           # 소스 문자열 → 부분 폰트 글자 검사 (빌드 첫 단계)
│   ├── index.html                      # OG 태그 · noindex 메타 · GA4 표준 스니펫
│   ├── vercel.json                     # 정적 파일 캐시 헤더 · 검색 노출 차단 헤더(X-Robots-Tag)
│   ├── .env.example
│   └── package.json
│
├── FE-legacy/                          # Claude Design 핸드오프 원본 (이번 프로젝트분만)
│   ├── README.md                       # 화면별 확정 스펙 (구현 기준 문서)
│   ├── DESIGN_PROCESS.md               # 시안 선정 경과
│   ├── final/                          # 채택안 B · 성경 속 꽃
│   ├── explorations/                   # 미채택 시안 A · B 꽃말 · C
│   └── screenshots/
│
├── docs/
│   ├── chat-transcript.txt             # 담당자 카카오톡 대화 (익명화)
│   ├── requirements.md                 # 대화 → 요구사항 정리
│   ├── urls.md
│   ├── worklog/                        # 작업로그 — 무엇을 왜 그렇게 했는지
│   └── memory/                         # 세션 간 유지되는 메모리
│
├── assets/logo/hanaro.png              # 로고 원본 (가족 한마당 레포, 흰 배경)
│
├── scripts/
│   ├── prepare-fonts.py                # 고정 버전 원본 → 부분 폰트 WOFF2
│   ├── prepare-logo.py                 # 로고 흰 배경 제거 → 무손실 WebP
│   ├── thumbnail.html                  # 공유 썸네일 1200×630 구성 (Chrome에서 캡처)
│   └── resize-photos.py                # 원본 사진 → 갤러리 2벌 · 임직자 정사각
│
└── CLAUDE.md                           # 세션 시작 시 자동 로드되는 프로젝트 규약
```

---

## 로컬 개발

```sh
cd FE
npm install
npm run dev        # http://localhost:5173 (지도 키에 이 주소가 등록되어 있음)
npm run build      # 폰트 글자 검사 → tsc -b → vite build
npm run lint
```

지도는 `FE/.env.local`의 `VITE_KAKAO_MAP_KEY`가 있어야 뜹니다. 없으면 지도 자리에 「지도를 불러오지 못했어요」 안내가 나오고 길찾기 버튼은 그대로 동작합니다 (`npx vercel env pull .env.local`).

---

## 배포 (Vercel)

| 설정 | 값 |
|---|---|
| 팀 · 프로젝트 | `su-heon-choi-s-projects` / `2026_ordination_of_deaconesses` |
| Root Directory | **`FE`** ← 앱이 하위 폴더에 있으므로 반드시 지정 |
| Framework Preset | Vite |
| Node | 24.x |
| Git | `HoneyWater8/2026_ordination_of_deaconesses` — `main` 연결 |

2026-10-23 CLI로 프로젝트를 만들고 졸업 프로젝트와 같은 설정(Root Directory · 프레임워크 · Node · 배포 보호 · Web Analytics · Git 연결)으로 맞췄습니다. 2026-10-24 `main` 첫 푸시로 첫 프로덕션 배포 — 프로덕션 별칭이 하드코딩한 도메인과 일치하고 보호 없이 공개됩니다.

### 배포 — Git 자동 배포

검증한 변경을 `main`에 커밋·푸시하면 Vercel이 자동으로 프로덕션 배포합니다. `vercel deploy`, `vercel --prod` 같은 직접 배포 명령은 쓰지 않습니다.

```sh
git push origin main      # → Vercel이 자동 빌드·배포
```

### 새 작업 환경 — 기존 프로젝트 연결

```sh
cd FE
npx vercel login
npx vercel link --yes --project 2026_ordination_of_deaconesses --team su-heon-choi-s-projects
```

> ⚠️ `vercel link`가 `FE/.gitignore` 끝에 `.vercel`·`.env*`를 덧붙여 `!.env.example` 예외를 무효화합니다. 링크 후 덧붙은 줄을 지우고 `git check-ignore -v FE/.env.example`로 확인하세요 (졸업 레포·이 레포 모두 실제로 겪음).

### 환경 변수

필수 환경 변수는 없습니다. 비어 있어도 페이지는 동작합니다 — 지도 자리에 안내 문구, 공유는 네이티브 공유로 폴백 (자세한 내용은 `FE/.env.example`).

| 변수 | 용도 | 등록 | 없을 때 |
|---|---|---|---|
| `VITE_KAKAO_MAP_KEY` | 카카오 지도 (06) | ✅ Production·Preview | 지도 자리에 「지도를 불러오지 못했어요」 안내. 길찾기 버튼은 동작 |
| `VITE_KAKAO_JS_KEY` | 카카오톡 공유 | ✅ Production·Preview (2026-10-25) | `navigator.share`(네이티브 공유)로 폴백 |

> **카카오 키가 두 개인 이유** — 카카오맵 무료 쿼터가 `2026_hanaro_family_festival` 앱에 있어, 새 앱에서 지도를 켜면 요금이 발생합니다. 그래서 지도는 그 앱에서 새로 발급한 플랫폼 키(JavaScript 키)를, 공유는 이 프로젝트용 `2026_ordination_of_deaconesses` 앱의 키를 씁니다.
>
> - 지도 — 그 키의 **JavaScript SDK 도메인**에 배포 주소와 `http://localhost:5173`이 있어야 합니다. localhost(2026-10-23)와 배포 주소(2026-10-24) 모두에서 지도 로드를 확인했습니다.
> - 공유 — **[앱] → 제품 링크 관리 → 사이트 도메인**에 `https://2026ordinationofdeaconesses.vercel.app` 등록 완료. 「플랫폼 → Web」이 아닙니다 — 빠지면 `4019` (가족 한마당·졸업 두 프로젝트가 연속으로 겪은 함정).

### 배포 후 확인할 것

- ✅ **도메인 일치** — 프로덕션 별칭이 `https://2026ordinationofdeaconesses.vercel.app`로 `FE/index.html`의 OG 태그(`og:url` · `og:image` · `twitter:image`)와 같습니다 (2026-10-24). 도메인을 바꾸면 세 곳과 카카오 제품 링크 관리를 함께 바꾸세요.
- **공유 썸네일** `public/icons/thumbnail-v2.png`(1200×630)는 `scripts/thumbnail.html`을 Chrome에서 1200×630(DPR 2)으로 캡처해 줄인 것입니다. 첫 화면과 같은 서체·색으로 로고·제목·일시·장소를 가운데 630px 안에(카카오 일부 화면은 정사각으로 자름) 두고 양옆에 살구꽃을 놓았습니다. 크기는 앞선 레포 썸네일처럼 제목을 크게(112px, 글자 영역이 세로 74%) 둡니다. 문구가 바뀌면 HTML을 고쳐 다시 캡처합니다. ⚠️ **썸네일을 바꿀 때는 파일명을 새로 하고(`thumbnail-v3.png` …) `index.html`의 `og:image`·`twitter:image`를 함께 바꿉니다.** 카카오는 이미지를 주소 단위로 보관해, 같은 경로의 파일만 바꾸면 [공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 캐시를 여러 번 초기화해도 옛 이미지가 나갑니다 (2026-10-24 실제로 겪음).
- ✅ 배포 주소에서 지도 로드 확인 (2026-10-24).

### 사용자 집계

| | Vercel Web Analytics | Google Analytics 4 |
|---|---|---|
| 무엇 | 방문자 수 · 페이지뷰 · 유입 경로 · 기기 | 섹션 도달 · 지도 앱 · 주소 복사 · 영상 · 사진 확대 · 공유 · 앱 안 브라우저 구분 · 오류 |
| 상태 | ✅ 2026-10-23 활성화 | ✅ 2026-10-25 `G-YBDXKFTNVQ` — `index.html`에 표준 스니펫. `?ga_debug=1`로 열면 DebugView에 실시간 |
| 보존 | **1개월** (Hobby) | 14개월 |

수집하는 GA4 이벤트 (방문 · 외부 링크 클릭 · 참여 시간은 GA가 자동으로 셉니다 — 로고의 교회 홈페이지 링크, 카카오맵·네이버지도 링크가 「외부 링크 클릭」으로 잡힙니다. T맵은 `tmap://` 앱 주소라 잡히지 않고 `map_open`으로만 셉니다):

> ⚠️ **GA 자동 「스크롤」(90%) 이벤트는 쓸 수 없습니다.** 이 페이지는 창이 아니라 안쪽 컨테이너(`[data-scroll-root]`)가 스크롤해서, GA는 처음부터 끝까지 다 보인 것으로 여겨 스크롤하지 않은 방문자에게도 `scroll`을 보냅니다(2026-10-25 확인). 그래서 GA → 관리 → 데이터 스트림 → 향상된 측정에서 「스크롤」을 껐고(2026-10-25), 얼마나 내려갔는지는 `section_view`로 봅니다. 그 전에 쌓인 `scroll` 이벤트는 무시합니다.

| 이벤트 | 시점 |
|---|---|
| `section_view` | 섹션이 화면 가운데를 지날 때 (`section` = `01 Hero` 등). 왕복해도 1회. 2026-10-25 전에는 「40% 이상 보일 때」라 화면의 약 3배 높이인 `05 Ordainees`가 한 번도 집계되지 않았음 |
| `map_open` | 길찾기 버튼 (`app` = `kakao`/`naver`/`tmap`) |
| `address_copy` | 주소 복사 |
| `video_play` | 20주년 영상 플레이어를 누름 (`video` = `anniversary`). 다른 출처 플레이어라 초점 이동으로 센 **근사치** |
| `photo_open` | 갤러리 사진 확대 (`photo` = `01`~`08`, 파일 번호와 같음) |
| `share_open` · `share_kakao` · `share_native` · `share_copy` | 공유 시트 열기와 각 경로 |
| `exception` | 오류 (`description`, `fatal`). 앱 코드에서 처리하지 못한 오류·Promise 거부, 그리고 화면이 조용히 대체되는 카카오 지도 로드 실패(`kakao_map: …`)·카카오 공유 실패(`kakao_share: …`). 같은 내용은 1회, 한 번 열 때 최대 5건. 다른 출처 스크립트의 `Script error.`와 파일 이름 없는 오류(앱 안 브라우저가 끼워 넣은 스크립트)는 버림 |

사용자 속성 `in_app` — 어느 앱 안에서 열었는지 (`kakaotalk` / `naver` / `band` / `instagram` / `facebook` / `other_webview` / `browser`). 앱 안 브라우저는 출처를 넘기지 않아 카카오톡 유입이 「직접 방문」으로 잡히므로(졸업 레포 운영 통계에서 겪음) 브라우저 정보로 구분합니다. `index.html` 스니펫에서 `config`보다 먼저 `set` 해 첫 `page_view`부터 붙습니다.

> ✅ **아래 6개를 2026-10-25 GA4 「맞춤 측정기준」으로 등록했습니다.** 등록해야 보고서에서 매개변수별로 나눠 볼 수 있고, 등록 전 데이터에는 소급되지 않습니다 (졸업 레포는 행사가 끝난 뒤 등록해 행사 기간을 섹션별로 볼 수 없었음). 매개변수를 새로 만들면 관리 → 데이터 표시 → 맞춤 정의 → 맞춤 측정기준 만들기로 함께 등록합니다:
>
> | 측정기준 이름 | 범위 | 이벤트 매개변수 / 사용자 속성 |
> |---|---|---|
> | 섹션 | 이벤트 | `section` |
> | 지도 앱 | 이벤트 | `app` |
> | 영상 | 이벤트 | `video` |
> | 사진 번호 | 이벤트 | `photo` |
> | 오류 내용 | 이벤트 | `description` |
> | 앱 안 브라우저 | 사용자 | `in_app` |
>
> `share_copy`의 `ok`, `exception`의 `fatal`은 등록하지 않습니다 (졸업과 같음).

> ⚠️ Hobby 플랜은 Vercel 데이터를 1개월만 보존합니다. 예배(11-08) 후 통계를 남기려면 **2026년 12월 초 전에** 대시보드를 캡처하세요.

---

## 콘텐츠 교체 방법

행사 콘텐츠(일시·장소·초대글·명단·안내·섹션별 꽃·말씀)는 [`FE/src/data/ordination.ts`](./FE/src/data/ordination.ts) 한 파일에 있습니다. 섹션 제목·버튼 문구 같은 UI 라벨은 각 컴포넌트에 있습니다.

**임직자 명단** — `ordainees`는 담당자가 보낸 **원문 순서 그대로** 둡니다. 화면에서 가나다순으로 정렬하며, 사진 번호가 이 순서를 따르므로 사람을 추가할 때는 **맨 뒤에** 붙입니다. `김영남B`의 `B`는 동명이인 구분자라 원문 표기를 유지합니다.

**임직자 사진** — 카톡방에서 받은 사진의 파일명을 `이름.jpg`로 바꿔 한 폴더(예: `assets/photo-originals/ordainees/`)에 모은 뒤:

```sh
pip install pillow
python scripts/resize-photos.py --ordainees assets/photo-originals/ordainees
```

→ `FE/public/ordainees/NN.webp`(300×300, 가운데보다 조금 위를 기준으로 정사각 크롭)가 생기고, 명단에 없는 이름과 아직 사진이 없는 사람을 알려 줍니다. 그다음 `ordaineePhotos: true`. 일부만 있어도 되며 없는 사람은 성(첫 글자) 자리로 남습니다. 사진 교체는 `--force`.

카톡방 사진은 상반신·전신·셀카가 섞여 있어 가운데 크롭으로는 원 안의 얼굴 크기가 제각각입니다. 2026-10-25에는 얼굴 인식(OpenCV YuNet)으로 **얼굴 폭 × 2.5 정사각, 눈높이 42%** 상자를 정해 원본을 미리 잘라 `assets/photo-originals/ordainees-cropped/`에 두고, 그 폴더를 위 명령에 넣었습니다. 상자는 `assets/photo-originals/ordainee-crops.json`(`[왼쪽, 위, 한 변]`, 원본 픽셀)에 남아 있습니다. 둘 다 git 제외입니다.

**갤러리 사진** — 원본을 한 폴더에 두고:

```sh
python scripts/resize-photos.py --source assets/photo-originals/gallery --slug gallery
```

→ `FE/public/gallery/{thumb,full}/NN.webp`(원본 이름순 번호)가 생기고 사진마다 비율을 출력합니다. 그다음 `photosOf('gallery', [비율, …], '갤러리')`에 그 비율을 순서대로 적고, `gallery.rows`(줄마다 사진 수, 사진 순서대로 채움)를 맞춥니다. 같은 줄의 칸은 높이가 같고 폭이 비율대로 나뉘므로 사진이 잘리지 않습니다. 비율이 비슷한 사진끼리 한 줄에 두고, 파노라마처럼 아주 넓은 사진은 한 줄을 다 쓰게 합니다(두 장이 한 줄이면 높이가 너무 낮아짐). 추가는 `--start`로 다음 번호부터.

**20주년 기념 영상** — 교회 YouTube 채널의 영상을 임베드합니다. 바꾸려면 `gallery.video.youtubeId`(`youtu.be/<ID>`의 ID)만 고칩니다. 업로더가 외부 임베드를 막은 영상은 재생되지 않으니 `https://www.youtube.com/oembed?url=<영상 주소>&format=json`이 200을 주는지 먼저 확인합니다.

**로고** — 원본은 [2026 하나로 가족 한마당](https://github.com/HoneyWater8/2026_hanaro_family_festival) 레포의 `FE/public/icons/hanaro.png`(흰 배경)이며 `assets/logo/hanaro.png`에 두었습니다. `python scripts/prepare-logo.py`가 흰 배경을 투명하게 바꿔 `FE/src/assets/logo.webp`(240px, 무손실)를 만듭니다 — 붉은 띠 안의 흰 글자는 그대로 두고 나머지 흰색만 「흰색 → 투명」으로 바꾸므로 띠 글자에 구멍이 뚫리지 않고 획 가장자리에 흰 테두리가 남지 않습니다. 첫 화면·마지막 화면의 로고는 `homepage`(교회 홈페이지)를 새 창으로 엽니다 — 링크 영역은 로고 크기만큼.

**탭 아이콘** — 첫 화면의 꽃(살구꽃) 그림을 1024px로 렌더링해 내용만 잘라 정사각 여백 8%로 가운데 두고 `favicon-32`·`favicon-180`(투명)과 `apple-touch-icon`(배경색 `#FFF8F4` — iOS는 투명을 검게 채움)을 만들었습니다 (졸업 레포 왁스 씰 아이콘과 같은 방식).

**섹션 꽃** — 섹션과 꽃의 짝은 `flowers.bySection`, 꽃 모양(한 송이·가지)은 `flowers.info`. 무슨 꽃이고 어느 말씀의 꽃인지는 그 옆 주석에 있습니다 (화면에는 꽃 이름을 쓰지 않음).

**마지막 화면 말씀** — `closing`. `lines`는 화면에 보일 줄 단위(길이가 고르게 끊음), `sign`은 장절. 새 글자가 생기면 부분 폰트를 다시 만듭니다.

**폰트 글자 추가** — `npm run build`는 소스 문자열을 검사합니다. 부분 폰트에 없는 새 글자가 있으면 빌드가 실패하며 재생성 명령을 안내합니다. 레포 루트에서 `pip install fonttools brotli` 후 `python scripts/prepare-fonts.py --download`(이후에는 캐시 재사용으로 `--download` 없이)를 실행하고 생성된 WOFF2·manifest를 함께 커밋합니다. 원본·라이선스는 [폰트 안내](./FE/public/licenses/fonts/README.md).

---

## 디자인 토큰 (`FE/src/theme/tokens.ts`)

```ts
BL.outer    = '#F3E1DB'   // 460px 밖 여백 · body
BL.bg       = '#FFF8F4'   // 기본 배경 (첫 화면·일시·오시는 길·안내)
BL.bg2      = '#FCEEE9'   // 교차 배경 (모시는 글·임직자·갤러리·마지막)
BL.text     = '#3A2A2C'
BL.textSoft = '#6B585A'
BL.label    = '#B44B60'   // 작은 글씨 강조 — bg 위 4.86:1
BL.accent   = '#C2566A'   // 장식·큰 글씨 전용 — bg 위 4.14:1
BL.accent2  = '#8FAA8A'   // 장식 전용 초록
BL.card     = '#FFFFFF'   // 카드 (radius 18, 장밋빛 그림자)
BL.photo    = '#F7DEDA'   // 사진·지도 자리
BL.video    = '#241A1C'   // 영상 자리 (플레이어가 뜨기 전)
```

폰트 — 제목은 **고운바탕**, 본문은 **Pretendard**, 영문 라벨은 **Cormorant Garamond(600, 이탤릭)**. 필요한 글자만 부분 폰트로 제공합니다. Pretendard는 OFL Reserved Font Name이 있어 부분 폰트에 원래 이름을 쓸 수 없으므로, 세 서체 모두 내부 이름을 `Ordain Batang`·`Ordain Sans`·`Ordain Garamond`로 바꿨습니다.

> ⚠️ 코드 주석에도 박혀 있는 두 가지
> 1. `BL.accent`는 **24px 미만 텍스트에 쓰면 안 됩니다.** 작은 글씨는 `BL.label`.
> 2. `FF.latin`(Garamond)은 **한글 글리프가 없습니다.** 한글이 섞인 문자열에 쓰면 서체가 갈라집니다.

---

## 구현 노트

핸드오프 프로토타입에서 바꾼 것과 그 이유. 코드에 주석으로 표시해 두었습니다.

1. **스크롤 컨테이너** — 시안은 body 스크롤이지만 앞선 두 레포처럼 `[data-scroll-root]`가 스크롤합니다. IntersectionObserver의 root도 그 컨테이너입니다.
2. **오버레이는 앱 폭에 맞춰** — 확대 보기는 `fixed` + 가운데 정렬 + `maxWidth: 460`. 시안의 `inset: 0`은 데스크톱에서 앱 바깥 여백까지 덮습니다. body가 원래 스크롤하지 않으므로 시안의 body 스크롤 잠금은 뺐습니다.
3. **달력 요일** — 첫 칸 `일` → `주`. 졸업 레포에서 사용자가 지시한 교회 관례(2026-09-11).
4. **명단** — 시안은 데이터를 화면에서 정렬했고, 원문 순서가 맞는지가 TODO였습니다. 2026-10-23 사용자 결정으로 화면은 가나다순, 데이터는 원문 순서 보관.
5. **모션 감소** — 시안은 애니메이션만 멈춰 떨어지는 꽃잎이 섹션 위쪽에 박제됐습니다. 꽃잎을 아예 그리지 않습니다.
6. **화면 밖 애니메이션 정지** — 섹션마다 무한 애니메이션 9~17개(모서리 꽃 2 · 꽃잎 3~7장 × 2층 · 구분선 꽃 1)가 돌아 화면 밖 섹션은 일시정지합니다 (졸업 레포 2026-09-27 화면 밖 최적화와 같은 취지).
7. **반복 계산 제거** — 수선화 부화관·감람의 도형은 렌더마다 다시 계산하지 않고 모듈 로드 시 한 번만 만듭니다.
8. **마지막 화면** — 저작권과 `DESIGNED & DEVELOPED BY HONEYWATER`를 화면 하단에 둡니다. 시안에는 제작자 표기가 없었고, 두 참고 레포의 표기·졸업 레포의 하단 배치 요청을 따랐습니다.
9. **추가한 것** — 오시는 길의 실제 지도·길찾기·주소 복사(가족 한마당), 갤러리 확대 보기·공유 버튼(졸업), 20주년 영상(YouTube 임베드).
10. **YouTube는 표준 플레이어 + 지연 로딩** — 졸업 레포처럼 포스터를 먼저 보여 주고 누르면 플레이어로 바꾸면, 아이폰에서 두 번 눌러야 재생됩니다. 그 방식을 쓴 이유(자체 호스팅 전송량)가 YouTube에는 없어 표준 플레이어를 `loading="lazy"`로 둡니다. Referer를 지우면 YouTube가 재생 오류로 막습니다.
11. **갤러리 칸은 사진 비율대로** — 시안의 2열 정사각 칸(넓게·2·2·넓게·2)은 받은 사진이 모두 가로라 많이 잘렸습니다. 같은 줄은 높이를 맞추고 폭을 비율대로 나눕니다 (2026-10-25 사용자 요청).
12. **SCROLL 힌트는 늦게** — 시안은 처음부터 떠 있었습니다. 졸업 레포처럼 스크롤하지 않은 채 2.5초가 지나면 나타나고, 한 번 스크롤하면 다시 나오지 않습니다 (2026-10-25 사용자 요청, 처음 3초에서 2.5초로).
13. **꽃잎 수** — 시안의 「섹션 높이 / 420, 최소 2」, 첫 화면 3장에서 「섹션 높이 / 320, 최소 3」, 첫 화면 4장으로 화면 하나에 한 장꼴 늘렸습니다 (2026-10-25 사용자 요청 「살짝만」).
14. **말씀 제외** — 시안의 핵심이던 꽃 캡션(`꽃 이름 | 장절 | ?` + 구절)에서 장절·「?」·구절과 「?」 해설 시트를 뺐습니다 (2026-10-25 담당 전도사 「말씀 부분은 빼자」). 꽃 이름은 사용자 요청으로 남겼다가 2026-10-27 담당 전도사 요청(「이모티콘만 남겨두면 좋을듯」)으로 뺐습니다. 꽃 그림·피어나는 구분선·모서리 꽃·꽃잎은 그대로입니다.
15. **맺는 말씀** — 시안의 마지막 화면은 종려나무 + 캡션이었습니다. 졸업 레포의 「맺는 말씀」처럼 민수기 17:8 전문을 『 』로 감싸 두고, 꽃을 그 말씀의 살구꽃으로 바꿔 첫 화면과 같은 꽃으로 맺습니다. 종려나무 그림은 쓰는 곳이 없어 지웠습니다 (2026-10-25 사용자 요청).
16. **지도는 늦게, 터치 없이** — 가족 한마당은 처음부터 지도를 불러, 맨 위 화면에서도 지도 SDK·타일 약 430KB(첫 로딩의 47%)를 받았습니다. 화면에서 800px 안으로 가까워지면 불러옵니다. 또 지도가 터치를 받으면 한 손가락으로 지도 위를 쓸 때 페이지가 스크롤되지 않아(터치 에뮬레이션 0px — 카카오 API로 끌기·확대를 꺼도 같음) 지도는 입력을 받지 않고 길찾기는 지도 앱 버튼이 맡습니다. 네이버지도 버튼은 좌표 대신 장소 페이지(ID `12158606`)로 엽니다 — 좌표만 넘기면 핀·장소 이름이 없었습니다 (2026-10-25 검토).
17. **검색 노출 막음** — 임직자 66명의 실명·얼굴 사진이 있어 `index.html`의 `noindex` 메타와 `vercel.json`의 `X-Robots-Tag` 헤더(사진 파일까지)로 검색엔진에 올리지 않습니다. `robots.txt`는 두지 않습니다 — 카카오톡 공유 미리보기 스크래퍼가 따를 수 있습니다 (2026-10-25 검토).

---

## 디자인 아카이브 (`FE-legacy/`)

Claude Design 핸드오프 번들 중 이번 프로젝트 자료만 옮겼습니다 (번들의 가족 한마당·졸업 자료는 각 레포 `FE-legacy/`와 같아 제외).

| 단계 | 탐색 | 결과 |
|---|---|---|
| 1차 · 시안 3종 | A 단아(한지·먹) / **B 따뜻한 축하(꽃·파스텔)** / C 클래식(금박·카드) | **B 선택** |
| 2차 · B의 꽃 표현 | 꽃말 / **성경 속 꽃** | **성경 속 꽃 확정** (2026-10-23) |

- 구현 기준 스펙: [`FE-legacy/README.md`](./FE-legacy/README.md)
- 경과: [`FE-legacy/DESIGN_PROCESS.md`](./FE-legacy/DESIGN_PROCESS.md)
- 프로토타입 실행: `cd FE-legacy/final && npx serve .` → `ordain-b-bible.html`

---

## 남은 과제

- [x] ~~로고~~ — 2026-10-24 가족 한마당 레포 로고, 흰 배경 제거 / 탭 아이콘은 살구꽃
- [x] ~~임직자 사진~~ — 2026-10-25 66명 반영 (얼굴 기준 자르기)
- [x] ~~갤러리 사진~~ — 2026-10-25 8장 반영, 칸을 사진 비율대로
- [x] ~~20주년 기념 영상~~ — 2026-10-24 교회 YouTube 영상 임베드
- [x] ~~예배 순서~~ — 2026-10-24 담당 전도사 요청으로 섹션 제외
- [x] ~~성경 구절 원문 대조 · 「?」 해설글 검토~~ — 2026-10-25 담당 전도사 피드백으로 말씀 부분을 빼 필요 없어짐
- [x] ~~공유 썸네일~~ — 2026-10-24 1200×630 (로고·제목·일시·살구꽃)
- [x] ~~카카오 공유 앱 JavaScript 키~~ — 2026-10-25 `VITE_KAKAO_JS_KEY` (Vercel Production·Preview)
- [x] ~~GA4 측정 ID~~ — 2026-10-25 `G-YBDXKFTNVQ`, `index.html` 표준 스니펫
- [x] ~~첫 배포 후 프로덕션 별칭 · 배포 주소에서 지도~~ — 2026-10-24 확인
- [x] ~~아이폰/카카오 인앱 실기기 확인~~ — 2026-10-25 사용자가 아이폰 · 갤럭시 · 카카오톡 앱 안에서 확인 (카카오톡 공유도 동작)
- [x] ~~GitHub 저장소 공개 범위~~ — 2026-10-25 사용자 결정으로 공개 유지 (사이트는 검색 노출을 막음)
- [x] ~~GA 향상된 측정의 「스크롤」 끄기~~ — 2026-10-25 끔. 이 페이지에서는 모든 방문자에게 나가 의미가 없었음 (「사용자 집계」 참고)
- [ ] 운영 기간(언제 내릴지) 정하기

---

## 크레딧

- 기획 · 자료 — **하나로교회**
- 디자인 & 개발 — **HONEYWATER** ([@HoneyWater8](https://github.com/HoneyWater8))

앞선 작업: [2026 하나로 가족 한마당 초대장](https://github.com/HoneyWater8/2026_hanaro_family_festival) · [아멘 제자 17기 졸업](https://github.com/HoneyWater8/2026_amen17_graduation)
