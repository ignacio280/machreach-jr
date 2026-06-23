# Codex Instructions

This repo is the MachReach JR landing prototype for school students. It is separate from the main MachReach university app.

The MachReach university repo is public and may be used as a reference:

```text
https://github.com/ignacio280/machreach
```

Use the university repo to study existing visual patterns, structure, interaction ideas, and shared product logic. Keep JR implementation work in this repo unless the Linear issue explicitly says to modify MachReach university.

## Commands

- Install dependencies: `npm install`
- Build production output: `npm run build`
- Safe test build: `npm run check`
- Local preview: `npm run serve`, then open `http://127.0.0.1:8792/index.html`
- Alternate port: `node scripts/serve.mjs 8794`
- Start an issue branch: `npm run branch NUV-13`

## Linear Issue Workflow

When the user asks to work on a Linear issue, for example "Work on Linear issue NUV-13", start by creating or switching to an issue branch before editing files:

```bash
npm run branch NUV-13
```

If the prompt includes a useful short title, pass it as the optional slug:

```bash
npm run branch NUV-13 focus-guard
```

Do not make issue work directly on `main`. If the working tree has uncommitted changes, stop and ask how to handle them.

## Editing Rules

- Prefer editing the source `.jsx` files and `MachReach Landing.html`.
- Run `npm run build` when producing final landing output.
- Do not edit generated `bundle.min.js` by hand.
- Do not change the main MachReach university project from this repo.
- When using MachReach university as reference, copy intent and patterns carefully instead of blindly copying unrelated code.
- Keep copy aimed at school students, not university students.
- Avoid fake claims about prizes, rewards, schools, integrations, or paid features unless they are actually implemented.

## PR Checklist

- `npm run check` passes.
- No horizontal overflow on desktop or mobile.
- Landing copy still says MachReach JR or clearly targets school students.
- Local preview screenshot or screen recording is posted in the PR or Linear issue.
