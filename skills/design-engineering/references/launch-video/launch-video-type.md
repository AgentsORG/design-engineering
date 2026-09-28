---
title: launch-video-type
summary: Film type is built per word at ~0.2 s, the newest word is marked then settled, holds run 1.15-1.5 s, and statements are set at video sizes. Cadence numbers, the slam word, stamped type moves, and who owns captions.
tags: [launch-video, typography, kinetic-type, cadence]
---

# Launch-video type

On-screen copy in a launch film is built, never faded in as a block: 27 of 29 Skale films build it per word or per letter. Step words about every 0.2 s. Mark the newest word in the accent and settle it to ink within ~0.13-0.3 s. Hold 1.15-1.5 s: Skale's median is 1.15 s after the last word lands, and acclaimed cards stay ~1.5 s in all. Set the type at video sizes. In a music-only film the type is the script, so its cadence is the edit.

This is the text-beat layer that HyperFrames' motion-doctrine route map points to but does not ship: it names a `text-beat-economics` overlay that is not in the repo. Typed prompts, the caret and agent output live in [[launch-video-ui-demo]].

## Cadence

| Measure | Skale (29) | Acclaimed (18) | HyperFrames rule |
|---|---|---|---|
| Word stagger | 0.18 s median (per-film medians 0.065-0.7, 14 films): speech-synced captions ~0.3 s, music films 0.13-0.2 s, type as the voice (T:0) 0.5-0.9 s | ~0.21 s (0.1-0.45): Figma Motion 0.17, Claude Opus 4.6 chunks 0.17-0.25, Framer 3.0 0.27-0.33, Arc on Windows 0.4-0.5 on the beat | HeyGen code staggers on any element: median 0.055 s (IQR 0.035-0.08, 86 staggers) |
| Row cascade | — | 0.15 s per item (0.083-0.25, 7 films) | total stagger ≤ ~0.5 s (motion-doctrine) |
| Typed lockup | ~17 letters/s (12-48) | typed title cards: see [[launch-video-ui-demo]] | — |
| Hold after the last word | 1.15 s (0.5-2.4, 14 films) | card or line on screen 1.5 s [1.2, 2.1] (n = 14; timed per card, not from the last word) | 3 s on screen must read in 2 s; a key element readable for ≥ ~0.3 s; each caption ≥ 0.5 s; kinetic taglines on one beat array, 1.2-1.8 s apart (under 0.8 s is frantic, over 2.5 s loses the pulse) |

Inside a HyperFrames project this cadence wins for a statement the viewer reads as it builds ([[hyperframes-reconciliation]] gives type cadence to this graph). motion-doctrine's total stagger of 0.5 s or less and HeyGen's 0.055 s median describe element cascades and seams, so don't squeeze a statement into them.

A cascade that resolves a short title card, read once it lands, can accelerate: HeyGen's variables-launch enters five words at gaps of 0.2, 0.1, 0.05 and 0.025 s and exits on the mirror (`scene-01.html` L141-175), and cut-the-curve's waterfall cut starts at 0.05 s and shrinks each gap ×0.84. In a music film the words land on the track instead: Contra × fal steps 0.135 s with a word on a hit, and Arc on Windows stamps one word per beat (~0.4-0.5 s). An even step that ignores the track reads as mechanical. HyperFrames' waterfall-entry rule starts each word within ±2 frames of the previous one settling. Anchor words travel 60-80 px over 0.16-0.20 s and normal words 40-50 px over 0.13-0.16 s, on `power4.out`, with opacity switched on by `tl.set` rather than faded; variables-launch fades each word in over 0.3 s, so borrow its gaps, not its fade. Cut cadence that accelerates the same way lives in [[launch-video-cuts]].

## Mark the newest word

15 of 29 Skale films mark it. In 10 the mark is a hue, accent to base in 0.13-0.27 s: Skale's 2025 reel, Typesafe, Aside, Taste Labs, Replit Slides, Replit Parallel Agents, Pilot Protocol, Bevel, Agent Arcade and Contra Indy. In 5 it is grey or low opacity settling to ink: T:0, Bud, Adaline, Tembo and Conduit. 7 of 18 acclaimed films do it. Granola 2.0 lands its second line pale and darkens it to brand green 0.3-0.45 s after the first, Figma Motion flips the finished line from white to orange in 1-2 frames of its 12 fps upload (~0.08-0.17 s), the Google Gemini app's glow cools to white in ~0.6 s, and Cursor 2.0's newest glyph is lighter for 1-2 frames. HeyGen's Codex replica enters each glyph in the accent and settles it to ink over 6 frames (0.1 s at 60 fps), while the glyph is still growing.

## Size and the slam

Statements sit at ~5 % of frame height (IQR 4-7 %, 19 Skale films; about 54 px at 1080). That is a caption to the UI, not a headline. HyperFrames sets video floors: full-screen headlines ≥ 60 px and body ≥ 20 px, in-feed ≥ 90 px and ≥ 32 px. It also asks for weight contrast of 300 vs 900 and display tracking of -0.03 to -0.05 em. HeyGen's FRAME-claude puts every load-bearing line at or above 1.4vw (~27 px at 1920).

One slam word appears in 6 of 29 (T:0, Replit Slides, Replit Parallel Agents, Contra Indy, Contra × fal, Bolt). It arrives at 25-61 % of frame height, against ~5 % for a statement, while its colour or focus settles. Replit Slides holds it ~7 frames (~0.23 s), then drops 5× → 1× in one frame at 6.684 s. Replit Parallel Agents steps down ~1.4× in one frame at 0.734 s. Contra × fal sharpens it for ~0.9 s, then shrinks it into the sentence in ~0.5 s (1.0 → 1.5 s). Any lateral drift keeps going through the jump.

