/* 성경 속 꽃 · B 스킨 — 섹션마다 다른 꽃, 성경 구절이 그 섹션의 테마 */
(() => {
const gid = (p) => p + React.useId().replace(/[^a-zA-Z0-9]/g, '');
const SVG = ({ size, children }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'block', overflow: 'visible' }}>{children}</svg>
);

// ── 백합 · 순결, 변함없는 사랑 ──
function Lily({ size = 100 }) {
  const g = gid('ly');
  const tep = 'M50 53 C 35 41, 34 19, 50 3 C 66 19, 65 41, 50 53 Z';
  const spots = [[48.4, 38], [51.9, 35], [49.5, 31.4], [52.8, 40.6], [47.2, 34.2], [50.6, 43]];
  return (
    <SVG size={size}>
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
          <path d={tep} fill={`url(#${g}b)`} stroke="#D9CCBA" strokeWidth=".6" />
          <path d="M50 50 Q 50.8 30 50 8" fill="none" stroke="#DCCDB4" strokeWidth=".7" />
        </g>
      ))}
      {[0, 120, 240].map(a => (
        <g key={a} transform={`rotate(${a} 50 50)`}>
          <path d={tep} fill={`url(#${g}f)`} stroke="#DDD0BF" strokeWidth=".6" />
          <path d="M50 50 Q 51 30 50 7" fill="none" stroke="#E3D3BB" strokeWidth=".8" />
          <path d="M50 45 Q 43 33 41 19" fill="none" stroke="#ECE1CE" strokeWidth=".5" />
          <path d="M50 45 Q 57 33 59 19" fill="none" stroke="#ECE1CE" strokeWidth=".5" />
          {spots.map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".75" fill="#D48A9A" opacity=".85" />)}
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
    </SVG>
  );
}

