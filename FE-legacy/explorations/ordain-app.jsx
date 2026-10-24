/* 권사 임직 감사예배 초대장 — 공용 앱
   구조는 하나, 스킨(window.SKIN_KEY)만 바꿔서 세 시안 */

const { useState, useEffect, useRef } = React;
const O = window.ORDAIN;

const SKINS = {
  // A · 단아·격식 — 한지·먹
  ink: {
    outer: '#E4DCCB', bg: '#F7F3EA', bg2: '#EFE8DA',
    text: '#1E1C19', textSoft: '#55504A', label: '#A23A2A', accent: '#A23A2A', onAccent: '#FBF7EF',
    line: 'rgba(30,28,25,0.18)',
    card: '#FCFAF4', cardText: '#1E1C19', cardSoft: '#55504A', cardLine: 'rgba(30,28,25,0.14)', cardAccent: '#A23A2A',
    cardRadius: 0, cardShadow: 'none',
    photo: '#E6DECD', photoText: '#7E7466', photoAspect: '3 / 4', photoRadius: 0,
    fDisplay: '"Song Myung", "Nanum Myeongjo", serif', fBody: '"Nanum Myeongjo", serif', fLatin: '"Cormorant Garamond", serif',
    latinItalic: false, headWeight: 400, heroSize: 56, heroWeight: 400,
    orn: 'brush'
  },
  // B · 따뜻한 축하 — 꽃·파스텔
  bloom: {
    outer: '#F3E1DB', bg: '#FFF8F4', bg2: '#FCEEE9',
    text: '#3A2A2C', textSoft: '#6B585A', label: '#B44B60', accent: '#C2566A', accent2: '#8FAA8A', onAccent: '#FFFFFF',
    line: 'rgba(58,42,44,0.16)',
    card: '#FFFFFF', cardText: '#3A2A2C', cardSoft: '#6B585A', cardLine: 'rgba(58,42,44,0.12)', cardAccent: '#B44B60',
    cardRadius: 18, cardShadow: '0 10px 28px rgba(194,86,106,0.08)',
    photo: '#F7DEDA', photoText: '#B44B60', photoAspect: '1 / 1', photoRadius: '50%',
    fDisplay: '"Gowun Batang", serif', fBody: '"Pretendard", -apple-system, sans-serif', fLatin: '"Cormorant Garamond", serif',
    latinItalic: true, headWeight: 700, heroSize: 46, heroWeight: 700,
    orn: 'petal'
  },
  // C · 클래식 — 금박·카드
  gold: {
    outer: '#08101F', bg: '#0F1B31', bg2: '#13223D',
    text: '#F2EBDC', textSoft: '#C7BEAD', label: '#D9B865', accent: '#D9B865', onAccent: '#16120A',
    line: 'rgba(217,184,101,0.32)',
    card: '#F7F1E3', cardText: '#1F1A11', cardSoft: '#5B5241', cardLine: 'rgba(31,26,17,0.14)', cardAccent: '#8A6A1F',
    cardRadius: 2, cardShadow: 'inset 0 0 0 6px #F7F1E3, inset 0 0 0 7px rgba(138,106,31,0.55)',
    photo: '#1A2B4A', photoText: '#D9B865', photoAspect: '3 / 4', photoRadius: 2,
    fDisplay: '"Nanum Myeongjo", serif', fBody: '"Nanum Myeongjo", serif', fLatin: '"Cormorant Garamond", serif',
    latinItalic: false, headWeight: 800, heroSize: 48, heroWeight: 800,
    orn: 'foil',
    foil: 'linear-gradient(100deg,#B8923F 0%,#F3DC92 34%,#C9A24E 54%,#F7E4A4 74%,#B08A3A 100%)'
  }
};
const T = SKINS[window.SKIN_KEY] || SKINS.ink;
const foilText = T.foil ? { background: T.foil, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' } : {};
const ODF = window.ODF || null;
const FlowerCtx = React.createContext(null);
const HK = (ODF && ODF.HERO) || 'lily';
const FK = (ODF && ODF.FOOTER) || 'rose';
function VerseSheet({ kind, onClose }) {
  const info = ODF.INFO[kind];
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, []);
  return ReactDOM.createPortal(
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label={info.name + ' 말씀의 의미'} style={{
      position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(58,42,44,0.38)',
      backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center', animation: 'odFadeIn .25s ease-out'
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        position: 'relative', width: '100%', maxWidth: 460, maxHeight: '86dvh', overflowY: 'auto',
        background: T.bg, borderRadius: '24px 24px 0 0', padding: '14px 26px 34px',
        boxShadow: '0 -12px 40px rgba(58,42,44,0.18)', animation: 'odSheetIn .42s cubic-bezier(.22,1,.36,1)',
        textAlign: 'center', wordBreak: 'keep-all', overflowWrap: 'anywhere'
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 4, background: T.line, margin: '0 auto 6px' }} />
        <button onClick={onClose} aria-label="닫기" style={{
          position: 'absolute', top: 10, right: 12, width: 44, height: 44, border: 'none', background: 'transparent',
          cursor: 'pointer', color: T.textSoft, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2 L12 12 M12 2 L2 12" stroke="currentColor" strokeWidth="1.6" /></svg>
        </button>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}><ODF.Flower kind={kind} size={92} /></div>
        <div style={{ marginTop: 14, fontFamily: T.fDisplay, fontWeight: 700, fontSize: 22, color: T.text }}>{info.name}</div>
        <div style={{ marginTop: 4, fontFamily: T.fBody, fontSize: 13, fontWeight: 700, color: T.label }}>{info.mean}</div>
        <div style={{
          margin: '18px auto 0', maxWidth: 340, padding: '16px 18px', borderRadius: 14, background: T.bg2,
          fontFamily: T.fDisplay, fontSize: 15.5, lineHeight: 1.75, color: T.text
        }}>“{info.verse}”</div>
        <div style={{ height: 1, background: T.line, margin: '22px 0 18px' }} />
        <div style={{
          textAlign: 'left', fontFamily: T.fBody, fontSize: 14.5, lineHeight: 1.85, color: T.text, textWrap: 'pretty'
        }}>{info.note}</div>
      </div>
    </div>,
    document.body
  );
}

function FlowerCaption({ kind, style }) {
  const [open, setOpen] = useState(false);
  const info = ODF && ODF.INFO[kind];
  if (!info) return null;
  const sep = <span style={{ margin: '0 7px', opacity: 0.45 }}>|</span>;
  return (
    <div style={{ fontFamily: T.fBody, fontSize: 12.5, color: T.textSoft, letterSpacing: 0.2, wordBreak: 'keep-all', overflowWrap: 'anywhere', ...style }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 700, color: T.label }}>{info.name}</span>
        {sep}
        <span>{info.mean}</span>
        {info.note && (
          <>
            {sep}
            <button onClick={() => setOpen(true)} aria-label={info.name + ' 말씀의 의미 보기'} style={{
              width: 44, height: 44, margin: '-12px -11px', padding: 0, border: 'none', background: 'transparent',
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{
                width: 20, height: 20, borderRadius: '50%', border: '1px solid ' + T.label, color: T.label,
                background: T.card, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: T.fBody, fontSize: 12, fontWeight: 800, lineHeight: 1
              }}>?</span>
            </button>
          </>
        )}
      </div>
      {info.verse && (
        <div style={{
          margin: '6px auto 0', maxWidth: 300, fontFamily: T.fDisplay, fontSize: 13.5,
          lineHeight: 1.6, color: T.textSoft, textWrap: 'pretty', wordBreak: 'keep-all', overflowWrap: 'anywhere'
        }}>“{info.verse}”</div>
      )}
      {open && <VerseSheet kind={kind} onClose={() => setOpen(false)} />}
    </div>
  );
}

// ── 유틸 ──
function useReveal(ref) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return on;
}
function Reveal({ children, delay = 0, y = 16 }) {
  const ref = useRef(null);
  const on = useReveal(ref);
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0, transform: on ? 'none' : `translateY(${y}px)`,
      transition: `opacity .8s ease ${delay}s, transform .9s cubic-bezier(.22,1,.36,1) ${delay}s`
    }}>{children}</div>
  );
}
const splitName = (n) => { const m = n.match(/^(.+?)([A-Z])$/); return m ? [m[1], m[2]] : [n, '']; };
function dday() {
  const { y, m, d } = O.date;
  const t = new Date(y, m - 1, d);
  const n = new Date(); n.setHours(0, 0, 0, 0);
  const v = Math.round((t - n) / 86400000);
  return v > 0 ? `D-${v}` : v === 0 ? 'D-DAY' : null;
}

