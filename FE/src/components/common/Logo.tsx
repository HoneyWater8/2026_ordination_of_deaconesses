import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';

type LogoProps = { size?: number };

/**
 * 교회 로고 (data의 logo). 누르면 교회 홈페이지를 새 창으로 연다 — 초대장을 떠나지 않게.
 * 링크는 로고 크기만큼만 잡는다(가운데 정렬된 줄 전체가 눌리지 않게). 경로가 없으면 점선 원 안의 LOGO 자리.
 */
export function Logo({ size = 60 }: LogoProps) {
  if (O.logo) {
    return (
      <a href={O.homepage} target="_blank" rel="noopener noreferrer" aria-label={`${O.church} 홈페이지 (새 창)`}
        style={{ display: 'block', margin: '0 auto', width: size, height: size }}>
        <img src={O.logo} alt="" width={size} height={size}
          style={{ display: 'block', width: size, height: size, objectFit: 'contain' }} />
      </a>
    );
  }
  return (
    <div data-role="logo-slot" style={{
      width: size, height: size, margin: '0 auto', borderRadius: '50%',
      border: `1px dashed ${BL.textSoft}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: FF.latin, fontWeight: 600, fontSize: 11, letterSpacing: 2, color: BL.textSoft,
    }}>LOGO</div>
  );
}
