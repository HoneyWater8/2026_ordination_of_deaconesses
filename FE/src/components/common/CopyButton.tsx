import { useEffect, useRef, useState } from 'react';
import { BL } from '../../theme/tokens';
import { copyText } from '../../utils/share';

/** 복사됨 표시를 유지하는 시간(ms) */
const FEEDBACK_MS = 1500;

type CopyButtonProps = {
  /** 클립보드에 복사할 텍스트 */
  text: string;
  /** 복사에 성공했을 때 (집계용) */
  onCopied?: () => void;
};

/**
 * 인라인 텍스트 옆에 두는 복사 버튼 — 2026 하나로 가족 한마당과 같은 동작.
 * 복사 → 체크 아이콘으로 잠시 바뀐다. 아이콘은 lucide-react 대신 같은 모양의 인라인 SVG.
 *
 * 보이는 네모는 22px이지만 누르는 영역은 44px — 음수 margin으로 줄 높이와 옆 글자 간격은 그대로 둔다.
 */
export function CopyButton({ text, onCopied }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  const handleClick = async () => {
    const ok = await copyText(text);
    if (!ok) return;
    onCopied?.();
    setCopied(true);
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), FEEDBACK_MS);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={copied ? '복사됨' : `복사: ${text}`}
      title={copied ? '복사됨' : '복사'}
      style={{
        // 22px 네모 둘레로 11px씩 넓힌 만큼 음수 margin으로 되돌린다. 왼쪽만 예전 간격 6px을 남긴다(-11 + 6)
        margin: '-11px -11px -11px -5px',
        appearance: 'none',
        WebkitAppearance: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 44,
        height: 44,
        padding: 0,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: copied ? BL.label : BL.textSoft,
        verticalAlign: 'middle',
      }}
    >
      <span style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 22, height: 22, borderRadius: 6,
        background: copied ? `${BL.label}14` : 'transparent',
        border: `1px solid ${copied ? BL.label : BL.cardLine}`,
        transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
      }}>
        <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor"
          strokeWidth={copied ? 2.5 : 2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {copied
            ? <path d="M20 6 9 17l-5-5" />
            : <>
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </>}
        </svg>
      </span>
    </button>
  );
}
