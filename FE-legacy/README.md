# Handoff: 2026 권사 임직 감사예배 · 모바일 초대장

> **아카이브 안내** — 이 폴더는 Claude Design 핸드오프 번들(`2026하나로권사임직감사예배.zip`)에서 **이번 프로젝트(`03_ordination/`) 자료만** 옮긴 것입니다.
>
> - 번들의 `01_hanaro_family_day/`·`02_amen17_graduation/`은 각 프로젝트 레포의 `FE-legacy/`와 내용이 같아 옮기지 않았습니다 (2026-10-23 대조 — 02는 바이트 단위 동일, 01은 줄바꿈만 다름).
> - 원본 `03_ordination/`은 평면 구조였으나 참고 레포 구조에 맞춰 `final/`(채택안)·`explorations/`(미채택 시안)으로 나눴습니다. **파일 내용은 바꾸지 않았습니다.**
> - 이 문서는 원본 `03_ordination/README.md` 본문을 그대로 두고 「Files」 절만 새 경로에 맞게 고쳤으며, 번들 최상위 README의 공통 사항을 맨 아래에 옮겼습니다.
> - **최종 채택: B · 성경 속 꽃** (`final/ordain-b-bible.html`) — 2026-10-23 확정. 선정 과정은 [DESIGN_PROCESS.md](./DESIGN_PROCESS.md).

## Overview
하나로교회 권사 66명 임직 감사예배(2026.11.8 주일 오후 2시, 김포 하나로교회 B2 다윗성전) 초대장입니다.
시안 3종(A 단아 / B 따뜻한 축하 / C 클래식) 중 **B가 선택**되었고, B는 다시 꽃 표현 2버전으로 발전했습니다.
- `ordain-b-bloom.html` — 섹션별 꽃 + **꽃말** 테마
- `ordain-b-bible.html` — 섹션별 **성경 속 꽃** + 성경 구절 + "?" 버튼으로 말씀 해설 (최신, 유력)

## About the Design Files
HTML 디자인 레퍼런스입니다. 실서비스 환경(권장: Vite + React)에서 재구현하세요. 구조는 하나(`ordain-app.jsx`)이고, `window.SKIN_KEY`('ink' | 'bloom' | 'gold')로 스킨만 바꿉니다. 꽃 일러스트는 B 전용 파일(`ordain-flowers.jsx`, `ordain-flowers-bible.jsx`)이 `window.ODF`로 주입하며, 없으면 꽃 관련 UI가 자동으로 빠집니다.

## Fidelity
High-fidelity. 로고·임직자 사진 66장·갤러리 8장·지도는 플레이스홀더. **예배 순서는 일반적인 임직예배 기준 임시안**(제목 옆 "임시" 배지).

## Files
```
final/                        ← 채택안 · B 성경 속 꽃
  ordain-b-bible.html         진입점
  ordain-app.jsx              공용 앱 (스킨 3종, 9개 블록)
  ordain-data.js              실제 데이터 (교회·일시·장소·초대글·순서·명단 66명·안내)
  ordain-flowers-bible.jsx    B·성경 버전 꽃 9종 SVG + 구절·해설

explorations/                 ← 채택되지 않은 시안 (참고용)
  ordain-a-ink.html           A · 단아 (한지·먹)
  ordain-b-bloom.html         B · 꽃말 버전
  ordain-c-gold.html          C · 클래식 (금박·카드)
  ordain-flowers.jsx          B·꽃말 버전 꽃 9종 SVG + INFO/SEC 매핑
  ordain-app.jsx              final/과 동일한 사본 — 이 폴더만으로 실행되도록 함께 둠
  ordain-data.js              final/과 동일한 사본

screenshots/                  ← 화면 캡처 (원본 번들에 없어 2026-10-23 직접 촬영 · 390×844 · DPR 2)
  final/01~09                 성경 버전 섹션 9개 — 섹션 전체 높이
  final/10-verse-sheet        「?」 말씀 해설 바텀시트
  explorations/               a-ink · b-bloom · c-gold 첫 화면
```

