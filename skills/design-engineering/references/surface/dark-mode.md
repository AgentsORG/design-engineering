---
title: dark-mode
summary: Never pure #000. Use #18181b or #1a1a1a with 90-93% opacity white text.
tags: [color, dark-mode, surface]
---

# Dark mode

The single most common dark mode mistake is using pure black (`#000000`) as the background and pure white (`#ffffff`) as the text. The contrast is too high, the surfaces feel cheap, and on OLED screens you get smearing on scrolling text.

## The rules

### Background

Use a near-black with a subtle hue, not pure `#000`.

```css
--bg-base: #18181b;        /* Zinc 950 — most products */
--bg-elevated: #1f1f23;    /* slightly lighter for cards */
--bg-overlay: #2a2a2f;     /* further elevated, modals */
```

Alternatives by mood:
- **Warm neutral:** `#1a1a1a`, `#222220`
- **Cool neutral:** `#0f172a` (Slate 950)
- **Deep but soft:** `#0a0a0a`

Pure `#000000` is reserved for: photo backgrounds where the goal is invisibility, video player chrome, OLED-specific themes that opt in.

### Text

Use white at **90–93% opacity**, not 100%.

```css
--text-primary: rgba(255, 255, 255, 0.92);
--text-secondary: rgba(255, 255, 255, 0.62);
--text-muted: rgba(255, 255, 255, 0.42);
```

Full white on dark backgrounds reads as too aggressive and the chromatic aberration on most monitors (especially LCD) makes edges shimmer. ~92% softens it without losing legibility.

### Borders

In dark mode, borders are subtle:

```css
--border-default: rgba(255, 255, 255, 0.08);
--border-strong: rgba(255, 255, 255, 0.14);
```

In dark mode you can also use *lighter* borders to suggest elevation, where in light mode you'd use shadows. See [[shadows-whisper]] for the light-mode equivalent.

## Elevation in dark mode

In light mode, elevation = shadow.
In dark mode, elevation = **lighter surface color**.

```css
--bg-base: #18181b;       /* sea level */
--bg-elevated: #1f1f23;   /* +1 */
--bg-overlay: #2a2a2f;    /* +2 */
--bg-floating: #35353a;   /* +3 (rarely needed) */
```

This is the Material Design dark-mode principle, and it works.

## Color tokens flip

Your single accent color from [[color-monochromatic]] should usually be slightly *desaturated* in dark mode. A vibrant indigo on white can feel garish on dark — dial saturation down 10–15%.

## When to apply

Any product that supports a theme toggle. Most products do or will. Dark mode is no longer optional.

## Gotcha

Don't just invert your light-mode colors. Some colors that work on light don't work on dark (warm yellows often turn muddy). Build dark mode as its own first-class theme with its own tokens, not as `--text: var(--white-or-black)`.

## Sources

- guidelines.sh — "No pure #000 dark mode (use #1a1a1a or #18181b, 90-93% opacity white text)."
- Material Design 3 — dark theme elevation by surface tint.
- Vercel, Linear, Anthropic — concrete dark-mode tokens.
