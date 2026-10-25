import type { CSSProperties } from 'react';
import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';
import type { FlowerKind } from '../../data/types';

type FlowerCaptionProps = {
  kind: FlowerKind;
  style?: CSSProperties;
};

/**
 * 꽃 캡션 — 꽃 이름 한 줄.
 *
 * 처음에는 `꽃 이름 | 장절 | ?` + 구절이었고 「?」로 해설 시트를 열었다. 2026-10-25 담당 전도사
 * 피드백으로 말씀(장절·구절·해설)을 빼고, 사용자 요청으로 이름만 남겼다.
 */
export function FlowerCaption({ kind, style }: FlowerCaptionProps) {
  return (
    <div style={{
      fontFamily: FF.body, fontSize: 12.5, fontWeight: 700, color: BL.label, letterSpacing: 0.2,
      wordBreak: 'keep-all', ...style,
    }}>
      {O.flowers.info[kind].name}
    </div>
  );
}
