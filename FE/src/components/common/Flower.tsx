/* ─────────────────────────────────────────────────────────
   성경 속 꽃 7종 · 코드로 그린 SVG (viewBox 100×100)
   FE-legacy/final/ordain-flowers-bible.jsx의 도형·색을 그대로 옮겼다.
   예배 순서 섹션의 우슬초는 2026-10-24 섹션과 함께 뺐다 (원본은 위 파일에 있다).
   마지막 화면의 종려나무는 2026-10-25 살구꽃으로 바꾸며 뺐다 (원본은 위 파일에 있다).
   꽃 모양(한 송이·가지)과 섹션과의 짝은 콘텐츠라 data/ordination.ts에 있다 (무슨 꽃인지는 그 주석에).
   ───────────────────────────────────────────────────────── */

import { useId } from 'react';
import type { ReactNode } from 'react';
import type { FlowerKind } from '../../data/types';

type Pt = [number, number];
type Cubic = [Pt, Pt, Pt, Pt];

/**
 * 같은 꽃이 한 화면에 여러 번 그려지므로 그라디언트 id가 겹치지 않게 useId를 섞는다.
 * id가 겹치면 먼저 그려진 꽃의 그라디언트를 다른 꽃이 참조해 색이 바뀐다.
 */
function useGradientId(prefix: string) {
  return prefix + useId().replace(/[^a-zA-Z0-9]/g, '');
}

function Svg({ size, children }: { size: number; children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true"
      style={{ display: 'block', overflow: 'visible' }}>
      {children}
    </svg>
  );
}

// ── 곡선 헬퍼 — 줄기를 따라 잎·꽃을 배치할 때 위치와 접선 각도를 구한다 ──
const cb = (P: Cubic, t: number): Pt => {
  const u = 1 - t;
  const at = (k: 0 | 1) => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k];
  return [at(0), at(1)];
};
const ct = (P: Cubic, t: number): Pt => {
  const u = 1 - t;
  const at = (k: 0 | 1) => 3 * u * u * (P[1][k] - P[0][k]) + 6 * u * t * (P[2][k] - P[1][k]) + 3 * t * t * (P[3][k] - P[2][k]);
  return [at(0), at(1)];
};
const deg = ([dx, dy]: Pt) => Math.atan2(dy, dx) * 180 / Math.PI;

// ── 백합화 · 이사야 35:1 ──
const LILY_TEPAL = 'M50 53 C 35 41, 34 19, 50 3 C 66 19, 65 41, 50 53 Z';
const LILY_SPOTS: Pt[] = [[48.4, 38], [51.9, 35], [49.5, 31.4], [52.8, 40.6], [47.2, 34.2], [50.6, 43]];

