---
title: ui-polish-pass
summary: The invisible finish, as a pass — antialiasing, constant weight on interaction, tabular numbers, no layout shift, real characters, states that stay put, a z-index scale, hit areas, optical alignment, native page scrollbars, designed empty states, inert decoration, no flash on refresh.
tags: [components, polish, finish, layout-shift, states]
---

# The UI polish pass

A finished interface is mostly invisible work: text that renders crisply, numbers that don't jiggle, hover states that don't shift layout, focus rings that don't clash, hit areas you never miss. No single item is noticeable on its own; their absence is. Run this as a pass over every component *after it works* and *before* [[review-checklist]] gates it. If the pass finds the structure itself is wrong, escalate to [[feeling-right]].

## The pass

1. **Antialiased smoothing once at the root**; fonts subsetted.
2. **Never change font weight on hover, active, or selected.** Weight reflows the text. Hold weight; signal with color.
3. **`tabular-nums` on anything that changes** — counters, prices, timers.
4. **No layout shift from dynamic content.** Skeletons, placeholders, and images carry the dimensions (or `aspect-ratio`) of the loaded state.
5. **Real typographic characters** and `text-wrap: balance` on headings — see [[line-behavior]].
6. **Interaction states that stay put.** Hover transitions only the properties that change, ~150ms ease-out. Press is `scale(0.96)`, never below 0.95. Focus rings stay neutral (grey, black, white) and never disappear. `::selection`, if styled, stays a legible tint. `will-change` only for transform/opacity/filter, only after observing a first-frame hitch.
7. **A fixed z-index scale** (`--z-dropdown: 100`, `--z-modal: 200`, `--z-tooltip: 300`, `--z-toast: 400`) — or avoid it with `isolation: isolate` so children can't leak above unrelated UI.
8. **Hit areas ≥ 44×44 touch / 40×40 desktop**, extended with a pseudo-element, never overlapping — see [[touch-and-focus]].
9. **Align by eye.** Trailing-icon padding = text-side padding − 2px; play triangles nudge 1–2px toward the point; asymmetric SVGs are fixed in the viewBox.
10. **Native scrollbar on the page.** Customize only inside small scrollers (code blocks): 8px, translucent rounded thumb.
11. **Empty states teach**: headline, one line, primary action — sized to the filled state so completing the action doesn't shift the layout. See [[empty-loading-states]].
12. **Decorative elements are inert**: `pointer-events: none`, `user-select: none`.
13. **No flash on refresh.** Persisted interactive state is set before first paint, never default-then-correct.
14. **Anchors clear the sticky header** (`scroll-margin-top`); fixed bottom chrome pads `env(safe-area-inset-bottom)`.

## Frequent offenders

| Problem | Remedy |
|---|---|
| Bold-on-hover tabs shift layout | Constant weight, color signals state |
| Digits jiggle | `font-variant-numeric: tabular-nums` |
| Content jumps as images load | Explicit dimensions or `aspect-ratio` |
| `scale(0.9)` on press | `scale(0.96)` |
| Brand-colored focus ring | Neutral ring |
| `z-index: 9999` | Scale, or `isolation: isolate` |
| 20px icon with a 20px hit area | Pseudo-element to 44px |
| Custom page scrollbar | Native; customize only small scrollers |
| Blank div for an empty list | Headline + line + action, sized like the filled state |
| Theme flashes on refresh | Persist + set before render |

## When to apply

The build works and now needs the last ten percent; "feels unfinished" with no single dimension obviously wrong; before any review. [[disambiguation]] routes *looks right* to [[feeling-right]], *feels finished* here, *should ship* to [[review-checklist]].

## Gotcha

Polish applied to the wrong structure is thrown away with the structure. If hierarchy or spacing is wrong, this pass is premature; fix the layout, then polish.

## Sources

- Emil Kowalski's design-engineering practice on polish, distilled by HKTITAN.
- Related: [[review-checklist]], [[responsive-feedback]], [[touch-and-focus]], [[line-behavior]], [[depth-and-nesting]].
