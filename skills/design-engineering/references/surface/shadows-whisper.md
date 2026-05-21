---
title: shadows-whisper
summary: Shadows should whisper, not announce. The default 0 2px 8px is a tell. Concrete spec.
tags: [shadow, surface]
---

# Shadows whisper

The Bootstrap-default shadow (`0 2px 8px rgba(0, 0, 0, 0.1)`) is the most overused shadow on the web. It is a tell.

## The principle

A good shadow is barely visible. Its purpose is to suggest elevation and depth, not to draw attention to the elevated element. If you can clearly *see* the shadow as a soft gray blur, it is too strong.

## The spec

For light mode, layered shadows that whisper:

```css
/* +1 elevation: cards, buttons */
--shadow-sm:
  0 1px 1px rgba(17, 17, 17, 0.04),
  0 2px 4px rgba(17, 17, 17, 0.04);

/* +2 elevation: dropdowns, popovers */
--shadow-md:
  0 1px 2px rgba(17, 17, 17, 0.05),
  0 4px 8px rgba(17, 17, 17, 0.05),
  0 8px 24px rgba(17, 17, 17, 0.04);

/* +3 elevation: modals */
--shadow-lg:
  0 2px 4px rgba(17, 17, 17, 0.06),
  0 8px 16px rgba(17, 17, 17, 0.06),
  0 16px 48px rgba(17, 17, 17, 0.06);
```

Key moves:
- **Layer multiple shadows** at different blur radii. A single shadow with 16px blur looks flat. Three shadows at 2px, 8px, 24px blur read as physical depth.
- **Use a dark base color** (`#111`, not pure black). Slightly warmer if your palette is warm.
- **Opacity at 4–6%, not 10%.** This is the part most people get wrong.
- **No `y-offset` larger than blur radius.** A 2px y-offset with 8px blur is fine; 8px y-offset with 8px blur is not.

## Dark mode shadows

In dark mode, shadows alone often disappear. Pair with the surface-tint elevation pattern from [[dark-mode]] — use a lighter surface color *and* a much subtler shadow:

```css
.dark {
  --shadow-md:
    0 4px 12px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.06); /* hairline border for definition */
}
```

The 1px hairline border at low white opacity does most of the elevation work in dark mode.

## Inner shadows for surfaces

```css
/* Subtle inner shadow on top edge for a card */
box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
```

Used by Apple, Stripe, Linear. Adds a hairline highlight to suggest the surface is reflecting light from above.

## When to apply

- Any time you write a `box-shadow`. Reach for the layered token, not a single-shadow blur.
- Reviewing a design system that has one "shadow" value — push for at least three layered tokens.

## Gotcha

Don't add `box-shadow` to text. Use `text-shadow` for that — and almost never. Text shadows are an effect from 2008 and they still look like 2008.

## Sources

- guidelines.sh — "Shadows whisper (2px blur, 1px Y, 5% opacity #111)."
- Tailwind v3 shadow scale + improvements from Linear and Vercel.
- Apple HIG — material/elevation tokens.
