---
title: line-length-tracking
summary: 45-75 chars per line. Tighten tracking as size increases. text-wrap: pretty. Uppercase rules.
tags: [typography, layout]
---

# Line length, tracking, and text wrap

## Line length

Aim for **45–75 characters per line** in body text. This is from the *Elements of Typographic Style* (Bringhurst). Outside this range, the eye works harder than it should — short lines feel choppy, long lines lose the start of the next line.

For prose: 60–70 characters per line is the sweet spot.
For UI labels and form fields: shorter is fine; you control them.

CSS:

```css
.prose {
  max-width: 65ch;
}
```

The `ch` unit measures the width of the "0" character in the current font, which approximates character count well enough.

## Tracking (letter-spacing)

Tracking and font size are inversely coupled:

| Size | Tracking |
|---|---|
| 10–12px | +0.5px to +1px (open up tiny text) |
| 14–16px (body) | 0 (default) |
| 20–28px | -0.01em to -0.02em (slight tighten) |
| 32–48px (headings) | -0.02em to -0.04em |
| 64px+ (display) | -0.04em to -0.06em |

Larger sizes need negative tracking because the natural spacing of a typeface is calibrated for body sizes. Forgetting to tighten display text is one of the most common amateur tells.

```css
h1 { font-size: 48px; letter-spacing: -0.03em; }
.body { font-size: 16px; letter-spacing: 0; }
.caption { font-size: 11px; letter-spacing: 0.04em; }
```

## `text-wrap: pretty` and `text-wrap: balance`

```css
h1, h2, h3 { text-wrap: balance; }
p { text-wrap: pretty; }
```

- **`balance`** — distributes words evenly across lines. Best for headings (avoids the last line being one word).
- **`pretty`** — avoids orphans and improves line breaks in prose. Best for body text.

Browser support is now broad enough (Chrome 114+, Safari 17.4+) to ship without fallback. The improvement is large for headings.

## Uppercase

Uppercase text is harder to read because all letters are the same height. Rules:

- **OK at small sizes** (10–12px) with **wide tracking** (+0.05em to +0.1em). Common for eyebrow labels, navigation, badges.
- **OK for short phrases** (under 4 words) at any size.
- **Avoid** uppercase for body prose, multi-sentence content, or anything users need to skim.

## When to apply

Every time you build a typography system. Build these into your token set:
- `--max-prose: 65ch;`
- `--tracking-display: -0.03em;`
- `--tracking-body: 0;`
- `--tracking-caps: 0.06em;`

## Gotcha

`text-wrap: balance` has a node-count limit (Chrome caps at ~6 lines for performance). It silently does nothing past that — so don't apply it to long paragraphs and assume it's working.

## Sources

- Bringhurst, *Elements of Typographic Style*.
- guidelines.sh — tracking rules, line length, `text-wrap: pretty`.
- web.dev — text-wrap balance/pretty.
