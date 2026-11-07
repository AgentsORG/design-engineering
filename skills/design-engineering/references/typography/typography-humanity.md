---
title: typography-humanity
summary: Why Inter and SF Pro feel default. Indie foundries to know. The single-weight rule.
tags: [typography, fonts]
---

# Typography humanity

Inter and SF Pro are the AI defaults. They are well-designed, neutral, and so widely used that they have become invisible. That's not a virtue — it's a tell.

## What "default" looks like

If a landing page uses Inter Variable from Google Fonts at the standard weights with the standard tracking, the page is competing with every other AI-generated page that did the same thing. Even if the layout is otherwise good, the typeface signals "default."

## Better choices

- **PangramPangram** — Object Sans, Pangram Sans, Pangram Sans Rounded. Free for personal use.
- **Displaay** — Grato, Migra, Neulis. Editorial energy.
- **Grilli Type** — GT Walsheim, GT America, GT Maru. Swiss, considered.
- **Søren Sprogø** — open-runde (free). Geometric with personality.
- **Vercel Geist** — Geist Sans, Geist Mono. Now widely used, but still better than Inter.
- **GitHub Mona** — well-tuned, less common.

## The single-weight rule

For a project's first iteration, buy or download **one weight** of a paid font (the variable family if you need ranges). Use it for headings, body, everything. Pair with the system default for fallback.

This is faster, cheaper, and produces better hierarchy through size and spacing alone. Add weights only when a real need arises.

- **Monospace is not personality.** Keep it for code, identifiers and aligned numbers; a technical product's labels set in mono read as costume.

## When to apply

Anytime you reach for Inter, SF Pro, Roboto, or "system-ui" on a marketing page — stop and pick something else. For in-app product UI, Inter / SF Pro are *fine* (they're optimized for screen UI), but if you do use them, you've used your one default. Don't also use the default colors and the default Lucide icons.

## Reference

The chosen face belongs to the page. A picture of a product uses that product's own faces:

| Surface | Face |
|---|---|
| Page: hero, tile copy | one chosen face, one weight, per the rule above |
| Inside a Notion shot | `ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, sans-serif` |
| Inside a Wikipedia shot | `'Linux Libertine', 'Georgia', 'Times', serif` for the title, a sans stack for the interface |
| Code, IDs, aligned figures | `"SF Mono", "SFMono-Regular", ui-monospace, Consolas, monospace` |

- Bad: a faux Notion window set in GT Walsheim to look designed. Good: Notion's stack, with the humanity coming from the page type around it.
- Benji's call differs inside product shots: there the default system stack is correct, because the product uses it.

Gold example: `stageshow/examples/wikipedia/wiki.css` (the product's real serif and sans together) and `stageshow/examples/notion/notion.css`.

Check: hide the logo and the name. If the page type could belong to any product in its category, the face is still a default.

## Gotcha

Custom typography on tiny UI text (10–12px) often loses legibility. Geometric sans like Walsheim or Pangram look great at 14px+ but mush at 10px. Test at every size you actually use. Inter exists because it's hyper-legible at 12px — sometimes that wins.

See also [[line-length-tracking]] for the rules around how to *use* whichever font you pick.

## Sources

- guidelines.sh — "Inter/SF Pro are AI defaults; explore PangramPangram, Displaay, Grillitype."
- Emil Kowalski / Vercel Geist — single-weight workflows.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/references/craft.md` (Type: one family, monospace only for code, identifiers and aligned numbers), `stageshow/kit/stage.css` (`--ss-font`, `--ss-mono`), `stageshow/examples/wikipedia/wiki.css`, `stageshow/examples/notion/notion.css`, `stageshow/references/review.md` (could it be any product in its category).
