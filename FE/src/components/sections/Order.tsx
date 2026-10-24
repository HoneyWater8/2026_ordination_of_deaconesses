import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';
import { Section } from '../common/Section';
import { SectionHead } from '../common/SectionHead';
import { Reveal } from '../common/Reveal';
import { Card } from '../common/Card';

/** 04 예배 순서 — 1·2·3부, 항목 ─ 맡은 이 (점선 리더). 확정 전에는 「임시」 배지. */
export function Order() {
  return (
    <Section alt label="04 Order">
      <SectionHead en="Order of Worship" ko="예배 순서" badge={O.orderTentative ? '임시' : undefined} />
      <Reveal delay={0.08}>
        <Card pad={24}>
          {O.order.map((p, pi) => (
            <div key={pi} style={{ marginTop: pi ? 26 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, paddingBottom: 9, borderBottom: `1px solid ${BL.cardLine}` }}>
                <span style={{ fontFamily: FF.body, fontSize: 13, fontWeight: 800, color: BL.label }}>{p.part}</span>
                <span style={{ fontFamily: FF.display, fontWeight: 700, fontSize: 18, color: BL.text }}>{p.title}</span>
              </div>
              {p.items.map(([item, who], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '10px 0 0' }}>
                  <span style={{ fontFamily: FF.body, fontSize: 14.5, color: BL.text }}>{item}</span>
                  <span aria-hidden="true" style={{ flex: 1, borderBottom: `1px dotted ${BL.cardLine}`, transform: 'translateY(-4px)' }} />
                  <span style={{ fontFamily: FF.body, fontSize: 13, color: BL.textSoft }}>{who}</span>
                </div>
              ))}
            </div>
          ))}
        </Card>
      </Reveal>
    </Section>
  );
}
