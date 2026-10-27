/* ─────────────────────────────────────────────────────────
   Bloom · 권사 임직 감사예배 디자인 토큰
   FE-legacy/README.md 「Design Tokens」의 B · bloom 확정값과 1:1 대응
   ───────────────────────────────────────────────────────── */

export const BL = {
  /** 460px 루트 바깥 여백 — index.css의 body 배경과 같은 값 (CSS 파일이라 토큰을 쓸 수 없어 따로 적는다) */
  outer:    '#F3E1DB',
  /** 기본 배경 — 첫 화면·일시·오시는 길·안내 */
  bg:       '#FFF8F4',
  /** 교차 배경 — 모시는 글·임직자·갤러리·마지막 화면 (04 예배 순서를 뺀 뒤 05~09가 한 칸씩 뒤집혔다) */
  bg2:      '#FCEEE9',

  text:     '#3A2A2C',
  textSoft: '#6B585A',

  /** 작은 글씨용 강조색 — bg 위 4.86:1. 영문 라벨·장절·배지·달력 강조 */
  label:    '#B44B60',
  /** 장식·큰 글씨 전용 — bg 위 4.14:1이라 24px 미만 텍스트 금지 (작은 글씨는 label) */
  accent:   '#C2566A',
  /** 장식 전용 초록 — 2.41:1이라 텍스트 금지 */
  accent2:  '#8FAA8A',
  onAccent: '#FFFFFF',

  line:     'rgba(58,42,44,0.16)',
  card:     '#FFFFFF',
  cardLine: 'rgba(58,42,44,0.12)',
  cardRadius: 18,
  cardShadow: '0 10px 28px rgba(194,86,106,0.08)',

  /** 사진·지도 자리 배경 — 이 위의 label은 3.99:1이라 큰 글씨(임직자 이니셜)에만. 지도 실패 안내는 text·textSoft(10.6·5.2:1) */
  photo:    '#F7DEDA',
  /** 영상 자리 배경 — 플레이어가 뜨기 전에 보이는 바탕. 영상 화면과 이어지게 어두운 색 */
  video:    '#241A1C',
};

export const FF = {
  /** 제목 — 고운바탕 */
  display: '"Ordain Batang", serif',
  /** 본문 — 프리텐다드 */
  body:    '"Ordain Sans", -apple-system, sans-serif',
  /** 영문·숫자 전용. ⚠ 한글 글리프가 없어 한글 섞인 문자열에 쓰면 서체가 갈라짐 */
  latin:   '"Ordain Garamond", "Ordain Batang", serif',
};

/** 모션 값 — 핸드오프 프로토타입의 타이밍 그대로 */
export const MOTION = {
  /** 스크롤 진입 — 페이드 + 상승 */
  revealOpacity:   'opacity .8s ease',
  revealTransform: 'transform .9s cubic-bezier(.22,1,.36,1)',

  /** 구분선 가운데 꽃이 피어남 — scale 0 → 1 + 회전 (살짝 튀어 오르는 곡선) */
  ornBloom:   'transform 1.1s cubic-bezier(.34,1.56,.64,1) .15s',
  /** 구분선 양옆 선이 가운데서 펼쳐짐 */
  ornLine:    'transform 1s cubic-bezier(.22,1,.36,1) .35s',

  /** 첫 화면 하단 SCROLL 바운스 */
  scrollBob:  'od-bob 2.2s ease-in-out infinite',
};

/** 루트 레이아웃 */
export const LAYOUT = {
  maxWidth: 460,
};
