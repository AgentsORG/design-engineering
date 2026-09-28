---
title: launch-video-seams
summary: What crosses a scene change in a launch film — the vector law, one current per film, measured carriers, a seam budget, and a typed seam ledger.
tags: [launch-video, seams, carriers, ledger, hyperframes]
---

# Launch-video seams

A seam reads as one move when the outgoing element is still travelling on the cut frame and the incoming one carries on along the same axis, in the same direction, at the same speed. For a `cut` seam (cut-the-curve, a zoom-through) HyperFrames' vector law puts the cut mid-motion on both sides. What fails in every register is the static cut: the outgoing scene has settled, and the incoming one starts from rest and then waits. A cut to a still, readable frame that acts within a beat is not static (though inside a HyperFrames project the gate still wants a `cut` row's entry in flight), and neither is a morph whose carrier moves from the boundary. Morph-only continuity is a continuity choice, not a register and not the rule; hard cuts, including the cut to a still frame, live in [[launch-video-cuts]].

Most launch films cut, and [[launch-video-cuts]] has the rates. The zero-cut ones are morph chains, where carriers do all of this work: Skale's Listen Labs, Replit Parallel Agents and Adaline; Granola 2.0 (wipes and cross-blurs); Google AI Mode (one drawn line, 0 cuts in 97 s); and HeyGen's four heygen-apple-motion templates. This repo's own launch film (`docs/demo/hyperframes/`) is not one: of its eight seams, three are carrier morphs and five are cuts, hidden in a fill, on a constant ground, or on a palette flip.

## The vector law

