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
4. Optionally pick **one second accent** for warnings or success states. These should be subdued, not loud.

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

## Gotcha

"Monochromatic" doesn't mean "boring." A monochrome palette with rich texture, considered typography (see [[typography-humanity]]), and tight motion (see [[duration-table]]) feels luxurious. A multi-color palette with bad type and bad motion feels cluttered.

See also [[dark-mode]] for the dark-mode variant of these tokens, [[ai-default-tells]] for what to remove.

## Sources

- guidelines.sh — "Monochromatic with subtle accents; avoid bright/purple gradients."
- Linear, Vercel, Notion — examples of monochrome-with-one-accent in production.
