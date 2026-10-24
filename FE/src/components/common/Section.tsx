import { useRef } from 'react';
import type { ReactNode } from 'react';
import { BL } from '../../theme/tokens';
import { O } from '../../data/ordination';
import type { SectionLabel } from '../../data/types';
import { SectionFlowerContext } from '../../hooks/useSectionFlower';
import { useSectionView } from '../../hooks/useSectionView';
import { SectionFlowers } from './SectionFlowers';

type SectionProps = {
  children: ReactNode;
  /** 섹션 식별 라벨 (예: "02 Invite") — GA 집계와 섹션 꽃 매핑의 키 */
  label: SectionLabel;
  /** true면 교차 배경(bg2) */
  alt?: boolean;
};

/**
 * 본문 섹션 래퍼 (02 ~ 08).
 * min-height: 100% 로 한 화면씩 끊기는 리듬을 만들고, 내용은 세로 가운데에 놓는다.
 * 섹션의 꽃을 하위의 구분선·캡션에 공급하고, 배경에 같은 꽃을 깐다.
 */
export function Section({ children, label, alt = false }: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const kind = O.flowers.bySection[label] ?? null;
  useSectionView(ref, label);

  return (
    <SectionFlowerContext.Provider value={kind}>
      <section
        ref={ref}
        data-screen-label={label}
        style={{
          background: alt ? BL.bg2 : BL.bg, padding: '76px 22px', position: 'relative',
          minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        }}
      >
        {kind && <SectionFlowers kind={kind} seed={label} />}
        <div style={{ position: 'relative' }}>{children}</div>
      </section>
    </SectionFlowerContext.Provider>
  );
}
