/* ─────────────────────────────────────────────────────────
   권사 임직 감사예배 초대장 데이터 타입 정의
   ───────────────────────────────────────────────────────── */

/** 성경 속 꽃 8종 — 그림은 components/common/Flower.tsx */
export type FlowerKind =
  | 'almond' | 'narcissus' | 'lily' | 'pomegranate'
  | 'olive' | 'grape' | 'anemone' | 'palm';

export type FlowerInfo = {
  name: string;
  /** 장절 (예: "민수기 17:8") */
  ref: string;
  /** 캡션 아래 한 줄로 보이는 구절 */
  verse: string;
  /** 「?」 시트의 해설 본문 */
  note: string;
  /**
   * head  — 한 송이. 구분선에서 천천히 회전하고, 배경에서는 위 모서리에 놓인다
   * sprig — 가지. 구분선에서 살랑이고, 배경에서는 아래 모서리에서 자란다
   */
  type: 'head' | 'sprig';
};

/**
 * 섹션 라벨 — GA section_view와 섹션별 꽃 매핑의 키.
 * 04(예배 순서)는 2026-10-24 섹션을 빼며 비었다. 번호를 당기지 않는다 — 라벨이 배경 꽃의
 * 좌우·기울기를 정하는 시드라, 당기면 뒤 섹션들의 꽃 배치가 바뀐다.
 */
export type SectionLabel =
  | '01 Hero' | '02 Invite' | '03 Date' | '05 Ordainees'
  | '06 Location' | '07 Gallery' | '08 Notice' | '09 Footer';

export type Place = {
  name: string;
  address: string;
  subway: string;
  parking: string;
  /** 카카오 장소 검색으로 확인한 "lat,lng". 지도 핀과 외부 지도 앱 길찾기에 쓴다 */
  coords: string;
};

export type GalleryPhoto = {
  /** 이미지 alt 텍스트 전용 */
  caption: string;
  /** 그리드용 */
  thumb: string;
  /** 확대 보기용. 카드를 눌렀을 때만 로드된다 */
  full: string;
};

export type GalleryVideo = {
  /** 영상 위에 표시할 제목 */
  title: string;
  /** YouTube 영상 ID (youtu.be/<ID>) — 교회 채널에 올라간 영상을 임베드한다 */
  youtubeId: string;
};

export type OrdinationData = {
  church: string;
  /** 라틴 전용 — Garamond로 조판되므로 한글을 섞지 말 것 */
  churchEn: string;
  title: string;
  /** 라틴 전용 */
  titleEn: string;
  /** 첫 화면 큰 제목 — 「권사 [임직]」 + 「감사예배」. accent만 강조색 */
  heroTitle: { lead: string; accent: string; sub: string };
  /** 로고 이미지 경로 (scripts/prepare-logo.py 결과를 import). 없으면 LOGO 자리 표시 */
  logo?: string;
  date: { y: number; m: number; d: number; dayKo: string; time: string };
  place: Place;
  invite: string[];
  /** 담당자가 전달한 원문 순서. 화면에서는 가나다순으로 정렬한다 */
  ordainees: string[];
  /** 임직자 사진이 준비되면 true — public/ordainees/NN.webp (NN = 원문 순서) */
  ordaineePhotos: boolean;
  gallery: {
    /** 그리드 칸 수. 사진이 모자란 칸은 번호 placeholder로 남는다 */
    slots: number;
    photos: GalleryPhoto[];
    video: GalleryVideo;
  };
  notice: string[];
  flowers: {
    info: Record<FlowerKind, FlowerInfo>;
    /** 섹션 → 꽃. 첫 화면·마지막 화면도 여기서 정한다 */
    bySection: Partial<Record<SectionLabel, FlowerKind>>;
  };
  credit: string;
  share: { title: string };
};
