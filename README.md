# MachReach JR

MachReach JR is a standalone landing prototype for school students. It is separate from the main MachReach university project.

## Reference Repo

The MachReach university code is public and can be used as a reference:

```text
https://github.com/ignacio280/machreach
```

Use it to understand the existing MachReach design, interaction patterns, and shared product ideas. Do not copy changes back into MachReach university unless a Linear issue explicitly asks for that.

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

If port `8792` is busy:

```bash
node scripts/serve.mjs 8794
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
git checkout -b nuv-12-hero-copy
```

Or use the helper:

```bash
npm run branch NUV-12 hero-copy
```

Then ask Codex to work on that branch. Open a pull request when the change is ready, attach a screenshot from your local preview, and leave handoff notes in the PR or Linear issue.

See `TEAM_WORKFLOW.md` for the full Codex + Linear + local preview workflow.
