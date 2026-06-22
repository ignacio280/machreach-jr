# Codex Instructions

This repo is the MachReach JR landing prototype for school students. It is separate from the main MachReach university app.

## Commands

- Install dependencies: `npm install`
- Build production output: `npm run build`
- Safe test build: `npm run check`
- Local preview: `npm run serve`, then open `http://127.0.0.1:8792/index.html`

## Editing Rules

- Prefer editing the source `.jsx` files and `MachReach Landing.html`.
- Run `npm run build` when producing final landing output.
- Do not edit generated `bundle.min.js` by hand.
- Do not change the main MachReach university project from this repo.
- Keep copy aimed at school students, not university students.
- Avoid fake claims about prizes, rewards, schools, integrations, or paid features unless they are actually implemented.

## PR Checklist

- `npm run check` passes.
- No horizontal overflow on desktop or mobile.
- Landing copy still says MachReach JR or clearly targets school students.
- Preview link is posted in the PR or Linear issue.
