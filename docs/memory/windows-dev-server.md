---
name: windows-dev-server
description: 이 PC(Windows)에서 백그라운드로 띄운 npx vite를 종료해도 자식 node 프로세스가 남아 5173·4173 포트를 계속 잡는다
metadata:
  type: project
---

백그라운드 작업으로 `npx vite`(dev·preview)를 띄웠다가 작업만 종료하면 `npx`만 끝나고 자식 `node …/vite/bin/vite.js`가 남아 포트를 계속 점유합니다. 2026-10-24 두 번 겪었습니다(5173, 4173). 2026-10-25에도 여러 번 — Claude Code가 메모리 부족으로 백그라운드 작업(`npx vite preview`)을 자동 종료했을 때도 자식 node가 남아 5173을 잡고 있었습니다.

**Why:** 남은 서버는 파일을 계속 감시해 최신 코드를 서빙하므로 검증 결과가 틀리지는 않지만, 다음에 같은 포트로 띄우면 `--strictPort`가 실패합니다. 지도 키가 `localhost:5173`에만 등록되어 있어 다른 포트로 밀리면 지도가 막힙니다.

**How to apply:** 서버를 끈 뒤 `netstat -ano | findstr :5173`(또는 4173)으로 LISTENING이 남았는지 확인하고, 남았으면 그 PID의 명령줄이 이 레포의 vite인지 확인한 뒤 `Stop-Process -Id <PID>`로 종료합니다.