// ── 살구꽃 · 민수기 17:8 ──
function AlmondBloom({ x, y, s, r, g }) {
  const p = 'M0 0 C -6 -2.4, -7.4 -8.6, -4.6 -11.4 C -2.6 -13.2, 2.6 -13.2, 4.6 -11.4 C 7.4 -8.6, 6 -2.4, 0 0 Z';
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map(a => (
        <g key={a} transform={`rotate(${a})`}>
          <path d={p} fill={`url(#${g}p)`} stroke="#E3A9B7" strokeWidth=".4" />
          <path d="M0 -2 Q 0.6 -6 0 -10" fill="none" stroke="#EBB9C4" strokeWidth=".35" />
        </g>
      ))}
      <circle r="3.2" fill="#C2566A" />
      {Array.from({ length: 14 }, (_, k) => {
        const a = (k / 14) * Math.PI * 2, L = 6.4 + (k % 3);
        return (
          <g key={k}>
            <line x1={3 * Math.cos(a)} y1={3 * Math.sin(a)} x2={L * Math.cos(a)} y2={L * Math.sin(a)} stroke="#F3D6DC" strokeWidth=".45" />
            <circle cx={L * Math.cos(a)} cy={L * Math.sin(a)} r=".7" fill="#E9B24C" />
          </g>
        );
      })}
    </g>
  );
}
function Almond({ size = 100 }) {
  const g = gid('al');
  return (
    <SVG size={size}>
      <defs>
        <linearGradient id={g + 'p'} x1=".5" y1="1" x2=".5" y2="0">
          <stop offset="0" stopColor="#E08EA4" /><stop offset=".45" stopColor="#F7D3DC" /><stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <radialGradient id={g + 'b'} cx=".4" cy=".3"><stop offset="0" stopColor="#F8CBD5" /><stop offset="1" stopColor="#D3708A" /></radialGradient>
      </defs>
      <path d="M8 97 C 22 80, 36 66, 52 52 C 64 42, 76 30, 93 13" fill="none" stroke="#6B4A3A" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M52 52 C 50 40, 52 30, 58 19" fill="none" stroke="#6B4A3A" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M33 69 C 26 61, 22 53, 21 42" fill="none" stroke="#6B4A3A" strokeWidth="1.4" strokeLinecap="round" />
      {[[89, 16, 25], [58, 16, -10], [20, 39, -20], [72, 34, 40]].map(([x, y, r], i) => (
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
    </SVG>
  );
}

// ── 샤론의 수선화 · 아가 2:1 ──
function Narcissus({ size = 100 }) {
  const g = gid('nc');
  const pt = 'M50 50 C 41 42, 40 23, 50 7 C 60 23, 59 42, 50 50 Z';
  let cup = '';
  for (let i = 0; i <= 180; i++) {
    const th = (i / 180) * Math.PI * 2;
    const r = 13.5 + 1.3 * Math.sin(14 * th) + 0.5 * Math.sin(31 * th);
    cup += (i ? 'L' : 'M') + (50 + r * Math.cos(th)).toFixed(2) + ' ' + (50 + r * Math.sin(th)).toFixed(2);
  }
  return (
    <SVG size={size}>
      <defs>
        <linearGradient id={g + 'p'} gradientUnits="userSpaceOnUse" x1="50" y1="50" x2="50" y2="7">
          <stop offset="0" stopColor="#F1E6BC" /><stop offset=".35" stopColor="#FFFCF1" /><stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
        <radialGradient id={g + 'c'} gradientUnits="userSpaceOnUse" cx="50" cy="50" r="14.5">
          <stop offset="0" stopColor="#E8892C" /><stop offset=".55" stopColor="#F6B643" /><stop offset=".85" stopColor="#FAD46A" /><stop offset="1" stopColor="#EE9F34" />
        </radialGradient>
      </defs>
      {[30, 150, 270].map(a => (
        <path key={a} d={pt} fill="#F4EEDB" stroke="#DCCFAE" strokeWidth=".6" transform={`rotate(${a} 50 50)`} />
      ))}
      {[90, 210, 330].map(a => (
        <g key={a} transform={`rotate(${a} 50 50)`}>
          <path d={pt} fill={`url(#${g}p)`} stroke="#DFD3B3" strokeWidth=".6" />
          <path d="M50 46 Q 50.8 28 50 11" fill="none" stroke="#E6DABD" strokeWidth=".7" />
          <path d="M50 42 Q 45 30 45 18 M50 42 Q 55 30 55 18" fill="none" stroke="#EFE6CF" strokeWidth=".45" />
        </g>
      ))}
      <path d={cup + 'Z'} fill={`url(#${g}c)`} stroke="#D7882A" strokeWidth=".6" />
      <circle cx="50" cy="50" r="8.6" fill="none" stroke="#E08A30" strokeWidth=".6" opacity=".7" />
      <circle cx="50" cy="50" r="5" fill="#D97C28" />
      {[0, 120, 240].map(a => <circle key={a} cx="50" cy="47.4" r="1" fill="#F4DA7A" transform={`rotate(${a} 50 50)`} />)}
    </SVG>
  );
}

// 곡선 헬퍼
const qb = (s, t) => { const u = 1 - t; return [u * u * s.p0[0] + 2 * u * t * s.c[0] + t * t * s.p1[0], u * u * s.p0[1] + 2 * u * t * s.c[1] + t * t * s.p1[1]]; };
const qt = (s, t) => [2 * (1 - t) * (s.c[0] - s.p0[0]) + 2 * t * (s.p1[0] - s.c[0]), 2 * (1 - t) * (s.c[1] - s.p0[1]) + 2 * t * (s.p1[1] - s.c[1])];
const cb = (P, t) => { const u = 1 - t; return [0, 1].map(k => u * u * u * P[0][k] + 3 * u * u * t * P[1][k] + 3 * u * t * t * P[2][k] + t * t * t * P[3][k]); };
const ct = (P, t) => { const u = 1 - t; return [0, 1].map(k => 3 * u * u * (P[1][k] - P[0][k]) + 6 * u * t * (P[2][k] - P[1][k]) + 3 * t * t * (P[3][k] - P[2][k])); };
const deg = ([dx, dy]) => Math.atan2(dy, dx) * 180 / Math.PI;

// ── 우슬초 · 시편 51:7 ──
function Hyssop({ size = 100 }) {
  const stems = [
    { p0: [48, 98], c: [40, 60], p1: [30, 14] },
    { p0: [50, 98], c: [52, 56], p1: [56, 6] },
    { p0: [52, 98], c: [62, 60], p1: [72, 18] }
  ];
  const cols = ['#FBF9FD', '#E7DEF3', '#CDBFE6'];
  return (
    <SVG size={size}>
      {stems.map((s, si) => {
        const out = [];
        for (let i = 0; i <= 11; i++) {
          const t = 0.15 + 0.85 * i / 11;
          const [x, y] = qb(s, t);
          const ang = deg(qt(s, t));
          if (t < 0.55) {
            [-1, 1].forEach(sd => out.push(
              <ellipse key={`l${i}${sd}`} cx={x} cy={y} rx="1.1" ry="4.6" fill="#93AE8B"
                transform={`rotate(${ang + 90 + sd * 55} ${x} ${y}) translate(0 -4)`} />
            ));
          } else {
            const k = 1 - 0.35 * (t - 0.55) / 0.45;
            for (let j = 0; j < 7; j++) {
              const a = (j / 7) * Math.PI * 2 + i;
              const fx = x + 2.4 * k * Math.cos(a), fy = y + 1.4 * k * Math.sin(a);
              out.push(<ellipse key={`f${i}${j}`} cx={fx} cy={fy} rx={1.3 * k} ry={2.2 * k}
                fill={cols[(i + j) % 3]} stroke="#B3A3D6" strokeWidth=".3"
                transform={`rotate(${ang + 90 + Math.cos(a) * 40} ${fx} ${fy})`} />);
            }
          }
        }
        return (
          <g key={si}>
            <path d={`M${s.p0[0]} ${s.p0[1]} Q ${s.c[0]} ${s.c[1]} ${s.p1[0]} ${s.p1[1]}`} fill="none" stroke="#8FAA8A" strokeWidth="1.2" />
            {out}
          </g>
        );
      })}
    </SVG>
  );
}

// ── 석류 · 출애굽기 28:33 ──
function Pomegranate({ size = 100 }) {
  const g = gid('pg');
  const leaf = 'M0 0 C 3.4 -4, 3.6 -12, 0 -18 C -3.6 -12, -3.4 -4, 0 0 Z';
  const leaves = [[22, 82, -55], [30, 74, 40], [48, 60, -60], [58, 48, 35], [70, 33, -50], [84, 22, 30], [64, 41, 70]];
  return (
    <SVG size={size}>
      <defs>
        <linearGradient id={g + 'l'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#6E8F62" /><stop offset=".5" stopColor="#9DBB8C" /><stop offset="1" stopColor="#7A9A6C" /></linearGradient>
        <radialGradient id={g + 'f'} cx=".36" cy=".32" r=".75"><stop offset="0" stopColor="#F8B19B" /><stop offset=".45" stopColor="#DC5A4E" /><stop offset="1" stopColor="#962C33" /></radialGradient>
        <linearGradient id={g + 'p'} x1=".5" y1="1" x2=".5" y2="0"><stop offset="0" stopColor="#D9463E" /><stop offset=".6" stopColor="#EE6E58" /><stop offset="1" stopColor="#F7A18B" /></linearGradient>
      </defs>
      <path d="M10 97 C 30 78, 46 62, 60 44 C 68 34, 76 26, 90 18" fill="none" stroke="#7A5A45" strokeWidth="2" strokeLinecap="round" />
      {leaves.map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <path d={leaf} fill={`url(#${g}l)`} stroke="#5F7F55" strokeWidth=".35" />
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
    </SVG>
  );
}

// ── 감람나무 · 시편 52:8 ──
function Olive({ size = 100 }) {
  const g = gid('ol');
  const S = [[[14, 94], [30, 74], [46, 56], [62, 40]], [[62, 40], [72, 30], [80, 22], [90, 14]]];
  const leaf = 'M0 0 C 2.6 -6, 2.6 -17, 0 -26 C -2.6 -17, -2.6 -6, 0 0 Z';
  const leaves = [];
  let n = 0;
  S.forEach(P => [0.18, 0.42, 0.66, 0.9].forEach(t => {
    const [x, y] = cb(P, t), a = deg(ct(P, t)), sd = n % 2 ? 1 : -1;
    leaves.push({ x, y, a: a + 90 + sd * 42, s: 1 - n * 0.05, u: n % 3 === 1 });
    n++;
  }));
  const olives = [[42, 68, 'g'], [47, 70, 'p'], [67, 46, 'p'], [72, 42, 'g']];
  return (
    <SVG size={size}>
      <defs>
        <linearGradient id={g + 'l'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#6F8768" /><stop offset=".5" stopColor="#9CAE93" /><stop offset="1" stopColor="#7F9477" /></linearGradient>
        <linearGradient id={g + 'u'} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#B4BFAA" /><stop offset="1" stopColor="#D6DDCD" /></linearGradient>
        <radialGradient id={g + 'g'} cx=".35" cy=".3"><stop offset="0" stopColor="#B4C27A" /><stop offset="1" stopColor="#4F5D2F" /></radialGradient>
        <radialGradient id={g + 'p'} cx=".35" cy=".3"><stop offset="0" stopColor="#8E6283" /><stop offset="1" stopColor="#2F1D2C" /></radialGradient>
      </defs>
      <path d="M14 94 C 30 74, 46 56, 62 40 C 72 30, 80 22, 90 14" fill="none" stroke="#7B7361" strokeWidth="1.5" strokeLinecap="round" />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.a}) scale(${l.s})`}>
          <path d={leaf} fill={`url(#${g}${l.u ? 'u' : 'l'})`} stroke="#5F7458" strokeWidth=".35" />
          <path d="M0 -1 L0 -24" stroke={l.u ? '#9BA891' : '#5F7458'} strokeWidth=".4" opacity=".75" />
        </g>
      ))}
      {olives.map(([x, y, c], i) => (
        <g key={i}>
          <path d={`M${x - 2} ${y - 6} Q ${x} ${y - 5} ${x} ${y - 3.6}`} fill="none" stroke="#7B7361" strokeWidth=".6" />
          <ellipse cx={x} cy={y} rx="3" ry="4" fill={`url(#${g}${c})`} />
          <ellipse cx={x - 1} cy={y - 1.6} rx=".9" ry="1.3" fill="#FFFFFF" opacity=".5" />
        </g>
      ))}
    </SVG>
  );
}

// ── 포도나무 · 요한복음 15:5 ──
function Grape({ size = 100 }) {
  const g = gid('gr');
  const rows = [[38, 5], [45.5, 5], [52.5, 4], [59.5, 4], [66, 3], [72, 2], [77.6, 1]];
  const berries = [];
  rows.forEach(([y, n], ri) => {
    for (let k = 0; k < n; k++) berries.push([60 + (k - (n - 1) / 2) * 8.4 + (ri % 2 ? 1.6 : -1.6), y, 4.6 - ri * 0.15]);
  });
  const lf = 'M32 6 C 36 10, 40 9, 44 12 C 43 16, 47 20, 52 19 C 52 25, 48 29, 50 33 C 44 33, 40 36, 34 42 C 31 37, 26 35, 19 37 C 21 31, 17 27, 11 25 C 17 21, 17 15, 13 11 C 19 11, 24 7, 32 6 Z';
  return (
    <SVG size={size}>
      <defs>
        <radialGradient id={g + 'b'} cx=".35" cy=".3" r=".75"><stop offset="0" stopColor="#C7B2E2" /><stop offset=".45" stopColor="#8466B2" /><stop offset="1" stopColor="#4A3374" /></radialGradient>
        <linearGradient id={g + 'l'} gradientUnits="userSpaceOnUse" x1="12" y1="8" x2="52" y2="44"><stop offset="0" stopColor="#B1CBA2" /><stop offset="1" stopColor="#7C9C70" /></linearGradient>
      </defs>
      <path d="M4 4 C 18 6, 34 10, 46 18 C 54 23, 58 28, 60 34" fill="none" stroke="#7A5A45" strokeWidth="1.8" strokeLinecap="round" />
      <path d={lf} fill={`url(#${g}l)`} stroke="#6E8F62" strokeWidth=".5" />
      {[[32, 8], [50, 20], [49, 31], [12, 25], [14, 12]].map(([x, y], i) => (
        <path key={i} d={`M33 38 Q ${(33 + x) / 2 + 1} ${(38 + y) / 2} ${x} ${y}`} fill="none" stroke="#6E8F62" strokeWidth=".5" opacity=".75" />
      ))}
      <path d="M60 34 C 66 28, 74 26, 78 31 C 81 35, 77 39, 74 36 C 72 34, 75 31, 77 33" fill="none" stroke="#8FAA8A" strokeWidth=".9" />
      {berries.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill={`url(#${g}b)`} stroke="#3E2A62" strokeWidth=".35" />
          <ellipse cx={x - 1.5} cy={y - 1.6} rx={r * 0.32} ry={r * 0.22} fill="#FFFFFF" opacity=".55" />
        </g>
      ))}
    </SVG>
  );
}

