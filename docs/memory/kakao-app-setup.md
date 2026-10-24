---
name: kakao-app-setup
description: 지도와 공유가 서로 다른 카카오 앱의 키를 쓴다. 지도는 가족 한마당 앱(무료 쿼터), 공유는 이 프로젝트 앱. 도메인 등록 위치도 다르다
metadata:
  type: project
---

| 용도 | 앱 | 키 | 도메인 등록 | 상태 (2026-10-23) |
|---|---|---|---|---|
| 지도 | `2026_hanaro_family_festival` | 그 앱에서 새로 발급한 플랫폼 키 → `VITE_KAKAO_MAP_KEY` | 그 키의 JavaScript SDK 도메인 | Vercel Production·Preview 등록. `localhost:5173`에서 지도·장소 검색 동작 확인. **배포 주소는 미확인** |
| 공유 | `2026_ordination_of_deaconesses` (사용자가 생성) | 그 앱의 JavaScript 키 → `VITE_KAKAO_JS_KEY` | [앱] → 제품 링크 관리 → `https://2026ordinationofdeaconesses.vercel.app/` | 도메인 등록 완료. **키 미수령** |

**Why (키가 둘인 이유):** 사용자가 새 앱에서 카카오맵을 켜려 하자, 가족 한마당 앱이 이미 무료 쿼터를 받고 있어 또 켜면 요금이 발생한다는 안내를 받았습니다. 그래서 지도는 기존 앱에서 키를 새로 발급했고, 공유는 새 앱으로 합니다. 이전 키(`aa54…`)도 localhost에서는 동작했지만 사용자가 새 키를 지정했습니다.

**How to apply:**

- 두 키를 합치지 않습니다. 공유 SDK(`Kakao.init`)와 지도 SDK(`dapi.kakao.com/v2/maps`)는 별개 스크립트라 다른 앱 키를 써도 됩니다.
- 사용자는 "카카오맵은 이전 것을 쓰니 설정되어 있을 것"이라고 했지만, 도메인 목록은 키(앱)마다 따로입니다. **첫 배포 후 배포 주소에서 지도가 뜨는지 반드시 확인**하고, 안 뜨면 그 키의 SDK 도메인에 배포 주소 추가를 요청합니다.
- 공유 도메인은 「플랫폼 → Web」이 아니라 **제품 링크 관리** — 빠지면 `4019`. 가족 한마당·졸업이 연속으로 겪었습니다.
- 카카오는 OG 이미지를 URL 단위로 캐싱합니다. 썸네일을 공유 후 교체하면 공유 디버거에서 캐시를 초기화하거나 파일명을 바꿉니다.
- JavaScript 키는 브라우저 번들에 들어가는 공개 값입니다. Vercel에는 `--type config`(공개)로 등록합니다.

[[vercel-deploy-setup]]
