---
title: translucent-materials
summary: Translucency is a floating functional layer, not decoration. Material weight encodes hierarchy, never stack light glass on light glass, bigger surfaces read thicker, scrim for modal and none for parallel, vibrant text, scroll-edge masks over dividers, materialize with blur + scale, and solid fallbacks for reduced transparency and more contrast.
tags: [surface, glass, backdrop-filter, depth, accessibility]
---

# Translucent materials

A translucent bar lets content scroll under the chrome instead of losing a fixed strip of screen to it, and it keeps the user oriented about what is behind. That only works when the material says *where it sits* in the hierarchy and text on it stays legible over anything. Glass chosen for looks fails both. [[depth-and-nesting]] owns opaque elevation; this node is the see-through layer.

## Weight is hierarchy

- **Heavier, more opaque material for structure** (sidebars, tab bars); **lighter material to draw attention** to interactive pieces.
- **Never put a light translucent layer on another one.** Two blurs compound and text legibility collapses. Make one of them solid.
- **Bigger reads thicker**: a sheet gets more blur and a deeper shadow than a chip. Shadow under glass can be heavier over busy content and lighter over a plain page.

```css
.toolbar {
  background: rgb(255 255 255 / 0.6);
  backdrop-filter: blur(20px) saturate(180%);
  border-top: 1px solid rgb(255 255 255 / 0.4); /* lit top edge */
}
```

## Focus and flow

- A **modal task** pairs the surface with a dimming scrim and pushes the page back. A **parallel, non-blocking panel** stays translucent and offset with no scrim, so the flow isn't broken. Stacked sheets dim and recede each parent a step.
- Where floating chrome overlaps scrolling content, fade a small blur or gradient mask at that edge instead of drawing a 1px divider, and only where they actually overlap ([[sticky-and-scroll-tells]]).
- **Materialize, don't fade**: animate blur radius and a slight scale together on enter and exit, so it arrives as a material rather than a ghost.

## Text on glass

Flat mid-grey text dies over a changing backdrop. Raise contrast, step the weight up one, add a hair of tracking (~0.01em). Put brand colour on a solid layer, never on the translucent foreground. Measure contrast over the worst backdrop the bar can sit on ([[contrast-and-color-scheme]]).

## Preferences

```css
@media (prefers-reduced-transparency: reduce) {
  .toolbar { background: var(--surface); backdrop-filter: none; }
}
@media (prefers-contrast: more) {
  .toolbar { background: var(--surface); border-color: var(--border-strong); }
}
```

## When to apply

Sticky headers, tab bars, toolbars, sheets, popovers over media, and any `backdrop-filter` in a review.

## Gotcha

`backdrop-filter` samples only what is painted behind the element in its own stacking context. A parent with `overflow: hidden`, a `transform`, or `isolation` can leave the blur sampling nothing, and the glass renders as a flat tint. Check it in Safari and Firefox ([[z-index-strategy]]).

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/apple-design/SKILL.md (from Apple's WWDC material and accessibility talks).
- Related: [[depth-and-nesting]], [[sticky-and-scroll-tells]], [[contrast-and-color-scheme]], [[prefers-reduced-motion]], [[performance-discipline]].
