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
7. **A fixed z-index scale** (`--z-dropdown: 100`, `--z-modal: 200`, `--z-tooltip: 300`, `--z-toast: 400`) — or avoid it with `isolation: isolate` so children can't leak above unrelated UI. DOM order first, then one global file of sequential layers ([[z-index-strategy]]).
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

## Reference

| Detail | Value |
|---|---|
| Label beside an icon, in a pill or disc | `text-box: trim-both cap alphabetic` |
| Words to any container edge | 12px; under 8px is a finding |
| Text to its neighbour | A fixed gap of 8 to 12px, never leftover `space-between` |
| Edges 1 to 3px apart | Align exactly, or part by 8px or more |
| Filled button hover | One step of its own colour: `color-mix(in srgb, var(--accent), #000 10%)` |
| Unread dot | Hangs 7px left of the lead in the margin; the row never moves |

- Benji's call differs on press depth: the Stageshow `Button` presses to `scale(0.97)`, a hair shallower than this pass's 0.96; both clear the 0.95 floor.
- Gold example: `stageshow/teaching/composition.tsx` (`edge-separation`, `control-alignment`, `unread-gutter`) and `stageshow/examples/buttons/`.
- Check: screenshot at 1:1 and measure every word to its container (12px or more) and every pair of near edges (0 or 8px or more), the checks Stageshow's film gate runs as `tight inset` and near-tangent.

## Gotcha

Polish applied to the wrong structure is thrown away with the structure. If hierarchy or spacing is wrong, this pass is premature; fix the layout, then polish.

## Sources

- Emil Kowalski's design-engineering practice on polish, distilled by AgentsORG.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/references/craft.md` (Spacing and alignment), `stageshow/kit/controls/Button.css`, `stageshow/kit/parts/Row.css`, `stageshow/scripts/film-checks.mjs` (`nearTangent`, `tight inset`), `stageshow/teaching/composition.tsx`.
- Related: [[review-checklist]], [[responsive-feedback]], [[touch-and-focus]], [[line-behavior]], [[depth-and-nesting]].