// ── 장식 ──
function Petal({ size = 14, opacity = 0.6, rotate = 0 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" style={{ transform: `rotate(${rotate}deg)`, display: 'block' }}>
      {[0, 72, 144, 216, 288].map(r => (
        <ellipse key={r} cx="10" cy="5.2" rx="3" ry="4.6" fill={T.accent} opacity={opacity} transform={`rotate(${r} 10 10)`} />
      ))}
      <circle cx="10" cy="10" r="2.1" fill={T.accent2} />
    </svg>
  );
}

function PetalOrn({ w, noCaption }) {
  const ref = useRef(null);
  const on = useReveal(ref);
  const ctxKind = React.useContext(FlowerCtx);
  const kind = ctxKind || HK;
  const sprig = ODF && ODF.INFO[kind].type === 'sprig';
  const line = (origin) => ({
    width: w / 2 - 18, height: 1, background: T.line,
    transform: on ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: origin,
    transition: 'transform 1s cubic-bezier(.22,1,.36,1) .35s'
  });
  return (
    <div ref={ref} style={{ margin: '14px 0 4px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <span style={line('right')} />
        <div style={{
          transform: on ? 'scale(1) rotate(0deg)' : `scale(0) rotate(${sprig ? -30 : -120}deg)`,
          transition: 'transform 1.1s cubic-bezier(.34,1.56,.64,1) .15s'
        }}>
          <div className="od-anim" style={{
            transformOrigin: sprig ? '50% 95%' : '50% 50%',
            animation: on ? `${sprig ? 'odSway' : 'odTurn'} ${sprig ? 6 : 11}s ease-in-out 1.4s infinite` : 'none'
          }}>
            {ODF ? <ODF.Flower kind={kind} size={sprig ? 46 : 38} /> : <Petal size={15} />}
          </div>
        </div>
        <span style={line('left')} />
      </div>
      {ctxKind && !noCaption && (
        <FlowerCaption kind={ctxKind} style={{
          marginTop: 10, opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(6px)',
          transition: 'opacity .8s ease .9s, transform .8s ease .9s'
        }} />
      )}
    </div>
  );
}

// 섹션 배경 — 그 섹션의 꽃이 모서리에서 살랑이고, 꽃잎이 천천히 떨어짐
function SecFlowers({ seed = '' }) {
  const kind = React.useContext(FlowerCtx);
  const boxRef = useRef(null);
  const [secH, setSecH] = useState(800);
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSecH(el.offsetHeight || 800));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  if (!kind || !ODF) return null;
  const sprig = ODF.INFO[kind].type === 'sprig';
  const h = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0);
  const flip = h % 2 === 0;
  const big = sprig ? 150 : 128, small = sprig ? 110 : 84;
  const A = sprig ? { bottom: -16, [flip ? 'left' : 'right']: -34 } : { top: -36, [flip ? 'left' : 'right']: -42 };
  const B = sprig ? { bottom: -12, [flip ? 'right' : 'left']: -30 } : { bottom: -26, [flip ? 'right' : 'left']: -30 };
  const tilt = sprig ? 0 : (h % 40) - 20;
  return (
    <div ref={boxRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <div className="od-anim" style={{
        position: 'absolute', ...A, opacity: 0.5, transformOrigin: sprig ? '50% 100%' : '50% 50%',
        animation: `odSway ${8 + (h % 3)}s ease-in-out infinite`
      }}>
        <div style={{ transform: `${flip ? '' : 'scaleX(-1) '}rotate(${tilt}deg)` }}><ODF.Flower kind={kind} size={big} /></div>
      </div>
      <div className="od-anim" style={{
        position: 'absolute', ...B, opacity: 0.42, transformOrigin: sprig ? '50% 100%' : '50% 50%',
        animation: `odSway ${9 + (h % 4)}s ease-in-out -3s infinite`
      }}>
        <div style={{ transform: `${flip ? 'scaleX(-1) ' : ''}rotate(${-tilt}deg)` }}><ODF.Flower kind={kind} size={small} /></div>
      </div>
      {Array.from({ length: Math.max(2, Math.round(secH / 420)) }, (_, i) => {
        const dur = Math.max(14, secH / 55) * (1 + (i % 3) * 0.12);
        return (
          <div key={i} className="od-anim" style={{
            position: 'absolute', top: 0, height: '100%', width: 0,
            left: `${8 + ((h * (i + 3) + i * 23) % 80)}%`,
            animation: `odFallY ${dur}s linear -${(((h + i * 37) % 100) / 100) * dur}s infinite`
          }}>
            <div className="od-anim" style={{ animation: `odSpinX ${7 + (i % 4)}s ease-in-out -${i * 1.3}s infinite alternate` }}>
              <ODF.FlowerBit kind={kind} size={12 + (i % 3) * 3} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Orn({ w = 120, color, noCaption }) {
  const c = color || T.text;
  if (T.orn === 'brush') {
    return (
      <svg width={w} height="10" viewBox="0 0 120 10" style={{ display: 'block', margin: '16px auto' }}>
        <path d="M2 6.2 C 28 2.2, 64 8.6, 118 3.6 L 118.4 5.2 C 64 10.2, 28 4.6, 2.2 7.6 Z" fill={c} opacity=".72" />
      </svg>
    );
  }
  if (T.orn === 'petal') return <PetalOrn w={w} noCaption={noCaption} />;
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, margin: '16px 0' }}>
      <span style={{ width: w / 2 - 12, height: 1, background: `linear-gradient(90deg,transparent,${T.accent})` }} />
      <svg width="8" height="8" viewBox="0 0 10 10"><path d="M5 0 L10 5 L5 10 L0 5Z" fill="none" stroke={T.accent} strokeWidth="1.2" /></svg>
      <svg width="10" height="10" viewBox="0 0 10 10"><path d="M5 0 L10 5 L5 10 L0 5Z" fill={T.accent} /></svg>
      <svg width="8" height="8" viewBox="0 0 10 10"><path d="M5 0 L10 5 L5 10 L0 5Z" fill="none" stroke={T.accent} strokeWidth="1.2" /></svg>
      <span style={{ width: w / 2 - 12, height: 1, background: `linear-gradient(90deg,${T.accent},transparent)` }} />
    </div>
  );
}

function Seal() {
  return (
    <span style={{
      display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      width: 36, height: 36, background: T.accent, color: T.onAccent, borderRadius: 3,
      fontFamily: T.fBody, fontSize: 10.5, fontWeight: 800, lineHeight: 1.15, transform: 'rotate(-4deg)'
    }}><span>임직</span><span>감사</span></span>
  );
}

function HeroDeco() {
  if (T.orn === 'brush') {
    return (
      <svg width="330" height="330" viewBox="0 0 320 320" style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-56%)',
        opacity: 0.08, pointerEvents: 'none'
      }}>
        <path d="M160 24 C 236 24, 296 84, 296 160 C 296 236, 236 296, 160 296 C 84 296, 26 238, 24 164 C 22 104, 58 52, 112 32"
          fill="none" stroke={T.text} strokeWidth="18" strokeLinecap="round" />
      </svg>
    );
  }
  if (T.orn === 'petal') {
    const lilies = [
      { top: -46, left: -62, s: 190, r: -14, o: 0.62, d: 0 },
      { top: 70, right: -40, s: 104, r: 28, o: 0.5, d: -2.4 },
      { bottom: 64, left: -30, s: 92, r: -36, o: 0.46, d: -4 },
      { bottom: -96, right: -92, s: 190, r: 16, o: 0.58, d: -1.2 }
    ];
    return (
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', width: 360, height: 360, transform: 'translate(-50%,-55%)',
          borderRadius: '50%', background: `radial-gradient(circle, ${T.photo} 0%, ${T.bg} 70%)`
        }} />
        {ODF && lilies.map((l, i) => {
          const { s: sz, r, o, d, ...pos } = l;
          return (
            <div key={i} className="od-anim" style={{ position: 'absolute', ...pos, opacity: o, animation: `odSway ${7 + i * 1.4}s ease-in-out ${d}s infinite` }}>
              <div style={{ transform: `rotate(${r}deg)` }}><ODF.Flower kind={HK} size={sz} /></div>
            </div>
          );
        })}
        {ODF && [0, 1, 2].map(i => (
          <div key={'f' + i} className="od-anim" style={{
            position: 'absolute', top: -24, left: `${18 + i * 30}%`,
            animation: `odFall ${16 + i * 3}s linear -${i * 5}s infinite`
          }}><ODF.FlowerBit kind={HK} size={13 + i * 3} /></div>
        ))}
      </div>
    );
  }
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', top: '46%', left: '50%', width: 420, height: 420, transform: 'translate(-50%,-50%)',
        background: 'radial-gradient(circle, rgba(217,184,101,0.14) 0%, transparent 66%)'
      }} />
      <div style={{ position: 'absolute', inset: 14, border: `1px solid ${T.line}` }} />
      <div style={{ position: 'absolute', inset: 20, border: `1px solid ${T.accent}`, opacity: 0.55 }} />
      {[['top', 'left'], ['top', 'right'], ['bottom', 'left'], ['bottom', 'right']].map(([v, h]) => (
        <svg key={v + h} width="14" height="14" viewBox="0 0 10 10" style={{ position: 'absolute', [v]: 13, [h]: 13 }}>
          <path d="M5 0 L10 5 L5 10 L0 5Z" fill={T.accent} />
        </svg>
      ))}
    </div>
  );
}

