/* ─────────────────────────────────────────────────────────
   마지막 화면 · 종려나무(시편 92:12) · 로고 · 저작권과 제작자 표기
   ───────────────────────────────────────────────────────── */

import { useRef } from 'react';
import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';
import { useSectionView } from '../../hooks/useSectionView';
import { Flower } from '../common/Flower';
import { FlowerCaption } from '../common/FlowerCaption';
import { Logo } from '../common/Logo';

const FOOTER_FLOWER = O.flowers.bySection['09 Footer'] ?? 'palm';

/**
 * 09 마지막 화면 — 마지막 꽃 + 로고 + 교회명을 가운데에, 저작권·제작자 문구를 맨 아래에.
 *
 * 저작권·제작자 문구를 하단에 두는 것은 졸업 레포에서 사용자가 요청한 배치를 따른 것이다.
 * 양옆에 공유 버튼 공간을 남겨 좁은 화면에서는 문구만 줄바꿈된다.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  useSectionView(ref, '09 Footer');

  return (
    <footer ref={ref} data-screen-label="09 Footer" style={{
      background: BL.bg, padding: '56px 22px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ flex: 1 }} />

      <div style={{ marginBottom: 30 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}><Flower kind={FOOTER_FLOWER} size={66} /></div>
        <FlowerCaption kind={FOOTER_FLOWER} style={{ marginTop: 10 }} />
      </div>
      <Logo size={44} />
      <div style={{ marginTop: 12, fontFamily: FF.display, fontWeight: 700, fontSize: 17, color: BL.text }}>{O.church}</div>

      <div style={{ flex: 1 }} />

      <div data-closing-footer style={{
        marginTop: 40, width: 'calc(100% - 112px)', flexShrink: 0,
        color: BL.textSoft, wordBreak: 'keep-all', textWrap: 'balance',
      }}>
        <div style={{ fontFamily: FF.latin, fontWeight: 600, fontSize: 11, letterSpacing: 2.5, lineHeight: 1.6 }}>
          © {O.date.y} {O.churchEn}
        </div>
        <div style={{ marginTop: 6, fontFamily: FF.latin, fontWeight: 600, fontSize: 9, letterSpacing: 1, lineHeight: 1.6 }}>
          {O.credit}
        </div>
      </div>
    </footer>
  );
}
