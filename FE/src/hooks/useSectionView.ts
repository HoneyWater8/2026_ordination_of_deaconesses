import { useEffect } from 'react';
import type { RefObject } from 'react';
import { track } from '../utils/analytics';

/**
 * 어느 섹션까지 내려갔는지 — 스크롤 깊이를 섹션 단위로 집계한다.
 * 섹션이 화면 가운데 선을 지나면 세고, 스크롤을 왕복해도 섹션마다 한 번만 보낸다.
 *
 * 처음엔 「섹션의 40% 이상이 보이면」(threshold 0.4)이었는데, 그 비율은 섹션 높이 대비라
 * 화면 높이의 2.5배가 넘는 섹션(05 임직자, 화면의 약 3배)은 끝까지 닿지 못해 한 번도
 * 집계되지 않았다 (2026-10-25 확인). 가운데 선 기준은 섹션 높이와 상관없이 동작한다.
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
      // 위아래를 절반씩 깎아 판정 영역을 화면 가운데 한 줄로 만든다
      { root: root as Element | null, rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, label]);
}
