---
title: contrast-and-color-scheme
summary: APCA over WCAG 2 for contrast math. theme-color and color-scheme meta. Interactions raise contrast. Avoid gradient banding.
tags: [surface, color, contrast, dark-mode, accessibility]
---

# Contrast and color-scheme

The contrast and theme-integration choices that decide whether dark mode actually works and whether browser chrome blends in.

Distinct from [[color-monochromatic]] (which defines the *palette*) and [[dark-mode]] (which defines *specific colors*) — this node is about contrast math and browser integration.

## APCA over WCAG 2

The WCAG 2 contrast formula (the 4.5:1 / 3:1 ratios) is a 1980s model and badly approximates real perception. **APCA** (Accessible Perceptual Contrast Algorithm, the WCAG 3 candidate) is the modern alternative.

### APCA thresholds

| Use | Lc (lightness contrast) |
|---|---|
| Body text (fluent reading) | 75+ (90 preferred) |
| Other content text, UI labels | 60+ |
| Large or heavy text (headlines) | 45+ |
| Non-text essentials (icons, borders, focus rings), placeholder, disabled | 30+ (floor, not target) |

APCA is signed (positive for dark-on-light, negative for light-on-dark) and the threshold magnitudes are the same in both directions. Tools: [APCA Contrast Calculator](https://www.myndex.com/APCA/), `apca-w3` npm package.

WCAG 2 still gets you legal compliance in most jurisdictions: 4.5:1 body, 3:1 for large text (~24px, or bold from ~18.5px) and UI components. APCA gets you UI that actually reads. Run both; pass both. Repair a failing pair by moving L only ([[color-scales-oklch]]).

## Interactions raise contrast, not lower

A hover state should make the element *more* contrasty, not less. A pressed state should be *more* contrasty than hover. Disabled is the only state that lowers contrast.

```css
.button {
  background: var(--bg-elevated);     /* baseline */
  border-color: var(--border-default);
}
.button:hover {
  background: var(--bg-elevated-hover);  /* slightly more contrast */
  border-color: var(--border-strong);
}
.button:active {
  background: var(--bg-elevated-active); /* even more */
}
.button:disabled {
  background: var(--bg-disabled);        /* drops contrast — expected */
  color: var(--text-disabled);           /* a token, never opacity */
}
```

Disabled takes dedicated tokens, not `opacity`: opacity lets whatever sits behind show through, so the same button passes on one surface and fails on the next ([[color-token-tiers]]).

## Browser chrome integration

### `<meta name="theme-color">`

Sets the address-bar / browser-chrome color on mobile (iOS Safari, Android Chrome). Without it, the chrome stays its default white/grey and your app's background ends abruptly at the bezel.

```html
<meta name="theme-color" content="#18181b" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
```

### `color-scheme` CSS property

Tells the browser whether scrollbars, form controls, and `<input>` defaults should render in their light or dark variant.

```css
:root {
  color-scheme: light dark;  /* respect user preference */
}
.dark {
  color-scheme: dark;  /* force dark */
}
```

Without `color-scheme`, dark-mode pages get *light* scrollbars and *light* native `<select>` dropdowns — instantly disorienting. Declare only the schemes you actually designed: a light-only app that writes `light dark` hands dark-OS users dark native controls on a white page. Light-only declares `color-scheme: light`.

## Gradient banding

A gradient between two close colors (e.g. `#1a1a1a → #1c1c1c`) shows visible "banding" — concentric rings instead of smooth gradient. The fix: add a `background-image` of subtle noise.

```css
.surface {
  background:
    linear-gradient(to bottom, #1a1a1a, #1c1c1c),
    url("data:image/svg+xml,...noise.svg");
  background-blend-mode: overlay;
}
```

Or use a `<svg>` filter with `<feTurbulence>` for procedural noise.

## When to apply

- Setting up a new design tokens file: include APCA contrast checks in your design-system docs.
- Implementing dark mode: add `<meta name="theme-color">` and the matching `color-scheme` the day the dark theme exists, not before.
- Reviewing a hover state: confirm it *increases* contrast, doesn't decrease it.
- Designing a hero gradient: test on macOS with night-shift on — banding shows up.

## Gotcha

`color-scheme: dark` is *per element*, not per page. If you set it on `.dark` and a child element doesn't inherit, native form controls inside that child render light. Set on `:root` if you want global effect.

## Sources

- Vercel Web Interface Guidelines — Design section, contrast and chrome rules.
- Andrew Somers — APCA documentation, [git.apcacontrast.com](https://git.apcacontrast.com).
- Emil Kowalski's design-engineering practice, distilled by HKTITAN — disabled tokens, declared schemes.
- Related: [[color-monochromatic]] (the palette), [[dark-mode]] (specific colors), [[accessibility-baseline]] (a11y context), [[shadows-whisper]] (sibling surface concern).
