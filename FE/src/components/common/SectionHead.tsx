import { BL, FF } from '../../theme/tokens';
import { useSectionFlower } from '../../hooks/useSectionFlower';
import { Reveal } from './Reveal';
import { FlowerOrn } from './FlowerOrn';

type SectionHeadProps = {
  ko: string;
  /** 라틴 전용 — Garamond로 조판되므로 한글을 섞지 말 것 */
  en: string;
};

/** 섹션 헤더 — 영문 라벨(이탤릭) + 한글 제목 + 섹션 꽃 구분선 + 꽃 이름. */
export function SectionHead({ ko, en }: SectionHeadProps) {
  const kind = useSectionFlower();
  return (
    <Reveal>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{
          fontFamily: FF.latin, fontWeight: 600, fontStyle: 'italic', fontSize: 18,
          letterSpacing: 0.4, color: BL.label,
        }}>{en}</div>
        {/* 제목 태그(h2) — 화면 낭독기가 섹션 단위로 건너뛸 수 있게. 첫 화면 제목이 h1. 기본 여백은 지운다 */}
        <h2 style={{
          margin: '7px 0 0', display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: FF.display, fontWeight: 700, fontSize: 27, letterSpacing: -0.5, color: BL.text,
        }}>
          {ko}
        </h2>
        {kind && <FlowerOrn kind={kind} w={110} caption />}
      </div>
    </Reveal>
  );
}
