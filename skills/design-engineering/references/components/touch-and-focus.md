---
title: touch-and-focus
summary: Hover enhances, never enables. 44px hit areas by pseudo-element, touch-action set on purpose, muted + playsinline, aria-label on icon buttons, hidden content out of the tab order, focus moved in and restored, timers paused when hidden, tooltip warm state, submenu safe area — plus the mobile-native fixes table.
tags: [components, touch, accessibility, focus, ios, keyboard]
---

# Touch and focus

A large share of users experience the interface through a thumb, a keyboard, or a screen reader — never a mouse. UI that only works with a fine pointer and perfect vision is broken UI however polished it looks. [[accessibility-baseline]] states the floor; this node is the implementation.

## The rules

1. **Gate hover behind capability**: `@media (hover: hover) and (pointer: fine)`. Touch fires `:hover` on tap and leaves it stuck. Nothing core is reachable only by hover.
2. **Tap targets ≥ 44px** (40px desktop). Keep the visual small and grow the hit area with a pseudo-element (`inset: -10px` on a 24px icon = 44px). Hit areas never overlap; shrink to the largest non-colliding size.
3. **`touch-action: manipulation`** on buttons, links, inputs (kills the double-tap-zoom delay); **`touch-action: none`** on surfaces that implement their own pan or drag so native gestures don't fight yours.
4. **Autoplaying video needs `muted` and `playsinline`**, or iOS refuses or goes fullscreen. Under `prefers-reduced-motion`, swap autoplay for a poster and a play button.
5. **Every icon-only button has an `aria-label`** that names the action ("Close dialog", never "icon"). Code-built illustrations get `role="img"` + `aria-label`, or `aria-hidden` when decorative.
6. **Hidden content leaves the tab order**: `visibility: hidden`, `display: none`, or `inert` — never `opacity: 0` or an off-screen transform. Focus must never land off-screen; scroll focused elements into view.
7. **Overlays move focus in and give it back.** Open: focus the first control or the dialog. Close: return focus to the trigger. Never strand focus on a removed node.
8. **Timers pause when the tab is hidden** (`visibilitychange`), resuming with the remaining time.
9. **Shortcuts show the user's OS**: Cmd on macOS, Ctrl elsewhere, bound to match.
10. **Feedback is on the page.** Errors, confirmations, and status never live only behind hover or inside a modal the user has to find.

## Tooltips and menus

A tooltip waits ~200ms so it doesn't fire on incidental travel; once one is open, siblings open **instantly** with no delay and no entrance (the warm state), clearing ~300ms after the last closes — see [[responsive-feedback]]. Submenus get a triangular **safe area** (`clip-path` on a pseudo-element) so a diagonal cursor path toward the submenu doesn't close it mid-flight.

## Mobile-native fixes

| Problem | Fix |
|---|---|
| Hover state stuck after tap | `@media (hover: hover) and (pointer: fine)` |
| Gray or blue flash on tap | `-webkit-tap-highlight-color: transparent` |
| Layout has the wrong height | `100dvh` (app) or `100svh` (hero), never `100vh` |
| Page zooms into an input | Input font-size ≥ 16px |
| Tap feels laggy | Feedback on pointer-down + `touch-action: manipulation` |
| Pull-to-refresh hijacks scroll | `overscroll-behavior: none` on `html, body` |
| Content stops at the notch | `viewport-fit=cover` + `env(safe-area-inset-*)` |
| Long-press selects button text | `user-select: none` on control labels |
| Carousel scrolls vertically | `touch-action: pan-y` on the gesture surface |
| Status bar color doesn't match | `theme-color` meta per color scheme |
| Right in Chrome, wrong on the phone | Test on real hardware |

## When to apply

Any interactive UI — buttons, modals, tooltips, menus, video, timers — and every mobile bug report. Run it even when the screen already looks finished: a failure here ships broken for someone.

## Gotcha

Tabbing into a closed drawer is the classic miss. It was hidden with `opacity: 0` or `translateX(100%)`, which keeps every control focusable; the keyboard user lands inside a thing they cannot see.

## Sources

- Emil Kowalski's design-engineering practice on touch and accessibility, distilled by HKTITAN.
- Related: [[accessibility-baseline]], [[hover-states-subtle]], [[prefers-reduced-motion]], [[forms-behavior]].
