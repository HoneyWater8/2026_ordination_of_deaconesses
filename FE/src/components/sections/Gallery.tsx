import { useState } from 'react';
import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';
import { track } from '../../utils/analytics';
import { Section } from '../common/Section';
import { SectionHead } from '../common/SectionHead';
import { Reveal } from '../common/Reveal';
import { Lightbox } from '../common/Lightbox';
import { YouTubeEmbed } from '../common/YouTubeEmbed';

/** 2열 그리드에서 한 줄을 다 쓰는 칸 — 시안의 리듬(넓게 · 2 · 2 · 넓게 · 2) */
const WIDE = new Set([0, 5]);

/**
 * 07 갤러리 — 교회 사진 2열 그리드 + 20주년 기념 영상(YouTube).
 * 사진이 아직 없는 칸은 번호 자리로 남는다. 사진을 누르면 확대 보기.
 */
export function Gallery() {
  const { slots, photos, video } = O.gallery;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section label="07 Gallery">
      <SectionHead en="Gallery" ko="갤러리" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,minmax(0,1fr))', gap: 8 }}>
        {Array.from({ length: slots }, (_, i) => {
          const wide = WIDE.has(i);
          const photo = photos[i];
          return (
            <div key={i} style={{ gridColumn: wide ? '1 / -1' : 'auto' }}>
              <Reveal delay={(i % 2) * 0.06} y={12}>
                <div data-role="gallery-photo" data-index={i} style={{
                  aspectRatio: wide ? '16 / 10' : '1 / 1', borderRadius: 12, overflow: 'hidden',
                  background: BL.photo, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {photo ? (
                    <button
                      type="button"
                      aria-label={`${photo.caption} 크게 보기`}
                      onClick={() => { track('photo_open'); setOpenIndex(i); }}
                      style={{ width: '100%', height: '100%', padding: 0, border: 0, background: 'none', cursor: 'pointer' }}
                    >
                      <img src={photo.thumb} alt={photo.caption} loading="lazy" decoding="async"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </button>
                  ) : (
                    <span aria-hidden="true" style={{ fontFamily: FF.latin, fontWeight: 600, fontSize: 18, letterSpacing: 2, color: BL.label }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  )}
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>

      {/* 담당자 목록의 「20주년 기념 영상?」 — 사진 아래에 이어 둔다. 교회 YouTube 채널 영상 */}
      <Reveal delay={0.06}>
        <div style={{ marginTop: 28 }}>
          <div style={{
            marginBottom: 10, textAlign: 'center', fontFamily: FF.display, fontWeight: 700, fontSize: 17, color: BL.text,
          }}>{video.title}</div>
          <YouTubeEmbed videoId={video.youtubeId} title={`${video.title} (YouTube)`} slotKey="anniversary" />
        </div>
      </Reveal>

      <Lightbox
        photos={photos}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onMove={(next) => setOpenIndex((next + photos.length) % photos.length)}
      />
    </Section>
  );
}
