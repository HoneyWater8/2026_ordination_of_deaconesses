import { useRef } from 'react';
import { BL, MOTION } from '../../theme/tokens';
import { O } from '../../data/ordination';
import type { FlowerKind } from '../../data/types';
import { useReveal } from '../../hooks/useReveal';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Flower } from './Flower';
import { FlowerCaption } from './FlowerCaption';

type FlowerOrnProps = {
  kind: FlowerKind;
  /** 구분선 전체 폭 */
  w: number;
  /** 아래에 꽃 이름을 붙인다 */
  caption?: boolean;
};

/**
 * 꽃 구분선 — 화면에 들어오면 가운데 꽃이 피어나고(scale 0 → 1 + 회전) 양옆 선이 펼쳐진다.
 * 핀 뒤에는 한 송이(head)는 천천히 회전, 가지(sprig)는 살랑인다.
 */
export function FlowerOrn({ kind, w, caption = false }: FlowerOrnProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const on = useReveal(ref) || reduced;
  const sprig = O.flowers.info[kind].type === 'sprig';

  const line = (origin: string) => ({
    width: w / 2 - 18, height: 1, background: BL.line,
    transform: on ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: origin,
    transition: reduced ? 'none' : MOTION.ornLine,
  });

  return (
    <div ref={ref} style={{ margin: '14px 0 4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <span style={line('right')} />
        <div style={{
          transform: on ? 'scale(1) rotate(0deg)' : `scale(0) rotate(${sprig ? -30 : -120}deg)`,
          transition: reduced ? 'none' : MOTION.ornBloom,
        }}>
          <div className="od-anim" style={{
            transformOrigin: sprig ? '50% 95%' : '50% 50%',
            animation: on ? `${sprig ? 'od-sway' : 'od-turn'} ${sprig ? 6 : 11}s ease-in-out 1.4s infinite` : 'none',
          }}>
            <Flower kind={kind} size={sprig ? 46 : 38} />
          </div>
        </div>
        <span style={line('left')} />
      </div>
      {caption && (
        <FlowerCaption kind={kind} style={{
          marginTop: 10, opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(6px)',
          transition: reduced ? 'none' : MOTION.captionIn,
        }} />
      )}
    </div>
  );
}
