import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';
import { kakaoMapUrl, naverMapUrl, tmapUrl, isWebUrl } from '../../utils/mapLinks';
import type { LocationInfo } from '../../utils/mapLinks';
import { track } from '../../utils/analytics';
import { Section } from '../common/Section';
import { SectionHead } from '../common/SectionHead';
import { Reveal } from '../common/Reveal';
import { Card } from '../common/Card';
import { KakaoMap } from '../common/KakaoMap';
import { CopyButton } from '../common/CopyButton';

/** 지도·내비 앱 바로가기 — 2026 하나로 가족 한마당과 같은 세 가지. */
const MAP_LINKS: Array<{ key: string; label: string; icon: string; getUrl: (loc: LocationInfo) => string }> = [
  { key: 'kakao', label: '카카오맵', icon: '/icons/kakaomap.svg', getUrl: kakaoMapUrl },
  { key: 'naver', label: '네이버지도', icon: '/icons/navermap.png', getUrl: naverMapUrl },
  { key: 'tmap', label: 'T맵', icon: '/icons/tmap.svg', getUrl: tmapUrl },
];

/** Kakao SDK 로드 전 / 키 미설정 상태에서 보여줄 자리. */
function MapPlaceholder() {
  return (
    <div style={{
      position: 'absolute', inset: 0, borderRadius: BL.cardRadius, border: `1px dashed ${BL.textSoft}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 5,
    }}>
      <span style={{ fontFamily: FF.latin, fontWeight: 600, fontSize: 12, letterSpacing: 3, color: BL.label }}>MAP</span>
      <span style={{ fontFamily: FF.body, fontSize: 13, color: BL.label }}>지도 영역</span>
    </div>
  );
}

/** 06 오시는 길 — 카카오 지도 + 장소 카드(주소·지하철·주차) + 지도 앱 길찾기. */
export function Location() {
  const { place } = O;
  const rows: [string, string][] = [['주소', place.address], ['지하철', place.subway], ['주차', place.parking]];
  const loc: LocationInfo = { name: place.name, address: place.address, coords: place.coords };

  return (
    <Section alt label="06 Location">
      <SectionHead en="Location" ko="오시는 길" />
      <Reveal delay={0.06}>
        <KakaoMap
          address={place.address}
          name={place.name}
          coords={place.coords}
          level={3}
          fallback={<MapPlaceholder />}
          style={{
            aspectRatio: '16 / 10', borderRadius: BL.cardRadius, background: BL.photo,
            overflow: 'hidden', marginBottom: 14,
          }}
        />
      </Reveal>
      <Reveal delay={0.12}>
        <Card>
          <div style={{ fontFamily: FF.display, fontWeight: 700, fontSize: 19, color: BL.text, letterSpacing: -0.3 }}>
            {place.name}
          </div>
          <div style={{ marginTop: 14 }}>
            {rows.map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 14, padding: '11px 0', borderTop: `1px solid ${BL.cardLine}` }}>
                <span style={{ width: 44, flexShrink: 0, fontFamily: FF.body, fontSize: 13, fontWeight: 800, color: BL.label }}>{k}</span>
                <span style={{ flex: 1, fontFamily: FF.body, fontSize: 14, lineHeight: 1.55, color: BL.text, wordBreak: 'keep-all' }}>
                  {v}
                  {k === '주소' && <CopyButton text={v} onCopied={() => track('address_copy')} />}
                </span>
              </div>
            ))}
          </div>

          {/* 외부 지도/내비 앱 바로가기 */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8,
            paddingTop: 14, borderTop: `1px solid ${BL.cardLine}`,
          }}>
            {MAP_LINKS.map((link) => {
              const url = link.getUrl(loc);
              const web = isWebUrl(url);
              return (
                <a
                  key={link.key}
                  href={url}
                  target={web ? '_blank' : undefined}
                  rel={web ? 'noopener noreferrer' : undefined}
                  onClick={() => track('map_open', { app: link.key })}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                    padding: '12px 6px', background: BL.bg, border: `1px solid ${BL.cardLine}`, borderRadius: 12,
                    color: BL.text, textDecoration: 'none', fontFamily: FF.body, fontSize: 12, fontWeight: 700,
                  }}
                >
                  <img src={link.icon} alt="" width={28} height={28} style={{ display: 'block', objectFit: 'contain' }} />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
