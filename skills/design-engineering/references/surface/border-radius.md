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

## When to apply

- Building a tokens file: define the scale up front.
- Reviewing a button or card design: check the nested-radius math.
- Reviewing a pill-button design: check the inset icons.

## Gotcha

`border-radius` larger than half the element's smaller dimension behaves the same as `border-radius: 50%`. So `border-radius: 9999px` on a small button is functionally a capsule. Useful, but be intentional about it.

## Sources

- guidelines.sh — uniform radius is lazy, nested-radius rules.
- Linear, Vercel — capsule-button discipline.
- Tailwind — radius scale conventions.
