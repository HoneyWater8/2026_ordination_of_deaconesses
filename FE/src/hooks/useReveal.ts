import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * 요소가 화면에 들어왔는지 1회 판정. data-scroll-root 컨테이너 기준.
 *
 * 스크롤은 body가 아니라 App의 [data-scroll-root]가 담당하므로 IntersectionObserver의
 * root도 그 컨테이너여야 한다. (핸드오프 프로토타입은 body 스크롤이라 root가 없었다)
 * 봉투가 없는 페이지라 졸업 레포의 active 게이트는 두지 않는다.
 */
export function useReveal(ref: RefObject<HTMLElement | null>) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;
    const root = el.closest('[data-scroll-root]');
    const rect = el.getBoundingClientRect();
    const rootRect = root
      ? (root as HTMLElement).getBoundingClientRect()
      : { top: 0, bottom: window.innerHeight };
    // 이미 화면 안이면 관찰 없이 즉시 표시.
    if (rect.top < rootRect.bottom && rect.bottom > rootRect.top) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShown(true); },
      { threshold: 0.12, root: root as Element | null, rootMargin: '0px 0px -6% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, shown]);
  return shown;
}
