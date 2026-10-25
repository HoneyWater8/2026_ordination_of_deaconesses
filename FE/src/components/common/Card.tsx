import type { ReactNode } from 'react';
import { BL } from '../../theme/tokens';

type CardProps = {
  children: ReactNode;
  /** 내용 패딩 (px) */
  pad?: number;
};

/** 흰 카드 — 둥근 모서리 18px + 옅은 장밋빛 그림자. 일시·오시는 길·안내가 쓴다. */
export function Card({ children, pad = 22 }: CardProps) {
  return (
    <div style={{
      background: BL.card, border: `1px solid ${BL.cardLine}`, borderRadius: BL.cardRadius,
      boxShadow: BL.cardShadow, padding: pad, position: 'relative',
    }}>{children}</div>
  );
}
