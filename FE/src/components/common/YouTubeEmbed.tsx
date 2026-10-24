/* ─────────────────────────────────────────────────────────
   YouTube 임베드 · 교회 채널 영상을 표준 플레이어로 재생
   ───────────────────────────────────────────────────────── */

import { useEffect, useRef } from 'react';
import { track } from '../../utils/analytics';

type YouTubeEmbedProps = {
  videoId: string;
  /** iframe 제목 — 보조 기술이 플레이어를 구분하는 이름 */
  title: string;
  /** 재생 집계 이름 */
  slotKey: string;
};

/**
 * YouTube 표준 플레이어를 16:9 자리에 넣는다.
 *
 * 졸업 레포처럼 포스터를 먼저 보여 주고 누르면 플레이어로 바꾸는 방식은 아이폰에서
 * 두 번 눌러야 재생되는 한계가 있다. 그 방식을 쓴 이유는 자체 호스팅 영상의 전송량
 * 비용이었는데 YouTube는 전송을 YouTube가 맡으므로, 표준 플레이어를 그대로 두고
 * loading="lazy"로 갤러리 근처까지 내려왔을 때만 불러온다 — 한 번 누르면 재생된다.
 *
 * youtube-nocookie 도메인을 쓰고, Referer를 지워서는 안 된다 —
 * YouTube는 Referer가 없는 임베드 요청을 재생 오류로 막는다.
 */
export function YouTubeEmbed({ videoId, title, slotKey }: YouTubeEmbedProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  // 다른 출처의 플레이어라 재생 이벤트를 직접 받을 수 없다. 사용자가 플레이어를 누르면
  // 초점이 iframe으로 옮겨 가며 창의 blur가 일어나는 것을 「재생 시도」로 센다 (근사치).
  useEffect(() => {
    const onBlur = () => {
      if (document.activeElement === frameRef.current) track('video_play', { video: slotKey }, true);
    };
    window.addEventListener('blur', onBlur);
    return () => window.removeEventListener('blur', onBlur);
  }, [slotKey]);

  return (
    <div
      data-role="video-slot"
      data-video-key={slotKey}
      style={{
        position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 12,
        background: '#241A1C', overflow: 'hidden',
      }}
    >
      <iframe
        ref={frameRef}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&playsinline=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, display: 'block' }}
      />
    </div>
  );
}
