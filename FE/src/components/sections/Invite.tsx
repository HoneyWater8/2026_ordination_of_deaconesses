import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';
import { Section } from '../common/Section';
import { SectionHead } from '../common/SectionHead';
import { Reveal } from '../common/Reveal';

/** 02 모시는 글 — 담당자가 보낸 초대글 원문 + 교회 서명. 빈 줄은 문단 간격. */
export function Invite() {
  return (
    <Section alt label="02 Invite">
      <SectionHead en="Invitation" ko="모시는 글" />
      <Reveal delay={0.08}>
        <div style={{
          textAlign: 'center', fontFamily: FF.body, fontSize: 15.5, lineHeight: 2.05, color: BL.text,
          wordBreak: 'keep-all',
        }}>
          {O.invite.map((line, i) => <div key={i} style={{ minHeight: line === '' ? 14 : 'auto' }}>{line}</div>)}
        </div>
        <div style={{
          marginTop: 26, textAlign: 'center', fontFamily: FF.display, fontWeight: 700,
          fontSize: 18, color: BL.text, letterSpacing: 1,
        }}>{O.church}</div>
      </Reveal>
    </Section>
  );
}
