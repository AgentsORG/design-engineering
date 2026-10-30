---
title: duration-table
summary: Specific durations by element type. UI < 300ms. Buttons 100–160ms.
tags: [motion, duration]
---

# Animation durations

There is no universal "feels right" duration. The right duration depends on what's moving and how often.

## Reference table

| Element | Duration | Notes |
|---|---|---|
| Button press feedback | 100–160ms | Anything slower feels laggy |
| Hover state change | 120–200ms | Faster on inputs, slower on cards |
| Tooltip appearance | 125–200ms; 0ms for siblings | First tooltip: 400–700ms delay, then ~125ms. While one is open, neighbours skip delay and animation |
| Popover / dropdown | 150–250ms | Should feel instant, not theatrical |
| Modal | 200–300ms | Slightly slower because it's a hierarchy shift |
| Tab content swap | 200–250ms | Crossfade or directional slide |
| Page transition | 250–400ms | The longest "ok" UI duration |
| Skeleton → content | 150ms | Resolve fast; the skeleton already paid the wait |
| Confetti / celebration | 600–1200ms | Rare moment, can be theatrical |
| Onboarding hero motion | 400–800ms | First-run gets a longer budget |

## Asymmetric enter/exit

The exit is usually 60–80% of the enter: the user has already moved on. A panel that takes 250ms to slide in should take ~180ms to slide out. Use transitions, not keyframes, so an open interrupted by a close reverses from where it is.

```css
.panel { transition: transform 180ms var(--ease-out-quart); }            /* exit */
.panel[data-state="open"] { transition-duration: 250ms; }                /* enter */
```

A second asymmetry applies where the user is deciding: the deliberate phase is slow and the system's answer snaps (hold-to-confirm: 2s linear on press, 200ms ease-out on release; see [[clip-path-tricks]]).

Sonner itself is the counter-example: its toasts run a symmetric ~400ms `ease`, slower than the UI budget on purpose to match the component's calm personality ([[sonner-principles]]). Treat that as a deliberate exception, not a default.

## How to choose

- **Smaller element, shorter duration.** A 12px icon doesn't need 300ms.
- **More frequent, shorter duration.** See [[delight-impact-curve]].
- **More important, slightly longer.** A modal earns more time than a tooltip.
- **If unsure, halve it.** Most "feels slow" animations are too long. Most "feels jumpy" animations are too short.

## Gotcha

`prefers-reduced-motion` does not mean "make everything 0ms." It means "no large translations or scale changes." A 120ms opacity fade is fine. See [[prefers-reduced-motion]].

## Sources

- Emil Kowalski — button feedback timing.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/animate/SKILL.md and RECIPES.md (duration budgets, tooltip, toast, hold-to-confirm).
- Emil Kowalski's design-engineering practice, distilled by HKTITAN (exits 20–30% faster than enters).
- Vercel Design — internal duration tokens.
