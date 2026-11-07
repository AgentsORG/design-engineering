---
title: pov-example-aave
summary: Example pov.md forked to Aave's look — a friendly ghost on calm warm-white surfaces, one soft periwinkle purple used in steps, a near-black warm dark, Geist Mono for numbers and addresses, small radii, swift easing, and a mark treated with care.
tags: [pov, opinion, customizable, aave, defi, brand]
---

# Point of View: Aave (example)

> An example fork of [[pov]], kept for reference. To use it, copy this file over `references/meta/pov.md`. Aave's brand page publishes logo rules, a two-colour primary palette and a brand kit; the remaining values are read from what aave.com ships and are marked as observed.

**This install is forked to Aave's look**: a decentralised finance protocol that feels approachable rather than technical. Calm surfaces, one soft purple, and a ghost who keeps it friendly. Where a section below contradicts a canonical node, **this file wins**. Where it is silent, canon holds.

## The stance, in one line

Money software that feels friendly: warm-white calm, one periwinkle purple, and a ghost that never looks scared.

## 1. Colour: one purple, used in steps

- The brand purple is the ghost's colour, `#9391f7` in the official logo files; the site's primary is the neighbouring `#978eff`, with a ladder of tints from `#bcbbff` and `#d0ceff` down to `#e5e5ff` for fills and selected states ([[palette-step-roles]]).
- A richer `#8075ff` for pressed and emphasised states; never a second unrelated accent.
- Dark is a warm near-black, `#201d1d`, never pure black. Light grounds are warm whites: `#fafaf9`, `#f7f6f6`, panels `#fbfbfb` (observed).
- GHO, Aave's stablecoin, carries its own green `#28d358`; keep it for GHO alone.
- Contrast first: the brand asks for colours with adequate contrast, and soft purple on white fails for body text, so purple fills and large type only ([[wcag-thresholds]]).

## 2. Type: a quiet sans, a monospace for money

- A neutral system-style sans for the interface; Geist Mono for amounts, rates, addresses and anything a user might copy (observed).
- Numbers are content: tabular figures, aligned decimals, units set quietly beside them ([[typography-humanity]]).
- Never pair another typeface with the ghost as a wordmark.

## 3. Shape, depth and motion

- Small radii (4–8px on controls), 24px on large cards, circles for avatars and tokens.
- Swift easing for arrivals, `cubic-bezier(.19, 1, .22, 1)`; a slight overshoot (`cubic-bezier(.175, .885, .32, 1.1)`) only for small, playful confirmations (observed; [[easing-curves]]).
- Depth from tone and space more than shadow ([[depth-and-nesting]]).

## 4. Ronnie, the ghost

- Ronnie is Aave's friendly ghost mascot, drawn in two styles: airbrush (soft, dimensional) and line (single-weight outline). Pick one style per surface.
- Always friendly: never present the ghost with negative emotions, and never crop it, especially in a creepy way.

## 5. The mark

- Three forms: the full logo (ghost and wordmark), the wordmark, and the ghost alone. Use the full logo when the reader needs more context.
- Use the official files as provided, with clear space around them: never stretch, rotate, flip, recolour in several colours, crop, or add patterns, gradients or shadows; never place the ghost on top of the wordmark; never combine the logo with other logos in a way that misrepresents Aave. Logo files ship in purple, dark and light.

## Where this overrides the canonical graph

| Canon says | This fork says |
| --- | --- |
| One accent, chosen per product ([[color-token-tiers]]) | Periwinkle purple, always, in tint steps |
| No mascot in product UI unless it earns its place ([[delight-impact-curve]]) | Ronnie appears, friendly, in one style per surface |

## Sources

- aave.com/brand and its brand kit `aave-brand-assets.zip` (read 2026-11-07): logo forms and rules, the primary palette, Ronnie's two styles, the logo, GHO and token files.
- The stylesheets aave.com serves (read 2026-11-07): purple ladder, grounds, fonts, radii and easing. These are observed values, not a published guideline.
