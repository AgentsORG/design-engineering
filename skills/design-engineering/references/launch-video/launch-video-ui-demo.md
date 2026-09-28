---
title: launch-video-ui-demo
summary: Product on screen in a launch film — rebuilt UI cropped tight, a cursor big enough to read with a visible press, prompts typed at read or recognise speed, human and agent told apart, and the agent's wait stepped or cut.
tags: [launch-video, cursor, ui-demo, typing, agents]
---

# Launch-video UI demo

In a product film the interface is rebuilt and framed tight on the control that matters, and it is driven like a character: a cursor big enough to read (oversized, or native inside a macro crop) enters from off-frame, presses visibly and causes the next beat. Type a prompt at the speed its job needs — about 15 characters a second to be read, about 50 to be recognised — and in an AI product make authorship visible: the human types with a caret, the agent streams, and the agent's wait is honest stepped state or is cut past.

## The surface

- **Rebuild, then crop.** UI is rebuilt as vector in 22/29 Skale films and 11/18 acclaimed ones. Real capture appears in 5/29 (the Poke anthology, Bud, Pilot Protocol, Wonder (second film), Bolt) and 3/18 (Granola 2.0, Cursor 2.0, Arc on Windows), plus Spline Hana's editor. HyperFrames' product-launch-video skill makes the captured page the visual source of truth for a site tour; motion there comes from overlays on the screenshot, or from rebuilding only the one component that moves.
- **Macro crops of one control** in 8/18: Raycast, Arc on Windows, Notion Mail, Notion 3.0, Figma Motion, Claude Cowork, Cursor 2.0, Granola 2.0.
- **Colour is saved for state.** Raycast floods its hotkey dialog green on save; Cursor 2.0's benchmark chart is monochrome with only the hero row in black; Linear Agent shows colour only in issue glyphs. Check the accent on its actual plate: HeyGen's green #38D878 is unreadable on cream, so their Send-to-HyperFrames film carries two greens (#2E9E5B on cream, #38D878 on dark), and when a green liquid plate dropped it to 2.19:1 the public build went back to a dark ground (4.0-7.0:1).

## Cursor or not

