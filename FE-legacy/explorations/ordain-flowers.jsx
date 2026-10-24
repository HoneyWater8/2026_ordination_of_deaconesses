/* 꽃 일러스트 · B 스킨 — 섹션마다 다른 꽃, 꽃말이 그 섹션의 테마 */
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

// ── 붓꽃 · 기쁜 소식 ──
function Iris({ size = 100 }) {
  const g = gid('ir');
  const fall = 'M50 50 C 40 45, 28 28, 36.5 12.5 C 42.5 2.5, 57.5 2.5, 63.5 12.5 C 72 28, 60 45, 50 50 Z';
  const std = 'M50 50 C 43.5 42, 40.5 27, 45.2 14.5 C 47.3 9.2, 52.7 9.2, 54.8 14.5 C 59.5 27, 56.5 42, 50 50 Z';
  const sty = 'M50 50 C 47 45, 46.6 40, 47.6 35 Q 50 32.6 52.4 35 C 53.4 40, 53 45, 50 50 Z';
  return (
    <SVG size={size}>
      <defs>
        <linearGradient id={g + 'f'} gradientUnits="userSpaceOnUse" x1="50" y1="50" x2="50" y2="4">
          <stop offset="0" stopColor="#5A5199" /><stop offset=".38" stopColor="#7A70BD" /><stop offset="1" stopColor="#A9A2DE" />
        </linearGradient>
        <linearGradient id={g + 's'} gradientUnits="userSpaceOnUse" x1="50" y1="50" x2="50" y2="10">
          <stop offset="0" stopColor="#8A82CC" /><stop offset="1" stopColor="#CBC5EF" />
        </linearGradient>
        <linearGradient id={g + 'y'} gradientUnits="userSpaceOnUse" x1="50" y1="50" x2="50" y2="33">
          <stop offset="0" stopColor="#C9C4EE" /><stop offset="1" stopColor="#EEECFA" />
        </linearGradient>
      </defs>
      {[60, 180, 300].map(a => (
        <g key={a} transform={`rotate(${a} 50 50)`}>
          <path d={fall} fill={`url(#${g}f)`} stroke="#665DAA" strokeWidth=".5" />
          <path d="M50 48 C 45.6 42, 44.6 33, 46.8 26.5 Q 50 24 53.2 26.5 C 55.4 33, 54.4 42, 50 48 Z" fill="#FFFFFF" opacity=".5" />
          {[-9, -5, 0, 5, 9].map(dx => (
            <path key={dx} d={`M50 47 Q ${50 + dx * 0.6} 34 ${50 + dx} 18`} fill="none" stroke="#4E468F" strokeWidth=".45" opacity=".55" />
          ))}
          <path d="M50 46 Q 49.4 36 50 24" fill="none" stroke="#F0C658" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M50 46 Q 49.4 36 50 24" fill="none" stroke="#FBE39A" strokeWidth="1" strokeLinecap="round" strokeDasharray=".6 1.4" />
        </g>
      ))}
      {[60, 180, 300].map(a => (
        <path key={'y' + a} d={sty} fill={`url(#${g}y)`} stroke="#B3ADE2" strokeWidth=".4" transform={`rotate(${a} 50 50)`} />
      ))}
      {[0, 120, 240].map(a => (
        <g key={'s' + a} transform={`rotate(${a} 50 50)`}>
          <path d={std} fill={`url(#${g}s)`} stroke="#8079C4" strokeWidth=".5" />
          <path d="M50 47 Q 50.6 31 50 15" fill="none" stroke="#7D75C0" strokeWidth=".5" opacity=".6" />
        </g>
      ))}
      <circle cx="50" cy="50" r="2.6" fill="#E9BE55" />
    </SVG>
  );
}

