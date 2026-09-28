---
title: hyperframes-reconciliation
summary: Where this graph and HyperFrames give different values for a launch film (seam eases, zoom-through, springs, crossfades, idle motion, blur, cursor, captions, clip timing, sound) and which value to use inside a HyperFrames project.
tags: [launch-video, hyperframes, precedence, companions]
---

# HyperFrames reconciliation

Inside any HyperFrames project the seam stamp's values win for seams and seam eases: where the repo-internal doctrine is installed, seam-stamp.mjs writes them and the seam gate verifies them; where it is not (the default after `npx skills add`), write them by hand from the values below. This graph owns what HyperFrames does not measure: the register, the film's structure and type cadence, and the sound and its sync. Where the two give different values, the table below names the one to use, so an agent never gets two answers.

## Precedence

User prompt → `.design` / `frame.md` → HyperFrames' motion-doctrine (repo-internal) for seams → HyperFrames' distributed skills for build mechanics → this graph for register, structure, type cadence and sound → model defaults. Where HyperFrames' two layers disagree, the internal doctrine is the stricter one, and it declares that it supersedes upstream motion guidance. [[skill-router]] sends a film to HyperFrames' front door, and this node settles the numbers once you are there. Where a table row names a value, the row overrides this chain.

## Where the doctrine lives

- **Internal.** motion-doctrine, cut-the-curve, seam-craft, oversized-cursor, captions-overlay and changelog-video sit under `.agents/skills/` in heygen-com/hyperframes with `metadata.internal: true`. `npx skills add` skips them, even with `--all`. Install them with `INSTALL_INTERNAL_SKILLS=1 npx skills add heygen-com/hyperframes`, or clone the repo and use its `.agents/skills/` (mirrored in `.claude/skills/`).
- **Distributed.** Installers get the core set, including hyperframes (the front door), hyperframes-core, hyperframes-animation, hyperframes-creative, hyperframes-audio and media-use; the front door installs product-launch-video (PLV), motion-graphics and general-video on first use. hyperframes-media no longer exists (media-use absorbed it), though changelog-video still cites its old path.
- **Missing.** motion-doctrine's route map names two overlays, `text-beat-economics` and `brand-faithful`, that are not in the repo; [[launch-video-type]] covers the first. Check `.agents/skills/` before citing any doctrine rule.

## The table

The graph column is owned by [[launch-video-motion]] (eases, overshoot, idle motion, blur, exit ratios), [[launch-video-seams]] (zoom-through, ledger) and [[launch-video-cuts]] (the crossfade dip).

The stamp's values, for any row that names the stamp. Lateral: exit `power3.in` 0.34 s to 12 % and 0 opacity, entry `power4.out` 0.42 s from 10 % at 0.35 opacity. Z: exit `power3.in` 0.21 s to 1.18 (push) or 0.8 (pull) with a linear fade to 0 on its own tween, entry `expo.out` 0.5 s from 0.78 or 1.25 at 0.15 opacity, 18 px blur on both sides, or 10 px when the subject is text (seam-stamp.mjs).