// ── 공통 블록 ──
function Sec({ children, alt, label }) {
  const kind = T.orn === 'petal' && ODF ? (ODF.SEC[label] || null) : null;
  return (
    <FlowerCtx.Provider value={kind}>
      <section data-screen-label={label} style={{
        background: alt ? T.bg2 : T.bg, padding: '76px 22px', position: 'relative',
        minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center'
      }}>
        {kind && <SecFlowers seed={label} />}
        <div style={{ position: 'relative' }}>{children}</div>
      </section>
    </FlowerCtx.Provider>
  );
}

function SecHead({ en, ko, badge }) {
  return (
    <Reveal>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{
          fontFamily: T.fLatin, fontWeight: 600, fontSize: T.latinItalic ? 18 : 14,
          fontStyle: T.latinItalic ? 'italic' : 'normal',
          letterSpacing: T.latinItalic ? 0.4 : 3.5, textTransform: T.latinItalic ? 'none' : 'uppercase',
          color: T.label
        }}>{en}</div>
        <div style={{
          marginTop: 7, display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: T.fDisplay, fontWeight: T.headWeight, fontSize: 27, letterSpacing: -0.5, color: T.text
        }}>
          {ko}
          {badge && (
            <span style={{
              fontFamily: T.fBody, fontSize: 11, fontWeight: 700, padding: '4px 7px', lineHeight: 1,
              whiteSpace: 'nowrap', flexShrink: 0,
              border: `1px solid ${T.label}`, color: T.label, borderRadius: T.cardRadius ? 999 : 0, letterSpacing: 0
            }}>{badge}</span>
          )}
        </div>
        <Orn w={110} color={T.text} />
      </div>
    </Reveal>
  );
}

