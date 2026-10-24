import { useCallback, useState } from 'react';
import type { CSSProperties } from 'react';
import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';
import type { FlowerKind } from '../../data/types';
import { track } from '../../utils/analytics';
import { VerseSheet } from './VerseSheet';

type FlowerCaptionProps = {
  kind: FlowerKind;
  style?: CSSProperties;
};

const Sep = () => <span aria-hidden="true" style={{ margin: '0 7px', opacity: 0.45 }}>|</span>;

/** 꽃 캡션 — `꽃 이름 | 장절 | ?` + 아래 구절 한 줄. 「?」를 누르면 말씀 해설 시트. */
export function FlowerCaption({ kind, style }: FlowerCaptionProps) {
  const [open, setOpen] = useState(false);
  const info = O.flowers.info[kind];
  const close = useCallback(() => setOpen(false), []);

  return (
    <div style={{
      fontFamily: FF.body, fontSize: 12.5, color: BL.textSoft, letterSpacing: 0.2,
      wordBreak: 'keep-all', overflowWrap: 'anywhere', ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontWeight: 700, color: BL.label }}>{info.name}</span>
        <Sep />
        <span>{info.ref}</span>
        <Sep />
        {/* 보이는 원은 20px이지만 누르는 영역은 44px — 음수 margin으로 줄 높이는 그대로 둔다 */}
        <button
          onClick={() => { track('verse_open', { flower: kind }); setOpen(true); }}
          aria-label={`${info.name} 말씀의 의미 보기`}
          style={{
            width: 44, height: 44, margin: '-12px -11px', padding: 0, border: 'none', background: 'transparent',
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{
            width: 20, height: 20, borderRadius: '50%', border: `1px solid ${BL.label}`, color: BL.label,
            background: BL.card, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: FF.body, fontSize: 12, fontWeight: 800, lineHeight: 1,
          }}>?</span>
        </button>
      </div>
      <div style={{
        margin: '6px auto 0', maxWidth: 300, fontFamily: FF.display, fontSize: 13.5,
        lineHeight: 1.6, color: BL.textSoft, textWrap: 'pretty',
      }}>“{info.verse}”</div>
      {open && <VerseSheet kind={kind} onClose={close} />}
    </div>
  );
}
