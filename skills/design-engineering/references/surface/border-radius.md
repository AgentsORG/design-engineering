---
title: border-radius
summary: Uniform radius everywhere is lazy. Capsule buttons need full package. Nested-radius rule.
tags: [surface, border-radius]
---

# Border radius

Border radius is a personality dial. A uniform radius across an entire UI is lazy; an intentional scale signals craft.

## The scale

```css
--radius-sm: 4px;   /* badges, micro-elements */
--radius-md: 8px;   /* inputs, small buttons */
--radius-lg: 12px;  /* cards, larger buttons */
--radius-xl: 16px;  /* modals, large surfaces */
--radius-2xl: 24px; /* hero cards, marketing */
--radius-full: 9999px; /* pills, avatars */
```

Pick one as your **default body radius** (usually `lg` for product UI) and use the others deliberately.

## The capsule-button rule

If you use `--radius-full` on a button (pill button), the **inset elements must also be pill-radius**, not square. Common mistake:

```css
/* Wrong — pill button with rectangular inset icon */
.button { border-radius: 9999px; }
.button-icon { border-radius: 0; }

/* Right — pill commits to capsule everywhere */
.button { border-radius: 9999px; padding: 8px 16px; }
.button-icon { border-radius: 9999px; }
```

## The nested-radius rule

When a rounded element contains another rounded element, the inner radius should be **smaller** than the outer radius, ideally by the gap between them:

```
outer_radius - gap = inner_radius
```

```css
.card {
  border-radius: 16px;
  padding: 8px;
}
.card-content {
  border-radius: 8px; /* 16 - 8 = 8 */
}
```

Visually, this makes the two radii feel parallel. Equal radii (both 16px) looks subtly wrong; the inner radius reads as overlapping the outer one.

## Mixing radii

Mixing `sm` and `xl` in the same screen is fine — even encouraged for hierarchy. But mixing `sm` (4px) and `md` (8px) on adjacent elements looks like a mistake. Use either same or noticeably different.

- **One radius set per page.** Every window, card and field on a page draws from the same set, as one ground, one gutter and one window shadow do (Benji Taylor, Stageshow `references/craft.md`, A page of demos: "One figure language").

## When to apply

- Building a tokens file: define the scale up front.
- Reviewing a button or card design: check the nested-radius math.
- Reviewing a pill-button design: check the inset icons.

## Reference

Bad: one `12px` on the menu row, the field, the popover and the window, so nothing reads as nested inside anything.
Good: a radius per role, the set Stageshow's kit ships: menu row `6px`, field `8px`, popover `10px`, window `12px`, chip `999px`; the card derives its inner radius and never lets it hit zero:

```css
.card { --pad: 16px; --radius: calc(var(--radius-md) + 4px);   /* 8 + 4 = 12 */
  --inner: max(4px, calc(var(--radius) - var(--pad)));          /* 12 - 16 clamps to 4, never square */
  padding: var(--pad); border-radius: var(--radius); }
.card > .well { border-radius: var(--inner); }
```

Gold example: `stageshow/kit/parts/Card.css` (the derivation above) and `stageshow/examples/looks/radix.css`, which maps a real system's 4 / 6 / 8 / 12 / full scale onto those five roles.
Check: put a still beside a screenshot of the real product at the same scale; the radii should match at a glance. If a control looks foreign, read its computed `border-radius` again instead of nudging by eye.

## Gotcha

`border-radius` larger than half the element's smaller dimension behaves the same as `border-radius: 50%`. So `border-radius: 9999px` on a small button is functionally a capsule. Useful, but be intentional about it.

## Sources

- guidelines.sh — uniform radius is lazy, nested-radius rules.
- Linear, Vercel — capsule-button discipline.
- Tailwind — radius scale conventions.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/stage.css` (shape tokens), `stageshow/kit/parts/Card.css`, `stageshow/references/looks.md` (The tokens, Check it), `stageshow/references/craft.md` (Spacing and alignment, A page of demos), `stageshow/examples/looks/radix.css`.
