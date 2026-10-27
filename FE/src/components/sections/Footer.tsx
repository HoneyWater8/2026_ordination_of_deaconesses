/* ─────────────────────────────────────────────────────────
   마지막 화면 · 살구꽃 · 민수기 17:8 · 로고 · 저작권과 제작자 표기
   ───────────────────────────────────────────────────────── */

import { useRef } from 'react';
import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';
import { useSectionView } from '../../hooks/useSectionView';
import { Flower } from '../common/Flower';
import { Logo } from '../common/Logo';

const FOOTER_FLOWER = O.flowers.bySection['09 Footer'] ?? 'almond';

/**
 * 09 마지막 화면 — 마지막 꽃 + 말씀 + 로고 + 교회명을 가운데에, 저작권·제작자 문구를 맨 아래에.
 *
 * 말씀은 졸업 레포의 「맺는 말씀」과 같은 조판이다. 겹낫표는 각 줄을 inline-block으로 감싸고
 * 첫 줄 앞·끝 줄 뒤에 absolute로 붙인다 — 가운데 정렬을 흐트러뜨리지 않고 글자에 딱 붙는다.
 * 저작권·제작자 문구를 하단에 두는 것은 졸업 레포에서 사용자가 요청한 배치를 따른 것이다.
 * 양옆에 공유 버튼 공간을 남겨 좁은 화면에서는 문구만 줄바꿈된다.
 */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  useSectionView(ref, '09 Footer');
  const lines = O.closing.lines;

  return (
    // 배경은 바로 앞 섹션(08 안내, bg)과 엇갈리게 bg2. 예배 순서 섹션을 뺀 뒤(2026-10-24) 본문
    // 섹션이 짝수가 되어, bg로 두면 안내와 같은 색이 이어져 경계 없는 긴 빈칸처럼 보였다.
    <footer ref={ref} data-screen-label="09 Footer" style={{
      background: BL.bg2, padding: '56px 22px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      <div style={{ flex: 1 }} />

      <div style={{ marginBottom: 30, display: 'flex', justifyContent: 'center' }}>
        <Flower kind={FOOTER_FLOWER} size={66} />
      </div>
      <div style={{
        marginBottom: 34, fontFamily: FF.display, fontSize: 14.5, lineHeight: 2, color: BL.text, wordBreak: 'keep-all',
      }}>
        {lines.map((line, i) => (
          <div key={i}>
            <span style={{ position: 'relative', display: 'inline-block' }}>
              {i === 0 && (
                <span style={{ position: 'absolute', right: '100%', marginRight: 5, top: 0, color: BL.label, whiteSpace: 'nowrap' }}>『</span>
              )}
              {line}
              {i === lines.length - 1 && (
                <span style={{ position: 'absolute', left: '100%', marginLeft: 5, top: 0, color: BL.label, whiteSpace: 'nowrap' }}>』</span>
              )}
            </span>
          </div>
        ))}
        <div style={{ marginTop: 14, fontSize: 12.5, fontWeight: 700, color: BL.label, letterSpacing: 0.5, lineHeight: 1.6 }}>
          {O.closing.sign}
        </div>
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
