import { createContext, useContext } from 'react';
import type { FlowerKind } from '../data/types';

/**
 * 지금 그려지는 섹션의 꽃.
 * Section이 공급하고, 그 안의 구분선(FlowerOrn)·배경(SectionFlowers)이 같은 꽃을 쓴다.
 */
export const SectionFlowerContext = createContext<FlowerKind | null>(null);

export function useSectionFlower() {
  return useContext(SectionFlowerContext);
}
