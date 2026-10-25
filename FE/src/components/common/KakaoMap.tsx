import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { BL } from '../../theme/tokens';
import { useKakaoMapsSdk } from '../../utils/kakaoMap';
import { useInView } from '../../hooks/useInView';

type KakaoMapProps = {
  /** 검색할 주소 — Geocoder로 좌표 변환 (coords가 있으면 무시) */
  address: string;
  /** 마커 인포윈도우에 표시할 장소 라벨 */
  name: string;
  /** 좌표 직접 지정 ("lat,lng"). 있으면 geocoding 스킵. */
  coords?: string;
  /** 줌 레벨 (1=상세 ~ 14=시도). 기본 3 (구 단위 정도) */
  level?: number;
  /** 키가 없거나 SDK를 못 불러왔을 때 표시할 안내. 불러오는 중에는 빈 배경(style의 background)만 보인다 */
  fallback?: ReactNode;
  /** 외부 컨테이너 스타일 (aspect-ratio, border 등) */
  style?: CSSProperties;
};

/** 화면 아래로 이만큼 남았을 때 미리 불러온다 — 섹션에 닿을 즈음엔 그려져 있게 */
const NEAR_MARGIN = '800px 0px';

/**
 * Kakao 지도 임베드. (2026 하나로 가족 한마당 구현에서 출발)
 * - 화면에 가까워지면(위 NEAR_MARGIN) 그때 SDK를 부른다. 가족 한마당처럼 처음부터 부르면 맨 위 화면에서도
 *   지도 SDK·타일 약 430KB를 받아 첫 로딩의 절반 가까이를 차지했다 (2026-10-25 검토, 느린 4G 실측).
 * - 지도는 터치·클릭을 받지 않는다(pointer-events: none). 받으면 한 손가락으로 지도 위를 쓸 때 페이지 대신
 *   지도가 움직여 스크롤이 막힌다 — 터치 에뮬레이션에서 지도 위 스크롤 0px. 카카오 API의 setDraggable(false)·
 *   setZoomable(false)로는 여전히 0px이라 입력 자체를 페이지로 넘긴다. 길찾기는 아래 지도 앱 버튼이 맡는다.
 * - 로드되면 map div가 opacity 페이드인. 키가 없거나 SDK를 못 불러오면 fallback을 보인다.
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const near = useInView(wrapRef, NEAR_MARGIN, true);
  const { maps, failed } = useKakaoMapsSdk(near);
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
    <div ref={wrapRef} style={{ position: 'relative', ...style }}>
      {failed && fallback}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          inset: 0,
          opacity: mapReady ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
