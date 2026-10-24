/* ─────────────────────────────────────────────────────────
   2026 권사 임직 감사예배 · Bloom(성경 속 꽃) 초대장
   하나로교회 · 9섹션 세로 스크롤 + 섹션마다 고유한 꽃
   ───────────────────────────────────────────────────────── */

import { Analytics } from '@vercel/analytics/react';
import { BL, LAYOUT } from './theme/tokens';
import { ShareFAB } from './components/common/ShareFAB';
import { Hero } from './components/sections/Hero';
import { Invite } from './components/sections/Invite';
import { Schedule } from './components/sections/Schedule';
import { Order } from './components/sections/Order';
import { Ordainees } from './components/sections/Ordainees';
import { Location } from './components/sections/Location';
import { Gallery } from './components/sections/Gallery';
import { Notice } from './components/sections/Notice';
import { Footer } from './components/sections/Footer';

export default function App() {
  return (
    <div style={{
      position: 'relative', width: '100%', maxWidth: LAYOUT.maxWidth,
      // 100vh는 모바일 주소창 높이를 포함해 하단이 잘린다 → dvh
      height: '100dvh',
      margin: '0 auto', overflow: 'hidden', background: BL.bg,
      boxShadow: '0 0 60px rgba(0,0,0,.12)',
    }}>
      {/* 본문 — 스크롤은 body가 아니라 이 컨테이너가 담당 */}
      <main
        data-scroll-root
        className="no-scrollbar"
        style={{
          position: 'absolute', inset: 0,
          overflowY: 'auto', overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          background: BL.bg,
        }}
      >
        <Hero />
        <Invite />
        <Schedule />
        <Order />
        <Ordainees />
        <Location />
        <Gallery />
        <Notice />
        <Footer />
      </main>

      {/* 공유 FAB (z-index 40+) */}
      <ShareFAB />

      {/* Vercel Web Analytics — 방문자·페이지뷰·유입 경로 (쿠키 없음) */}
      <Analytics />
    </div>
  );
}
