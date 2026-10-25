/* ─────────────────────────────────────────────────────────
   공유 공통 유틸 — 정식 URL 해석 · 클립보드 복사 · 네이티브 공유
   ───────────────────────────────────────────────────────── */

/**
 * 공유할 정식 URL.
 *
 * index.html의 `og:url`을 단일 출처로 삼는다. 컴포넌트에 상수로 또 박아두면
 * 도메인이 바뀔 때 한쪽만 고치고 다른 쪽을 놓치기 쉽다.
 * (참고 레포는 상수로 두어 og:url과 이중 관리했다)
 */
export function canonicalUrl(): string {
  const og = document
    .querySelector('meta[property="og:url"]')
    ?.getAttribute('content');
  return og || window.location.origin + window.location.pathname;
}

/**
 * 클립보드 복사 — 링크 복사(공유 시트)와 주소 복사(CopyButton)가 함께 쓴다.
 * 모던 브라우저는 navigator.clipboard, 그 외 환경(비-https·일부 앱 안 브라우저 등)은
 * document.execCommand로 대신한다. 둘 다 실패하면 false.
 * (예전엔 주소 복사에만 대체 경로가 있어, 같은 환경에서 링크 복사만 실패할 수 있었다)
 */
export async function copyText(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* 아래 대체 경로로 */
    }
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/** 네이티브 공유 시트 사용 가능 여부 (모바일 브라우저 대부분 지원). */
export function canNativeShare(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

/**
 * 네이티브 공유 시트. 카카오 JS키가 없을 때의 폴백 경로다.
 * 사용자가 시트를 그냥 닫으면 AbortError가 나는데 실패가 아니므로 성공으로 친다.
 */
export async function nativeShare(url: string, title: string): Promise<boolean> {
  if (!canNativeShare()) return false;
  try {
    await navigator.share({ title, url });
    return true;
  } catch (e) {
    if (e instanceof DOMException && e.name === 'AbortError') return true;
    return false;
  }
}
