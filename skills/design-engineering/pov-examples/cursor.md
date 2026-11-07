---
title: pov-example-cursor
summary: Example pov.md forked to Cursor's look — warm paper and warm black instead of white and black, one orange accent, ink in opacity steps, a custom grotesk with a monospace for anything the machine says, small radii, quiet motion, and light and dark as equals.
tags: [pov, opinion, customizable, cursor, developer-tools, brand]
---

# Point of View: Cursor (example)

> An example fork of [[pov]], kept for reference. To use it, copy this file over `references/meta/pov.md`. Cursor's brand page publishes logos and one naming rule, not a rulebook, so the values below are read from what cursor.com ships. Treat them as observed, not mandated.

**This install is forked to Cursor's look**: a developer tool that reads like a well-set document. Warm, quiet surfaces; one orange; type doing the work. Where a section below contradicts a canonical node, **this file wins**. Where it is silent, canon holds.

## The stance, in one line

Warm paper, warm ink and one orange: the interface recedes so the code and the agent's work read first.

## 1. Colour: warm neutrals, one accent, ink in steps

- Light ground `#f7f7f4`, cards `#f2f1ed`; dark ground `#14120b`, cards `#1b1913`. Never pure white or pure black ([[color-monochromatic]]).
- Foreground ink `#26251e`. Secondary text is the same ink at 60 %, tertiary at 40 %, borders at 10 %, mixed in oklab. Hierarchy comes from opacity steps of one ink, not from extra greys ([[palette-step-roles]]).
- One accent, orange `#f54e00`, for the thing that matters now. Tints of it (10–25 %) for selected and warning backgrounds.
- Status keeps terminal meaning: green `#1f8a65`, red `#cf2d56`, each with a 15 % tint behind.
- An agent's steps get soft, distinct hues so a timeline reads at a glance: thinking `#dfa88f`, search `#9fc9a2`, read `#9fbbe0`, edit `#c0a8dd`.
- Light and dark are equals, each designed, never one inverted from the other ([[dark-mode]]).

## 2. Type: a grotesk for people, a monospace for the machine

- CursorGothic for the interface, a display cut for headlines, Berkeley Mono (and Cursor Mono) for code, paths, commands and anything the agent outputs, EB Garamond for the occasional editorial line.
- A compact scale: 12, 14, 16, 22px for the interface; 36, 52, 72px for marketing headlines.
- Monospace is content, not decoration: use it only for things that are literally code or machine output ([[typography-humanity]]).

## 3. Shape and depth: small radii, flat cards

- Radii stay small: 2–4px on chips and code, 8px on cards and panels, a full pill only for tags.
- Depth comes from a card tone one step off the ground and a 10 % ink border, not from shadows ([[depth-and-nesting]], [[shadows-whisper]]).

## 4. Motion: quiet and quick

Ease out on `cubic-bezier(.22, 1, .36, 1)` for arrivals and keep durations short. Nothing bounces. Motion explains a state change, such as an agent step landing in the timeline, and otherwise stays still ([[animation-decision-framework]], [[easing-curves]]).

## 5. Showing the product

- Show real product surfaces: the editor, the agent panel, a diff, a terminal. Code is set in the monospace with quiet syntax colour ([[faux-ui-restraint]]).
- A diff is the story: additions and deletions in the status green and red at low tint, never loud blocks.

## 6. The mark and the name

- Call it **Cursor**, never "Cursor AI" or "Cursor Code".
- Logos come as 2D (default) and 2.5D (larger applications), in horizontal (preferred) or vertical lockups, or the cube and wordmark alone. App icons default to 2.5D; avatars default to 2D. Every variant ships in light and dark: use the official files from the brand kit, never a redrawn cube.

## Where this overrides the canonical graph

| Canon says | This fork says |
| --- | --- |
| Neutral greys from a scale ([[color-scales-oklch]]) | One warm ink in opacity steps over warm paper |
| Shadows for elevation ([[shadows-whisper]]) | Tone and a 10 % border, no shadow |

## Sources

- cursor.com/brand and its `cursor-brand-assets.zip` (read 2026-11-07): logo, app icon and avatar families; the naming rule.
- The stylesheets cursor.com serves (read 2026-11-07): theme colours, type families, radii and easing. These are observed values from the shipped site, not a published guideline.
