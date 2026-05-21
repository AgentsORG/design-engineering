---
title: distance-falloff-propagation
summary: Per-element lift via `lift * pow(falloff, distance)` for grouped hover. Avatar groups, list rows.
tags: [motion, hover, group]
---

# Distance-falloff hover propagation

When you hover one element in a group (avatar stack, row of icons, list of cards), neighboring elements can subtly react. Done well, this signals "this group is connected" without being theatrical. Done poorly, it's distracting.

Jakub Antalik's transitions.dev catalog uses a clean formula:

```
shift = lift * pow(falloff, distance)
scale = 1 + (max_scale - 1) * pow(falloff, distance)
```

Where:
- `lift` = maximum displacement of the hovered element (e.g. -8px on hover).
- `falloff` = how quickly the effect decays per neighbor (e.g. 0.45).
- `distance` = number of elements between the hovered and the current one.

## Concrete example — avatar stack

```ts
const lift = -8;       // px
const maxScale = 1.08;
const falloff = 0.45;

avatars.forEach((avatar, i) => {
  const distance = Math.abs(i - hoveredIndex);
  const shift = lift * Math.pow(falloff, distance);
  const scale = 1 + (maxScale - 1) * Math.pow(falloff, distance);

  avatar.style.transform = `translateY(${shift}px) scale(${scale})`;
});
```

Result:
- Hovered avatar: full lift (-8px) and full scale (1.08).
- Neighbor at distance 1: -3.6px, scale 1.036.
- Neighbor at distance 2: -1.6px, scale 1.016.
- Neighbor at distance 3: -0.7px, scale 1.007.

By distance 4, the effect is below 1px and visually invisible — which is correct. The propagation should fade to nothing within 3–4 neighbors.

## The two-phase curve trick

Jakub uses a different easing on **lift** vs **return**:

```css
.avatar {
  transition: transform 200ms var(--ease-out-quart);
}
.avatar.returning {
  transition: transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1); /* bouncy */
}
```

- **Lift uses ease-out-quart** — feels responsive, settles cleanly.
- **Return uses a spring-shaped bezier** — feels alive, has a tiny bounce on settle.

The asymmetry is what gives the interaction its character. Same curve in both directions feels mechanical.

## When to apply

- Avatar groups (user mentions, collaborator pills).
- Toolbar rows where each item has personality (emoji reactions).
- Image carousels with thumbnail rows.
- List rows where the next/prev rows should subtly respond.

## When NOT to apply

- High-density data tables. Propagation makes the whole row feel like it's moving when the user scans.
- Touch-only UIs. There's no hover; the technique doesn't fire.
- Lists of more than ~20 elements at once. The reflow cost rises.

## Performance

This pattern modifies `transform` on N elements every mouseover. Use:
- `transform` only (GPU-accelerated, see [[transform-opacity-only]]).
- `requestAnimationFrame` to batch updates.
- Don't `setState` per element in React — use refs and direct `style.transform` assignment, or use a single CSS variable trick:

```css
.group { --hover-index: -1; }
.item {
  --my-distance: abs(var(--my-index) - var(--hover-index));
  transform: translateY(calc(-8px * pow(0.45, var(--my-distance))));
}
```

(CSS `pow()` requires modern browsers. Fall back to JS for legacy support.)

## Gotcha

The falloff coefficient matters more than the lift. A falloff of 0.8 propagates far and feels like the whole group is moving. A falloff of 0.2 dies too fast and looks like only the hovered item is reacting. **0.4–0.5 is the sweet spot.**

## Sources

- Jakub Antalik — transitions.dev, prototype P8 (avatar group).