function Card({ children, pad = 22 }) {
  return (
    <div style={{
      background: T.card, border: `1px solid ${T.cardLine}`, borderRadius: T.cardRadius,
      boxShadow: T.cardShadow, padding: T.orn === 'foil' ? pad + 6 : pad, position: 'relative'
    }}>{children}</div>
  );
}

function LogoSlot({ size = 60 }) {
  return (
    <div data-role="logo-slot" style={{
      width: size, height: size, margin: '0 auto', borderRadius: '50%',
      border: `1px dashed ${T.textSoft}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: T.fLatin, fontWeight: 600, fontSize: 11, letterSpacing: 2, color: T.textSoft
    }}>LOGO</div>
  );
}

// ═══ 01 · HERO ═══
function Hero() {
  const { m, d, dayKo, time } = O.date;
  return (
    <section data-screen-label="01 Hero" style={{
      minHeight: '100dvh', background: T.bg, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: '72px 30px 96px', textAlign: 'center'
    }}>
      <HeroDeco />
      <div style={{ position: 'relative' }}>
        <Reveal><LogoSlot /></Reveal>
        <Reveal delay={0.08}>
          <div style={{ marginTop: 12, fontFamily: T.fBody, fontSize: 14, fontWeight: 700, color: T.text, letterSpacing: 2 }}>
            {O.church}
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <div style={{
            marginTop: 26, fontFamily: T.fLatin, fontWeight: 600,
            fontSize: T.latinItalic ? 18 : 13, fontStyle: T.latinItalic ? 'italic' : 'normal',
            letterSpacing: T.latinItalic ? 0.4 : 3, textTransform: T.latinItalic ? 'none' : 'uppercase', color: T.label
          }}>{O.titleEn}</div>
        </Reveal>
        <Reveal delay={0.26}>
          <div style={{ marginTop: 12 }}>
            <div style={{
              fontFamily: T.fDisplay, fontWeight: T.heroWeight, fontSize: T.heroSize,
              lineHeight: 1.12, letterSpacing: -1.5, color: T.text, ...foilText
            }}>
              {T.orn === 'petal' ? <>권사 <span style={{ color: T.accent }}>임직</span></> : '권사 임직'}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginTop: 6 }}>
              <span style={{
                fontFamily: T.fDisplay, fontWeight: T.heroWeight, fontSize: Math.round(T.heroSize * 0.62),
                letterSpacing: -0.5, color: T.text, ...foilText
              }}>감사예배</span>
              {T.orn === 'brush' && <Seal />}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.4}><Orn w={150} color={T.text} /></Reveal>
        <Reveal delay={0.5}>
          <div style={{ fontFamily: T.fBody, fontSize: 16, fontWeight: 700, color: T.text, letterSpacing: 0.5 }}>
            {m}월 {d}일 {dayKo} · {time}
          </div>
          <div style={{ marginTop: 7, fontFamily: T.fBody, fontSize: 13.5, color: T.textSoft }}>
            {O.place.name}
          </div>
          {T.orn === 'petal' && <FlowerCaption kind={HK} style={{ marginTop: 22 }} />}
        </Reveal>
      </div>
      <div style={{
        position: 'absolute', bottom: 30, left: 0, right: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: 4, color: T.textSoft, animation: 'odBob 2.2s ease-in-out infinite'
      }}>
        <span style={{ fontFamily: T.fLatin, fontWeight: 600, fontSize: 11, letterSpacing: 3 }}>SCROLL</span>
        <svg width="12" height="8" viewBox="0 0 12 8"><path d="M1 1 L6 6 L11 1" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
      </div>
    </section>
  );
}

// ═══ 02 · 모시는 글 ═══
function Invite() {
  return (
    <Sec alt label="02 Invite">
      <SecHead en="Invitation" ko="모시는 글" />
      <Reveal delay={0.08}>
        <div style={{ textAlign: 'center', fontFamily: T.fBody, fontSize: 15.5, lineHeight: 2.05, color: T.text }}>
          {O.invite.map((l, i) => <div key={i} style={{ minHeight: l === '' ? 14 : 'auto' }}>{l}</div>)}
        </div>
        <div style={{
          marginTop: 26, textAlign: 'center', fontFamily: T.fDisplay, fontWeight: T.headWeight,
          fontSize: 18, color: T.text, letterSpacing: 1
        }}>{O.church}</div>
      </Reveal>
    </Sec>
  );
}

// ═══ 03 · 예배 일시 ═══
function Calendar() {
  const { y, m, d } = O.date;
  const first = new Date(y, m - 1, 1).getDay();
  const days = new Date(y, m, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  const wk = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,minmax(0,1fr))', textAlign: 'center' }}>
      {wk.map((w, i) => (
        <div key={w} style={{
          fontFamily: T.fBody, fontSize: 12, fontWeight: 700, paddingBottom: 9, marginBottom: 6,
          borderBottom: `1px solid ${T.cardLine}`, color: i === 0 ? T.cardAccent : T.cardSoft
        }}>{w}</div>
      ))}
      {cells.map((c, i) => {
        const on = c === d;
        return (
          <div key={i} style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {c && (
              <span style={{
                width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: T.fBody, fontSize: 14, fontWeight: on ? 800 : 400,
                background: on ? T.cardAccent : 'transparent',
                color: on ? '#FFFFFF' : i % 7 === 0 ? T.cardAccent : T.cardText
              }}>{c}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function DateSec() {
  const { y, m, d, dayKo, time } = O.date;
  const dd = dday();
  return (
    <Sec label="03 Date">
      <SecHead en="Date" ko="예배 일시" />
      <Reveal delay={0.08}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: T.fLatin, fontWeight: 600, fontSize: 13, letterSpacing: 2.5, color: T.cardAccent }}>
                {y} · {String(m).padStart(2, '0')}
              </div>
              <div style={{ marginTop: 4, fontFamily: T.fDisplay, fontWeight: T.headWeight, fontSize: 25, color: T.cardText, letterSpacing: -0.5 }}>
                {m}월 {d}일 {dayKo}
              </div>
              <div style={{ marginTop: 3, fontFamily: T.fBody, fontSize: 14, color: T.cardSoft }}>{time}</div>
            </div>
            {dd && (
              <div style={{
                padding: '7px 12px', border: `1px solid ${T.cardAccent}`, color: T.cardAccent,
                whiteSpace: 'nowrap', flexShrink: 0,
                borderRadius: T.cardRadius ? 999 : 0, fontFamily: T.fLatin, fontWeight: 600, fontSize: 15, letterSpacing: 1.5
              }}>{dd}</div>
            )}
          </div>
          <Calendar />
        </Card>
      </Reveal>
    </Sec>
  );
}

// ═══ 04 · 예배 순서 ═══
function OrderSec() {
  return (
    <Sec alt label="04 Order">
      <SecHead en="Order of Worship" ko="예배 순서" badge="임시" />
      <Reveal delay={0.08}>
        <Card pad={24}>
          {O.order.map((p, pi) => (
            <div key={pi} style={{ marginTop: pi ? 26 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, paddingBottom: 9, borderBottom: `1px solid ${T.cardLine}` }}>
                <span style={{ fontFamily: T.fBody, fontSize: 13, fontWeight: 800, color: T.cardAccent }}>{p.part}</span>
                <span style={{ fontFamily: T.fDisplay, fontWeight: T.headWeight, fontSize: 18, color: T.cardText }}>{p.title}</span>
              </div>
              {p.items.map(([a, b], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '10px 0 0' }}>
                  <span style={{ fontFamily: T.fBody, fontSize: 14.5, color: T.cardText }}>{a}</span>
                  <span style={{ flex: 1, borderBottom: `1px dotted ${T.cardLine}`, transform: 'translateY(-4px)' }} />
                  <span style={{ fontFamily: T.fBody, fontSize: 13, color: T.cardSoft }}>{b}</span>
                </div>
              ))}
            </div>
          ))}
        </Card>
      </Reveal>
    </Sec>
  );
}

// ═══ 05 · 임직받으시는 분 ═══
function RosterSec() {
  const names = [...O.ordainees].sort((a, b) => a.localeCompare(b, 'ko'));
  return (
    <Sec label="05 Ordainees">
      <SecHead en="Ordainees" ko="임직받으시는 분" />
      <Reveal delay={0.05}>
        <div style={{ textAlign: 'center', marginTop: 0, marginBottom: 26, fontFamily: T.fBody, fontSize: 14, color: T.textSoft }}>
          <span style={{ fontFamily: T.fDisplay, fontWeight: T.headWeight, fontSize: 22, color: T.text, ...foilText }}>{names.length}</span>
          명의 권사님을 세웁니다
        </div>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '16px 10px' }}>
        {names.map((n, i) => {
          const [base, suf] = splitName(n);
          return (
            <Reveal key={n} delay={(i % 4) * 0.05} y={10}>
              <div data-role="ordainee" data-name={n}>
                <div data-role="ordainee-photo" style={{
                  aspectRatio: T.photoAspect, borderRadius: T.photoRadius, background: T.photo,
                  border: T.orn === 'foil' ? `1px solid ${T.line}` : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden'
                }}>
                  <span style={{ fontFamily: T.fDisplay, fontWeight: T.headWeight, fontSize: 22, color: T.photoText }}>{base[0]}</span>
                </div>
                <div style={{ marginTop: 7, textAlign: 'center', fontFamily: T.fBody, fontSize: 13.5, fontWeight: 700, color: T.text }}>
                  {base}{suf && <span style={{ fontSize: 10, fontWeight: 400, marginLeft: 1, color: T.textSoft }}>{suf}</span>}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Sec>
  );
}

// ═══ 06 · 오시는 길 ═══
function WaySec() {
  const rows = [['주소', O.place.address], ['지하철', O.place.subway], ['주차', O.place.parking]];
  return (
    <Sec alt label="06 Location">
      <SecHead en="Location" ko="오시는 길" />
      <Reveal delay={0.06}>
        <div data-role="map-slot" style={{
          aspectRatio: '16 / 10', borderRadius: T.cardRadius, background: T.photo,
          border: `1px dashed ${T.textSoft}`, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 5, marginBottom: 14
        }}>
          <span style={{ fontFamily: T.fLatin, fontWeight: 600, fontSize: 12, letterSpacing: 3, color: T.photoText }}>MAP</span>
          <span style={{ fontFamily: T.fBody, fontSize: 13, color: T.photoText }}>지도 영역</span>
        </div>
      </Reveal>
      <Reveal delay={0.12}>
        <Card>
          <div style={{ fontFamily: T.fDisplay, fontWeight: T.headWeight, fontSize: 19, color: T.cardText, letterSpacing: -0.3 }}>
            {O.place.name}
          </div>
          <div style={{ marginTop: 14 }}>
            {rows.map(([k, v], i) => (
              <div key={k} style={{
                display: 'flex', gap: 14, padding: '11px 0',
                borderTop: `1px solid ${T.cardLine}`
              }}>
                <span style={{ width: 44, flexShrink: 0, fontFamily: T.fBody, fontSize: 13, fontWeight: 800, color: T.cardAccent }}>{k}</span>
                <span style={{ flex: 1, fontFamily: T.fBody, fontSize: 14, lineHeight: 1.55, color: T.cardText }}>{v}</span>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>
    </Sec>
  );
}

// ═══ 07 · 갤러리 ═══
function GallerySec() {
  return (
    <Sec label="07 Gallery">
      <SecHead en="Gallery" ko="갤러리" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 8 }}>
        {Array.from({ length: O.galleryCount }).map((_, i) => {
          const wide = i === 0 || i === 5;
          return (
            <div key={i} style={{ gridColumn: wide ? '1 / -1' : 'auto' }}>
              <Reveal delay={(i % 2) * 0.06} y={12}>
                <div data-role="gallery-photo" data-index={i} style={{
                  aspectRatio: wide ? '16 / 10' : '1 / 1', borderRadius: T.cardRadius ? 12 : 0,
                  background: T.photo, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <span style={{ fontFamily: T.fLatin, fontWeight: 600, fontSize: 18, letterSpacing: 2, color: T.photoText }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </Sec>
  );
}

// ═══ 08 · 안내 ═══
function NoticeSec() {
  return (
    <Sec alt label="08 Notice">
      <SecHead en="Notice" ko="안내" />
      <Reveal delay={0.08}>
        <Card pad={24}>
          {O.notice.map((p, i) => (
            <p key={i} style={{
              margin: i ? '12px 0 0' : 0, fontFamily: T.fBody, fontSize: 14.5, lineHeight: 1.85,
              color: T.cardText, textWrap: 'pretty', wordBreak: 'keep-all'
            }}>{p}</p>
          ))}
        </Card>
      </Reveal>
    </Sec>
  );
}

function Footer() {
  return (
    <footer style={{
      background: T.bg, padding: '56px 22px 44px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
    }}>
      {T.orn === 'petal' && ODF && (
        <div style={{ marginBottom: 30 }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}><ODF.Flower kind={FK} size={66} /></div>
          <FlowerCaption kind={FK} style={{ marginTop: 10 }} />
        </div>
      )}
      <LogoSlot size={44} />
      <div style={{ marginTop: 12, fontFamily: T.fDisplay, fontWeight: T.headWeight, fontSize: 17, color: T.text }}>{O.church}</div>
      <div style={{ marginTop: 8, fontFamily: T.fLatin, fontWeight: 600, fontSize: 11, letterSpacing: 2.5, color: T.textSoft }}>
        © {O.date.y} {O.churchEn}
      </div>
    </footer>
  );
}

function App() {
  return (
    <div style={{
      width: '100%', maxWidth: 460, margin: '0 auto', background: T.bg, minHeight: '100dvh',
      boxShadow: '0 0 60px rgba(0,0,0,0.12)', overflow: 'hidden'
    }}>
      <Hero />
      <Invite />
      <DateSec />
      <OrderSec />
      <RosterSec />
      <WaySec />
      <GallerySec />
      <NoticeSec />
      <Footer />
    </div>
  );
}

document.body.style.background = T.outer;
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