A cursor appears in 17/29 Skale films and 11/18 acclaimed ones. Named multiplayer cursors recur at Skale (6/29, three of them in Replit's templated series): Browserbase labels the pointer as the viewer's agent, the three Replit films run two to four named teammates who converge on the collaboration headline in Replit Canvas, Wonder (first film) names its cursor after the product, and Conduit pairs an agent cursor with a human one. Elsewhere they are rare (Framer 3.0, Figma Motion's cursor chat).

Size splits. Wonder (first film) opens on a cursor ~20 % of frame height and Figma Motion's close-ups run 15-22 %, while Cursor 2.0 keeps the native macOS pointer and cuts about 3× into the control, and Notion Mail, Notion 3.0, Arc on Windows and Figma glass (~5 % of frame height) keep a stock one.

Pointer-free films (8/29; 7/18: Linear Agent, Raycast, Claude Opus 4.6, Perplexity Comet, Google Gemini app, Material 3 Expressive, Google AI Mode) show taps as state changes: a 3-4 frame opacity dip, a check mark or a ~10 % scale-down (Poke '7', Contra Indy, Bevel), a darken or reshape with a small particle reward (Material 3 Expressive), or a touch ring (Google AI Mode).

## Cursor mechanics

HeyGen's house values (heygen-com/hyperframes `.agents/skills/oversized-cursor`, repo-internal and not installed by `npx skills add`), which their shipped launches mostly agree with:

- **Size:** 7cqw full-frame (≈134 px at 1920), 4.6-5.5cqw inside a mock, never smaller; one pointer geometry (the arrow by default; a brand motif or pointing hand when it is recognisable) and one fill per film.
- **Entry:** from below the frame (`top` 115-120 %) on one decelerating glide, 0.4-0.92 s `power3.out`. The tip, not the box centre, lands on the target, and every press pivots on it.
- **Press:** scale 0.84 over 0.1 s `power2.in`, back to 1 over 0.22 s `power2.out` (1:2); the target dips to 0.94 in its own tween on the same frame, and a cursor-only tap, such as focusing an input, gets no target reaction. Across HeyGen's cursor-press tweens, 43 use 0.84 and 17 use 0.90.
- **Between beats:** it drifts aside over 0.5-0.9 s during beats it does not own — never frozen on the action, never wobbling.
- **Exit:** off the nearest edge (`power2.in`, 0.5-0.7 s) or as the carrier of the next seam ([[launch-video-seams]]); never faded or masked out in place (a standing direction in the Send-to-HyperFrames handoff §8; figma-launch act11 parks its cursor, then exits it off the bottom).

HyperFrames' distributed physics-press-reaction rule differs on nearly every value: a 48-96 px cursor at 1080p, a 0.7-1.3 s `power2.inOut` approach, cursor and button pressed together to 0.90 and sprung back on `back.out` over 0.4-0.7 s. Inside a project, the doctrine values above win ([[hyperframes-reconciliation]]).

## Press, then consequence

10/29 Skale films show the press for 2-4 frames (up to 0.4 s) before its consequence: Skale's 2025 reel, Aside, Bud, Replit Slides, Replit Canvas, Poke '7', Wonder (second film), Contra Indy, Contra x fal, Bolt. Nothing starts on its own; the click causes it. HeyGen's doctrine starts the effect on the click frame (motion-doctrine's causal motion), while these Skale films let the press read first. Inside a HyperFrames project, use the doctrine's same-frame start. A cut to the consequence can land later ([[launch-video-cuts]]); the click's transient sits where the press bottoms out (0.1 s into the press, the frame its release begins), not on the press's first frame, where HeyGen cues it ([[sound-motion-sync]]).

## Typed prompts

| job | speed | evidence |
|---|---|---|
| read: the prompt carries the argument | 15 c/s median [13, 21], range 7.5-33 (n = 9) | Google Gemini app 7.5, Raycast 10, Linear Agent 10 and 20, Notion 3.0 12-15, Granola 2.0 13, Notion Mail 17-26, Cursor 2.0 20, Framer 3.0 21, Figma Motion 33 |
| recognise: the viewer needs only its shape | ~53 c/s median, range 20-150 (7 films) | Skale |
| copy as prompt, title cards | 40-65 c/s | Cursor 2.0's cards; Perplexity Comet 40-60 |

Derived, not measured: a prompt to be read needs about characters ÷ 15 seconds of typing, then the 1.15-1.5 s hold from [[launch-video-type]] — a 33-character prompt types for ~2.2 s. Keys land unevenly. HeyGen's claude-paper-launch reveals its prompts at 0.04 s per character on average (about 25 c/s); the first runs on weighted steps, slower at the ends, with extra time after spaces and punctuation and a small sine jitter. Its typing ticks fall about one per three characters, 0.117 s apart on average with sd 34 ms (about ±30 %), range 0.07-0.26 s; [[sound-from-motion]] turns that spread into a type run's jitter.

At large type the camera follows the caret (Replit Canvas, Contra x fal, Aside); Notion 3.0 types at ~20 % of frame height with the caret held at the right third, and Notion Mail macro-types, then pulls out in ~0.25 s to show what the command opened.

## Who is speaking

9/18 acclaimed films separate human from agent, all among the 13 AI-product films: by speed (Framer 3.0: the human at 21 c/s under a named cursor, the AI at 160 c/s after a 0.9 s thinking state), by behaviour (Linear Agent: the human at 10-20 c/s with a caret, the agent's rows resolving from blur ~0.25 s apart) or by typeface (Claude Cowork: a serif agent with no container, a sans user in grey pills). Skale names the agent's cursor instead (above).

## The wait

8/13 AI films put the latency on screen as a state, and the honest ones step and move only while the agent works: Claude Cowork's text shimmer and pulsing spark; Notion 3.0's counter stepping 1 → 61 every ~0.25 s with status pills flipping every 0.167 s; Google AI Mode's status log at ~1.3 s per stack; a thinking state of 0.8-1.4 s in Figma Motion, Framer 3.0 and Granola 2.0. The alternative is to cut past it, as Linear Agent does, opening on the prompt already posted and the answer half a second later ([[launch-video-cuts]]).

## Across scenes

A persistent interface is continuous by construction: the last settled frame of scene N is the first of scene N+1, with cursor targets read from live geometry (HeyGen's cloud-render-launch holds ≤0.5 px drift across 4 chat seams). Nested demos are authored at 1× and played at an inner timeScale of 2.0-2.56, so a feature beat shows for 2.0-2.6 s (pr-to-video-launch).

## When to apply

Any film that shows a product surface, a cursor or a prompt, including the payoff beat before the endcard ([[launch-video-structure]]). Loading states inside the product itself follow different rules ([[empty-loading-states]]).

## Gotcha

A native-size pointer on a wide, full-frame shot vanishes in a feed: go to 7cqw, or crop in until it reads, as Cursor 2.0 does. A cursor that freezes while the UI animates, or fades out mid-frame, breaks the character. Skale's ~53 c/s copied into a film whose prompt carries the argument leaves the viewer reading the caption instead. A spinner looping through a hold is decoration: the wait must step or be cut.

## Sources

- Skale (skale.solutions/portfolio): Skale's 2025 reel, Browserbase, Replit Slides, Replit Canvas, Replit Parallel Agents, Wonder (first and second films), Conduit, Poke '7', Contra Indy, Contra x fal, Bevel, Bud, Pilot Protocol, Bolt, Aside, the Poke anthology; measured by HKTITAN 2026-09-28.
- Acclaimed films, measured 2026-09-28: Raycast (2025), Cursor 2.0 (2025), Linear Agent (2026), Framer 3.0 (2026, maker uncredited), Figma Motion (2026), Figma glass (2025), Notion Mail and Notion 3.0 (2025), Claude Cowork (Anthropic, 2026), Granola 2.0 (2025), Arc on Windows (The Browser Company, 2024), Spline Hana (2025), Claude Opus 4.6 (Anthropic, 2026), Material 3 Expressive (Google Design, 2025), Google AI Mode (2025), Google Gemini app (2024), Perplexity Comet (2025).
- Data: `docs/research/launch-films/` (tables/, metrics/, notes/synthesis-skale.md, notes/synthesis-acclaimed.md, digests/).
- HeyGen, hyperframes-launches (Apache-2.0): claude-design-send-hyperframes-launch/HANDOFF.md §8 and README.md; figma-launch/HANDOFF.md (act11); cloud-render-launch/HANDOFF.md §3-4; pr-to-video-launch/compositions/feature-*.html; claude-paper-launch/compositions/chat-response.html L325-341 and followup-type.html L380 (prompt reveal) and index.html L168-240 (the typing-tick SFX lane); the tween census of cursor press scales (docs/research/launch-films/digests/heygen-launches.json, from heygen-corpus-stats.json).
- heygen-com/hyperframes (Apache-2.0): .agents/skills/oversized-cursor/SKILL.md and .agents/skills/motion-doctrine/SKILL.md (internal); skills/hyperframes-animation/rules/physics-press-reaction.md; skills/product-launch-video/SKILL.md (capture).
