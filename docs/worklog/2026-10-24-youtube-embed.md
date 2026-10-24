# 2026-10-24 · 20주년 기념 영상 YouTube 임베드

> 사용자가 20주년 영상이 교회 YouTube 채널에 있다고 알려 와 갤러리 사진 아래에 임베드. 자체 호스팅용으로 졸업 레포에서 가져온 영상 모듈은 걷어냈다.

## 한 일

- `components/common/YouTubeEmbed.tsx` (신규) — `youtube-nocookie.com` 표준 플레이어, 16:9 둥근 어두운 자리, `loading="lazy"`
- `data/ordination.ts` · `types.ts` — `gallery.video`를 `{ title, youtubeId }`로. 환경 변수 3종(`VITE_ANNIVERSARY_VIDEO_*`)과 `videoUi` 제거
- 제거 — `VideoSlot.tsx`, `utils/videoQuality.ts`, `tests/videoQuality.test.mjs`, `npm test` 스크립트, `public/video/`와 관련 `.gitignore` 줄
- 부분 폰트 재생성 (446 → 444자) · README · CLAUDE.md · `.env.example` · 요구사항 · 메모리

영상: 김포하나로교회 채널(@HANAROCH) 「김포 하나로교회 20주년 기념 홍보 영상 (라라랜드 커버)」 `youtu.be/1mncrNOaeOA` (3:53).

## 판단한 것

**1. 포스터 → 클릭 → 플레이어(졸업 방식)가 아니라 표준 플레이어 + 지연 로딩**

졸업 레포는 "누르기 전에는 영상을 받지 않는다"를 지켰고, YouTube에서도 같은 방식(썸네일을 먼저 보여 주고 누르면 iframe으로 교체)을 흔히 씁니다. 그런데 이 방식은 **아이폰에서 두 번 눌러야 재생**됩니다 — 교체된 iframe이 자동 재생되지 않고 YouTube 재생 버튼을 다시 띄웁니다. 졸업이 그 원칙을 지킨 이유는 자체 호스팅 영상의 **우리 쪽 전송량 비용**(Vercel Blob 한도 초과로 차단된 경위)이었고, YouTube는 전송을 YouTube가 맡아 그 이유가 없습니다. 연령대가 넓은 사용자에게 "눌렀는데 또 눌러야 하는" 경험이 더 나쁘다고 보고 표준 플레이어를 `loading="lazy"`로 두었습니다 — 갤러리 근처까지 내려왔을 때만 불러오므로 거기까지 가지 않는 사람에게는 비용이 없습니다. 관습적 UI 선호와도 맞습니다.

**2. 졸업의 영상 모듈은 걷어냄**

영상 슬롯·전체화면 화질 전환·테스트 24개는 자체 호스팅 MP4를 위한 것이라 YouTube에는 쓸 곳이 없습니다. 남겨 두면 읽는 사람이 쓰이는 줄 알게 됩니다. 원본은 졸업 레포에 있으니 필요해지면 다시 가져옵니다. JS 번들은 267.5KB → 262.7KB.

**3. 재생 집계는 근사치**

다른 출처의 플레이어라 재생 이벤트를 직접 받을 수 없습니다. IFrame API 스크립트를 들이는 대신, 플레이어를 누르면 초점이 iframe으로 옮겨 가며 창의 `blur`가 나는 것을 `video_play`로 셉니다 — 재생 시도의 근사치이며 모바일 Safari에서는 잡히지 않을 수 있습니다. README 이벤트 표에 근사치라고 적었습니다.

**4. Referer를 지우지 않음**

YouTube는 Referer가 없는 임베드 요청을 재생 오류로 막습니다. iframe에 `referrerPolicy="strict-origin-when-cross-origin"`을 명시하고, 사이트 쪽에서 `Referrer-Policy: no-referrer` 같은 헤더를 넣지 말아야 합니다 — `CLAUDE.md`에 남겼습니다.

## 확인한 것

| 항목 | 결과 |
|---|---|
| 임베드 허용 | ✅ oEmbed 200 — 업로더가 외부 임베드를 막지 않음 |
| `npm run build` / `npm run lint` | ✅ 통과 · 무경고 (폰트 444자) |
| 지연 로딩 | ✅ 첫 화면에서 YouTube 요청 0건, 갤러리 근처에서 10건 |
| 플레이어 표시 | ✅ 오류 화면 없음 — 교회 로고·제목·채널명·재생 버튼 |
| 재생 | ✅ Chrome에서 재생 버튼 → 0:03 / 3:53 진행, 전체화면 버튼 |
| 아이폰·카카오 인앱 | ❌ **미확인** — `playsinline=1`로 인라인 재생을 요청했지만 실기기에서 봐야 함 |

검증 중 이전에 끈 개발 서버의 하위 `vite` 프로세스가 5173 포트를 계속 잡고 있었습니다(Windows에서 `npx`만 종료되고 자식이 남음). 그 프로세스도 파일을 감시해 최신 코드를 서빙하고 있어 결과는 유효하며, 확인 후 종료했습니다.

## 남긴 것

**실기기 확인** — 첫 배포 후 아이폰·카카오톡 인앱 브라우저에서 한 번 눌러 재생되는지, 인라인으로 재생되는지 확인이 필요합니다.

**아직 커밋하지 않았습니다** ([[ask-before-commit-push]]).