// ── 프리지아 · 새로운 시작 ──
function FreesiaBloom({ x, y, s, r = 0, g }) {
  const p = 'M0 0 C -4.4 -1.6, -5.6 -7.2, -2.7 -9.8 C -1 -11, 1 -11, 2.7 -9.8 C 5.6 -7.2, 4.4 -1.6, 0 0 Z';
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      {[0, 120, 240].map(a => (
        <path key={a} d={p} fill={`url(#${g}p)`} stroke="#DFA035" strokeWidth=".4" transform={`rotate(${a})`} />
      ))}
      {[60, 180, 300].map(a => (
        <g key={a} transform={`rotate(${a}) scale(.88)`}>
          <path d={p} fill={`url(#${g}p)`} stroke="#DFA035" strokeWidth=".4" />
          <path d="M0 -1.5 L0 -8.4" stroke="#E6A13A" strokeWidth=".35" />
        </g>
      ))}
      <circle r="3" fill={`url(#${g}t)`} />
      {[30, 150, 270].map(a => <circle key={a} cx="0" cy="-1.5" r=".55" fill="#FFF5D6" transform={`rotate(${a})`} />)}
    </g>
  );
}
function Freesia({ size = 100 }) {
  const g = gid('fr');
  return (
    <SVG size={size}>
      <defs>
        <linearGradient id={g + 'p'} x1=".5" y1="1" x2=".5" y2="0">
          <stop offset="0" stopColor="#EDA13A" /><stop offset=".5" stopColor="#F7CF68" /><stop offset="1" stopColor="#FCEAA6" />
        </linearGradient>
        <radialGradient id={g + 't'}>
          <stop offset="0" stopColor="#DC7A2A" /><stop offset="1" stopColor="#F2AE48" stopOpacity=".4" />
        </radialGradient>
        <linearGradient id={g + 'b'} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E9E28F" /><stop offset="1" stopColor="#B9C46B" />
        </linearGradient>
      </defs>
      <path d="M9 99 C 17 76, 29 60, 44 47 C 36 61, 26 77, 19 99 Z" fill="#AEC6A3" stroke="#90AB8A" strokeWidth=".4" />
      <path d="M12 98 C 20 79, 30 64, 42 50" fill="none" stroke="#93AE8C" strokeWidth=".5" />
      <path d="M14 95 C 28 74, 44 53, 63 37 C 71 30, 77 25, 86 17" fill="none" stroke="#8FAA8A" strokeWidth="2" />
      {[[26, 77], [40, 60], [54, 46], [66, 35]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y} q -1 -3 -3.6 -4.6`} stroke="#8FAA8A" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      ))}
      <ellipse cx="77.5" cy="25.6" rx="2.6" ry="5" fill={`url(#${g}b)`} transform="rotate(48 77.5 25.6)" />
      <ellipse cx="84.4" cy="18.6" rx="1.9" ry="3.8" fill={`url(#${g}b)`} transform="rotate(50 84.4 18.6)" />
      <FreesiaBloom g={g} x={21} y={70} s={1.55} r={-18} />
      <FreesiaBloom g={g} x={36} y={53} s={1.35} r={-8} />
      <FreesiaBloom g={g} x={51} y={40} s={1.12} r={4} />
      <FreesiaBloom g={g} x={63.5} y={30} s={0.86} r={12} />
    </SVG>
  );
}

// ── 라벤더 · 침묵과 기대 ──
function Lavender({ size = 100 }) {
  const stems = [
    { p0: [50, 98], c: [42, 58], p1: [33, 10] },
    { p0: [50, 98], c: [51, 52], p1: [53, 4] },
    { p0: [50, 98], c: [60, 58], p1: [70, 12] }
  ];
  const cols = ['#8E7AC1', '#A994D4', '#7A66B2', '#BBA9DF'];
  const bz = (s, t) => { const u = 1 - t; return [u * u * s.p0[0] + 2 * u * t * s.c[0] + t * t * s.p1[0], u * u * s.p0[1] + 2 * u * t * s.c[1] + t * t * s.p1[1]]; };
  const tg = (s, t) => [2 * (1 - t) * (s.c[0] - s.p0[0]) + 2 * t * (s.p1[0] - s.c[0]), 2 * (1 - t) * (s.c[1] - s.p0[1]) + 2 * t * (s.p1[1] - s.c[1])];
  return (
    <SVG size={size}>
      <path d="M50 97 C 42 88, 35 83, 26 80 C 35 86, 42 90, 49 98 Z" fill="#A6BDA1" />
      <path d="M50 97 C 58 87, 65 82, 74 79 C 65 86, 58 91, 51 98 Z" fill="#9CB497" />
      {stems.map((s, si) => {
        const N = 18, fl = [];
        for (let i = 0; i <= N; i++) {
          const t = 0.46 + 0.54 * i / N;
          const [x, y] = bz(s, t);
          const [dx, dy] = tg(s, t);
          const ang = Math.atan2(dy, dx) * 180 / Math.PI;
          const k = 1 - 0.5 * (i / N);
          const side = i % 2 ? 1 : -1;
          const L = Math.hypot(dx, dy) || 1;
          const ox = x + side * 2.1 * k * (-dy) / L, oy = y + side * 2.1 * k * dx / L;
          fl.push(<ellipse key={i} cx={ox} cy={oy} rx={1.75 * k} ry={3 * k} fill={cols[(i + si) % 4]}
            transform={`rotate(${ang + 90 + side * 30} ${ox} ${oy})`} />);
          if (i % 3 === 0) fl.push(<circle key={'d' + i} cx={x} cy={y} r={0.9 * k} fill="#6A58A0" opacity=".7" />);
        }
        return (
          <g key={si}>
            <path d={`M${s.p0[0]} ${s.p0[1]} Q ${s.c[0]} ${s.c[1]} ${s.p1[0]} ${s.p1[1]}`} fill="none" stroke="#8FAA8A" strokeWidth="1.2" />
            {fl}
          </g>
        );
      })}
    </SVG>
  );
}

// ── 카네이션 · 존경 ──
function Carnation({ size = 100 }) {
  const g = gid('cn');
  const layers = [
    { R: 45, n: 18, c: '#F4BCC7', e: '#FBE1E6', r: 0 },
    { R: 35.5, n: 15, c: '#EB9EAF', e: '#F7CFD7', r: 9 },
    { R: 26, n: 12, c: '#DE7F96', e: '#F1B4C1', r: 4 },
    { R: 16.5, n: 9, c: '#C95E78', e: '#E3949F', r: 13, dark: true }
  ];
  const shape = (R, n, L) => {
    let d = '';
    for (let i = 0; i <= 300; i++) {
      const th = (i / 300) * Math.PI * 2;
      const fr = Math.pow(Math.abs(Math.sin(n * th / 2)), 0.5);
      const r = R - 4.6 * fr + 1.3 * Math.abs(Math.sin(n * 3 * th + L)) + 0.5 * Math.sin(5 * th + L);
      d += (i ? 'L' : 'M') + (50 + r * Math.cos(th)).toFixed(2) + ' ' + (50 + r * Math.sin(th)).toFixed(2);
    }
    return d + 'Z';
  };
  return (
    <SVG size={size}>
      <defs>
        {layers.map((l, i) => (
          <radialGradient key={i} id={`${g}${i}`} gradientUnits="userSpaceOnUse" cx="50" cy="50" r={l.R}>
            <stop offset="0" stopColor={l.dark ? '#9E3A53' : l.c} />
            <stop offset=".7" stopColor={l.c} />
            <stop offset="1" stopColor={l.e} />
          </radialGradient>
        ))}
      </defs>
      {layers.map((l, i) => {
        const m = l.n;
        return (
          <g key={i} transform={`rotate(${l.r} 50 50)`}>
            <path d={shape(l.R, l.n, i * 1.7)} fill={`url(#${g}${i})`} stroke="#B84E69" strokeWidth=".9" strokeOpacity=".7" strokeLinejoin="round" />
            {Array.from({ length: m }, (_, k) => {
              const a = ((k + 0.5) / m) * Math.PI * 2;
              return <line key={k} x1={50 + l.R * 0.5 * Math.cos(a)} y1={50 + l.R * 0.5 * Math.sin(a)}
                x2={50 + (l.R - 4.6) * Math.cos(a)} y2={50 + (l.R - 4.6) * Math.sin(a)}
                stroke="#B84E69" strokeWidth=".8" opacity=".45" />;
            })}
          </g>
        );
      })}
      <path d="M46.6 49 C 47.8 46, 52.4 46, 53.4 49 C 54.4 52.4, 50 54.4, 48.2 52 M44.6 52.4 C 45.8 56.2, 52.4 57.2, 55.6 52.8" fill="none" stroke="#8A2F47" strokeWidth=".9" opacity=".8" />
    </SVG>
  );
}

// ── 해바라기 · 기다림 ──
function Sunflower({ size = 100 }) {
  const g = gid('sf');
  const p = 'M50 50 C 44.6 40, 44.4 22, 50 8.5 C 55.6 22, 55.4 40, 50 50 Z';
  const seeds = [];
  for (let i = 1; i < 170; i++) {
    const a = i * 2.39996, rr = 16 * Math.sqrt(i / 170);
    seeds.push(<circle key={i} cx={50 + rr * Math.cos(a)} cy={50 + rr * Math.sin(a)} r={0.42 + 0.45 * (rr / 16)}
      fill={i % 2 ? '#2E1B0C' : '#9A6632'} opacity=".92" />);
  }
  return (
    <SVG size={size}>
      <defs>
        <linearGradient id={g + 'p'} gradientUnits="userSpaceOnUse" x1="50" y1="50" x2="50" y2="8.5">
          <stop offset="0" stopColor="#E09A30" /><stop offset=".45" stopColor="#F5C550" /><stop offset="1" stopColor="#FBE08C" />
        </linearGradient>
        <radialGradient id={g + 'd'} gradientUnits="userSpaceOnUse" cx="50" cy="50" r="18">
          <stop offset="0" stopColor="#3E2512" /><stop offset=".75" stopColor="#5E3B1C" /><stop offset="1" stopColor="#8B5A2A" />
        </radialGradient>
      </defs>
      {Array.from({ length: 20 }, (_, k) => (
        <path key={'b' + k} d={p} fill="#DC9A33" stroke="#C98629" strokeWidth=".4" transform={`rotate(${k * 18 + 9} 50 50)`} />
      ))}
      {Array.from({ length: 20 }, (_, k) => (
        <g key={'f' + k} transform={`rotate(${k * 18} 50 50)`}>
          <path d={p} fill={`url(#${g}p)`} stroke="#D99530" strokeWidth=".4" />
          <path d="M50 33 Q 50.5 22 50 12" fill="none" stroke="#DE9C34" strokeWidth=".5" opacity=".75" />
        </g>
      ))}
      <circle cx="50" cy="50" r="18" fill={`url(#${g}d)`} />
      <circle cx="50" cy="50" r="18.2" fill="none" stroke="#A8743A" strokeWidth="1.1" opacity=".85" />
      {seeds}
    </SVG>
  );
}

// ── 물망초 · 나를 잊지 마세요 ──
function ForgetMeNot({ size = 100 }) {
  const g = gid('fm');
  const p = 'M0 0 C -5.2 -2.6, -7.2 -9, -4.2 -12.6 C -2.2 -14.8, 2.2 -14.8, 4.2 -12.6 C 7.2 -9, 5.2 -2.6, 0 0 Z';
  const fls = [[50, 40, 1.2, 0], [30, 53, 0.98, 14], [69, 55, 1.02, -10], [45, 67, 0.84, 30], [64, 29, 0.78, -20], [33, 31, 0.72, 8], [58, 73, 0.66, 20]];
  const buds = [[78, 41, 2.4], [22, 41, 2.1], [73, 73, 2], [26, 68, 1.7]];
  return (
    <SVG size={size}>
      <defs>
        <linearGradient id={g + 'p'} x1=".5" y1="1" x2=".5" y2="0">
          <stop offset="0" stopColor="#6E97CF" /><stop offset=".55" stopColor="#97BBE6" /><stop offset="1" stopColor="#C2D9F3" />
        </linearGradient>
        <radialGradient id={g + 'b'} cx=".4" cy=".35">
          <stop offset="0" stopColor="#F6D9E6" /><stop offset="1" stopColor="#D79DBB" />
        </radialGradient>
      </defs>
      <path d="M50 98 C 40 86, 30 82, 18 82 C 30 78, 42 82, 50 92 Z" fill="#A6BDA1" />
      <path d="M50 98 C 60 86, 70 84, 82 86 C 70 80, 58 82, 50 92 Z" fill="#9CB497" />
      {fls.map(([x, y], i) => (
        <path key={'s' + i} d={`M50 97 Q ${(50 + x) / 2 + (x < 50 ? -4 : 4)} ${(97 + y) / 2} ${x} ${y}`} fill="none" stroke="#8FAA8A" strokeWidth=".8" />
      ))}
      {buds.map(([x, y, r], i) => (
        <g key={'b' + i}>
          <path d={`M50 97 Q ${(50 + x) / 2} ${(97 + y) / 2 + 6} ${x} ${y + r}`} fill="none" stroke="#8FAA8A" strokeWidth=".6" />
          <circle cx={x} cy={y} r={r} fill={`url(#${g}b)`} />
        </g>
      ))}
      {fls.map(([x, y, s, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
          {[0, 72, 144, 216, 288].map(a => (
            <g key={a} transform={`rotate(${a})`}>
              <path d={p} fill={`url(#${g}p)`} stroke="#6B92C8" strokeWidth=".45" />
              <path d="M0 -3 L0 -10.5" stroke="#6E95CB" strokeWidth=".4" opacity=".55" />
              <path d="M0 -1 L0 -4.6" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity=".92" />
            </g>
          ))}
          <circle r="3.2" fill="#FFFFFF" />
          <circle r="2.3" fill="#F3CF63" stroke="#E3AE3E" strokeWidth=".5" />
          <circle r=".9" fill="#D9963A" />
        </g>
      ))}
    </SVG>
  );
}

// ── 은방울꽃 · 틀림없이 행복해집니다 ──
function LilyValley({ size = 100 }) {
  const g = gid('lv');
  const bell = 'M-6 1 C -7 4, -7.6 8, -7 10.2 Q -5.6 12.6 -4.2 10.6 Q -2.8 12.8 -1.4 10.8 Q 0 13 1.4 10.8 Q 2.8 12.8 4.2 10.6 Q 5.6 12.6 7 10.2 C 7.6 8, 7 4, 6 1 C 3 -1.2, -3 -1.2, -6 1 Z';
  const bells = [[55.5, 60, 1.18], [58.5, 47.5, 1.1], [63.5, 37, 1], [70.5, 29, 0.88], [78.5, 22.6, 0.74]];
  return (
    <SVG size={size}>
      <defs>
        <linearGradient id={g + 'l'} gradientUnits="userSpaceOnUse" x1="20" y1="10" x2="46" y2="96">
          <stop offset="0" stopColor="#B1CCA5" /><stop offset="1" stopColor="#7B9C76" />
        </linearGradient>
        <linearGradient id={g + 'b'} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" /><stop offset=".55" stopColor="#F6F3EA" /><stop offset="1" stopColor="#D9D2C1" />
        </linearGradient>
      </defs>
      <path d="M60 97 C 75 78, 85 54, 83 28 C 72 47, 63 70, 55 97 Z" fill="#BCD3B1" opacity=".9" />
      <path d="M38 97 C 14 72, 9 38, 23 6 C 40 30, 49 62, 46 97 Z" fill={`url(#${g}l)`} stroke="#749570" strokeWidth=".4" />
      <path d="M42.5 96 C 36 66, 30 38, 24 9" fill="none" stroke="#6E8F69" strokeWidth=".6" />
      {[-3.5, 3.5].map(o => (
        <path key={o} d={`M${42.5 + o * 0.5} 94 C ${36 + o} 66, ${30 + o} 40, ${24.5 + o * 0.4} 13`} fill="none" stroke="#88A782" strokeWidth=".35" opacity=".7" />
      ))}
      <path d="M52 97 C 52 68, 56 46, 66 33 C 73 25, 80 20, 90 18" fill="none" stroke="#8FAA8A" strokeWidth="1.5" />
      {bells.map(([x, y, s], i) => (
        <g key={i}>
          <path d={`M${x - 2} ${y - 1} Q ${x + 1.5} ${y} ${x + 1.2} ${y + 4}`} fill="none" stroke="#8FAA8A" strokeWidth=".8" />
          <g transform={`translate(${x + 1.2} ${y + 4}) scale(${s * 0.62})`}>
            <path d={bell} fill={`url(#${g}b)`} stroke="#CFC7B4" strokeWidth=".6" />
            <ellipse cx="-3.2" cy="4.6" rx="1.2" ry="3" fill="#FFFFFF" />
            <path d="M-4 10.8 L-4.2 12 M0 11.2 L0 12.6 M4 10.8 L4.2 12" stroke="#B9C99A" strokeWidth=".5" />
          </g>
        </g>
      ))}
      <circle cx="85" cy="20.6" r="1.8" fill="#EEF0DE" stroke="#C9CCA6" strokeWidth=".4" />
      <circle cx="89" cy="19.4" r="1.3" fill="#E5EACF" stroke="#C3C79E" strokeWidth=".4" />
    </SVG>
  );
}

// ── 분홍 장미 · 감사 ──
function Rose({ size = 100 }) {
  const g = gid('rs');
  const pp = (R, w = 0.84) => `M0 0 C ${-R * w} ${-R * 0.1}, ${-R * 0.95} ${-R * 0.98}, 0 ${-R} C ${R * 0.95} ${-R * 0.98}, ${R * w} ${-R * 0.1}, 0 0 Z`;
  const layers = [
    { R: 43, n: 5, rot: 0, off: 5, c: ['#E8A2AF', '#F4C3CB', '#FCE7EA'] },
    { R: 35, n: 5, rot: 36, off: 4, c: ['#DE8A9B', '#EEAFBA', '#FADDE2'] },
    { R: 26, n: 5, rot: 14, off: 3, c: ['#D27489', '#E599A8', '#F6CDD5'] },
    { R: 18, n: 4, rot: 52, off: 2, c: ['#C4627A', '#DA8497', '#EFB9C4'] },
    { R: 11.5, n: 3, rot: 24, off: 1, c: ['#B4556D', '#CC7287', '#E3A0AF'] }
  ];
  return (
    <SVG size={size}>
      <defs>
        {layers.map((l, i) => (
          <linearGradient key={i} id={`${g}${i}`} x1=".5" y1="1" x2=".5" y2="0">
            <stop offset="0" stopColor={l.c[0]} /><stop offset=".55" stopColor={l.c[1]} /><stop offset="1" stopColor={l.c[2]} />
          </linearGradient>
        ))}
      </defs>
      {layers.map((l, i) => Array.from({ length: l.n }, (_, k) => (
        <g key={i + '-' + k} transform={`translate(50 50) rotate(${l.rot + k * 360 / l.n}) translate(0 ${l.off})`}>
          <path d={pp(l.R)} fill={`url(#${g}${i})`} stroke="#C86479" strokeWidth=".45" strokeOpacity=".55" />
          <path d={`M${-l.R * 0.5} ${-l.R * 0.84} Q 0 ${-l.R * 1.02} ${l.R * 0.5} ${-l.R * 0.84}`} fill="none" stroke="#FFFFFF" strokeWidth=".9" opacity=".55" />
        </g>
      )))}
      <circle cx="50" cy="50" r="6.2" fill="#BF5D74" />
      <path d="M50.4 50.2 C 52.8 49.2, 53.4 52.6, 51 53.4 C 47.8 54.4, 46.2 50.8, 48 48.4 C 50.2 45.6, 55 46.4, 56 50 C 57 54.4, 53 57.8, 48.6 57.2" fill="none" stroke="#9C4058" strokeWidth=".9" />
    </SVG>
  );
}

// ── 흩날리는 꽃잎 ──
function FlowerBit({ kind, size = 14 }) {
  const P = {
    lily: ['M10 19 C 5 14, 5 6, 10 1 C 15 6, 15 14, 10 19 Z', '#FFFDF6', '#DDD0BF'],
    iris: ['M10 19 C 5 16, 2 9, 6 4 C 8 1.5, 12 1.5, 14 4 C 18 9, 15 16, 10 19 Z', '#9A92D4', '#6F66B3'],
    freesia: ['M10 18 C 4.5 15.5, 3.5 7.5, 7 4 C 8.6 2.5, 11.4 2.5, 13 4 C 16.5 7.5, 15.5 15.5, 10 18 Z', '#F7D06A', '#E0A23A'],
    lavender: ['M10 18 C 7 15, 6.4 9, 10 3 C 13.6 9, 13 15, 10 18 Z', '#A792D3', '#7C68B4'],
    carnation: ['M10 19 C 6 16, 3 10, 3.4 5 L5 6.6 L6.2 3.6 L8 5.6 L10 2.4 L12 5.6 L13.8 3.6 L15 6.6 L16.6 5 C 17 10, 14 16, 10 19 Z', '#EE9FB1', '#C95E78'],
    sunflower: ['M10 19 C 7 14, 7 6, 10 1 C 13 6, 13 14, 10 19 Z', '#F5C450', '#D9952F'],
    rose: ['M10 19 C 3 16, 1.5 7, 5 3.5 C 7 1.6, 13 1.6, 15 3.5 C 18.5 7, 17 16, 10 19 Z', '#F2B9C3', '#D98597']
  };
  let body;
  if (kind === 'forgetmenot') {
    body = <g>
      {[0, 72, 144, 216, 288].map(a => <ellipse key={a} cx="10" cy="5.6" rx="3" ry="4" fill="#9DBFE8" stroke="#6E95CB" strokeWidth=".4" transform={`rotate(${a} 10 10)`} />)}
      <circle cx="10" cy="10" r="2" fill="#F3CF63" />
    </g>;
  } else if (kind === 'lilyvalley') {
    body = <path d="M4.6 5 C 4 8, 3.6 12, 4.2 14 Q 5.6 16 7 14.4 Q 8.5 16.2 10 14.6 Q 11.5 16.2 13 14.4 Q 14.4 16 15.8 14 C 16.4 12, 16 8, 15.4 5 C 13 3, 7 3, 4.6 5 Z" fill="#FBFAF4" stroke="#CFC7B4" strokeWidth=".6" />;
  } else {
    const [d, f, s] = P[kind] || P.rose;
    body = <g><path d={d} fill={f} stroke={s} strokeWidth=".6" /><path d="M10 17 L10 5" stroke={s} strokeWidth=".4" opacity=".5" /></g>;
  }
  return <svg width={size} height={size} viewBox="0 0 20 20" style={{ display: 'block' }}>{body}</svg>;
}

const MAP = { lily: Lily, iris: Iris, freesia: Freesia, lavender: Lavender, carnation: Carnation, sunflower: Sunflower, forgetmenot: ForgetMeNot, lilyvalley: LilyValley, rose: Rose };
function Flower({ kind, size }) { const C = MAP[kind] || Lily; return <C size={size} />; }

const INFO = {
  lily:        { name: '백합',     mean: '순결, 변함없는 사랑', type: 'head' },
  iris:        { name: '붓꽃',     mean: '기쁜 소식',          type: 'head' },
  freesia:     { name: '프리지아', mean: '새로운 시작',        type: 'sprig' },
  lavender:    { name: '라벤더',   mean: '침묵과 기대',        type: 'sprig' },
  carnation:   { name: '카네이션', mean: '존경',               type: 'head' },
  sunflower:   { name: '해바라기', mean: '기다림',             type: 'head' },
  forgetmenot: { name: '물망초',   mean: '나를 잊지 마세요',   type: 'sprig' },
  lilyvalley:  { name: '은방울꽃', mean: '틀림없이 행복해집니다', type: 'sprig' },
  rose:        { name: '분홍 장미', mean: '감사',              type: 'head' }
};
const SEC = {
  '02 Invite': 'iris', '03 Date': 'freesia', '04 Order': 'lavender', '05 Ordainees': 'carnation',
  '06 Location': 'sunflower', '07 Gallery': 'forgetmenot', '08 Notice': 'lilyvalley'
};

window.ODF = { Flower, FlowerBit, INFO, SEC };
})();
