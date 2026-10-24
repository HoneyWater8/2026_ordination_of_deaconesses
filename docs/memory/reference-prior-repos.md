---
name: reference-prior-repos
description: 이 레포의 구조·컨벤션이 따라온 앞선 두 프로젝트의 위치와, 무엇을 어디서 가져오는지
metadata:
  type: reference
---

| | 아멘 제자 17기 졸업 | 2026 하나로 가족 한마당 |
|---|---|---|
| 로컬 | `C:\dev\2026_amen17_graduation` | `C:\dev\2026_hanaro_family_festival` |
| 원격 | https://github.com/HoneyWater8/2026_amen17_graduation (공개) | https://github.com/HoneyWater8/2026_hanaro_family_festival (공개) |
| 역할 | **직접 기준** — 구조·스택·설정 파일·작업로그/메모리 체계·사진/영상/공유/집계 구현 | 원형 · **지도 구현의 출처** (`KakaoMap`·`kakaoMap.ts`·`mapLinks.ts`·`CopyButton`) |

- 졸업 레포의 설정 파일 5종(`tsconfig*`·`eslint.config.js`·`vite.config.ts`)과 `package-lock.json`을 그대로 가져왔다(이름만 변경).
- 가족 한마당의 지도 코드는 원래 lint 오류 5건(`any`)이 있어 타입만 보강해 가져왔다. 그 레포의 Vercel 프로젝트는 삭제된 상태다.
- **졸업 레포 커밋은 두 시기로 나뉜다.** 09-07~09-11의 24개는 Claude Code(본문 + `Co-Authored-By`·`Claude-Session` trailer), 09-16~09-29의 14개는 Codex(제목 한 줄, trailer 없음). 작업로그도 Codex 시기 일부는 형식이 다르다. 이 레포에서는 **Claude Code 시기 형식**과 `docs/worklog/README.md`의 원래 형식을 따른다.
- 졸업 레포 사용자 지시의 원본 기록: Claude Code `~/.claude/history.jsonl`(09-07~09-11), Codex `~/.codex/history.jsonl`(09-16~09-29).

[[prefers-mirroring-prior-project]]
