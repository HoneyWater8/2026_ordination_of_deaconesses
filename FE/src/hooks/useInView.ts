/* ───── 화면 근처 자산 준비와 실제 표시 중 모션을 구분한다 ───── */
import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

/**
 * 요소가 스크롤 컨테이너의 화면(± rootMargin) 안에 있는지.
 * once면 처음 들어온 뒤로는 관찰을 끊고 true를 유지한다 — 한 번만 불러오면 되는 지도 같은 것.
 */
export function useInView(ref: RefObject<HTMLElement | null>, rootMargin = '0px', once = false) {
  const [inView, setInView] = useState(false);
  const enteredOnce = once && inView;
  useEffect(() => {
    const element = ref.current;
    if (!element || enteredOnce) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, { root: element.closest('[data-scroll-root]'), rootMargin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin, enteredOnce]);
  return inView;
}
