# Edit: Make the card lift on hover

```css
.card {
  transition:
    transform 160ms cubic-bezier(0.25, 1, 0.5, 1),
    box-shadow 160ms cubic-bezier(0.25, 1, 0.5, 1);
}

@media (hover: hover) {
  .card:hover {
    transform: translateY(-1px);
    box-shadow:
      0 1px 1px rgba(17, 17, 17, 0.04),
      0 2px 4px rgba(17, 17, 17, 0.04);
  }
}

@media (prefers-reduced-motion: reduce) {
  .card {
    transition: box-shadow 160ms cubic-bezier(0.25, 1, 0.5, 1);
  }

  .card:hover {
    transform: none;
  }
}
```

## Rationale

The original rule was the exact anti-pattern named in **[[cards-design]]**'s "Card hover states" section: a 4px lift plus a large 32px/0.3-opacity shadow, both flagged there as `[[ai-default-tells]]`. Per **[[hover-states-subtle]]** and its own gotcha log ("4px lifts look bouncy and amateur" / "felt bouncy and amateur" for a translateY(-4px) hover), the lift is cut to `translateY(-1px)` — felt, not seen — and the shadow is replaced with the layered, low-opacity spec from **[[shadows-whisper]]** (2 layers at 4% instead of one loud blur at 30%). `transition: all` is replaced with the explicit `transform`/`box-shadow` pair per **[[transform-opacity-only]]** and the matching gotcha (`transition: all` on a card caused layout thrash when other properties were present) — naming properties is cheap insurance even here since no layout-affecting property is animated. `ease-in` is replaced with a custom `cubic-bezier(0.25, 1, 0.5, 1)` (`--ease-out-quart`) per **[[easing-curves]]**, which rules out `ease-in` for UI as a "hesitating" curve and treats out-quart as the hover/menu default; duration moves to 160ms, inside the 120–200ms band **[[duration-table]]** sets for hover-state changes ("faster on inputs, slower on cards"). The `(hover: hover)` gate and `prefers-reduced-motion` block follow the touch-device and reduced-motion patterns called out directly in **[[hover-states-subtle]]** and the **[[gotchas]]** entry warning against disabling translations without a static fallback.

One tension worth naming: **[[pov]]** (this install is forked to Duolingo's language) overrides `hover-states-subtle` for pressable surfaces with "press compresses 4px; hover lightens the fill" rather than a lift, and groups cards under the same physical construction. Since the user's request explicitly asked for a lift (not a fill-lighten), that instruction was honored rather than substituted — the POV taste call orients ambiguous defaults, it doesn't override an explicit, direct ask — but the magnitude and materials (1px, whisper shadow, correct easing) still came from canon.
