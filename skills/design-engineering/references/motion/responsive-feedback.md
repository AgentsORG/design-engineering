---
title: responsive-feedback
summary: Button press, tooltip skip-delay, popover origin awareness — the small responsiveness wins.
tags: [motion, components, micro-interaction]
---

# Responsive feedback

Three consolidated micro-interactions that together account for "this feels considered" more than any other set. Each is small. The sum is what users notice.

## 1. Button press feedback

Buttons must visibly respond to `:active`. The minimum:

```css
.button {
  transition: transform 100ms var(--ease-out-quart);
}
.button:active {
  transform: scale(0.97);
}
```

**Canonical press scale:** `0.97` for buttons, `0.96` for small controls (icon buttons, chips, toggles), and `0.95` as the floor — below it the press looks squishy and cartoonish. Duration stays 100–160ms with an ease-out; the transition lets a mid-press release glide back. `scale()` takes the label and icon with it, which is what reads as physical. Dense or 100+/day controls can skip it — bake a `still` opt-out into the Button.

For touch targets, add a subtle background dimming as well — a 4% darker overlay on press. This compensates for the fact that the user's finger covers the button.

## 2. Popover origin awareness

A dropdown opened from the top-right of the screen should *animate from* the top-right, not from center. Same with context menus, tooltips, and any popover-style element.

```css
.popover {
  transform-origin: var(--popover-origin, top right);
  transform: scale(0.96);
  opacity: 0;
  transition: transform 180ms var(--ease-out-quart), opacity 180ms;
}
.popover[data-state="open"] {
  transform: scale(1);
  opacity: 1;
}
```

Radix UI, React Aria, and Floating UI all expose the trigger position — use it to set `transform-origin`.

**Exception:** modals stay centered. They are not popovers; they are hierarchy shifts. See [[fly-not-teleport]].

## 3. Tooltip skip-delay

The first tooltip in a group should have a 400–700ms delay before appearing (so casual hovers don't trigger it). Subsequent tooltips in the same UI cluster should appear *instantly*.

The first tooltip animates in ~125ms (`scale(0.97)` + opacity, from `var(--transform-origin)`). The skip applies to the animation as well as the delay:

```css
.tooltip[data-instant] { transition-duration: 0ms; } /* Radix / Base UI set this */
```

Radix's `Tooltip.Provider skipDelayDuration={300}` handles the delay side.

This is the single most reused micro-interaction in well-designed UIs. Without it, exploring a toolbar feels gluey. With it, the user gets the tooltip exactly when they want it.

## 4. Hover delay symmetry

When a tooltip / popover has an open delay, it should also have a close delay. ~150ms. Otherwise the user moves slightly and the popover flickers.

## When to apply

Any time you build a button, a tooltip, a popover, a context menu, or a hover-revealed UI. These are the table stakes.

## Reference

```css
.popover { opacity: 0; transition: opacity 180ms ease; }
.popover::before { /* holds the background and shadow */
  content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit;
  transform: scale(0.96); transform-origin: var(--popover-origin, top right);
  transition: transform 180ms var(--ease-out-quart);
}
.popover[data-state="open"] { opacity: 1; }
.popover[data-state="open"]::before { transform: none; }
```

Bad: pointer-down changes nothing and "Saved" appears 300ms later. Good: `scale(0.97)` on pointer-down, then the label changes on the same button.
Bad: a toolbar where every tooltip waits its full 500ms, even when the pointer slides straight from one open tooltip to the next, so exploring feels gluey. Good: the first tooltip in the group waits 500ms; while the group is warm, its siblings open at 0ms with no entrance.
Gold example: `stageshow/kit/motion/Popover.css`. Only the surface scales from the origin and the words just fade, because text that ends a scale is redrawn snapped to the pixel grid and wobbles as it lands; closing, the whole popover shrinks toward its origin as one object. The press pair is in `stageshow/teaching/contrasts.tsx` (press).
Benji's call differs: Stageshow's Button settles its press over 180ms `cubic-bezier(0.2, 0.8, 0.2, 1)` and its popover surface over 240ms `cubic-bezier(0.22, 1, 0.36, 1)`; this node keeps 100–160ms for the press.
Check: film a press and a popover open stepped at 40ms. The button moves on the first frame after pointer-down, before any result; the popover's first frame grows out of the trigger's corner; its text is sharp on the settle frame.

## Gotcha

Don't set `:active` on form `<input>` elements the same way — scaling an input mid-type is disorienting. Use background-color shift instead. Form inputs get *border-color* + subtle *background* changes on active, not scale.

## Sources

- Emil Kowalski — tooltips, popovers, origin-awareness from Sonner / Vaul.
- Radix UI — `Tooltip.Provider skipDelay` implementation.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, read 2026-11-07): skills/animate/RECIPES.md (button press, tooltip `data-instant`); unchanged through `715c180`.
- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG (the warm tooltip group at 500ms).
- Emil Kowalski's design-engineering practice, distilled by AgentsORG (0.96 small-control press, 0.95 floor, `still` opt-out).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/motion/Popover.css`, `stageshow/kit/controls/Button.css`, `stageshow/teaching/contrasts.tsx` (press).
