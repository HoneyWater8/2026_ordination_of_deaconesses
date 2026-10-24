---
name: github-identity
description: 개인 GitHub 계정은 HoneyWater8이며, 전역 git config에는 회사 이메일이 설정되어 있어 그대로 커밋하면 계정에 연결되지 않는다
metadata:
  type: reference
---

- 개인 GitHub 계정 — **`HoneyWater8`** (https://github.com/HoneyWater8)
- 해당 계정에 연결된 커밋 이메일 — `kjyjyh8@gmail.com`
- 이 레포 — https://github.com/HoneyWater8/2026_ordination_of_deaconesses (사용자가 2026-10-23 직접 생성)

**주의:** 이 PC의 전역 `git config`는 **회사 계정**입니다. 그대로 커밋하면 `HoneyWater8`에 연결되지 않습니다. 이 레포는 2026-10-23 `git init` 때 로컬 설정을 지정해 두었습니다.

```sh
git config --local user.name  "HoneyWater8"
git config --local user.email "kjyjyh8@gmail.com"
```

전역 설정은 회사 작업용이므로 건드리지 않습니다. 새로 클론한 환경에서는 위 로컬 설정을 다시 지정합니다.