// ── 들의 백합화(아네모네) · 마태복음 6:28 ──
function Anemone({ size = 100 }) {
  const g = gid('an');
  const p = 'M50 50 C 36 44, 31 20, 43.5 10 C 47.5 7, 52.5 7, 56.5 10 C 69 20, 64 44, 50 50 Z';
  return (
    <SVG size={size}>
      <defs>
        <linearGradient id={g + 'p'} gradientUnits="userSpaceOnUse" x1="50" y1="50" x2="50" y2="8">
          <stop offset="0" stopColor="#F6EFEA" /><stop offset=".26" stopColor="#F3E2DE" /><stop offset=".34" stopColor="#E4535A" />
          <stop offset=".7" stopColor="#D5323F" /><stop offset="1" stopColor="#E66462" />
        </linearGradient>
      </defs>
      {[30, 90, 150, 210, 270, 330].map((a, i) => (
        <g key={a} transform={`rotate(${a + (i % 2 ? 4 : -4)} 50 50)`}>
          <path d={p} fill={`url(#${g}p)`} stroke="#B02A37" strokeWidth=".5" />
          {[-6, -3, 0, 3, 6].map(dx => (
            <path key={dx} d={`M50 40 Q ${50 + dx * 0.7} 26 ${50 + dx} 13`} fill="none" stroke="#A82434" strokeWidth=".4" opacity=".4" />
          ))}
        </g>
      ))}
      <circle cx="50" cy="50" r="9.5" fill="#2B2338" />
      {Array.from({ length: 36 }, (_, k) => {
        const a = (k / 36) * Math.PI * 2, L = 12.5 + (k % 3) * 0.9;
        return (
          <g key={k}>
            <line x1={50 + 8.5 * Math.cos(a)} y1={50 + 8.5 * Math.sin(a)} x2={50 + L * Math.cos(a)} y2={50 + L * Math.sin(a)} stroke="#2E2440" strokeWidth=".6" />
            <circle cx={50 + L * Math.cos(a)} cy={50 + L * Math.sin(a)} r=".85" fill="#3D3356" />
          </g>
        );
      })}
      {Array.from({ length: 18 }, (_, k) => {
        const a = k * 2.4, rr = 6.5 * Math.sqrt(k / 18);
        return <circle key={'c' + k} cx={50 + rr * Math.cos(a)} cy={50 + rr * Math.sin(a)} r=".9" fill="#4A3F66" />;
      })}
    </SVG>
  );
}

