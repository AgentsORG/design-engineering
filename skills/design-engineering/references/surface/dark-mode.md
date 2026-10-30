---
title: dark-mode
summary: Never pure #000. Near-black surfaces that get lighter as they rise, remapped from the light scale rather than inverted. Accents desaturated 20–30%. Dividers solid, white rings only for elevation. Opacity text only on one known surface. A half-finished dark mode is a blocker.
tags: [color, dark-mode, surface]
---

# Dark mode

Dark mode is its own designed theme, derived from the same scale as light mode by remapping which steps each role uses. The most common mistake is pure black (`#000000`) under pure white (`#ffffff`): the contrast is harsh, the surfaces feel cheap, and OLED screens smear scrolling text.

## Background

Use a near-black with a slight hue bias.

```css
--bg-base: #18181b;        /* Zinc 950 — most products */
--bg-elevated: #1f1f23;    /* +1: cards */
--bg-overlay: #2a2a2f;     /* +2: menus, modals */
--bg-floating: #35353a;    /* +3, rarely needed */
```

In light mode elevation is shadow; in dark mode it is a **lighter surface**, and the topmost layer is the lightest. Pure `#000` is for photo backdrops, video chrome, and OLED themes that opt in.

## Remap, don't invert

Keep one scale and point the roles at mirrored steps (50 ↔ 950, 200 ↔ 800), as [[color-scales-oklch]] describes. That is not the same as inverting colors: re-check every pair, because warm yellows turn muddy and brand accents vibrate. **Desaturate accents 20–30%** on dark surfaces.

## Text

White at 90–93% reads softer than full white:

```css
--text-primary: rgba(255, 255, 255, 0.92);
--text-secondary: rgba(255, 255, 255, 0.62);
```

Opacity text is safe only on a **single known surface**. Over an elevated card, an image or a tinted panel, the alpha mixes with whatever sits beneath and the contrast changes. Everywhere else, use specific solid tokens (`--text-secondary-on-elevated`) and check them against their real surface.

## Borders and rings

- **Dividers are solid** dark greys (around `#2a2a2a` on `#18181b`): table rules, list separators, input edges. An alpha white line glows.
- **White rings are for elevation only.** Shadows vanish on dark, so a raised card swaps its shadow stack for one ring, `0 0 0 1px rgb(255 255 255 / .09)` ([[depth-and-nesting]]). Images take a white 10% inset outline.

## Assets

SVG icons and logos with a hardcoded `fill="#fff"` or `#000` break in one of the two themes. Use `fill="currentColor"` (or a CSS variable) so they follow the text color; keep a separate asset only for full-colour marks.

## When to apply

Any product with a theme toggle or `prefers-color-scheme` support. Pair with the browser-chrome rules in [[contrast-and-color-scheme]].

## Gotcha

A half-finished dark mode that users can reach is a blocker, not a nit: one white modal, a light native `<select>`, or a black-on-dark logo makes the whole product look broken. If the theme isn't done, don't expose the toggle and don't declare `color-scheme: dark`.

## Sources

- guidelines.sh — near-black surfaces, softened white text.
- Material Design 3 — dark theme elevation by surface tint.
- Emil Kowalski's design-engineering practice, distilled by HKTITAN — remapping, desaturation, solid dividers vs rings.
- Related: [[color-monochromatic]], [[shadows-whisper]], [[depth-and-nesting]].