function Lily({ size }: { size: number }) {
  const g = useGradientId('ly');
  return (
    <Svg size={size}>
      <defs>
        <linearGradient id={g + 'f'} gradientUnits="userSpaceOnUse" x1="50" y1="53" x2="50" y2="3">
          <stop offset="0" stopColor="#DCE5AE" /><stop offset=".3" stopColor="#FFFCF1" /><stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <linearGradient id={g + 'b'} gradientUnits="userSpaceOnUse" x1="50" y1="53" x2="50" y2="3">
          <stop offset="0" stopColor="#CBD69A" /><stop offset=".35" stopColor="#F3EEDD" /><stop offset="1" stopColor="#FAF6EC" />
        </linearGradient>
        <radialGradient id={g + 'c'} gradientUnits="userSpaceOnUse" cx="50" cy="50" r="14">
          <stop offset="0" stopColor="#C6D68A" stopOpacity=".95" /><stop offset="1" stopColor="#C6D68A" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[60, 180, 300].map(a => (
        <g key={a} transform={`rotate(${a} 50 50)`}>
          <path d={LILY_TEPAL} fill={`url(#${g}b)`} stroke="#D9CCBA" strokeWidth=".6" />
          <path d="M50 50 Q 50.8 30 50 8" fill="none" stroke="#DCCDB4" strokeWidth=".7" />
        </g>
      ))}
      {[0, 120, 240].map(a => (
        <g key={a} transform={`rotate(${a} 50 50)`}>
          <path d={LILY_TEPAL} fill={`url(#${g}f)`} stroke="#DDD0BF" strokeWidth=".6" />
          <path d="M50 50 Q 51 30 50 7" fill="none" stroke="#E3D3BB" strokeWidth=".8" />
          <path d="M50 45 Q 43 33 41 19" fill="none" stroke="#ECE1CE" strokeWidth=".5" />
          <path d="M50 45 Q 57 33 59 19" fill="none" stroke="#ECE1CE" strokeWidth=".5" />
          {LILY_SPOTS.map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".75" fill="#D48A9A" opacity=".85" />)}
        </g>
      ))}
      <circle cx="50" cy="50" r="14" fill={`url(#${g}c)`} />
      {[30, 90, 150, 210, 270, 330].map(a => (
        <g key={a} transform={`rotate(${a} 50 50)`}>
          <path d="M50 50 Q 53.5 40 51.5 27" fill="none" stroke="#C9D79C" strokeWidth="1" />
          <ellipse cx="51.6" cy="26" rx="1.6" ry="3.8" fill="#BC744A" transform="rotate(18 51.6 26)" />
        </g>
      ))}
      <path d="M50 50 Q 46.5 38 48.6 24.5" fill="none" stroke="#B9CC86" strokeWidth="1.4" />
      <circle cx="48.6" cy="23.6" r="2.2" fill="#A4BA70" />
    </Svg>
  );
}

// ── 살구꽃 · 민수기 17:8 ──
const ALMOND_PETAL = 'M0 0 C -6 -2.4, -7.4 -8.6, -4.6 -11.4 C -2.6 -13.2, 2.6 -13.2, 4.6 -11.4 C 7.4 -8.6, 6 -2.4, 0 0 Z';
const ALMOND_STAMENS = Array.from({ length: 14 }, (_, k) => {
  const a = (k / 14) * Math.PI * 2, L = 6.4 + (k % 3);
  return { x1: 3 * Math.cos(a), y1: 3 * Math.sin(a), x2: L * Math.cos(a), y2: L * Math.sin(a) };
});
const ALMOND_BUDS: [number, number, number][] = [[89, 16, 25], [58, 16, -10], [20, 39, -20], [72, 34, 40]];

function AlmondBloom({ x, y, s, r, g }: { x: number; y: number; s: number; r: number; g: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map(a => (
        <g key={a} transform={`rotate(${a})`}>
          <path d={ALMOND_PETAL} fill={`url(#${g}p)`} stroke="#E3A9B7" strokeWidth=".4" />
          <path d="M0 -2 Q 0.6 -6 0 -10" fill="none" stroke="#EBB9C4" strokeWidth=".35" />
        </g>
      ))}
      <circle r="3.2" fill="#C2566A" />
      {ALMOND_STAMENS.map((st, k) => (
        <g key={k}>
          <line x1={st.x1} y1={st.y1} x2={st.x2} y2={st.y2} stroke="#F3D6DC" strokeWidth=".45" />
          <circle cx={st.x2} cy={st.y2} r=".7" fill="#E9B24C" />
        </g>
      ))}
    </g>
  );
}