// ── 종려나무 · 시편 92:12 ──
function Palm({ size = 100 }) {
  const P = [[12, 97], [30, 72], [52, 48], [88, 16]];
  const lf = [];
  for (let i = 0; i <= 26; i++) {
    const t = 0.1 + 0.88 * i / 26;
    const [x, y] = cb(P, t), a = deg(ct(P, t));
    const L = 20 * (1 - 0.55 * i / 26) + 4;
    [-1, 1].forEach(sd => lf.push(
      <g key={`${i}${sd}`} transform={`translate(${x} ${y}) rotate(${a + 90 + sd * 58})`}>
        <path d={`M0 0 C 1.4 ${-L * 0.3}, 1.2 ${-L * 0.7}, 0 ${-L} C -0.6 ${-L * 0.7}, -0.8 ${-L * 0.3}, 0 0 Z`}
          fill={(i + (sd > 0 ? 1 : 0)) % 2 ? '#9BB487' : '#86A273'} stroke="#6F8C5E" strokeWidth=".3" />
        <path d={`M0 -1 L0 ${-L + 1}`} stroke="#6F8C5E" strokeWidth=".3" opacity=".6" />
      </g>
    ));
  }
  return (
    <SVG size={size}>
      {lf}
      <path d="M12 97 C 30 72, 52 48, 88 16" fill="none" stroke="#8C9A6A" strokeWidth="1.6" strokeLinecap="round" />
    </SVG>
  );
}

