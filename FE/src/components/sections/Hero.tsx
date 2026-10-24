/* ─────────────────────────────────────────────────────────
   첫 화면 · 로고 · 제목 · 일시 · 살구꽃(민수기 17:8)
   ───────────────────────────────────────────────────────── */

import { useRef } from 'react';
import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';
import { useSectionView } from '../../hooks/useSectionView';
import { useInView } from '../../hooks/useInView';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Reveal } from '../common/Reveal';
import { Logo } from '../common/Logo';
import { FlowerOrn } from '../common/FlowerOrn';
import { FlowerCaption } from '../common/FlowerCaption';
import { ScrollHint } from '../common/ScrollHint';
import { Flower, FlowerBit } from '../common/Flower';

const HERO_FLOWER = O.flowers.bySection['01 Hero'] ?? 'almond';

/** 네 모서리의 살구꽃 가지 — 위치·크기·기울기·투명도·살랑 시작점 */
const SPRAYS = [
  { pos: { top: -46, left: -62 }, size: 190, rotate: -14, opacity: 0.62, delay: 0 },
  { pos: { top: 70, right: -40 }, size: 104, rotate: 28, opacity: 0.5, delay: -2.4 },
  { pos: { bottom: 64, left: -30 }, size: 92, rotate: -36, opacity: 0.46, delay: -4 },
  { pos: { bottom: -96, right: -92 }, size: 190, rotate: 16, opacity: 0.58, delay: -1.2 },
];

/** 배경 — 가운데 장밋빛 번짐 + 모서리 살구꽃 + 화면 높이만큼 흩날리는 꽃잎 */
function HeroDeco({ playing }: { playing: boolean }) {
  const reduced = usePrefersReducedMotion();
  const playState = playing ? 'running' : 'paused';
  return (
    <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%', width: 360, height: 360, transform: 'translate(-50%,-55%)',
        borderRadius: '50%', background: `radial-gradient(circle, ${BL.photo} 0%, ${BL.bg} 70%)`,
      }} />
      {SPRAYS.map((s, i) => (
        <div key={i} className="od-anim" style={{
          position: 'absolute', ...s.pos, opacity: s.opacity,
          animation: `od-sway ${7 + i * 1.4}s ease-in-out ${s.delay}s infinite ${playState}`,
        }}>
          <div style={{ transform: `rotate(${s.rotate}deg)` }}><Flower kind={HERO_FLOWER} size={s.size} /></div>
        </div>
      ))}
      {/* 모션 감소 모드에선 꽃잎을 그리지 않는다 — 멈춘 꽃잎이 화면 위쪽에 박제된 채 남는다 */}
      {/* 4장 — 3장에서 하나 늘림 (2026-10-25 사용자 요청 「살짝만」) */}
      {!reduced && [0, 1, 2, 3].map(i => (
        <div key={'petal' + i} className="od-anim" style={{
          position: 'absolute', top: -24, left: `${12 + i * 25}%`,
          animation: `od-fall ${16 + i * 3}s linear -${i * 5}s infinite ${playState}`,
        }}><FlowerBit kind={HERO_FLOWER} size={13 + (i % 3) * 3} /></div>
      ))}
    </div>
  );
}

/** 01 첫 화면 — 행사의 정체성과 일시·장소를 한눈에. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { m, d, dayKo, time } = O.date;
  useSectionView(ref, '01 Hero');
  const playing = useInView(ref, true, '200px 0px');

  return (
    <section ref={ref} data-screen-label="01 Hero" style={{
      minHeight: '100%', background: BL.bg, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '72px 30px 96px', textAlign: 'center',
    }}>
      <HeroDeco playing={playing} />
      <div style={{ position: 'relative' }}>
        <Reveal><Logo /></Reveal>
        <Reveal delay={0.08}>
          <div style={{ marginTop: 12, fontFamily: FF.body, fontSize: 14, fontWeight: 700, color: BL.text, letterSpacing: 2 }}>
            {O.church}
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <div style={{
            marginTop: 26, fontFamily: FF.latin, fontWeight: 600, fontStyle: 'italic',
            fontSize: 18, letterSpacing: 0.4, color: BL.label,
          }}>{O.titleEn}</div>
        </Reveal>
        <Reveal delay={0.26}>
          <h1 style={{ margin: '12px 0 0', fontWeight: 'inherit' }}>
            {/* 46px이라 accent를 텍스트에 써도 대비 기준(큰 글씨 3:1)을 만족한다 */}
            <span style={{
              display: 'block', fontFamily: FF.display, fontWeight: 700, fontSize: 46,
              lineHeight: 1.12, letterSpacing: -1.5, color: BL.text,
            }}>
              {O.heroTitle.lead} <span style={{ color: BL.accent }}>{O.heroTitle.accent}</span>
            </span>
            <span style={{
              display: 'block', marginTop: 6, fontFamily: FF.display, fontWeight: 700, fontSize: 29,
              letterSpacing: -0.5, color: BL.text,
            }}>{O.heroTitle.sub}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.4}><FlowerOrn kind={HERO_FLOWER} w={150} /></Reveal>
        <Reveal delay={0.5}>
          <div style={{ fontFamily: FF.body, fontSize: 16, fontWeight: 700, color: BL.text, letterSpacing: 0.5 }}>
            {m}월 {d}일 {dayKo} · {time}
          </div>
          <div style={{ marginTop: 7, fontFamily: FF.body, fontSize: 13.5, color: BL.textSoft }}>
            {O.place.name}
          </div>
          <FlowerCaption kind={HERO_FLOWER} style={{ marginTop: 22 }} />
        </Reveal>
      </div>

      <ScrollHint playing={playing} />
    </section>
  );
}
