# Team Workflow

This repo is set up so each teammate can use their own Codex without stepping on anyone else's work.

## Source Of Truth

- GitHub repo: source of truth for code.
- Linear: source of truth for tasks.
- Pull requests: source of truth for review and handoff.
- Local preview: each teammate runs the page on their own computer.

## Normal Flow

1. Create a Linear issue with a clear task.
2. Create a branch named after the issue:

```bash
git checkout main
git pull
git checkout -b mjr-12-fix-mobile-hero
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
MJR-12: Fix mobile hero spacing

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
Run npm run check before finishing.
Use npm run serve for local preview.
```
