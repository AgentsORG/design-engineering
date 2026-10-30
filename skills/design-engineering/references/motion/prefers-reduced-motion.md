---
title: prefers-reduced-motion
summary: The one accessibility rule everyone skips. Disable large translations/scales, not all motion.
tags: [motion, accessibility]
---

# `prefers-reduced-motion`

The `prefers-reduced-motion` media query is set by users with vestibular disorders, attention-related conditions, or who simply prefer less motion. About 5–15% of users have it enabled, depending on platform.

The mistake almost everyone makes: setting `* { animation-duration: 0ms !important }` and calling it done. That breaks more than it fixes.

## What to actually do

| Type of motion | When reduced | Notes |
|---|---|---|
| Large translations (slide-in panels, route transitions) | **Disable.** Replace with instant or opacity fade | Causes the most discomfort |
| Large scale changes (modal entrance from 0.8 → 1) | **Disable.** Replace with opacity only | Same as above |
| Parallax | **Disable.** Static positioning | The worst offender |
| Opacity fades | **Keep.** ~120ms is fine | Not motion-disordering |
| Color/background transitions | **Keep.** | Not motion |
| Hover micro-interactions (1px shift, color change) | **Keep but consider shortening.** | Borderline |
| Loading spinners | **Disable.** Use a static label or progress bar | Critical |
| Auto-playing video / carousel | **Disable.** Require interaction to start | Critical |

## The CSS pattern

```css
.modal {
  transform: scale(0.95);
  opacity: 0;
  transition: transform 200ms, opacity 200ms;
}
.modal[data-state="open"] {
  transform: scale(1);
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .modal {
    transform: none;
    transition: opacity 120ms;
  }
}
```

Note: we keep the opacity transition, drop the scale.

## The React / Framer Motion pattern

```tsx
const reducedMotion = useReducedMotion();
<motion.div
  initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2 }}
/>
```

## When this matters most

- Any modal, dialog, drawer, or popover.
- Page transitions in single-page apps.
- Hero animations on marketing pages (high-motion by design — disable them).
- Confetti and celebration moments (provide a static success state).

## Fewer and gentler, or none?

Emil's published skills say fewer and gentler: keep opacity and color changes that explain a state, drop movement, scale, parallax and overshoot. His practice notes go further and disable everything, opacity fades included. This node keeps the short fade as the default because it carries meaning without motion; take the stricter line when a product's audience or a client's standard asks for it. Either way, ship the reduced path with the animation, not as a follow-up.

## Gotcha

Loading spinners are *the* worst offender for reduced motion. A perpetual spinner is exactly the kind of motion the setting exists to suppress. Provide a "Loading..." text label or a progress bar instead. See [[empty-loading-states]].

The second worst: an entrance that starts from `opacity: 0` and only runs under `no-preference`. With reduced motion on, the text never arrives. The reduced state is the *finished* state. taste-skill fails a page whose first screen has two or more text blocks invisible under reduced motion; test it by rendering with the setting on.

## Sources

- WCAG 2.1 — Animation from Interactions.
- Emil Kowalski — prefers-reduced-motion as a first-class concern, not an afterthought.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/animate/SKILL.md, skills/review-animations/STANDARDS.md (fewer and gentler, not zero).
- Emil Kowalski's design-engineering practice, distilled by HKTITAN (disable all, opacity included).
- Leonxlnx, taste-skill v2.1.1 (MIT, HEAD a9c73c3): `skills/taste-skill/scripts/lib/rules.mjs` (`reduced-hidden`) and `references/motion.md` §2 (35 of 99 award sites have any reduced-motion rule).
