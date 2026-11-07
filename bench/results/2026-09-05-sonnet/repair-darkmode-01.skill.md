# Repair: cards disappear in dark mode

```css
:root {
  --bg-page: #ffffff;
  --bg-card: #ffffff;
  --border-card: rgba(0, 0, 0, 0.08);
  --shadow-card:
    0 1px 1px rgba(17, 17, 17, 0.04),
    0 2px 4px rgba(17, 17, 17, 0.04),
    0 4px 24px rgba(17, 17, 17, 0.06);
}

.dark {
  /* dark mode is a remap, not an inversion — never pure #000/#fff */
  --bg-page: #131f24;
  --bg-card: #1b2930;                    /* elevated surface, one step lighter than the ground */
  --border-card: rgba(255, 255, 255, 0.09);
  --shadow-card: 0 0 0 1px var(--border-card); /* shadows have nothing to fall on in the dark; a hairline ring does the job */
}

body {
  background: var(--bg-page);
}

.card {
  background: var(--bg-card);   /* was missing entirely — card had no surface color of its own */
  box-shadow: var(--shadow-card);
  border-radius: 16px;
  transition: box-shadow 150ms ease-out;
}
```

## Rationale

The card had two compounding bugs, not one: it never declared its own `background`, so in dark mode it inherited the same color as the page and had nothing to visually separate it; and its only separation cue was a `rgba(0,0,0,0.08)` shadow, which is a black-on-black shadow once the page background is also near-black — literally invisible. `.dark { background: #000 }` made both failures total. The fix gives `.card` an explicit elevated surface token (`--bg-card`, one step lighter than the page in dark mode) per [[depth-and-nesting]]'s "themes flip variables, not classes" rule, and swaps the shadow token for a low-opacity white ring in dark mode, since "shadows vanish on dark; a ring does the job" — the same pairing [[shadows-whisper]] specifies for dark-mode elevation. The background itself moves off pure `#000` per [[dark-mode]] ("the single most common dark mode mistake") and, since this install's `pov.md` hard-overrides the exact value ("the dark ground is `#131F24`... never `#000`/`#FFF`"), that token is used rather than the generic `#18181b`/`#1a1a1a` default.
