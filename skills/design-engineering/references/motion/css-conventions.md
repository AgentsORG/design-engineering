---
title: css-conventions
summary: 1turn over 360deg, seconds over ms (or both with a reason), unitless line-heights, rem over px, native methods over libraries.
tags: [motion, css, units, conventions]
---

# CSS conventions

A loose set of unit and dialect choices that, taken together, signal someone who actually writes CSS by hand. From Ben DC's [frontend-guidelines](https://github.com/bendc/frontend-guidelines).

Most of these don't change behavior. They change *who reads your CSS and thinks "this person knows what they're doing."*

## Rotation: `1turn`, not `360deg`

```css
/* Good */
transform: rotate(1turn);
transform: rotate(0.25turn);
transform: rotate(-1turn);

/* Works but reads as 2010 */
transform: rotate(360deg);
transform: rotate(90deg);
```

A full rotation is `1turn`. A half is `0.5turn`. A quarter is `0.25turn`. Half the digits, none of the mental math.

The exception: when you're rotating to match a specific design-spec degree value (e.g. "rotate this arrow 14°"), `14deg` is clearer than `0.0389turn`. Use `deg` for arbitrary angles, `turn` for fractions of a full rotation.

## Time: pick one and commit

This node and `duration-table` disagree on convention — `duration-table` uses milliseconds (`200ms`). Ben DC prefers seconds (`0.2s`).

The principle: pick one and commit across your codebase. Mixing `200ms` and `0.2s` in the same stylesheet is the bug.

Two arguments:

- **Milliseconds (this skill's default):** explicit, no decimal ambiguity, matches `setTimeout()` JS values, what design tokens usually export as.
- **Seconds:** fewer characters, what motion software uses (After Effects, Lottie), what humans intuitively understand for durations > 1s.

Stay with milliseconds in this repo for consistency with [[duration-table]]. If you fork to a project that prefers seconds, flip the token file and don't look back.

## Line-height: unitless

```css
/* Good — scales correctly with font-size inheritance */
line-height: 1.5;

/* Bad — breaks when font-size changes */
line-height: 24px;
line-height: 1.5em;
```

Unitless line-height multiplies the *current* font-size. Pixel or em values lock to the *defining* element and propagate awkwardly to children.

## Sizing: `rem` for relative, `px` for hairlines

- **`rem`** for anything that should scale with the user's root font preference: typography, spacing, component padding.
- **`px`** for hairlines, borders, and one-pixel adjustments where you actually mean 1 device pixel.
- **`em`** when you want size to scale with the parent (rare, but right for icons inside buttons).

```css
.body { font-size: 1rem; padding: 1rem 2rem; }
.border { border: 1px solid var(--border); }       /* always 1 device pixel */
.icon-in-button { width: 1.2em; height: 1.2em; }   /* scales with button text */
```

## `:nth-child` selectors: words, not formulas

```css
/* Good — reads in English */
li:nth-child(odd)
li:nth-child(even)

/* Avoid when a word exists */
li:nth-child(2n+1)
li:nth-child(2n)
```

For other patterns (`3n`, `n+5`), the formula is fine — no English equivalent.

## Colors: hex, or rgba with intent

```css
/* Good */
color: #111;
background: rgba(0, 0, 0, 0.04);

/* Avoid */
color: rgb(17, 17, 17);    /* same as #111, longer */
color: hsl(0, 0%, 7%);     /* harder to read for fixed colors */
```

Use `hex` for fixed colors. Use `rgba` when you need transparency (the alpha is the reason). Use `hsl` when you're *generating* colors (varying hue/saturation programmatically).

## Native over libraries

Prefer `Array.from()`, `.includes()`, `.flat()`, `URLSearchParams`, `IntersectionObserver` over lodash / jQuery equivalents. The web platform shipped these years ago; your bundle doesn't need them.

## Avoid `!important`

Almost always indicates a specificity battle that should be fixed with the cascade, not bypassed. The exception: utility-class systems (Tailwind's `!important` modifier) where it's an intentional opt-out.

## When to apply

Writing or reviewing CSS. These are taste signals, not correctness rules — but accumulating them is the difference between "this CSS works" and "this CSS feels considered."

## Gotcha

These conventions are *not* universal — some teams prefer the opposite (seconds over ms, em over rem, etc.). When joining a codebase, match its existing conventions first. Only when starting fresh do you get to pick.

## Sources

- Ben DC — [github.com/bendc/frontend-guidelines](https://github.com/bendc/frontend-guidelines).
- Related: [[duration-table]] (counter-point on ms vs s), [[transform-mastery]], [[transform-opacity-only]].
