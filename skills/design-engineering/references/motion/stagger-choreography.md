---
title: stagger-choreography
summary: Cascading reveals (30–80ms delays). When stagger helps comprehension and when it just reads as noise.
tags: [motion, stagger, choreography]
---

# Stagger choreography

A stagger is a sequence of similar animations offset by a small delay. Done well, it directs attention and reveals structure. Done badly, it looks like the app is loading slowly.

## When to stagger

- Multiple sibling elements appearing for the first time (list items, dashboard cards, search results).
- A grouped set of items whose order matters (top-down, left-to-right, by importance).
- A choreographed reveal that pairs with a single trigger event (page enter, modal open).

## When NOT to stagger

- The user is in a power-use loop (search-as-you-type, repeated filter changes). The first stagger was fine; the tenth is friction.
- The list has more than ~12 items. Past that, the last items feel sluggish.
- The items are visually identical and the order is arbitrary. Stagger implies hierarchy; arbitrary order misleads.

## The delay range

```ts
// good
const delay = (i) => i * 0.05; // 50ms per item

// too slow — feels like loading
const delay = (i) => i * 0.15;

// too fast — looks like all at once with extra steps
const delay = (i) => i * 0.02;
```

Sweet spot is **30–80ms** between items. Adjust for item count and physical size on screen.

## The "stop at 12" pattern

If you have more than 12 items, cap the stagger:

```ts
const STAGGER_CAP = 12;
const delay = (i) => Math.min(i, STAGGER_CAP) * 0.05;
```

Items past the cap appear together with the last staggered item. This avoids the "still loading row 47" feel.

## Reverse stagger on exit

If a list staggers in top-to-bottom, it should exit in the opposite order. Either reverse the index or simply make the exit faster and unstaggered (often best).

## Direction matters

- **Top-to-bottom:** default for vertical lists.
- **Center-out:** for celebratory moments (confetti, success screens).
- **Left-to-right:** for narrative content (onboarding steps).
- **Per-item motion direction matters too:** if items slide up to enter, the stagger should feel like a wave from bottom to top.

## When to apply

First-render of any list of 3+ items. Modal open with multiple internal sections. Search results page on initial query (not on refinement).

## Gotcha

Stagger on every state change is exhausting. Only stagger on **first appearance**. Subsequent updates (sorting, filtering) should crossfade in place or use a layout animation. Re-staggering on filter-change makes the UI feel slower than it is.

## Sources

- Emil Kowalski — stagger guidance, cap-at-12.
- guidelines.sh — "stagger reveals 30–50ms."
