---
title: stagger-choreography
summary: Cascading reveals (30–80ms delays, under ~300ms in total). When stagger helps comprehension and when it just reads as noise; the wider choreography of several moving parts is motion-choreography.
tags: [motion, stagger, choreography]
---

# Stagger choreography

A stagger is a sequence of similar animations offset by a small delay. Done well, it directs attention and reveals structure. Done badly, it looks like the app is loading slowly. It is one of four ways two moving parts can relate; cast the parts and pick the relationship first in [[motion-choreography]].

## When to stagger

- Multiple sibling elements appearing for the first time (list items, dashboard cards, search results).
- A grouped set of items whose order matters (top-down, left-to-right, by importance).
- A choreographed reveal that pairs with a single trigger event (page enter, modal open).
- Dependent responses to one change: the setting leads, and its dependents start before the previous ones finish, with offsets that keep the order legible while the frame around them holds still (Benji Taylor, Stageshow `references/choreography.md`).

## When NOT to stagger

- The user is in a power-use loop (search-as-you-type, repeated filter changes). The first stagger was fine; the tenth is friction.
- The list has more than ~12 items. Past that, the last items feel sluggish.
- The items are visually identical and the order is arbitrary. Stagger implies hierarchy; arbitrary order misleads.
- The container already enters. One entrance per container: a panel that slides in carries its items, it does not also stagger them.
- The surface is opened many times a day or from the keyboard (menus, command palettes, tab panels, list rows).

## The delay range

```ts
// good
const delay = (i) => i * 0.05; // 50ms per item

// too slow — feels like loading
const delay = (i) => i * 0.15;

// too fast — looks like all at once with extra steps
const delay = (i) => i * 0.02;
```

Sweet spot is **30–80ms** between items. Adjust for item count and physical size on screen. Keep the steps uneven: the lead moves furthest, support less, decoration only fades, and gaps that shrink down the group read as a wave where equal gaps read as a metronome (Motion's `stagger()` takes `from` and `ease` for this).

In plain CSS, give each item `--i` and set `animation-delay: calc(var(--step) * var(--i))` with `animation-fill-mode: both`. Without the backwards half, a delayed item sits at rest through its delay and then jumps to the first frame. A keyframe with only `from` ends on the element's own styles, so there is no end state to keep in sync. Things that land as one beat (a title and its first paragraph) share an index.

## The "stop at 12" pattern

For product UI the cap is about six: items past the sixth share its delay, so a 50–60ms step stays inside the ~300ms budget. Twelve is the ceiling for an occasional, first-run list.

```ts
const STAGGER_CAP = 6; // 12 only for a first-run list
const delay = (i) => Math.min(i, STAGGER_CAP) * 0.05;
```

Items past the cap appear together with the last staggered item. This avoids the "still loading row 47" feel. Whatever the cap, keep the whole cascade under ~300ms; past that, drop to 30ms per item or fade the group as one ([[animation-removal-hazards]]).

## Section entrances: split, then stagger

For a page or hero entrance, don't move one wrapper. Split it into heading, copy and call to action, offset each by ~90–100ms (per word in a hero headline, ~80ms), and enter each with opacity, `translateY(8px)` → 0 and `blur(2px)` → 0. Section pieces are fewer and larger than list items, which is why the gap is wider than 30–80ms. A moment seen once per visit (a hero, a personal site) may widen the step to 100–150ms on 0.5–0.6s entrances; product UI keeps 30–80ms.

## First paint is not an entrance

Anything already at rest when the page paints plays nothing; motion is for changes the user causes afterward. In Motion, `initial={false}` on `AnimatePresence` covers toggles, tabs and icon swaps — but not a deliberate first-run hero, where it would wipe the entrance. Hard-refresh to check. In an exiting group, `mode="popLayout"` lets siblings close the gap while the exit plays.

## Exits go at once

In product UI an exit is simultaneous, shorter and simpler than the entry: the user already chose to leave, so don't reverse-stagger it out. A film or demo loop that resets around an anchor is the exception (Reference below).

## Direction matters

- **Top-to-bottom:** default for vertical lists.
- **Center-out:** for celebratory moments (confetti, success screens).
- **Left-to-right:** for narrative content (onboarding steps).
- **Per-item motion direction matters too:** if items slide up to enter, the stagger should feel like a wave from bottom to top.

## When to apply

First-render of any list of 3+ items. Modal open with multiple internal sections. Search results page on initial query (not on refinement).

## Reference

| Job | Gap |
| --- | --- |
| Rows in reading order | 60ms (40–80), `act.stagger`'s default in `stageshow/kit/act.ts` |
| Tiles of a grid or bento | 80–120ms; one object enters whole |
| Dependents of one change | 0, 100, 220, 420ms on one 900ms curve |
| Exit or reset around an anchor | reverse order, about 70ms apart, done within 0.5s |

Gold example: `stageshow/examples/choreography/` (`choreography.css`, the `transition-delay` lines): a checkout changes market, the currency leads and the pay label, method and address follow, while the comparison beside it starts everything at once so timing is the only variable.
Benji's call differs: when several status words change at once, as a loop resets, Stageshow cascades them about 60ms apart, because a column changing in unison reads as flicker; this node's no-restagger rule still holds for sort and filter.
Check: export a contact sheet at 40ms. Each item's first moving frame falls in reading order, then cover one moving item at a time; if the order reads as well without it, cut its motion.

## Gotcha

Stagger on every state change is exhausting. Only stagger on **first appearance**. Subsequent updates (sorting, filtering) should crossfade in place or use a layout animation. Re-staggering on filter-change makes the UI feel slower than it is.

## Sources

- Emil Kowalski — stagger guidance (30–80ms, decorative, never blocks interaction). The cap at 12 is house guidance; the product cap of six is upstream's.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, read 2026-11-07): skills/remove-animations/SKILL.md (300ms total cap); unchanged through `715c180`.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, read 2026-11-07): skills/choreograph/SKILL.md (one entrance per container, no stagger on high-frequency UI, no uniform stagger, simultaneous exits); unchanged through `715c180`.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/choreograph/SKILL.md and RECIPES.md (the CSS index stagger with fill mode `both`, the six-item product cap, 100–150ms steps for first-run moments).
- Emil Kowalski's design-engineering practice, distilled by AgentsORG (split-then-stagger sections, no entrance on first paint).
- guidelines.sh — "stagger reveals 30–50ms."
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/references/choreography.md`, `stageshow/references/motion.md` (Pace and easing, Changing text and values, Loops), `stageshow/kit/act.ts` (`stagger`), `stageshow/examples/choreography/choreography.css`.
