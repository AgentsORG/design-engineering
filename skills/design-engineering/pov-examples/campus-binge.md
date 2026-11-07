---
title: pov-example-campus-binge
summary: Example pov.md forked to Campus Binge's brand — calm, green and type-led, one gradient word per headline, light only, soft layered depth, isometric stickers that play once, springs for touch, and a peer-to-peer Hinglish voice for Indian school students.
tags: [pov, opinion, customizable, campus-binge, brand]
---

# Point of View: Campus Binge (example)

> An example fork of [[pov]], kept for reference. To use it, copy this file over `references/meta/pov.md`. When the project also ships the brand's `CampusBinge.design` contract, the contract's tokens win over any value here ([[using-design-file]]).

**This install is forked to Campus Binge's brand.** Campus Binge's guide, Bingy, shows Indian school students which colleges they can get into and what to do this week to get there. The reader is a 17-year-old choosing a stream, an exam and a college, often on a cheap Android phone and stressed about rank. Where a section below contradicts a canonical node, **this file wins**. Where it is silent, canon holds.

## The stance, in one line

Calm, green and type-led: the quiet of a family-finance app with the physical press of a good button, never the noise of a coaching-centre ad.

## 1. Colour: green carries the brand, and nothing is only colour

- **Spanish Green `#019543`** fills buttons, rings, slider fills and big type. On white it is 3.89:1, so it never sets body text.
- **Deep Green `#017835`** is the green for words on white or mint (5.11:1), pressed buttons and the gradient start.
- **UFO Green `#46E67C`** is decoration and gradient ends only, never text. **Mint `#C9F7D8`** for chips and quiet moments (text on it `#01742D`); **Tint `#ECFDF2`** for page washes and the active nav.
- Text is warm grey, never near-black: headings `#3C3C3C`, body `#4B4B4B`, muted `#6B6B6B`. Hairlines `#E5E5E5`.
- `#E5484D` is for destructive actions and closed roads only, always with a word. Colour is never the only signal ([[wcag-thresholds]]).
- **Light only.** It is a brand decision, not an omission: do not author a dark mode. Tooltips, toasts and the "Soon" pill use the heading grey as small dark moments, not a theme ([[dark-mode]] does not apply).

## 2. One gradient word per headline

Each headline carries exactly one gradient word, chosen for meaning rather than position: `linear-gradient(110deg in oklab, #017835, #019543)` clipped to text. Brand greens only. Never behind body copy, never a rainbow ([[gradient-interpolation]]).

## 3. Type: Poppins speaks, Montserrat reads

- Poppins for headings, buttons and labels; Montserrat for everything people read. Both fall back to `system-ui`.
- Display Poppins 800 at `clamp(42px, 6.6vw, 84px)`, tracking −0.035em; body Montserrat 500 at 16px / 1.5; buttons Poppins 700 at 15px.
- Sentence case everywhere. Uppercase only for small Poppins 700 labels at 0.12em tracking. Numbers use `tabular-nums`. Inputs are at least 16px ([[type-scale-and-rhythm]]).

## 4. Shape and depth: soft layers on white

- Radii: chip 8, control 12, card 16, sheet 22, big 28, pill for buttons. Where `corner-shape: squircle` is supported, radii scale by 1.5.
- Depth is a soft layered shadow on white (`0 0 0 1px rgb(15 23 19 / .05), 0 1px 2px …, 0 6px 16px -8px …`), never a border change, so nothing reflows ([[shadows-whisper]]). A primary button gets one green glow underneath.

## 5. Buttons are pressed, not clicked

- Primary: Spanish Green pill, 48px tall, white Poppins 700. Hover (mouse only) mixes 10 % black in; press mixes 16 % and scales to 0.95.
- One "depth" button per coloured panel for a single commitment: white, Deep Green text, a 4px solid shadow that collapses as the button drops 4px on press.
- Labels never wrap and say what happens in the student's words: "Start my map", "Save my map", "See how it works". One primary action per view.

## 6. Motion: answer on press, springs for touch

