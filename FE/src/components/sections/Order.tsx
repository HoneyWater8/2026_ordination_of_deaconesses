import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';
import { Section } from '../common/Section';
import { SectionHead } from '../common/SectionHead';
import { Reveal } from '../common/Reveal';
import { Card } from '../common/Card';

/** 항목과 맡은 이를 잇는 점선 리더 */
function Leader() {
  return <span aria-hidden="true" style={{ flex: 1, borderBottom: `1px dotted ${BL.cardLine}`, transform: 'translateY(-4px)' }} />;
}

/**
 * 04 예배 순서 — 1·2·3부, 항목 ─ 맡은 이 (점선 리더).
 * 순서가 확정되기 전에는 예배 이름과 시간 한 줄만 보인다 (시간은 03 예배 일시와 같은 값).
 */
export function Order() {
  return (
    <Section alt label="04 Order">
      <SectionHead en="Order of Worship" ko="예배 순서" />
      <Reveal delay={0.08}>
        <Card pad={24}>
          {O.order.length === 0 ? (
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: FF.display, fontWeight: 700, fontSize: 18, color: BL.text }}>{O.serviceName}</span>
              <Leader />
              <span style={{ fontFamily: FF.body, fontSize: 15, fontWeight: 700, color: BL.text }}>{O.date.time}</span>
            </div>
          ) : O.order.map((p, pi) => (
            <div key={pi} style={{ marginTop: pi ? 26 : 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 9, paddingBottom: 9, borderBottom: `1px solid ${BL.cardLine}` }}>
                <span style={{ fontFamily: FF.body, fontSize: 13, fontWeight: 800, color: BL.label }}>{p.part}</span>
                <span style={{ fontFamily: FF.display, fontWeight: 700, fontSize: 18, color: BL.text }}>{p.title}</span>
              </div>
              {p.items.map(([item, who], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '10px 0 0' }}>
                  <span style={{ fontFamily: FF.body, fontSize: 14.5, color: BL.text }}>{item}</span>
                  <Leader />
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