## Faces

A neo-grotesk carries the copy in ~21 of 29 Skale films. A serif is the brand's voice in 5 (Poke × Cognition, the Poke anthology, Bud, Poke '7', MadeThis) and the AI's voice in 3 of 18 acclaimed films (Claude Opus 4.6's model name, Claude Cowork's replies, Perplexity Comet's titles). Monospace is the system voice in 6 of 29. 3 of 18 (Linear Agent, Raycast, Figma glass) show no display copy before the endcard.

## Stamped type moves

- **Scramble decode.** About 3 random states on 3-frame (0.125 s) steps (Pilot Protocol, Taste Labs). Bud dithers each word in over 0.7-1.0 s.
- **Word drum.** 0.17-0.8 s per item with the neighbours dimmed (9 Skale films).
- **Subtract to keyword.** Drop the other words in ~0.4 s, hold the keyword ~1 s, then bring its evidence in around it (Aside, Listen Labs, Replit Parallel Agents, Bevel).
- **Counter.** 1.15 s median (0.5-3.0 s, 10 timed), with increments shrinking as it rises (the tau is in [[launch-video-motion]]). Typesafe types the result on the landing frame, Pilot Protocol flashes the accent on landing, and MadeThis carries a count across a hard cut.
- **Split-flap swap** (Codex replica, 60 fps). Each old glyph squashes about its cap line through 1, .96, .85, .63, .28, 0 over 5 frames. Each new glyph grows from the baseline over 8-11 frames, dipping up to 8 px, and the slots start about 2 frames apart.

## Captions

Captions belong to HyperFrames, and its two layers disagree: the internal captions-overlay composites them over a composition centred on the true frame centre with no reserved band, while the installed frame-worker core keeps every element in the top ~83 % of the frame, even with captions off. [[hyperframes-reconciliation]] says which applies (doctrine project: the overlay; a build on the installed workflows alone, such as product-launch-video: the band). `/embedded-captions` owns the drop, rail and embed model. Frame text is short motion copy, never the narration sentence; changelog-video caps a caption phrase at ~40 display characters.

## When to apply

Use this for any on-screen copy in a launch film: statements, title cards, counters and lockups. Text transitions inside the product UI stay with [[shared-letter-morph]] and [[stagger-choreography]]. Type scale basics are in [[type-scale-and-rhythm]].

## Gotcha

A sentence faded in as one block reads as a slide. In Skale's corpus only Poke × Cognition's phrase captions arrive whole, and the other exception, Work Louder, is a CG teaser with no copy before its endcard logotype. A tracking change written as `letterSpacing` also fails HyperFrames lint (`gsap_non_transform_motion`), because reflow properties snap to whole pixels when frames are captured by seek. HeyGen's commit e7e2cb9 swapped a -0.02 → -0.015 em breath for `scaleX: 1.0123`. That keeps the line width but stretches the glyphs. HyperFrames' own gsap-transforms-and-perf.md says to animate per-glyph `x` or hold the value, and a breath on held type is idle motion anyway ([[launch-video-motion]]).

## Sources

- Skale (skale.solutions/portfolio), hand-timed by HKTITAN, 2026-09-28: Skale's 2025 reel, Typesafe, T:0, Poke × Cognition, Aside, the Poke anthology, Listen Labs, Bud, Taste Labs, Replit Slides, Replit Parallel Agents, Adaline, Pilot Protocol, Bevel, Poke '7', MadeThis, Agent Arcade, Work Louder, Contra Indy, Contra × fal, Bolt, Tembo and Conduit.
- Acclaimed films, hand-timed 2026-09-28: Granola 2.0, Cursor 2.0 and Raycast (2025), Figma Motion (2026, uploaded at 12 fps), Google Gemini app (2024, Ordinary Folk), Claude Opus 4.6 (Anthropic, 2026, BUCK per brief), Framer 3.0 (2026, maker uncredited), Arc on Windows (The Browser Company, 2024), Claude Cowork (Anthropic, 2026), Perplexity Comet (2025, Studio Freight), Linear Agent (2026) and Figma glass (2025).
- HeyGen, hyperframes-launches (Apache-2.0): `variables-launch/compositions/scene-01.html` L141-175; `codex-five-hour-limit-replica/tools/tables.json` and `compositions/lockup.html` L59-122; `claude-paper-launch/FRAME-claude.md` L371-373; commit e7e2cb9 (`hyperframes-launch/compositions/thesis.html`); the stagger census over deduplicated composition source.
- heygen-com/hyperframes (Apache-2.0), installed: `skills/hyperframes/references/frame-worker-core.md`, `skills/hyperframes-creative/references/typography.md`, `skills/hyperframes-animation/rules/kinetic-beat-slam.md` and `waterfall-entry.md`, `skills/hyperframes-animation/adapters/gsap-transforms-and-perf.md`, `skills/motion-graphics/agents/director.md`, `skills/embedded-captions/SKILL.md`. Repo-internal, and not installed by `npx skills add`: `.agents/skills/motion-doctrine`, `cut-the-curve` (§4, §6), `captions-overlay` and `changelog-video`.
- docs/research/launch-films/: tables/, notes/synthesis-skale.md (§2-§4), notes/synthesis-acclaimed.md (§1, §3-§5), and digests/heygen-corpus-stats.json.
