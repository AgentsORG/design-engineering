---
title: pov-example-smash-and-clash
summary: Example pov.md forked to Smash&Clash's arena-pop look — a toy you can press, tilted candy slabs on hard navy lips, one sun-yellow primary per screen, sticker titles, game-meaning colours that never move, squash-and-pop springs, and sound with a visual twin.
tags: [pov, opinion, customizable, smash-and-clash, game-ui, brand]
---

# Point of View: Smash&Clash (example)

> An example fork of [[pov]], kept for reference. To use it, copy this file over `references/meta/pov.md`. When the project ships `smashandclash.design`, the contract wins over any value here ([[using-design-file]]).

**This install is forked to Smash&Clash**, a two-player strategy card game played in the browser and by agents through its SDK. The look is bright, tactile and high-energy, in the lobby language of mobile arena games. Where a section below contradicts a canonical node, **this file wins**. Where it is silent, canon holds.

## The stance, in one line

A toy you can press: tilted candy slabs on a hard solid lip, one sun-yellow primary per screen, on a radial sky-blue world.

## 1. Colour: navy ink, sugar surfaces, candy fills

- The world is a radial sky blue: `radial-gradient(130% 110% at 50% 0%, #0abeff 0%, #016dcb 80%)`. Light surfaces are blue-tinted sugar (`#ffffff`, `#eef6ff`, `#dcebff`).
- Ink is navy, never black: text `#0d1a4a`, muted `#22357a`. Shadows are navy too.
- Each candy fill has a highlight, a base and a lip: sun `#ffe872 / #ffc21a / #d98a00` is the primary; mint means done or on; grape means online and Mutators; sky means local, Classic and replays; gum means how to play and close; cherry means danger only.
- Text on sun, sugar, mint, sky or gum is navy; text on grape, cherry or a player plate is white. Never white text on sun, mint, sky or gum.
- **Game colours are locked.** You are blue `#2173e8`, they are orange `#f4581f`, always by viewer, never by seat. Card frames and the four value-badge colours never change ([[palette-step-roles]]).
- One theme, designed rather than inverted, plus a high-contrast theme. No dark mode ([[contrast-and-color-scheme]]).

## 2. Type: sticker display, chunky labels, plain copy

- Luckiest Guy for titles and card values; Lilita One for control labels and player names; Rubik 600 for copy, 800 with tabular figures for numbers.
- Write labels in sentence case ("Play a friend"); the display and label faces uppercase them in CSS. Never set a weight on the display or label faces.
- Sticker titles are white with a navy outline, always outlined. Every size in rem; nothing under 12px ([[type-scale-and-rhythm]]).

## 3. Shape and depth: tilt and a hard lip

- Buttons, tabs, ribbons, label plates, toasts and screen titles tilt −8°; content inside counter-tilts to stay upright. Icon buttons, chips, switches, dialogs and cards stay upright.
- Depth is a hard solid lip in the fill's darker tone (`0 6px 0`, 8px for the hero, 2px when pressed), not a blur. The one soft shadow is the cast under floating pieces ([[depth-and-nesting]]).
- Radii 12 / 18 / 26 / 34; icon buttons are rounded squares at 30 %, never circles.
- Focus is the sticker halo: a 3px white band and a 2px navy keyline, for keyboard and gamepad only ([[touch-and-focus]]).

## 4. Components: one hero, colour by meaning

- The one thing a screen wants next is the hero button: sun, 5.25rem tall, 8px lip, a shine sweep. Never a second sun on a screen, never a sun Cancel.
- Finishing an edit is mint; a place or mode wears its colour; destructive actions open a dialog with a cherry confirm; everything else is sugar.
- Dialogs put the quiet action first and focused, the verb last, and close on Esc, gamepad B or Back.
- Disabled controls dim to 50 % and say no with a sound; they never vanish.

## 5. Motion: squash on press, pop on hover

- Press 90 ms, exit 150 ms, fade 180 ms, enter 250 ms, screen wipe 560 ms. Stagger 30–45 ms, at most 8 items ([[stagger-choreography]]).
- Out `cubic-bezier(0.23, 1, 0.32, 1)` for arrivals; pop `cubic-bezier(0.34, 1.56, 0.64, 1)` for game-feel; exit `cubic-bezier(0.4, 0, 1, 1)`.
- Springs for anything a hand touches: press 0.12 s with no bounce, release 0.42 s at 0.5 bounce, stamp 0.5 s at 0.45 ([[spring-animations]]).
- Input is never blocked by an animation; a new surface is live on its first frame. Ambient loops pause while a dialog is open or the tab is hidden.
- Transform and opacity only, never `transition: all`. Reduced motion cross-fades instead of moving and keeps the focus ring ([[prefers-reduced-motion]]).

## 6. Sound: on by default, always with a visual twin

Soft rounded candy-toy pops and plinks, dry, one hit, no sharp click: tap 60 ms, place 200 ms, capture 350 ms, peaks at −3 dBFS, feedback at −18 LUFS, no more than 30 ms behind the picture. Nothing on hover alone, focus, scroll or keystrokes. Characters speak on place, capture, chain, blocked, hurt and win ([[sound-palette]], [[sound-motion-sync]]).

## 7. The cards are the heroes

Use the real character art and the real card back everywhere: never recolour, redraw, crop or caption it as your own, and never a star or blue rectangle as a stand-in back. Cards keep their 825:1125 proportion. Icons come from the house set (24-unit grid, 2.4 stroke, round caps); no emoji and no third-party icon packs ([[icon-systems]]).

## 8. Voice: a friendly game host

Short, upbeat and plain; "you" for the player and a name for the opponent, never "CPU", and never an easy / medium / hard picker. Labels keep the exact action through the flow (Resign, "Resign?", Resigned). Confirm buttons are verbs, never "OK". Errors say what happened and what to do next, in one line ([[copy-voice]]).

## Using it with the game's contract

Smash&Clash publishes `https://www.smashandclash.in/smashandclash.design` (schema `design.v1`, locked) and asks agents to save it at the client's root and install `npx skills add AgentsORG/design-engineering` for craft gaps. Its precedence is the user's prompt, then the contract, then design skills, then model defaults. A client's own flavour goes in a `<client>.design` that `extends` it and changes only what `policy.flavor.may_change` allows; card colours, you/them colours, card art and the access rules (44px targets, visible focus, AA contrast, reduced motion) are `must_keep`. Art, audio and characters stay Smash&Clash's and are credited.

## Where this overrides the canonical graph

| Canon says | This fork says |
| --- | --- |
| Subtle depth, whisper shadows ([[shadows-whisper]]) | A hard solid lip; one soft cast under floating pieces only |
| Sound is silent by default ([[sound-decision-framework]]) | Sound on by default, every sound with a visual twin |
| No overshoot in product UI ([[easing-curves]]) | Pop easing and bouncy release springs for game-feel |

## Sources

- `smashandclash.design` v1.0.0 (status lock, updated 2026-10-05) and `smashandclash.tokens.css`, smashandclash.in (read 2026-11-07): tokens, components, motion, sound, voice, constraints and the agent block. Values are its values; the condensing is this graph's.
- smashandclash.in/about and docs.smashandclash.in/build/design (read 2026-11-07).
