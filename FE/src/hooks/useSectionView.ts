import { useEffect } from 'react';
import type { RefObject } from 'react';
import { track } from '../utils/analytics';

/**
 * 어느 섹션까지 내려갔는지 — 스크롤 깊이를 섹션 단위로 집계한다.
 * 40% 이상 보여야 세고, 스크롤을 왕복해도 섹션마다 한 번만 보낸다.
 */
export function useSectionView(ref: RefObject<HTMLElement | null>, label: string) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = el.closest('[data-scroll-root]');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) track('section_view', { section: label }, true);
      },
      { threshold: 0.4, root: root as Element | null }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, label]);
}