function Almond({ size }: { size: number }) {
  const g = useGradientId('al');
  return (
    <Svg size={size}>
      <defs>
        <linearGradient id={g + 'p'} x1=".5" y1="1" x2=".5" y2="0">
          <stop offset="0" stopColor="#E08EA4" /><stop offset=".45" stopColor="#F7D3DC" /><stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <radialGradient id={g + 'b'} cx=".4" cy=".3"><stop offset="0" stopColor="#F8CBD5" /><stop offset="1" stopColor="#D3708A" /></radialGradient>
      </defs>
      <path d="M8 97 C 22 80, 36 66, 52 52 C 64 42, 76 30, 93 13" fill="none" stroke="#6B4A3A" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M52 52 C 50 40, 52 30, 58 19" fill="none" stroke="#6B4A3A" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M33 69 C 26 61, 22 53, 21 42" fill="none" stroke="#6B4A3A" strokeWidth="1.4" strokeLinecap="round" />
      {ALMOND_BUDS.map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <ellipse rx="2.6" ry="3.8" fill={`url(#${g}b)`} />
          <path d="M-2.2 2 Q 0 4.6 2.2 2" fill="#7A5240" />
        </g>
      ))}
      <AlmondBloom g={g} x={41} y={58} s={1.12} r={10} />
      <AlmondBloom g={g} x={63} y={41} s={1.25} r={-14} />
      <AlmondBloom g={g} x={53} y={27} s={0.86} r={22} />
      <AlmondBloom g={g} x={25} y={50} s={0.82} r={-26} />
      <AlmondBloom g={g} x={80} y={25} s={0.74} r={32} />
    </Svg>
  );
}

// ── 샤론의 수선화 · 아가 2:1 ──
const NARCISSUS_PETAL = 'M50 50 C 41 42, 40 23, 50 7 C 60 23, 59 42, 50 50 Z';
/** 주름진 부화관 — 반지름에 두 개의 사인파를 섞어 가장자리를 물결치게 한다 */
const NARCISSUS_CUP = Array.from({ length: 181 }, (_, i) => {
  const th = (i / 180) * Math.PI * 2;
  const r = 13.5 + 1.3 * Math.sin(14 * th) + 0.5 * Math.sin(31 * th);
  return (i ? 'L' : 'M') + (50 + r * Math.cos(th)).toFixed(2) + ' ' + (50 + r * Math.sin(th)).toFixed(2);
}).join('') + 'Z';

function Narcissus({ size }: { size: number }) {
  const g = useGradientId('nc');
  return (
    <Svg size={size}>
      <defs>
        <linearGradient id={g + 'p'} gradientUnits="userSpaceOnUse" x1="50" y1="50" x2="50" y2="7">
          <stop offset="0" stopColor="#F1E6BC" /><stop offset=".35" stopColor="#FFFCF1" /><stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <radialGradient id={g + 'c'} gradientUnits="userSpaceOnUse" cx="50" cy="50" r="14.5">
          <stop offset="0" stopColor="#E8892C" /><stop offset=".55" stopColor="#F6B643" /><stop offset=".85" stopColor="#FAD46A" /><stop offset="1" stopColor="#EE9F34" />
        </radialGradient>
      </defs>
      {[30, 150, 270].map(a => (
        <path key={a} d={NARCISSUS_PETAL} fill="#F4EEDB" stroke="#DCCFAE" strokeWidth=".6" transform={`rotate(${a} 50 50)`} />
      ))}
      {[90, 210, 330].map(a => (
        <g key={a} transform={`rotate(${a} 50 50)`}>
          <path d={NARCISSUS_PETAL} fill={`url(#${g}p)`} stroke="#DFD3B3" strokeWidth=".6" />
          <path d="M50 46 Q 50.8 28 50 11" fill="none" stroke="#E6DABD" strokeWidth=".7" />
          <path d="M50 42 Q 45 30 45 18 M50 42 Q 55 30 55 18" fill="none" stroke="#EFE6CF" strokeWidth=".45" />
        </g>
      ))}
      <path d={NARCISSUS_CUP} fill={`url(#${g}c)`} stroke="#D7882A" strokeWidth=".6" />
      <circle cx="50" cy="50" r="8.6" fill="none" stroke="#E08A30" strokeWidth=".6" opacity=".7" />
      <circle cx="50" cy="50" r="5" fill="#D97C28" />
      {[0, 120, 240].map(a => <circle key={a} cx="50" cy="47.4" r="1" fill="#F4DA7A" transform={`rotate(${a} 50 50)`} />)}
    </Svg>
  );
}

