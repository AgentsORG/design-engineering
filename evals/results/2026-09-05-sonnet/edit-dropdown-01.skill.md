# Edit: Animate the dropdown opening from its trigger

```css
.dropdown {
  opacity: 0;
  transform: scale(0.95);
  transform-origin: var(--dropdown-origin, top left);
  animation: dropdown-in 180ms var(--ease-out-quart, cubic-bezier(0.25, 1, 0.5, 1)) forwards;
}

@keyframes dropdown-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .dropdown {
    animation: none;
    opacity: 1;
    transform: scale(1);
    transition: opacity 120ms linear;
  }
}
```

```ts
// Set at open-time so the dropdown scales from the edge nearest its trigger,
// e.g. "top left" when the trigger sits above-left of the panel.
dropdown.style.setProperty('--dropdown-origin', 'top left');
```

## Rationale

The original rule broke three motion nodes at once: `scale(0)` is [[never-scale-from-zero]]'s canonical mistake — the panel is invisible for the first frames then balloons into view, which reads as theatrical rather than a menu opening — so the fix starts at `scale(0.95)`, letting opacity carry most of the visibility work. `ease-in` violates [[easing-curves]] ("never `ease-in` for UI" — it looks like the UI is hesitating); it's replaced with `--ease-out-quart`, the curve's default for menus. `400ms` overshot [[duration-table]]'s popover/dropdown band (150–250ms, "should feel instant, not theatrical"), so duration drops to 180ms. To satisfy "opening from its trigger" specifically, [[transform-mastery]]'s `transform-origin` guidance is applied via a `--dropdown-origin` custom property set at open-time to the anchor edge closest to the trigger — this is the mechanism that makes the scale visibly originate from the trigger instead of the panel's own center. Only `opacity` and `transform` are animated per [[transform-opacity-only]], keeping the whole sequence GPU-only. A `prefers-reduced-motion` block is included per the gotchas file's explicit warning against disabling opacity fades alongside transforms — it drops the scale but keeps a fast opacity fade. Per [[pov]], this install's Duolingo fork doesn't touch generic panel/menu motion (it only raises the floor on taps and reward beats), so canonical defaults — and every node cited above — apply unmodified.
