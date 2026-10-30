---
title: scenario-kinetic-reconciliation
summary: scenario-kinetic-film builds a beat-cut kinetic-type film as one web page, renders it with real motion blur, and generates the music, sound kit and key art through Scenario MCP. It owns the build and the paid generation loop; this graph keeps register, structure, sound placement and loudness, and its energy gates apply only inside its own register.
tags: [launch-video, companion, scenario, kinetic-type, reconciliation]
---

# scenario-kinetic-film, reconciled

scenario-kinetic-film writes a film as `spec.js`: scene blocks (`Words`, `Strike`, `Graph`, `Prompt`, `Picture`, `Logo` and others) placed on the music's beat grid, plus a palette, captions and cue list. Its engine renders that as one page that is a pure function of time, and its Python scripts render, mix and gate the result ([[film-as-function-of-time]]). Scenario MCP makes what code cannot draw: a music bed at an exact tempo, a kit of about 12 one-shot effects, and the key art the `Picture` block cuts in. Route a **beat-cut, type-led teaser or hype reel** to it when it is installed or the user names it. A HyperFrames film stays with HyperFrames and a Remotion film with cinetic: one engine per project.

## Who owns what

| scenario-kinetic-film owns | This graph owns |
|---|---|
| `spec.js`, the blocks, the engine, the render (`render.py`), the mix (`mix.py`) and `finish.py`'s gates | the register ([[launch-video-registers]]) and the beats ([[launch-video-structure]]) |
| the Scenario loop: `recommend` → `model_schema_get` → a `dry_run` price → the user's go → run → `jobs_wait` → `asset_download` | type cadence ([[launch-video-type]]), seams and cuts ([[launch-video-seams]], [[launch-video-cuts]]) |
| prompting key art and the sound kit | where sounds go, subtraction and loudness ([[launch-video-sound]], [[sound-motion-sync]]) |

## Its register is not this graph's kinetic-type row

Its references are high-energy motion-design reels: the fastest is 16 % still, has a longest still of 0.37 s, and cuts 9.1 times per 10 s (55 a minute). Kaiju Postal, its own teaser, cuts 75 a minute. That sits at or past the fast edge of this graph's **beat-cut sizzle** row (30.7 a minute, up to 60.6), not in its **kinetic type** row, whose three films median 3.3 cuts a minute. So `finish.py`'s gates (≤ 40 % still, no still over 0.6 s before the end card, median motion ≥ 2.5 px a frame) are right for that register and wrong for any other. A product-camera film is 49 % still and would fail them.

Its still share is not this graph's still share either: it counts a frame as still when under 1.5 % of a 320 × 180 frame changes, while [[launch-video-review]] counts one only when nothing visible changes. Compare its numbers with its own references only. The references are unnamed and uncounted, so quote them as "scenario-kinetic-film reports", the same qualifier [[cinetic-reconciliation]] uses.

## Where this graph's values win

| Topic | scenario-kinetic-film | This graph |
|---|---|---|
| Fades | "the tell of template motion"; only the logo card's small lines | 11 of 29 Skale and 6 of 18 acclaimed films dip or dissolve; only a dip through a ground neither scene has fails ([[launch-video-cuts]]) |
| Sound on cuts | "every cut has a sound" | subtraction punctuates: a pulled sub or a silence before a reveal in 23 of 28 Skale films ([[launch-video-sound]]) |
| Loudness | `mix.py` masters to −14 LUFS; the gate accepts −16 to −12 | a register choice; medians −18.1 and −18.4. −13 suits this register, because three of the four beat-cut sizzles sit at −12 to −13 |
| 9:16 version | the 16:9 film centred on black | re-lay it out; never crop or letterbox ([[launch-video-formats]]) |
| Type size | 300–600 px words on a 1920 frame | right for this register only; statements in the measured films are ~5 % of frame height |

## What it adds

- **Outline, then fill:** an outlined word for something not yet true fills on its beat (NO TIMELINE.).
- **Runs of beat cuts accelerate** (1, 1, 1, ½, ½, ¼ beat, then a flash), and a run can flip the ground on every cut.
- **A custom sound for the film's own joke** (a knock, a footstep, a bell) earns more than another stock impact ([[designed-sfx-anatomy]]).
- **Generated key art:** describe the composition and never ask for empty space; darken for type in the film. Inspect every picture at 100 % for real makers' marks before it goes in.

## Gotcha

Scenario runs cost money, and a failed or blocked run can still be charged. Price every step with `dry_run`, give the user the total for the whole soundtrack and picture set, and wait for a go. Take model ids from `recommend`, never from memory. If `teams_list` returns several teams or projects, ask which one to use. Never write "no watermark" when a reference image is attached: the request is blocked as watermark removal, and charged. "No text, no logos" is enough.

## Sources

- Scenario, `scenario-kinetic-film` skill (zip received 2026-10-30, no licence file: cited, never copied): `SKILL.md`, `references/method.md` §1, §5 (energy targets), `references/craft.md`, `references/sound.md`, `references/scenario-mcp.md`, `references/blocks.md`, `examples/kaiju-postal/`. Its companion skills: `npx skills add scenario-labs/skills`; its MCP server is `https://mcp.scenario.com`.
- This graph's values: `docs/research/launch-films/` (HKTITAN, 2026-09-28).
- Related: [[skill-router]], [[hyperframes-reconciliation]], [[earshot-reconciliation]].
