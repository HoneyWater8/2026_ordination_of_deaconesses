import { useEffect, useRef, useState } from 'react';
import { BL } from '../../theme/tokens';

type CopyButtonProps = {
  /** 클립보드에 복사할 텍스트 */
  text: string;
  /** 복사에 성공했을 때 (집계용) */
  onCopied?: () => void;
  /** 피드백 유지 시간 ms (기본 1500) */
  duration?: number;
  /** 아이콘 크기 (기본 12) */
  iconSize?: number;
};

/**
 * 모던 브라우저는 navigator.clipboard, 그 외 환경(비-https 등)은
 * document.execCommand fallback. 둘 다 실패하면 false 반환.
 */
async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      /* fall through to legacy */
    }
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

/**
 * 인라인 텍스트 옆에 두는 복사 버튼 — 2026 하나로 가족 한마당과 같은 동작.
 * 복사 → 체크 아이콘으로 잠시 바뀐다. 아이콘은 lucide-react 대신 같은 모양의 인라인 SVG.
 */
export function CopyButton({ text, onCopied, duration = 1500, iconSize = 12 }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const handleClick = async () => {
    const ok = await copyToClipboard(text);
    if (!ok) return;
    onCopied?.();
    setCopied(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), duration);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={copied ? '복사됨' : `복사: ${text}`}
      title={copied ? '복사됨' : '복사'}
      style={{
        marginLeft: 6,
        appearance: 'none',
        WebkitAppearance: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 22,
        height: 22,
        padding: 0,
        background: copied ? `${BL.label}14` : 'transparent',
        border: `1px solid ${copied ? BL.label : BL.cardLine}`,
        borderRadius: 6,
        cursor: 'pointer',
        color: copied ? BL.label : BL.textSoft,
        verticalAlign: 'middle',
        transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
      }}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={copied ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {copied
          ? <path d="M20 6 9 17l-5-5" />
          : <>
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </>}
      </svg>
    </button>
  );
}
