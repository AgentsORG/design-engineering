# Repair: Cards disappear in dark mode

```css
:root {
  --surface: #ffffff;
  --border-color: rgba(0, 0, 0, 0.08);
  --shadow-color: rgba(0, 0, 0, 0.08);
}

.dark {
  background: #000;
  --surface: #1c1c1e;
  --border-color: rgba(255, 255, 255, 0.12);
  --shadow-color: rgba(0, 0, 0, 0.6);
}

.card {
  background: var(--surface);
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 24px var(--shadow-color);
}
```

## Rationale

The card never had its own background, so on a `#000` page it simply inherited black-on-black; on top of that, the `box-shadow` was a black shadow at 8% opacity, which reads as a soft gray lift on white but is completely invisible against a black backdrop — so even the shadow gave no edge to see. The fix gives `.card` an explicit `background` and a hairline `border` that both switch via CSS custom properties scoped to `.dark`, so the card gets a genuine surface color (a lighter near-black) and a light-based border for separation instead of relying on a shadow alone; the shadow itself is also darkened/strengthened in dark mode so it still reads as depth rather than disappearing into the page.
