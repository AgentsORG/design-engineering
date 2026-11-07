---
title: faux-ui-restraint
summary: The still frame of a faux product UI — a word budget of 3–7 real strings with placeholder bars for the rest, fidelity as a dial, the domain's signature content kept, real type sizes, the spacing numbers (12px word inset, 8px above a button, 4–6px between a title and its subtitle, 6px around a dot), icons from one set, real marks only, no AI sparkle, opaque fills, platform chrome kept true.
tags: [faux-ui, restraint, placeholder, fidelity, spacing, icons, chrome]
---

# Faux-UI restraint

Left alone, an agent fills every row: it knows what a support inbox contains. The more readable detail, the more generated the picture looks. The fix is a full, structured screen in quiet greys, real words only where the story is, placeholder lines for the rest, and room to breathe. **Simplify the words, not the context.**

## The word budget

- **Count the real strings:** the title, the thing acted on, what is typed, the result. Usually 3 to 7. Everything else is a placeholder bar.
- **A word budget is not an element budget.** A calendar still needs a populated week; a search still needs a collection to search.
- **Bars belong at the edges; words go where the eye lands.** Grey bars on the subject read unfinished. Where the story touches a list: two or three real rows and at most as many bars.
- **In a small surface a row is one line** (avatar, name, value), never a grey bar under a real name.
- **Label and value match:** both words or both bars. A blank pill beside a real control is dead; drop it.
- **Keep the domain's signature content** — album art, thumbnails, avatars. Swapped for the feature's signal, a music app becomes a generic list.
- **One number gets to be big.** **Say it once:** one clear sign of the feature, not its signal in header, satellite and every row.
- **Placeholder widths vary** row to row (60, 45, 70, 52), and a bar sits in the line box of the text it replaces, so a skeleton row keeps the real row's pitch.
- **No masthead for a fictional product.** Its name appears only where the real product would show it (a notification's app name, a title bar), and only when the brief leans on it.

## Fidelity is a dial

`minimal` is all bars; `standard` is words where they carry meaning and bars elsewhere (the default); `realistic` is plausible content everywhere, still with air — the right call at hero scale, for a named real product, or for a still whose subject *is* the list. Write filler once, as text that becomes a bar below realistic, so the dial decides. Realism is the developer's call; so is character: a brief with a style (kawaii, blueprint, paper, glass over colour) gets that style in full, still built to these rules.

## Type and spacing

- UI text at real sizes, 11–15px, scaled by the stage; nothing under 10px as rendered on a phone. One family; monospace only for code, identifiers and aligned numbers. Sentence case unless the product capitalises.
- **No real headings:** a faux app's title is a `div`, never `h1`–`h6`; the demo lives inside someone else's page outline.
- Words keep a 12px inset from any window, card, panel or hovered row edge (under 8px is a fault). Row padding 12px, 8px dense; a one-line row three times taller than its words is a fat row.
- A button sits 8–12px from the field or line above it: closer reads as touching, much further and it drifts off from the field it belongs to. A floating card (a comment popup, a toast) pads the same all round, measured to the avatar's and button's edges, not their words. A title over its subtitle has 4–6px of ink between them; the air comes from the row's padding.
- Buttons, cards, fields, toasts and shortcuts come from a component, never a lookalike class per screen: a hand-built one is where uneven padding, squeezed labels and unsized text come from.
- A progress ring is one track and one arc with round caps, never dashed segments; its number centres on its digits (proportional figures, trimmed to cap height).
- A status dot, badge or ring is not a column: 6px clear of the avatar or text, inside the row's inset.
- No near-tangents: edges 1–3px apart look accidental. Align them exactly, or part them by the gutter and never under 8px.
- Centre a label on its letters (`text-box: trim-both cap alphabetic`), not its line box. A centred amount centres its digits; the currency sign hangs at `right: 100%`.
- Nested shapes pad evenly, and the outer radius is the inner radius plus that padding.

## Icons, marks and colour

- **Icons come from a set, never from your hand** — the product's own pack first, else one chosen on purpose, one size (14–16px) and one stroke throughout; filled at 14px and under ([[icon-systems]]). One opaque colour; fade with `opacity` on the whole SVG, never translucent ink that darkens where strokes cross.
- **Emoji are content, never icons.**
- **A real company carries its real mark** in its own proportions and colours, or a plain text wordmark. A letter in a coloured square beside a real name is an invented logo.
- **No sparkle, wand or purple as the colour of AI.** Show what the AI does. The product's own sparkle icon is fine; a generic one is decoration ([[ai-default-tells]]).
- One neutral family, five inks and one accent to start; status colours mean status. Nothing translucent overlaps. On dark, depth comes from a lighter surface, not a shadow ([[dark-mode]]). The hero is never outlined with an accent ring to point at it: lift it as the product would.

## Chrome and devices

- Chrome for the task: browser chrome only when the browser is part of the picture; a desktop app gets its real chrome; never platform chrome drawn from memory — open the real app or a screenshot.
- The phone draws its own status bar and home indicator; never hand-drawn. Nothing sits under the Dynamic Island. A phone is lit from its first frame.
- An iPhone messaging app keeps Messages' conventions (blue sent, grey received, plus and mic in the composer) unless the brief gives it a look. Platform conventions are the product's chrome, not placeholders.

## When to apply

Building or reviewing the still frame of any faux UI, and the poster frame of an animated one.

## Reference

A comment card at 13px, hand-built and then built on the kit's `Card` (Stageshow `examples/cards`):

| Before | After |
|---|---|
| `padding: 20px 14px`, Resolve 4px under the body, inner quote `border-radius: 12px` | `<Card>`: 16px on every side, `gap` 12, the quote's radius `var(--ss-card-inner)` (the card's radius less its padding) |
| Name, time, body, quote, two rows of metadata, three buttons, all real words | Mara Lind, "2m", one sentence, Reply, Resolve: five real strings; the quote is two bars at 80% and 56% |
| Body left at the 16px page default | Body 13px at a 1.45 line height |

Gold example: `stageshow/examples/cards/index.tsx` for the card; `stageshow/examples/static-card/` for a whole still on the word budget.
Check: count the real strings in the poster (3–7), then measure the card's four paddings to the avatar and button edges; they should match to the pixel.

## Gotcha

Stripping the screen to two blobs is the opposite failure. If it looks emptier, flatter or smaller than the closest reference shot, enlarge the content and add structure before adding words ([[screenshot-critique]] makes the same point for pages).

## Sources

- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/references/craft.md` (restraint, type, spacing and alignment, icons and logos, colour, chrome and devices; the 8–12px button gap, floating-card padding and progress ring are 1.1), `stageshow/references/brands.md`, `stageshow/references/teaching.md` (the style pairs), `stageshow/SKILL.md` (use the kit part, never a lookalike), `stageshow/kit/parts/Card.css`, `stageshow/examples/cards/`, `stageshow/examples/static-card/`. Paraphrased.
- Related: [[product-shot-framing]], [[content-authenticity]], [[stageshow-reconciliation]].