// ── 석류 · 출애굽기 28:33 ──
const POMEGRANATE_LEAF = 'M0 0 C 3.4 -4, 3.6 -12, 0 -18 C -3.6 -12, -3.4 -4, 0 0 Z';
const POMEGRANATE_LEAVES: [number, number, number][] = [[22, 82, -55], [30, 74, 40], [48, 60, -60], [58, 48, 35], [70, 33, -50], [84, 22, 30], [64, 41, 70]];

function Pomegranate({ size }: { size: number }) {
  const g = useGradientId('pg');
  return (
    <Svg size={size}>
      <defs>
        <linearGradient id={g + 'l'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#6E8F62" /><stop offset=".5" stopColor="#9DBB8C" /><stop offset="1" stopColor="#7A9A6C" /></linearGradient>
        <radialGradient id={g + 'f'} cx=".36" cy=".32" r=".75"><stop offset="0" stopColor="#F8B19B" /><stop offset=".45" stopColor="#DC5A4E" /><stop offset="1" stopColor="#962C33" /></radialGradient>
        <linearGradient id={g + 'p'} x1=".5" y1="1" x2=".5" y2="0"><stop offset="0" stopColor="#D9463E" /><stop offset=".6" stopColor="#EE6E58" /><stop offset="1" stopColor="#F7A18B" /></linearGradient>
      </defs>
      <path d="M10 97 C 30 78, 46 62, 60 44 C 68 34, 76 26, 90 18" fill="none" stroke="#7A5A45" strokeWidth="2" strokeLinecap="round" />
      {POMEGRANATE_LEAVES.map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d={POMEGRANATE_LEAF} fill={`url(#${g}l)`} stroke="#5F7F55" strokeWidth=".35" />
          <path d="M0 -1 L0 -16" stroke="#5F7F55" strokeWidth=".4" opacity=".7" />
        </g>
      ))}
      <path d="M40 61 Q 37 64 35 66.5" stroke="#7A5A45" strokeWidth="1.4" fill="none" />
      <g transform="translate(34 80) rotate(-12)">
        <circle r="14.5" fill={`url(#${g}f)`} stroke="#8E2A31" strokeWidth=".5" />
        <path d="M-5 -13.4 L-4.4 -18.6 L-2.2 -15.4 L0 -19.6 L2.2 -15.4 L4.4 -18.6 L5 -13.4 Z" fill="#B8433F" stroke="#8E2A31" strokeWidth=".4" />
        <ellipse cx="-5" cy="-5" rx="3.6" ry="2.4" fill="#FFFFFF" opacity=".35" transform="rotate(-30 -5 -5)" />
        <path d="M-9 4 Q 0 10 9 4" fill="none" stroke="#8E2A31" strokeWidth=".5" opacity=".4" />
      </g>
      <g transform="translate(77 20) rotate(28)">
        {[-34, -12, 12, 34].map(a => (
          <path key={a} d="M0 -4 C -6 -7, -7 -15, -2.4 -18 C -1 -16.4, 1 -16.4, 2.4 -18 C 7 -15, 6 -7, 0 -4 Z"
            fill={`url(#${g}p)`} stroke="#C23A36" strokeWidth=".4" transform={`rotate(${a} 0 -4)`} />
        ))}
        <path d="M-4.6 8 C -5.4 2, -4.6 -2, -3.4 -5 L 3.4 -5 C 4.6 -2, 5.4 2, 4.6 8 C 2 9.6, -2 9.6, -4.6 8 Z" fill="#D9473E" stroke="#A33133" strokeWidth=".5" />
        <path d="M-3.4 -5 L -5 -8.4 L -1.8 -6 L 0 -9.4 L 1.8 -6 L 5 -8.4 L 3.4 -5 Z" fill="#C23A36" />
        {[-2, 0, 2].map(x => <circle key={x} cx={x} cy="-8" r=".7" fill="#F3C85A" />)}
      </g>
    </Svg>
  );
}

