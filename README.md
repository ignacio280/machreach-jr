# MachReach JR

MachReach JR is a standalone landing prototype for school students. It is separate from the main MachReach university project.

## Run Locally

```bash
npm install
npm run build
npm run serve
```

Open:

```text
http://127.0.0.1:8792/index.html
```

## Project Structure

- `MachReach Landing.html` is the source shell for the landing page.
- `hero.jsx`, `features.jsx`, `sections.jsx`, `pricing.jsx`, `icons.jsx`, and `tweaks-panel.jsx` are the editable React source files.
- `build.mjs` builds `bundle.min.js` and prerenders `index.html`.
- `app.html` is the static dashboard mock linked from auth CTAs.
- `assets/` and `vendor/` contain static assets needed for the prototype.

## Team Workflow

Use one branch per task:

```bash
git checkout main
git pull
git checkout -b mjr-12-hero-copy
```

Then ask Codex to work on that branch. Open a pull request when the change is ready, share the preview link, and leave handoff notes in the PR or Linear issue.

See `TEAM_WORKFLOW.md` for the full Codex + Linear + preview workflow.
