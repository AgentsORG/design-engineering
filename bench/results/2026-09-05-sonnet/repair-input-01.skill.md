# Repair: Page zooms when tapping the search field on iPhone

## Fixed code

```css
input[type=search] {
  font-size: 16px; /* was 14px — anything below 16px triggers iOS Safari's auto-zoom on focus */
  touch-action: manipulation; /* removes the 300ms double-tap-zoom delay on tap */
}
```

## Rationale

[[touch-and-focus]]'s mobile-native fixes table names this exact bug — "Page zooms into an input → Input font-size ≥ 16px" — and [[forms-behavior]] confirms the same floor ("Inputs, textareas, and selects at ≥ 16px on touch viewports"), so the repair is a one-line bump from `14px` to `16px`, not a viewport-meta hack. [[line-behavior]] is why: it names the mechanism (iOS Safari zooms any input whose computed font-size is under 16px) and explicitly forbids the tempting shortcut of patching it with `maximum-scale=1` in the viewport meta tag, since that strips pinch-zoom for every user, not just this input, and fails WCAG 1.4.4. `touch-action: manipulation` is added per rule 3 of [[touch-and-focus]] ("on buttons, links, inputs") — it doesn't fix the zoom-on-focus bug itself, but it removes the adjacent double-tap-zoom delay on the same element while we're already touching this rule, so the field feels instant on the next tap too. [[pov]] is silent on input sizing specifically, so canon holds unscoped: no media query is needed to protect a "always 14px" mandate, since the Duolingo-forked body-face floor is "never below 14px," and 16px satisfies that trivially — there's no conflict to reconcile. [[gotchas]] had no existing entry for this exact failure, so none was cited, but it's the same family as the appended `maximum-scale`-style near-misses this file exists to catch.
