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

A worked pair, a static dialog given motion by default:

- Before: scale 0→1, `ease-in`, 400ms in and 400ms out. It swells from a point and starts slowest on the frame the user is looking at.
- After: scale 0.95→1 with opacity, the strong ease-out token, 300ms to open and 150ms to close. When the user chose to dismiss it, an exit at about half the enter is fine; 60–80% stays the default for panels.

A second asymmetry applies where the user is deciding: the deliberate phase is slow and the system's answer snaps (hold-to-confirm: 2s linear on press, 200ms ease-out on release; see [[clip-path-tricks]]).

Sonner itself is the counter-example: its toasts run a symmetric ~400ms `ease`, slower than the UI budget on purpose to match the component's calm personality ([[sonner-principles]]). Treat that as a deliberate exception, not a default.

## How to choose

- **Smaller element, shorter duration.** A 12px icon doesn't need 300ms.
- **More frequent, shorter duration.** See [[delight-impact-curve]].
- **More important, slightly longer.** A modal earns more time than a tooltip.
- **If unsure, halve it.** Most "feels slow" animations are too long. Most "feels jumpy" animations are too short.
- **Feedback starts on the input.** A delay before a press responds reads as lag at any duration; only storytelling motion (a demo, a film) earns slower timing.

## Reference

One product's whole set, read from a real kit, so every part stays in proportion:

| Part | In | Out |
|---|---|---|
| Button press | `transform` 180ms `cubic-bezier(0.2, 0.8, 0.2, 1)` to `scale(0.97)` | same |
| Menu row under the pointer | 0ms | `background-color` 150ms `ease` |
| Tooltip | 150ms fade with a 2px rise | 100ms |
| Toggle knob, Segmented thumb, Tabs indicator | 250ms, 300ms, 350ms `cubic-bezier(0.22, 1, 0.36, 1)` | same |

- Gold example: `stageshow/kit/controls/Button.css`, `stageshow/kit/parts/Menu.css`, `stageshow/kit/parts/Tooltip.css`, `stageshow/kit/controls/Toggle.css`, `Segmented.css` and `Tabs.css`. Benji's call differs on one: Stageshow's Popover fades in over 0.18s and out over 0.24s, because in a filmed demo a very short fade falls between frames (`stageshow/kit/motion/Popover.css`); keep this node's shorter exits for product UI.
- Check: record the press at 60fps; the first frame after `pointerdown` already differs from the last frame before it, and the whole response lands in about 11 frames.

## Gotcha

`prefers-reduced-motion` does not mean "make everything 0ms." It means "no large translations or scale changes." A 120ms opacity fade is fine. See [[prefers-reduced-motion]].

## Sources

- Emil Kowalski — button feedback timing.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, read 2026-11-07): skills/animate/SKILL.md and RECIPES.md (duration budgets, tooltip, toast, hold-to-confirm); unchanged through `715c180`.
- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG (the dialog pair: 0.95 start, 300ms in, 150ms out).
- Emil Kowalski's design-engineering practice, distilled by AgentsORG (exits 20–30% faster than enters).
- Vercel Design — internal duration tokens.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `kit/controls/Button.css`, `kit/controls/Toggle.css`, `kit/controls/Segmented.css`, `kit/controls/Tabs.css`, `kit/parts/Menu.css`, `kit/parts/Tooltip.css`, `kit/motion/Popover.css`, `references/choreography.md` (Timing has different jobs).