> 로컬 확인: 각 폴더에서 정적 서버를 띄우세요 (`cd FE-legacy/final && npx serve .` → `ordain-b-bible.html`). `.jsx`를 `<script src>`로 불러오므로 `file://`로는 열리지 않습니다.

## Screens — 세로 스크롤, 최대 폭 460px
모든 섹션 `min-height: 100dvh`, 내용 세로 가운데 정렬. 섹션 패딩 76px 22px. 배경은 bg/bg2 교차.
섹션 헤더: 영문 라벨(Cormorant Garamond 600, B는 italic 18px) → 한글 제목(fDisplay 27px) → 장식 구분선(Orn).

1. **Hero** (100dvh) — 로고 자리(60px) · 교회명 · 영문 타이틀 · "권사 *임직*"(B: 46px, 임직은 accent) · "감사예배" · 구분선 · 날짜/장소 · (B) 꽃 캡션 · 하단 SCROLL 바운스
2. **모시는 글** — 초대글(본문 15.5px, lh 2.05, 가운데 정렬)
3. **예배 일시** — 카드: 11월 달력(8일 강조) + D-day 배지(줄바꿈 금지) + 시간/장소
4. **예배 순서** — 1부 감사예배 / 2부 임직식 / 3부 축하와 파송, 항목 ─ 담당 (점선 리더)
5. **임직받으시는 분** — "66명의 권사님을 세웁니다" + 사진 그리드(가나다순, B는 원형 1:1). 동명이인 접미사(`김영남B`)는 작게 표시
6. **오시는 길** — 지도 자리(`data-role="map-slot"`) + 주소/지하철/주차 행
7. **갤러리** — 2열 사진 자리 8개
8. **안내** — 안내문 카드
9. **Footer** (100dvh) — (B) 마지막 꽃 + 캡션 · 로고 · 교회명 · ©

## B 스킨 꽃 시스템 (핵심)
- 섹션마다 고유한 꽃. 매핑은 꽃 파일의 `SEC` (섹션 라벨 → 꽃 key), 첫 화면 `HERO`, 마지막 `FOOTER`.
  - **꽃말 버전**: 백합(첫화면) · 붓꽃 · 프리지아 · 라벤더 · 카네이션 · 해바라기 · 물망초 · 은방울꽃 · 분홍 장미(마지막)
  - **성경 버전**: 살구꽃 민17:8(첫화면) · 샤론의 수선화 아2:1 · 백합화 사35:1 · 우슬초 시51:7 · 석류 출28:33 · 감람나무 시52:8 · 포도나무 요15:5 · 들의 백합화(아네모네) 마6:28 · 종려나무 시92:12(마지막)
- 꽃은 전부 **코드로 그린 SVG** (viewBox 100×100, 그라디언트·잎맥·수술 포함, 일부는 절차적 생성). `type: 'head' | 'sprig'`로 배치 방식이 다름.
- 섹션 안 사용처:
  1. **구분선 가운데 아이콘**(head 38px / sprig 46px): 화면 진입 시 scale 0→1 + 회전으로 "피어남", 양옆 선이 가운데서 펼쳐짐. 이후 천천히 회전(head, 11s) 또는 살랑(sprig, 6s).
  2. **캡션**: `꽃 이름 | 꽃말` (꽃말 버전) / `꽃 이름 | 장절 | ?` + 아래 구절 한 줄(Gowun Batang 13.5px, 최대 300px) (성경 버전).
  3. **배경 모서리 꽃 2송이**(opacity .5/.42, head는 위 모서리, sprig는 아래 모서리에서 자람, 좌우 반전 교차) + `odSway` 살랑.
  4. **떨어지는 꽃잎**: 섹션 높이를 ResizeObserver로 측정 → 섹션 맨 위에서 맨 아래까지 낙하(속도 ≈ 55px/s, 개수 = 섹션높이/420, 최소 2). 세로 이동(odFallY)과 좌우 흔들림·회전(odSpinX)을 별도 레이어로 분리.
