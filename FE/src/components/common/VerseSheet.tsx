import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { BL, FF, LAYOUT, MOTION } from '../../theme/tokens';
import { O } from '../../data/ordination';
import type { FlowerKind } from '../../data/types';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { Flower } from './Flower';

type VerseSheetProps = {
  kind: FlowerKind;
  onClose: () => void;
};

/**
 * 「?」 → 말씀 해설 바텀시트. 닫기는 X · 바깥 탭 · Esc.
 *
 * body로 portal한다 — 섹션 안의 Reveal이 transform을 갖고 있으면 fixed가 화면이 아니라
 * 그 조상에 갇힌다. 위치는 앱 폭(460px)에 맞춰 가운데 정렬한다 (inset: 0이면 데스크톱에서
 * 앱 바깥 여백까지 덮는다). body는 원래 스크롤하지 않고 시트는 스크롤 컨테이너의 자손이
 * 아니므로, 시안의 body 스크롤 잠금은 필요 없다.
 */
export function VerseSheet({ kind, onClose }: VerseSheetProps) {
  const info = O.flowers.info[kind];
  const reduced = usePrefersReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    // 키보드 사용자가 바로 닫을 수 있도록 닫기 버튼에 초점을 둔다.
    closeRef.current?.focus({ preventScroll: true });
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${info.name} 말씀의 의미`}
      style={{
        position: 'fixed', top: 0, bottom: 0, left: '50%',
        width: '100%', maxWidth: LAYOUT.maxWidth, transform: 'translateX(-50%)',
        zIndex: 80, background: 'rgba(58,42,44,0.38)',
        backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        animation: reduced ? undefined : MOTION.sheetFade,
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{
        position: 'relative', width: '100%', maxHeight: '86dvh', overflowY: 'auto', overscrollBehavior: 'contain',
        background: BL.bg, borderRadius: '24px 24px 0 0', padding: '14px 26px 34px',
        boxShadow: '0 -12px 40px rgba(58,42,44,0.18)',
        animation: reduced ? undefined : MOTION.sheetIn,
        textAlign: 'center', wordBreak: 'keep-all', overflowWrap: 'anywhere',
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 4, background: BL.line, margin: '0 auto 6px' }} />
        <button ref={closeRef} onClick={onClose} aria-label="닫기" style={{
          position: 'absolute', top: 10, right: 12, width: 44, height: 44, border: 'none', background: 'transparent',
          cursor: 'pointer', color: BL.textSoft, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M2 2 L12 12 M12 2 L2 12" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}><Flower kind={kind} size={92} /></div>
        <div style={{ marginTop: 14, fontFamily: FF.display, fontWeight: 700, fontSize: 22, color: BL.text }}>{info.name}</div>
        <div style={{ marginTop: 4, fontFamily: FF.body, fontSize: 13, fontWeight: 700, color: BL.label }}>{info.ref}</div>
        <div style={{
          margin: '18px auto 0', maxWidth: 340, padding: '16px 18px', borderRadius: 14, background: BL.bg2,
          fontFamily: FF.display, fontSize: 15.5, lineHeight: 1.75, color: BL.text,
        }}>“{info.verse}”</div>
        <div style={{ height: 1, background: BL.line, margin: '22px 0 18px' }} />
        <div style={{
          textAlign: 'left', fontFamily: FF.body, fontSize: 14.5, lineHeight: 1.85, color: BL.text, textWrap: 'pretty',
        }}>{info.note}</div>
      </div>
    </div>,
    document.body,
  );
}
