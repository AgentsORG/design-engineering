---
title: production-baseline
summary: The floor any app a phone will open needs — one viewport tag, a handful of root declarations, two gates (hover and reduced motion) moved to token or config level, a theme provider that neither flashes nor ripples, and dev mounts behind a build-time check. Merge it in; never fork it.
tags: [meta, production, baseline, mobile, css, head]
---

# Production baseline

A dozen ship-check findings share one root: the app never set its global floor. Land this first in a [[ship-check]] and dozens of instances disappear at once. **Merge, don't append**: most projects already have half of it, so add the missing lines to the existing root rules and never create a second viewport tag or a second global stylesheet. Write it in the project's styling system and tokens. Any value read from the project (language, header colour, header height, origin, product name) is read, never invented; if it isn't there, leave the line out and flag it.

## Head

- **Viewport**: `width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-content`. `viewport-fit=cover` is what makes `env(safe-area-inset-*)` non-zero. `interactive-widget` makes Android's keyboard shrink the layout viewport, so `100dvh` and bottom-pinned composers behave as on iOS. Never `maximum-scale` or `user-scalable`; fix the 16px input instead.
- `<html lang>` set to the content's real language.
- **Colour scheme**: declare only the schemes that were designed. Two themes get one `theme-color` per `prefers-color-scheme`, matching the header background, not the brand colour. A single-theme app declares that one scheme only.
- **Fonts**: preload the used `woff2` files with `crossorigin` (without it the preload is fetched and discarded). Skip this when the framework's font loader already preloads.

## Root CSS

- `html`: `-webkit-text-size-adjust: 100%`; `font-synthesis: none` so a weight that never loaded fails visibly instead of being faked; `-webkit-tap-highlight-color: transparent`, which obliges every control to have its own `:active` state; `overscroll-behavior: none` on app shells only.
- `:focus-visible` outline 2px in the strongest neutral, `outline-offset: 2px`.
- `input, textarea, select` at 16px on touch; `touch-action: manipulation` on every control.
- `user-select: none` on buttons and tabs, never on `body`.
- `h1–h3 { text-wrap: balance }`, `p { text-wrap: pretty }` ([[line-behavior]]).
- `[id] { scroll-margin-top }` equal to the sticky header's measured height.
- `scroll-behavior: smooth` only inside `prefers-reduced-motion: no-preference`.

## The two gates

**Hover**: every `:hover` behind `(hover: hover) and (pointer: fine)` ([[touch-and-focus]]). Tailwind v4's variant already does it; v3 needs `future.hoverOnlyWhenSupported: true`, one line that fixes every instance. **Reduced motion**: swap movement for opacity where the shared keyframes or duration tokens live, and set Motion's `MotionConfig reducedMotion="user"` (its default ignores the OS) ([[prefers-reduced-motion]]).

## Theme and dev mounts

With `next-themes`, `disableTransitionOnChange` stops every surface tweening at its own speed on toggle, and its blocking script stops the flash on refresh. Without it, add a `no-transitions` class for two frames around the switch. Dev-only inspectors, control panels and devtools render only under the development build check and load through a dynamic import, so the package stays out of the production bundle ([[leftovers-and-leaks]]).

## Gotcha

Pasting `color-scheme: light dark` into a light-only app creates a bug: phones in dark mode render dark native controls and canvas under a UI that was only ever designed light. And once the tap highlight is gone, a control with no `:active` gives touch users no feedback at all, so removing the highlight raises the priority of press states ([[responsive-feedback]]).

## Sources

- Emil Kowalski's design-engineering practice, distilled by HKTITAN.
- Related: [[contrast-and-color-scheme]], [[forms-behavior]], [[performance-discipline]].
