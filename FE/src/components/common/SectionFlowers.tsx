import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { O } from '../../data/ordination';
import type { FlowerKind } from '../../data/types';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Flower, FlowerBit } from './Flower';

/** 꽃잎이 섹션 맨 위에서 맨 아래까지 떨어지는 속도 (px/s) */
const FALL_SPEED = 55;
/** 이 높이마다 꽃잎 하나 (최소 MIN_PETALS개). 420px · 최소 2개에서 화면 하나에 한 장꼴로 늘림 (2026-10-25) */
const PETAL_EVERY = 320;
const MIN_PETALS = 3;

type SectionFlowersProps = {
  kind: FlowerKind;
  /** 섹션마다 배치가 달라지도록 섞는 값 — 섹션 라벨을 쓴다 */
  seed: string;
};

/**
 * 섹션 배경 — 그 섹션의 꽃이 모서리에서 살랑이고, 꽃잎이 천천히 떨어진다.
 *
 * head(한 송이)는 위 모서리, sprig(가지)는 아래 모서리에서 자라며 좌우 반전을 섹션마다 교차한다.
 * 배치는 라벨로 정해지는 값이라 새로고침해도 같은 자리에 놓인다.
 */
export function SectionFlowers({ kind, seed }: SectionFlowersProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [sectionHeight, setSectionHeight] = useState(800);
  const reduced = usePrefersReducedMotion();
  // 화면 밖 섹션의 무한 애니메이션은 멈춘다. 앞뒤 여유를 둬 들어올 때 이미 움직이고 있게 한다.
  const inView = useInView(boxRef, true, '200px 0px');

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSectionHeight(el.offsetHeight || 800));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const sprig = O.flowers.info[kind].type === 'sprig';
  const h = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
  const flip = h % 2 === 0;
  const big = sprig ? 150 : 128, small = sprig ? 110 : 84;
  const cornerA: CSSProperties = sprig ? { bottom: -16, [flip ? 'left' : 'right']: -34 } : { top: -36, [flip ? 'left' : 'right']: -42 };
  const cornerB: CSSProperties = sprig ? { bottom: -12, [flip ? 'right' : 'left']: -30 } : { bottom: -26, [flip ? 'right' : 'left']: -30 };
  const tilt = sprig ? 0 : (h % 40) - 20;
  const playState = inView ? 'running' : 'paused';
  const petals = reduced ? 0 : Math.max(MIN_PETALS, Math.round(sectionHeight / PETAL_EVERY));

  return (
    <div ref={boxRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div className="od-anim" style={{
        position: 'absolute', ...cornerA, opacity: 0.5, transformOrigin: sprig ? '50% 100%' : '50% 50%',
        animation: `od-sway ${8 + (h % 3)}s ease-in-out infinite ${playState}`,
      }}>
        <div style={{ transform: `${flip ? '' : 'scaleX(-1) '}rotate(${tilt}deg)` }}><Flower kind={kind} size={big} /></div>
      </div>
      <div className="od-anim" style={{
        position: 'absolute', ...cornerB, opacity: 0.42, transformOrigin: sprig ? '50% 100%' : '50% 50%',
        animation: `od-sway ${9 + (h % 4)}s ease-in-out -3s infinite ${playState}`,
      }}>
        <div style={{ transform: `${flip ? 'scaleX(-1) ' : ''}rotate(${-tilt}deg)` }}><Flower kind={kind} size={small} /></div>
      </div>
      {Array.from({ length: petals }, (_, i) => {
        const dur = Math.max(14, sectionHeight / FALL_SPEED) * (1 + (i % 3) * 0.12);
        return (
          // 세로 이동(od-fall-y)과 좌우 흔들림·회전(od-spin-x)을 다른 레이어에 둬야 두 움직임이 섞인다.
          <div key={i} className="od-anim" style={{
            position: 'absolute', top: 0, height: '100%', width: 0,
            left: `${8 + ((h * (i + 3) + i * 23) % 80)}%`,
            animation: `od-fall-y ${dur}s linear -${(((h + i * 37) % 100) / 100) * dur}s infinite ${playState}`,
          }}>
            <div className="od-anim" style={{
              animation: `od-spin-x ${7 + (i % 4)}s ease-in-out -${i * 1.3}s infinite alternate ${playState}`,
            }}>
              <FlowerBit kind={kind} size={12 + (i % 3) * 3} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
