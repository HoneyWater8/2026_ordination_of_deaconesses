import { BL, FF } from '../../theme/tokens';
import { O } from '../../data/ordination';

type LogoProps = { size?: number };

/** 교회 로고. 파일을 받기 전에는 점선 원 안의 LOGO 자리로 표시한다. */
export function Logo({ size = 60 }: LogoProps) {
  if (O.logo) {
    return (
      <img src={O.logo} alt={`${O.church} 로고`} width={size} height={size}
        style={{ display: 'block', margin: '0 auto', width: size, height: size, objectFit: 'contain' }} />
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