- Press answers on press, not release: 100–160 ms ease-out `cubic-bezier(.23, 1, .32, 1)`. Menus in 260 ms, out 140 ms. Sheets rise in 500 ms on `cubic-bezier(.32, .72, 0, 1)`.
- Springs (about 7 % overshoot) for things people touch: switches, button release, reveals that rise. Ease-out for things arriving. Linear only for loops and progress ([[easing-curves]], [[spring-animations]]).
- Sections rise once on entry: 450 ms fade with a 26px rise, 80 ms stagger; headings reveal word by word, 45 ms apart, once.
- Transform and opacity only; never `transition: all`. Keyboard-opened things never animate. Dialogs scale from 0.96 and stay centred, never from the trigger ([[never-scale-from-zero]]).
- Reduced motion: no movement or scaling, short opacity fades kept, loops and idles stop ([[prefers-reduced-motion]]). Hover only under `(hover: hover) and (pointer: fine)`; nothing follows the pointer unless it is being dragged.

## 7. Stickers and the penguin carry the warmth

- Isometric block stickers (road, goal, exams, admission, study, money, work and more) for section icons, hero clusters and empty states ([[isometric-stickers]]).
- Still by default. A live sticker plays its entrance once, then idles (a slow bob, rock or breathe); it never re-enters or exits.
- Never text over a sticker or a sticker behind text; one sticker cluster per view, flanking the copy.
- The low-poly penguin is the logo mark. Use the logo files as they are: never stretched, recoloured, shadowed or set on green in colour (use the white logo on green).

## 8. Voice: a well-informed older sibling

- Peer to peer, plain, specific and kind, the way an older sibling who has been through counselling would explain it. Hinglish where students would use it.
- The words students use: "cut-off", JEE Main, NEET, CUET, JoSAA, "your map", "your road".
- Errors say what happened and what to do next. Never blame the student, never open with "Oops", never show a stack trace ([[copy-voice]]).
- Every cut-off, fee and date carries its source. Anything not live is labelled "Soon" in a dark pill and never implied to work.
- Never "Unlock your potential", "AI-powered" as a selling line, emoji-stuffed headlines, or words a student or parent wouldn't say ([[copy-tells]]).

## 9. What the brand does not override

Accessibility holds: 4.5:1 for body text, 3:1 for large text and UI, a 3px sky focus ring with a 3px offset, 44 × 44 targets ([[wcag-thresholds]], [[touch-and-focus]]). Check layouts at 320, 390, 768, 1280 and 1440px.

## Using it with the brand's contract

The brand publishes its own agent instructions at campusbinge.in/brand, and they pair with this skill: read the contract first, fetch only what the job needs, and never invent a value the contract defines ([[using-design-file]]).

| The job | Fetch |
| --- | --- |
| A question, copy, or a check against the brand | `https://campusbinge.in/landing/CampusBinge.design` alone (YAML, schema `design.v1`; follow its `agent.instructions`) |
| A page, screen, component, email or social post | The contract's tokens and components, plus logos and stickers from the hosted addresses under `assets` |
| Work inside a codebase, or offline | The agent kit, `https://campusbinge.in/landing/assets/brand/campus-binge-agent-kit.zip` (contract, logos, every sticker, the CSS and scripts it names) |
| Print, slides or files a designer opens | The SVG logos one by one: `…/assets/brand/logos/logo-color.svg`, plus `logo-black`, `logo-white`, `mark-*` and `head-*` |
| Fonts | Poppins and Montserrat from Google Fonts |

Never redraw, recolour, stretch or crop the logo. When the contract and this file disagree, the contract wins; this file only explains the taste behind it.

## Where this overrides the canonical graph

| Canon says | This fork says |
| --- | --- |
| Design light, dark and high-contrast as peers ([[contrast-and-color-scheme]]) | Light only |
| No gradient text as decoration ([[ai-default-tells]]) | Exactly one gradient word per headline, brand greens only |
| Default to no motion ([[animation-decision-framework]]) | Sections rise once and stickers play once, then hold |

## Sources

- Campus Binge brand guide, campusbinge.in/brand (read 2026-11-07): logo, colours, type, stickers, rules, in use.
- `CampusBinge.design` v1.2.1 (status lock, updated 2026-10-29), linked from the brand guide: tokens for colour, type, shape, elevation, motion, components, voice and accessibility. Values here are its values; the condensing is this graph's.
