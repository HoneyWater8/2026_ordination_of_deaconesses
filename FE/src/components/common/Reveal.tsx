import { useRef } from 'react';
import type { ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { MOTION } from '../../theme/tokens';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
};

/** 스크롤 진입 시 페이드 + 상승. */
export function Reveal({ children, delay = 0, y = 16 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = useReveal(ref);
  const reduced = usePrefersReducedMotion();
  // 모션 감소 모드에선 트랜지션 없이 즉시 visible.
  const visible = reduced || shown;
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : `translateY(${y}px)`,
      transition: reduced ? 'none' : `${MOTION.revealOpacity} ${delay}s, ${MOTION.revealTransform} ${delay}s`,
    }}>
      {children}
    </div>
  );
}
