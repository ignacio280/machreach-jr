# Linear Setup

Use Linear as the task board for MachReach JR. GitHub remains the code source of truth, and every teammate previews locally.

## Recommended Linear Project

Project name:

```text
MachReach JR Landing
```

Team/key:

```text
MJR
```

## Suggested Labels

- `copy`
- `design`
- `frontend`
- `mobile`
- `bug`
- `landing`
- `handoff`
- `blocked`

## Issue Template

```text
Problem:

Expected:

Acceptance:
- npm run check passes
- local preview checked
- screenshot or recording attached

Files/sections likely involved:

Notes for Codex:
```

## How A Teammate Uses Codex

1. Pick or assign a Linear issue.
2. Clone the repo if needed:

```bash
git clone https://github.com/ignacio280/machreach-jr.git
cd machreach-jr
npm install
```

3. Create a branch:

```bash
git checkout main
git pull
git checkout -b mjr-12-fix-mobile-hero
```

4. Tell Codex:

```text
Work on Linear issue MJR-12 in this repo.
Keep the change scoped to the issue.
Run npm run check.
Use npm run serve and verify locally.
Commit the result and open a PR.
```

5. Paste the PR link and local preview screenshot into Linear.
