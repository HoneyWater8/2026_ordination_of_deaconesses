/* ───── 첫 화면 하단 SCROLL 힌트 (졸업 레포 ScrollHint와 같은 동작) ───── */
import { useEffect, useRef, useState } from 'react';
import { BL, FF, MOTION } from '../../theme/tokens';
import { useScrolled } from '../../hooks/useScrolled';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

type ScrollHintProps = {
  /** 첫 화면이 화면 근처에 있는지 — 아니면 바운스를 멈춘다 */
  playing: boolean;
  /** 첫 진입 후 힌트가 뜨기까지의 지연 (ms) */
  delay?: number;
};

/**
 * 아래에 더 있다는 표시. 처음부터 띄우지 않고, 스크롤하지 않은 채 delay가 지나면 서서히 나타난다.
 * 사용자가 한 번이라도 스크롤하면 사라지고 다시 나오지 않는다 — 그 전에 스크롤하면 아예 뜨지 않는다.
 *
 * delay 3초 — 첫 화면 Reveal(마지막 0.5s 시작)과 구분선 꽃 · 캡션이 2.2초쯤 자리를 잡으므로,
 * 그와 겹치지 않고 「멈춰 있는 사용자」에게만 보이도록 미뤘다. (졸업은 봉투가 열린 뒤 1.5초)
 */
export function ScrollHint({ playing, delay = 3000 }: ScrollHintProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scrolled = useScrolled(ref);
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  const visible = ready && !scrolled;

  // 나타나기·사라지기(바깥)와 바운스(안쪽)를 다른 레이어에 둔다 — od-bob이 opacity도 움직여서
  // 한 요소에 두면 애니메이션 값이 인라인 opacity를 덮어 페이드가 먹지 않는다.
  return (
    <div ref={ref} aria-hidden="true" style={{
      position: 'absolute', bottom: 30, left: 0, right: 0, pointerEvents: 'none',
      opacity: visible ? 1 : 0, transition: reduced ? 'none' : 'opacity .6s ease',
    }}>
      <div className="od-anim" style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, color: BL.textSoft,
        // 뜨기 전에는 바운스를 붙이지 않는다. 사라질 때는 멈춰서(paused) 제자리에서 흐려지게 —
        // 애니메이션을 떼면 바운스 중간 위치에서 0으로 튄다.
        animation: ready ? `${MOTION.scrollBob} ${visible && playing ? 'running' : 'paused'}` : undefined,
      }}>
        <span style={{ fontFamily: FF.latin, fontWeight: 600, fontSize: 11, letterSpacing: 3 }}>SCROLL</span>
        <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1 L6 6 L11 1" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
      </div>
    </div>
  );
}
