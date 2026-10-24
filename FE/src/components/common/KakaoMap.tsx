import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { BL } from '../../theme/tokens';
import { useKakaoMapsSdk } from '../../utils/kakaoMap';

type KakaoMapProps = {
  /** 검색할 주소 — Geocoder로 좌표 변환 (coords가 있으면 무시) */
  address: string;
  /** 마커 인포윈도우에 표시할 장소 라벨 */
  name: string;
  /** 좌표 직접 지정 ("lat,lng"). 있으면 geocoding 스킵. */
  coords?: string;
  /** 줌 레벨 (1=상세 ~ 14=시도). 기본 3 (구 단위 정도) */
  level?: number;
  /** SDK 로딩 전·실패 시 표시할 폴백 (예: placeholder) */
  fallback?: ReactNode;
  /** 외부 컨테이너 스타일 (aspect-ratio, border 등) */
  style?: CSSProperties;
};

/**
 * Kakao 지도 임베드. (2026 하나로 가족 한마당 구현과 동일한 동작)
 * - SDK 미로드/키 미설정 시 fallback만 표시.
 * - 로드되면 map div가 opacity 페이드인되며 fallback을 덮음.
 * - coords 우선 → 없으면 Geocoder(주소) → 그래도 실패하면 Places(키워드)로 단계적 검색.
 */
export function KakaoMap({
  address,
  name,
  coords,
  level = 3,
  fallback,
  style,
}: KakaoMapProps) {
  const maps = useKakaoMapsSdk();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapReady, setMapReady] = useState(false);

  // [DEV ONLY] coords 정확성 검증용 — 항상 Places/Geocoder 한 번 돌려서 콘솔에 정답 출력.
  useEffect(() => {
    if (!maps || !import.meta.env.DEV) return;
    const places = new maps.services.Places();
    places.keywordSearch(name, (result, status) => {
      if (status === maps.services.Status.OK && result.length > 0) {
        console.log(
          `%c[KakaoMap]%c Place "${name}" → coords: "${result[0].y},${result[0].x}"\n` +
          `%c→ data/ordination.ts place.coords 에 위 값을 넣으면 정확한 위치 사용`,
          'color:#B44B60;font-weight:bold;', '', 'color:#999;'
        );
      } else {
        new maps.services.Geocoder().addressSearch(address, (gResult, gStatus) => {
          if (gStatus === maps.services.Status.OK && gResult.length > 0) {
            console.log(
              `%c[KakaoMap]%c Address "${address}" → coords: "${gResult[0].y},${gResult[0].x}"`,
              'color:#B44B60;font-weight:bold;', ''
            );
          }
        });
      }
    });
  }, [maps, name, address]);

  useEffect(() => {
    if (!maps || !containerRef.current) return;
    let cancelled = false;

    const initAt = (lat: number, lng: number) => {
      if (cancelled || !containerRef.current) return;
      const center = new maps.LatLng(lat, lng);
      const map = new maps.Map(containerRef.current, { center, level });
      const marker = new maps.Marker({ position: center });
      marker.setMap(map);
      const infowindow = new maps.InfoWindow({
        content:
          `<div style="padding:6px 10px;font-size:12px;font-weight:600;` +
          `white-space:nowrap;color:${BL.text};">${name}</div>`,
        removable: false,
      });
      infowindow.open(map, marker);
      setMapReady(true);
    };

    // 1) coords prop이 있으면 우선 사용
    if (coords && coords.trim() !== '') {
      const parts = coords.split(',').map((s) => Number(s.trim()));
      if (parts.length === 2 && Number.isFinite(parts[0]) && Number.isFinite(parts[1])) {
        initAt(parts[0], parts[1]);
        return () => {
          cancelled = true;
        };
      }
    }

    // 2) Geocoder로 주소 → 좌표
    new maps.services.Geocoder().addressSearch(address, (result, status) => {
      if (cancelled) return;
      if (status === maps.services.Status.OK && result.length > 0) {
        initAt(parseFloat(result[0].y), parseFloat(result[0].x));
        return;
      }
      // 3) 주소가 매칭 안 되면 장소 키워드 검색
      new maps.services.Places().keywordSearch(address, (placeResult, placeStatus) => {
        if (cancelled) return;
        if (placeStatus === maps.services.Status.OK && placeResult.length > 0) {
          initAt(parseFloat(placeResult[0].y), parseFloat(placeResult[0].x));
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, [maps, address, coords, name, level]);

  return (
    <div style={{ position: 'relative', ...style }}>
      {fallback}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: mapReady ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: mapReady ? 'auto' : 'none',
        }}
      />
    </div>
  );
}
