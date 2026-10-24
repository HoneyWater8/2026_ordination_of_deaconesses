import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
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

// 공유 시트(ShareFAB)와 같은 값 — 두 바텀시트가 같은 손맛으로 닫히게.
const SHEET_TRANSITION_MS = 320;
const CLOSE_DRAG_THRESHOLD = 80;

/**
 * 「?」 → 말씀 해설 바텀시트. 닫기는 X · 바깥 탭 · Esc · 위쪽을 아래로 끌기.
 *
 * body로 portal한다 — 섹션 안의 Reveal이 transform을 갖고 있으면 fixed가 화면이 아니라
 * 그 조상에 갇힌다. 위치는 앱 폭(460px)에 맞춰 가운데 정렬한다 (inset: 0이면 데스크톱에서
 * 앱 바깥 여백까지 덮는다). body는 원래 스크롤하지 않고 시트는 스크롤 컨테이너의 자손이
 * 아니므로, 시안의 body 스크롤 잠금은 필요 없다.
 *
 * 끌기는 손잡이부터 꽃·이름·장절까지의 머리 부분에서만 받는다. 공유 시트처럼 손잡이 띠만
 * 받기엔 이 시트가 길어 잡을 곳이 작고, 시트 전체로 받으면 긴 해설을 스크롤할 수 없다.
 */
export function VerseSheet({ kind, onClose }: VerseSheetProps) {
  const info = O.flowers.info[kind];
  const reduced = usePrefersReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const dragStartYRef = useRef<number | null>(null);
  const leaveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    // 키보드 사용자가 바로 닫을 수 있도록 닫기 버튼에 초점을 둔다.
    closeRef.current?.focus({ preventScroll: true });
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => () => {
    if (leaveTimerRef.current !== null) window.clearTimeout(leaveTimerRef.current);
  }, []);

  // 끌어서 닫을 때만 아래로 마저 내려보낸 뒤 닫는다 — 끌던 자리에서 툭 사라지지 않게.
  const leave = useCallback(() => {
    if (reduced) { onClose(); return; }
    setLeaving(true);
    leaveTimerRef.current = window.setTimeout(onClose, SHEET_TRANSITION_MS);
  }, [reduced, onClose]);

  const onHandleDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    dragStartYRef.current = e.clientY;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onHandleMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartYRef.current === null) return;
    setDragY(Math.max(0, e.clientY - dragStartYRef.current));
  }, []);

  const onHandleUp = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartYRef.current === null) return;
    const finalY = e.clientY - dragStartYRef.current;
    dragStartYRef.current = null;
    setDragging(false);
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch { /* ignore */ }
    if (finalY > CLOSE_DRAG_THRESHOLD) leave();
    else setDragY(0);
  }, [leave]);

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
        opacity: leaving ? 0 : 1,
        transition: reduced ? 'none' : `opacity ${SHEET_TRANSITION_MS}ms ease`,
      }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{
        position: 'relative', width: '100%', maxHeight: '86dvh', overflowY: 'auto', overscrollBehavior: 'contain',
        background: BL.bg, borderRadius: '24px 24px 0 0', padding: '14px 26px 34px',
        boxShadow: '0 -12px 40px rgba(58,42,44,0.18)',
        // 진입은 키프레임, 끌기·닫기는 transform transition. 진입 키프레임이 끝나면
        // (fill-mode 없음) 아래 transform이 적용된다.
        animation: reduced ? undefined : MOTION.sheetIn,
        transform: leaving ? 'translateY(100%)' : `translateY(${dragY}px)`,
        transition: dragging || reduced
          ? 'none'
          : `transform ${SHEET_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        textAlign: 'center', wordBreak: 'keep-all', overflowWrap: 'anywhere',
      }}>
        {/* 머리 부분 — 아래로 끌면 닫힘. 닫기 버튼은 이 밖(절대 위치)이라 눌림이 가로채이지 않는다 */}
        <div
          onPointerDown={onHandleDown}
          onPointerMove={onHandleMove}
          onPointerUp={onHandleUp}
          onPointerCancel={onHandleUp}
          style={{
            cursor: dragging ? 'grabbing' : 'grab',
            touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none',
          }}
        >
          <div style={{ width: 40, height: 4, borderRadius: 4, background: BL.line, margin: '0 auto 6px' }} />
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}><Flower kind={kind} size={92} /></div>
          <div style={{ marginTop: 14, fontFamily: FF.display, fontWeight: 700, fontSize: 22, color: BL.text }}>{info.name}</div>
          <div style={{ marginTop: 4, fontFamily: FF.body, fontSize: 13, fontWeight: 700, color: BL.label }}>{info.ref}</div>
        </div>
        <button ref={closeRef} onClick={onClose} aria-label="닫기" style={{
          position: 'absolute', top: 10, right: 12, width: 44, height: 44, border: 'none', background: 'transparent',
          cursor: 'pointer', color: BL.textSoft, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path d="M2 2 L12 12 M12 2 L2 12" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>

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
