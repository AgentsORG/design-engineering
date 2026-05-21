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
| Tooltip appearance | 0–80ms (after delay) | The *delay* is 400–700ms; the *animation* is fast |
| Popover / dropdown | 150–250ms | Should feel instant, not theatrical |
| Modal | 200–300ms | Slightly slower because it's a hierarchy shift |
| Tab content swap | 200–250ms | Crossfade or directional slide |
| Page transition | 250–400ms | The longest "ok" UI duration |
| Skeleton → content | 150ms | Resolve fast; the skeleton already paid the wait |
| Confetti / celebration | 600–1200ms | Rare moment, can be theatrical |
| Onboarding hero motion | 400–800ms | First-run gets a longer budget |

## Asymmetric enter/exit

The exit is usually 60–80% of the enter. A panel that takes 250ms to slide in should take ~180ms to slide out. This is one of Emil's most-cited rules from Sonner.

```css
[data-state="open"] { animation: slideIn 250ms var(--ease-out-quart); }
[data-state="closed"] { animation: slideOut 180ms var(--ease-out-quart); }
```

## How to choose

- **Smaller element, shorter duration.** A 12px icon doesn't need 300ms.
- **More frequent, shorter duration.** See [[delight-impact-curve]].
- **More important, slightly longer.** A modal earns more time than a tooltip.
- **If unsure, halve it.** Most "feels slow" animations are too long. Most "feels jumpy" animations are too short.

## Gotcha

`prefers-reduced-motion` does not mean "make everything 0ms." It means "no large translations or scale changes." A 120ms opacity fade is fine. See [[prefers-reduced-motion]].

## Sources

- Emil Kowalski — Sonner asymmetric enter/exit, button feedback timing.
- Vercel Design — internal duration tokens.
