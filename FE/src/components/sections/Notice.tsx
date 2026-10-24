import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';
import { Section } from '../common/Section';
import { SectionHead } from '../common/SectionHead';
import { Reveal } from '../common/Reveal';
import { Card } from '../common/Card';

/** 08 안내 — 좌석 안내문 카드. */
export function Notice() {
  return (
    <Section alt label="08 Notice">
      <SectionHead en="Notice" ko="안내" />
      <Reveal delay={0.08}>
        <Card pad={24}>
          {O.notice.map((p, i) => (
            <p key={i} style={{
              margin: i ? '12px 0 0' : 0, fontFamily: FF.body, fontSize: 14.5, lineHeight: 1.85,
              color: BL.text, textWrap: 'pretty', wordBreak: 'keep-all',
            }}>{p}</p>
          ))}
        </Card>
      </Reveal>
    </Section>
  );
}
