import { BL, FF } from '../../theme/tokens';

/** 교회 관례 — 일요일은 「주일」의 「주」로 표기한다 (졸업 레포 2026-09-11 「일」→「주」 수정과 같은 규칙). */
const WEEKDAYS = ['주', '월', '화', '수', '목', '금', '토'] as const;

type CalendarProps = {
  y: number;
  /** 1 ~ 12 */
  m: number;
  /** 강조할 날 */
  d: number;
};

/**
 * 한 달 달력 — 예배일만 원으로 채운다. 이동·선택 없는 표시용.
 * 날짜는 카드 위쪽에 글로 적혀 있으므로 보조 기술에는 숨긴다.
 */
export function Calendar({ y, m, d }: CalendarProps) {
  const first = new Date(y, m - 1, 1).getDay();
  const days = new Date(y, m, 0).getDate();
  const cells: (number | null)[] = [...Array<null>(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];

  return (
    <div aria-hidden="true" style={{ display: 'grid', gridTemplateColumns: 'repeat(7,minmax(0,1fr))', textAlign: 'center' }}>
      {WEEKDAYS.map((w, i) => (
        <div key={w} style={{
          fontFamily: FF.body, fontSize: 12, fontWeight: 700, paddingBottom: 9, marginBottom: 6,
          borderBottom: `1px solid ${BL.cardLine}`, color: i === 0 ? BL.label : BL.textSoft,
        }}>{w}</div>
      ))}
      {cells.map((c, i) => {
        const on = c === d;
        return (
          <div key={i} style={{ height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {c && (
              <span style={{
                width: 34, height: 34, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FF.body, fontSize: 14, fontWeight: on ? 800 : 400,
                background: on ? BL.label : 'transparent',
                color: on ? BL.onAccent : i % 7 === 0 ? BL.label : BL.text,
              }}>{c}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