- **For a `cut` row (motion-doctrine's vector law): same axis, same direction, matched speed, mid-motion on both sides.** x stays x and Z stays Z; nothing mirrors. The exit is still moving on the last frame and the entry is already moving on the first.
- **Z is a sign.** Growing is a push, shrinking a pull. An exit of 1 → 1.2 is answered by an entry of 0.75 → 1, an exit of 1 → 0.8 by 1.25 → 1. The sign also binds the incoming scene's own entrances for about 0.5 s after the cut: hold its first frame composed, or match the sign.
- **One current per film.** Every ordinary seam runs one dominant direction (HyperFrames' house default is leftward). The other vectors are reserved and mean something when spent: up for a conclusion rising, Z-back for an arrival, a scale-burst for leaving a world. Two opposing seams in a row need a visible cause (a click, an impact) or a chapter break. `figma-launch`'s standing rule is that zoom runs one way across a run of cuts: it climbs 1.32 → 4.4 over 9 hard cuts and never pulls back.
- **Match velocity on the rendered frame, not the ease derivative.** For a power4.out entry of X px over D s at f fps, frame 0 shows a mean velocity of X·(1 − (1 − 1/(f·D))⁴)·f. Answering a −1058 px/s exit with D = 0.46 s at 24 fps needs X = 139 px; the derivative says 122, which reaches only 87.5 %. The word-by-word leftward seam in `claude-design-send-hyperframes-launch` shipped 99.6 % matched.
- **A camera move across a cut runs on one clock** that both scenes evaluate over the same master-time window. In the same film, a tween that simply ended at the out-point would leave scene 1 at scale 1.171 and open scene 2 at 1.210, a one-frame reversal. The shipped pull (1.30 s, running 0.86 s past the cut) reads 1.42 → 1.3613 → 1.3423 → 1.0 with 0 reversals.

## Carriers

| Seam | Parameters | Seen in |
|---|---|---|
| **Fill the frame** | a button, circle or shape fills the frame and its colour becomes the next ground; cut on the full-fill frame; 0.33 s median (0.12-1.2 s, 16 timed). The button just pressed filling or circle-wiping in 0.27-0.35 s is the click as seam. A circle fill that inverts the ground marks an act break (Adaline) | Skale 15/29, acclaimed 6/18 |
| **Zoom-through** (forward) | exit 1 → 1.2 plus blur (10 px on text, 18-20 px on full-frame surfaces), power3.in 0.18-0.22 s, opacity to 0.15 on its own linear tween; hard swap; entry from 0.75 at 0.15 opacity, expo.out 0.5 s | HeyGen `texture-launch-video`, `inspector-launch`, `frame-md-launch-storyboard` |
| **Inverse zoom** (arrival only) | exit 1 → 0.8, entry 1.25 → 1, same blur, eases and swap | payoff beats; `claude-paper-launch` seams 3, 4 and 6 and `spacex-launch` seam 3, plus both projects' outros |
| **Zoom into type, a glyph or a mark** (a world change) | letters grow 4-6× until they fill the frame and land on a clean ground; 0.33 s median (0.2-0.55 s, n = 11); the Google Gemini app puts most of the scale in the last 0.15 s. The Codex replica dives 1× → 61× in ~1.1 s about its `_` glyph | Skale 10/29; acclaimed 4/18 into a glyph or mark (Google Gemini app ~0.4 s, Perplexity Comet ~0.35 s, Apple Liquid Glass's lens 0.8 s, Figma Motion into a flower head) |
| **Cut the curve** (lateral) | ~12 % of frame travel (~230 px at 1920); exit power4.in 0.2-0.4 s with its fade done by 25-30 % of the travel; entry power4.out, at least as long, igniting at 0.35 opacity; optional blur 8-10 px. `texture-launch-video` throws −220 px in 0.11 s on power3.in, then enters 140 px in 0.16 s on expo.out: the ease derivatives meet at ~6,000 px/s, but 30 fps frames average ~4,400 and ~3,200 px/s, so check the match on frames | HyperFrames' default boundary |
| **Shared element, one carrier** | a lower third becomes a diagram node (Browserbase); a circle → pill → progress bar → chart bar in ~2 s (Listen Labs); a brand shape as matte, portal or wipe (the Poke anthology, Bud, Taste Labs, Agent Arcade, Bolt, MadeThis); one object through the whole film (Perplexity Comet's sphere, Google AI Mode's line, Framer 3.0's neon line, Notion Mail's plane: 4/18) | Skale 13/29 dock, 6/29 brand shape as matte or portal; acclaimed 13/18 |
| **Collapse to a carrier dot** | swell 1 → 1.055 (0.38 s), collapse to 0.03 turning 28° (power2.in 0.40 s, still contracting at the swap), the dot holds 2 frames, the next object grows 0.55 → 1 from it (power3.out 0.45 s): a sign flip the dot licenses as its cause | heygen-apple-motion 04-generate-reel |
| **Conveyor, crane** | rows surface low, ride up on a long deceleration and accelerate off the top; one step per beat in Poke '7' (0.98 s steps, each settling in ~0.7 s) | Skale 12/29 |
| **Kept from 2.4.0** | edge-on collapse (scaleX → 0.02, the next surface unfolding 0.03 → 1 on the same axis); centre mask-open 0.04 → 1 in ~0.6 s and recede 1 → 0.82 with 14 px blur in ~0.32 s; explode-out to scale 1.55, blur 18 px, opacity 0 (power2.in 0.34 s) | HeyGen 03-message-sting, sfx-music-launch |

Inside a HyperFrames project the values `seam-stamp.mjs` writes win over this table (1.18 / 0.78 on Z, `power3.in` on lateral exits with the fade on the same tween); [[hyperframes-reconciliation]] lists them. The stamp gives morph rows visibility sets only, so author the carrier by hand.

## Which seam when, and the budget

- An unfinished phrase or a run of cards: cut the curve, in the current.
- A state change (hook to context, chapter to chapter): zoom-through, per product-launch-video's cut-catalog. motion-doctrine reads a forward zoom as going deeper into the same thought, and inside a project it outranks the catalog.
- An arrival or a payoff: the inverse zoom, and only there.
- A product action: the cut on the click ([[launch-video-cuts]]), or the pressed button filling the frame.
- An act break: a fill or a dip through a shared ground (Adaline's inverting circle, Poke '7''s one dip to white). Extend's three brand-colour dips show the same dip used as an ordinary seam.

Use 2-3 seam types per film, one of them primary for 60-70 % of scene changes; hand-authored morphs don't count against that. Zero overlap: a `tl.set` kills the outgoing element on the cut frame, so exactly one side is visible per frame.

## The ledger

Write one row per seam before the timeline, typed `cut`, `match-cut` or `morph`. A `cut` row carries `exit` and `entry` objects, each `{selector, axis, dir}` (x −1 leftward, y −1 upward, z +1 push, z −1 pull; optional `dur` on each, `travel` on a lateral entry, `blur` on a Z row), whose axis and dir must match; it needs an exit still moving and an entry already in flight. A `morph` or `match-cut` row carries a `carrier {out, in}` whose rects agree within 12 px of centre and 5 % of size at the cut ± 1 frame; its motion may start at the boundary. 2.4.0's `dir: 0` rows described no vector at all; a seam like that is a morph. Two rows from this repo's film:

```json
{ "fps": 30, "seams": [
  { "id": "name → motion", "cut": 9.9, "type": "cut", "technique": "zoom into a glyph",
    "exit": { "selector": "#s3-cam", "axis": "z", "dir": 1 }, "entry": { "selector": "#s4-cam", "axis": "z", "dir": 1 } },
  { "id": "cta → endcard", "cut": 30.2, "type": "morph", "technique": "collapse to a carrier dot",
    "carrier": { "out": "#s7-dot", "in": "#s8-dot" } } ] }
```

Typing it is not passing it: 2.4.0's demo typed its edge-on collapse as a morph whose rects shared neither a centre nor a width, and the gate fails that until the unfold starts from the collapse's rect. The 2.6.0 film puts each carrier on the pixel it hands over (the dot sits at (858, 528) on both sides of the cut, the camera's creep included). A row that mismatches is a plan bug, not an easing bug, and any edit to a scene's first or last ~1 s re-opens its seam. HyperFrames' `seam-stamp.mjs` writes seams from this ledger and `seam-gate.mjs` verifies them, but both sit in its repo-internal doctrine, which `npx skills add` does not install ([[hyperframes-reconciliation]] says how to get it).

## When to apply

Any multi-scene composition: launch films, sizzles, README films. The register sets the cut rate ([[launch-video-registers]]), and a zero-cut morph chain can sit inside several registers; a re-branded template keeps every seam in its slots ([[launch-video-structure]]); seams are checked on the render at native fps ([[launch-video-review]]). Motion inside a shot is [[launch-video-motion]]. Product UI transitions stay with [[fly-not-teleport]] and [[cross-blur-transitions]].

## Gotcha

The commonest seam error is a pull answered by a push: a receding exit followed by an entrance that grows from small, which is what most frameworks do by default. The 2.4.0 demo's dock seam (exit z −1, entry z +1) was one; the 2.6.0 film's Z seam pushes on both sides (1.04 → 30 out, 0.78 → 1 in). Match the scale sign, or hand across a carrier whose rects agree.

## Sources

- heygen-com/hyperframes (HEAD 2026-09-28, Apache-2.0): `.agents/skills/motion-doctrine/SKILL.md` (Part 1, the current, carriers, the seam gate, the 2-3 transition budget), `references/seam-gate.md`, `scripts/seam-stamp.mjs` L85-118, `scripts/seam-gate.mjs` L40-44 and L495-512; `.agents/skills/cut-the-curve/SKILL.md` §1-3 and its catalog; `skills/product-launch-video/references/cut-catalog.md` (which seam when); `skills/hyperframes-animation/transitions/overview.md` (one primary for 60-70 %).
- HeyGen, hyperframes-launches (Apache-2.0; 20 project folders, 23 films counting the four apple-motion templates separately): `claude-design-send-hyperframes-launch/HANDOFF.md` §4, §6d, §11.1, §12.2; `claude-paper-launch/index.html` L273-322 and `compositions/outro.html`; `spacex-launch/index.html` L97-104 and `compositions/outro.html` L71-81; `texture-launch-video/index.html` L1892-1945 and L2008-2128; `inspector-launch/index.html` L2597-2598 and L3247-3308; `frame-md-launch-storyboard/HANDOFF.md` (zoom-through); `figma-launch/HANDOFF.md` (act table, standing rules); `heygen-apple-motion/03-message-sting/README.md` and `index.html` L340-345, `04-generate-reel/index.html` L256 and L288-297 and `ledger.json`; `sfx-music-launch/STORYBOARD.md` (seam grammar) and `index.html` L122-131; `codex-five-hour-limit-replica/STORYBOARD.md` beats 8-9.
- Skale (skale.solutions/portfolio), measured by HKTITAN 2026-09-28: Listen Labs, Adaline, Replit Parallel Agents, Browserbase, the Poke anthology, Poke '7', Bud, Taste Labs, Agent Arcade, Bolt, MadeThis, Extend and the rest of the 29; counts in `docs/research/launch-films/notes/synthesis-skale.md`.
- Google Gemini app (2024, Ordinary Folk), Google AI Mode (2025, Ordinary Folk, inferred), Perplexity Comet (2025, Studio Freight), Apple Liquid Glass (2025), Figma Motion (2026), Framer 3.0 (2026), Notion Mail (2025), Granola 2.0 (2025), measured 2026-09-28; counts in `docs/research/launch-films/notes/synthesis-acclaimed.md`.
- This repo's launch film, `docs/demo/hyperframes/ledger.json`: eight typed seams (2.6.0); the 2.4.0 demo's rows are at commit 8653a1c.
