---
title: mobile-type-pin
summary: iOS zooms any input under 16px, so on a phone body text has to rise to 16px — and raising it with the desktop ratio blows up every heading. Astryx's fix — the mobile base is max(desktop base, 16), one heading role is pinned to its desktop size, and the ratio is re-derived so the scale passes through both points. Display sizes shrink, small text grows, and the root font size is never touched.
tags: [typography, mobile, type-scale, ios, astryx]
---

# The mobile type pin

On a coarse-pointer iPhone, an input below 16px makes Safari zoom the page on focus ([[mobile-platform-layer]]). Most teams fix the inputs and stop, leaving 14px body text beside 16px fields. Raising the whole scale's base to 16px with the same ratio fixes the body but inflates every heading by the same factor, and a 79px display headline on a 390px screen pushes the content off the first viewport. Astryx pins one heading instead and bends the ratio around it.

## The formula

With desktop base `B`, ratio `r`, a role at step `k`, and the pinned role at step `a`:

```text
M      = max(B, 16)              mobile base, 16px = 1rem
r_pin  = r × (B / M)^(1/a)       ratio that keeps the pinned role's size
desktop(k) = round(B × r^k)
mobile(k)  = round(M × r_pin^k)  nearest px, halves round up
```

Which role is pinned depends on how steep the desktop scale is:

| Desktop ratio | Pin | Step `a` | Why |
|---|---|---|---|
| r ≤ 1.25 | Display 1 | +6 | A compact scale keeps its biggest size |
| 1.25 < r < 1.414 | Heading 2 | +2 | Larger display roles come down relative to body |
| r ≥ 1.414 | Heading 3 | +1 | A steep display tier would dominate a narrow screen |

Worked example, `B = 14`, `r = 1.333` (Heading 2 pinned): `M = 16`, `r_pin ≈ 1.247`. Body 14 → 16, Heading 2 stays 25, Display 1 goes 79 → 60. Above the pin roles shrink; below it they grow.

## Rules around it

- **Activation:** `(width < 1024px) and (pointer: coarse)` — layout viewport width, primary pointer. A narrow desktop window keeps desktop sizes.
- **When `B ≥ 16`** nothing changes: the mobile profile is the desktop scale.
- **A user text size wins.** If the person set a text size, it replaces the base and the pin no longer applies.
- **Never change the root font size** to do this; scale the roles. `rem` stays a stable 16px reference for spacing ([[type-scale-and-rhythm]]).

## Gotcha

Pinning by media query width alone shrinks headlines on a narrow desktop window and leaves an iPad in landscape at desktop sizes with 14px inputs. Both conditions, width *and* coarse pointer.

## Sources

- Meta, Astryx (MIT, github.com/meta/astryx, HEAD `9f55320`, read 2026-11-09): `docs/design/mobile-typography.md` DR1–DR4 and its worked example (current). Paraphrased; the worked numbers are recomputed here.
- Related: [[line-length-tracking]], [[astryx-reconciliation]].
