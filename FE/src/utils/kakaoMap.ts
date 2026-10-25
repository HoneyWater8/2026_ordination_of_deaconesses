/* ─────────────────────────────────────────────────────────
   Kakao Maps JavaScript SDK 동적 로더 + 훅
   - VITE_KAKAO_MAP_KEY 환경변수에서 키 읽음
   - 키 미설정 시 silent fail → placeholder 폴백
   - 공유(VITE_KAKAO_JS_KEY)와 다른 앱의 키다. 카카오맵 무료 쿼터가
     2026_hanaro_family_festival 앱에 있어 그 앱의 플랫폼 키를 쓴다 (2026-10-23).
   ───────────────────────────────────────────────────────── */

import { useEffect, useState } from 'react';
import { trackError } from './analytics';

// Kakao Maps SDK는 d.ts가 없어 이 프로젝트에서 쓰는 만큼만 선언한다.
export type KakaoLatLng = { getLat: () => number; getLng: () => number };
export type KakaoMapInstance = object;
type KakaoMarker = { setMap: (map: KakaoMapInstance | null) => void };
type KakaoSearchResult = { x: string; y: string };
type KakaoSearchCallback = (result: KakaoSearchResult[], status: string) => void;

export type KakaoMapsApi = {
  load: (callback: () => void) => void;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  Map: new (container: HTMLElement, options: { center: KakaoLatLng; level: number }) => KakaoMapInstance;
  Marker: new (options: { position: KakaoLatLng }) => KakaoMarker;
  InfoWindow: new (options: { content: string; removable?: boolean }) => {
    open: (map: KakaoMapInstance, marker: KakaoMarker) => void;
  };
  services: {
    Status: { OK: string };
    Geocoder: new () => { addressSearch: (address: string, callback: KakaoSearchCallback) => void };
    Places: new () => { keywordSearch: (keyword: string, callback: KakaoSearchCallback) => void };
  };
};

declare global {
  interface Window {
    kakao?: { maps?: KakaoMapsApi };
  }
}

const SDK_SCRIPT_ID = 'kakao-maps-sdk';
let sdkPromise: Promise<void> | null = null;

/** SDK 스크립트를 1회만 로드하고 maps 모듈 초기화까지 끝낸 뒤 resolve. */
function loadKakaoMaps(appKey: string): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('window unavailable'));
  }
  if (window.kakao?.maps?.LatLng) {
    return Promise.resolve();
  }
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<void>((resolve, reject) => {
    const onReady = () => {
      // autoload=false로 로드했으므로 명시적으로 maps.load 호출.
      if (window.kakao?.maps?.load) {
        window.kakao.maps.load(() => resolve());
      } else {
        reject(new Error('Kakao SDK loaded but window.kakao.maps unavailable'));
      }
    };
    const onError = () => reject(new Error('Kakao SDK script failed to load'));

    const existing = document.getElementById(SDK_SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', onReady, { once: true });
      existing.addEventListener('error', onError, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = SDK_SCRIPT_ID;
    script.async = true;
    // libraries=services → Geocoder, Places 사용 가능
    script.src =
      `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}` +
      `&autoload=false&libraries=services`;
    script.addEventListener('load', onReady, { once: true });
    script.addEventListener('error', onError, { once: true });
    document.head.appendChild(script);
  });

  return sdkPromise;
}

/**
 * Kakao Maps SDK 로딩 상태 훅.
 * 키가 없으면 null을 영구 반환 → 컴포넌트는 폴백을 표시.
 */
export function useKakaoMapsSdk(): KakaoMapsApi | null {
  const [maps, setMaps] = useState<KakaoMapsApi | null>(null);

  useEffect(() => {
    const appKey = import.meta.env.VITE_KAKAO_MAP_KEY;
    if (!appKey || appKey.trim() === '') {
      if (import.meta.env.DEV) {
        console.warn(
          '[KakaoMap] VITE_KAKAO_MAP_KEY가 설정되지 않았습니다. ' +
            '.env.local 파일을 만들어 키를 추가하세요. ' +
            '발급: https://developers.kakao.com/'
        );
      }
      return;
    }

    let cancelled = false;
    loadKakaoMaps(appKey).then(
      () => {
        if (!cancelled && window.kakao?.maps) setMaps(window.kakao.maps);
      },
      (err) => {
        if (import.meta.env.DEV) console.warn('[KakaoMap] SDK load failed:', err);
        // 화면은 조용히 폴백으로 바뀌므로, 실기기에서 실패했는지는 집계로만 알 수 있다
        trackError(`kakao_map: ${err instanceof Error ? err.message : String(err)}`);
      }
    );
    return () => {
      cancelled = true;
    };
  }, []);

  return maps;
}
