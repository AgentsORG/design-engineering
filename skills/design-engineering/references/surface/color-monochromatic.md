---
title: color-monochromatic
summary: Monochromatic with one or two accents beats a five-color palette. Why bright/purple gradients scream AI.
tags: [color, surface]
---

# Monochromatic palettes

A monochromatic palette — one hue across a wide range of lightness values, plus one or two true accent colors — almost always looks more considered than a five-color palette assembled from "what feels good."

## What to do

1. Pick **one neutral hue** as your base. Pure gray is fine. A subtle warm gray (slight yellow undertone) or cool gray (slight blue undertone) is better.
2. Generate **8–12 steps** of that hue from near-white to near-black. Tailwind's `slate`, `zinc`, `stone`, `gray`, and `neutral` are good starting points. Linear, Vercel, Notion all use this approach.
3. Pick **one true accent** for primary actions. Saturated, intentional. Don't dilute it across the UI — earn its use.
4. Optionally pick **one second accent** for warnings or success states. These should be subdued, not loud. If the brand accent is green, success takes a different hue, or users can't tell "primary action" from "it worked".

Three derivation rules keep the set coherent: neutrals share the brand's temperature (a blue brand wants cool greys; warm greys fight it, and an untinted `#808080` reads as placeholder); light tints come from lowering chroma in OKLCH, not lowering opacity, which greys them out; and disabled gets its own muted token rather than `opacity`, which passes contrast on one background and fails on the next ([[color-token-tiers]]).

That's it. The whole palette is ~14 tokens. Most "design systems" with 60 color tokens are overcomplicating.

## What to avoid

- **Bright purple gradients** (any of the `purple → indigo → fuchsia` variants). Universal AI tell.
- **Five-color brand palettes** with no hierarchy. Every color competes for attention; the eye finds nothing to land on.
- **Adjacent hues without intent.** Red + orange + yellow with no narrative reason is muddy.
- **High saturation everywhere.** Monochrome at 5–10% saturation reads as restrained and confident.

## When to apply

- Designing a new product UI from scratch.
- Refactoring a tokens file that has accumulated 60+ colors.
- Reviewing a landing page or PR where the team has added a new accent for "emphasis."

## Why this works

The eye can only track 2–3 colors at once. A monochrome palette gives the user a single tonal language to read; the one accent stands out by *being* the deviation. A multi-color palette dilutes attention — there's nothing to deviate *from*.

## Reference

Bad: a `linear-gradient(135deg, #7c3aed, #db2777 60%, #f59e0b)` ground, a gradient-clipped title, a lilac-tinted card and `#a78bfa` metadata: it says "generated" before a word is read.
Good: one warm neutral family and one accent, spent once. The whole set Stageshow's kit starts from:

| Role | Light | Dark |
|---|---|---|
| canvas / surface / well | `#f6f5f4` / `#fff` / `#efeeec` | `#111113` / `#1a1a1d` / `#0a0a0b` |
| text strong / text / faint | `#262628` / `#7a7a7d` / `#9a9a9d` | `#ececee` / `#9d9da1` / `#6c6c70` |
| accent (the live thing only) | `#3b82f6` | `#3b82f6` |

Gold example: `stageshow/teaching/style.tsx` (`style-purple`, with its values in `style.css`) for the pair, and `stageshow/examples/dark-bento/` for a grayscale still whose one marked row carries the story.
Check: switch the stage to grayscale (Stageshow's `palette="mono"` sends the accent and every status to `#1a1a1a`, `#f2f2f2` on dark). If the thing acted on vanishes, hue was carrying the hierarchy alone: mark it with a solid step in surface and weight, never a translucent wash.

## Gotcha

"Monochromatic" doesn't mean "boring." A monochrome palette with rich texture, considered typography (see [[typography-humanity]]), and tight motion (see [[duration-table]]) feels luxurious. A multi-color palette with bad type and bad motion feels cluttered.

See also [[dark-mode]] for the dark-mode variant of these tokens, [[ai-default-tells]] for what to remove.

## Sources

- guidelines.sh — "Monochromatic with subtle accents; avoid bright/purple gradients."
- Linear, Vercel, Notion — examples of monochrome-with-one-accent in production.
- Emil Kowalski's design-engineering practice, distilled by HKTITAN — status hue, neutral temperature, tints and disabled tokens.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/stage.css` (default light and dark tokens, `data-palette="mono"`), `stageshow/references/craft.md` (Color and looks), `stageshow/teaching/style.tsx` and `stageshow/teaching/style.css` (`style-purple`), `stageshow/examples/dark-bento/index.tsx`.
