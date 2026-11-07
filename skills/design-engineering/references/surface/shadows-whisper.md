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
- **Lead with a 1px ring** (`0 0 0 1px rgba(0, 0, 0, 0.06)`). The drop falls downward, so without it the top edge, or a light sidebar on a light ground, has no line.
- **One shadow per role on a page.** A second hero shadow either means something or is a mistake.

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

## Reference

Benji Taylor gives each shadow a job, named by what the surface sits on:

| Role | `box-shadow` |
|---|---|
| card at rest | `0 1px 2px rgba(0,0,0,.04)` |
| satellite over a white window | `0 0 0 1px rgba(0,0,0,.04), 0 14px 32px -8px rgba(50,50,93,.24), 0 4px 10px -4px rgba(0,0,0,.1)` |
| small window alone on the ground | `0 0 0 1px rgba(50,50,93,.06), 0 24px 48px -24px rgba(50,50,93,.18)` |

- Bad: `0 0 24px #6366f166, 0 0 60px #22d3ee44`, a colored glow on the card, the button and the dot. Good: one neutral shadow under the card. Shadows sit; they don't glow.
- Benji's call differs: on a marketing stage his hero window gets `0 30px 60px -12px rgba(50,50,93,.25)`, which is far above 4–6%. Keep the whisper scale for in-product surfaces.
- Gold example: `stageshow/teaching/style.tsx` (the `style-glow` pair), `stageshow/examples/overlap/`.
- Check: screenshot at 1x and look at a 25% thumbnail. You should find the edge, not a gray halo. If a wide blur smears over a white window, switch to the tighter satellite token.

## Gotcha

Don't add `box-shadow` to text. Use `text-shadow` for that — and almost never. Text shadows are an effect from 2008 and they still look like 2008.

## Sources

- guidelines.sh — "Shadows whisper (2px blur, 1px Y, 5% opacity #111)."
- Tailwind v3 shadow scale + improvements from Linear and Vercel.
- Apple HIG — material/elevation tokens.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/stage.css` (card, satellite, ground and hero shadow tokens and their comments), `stageshow/references/framing.md` rule 8, `stageshow/references/craft.md` (one figure language), `stageshow/teaching/style.tsx` and `style.css` (`style-glow`).