- **"?" 버튼 → 말씀 해설 바텀시트** (성경 버전): 화면 아래에서 올라오는 시트(최대 폭 460, 위 모서리 24px, 최대 86dvh, `odSheetIn .42s`). 꽃 92px · 이름 · 장절 · 구절 박스(bg2) · 구분선 · 해설 본문(14.5px, lh 1.85, 왼쪽 정렬). 닫기: X(44px) / 바깥 / ESC. 열려 있는 동안 body 스크롤 잠금. `createPortal`로 body에 렌더(섹션 transform 영향 회피).
- 모든 꽃 애니메이션은 `.od-anim` 클래스 → `prefers-reduced-motion`이면 정지.

## Design Tokens
**B · bloom (선택)**
```
bg #FFF8F4  bg2 #FCEEE9  outer #F3E1DB
text #3A2A2C  textSoft #6B585A  label #B44B60  accent #C2566A  accent2 #8FAA8A
line rgba(58,42,44,.16)  card #FFFFFF  cardLine rgba(58,42,44,.12)
cardRadius 18  cardShadow 0 10px 28px rgba(194,86,106,.08)  photo #F7DEDA (원형)
fonts: display "Gowun Batang" · body "Pretendard" · latin "Cormorant Garamond" (italic)
```
A · ink: 한지 `#F7F3EA`/먹 `#1E1C19`/낙관 `#A23A2A`, Song Myung + Nanum Myeongjo, 붓터치 구분선, 각진 카드.
C · gold: 남색 `#0F1B31`, 금박 그라디언트 텍스트, 아이보리 카드 + 이중 금테, Nanum Myeongjo.
전체 값은 `ordain-app.jsx`의 `SKINS` 객체 참고.

## TODO / 확인 필요
- 로고, 임직자 사진 66장, 갤러리 8장, 지도 API — 미수령.
- 예배 순서 확정본.
- 명단 순서: 현재 가나다순 정렬. 원래 순서가 맞으면 정렬 제거.
- **성경 구절은 개역개정 기준 기억으로 옮김 → 원문 대조 필요.** 출 28:33은 일부만 인용.
- 꽃말 버전 / 성경 버전 중 최종 선택.

---

## 번들 공통 사항 (최상위 README에서 옮김)

### 이 파일들의 성격 (중요)
모든 HTML은 **디자인 레퍼런스 프로토타입**입니다. 브라우저에서 바로 돌아가도록 React 18 UMD + Babel Standalone(브라우저 내 JSX 변환)으로 만들었고, **그대로 배포용 코드로 쓰는 것을 의도하지 않았습니다.** 작업 목표는 이 디자인(레이아웃·색·타이포·모션·인터랙션)을 실제 프로젝트 환경에서 재구현하는 것입니다.

- 기존 코드베이스가 없다면 **Vite + React (또는 Next.js 정적 export)** 를 권장합니다. 세 프로젝트 모두 컴포넌트가 이미 React 함수형으로 쓰여 있어 이식이 쉽습니다.
- 데이터는 각 프로젝트의 `*-data.js` 한 파일에 분리돼 있습니다 (`window.XXX = {...}` → ES module export로 바꾸면 됨).
- 인라인 style 객체 중심으로 작성돼 있습니다. 이식 시 CSS Modules / Tailwind / styled-components 등 팀 규칙에 맞춰 옮기세요.

### Fidelity
**High-fidelity.** 색상 hex, 폰트, 크기, 간격, 애니메이션 타이밍이 모두 최종값입니다. 픽셀 단위로 재현하세요. 단, 사진·지도·로고 자리는 **플레이스홀더**(점선 박스)이며 실제 자료로 교체해야 합니다.

### 로컬에서 열어보기
모든 페이지는 모바일 기준(최대 폭 460px, 가운데 정렬)으로 설계됐습니다. 데스크톱에서는 DevTools 모바일 모드(390×844)로 보세요.

### 공통 사항
- 대상: 교회 성도·가족 (남녀노소). 카카오톡 등으로 링크/QR 공유되는 **모바일 우선** 페이지.
- 높이: `100vh` 대신 `100dvh` 사용 (모바일 주소창 대응).
- 스크롤바 숨김 (`scrollbar-width: none`).
- 진입 애니메이션은 `IntersectionObserver` 기반 reveal. 재구현 시 `prefers-reduced-motion` 대응 유지.
- 한국어 줄바꿈: 본문·캡션에 `word-break: keep-all` 적용.