// ── 감람나무 · 시편 52:8 ──
const OLIVE_SEGMENTS: Cubic[] = [[[14, 94], [30, 74], [46, 56], [62, 40]], [[62, 40], [72, 30], [80, 22], [90, 14]]];
const OLIVE_LEAF = 'M0 0 C 2.6 -6, 2.6 -17, 0 -26 C -2.6 -17, -2.6 -6, 0 0 Z';
/** 잎은 좌우로 번갈아, 끝으로 갈수록 작게. 셋째마다 잎 뒷면(은록색)을 보인다 */
const OLIVE_LEAVES = OLIVE_SEGMENTS.flatMap((P, si) => [0.18, 0.42, 0.66, 0.9].map((t, ti) => {
  const n = si * 4 + ti;
  const [x, y] = cb(P, t), a = deg(ct(P, t)), sd = n % 2 ? 1 : -1;
  return { x, y, a: a + 90 + sd * 42, s: 1 - n * 0.05, u: n % 3 === 1 };
}));
const OLIVES: [number, number, 'g' | 'p'][] = [[42, 68, 'g'], [47, 70, 'p'], [67, 46, 'p'], [72, 42, 'g']];

function Olive({ size }: { size: number }) {
  const g = useGradientId('ol');
  return (
    <Svg size={size}>
      <defs>
        <linearGradient id={g + 'l'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#6F8768" /><stop offset=".5" stopColor="#9CAE93" /><stop offset="1" stopColor="#7F9477" /></linearGradient>
        <linearGradient id={g + 'u'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#B4BFAA" /><stop offset="1" stopColor="#D6DDCD" /></linearGradient>
        <radialGradient id={g + 'g'} cx=".35" cy=".3"><stop offset="0" stopColor="#B4C27A" /><stop offset="1" stopColor="#4F5D2F" /></radialGradient>
        <radialGradient id={g + 'p'} cx=".35" cy=".3"><stop offset="0" stopColor="#8E6283" /><stop offset="1" stopColor="#2F1D2C" /></radialGradient>
      </defs>
      <path d="M14 94 C 30 74, 46 56, 62 40 C 72 30, 80 22, 90 14" fill="none" stroke="#7B7361" strokeWidth="1.5" strokeLinecap="round" />
      {OLIVE_LEAVES.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.a}) scale(${l.s})`}>
          <path d={OLIVE_LEAF} fill={`url(#${g}${l.u ? 'u' : 'l'})`} stroke="#5F7458" strokeWidth=".35" />
          <path d="M0 -1 L0 -24" stroke={l.u ? '#9BA891' : '#5F7458'} strokeWidth=".4" opacity=".75" />
        </g>
      ))}
      {OLIVES.map(([x, y, c], i) => (
        <g key={i}>
          <path d={`M${x - 2} ${y - 6} Q ${x} ${y - 5} ${x} ${y - 3.6}`} fill="none" stroke="#7B7361" strokeWidth=".6" />
          <ellipse cx={x} cy={y} rx="3" ry="4" fill={`url(#${g}${c})`} />
          <ellipse cx={x - 1} cy={y - 1.6} rx=".9" ry="1.3" fill="#FFFFFF" opacity=".5" />
        </g>
      ))}
    </Svg>
  );
}

// ── 포도나무 · 요한복음 15:5 ──
/** 송이 — 줄마다 알 개수가 줄고, 홀짝 줄을 좌우로 엇갈려 쌓는다 */
const GRAPE_BERRIES = ([[38, 5], [45.5, 5], [52.5, 4], [59.5, 4], [66, 3], [72, 2], [77.6, 1]] as Pt[])
  .flatMap(([y, n], ri) => Array.from({ length: n }, (_, k): [number, number, number] =>
    [60 + (k - (n - 1) / 2) * 8.4 + (ri % 2 ? 1.6 : -1.6), y, 4.6 - ri * 0.15]));
