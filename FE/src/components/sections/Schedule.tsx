import { useState } from 'react';
import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';
import { Section } from '../common/Section';
import { SectionHead } from '../common/SectionHead';
import { Reveal } from '../common/Reveal';
import { Card } from '../common/Card';
import { Calendar } from '../common/Calendar';

/** 한국 시간(UTC+9) — 날짜를 기기 시간대가 아니라 예배 장소 기준으로 센다 */
const KST_OFFSET_MS = 9 * 3600000;

/**
 * 오늘 기준 남은 날. 예배일이 지나면 배지를 감춘다.
 * 기기 시간대로 세면 해외 기기에서 하루 어긋난다(LA에서는 예배 중에 D-1) — 한국 날짜로 센다.
 */
function dday(): string | null {
  const { y, m, d } = O.date;
  // 지금 시각에 9시간을 더해 UTC 필드로 읽으면 한국 날짜가 된다
  const kst = new Date(Date.now() + KST_OFFSET_MS);
  const today = Date.UTC(kst.getUTCFullYear(), kst.getUTCMonth(), kst.getUTCDate());
  const left = Math.round((Date.UTC(y, m - 1, d) - today) / 86400000);
  return left > 0 ? `D-${left}` : left === 0 ? 'D-DAY' : null;
}

/** 03 예배 일시 — 날짜·시간 + D-day 배지 + 한 달 달력. */
export function Schedule() {
  const { y, m, d, dayKo, time } = O.date;
  // 오늘 날짜는 렌더마다 달라질 수 있는 값이라 마운트 시 1회만 계산한다.
  const [left] = useState(dday);

  return (
    <Section label="03 Date">
      <SectionHead en="Date" ko="예배 일시" />
      <Reveal delay={0.08}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginBottom: 20 }}>
            <div>
              <div style={{ fontFamily: FF.latin, fontWeight: 600, fontSize: 13, letterSpacing: 2.5, color: BL.label }}>
                {y} · {String(m).padStart(2, '0')}
              </div>
              <div style={{
                marginTop: 4, fontFamily: FF.display, fontWeight: 700, fontSize: 25, color: BL.text, letterSpacing: -0.5,
              }}>{m}월 {d}일 {dayKo}</div>
              <div style={{ marginTop: 3, fontFamily: FF.body, fontSize: 14, color: BL.textSoft }}>{time}</div>
            </div>
            {left && (
              // 줄바꿈되면 「D-」와 숫자가 갈라진다
              <div style={{
                padding: '7px 12px', border: `1px solid ${BL.label}`, color: BL.label,
                whiteSpace: 'nowrap', flexShrink: 0, borderRadius: 999,
                fontFamily: FF.latin, fontWeight: 600, fontSize: 15, letterSpacing: 1.5,
              }}>{left}</div>
            )}
          </div>
          <Calendar y={y} m={m} d={d} />
        </Card>
      </Reveal>
    </Section>
  );
}
