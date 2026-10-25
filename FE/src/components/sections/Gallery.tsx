import { useState } from 'react';
import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';
import type { GalleryPhoto } from '../../data/types';
import { track } from '../../utils/analytics';
import { Section } from '../common/Section';
import { SectionHead } from '../common/SectionHead';
import { Reveal } from '../common/Reveal';
import { Lightbox } from '../common/Lightbox';
import { YouTubeEmbed } from '../common/YouTubeEmbed';

type Cell = { photo: GalleryPhoto; index: number };

/** 사진을 rows([1, 2, 1 …])대로 순서대로 끊는다. rows 합보다 사진이 많으면 남는 사진은 한 장씩 한 줄로 */
function toRows(photos: GalleryPhoto[], rows: number[]): Cell[][] {
  const cells = photos.map((photo, index) => ({ photo, index }));
  const out: Cell[][] = [];
  let i = 0;
  for (const n of rows) {
    if (i >= cells.length) break;
    out.push(cells.slice(i, i + n));
    i += n;
  }
  for (; i < cells.length; i++) out.push([cells[i]]);
  return out;
}

const ROWS = toRows(O.gallery.photos, O.gallery.rows);

/**
 * 07 갤러리 — 교회 사진 + 20주년 기념 영상(YouTube). 사진을 누르면 확대 보기.
 * 칸은 사진 비율 그대로다 — 같은 줄의 칸은 flex-grow를 비율로 주어 높이가 같아지고 폭은 비율대로 나뉜다.
 * 시안의 2열 정사각 칸(넓게 · 2 · 2 · 넓게 · 2)은 받은 사진이 모두 가로라 많이 잘려 2026-10-25 바꿨다.
 */
export function Gallery() {
  const { photos, video } = O.gallery;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section alt label="07 Gallery">
      <SectionHead en="Gallery" ko="갤러리" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ROWS.map((row, r) => (
          <div key={r} style={{ display: 'flex', gap: 8 }}>
            {row.map(({ photo, index }, j) => (
              <div key={index} style={{ flex: `${photo.ratio} 1 0`, minWidth: 0 }}>
                <Reveal delay={j * 0.06} y={12}>
                  <div data-role="gallery-photo" data-index={index} style={{
                    aspectRatio: photo.ratio, borderRadius: 12, overflow: 'hidden', background: BL.photo,
                  }}>
                    <button
                      type="button"
                      aria-label={`${photo.caption} 크게 보기`}
                      // photo = 파일 번호(gallery/NN.webp)와 같은 01~08 — 어떤 사진이 많이 열렸는지 본다
                      onClick={() => {
                        track('photo_open', { photo: String(index + 1).padStart(2, '0') });
                        setOpenIndex(index);
                      }}
                      style={{ width: '100%', height: '100%', padding: 0, border: 0, background: 'none', cursor: 'pointer' }}
                    >
                      <img src={photo.thumb} alt={photo.caption} loading="lazy" decoding="async"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </button>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        ))}
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