const GRAPE_LEAF = 'M32 6 C 36 10, 40 9, 44 12 C 43 16, 47 20, 52 19 C 52 25, 48 29, 50 33 C 44 33, 40 36, 34 42 C 31 37, 26 35, 19 37 C 21 31, 17 27, 11 25 C 17 21, 17 15, 13 11 C 19 11, 24 7, 32 6 Z';
const GRAPE_VEINS: Pt[] = [[32, 8], [50, 20], [49, 31], [12, 25], [14, 12]];

function Grape({ size }: { size: number }) {
  const g = useGradientId('gr');
  return (
    <Svg size={size}>
      <defs>
        <radialGradient id={g + 'b'} cx=".35" cy=".3" r=".75"><stop offset="0" stopColor="#C7B2E2" /><stop offset=".45" stopColor="#8466B2" /><stop offset="1" stopColor="#4A3374" /></radialGradient>
        <linearGradient id={g + 'l'} gradientUnits="userSpaceOnUse" x1="12" y1="8" x2="52" y2="44"><stop offset="0" stopColor="#B1CBA2" /><stop offset="1" stopColor="#7C9C70" /></linearGradient>
      </defs>
      <path d="M4 4 C 18 6, 34 10, 46 18 C 54 23, 58 28, 60 34" fill="none" stroke="#7A5A45" strokeWidth="1.8" strokeLinecap="round" />
      <path d={GRAPE_LEAF} fill={`url(#${g}l)`} stroke="#6E8F62" strokeWidth=".5" />
      {GRAPE_VEINS.map(([x, y], i) => (
        <path key={i} d={`M33 38 Q ${(33 + x) / 2 + 1} ${(38 + y) / 2} ${x} ${y}`} fill="none" stroke="#6E8F62" strokeWidth=".5" opacity=".75" />
      ))}
      <path d="M60 34 C 66 28, 74 26, 78 31 C 81 35, 77 39, 74 36 C 72 34, 75 31, 77 33" fill="none" stroke="#8FAA8A" strokeWidth=".9" />
      {GRAPE_BERRIES.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={`url(#${g}b)`} stroke="#3E2A62" strokeWidth=".35" />
          <ellipse cx={x - 1.5} cy={y - 1.6} rx={r * 0.32} ry={r * 0.22} fill="#FFFFFF" opacity=".55" />
        </g>
      ))}
    </Svg>
  );
}

// ── 들의 백합화(아네모네) · 마태복음 6:28 ──
const ANEMONE_PETAL = 'M50 50 C 36 44, 31 20, 43.5 10 C 47.5 7, 52.5 7, 56.5 10 C 69 20, 64 44, 50 50 Z';
const ANEMONE_STAMENS = Array.from({ length: 36 }, (_, k) => {
  const a = (k / 36) * Math.PI * 2, L = 12.5 + (k % 3) * 0.9;
  return { x1: 50 + 8.5 * Math.cos(a), y1: 50 + 8.5 * Math.sin(a), x2: 50 + L * Math.cos(a), y2: 50 + L * Math.sin(a) };
});
/** 가운데 암술 — 황금각(2.4rad)으로 흩뿌린다 */
const ANEMONE_CENTER = Array.from({ length: 18 }, (_, k) => {
  const a = k * 2.4, rr = 6.5 * Math.sqrt(k / 18);
  return { cx: 50 + rr * Math.cos(a), cy: 50 + rr * Math.sin(a) };
});