// ── 흩날리는 조각 ──
function FlowerBit({ kind, size = 14 }) {
  const P = {
    almond: ['M10 18 C 4.5 15.5, 3.5 7.5, 7 4 C 8.6 2.5, 11.4 2.5, 13 4 C 16.5 7.5, 15.5 15.5, 10 18 Z', '#F9DDE3', '#E3A9B7'],
    narcissus: ['M10 19 C 5 14, 5 6, 10 1 C 15 6, 15 14, 10 19 Z', '#FFFDF4', '#DCCFAE'],
    lily: ['M10 19 C 5 14, 5 6, 10 1 C 15 6, 15 14, 10 19 Z', '#FFFDF6', '#DDD0BF'],
    hyssop: ['M10 17 C 7 14, 6.6 9, 10 4 C 13.4 9, 13 14, 10 17 Z', '#F1ECF8', '#B3A3D6'],
    pomegranate: ['M10 19 C 3 16, 1.5 7, 5 3.5 C 7 1.6, 13 1.6, 15 3.5 C 18.5 7, 17 16, 10 19 Z', '#EE6E58', '#C23A36'],
    olive: ['M10 19 C 12.5 13, 12.5 6, 10 1 C 7.5 6, 7.5 13, 10 19 Z', '#A7B79E', '#6F8768'],
    anemone: ['M10 19 C 3 16, 1.5 7, 5 3.5 C 7 1.6, 13 1.6, 15 3.5 C 18.5 7, 17 16, 10 19 Z', '#DE4A50', '#A82434'],
    palm: ['M10 19 C 11.4 13, 11.2 6, 10 1 C 8.8 6, 8.6 13, 10 19 Z', '#9BB487', '#6F8C5E']
  };
  let body;
  if (kind === 'grape') {
    body = <g><circle cx="10" cy="10" r="5.5" fill="#7E60AC" stroke="#3E2A62" strokeWidth=".5" /><ellipse cx="8.2" cy="8" rx="1.6" ry="1.1" fill="#FFFFFF" opacity=".55" /></g>;
  } else {
    const [d, f, s] = P[kind] || P.almond;
    body = <g><path d={d} fill={f} stroke={s} strokeWidth=".6" /><path d="M10 17 L10 5" stroke={s} strokeWidth=".4" opacity=".5" /></g>;
  }
  return <svg width={size} height={size} viewBox="0 0 20 20" style={{ display: 'block' }}>{body}</svg>;
}

