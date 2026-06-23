# Team Workflow

This repo is set up so each teammate can use their own Codex without stepping on anyone else's work.

## Source Of Truth

- MachReach JR GitHub repo: source of truth for JR code.
- MachReach university GitHub repo: reference source for existing MachReach patterns.
- Linear: source of truth for tasks.
- Pull requests: source of truth for review and handoff.
- Local preview: each teammate runs the page on their own computer.

## Repositories

MachReach JR work happens here:

```text
https://github.com/ignacio280/machreach-jr
```

MachReach university is available as a reference:

```text
https://github.com/ignacio280/machreach
```

Clone MachReach university when you need to copy the look, structure, product logic, or behavior. Keep actual JR changes in the MachReach JR repo unless a Linear issue explicitly says to touch MachReach university.

## Normal Flow

1. Create a Linear issue with a clear task.
2. Create a branch named after the issue:

```bash
git checkout main
git pull
git checkout -b nuv-12-fix-mobile-hero
```

3. Ask your own Codex to make the change on that branch.
4. Run:

```bash
npm run check
```

5. Commit and push the branch.
6. Open a pull request.
7. Attach a screenshot or short screen recording from your local preview to the PR or Linear issue.
8. Another teammate can continue by checking out the same branch or asking Codex to continue from the PR.

## Local Preview

Every teammate previews the page locally:

```bash
git clone https://github.com/ignacio280/machreach-jr.git
cd machreach-jr
npm install
npm run build
npm run serve
```

Optional reference checkout:

```bash
git clone https://github.com/ignacio280/machreach.git
```

Open:

```text
http://127.0.0.1:8792/index.html
```

If two projects are already using `8792`, run:

```bash
node scripts/serve.mjs 8794
```

## Good Linear Issues

Good:

```text
NUV-12: Fix mobile hero spacing

Problem:
The hero CTA overlaps the leaderboard card on 390px screens.

Expected:
CTA row wraps cleanly, no horizontal overflow.

Acceptance:
- 390px and desktop verified
- npm run check passes
- screenshot from local preview added to PR
```

Bad:

```text
Improve landing
```

## Handoff Comment Template

Use this when handing work to another teammate or their Codex:

```text
Done:
- Changed:
- Verified:

Preview:
- Local URL:
- Screenshot:

Needs next:
- 

Files touched:
-
```

## Codex Handoff Prompt

```text
Continue from PR #__ / branch __.
Read the PR comments and Linear issue first.
Do not rewrite unrelated sections.
Use https://github.com/ignacio280/machreach as reference only when needed.
Run npm run check before finishing.
Use npm run serve for local preview.
```
