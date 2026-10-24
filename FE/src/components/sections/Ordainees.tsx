import { useState } from 'react';
import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';
import { Section } from '../common/Section';
import { SectionHead } from '../common/SectionHead';
import { Reveal } from '../common/Reveal';

type Ordainee = { name: string; base: string; suffix: string; photo?: string };

/** "김영남B" → ["김영남", "B"] — 동명이인 구분자는 작게 표시한다. */
function splitName(name: string): [string, string] {
  const m = name.match(/^(.+?)([A-Z])$/);
  return m ? [m[1], m[2]] : [name, ''];
}

// 데이터는 담당자 원문 순서이고 사진 번호도 그 순서를 따른다. 화면에는 가나다순으로 놓는다.
const ORDAINEES: Ordainee[] = O.ordainees
  .map((name, i) => {
    const [base, suffix] = splitName(name);
    const photo = O.ordaineePhotos ? `/ordainees/${String(i + 1).padStart(2, '0')}.webp` : undefined;
    return { name, base, suffix, photo };
  })
  .sort((a, b) => a.name.localeCompare(b.name, 'ko'));

/** 원형 사진 — 파일이 없거나 실패하면 성(첫 글자)으로 대신한다. 이번에는 탭해도 확대하지 않는다. */
function Portrait({ person }: { person: Ordainee }) {
  const [failed, setFailed] = useState(false);
  return (
    <div style={{
      aspectRatio: '1 / 1', borderRadius: '50%', background: BL.photo,
      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    }}>
      {person.photo && !failed ? (
        <img
          src={person.photo}
          alt={`${person.base} 권사`}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        // 22px 굵은 글씨라 photo 배경 위 label(3.99:1)이 큰 글씨 기준을 만족한다
        <span aria-hidden="true" style={{ fontFamily: FF.display, fontWeight: 700, fontSize: 22, color: BL.label }}>
          {person.base[0]}
        </span>
      )}
    </div>
  );
}

/** 05 임직받으시는 분 — 인원 + 4열 원형 사진 그리드(가나다순). */
export function Ordainees() {
  return (
    <Section alt label="05 Ordainees">
      <SectionHead en="Ordainees" ko="임직받으시는 분" />
      <Reveal delay={0.05}>
        <div style={{ textAlign: 'center', marginBottom: 26, fontFamily: FF.body, fontSize: 14, color: BL.textSoft }}>
          <span style={{ fontFamily: FF.display, fontWeight: 700, fontSize: 22, color: BL.text }}>{ORDAINEES.length}</span>
          명의 권사님을 세웁니다
        </div>
      </Reveal>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: '16px 10px' }}>
        {ORDAINEES.map((person, i) => (
          <Reveal key={person.name} delay={(i % 4) * 0.05} y={10}>
            <div data-role="ordainee" data-name={person.name}>
              <Portrait person={person} />
              <div style={{
                marginTop: 7, textAlign: 'center', fontFamily: FF.body, fontSize: 13.5, fontWeight: 700, color: BL.text,
              }}>
                {person.base}
                {person.suffix && (
                  <span style={{ fontSize: 10, fontWeight: 400, marginLeft: 1, color: BL.textSoft }}>{person.suffix}</span>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