function Anemone({ size }: { size: number }) {
  const g = useGradientId('an');
  return (
    <Svg size={size}>
      <defs>
        <linearGradient id={g + 'p'} gradientUnits="userSpaceOnUse" x1="50" y1="50" x2="50" y2="8">
          <stop offset="0" stopColor="#F6EFEA" /><stop offset=".26" stopColor="#F3E2DE" /><stop offset=".34" stopColor="#E4535A" />
          <stop offset=".7" stopColor="#D5323F" /><stop offset="1" stopColor="#E66462" />
        </linearGradient>
      </defs>
      {[30, 90, 150, 210, 270, 330].map((a, i) => (
        <g key={a} transform={`rotate(${a + (i % 2 ? 4 : -4)} 50 50)`}>
          <path d={ANEMONE_PETAL} fill={`url(#${g}p)`} stroke="#B02A37" strokeWidth=".5" />
          {[-6, -3, 0, 3, 6].map(dx => (
            <path key={dx} d={`M50 40 Q ${50 + dx * 0.7} 26 ${50 + dx} 13`} fill="none" stroke="#A82434" strokeWidth=".4" opacity=".4" />
          ))}
        </g>
      ))}
      <circle cx="50" cy="50" r="9.5" fill="#2B2338" />
      {ANEMONE_STAMENS.map((st, k) => (
        <g key={k}>
          <line x1={st.x1} y1={st.y1} x2={st.x2} y2={st.y2} stroke="#2E2440" strokeWidth=".6" />
          <circle cx={st.x2} cy={st.y2} r=".85" fill="#3D3356" />
        </g>
      ))}
      {ANEMONE_CENTER.map((c, k) => <circle key={'c' + k} cx={c.cx} cy={c.cy} r=".9" fill="#4A3F66" />)}
    </Svg>
  );
}

const FLOWERS: Record<FlowerKind, (props: { size: number }) => ReactNode> = {
  almond: Almond, narcissus: Narcissus, lily: Lily, pomegranate: Pomegranate,
  olive: Olive, grape: Grape, anemone: Anemone,
};

/** 꽃 한 송이(또는 가지). kind에 맞는 그림을 그린다. */
export function Flower({ kind, size }: { kind: FlowerKind; size: number }) {
  const Drawing = FLOWERS[kind];
  return <Drawing size={size} />;
}

// ── 흩날리는 조각 — 섹션 꽃잎 낙하용 (viewBox 20×20). [path, fill, stroke] ──
const BITS: Record<Exclude<FlowerKind, 'grape'>, [string, string, string]> = {
  almond: ['M10 18 C 4.5 15.5, 3.5 7.5, 7 4 C 8.6 2.5, 11.4 2.5, 13 4 C 16.5 7.5, 15.5 15.5, 10 18 Z', '#F9DDE3', '#E3A9B7'],
  narcissus: ['M10 19 C 5 14, 5 6, 10 1 C 15 6, 15 14, 10 19 Z', '#FFFDF4', '#DCCFAE'],
  lily: ['M10 19 C 5 14, 5 6, 10 1 C 15 6, 15 14, 10 19 Z', '#FFFDF6', '#DDD0BF'],
  pomegranate: ['M10 19 C 3 16, 1.5 7, 5 3.5 C 7 1.6, 13 1.6, 15 3.5 C 18.5 7, 17 16, 10 19 Z', '#EE6E58', '#C23A36'],
  olive: ['M10 19 C 12.5 13, 12.5 6, 10 1 C 7.5 6, 7.5 13, 10 19 Z', '#A7B79E', '#6F8768'],
  anemone: ['M10 19 C 3 16, 1.5 7, 5 3.5 C 7 1.6, 13 1.6, 15 3.5 C 18.5 7, 17 16, 10 19 Z', '#DE4A50', '#A82434'],
};

/** 꽃잎 하나 — 포도는 꽃잎 대신 알갱이가 떨어진다. */
export function FlowerBit({ kind, size = 14 }: { kind: FlowerKind; size?: number }) {
  let body: ReactNode;
  if (kind === 'grape') {
    body = (
      <g>
        <circle cx="10" cy="10" r="5.5" fill="#7E60AC" stroke="#3E2A62" strokeWidth=".5" />
        <ellipse cx="8.2" cy="8" rx="1.6" ry="1.1" fill="#FFFFFF" opacity=".55" />
      </g>
    );
  } else {
    const [d, fill, stroke] = BITS[kind];
    body = (
      <g>
        <path d={d} fill={fill} stroke={stroke} strokeWidth=".6" />
        <path d="M10 17 L10 5" stroke={stroke} strokeWidth=".4" opacity=".5" />
      </g>
    );
  }
  return <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" style={{ display: 'block' }}>{body}</svg>;
}