| Topic | This graph | HyperFrames distributed | HyperFrames doctrine | Use inside a project |
|---|---|---|---|---|
| Arrival and seam eases | exponential settle, tau sized to each move | `power3.out` house default | seams `power4.in` / `power4.out`, Z seams `power3.in` / `expo.out`; `seam-stamp.mjs` writes `power3.in` on lateral exits, though the SKILL text says `power4.in` | the stamp's eases for seams; the graph's settle only for hand-authored moves inside a shot |
| Zoom-through | out 1 → 1.2, in 0.75 → 1 (2.4.0's 1.18 / 0.92 is retired: that entry could not match the exit's speed) | PLV registry: out to 2.5, in from 0.5, 0.4 s | cut-the-curve 1.2 / 0.75; the stamp 1.18 / 0.78 | the stamp; registry values only as a PLV `transition_in` |
| Overshoot | a register; zeta 1/3 only for the bouncy sting | `springEase` damping 1.0 by default, 0.80-0.85 for an iOS feel, 0.60-0.70 only when playful; motion-graphics' vocabulary still lists `bounce_in` and `back.out(2.2)` | bounce and elastic forbidden; `back.out(1.4-1.7)` allowed on an entry | critically damped by default; zeta 1/3 only when the brief names the sting; never on a camera |
| Crossfade | two opaque scenes crossfaded show whatever lies beneath at the midpoint (the dip law); seamless only over an opaque ground both scenes share ([[launch-video-cuts]]) | `transition_in` defaults to `crossfade`, `blur-crossfade` when backgrounds clash | never: a crossfade has no carrier | doctrine project: never; a build on the installed workflows alone (product-launch-video, general-video, motion-graphics): `crossfade` only when both frames share one ground and `#root` is that colour; across different grounds, `cut` on the palette change, not `blur-crossfade` |
| Idle motion | nothing decorative on a UI object; camera creep that continues the entry is fine | jitter allowed (scale 0.008-0.015, y 2-3 px, period 1.5-3 s); no pan or push in a scene's back half | idle sine loops banned; fill the time with story | no jitter on UI objects; creep only as the entry's continuation |
| Blur | derived; peaks of 10 px on text, 18-20 px on surfaces | `techniques.md` and `beat-direction.md` use 30 px with a 1.0 s `power2.out` entry | matched fixed peaks (10 / 18-20 px) on the motion's own eases, opacity on its own linear tween | cut-the-curve's values; set `blur: 10` on a text-scale Z row in `ledger.json`, since the stamp defaults to 18 |
| Cursor size | 7cqw, per [[launch-video-ui-demo]] | `physics-press-reaction`: 48-96 px at 1080p | `oversized-cursor`: 7cqw (~134 px at 1920) full-frame | 7cqw |
| Captions | routed, not owned | frame-worker core keeps content out of the bottom ~17 % | `captions-overlay`: an overlay, composition centred on the true centre, caption line in the bottom ~5-8 % | doctrine project: the overlay; a build on the installed workflows alone: the frame-worker band in product-launch-video and general-video, which their workers check; motion-graphics reserves no band |
| Ledger | typed rows; a morph names its carrier | none | `ledger.json` rows typed cut, match-cut or morph; `seam-gate.mjs verify` must exit 0 | the same schema; run the gate when it is installed |
| Exit vs entry | 36-82 % of the entry, by seam type | entry ~0.4 s, exit ~0.25 s (hyperframes-creative) | exit ~75 % of the entry; the stamp 0.34 / 0.42 s lateral, 0.21 / 0.5 s on Z | the stamp |
| Hidden initial state | 2.4.0's CSS-hidden start, and its reason, retired | entrances are `fromTo` with explicit from-states, never a CSS-hidden start | a stamped zero-duration `tl.set` renders at build, so a later entry without `immediateRender: false` tweens 0 → 0 (changelog build-spec) | `fromTo` with explicit from-states; `immediateRender: false` on any entry after a stamped set; a CSS base only on a wrapper |
| Clip boundaries and length | 2.4.0: boundaries just below the frame time (1.166, 01-ui-sting's README) and a pad on every short sub-composition timeline (hyperframes-launch HANDOFF) | hyperframes-core: the host clip's `data-duration` is the visible window; a shorter timeline holds its last frame | `data-start` = the cut time, never earlier, with the stamped `tl.set` there | one cut value for the ledger, `data-start` and the `tl.set`; write a repeating 30 fps frame time rounded down (1.166, not 1.1667); no pad on the current runtime, but keep a template's pads when it pins an older CLI |
| Sound | a derived stem; its structure placed on the picture | PLV retrieves a stock bed by mood at volume 0.12 under a voice (0.9 without) and fetches named SFX per beat | the voice-over's real word timings set scene times | the VO's word timings set scene times first (doctrine); then lock picture, and the graph owns the rest: place a retrieved bed's drop and gaps ([[launch-video-music]]); measure and trim every SFX onset ([[sound-motion-sync]]) |
| Audio lead | audio never leads the picture ([[sound-motion-sync]]) | motion-graphics' director anticipates beats by ~0.1 s | none | read it as the picture leading the beat; audio never leads |

## When to apply

Any HyperFrames project, and any time a HyperFrames skill and this graph give different numbers for the same move.

## Gotcha

HyperFrames' two layers also disagree with each other: crossfade by default against never, jitter against no idle motion, a caption keep-out band against an overlay. Check which layer is installed before quoting either, and never average them; a zoom entry halfway between 0.5 and 0.75 is nobody's value. The doctrine was read at HEAD on 2026-09-28 and is internal, so it changes without a release; re-read the named file before relying on a row.

## Sources

- heygen-com/hyperframes (HEAD 2026-09-28, Apache-2.0), internal: `.agents/skills/README.md`; `motion-doctrine/SKILL.md`, `references/seam-gate.md`, `scripts/seam-stamp.mjs`, `scripts/seam-gate.mjs`; `cut-the-curve/SKILL.md`; `seam-craft`, `oversized-cursor`, `captions-overlay`; `changelog-video/references/build-spec.md`.
- heygen-com/hyperframes, distributed: `skills/product-launch-video/references/motion-language.md`, `story-design.md`, `cut-catalog.md`, `scripts/lib/transitions.json`, `scripts/lib/bgm-volume.mjs`; `skills/hyperframes-animation/adapters/gsap-easing-and-stagger.md`, `rules/spring-pop-entrance.md`, `rules/sine-wave-loop.md`, `rules/physics-press-reaction.md`, `rules/3d-camera-flight.md` and `rules/multi-phase-camera.md` (no spring on a camera), `techniques.md`, `transitions/TRANSITION-REGISTRY.md`; `skills/hyperframes-creative/references/motion-principles.md`, `beat-direction.md`; `skills/hyperframes-core/references/sub-compositions.md`; `skills/hyperframes/references/frame-worker-core.md`, `skill-lifecycle.md` (core set eager, workflows on first use); `skills/motion-graphics/references/motion-vocabulary.md`, `agents/director.md`.
- HeyGen, hyperframes-launches (Apache-2.0): `heygen-apple-motion/01-ui-sting/README.md` (the 1.166 boundary rule), `hyperframes-launch/HANDOFF.md` (runtime once stripped sub-composition `data-duration`), `figma-launch/HANDOFF.md` (a `fromTo` applies its from-state at build unless `immediateRender: false`), and `*/package.json` (CLI pins 0.6.75 to 0.8.26).
- The full digest and conflict list: `docs/research/launch-films/digests/hyperframes-doctrine.json`.
