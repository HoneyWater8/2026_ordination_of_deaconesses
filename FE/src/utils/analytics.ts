/* ─────────────────────────────────────────────────────────
   사용자 집계 — 커스텀 이벤트 전송

   GA4 초기화(gtag.js 로드 + config)는 index.html의 표준 스니펫이 담당한다.
   모듈로 감싸 동적 로드했을 때 page_view가 `en` 파라미터 없이 나가
   GA가 이벤트를 인식하지 못하는 문제가 있었다 (2026-09-11).

   방문자 수·페이지뷰·유입 경로는 Vercel Web Analytics(<Analytics />)가 맡고,
   여기서는 Hobby 플랜이 지원하지 않는 행동 이벤트만 GA4로 보낸다.
   ───────────────────────────────────────────────────────── */

type GtagParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** 같은 이벤트가 스크롤 왕복 등으로 중복 발사되는 것을 막는다 */
const fired = new Set<string>();

/**
 * 커스텀 이벤트 전송.
 *
 * @param once true면 같은 키로 한 번만 보낸다 (섹션 도달처럼 왕복하는 이벤트용)
 */
export function track(name: string, params?: GtagParams, once = false) {
  if (once) {
    const key = `${name}:${JSON.stringify(params ?? {})}`;
    if (fired.has(key)) return;
    fired.add(key);
  }
  window.gtag?.('event', name, params);
}

/** 한 번 열 때 보내는 오류 수 상한 — 같은 오류가 반복되거나 연쇄로 터져도 집계가 넘치지 않게 */
const MAX_ERRORS = 5;
const sentErrors = new Set<string>();

/**
 * 오류·실패를 GA4 표준 `exception` 이벤트로 보낸다. 같은 내용은 한 번만.
 *
 * 아이폰·카카오톡 앱 안 브라우저는 직접 확인하지 못한 환경이라, 그곳에서만 나는 오류를 보려는 것이다.
 * 카카오 지도·공유처럼 실패해도 화면이 조용히 대체되는 곳은 호출부에서 직접 부른다.
 * GA 매개변수 값은 100자까지라 자른다.
 */
export function trackError(description: string, fatal = false) {
  const d = description.slice(0, 100);
  if (sentErrors.has(d) || sentErrors.size >= MAX_ERRORS) return;
  sentErrors.add(d);
  track('exception', { description: d, fatal });
}

/** 처리되지 않은 오류를 모은다. 앱보다 먼저 등록해야 첫 렌더 중 오류도 잡힌다 */
export function initErrorTracking() {
  window.addEventListener('error', (e) => {
    // 다른 출처 스크립트(GA·카카오·YouTube)의 오류는 브라우저가 내용을 가려 "Script error."만 오고,
    // 앱 안 브라우저가 끼워 넣은 스크립트의 오류는 파일 이름이 없다 — 둘 다 이 앱의 오류가 아니라 버린다
    if (!e.filename || e.message === 'Script error.') return;
    // fatal = 앱 코드에서 처리하지 못한 오류(화면이 깨졌을 수 있음). 처리된 실패·Promise 거부는 false
    trackError(`${e.message.replace(/^Uncaught /, '')} @ ${e.filename.split('/').pop()}:${e.lineno}`, true);
  });
  window.addEventListener('unhandledrejection', (e) => {
    const reason: unknown = e.reason;
    trackError(`unhandled: ${reason instanceof Error ? reason.message : String(reason)}`);
  });
}