const MAP = { almond: Almond, narcissus: Narcissus, lily: Lily, hyssop: Hyssop, pomegranate: Pomegranate, olive: Olive, grape: Grape, anemone: Anemone, palm: Palm };
function Flower({ kind, size }) { const C = MAP[kind] || Almond; return <C size={size} />; }

const INFO = {
  almond:      { name: '살구꽃',      mean: '민수기 17:8',    verse: '아론의 지팡이에 움이 돋고 순이 나고 꽃이 피어서', type: 'sprig', note: "이스라엘 열두 지파의 지팡이 가운데 아론의 지팡이에만 하룻밤 사이 움이 돋고 꽃이 피어 열매까지 맺혔습니다. 하나님께서 직접 섬길 사람을 택하셨다는 표징이었습니다. 히브리어로 살구나무(샤케드)는 ‘지켜보다’(쇼케드)와 소리가 같아, 하나님이 당신의 말씀을 지켜 이루신다는 뜻도 담고 있습니다. 권사로 세워지는 일 또한 사람의 뜻이 아니라 하나님의 부르심임을 기억합니다." },
  narcissus:   { name: '샤론의 수선화', mean: '아가 2:1',      verse: '나는 샤론의 수선화요 골짜기의 백합화로다', type: 'head', note: "아가서의 신부가 자신을 들판 어디에나 피는 꽃에 빗대어 드린 고백입니다. 화려하지 않아도 사랑하는 이의 눈에 귀하게 여겨진다는 고백처럼, 주님의 사랑 안에서 서로를 귀한 자리로 초대합니다." },
  lily:        { name: '백합화',      mean: '이사야 35:1',    verse: '사막이 백합화 같이 피어 즐거워하며', type: 'head', note: "메마른 광야가 꽃으로 뒤덮이는 회복의 약속입니다. 아무것도 자랄 수 없을 것 같은 곳에서 하나님이 새 일을 시작하십니다. 임직의 날은 하나님이 여시는 새로운 시작의 날입니다." },
  hyssop:      { name: '우슬초',      mean: '시편 51:7',      verse: '우슬초로 나를 정결하게 하소서 내가 정하리이다', type: 'sprig', note: "우슬초는 유월절에 문설주에 피를 바르고, 정결 예식에서 물과 피를 뿌리는 데 쓰인 식물입니다. 다윗은 죄를 회개하며 우슬초로 정결하게 해 달라고 기도했습니다. 예배의 순서 앞에서 먼저 마음을 정결히 준비합니다." },
  pomegranate: { name: '석류',        mean: '출애굽기 28:33', verse: '그 옷 가장자리로 돌아가며 청색 자색 홍색 실로 석류를 수놓고', type: 'sprig', note: "대제사장의 겉옷 가장자리는 석류와 금방울로 번갈아 둘러졌습니다. 많은 씨앗을 품은 석류는 풍성한 열매를, 그 옷은 하나님 앞에서 백성을 위해 서는 섬김의 직분을 뜻합니다. 섬김의 자리에 서시는 권사님들을 축복합니다." },
  olive:       { name: '감람나무',    mean: '시편 52:8',      verse: '나는 하나님의 집에 있는 푸른 감람나무 같음이여', type: 'sprig', note: "감람나무는 수백 년을 살며 열매에서 기름을 내는 나무로, 성전의 등불과 기름 부음에 쓰였습니다. 하나님의 집에 뿌리내린 나무처럼 오래도록 푸르기를 바라는 마음으로 예배의 자리로 모십니다." },
  grape:       { name: '포도나무',    mean: '요한복음 15:5',  verse: '나는 포도나무요 너희는 가지라', type: 'head', note: "가지는 나무에 붙어 있을 때에만 열매를 맺습니다. 지나온 시간도, 앞으로의 날들도 모두 주님 안에 붙어 있을 때 맺히는 열매임을 기억합니다." },
  anemone:     { name: '들의 백합화', mean: '마태복음 6:28',  verse: '들의 백합화가 어떻게 자라는가 생각하여 보라', type: 'head', note: "예수님은 수고하지도 길쌈하지도 않는 들꽃을 하나님이 솔로몬보다 아름답게 입히신다며 염려하지 말라고 하셨습니다. 갈릴리 들판을 붉게 물들이는 아네모네가 이 ‘들의 백합화’로 여겨집니다. 모든 준비를 하나님께 맡기는 마음으로 안내를 드립니다." },
  palm:        { name: '종려나무',    mean: '시편 92:12',     verse: '의인은 종려나무 같이 번성하며', type: 'sprig', note: "종려나무는 메마른 땅에서도 곧게 자라 오랫동안 열매를 맺습니다. 예수님이 예루살렘에 들어가실 때 사람들은 종려나무 가지를 들고 맞았습니다. 세워지신 권사님들의 삶이 이처럼 곧고 풍성하기를 축복합니다." }
};
const SEC = {
  '02 Invite': 'narcissus', '03 Date': 'lily', '04 Order': 'hyssop', '05 Ordainees': 'pomegranate',
  '06 Location': 'olive', '07 Gallery': 'grape', '08 Notice': 'anemone'
};

window.ODF = { Flower, FlowerBit, INFO, SEC, HERO: 'almond', FOOTER: 'palm' };
})();
