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
- A button sits 8px or more from the field or line above it. A title over its subtitle has 4–6px of ink between them; the air comes from the row's padding.
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

## Gotcha

Stripping the screen to two blobs is the opposite failure. If it looks emptier, flatter or smaller than the closest reference shot, enlarge the content and add structure before adding words ([[screenshot-critique]] has the same lesson for pages).

## Sources

- Benji Taylor, Stageshow (MIT, HEAD `8020574`, read 2026-11-01): `references/craft.md` (restraint, type, spacing and alignment, icons and logos, colour, chrome and devices), `references/brands.md`, `references/teaching.md` (the style pairs). Paraphrased.
- Related: [[product-shot-framing]], [[content-authenticity]], [[stageshow-reconciliation]].
