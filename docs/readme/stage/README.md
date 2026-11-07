# README scenes

The stills in `../img/` are faux product UI built with a trimmed copy of
[Stageshow](https://github.com/benjitaylor/skills) (MIT, Benji Taylor). Each
scene is `examples/<name>/index.tsx`; `examples/_de/` holds the shared look
(`de.css`) and Claude Code's TUI marks (`claude.tsx`).

| Still | Scene | Built from |
|---|---|---|
| `de-verbs.png` | `/design-engineering help` in Claude Code | hero-demo terminal, raycast list |
| `de-install.png` | the one-line installer and its summary | hero-demo terminal |
| `de-agents.png` | design-council in Claude Code, and its file in five harnesses | static-card, hero-demo terminal |
| `de-review.png` | a review as Before (−) / After (+) / Why | ai-chat, kit `Code` diff lines |
| `de-council.png` | the Council review table, one judge by category | ai-cards, static-card |
| `de-grade.png` | grade.mjs's report card, one capped axis | static-card |
| `de-bench.png` | the 2026-09-05 bench report, one fixture | static-card |
| `pov-<fork>.png` | one reminder card per taste fork, over its product surface | overlap |
| `pov-gallery.png` | the seven forks as one bento grid, the brief labelled | bento rules, overlap |

## Re-render

Needs Node 20.19+ and Google Chrome (or `CHROME_PATH`).

```bash
cd docs/readme/stage && npm install
npm run dev &    # capture route on http://127.0.0.1:4711/?capture=<scene>
node scripts/film.mjs "http://127.0.0.1:4711/?capture=de-council" --still --pad 0 --out ../img/de-council.png
```

Check before committing a still:

```bash
node scripts/film.mjs "http://127.0.0.1:4711/?capture=de-council" --still --gate --pad 0 --out /tmp/check.png  # ends "rehearsal passed"
node scripts/layout.mjs "http://127.0.0.1:4711/?capture=de-council" --strict                                    # text fits its boxes
npm run typecheck
```

The taste scenes share `examples/_pov/` (the brief, each fork's look in
`pov.css`, the grid in `gallery.css`) and load their fonts from Google Fonts,
so render them online. Film the overview with `--select .pg`, then scale the
2x still to 1600 px wide for the README.

Stages are 800 px wide, so stills come out 1600 px wide at 2x (the
`pov-<fork>` stages are 600 wide, so 1200). The scenes are
static, so `jumps.mjs` and a film's motion checks don't apply. `node_modules/`
and build output stay untracked (see the root `.gitignore`).
