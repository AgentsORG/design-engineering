---
title: unslop-pass
summary: The process for a screen that looks generated — squint, subtract first, sweep color → type → layout → decoration → icons → copy → motion, then put a point of view back in, then audit for survivors. Fifty median choices compound into a recognizable one.
tags: [anti-patterns, ai-defaults, process, review]
---

# The unslop pass

Nobody can point at the one element that makes a screen look AI-generated; they recognize the accumulation. The cause is mechanical: a model reproduces the statistically most common pattern for every decision on the page at once, and fifty median choices don't average into a median design — they compound into a recognizable one. [[ai-default-tells]] is the catalog of tells. This node is the *procedure*, in two halves: strip the tells, then put a point of view back in. The second half is not optional; a screen scrubbed of tells with no opinionated choice is still generic, just more quietly.

## The pass

1. **Squint.** Could this screen belong to any of ten thousand products? Find what ties it to *this* one. If the answer is "the logo", everything else is up for review.
2. **Subtract before you restyle.** Walk every element — icon, line, badge, caption, container, word — and ask *what breaks if this is gone?* If nothing, delete it. "It adds visual interest" and "it fills the space" are the reasons the model put it there. Run the walk twice: deletions expose each other, because an element that survived round one was often only balancing something you just removed. Deletion is free, cannot introduce new tells, and gives every survivor hierarchy for nothing.
3. **Sweep in order**: color, typography, layout, decoration, iconography, copy, motion. Color first because it is the loudest tell; a page survives a common layout, not indigo-to-purple.
4. **Put a point of view back in** (below).
5. **Final read**: "What here would make a designer suspect a model built this?" Fix. Repeat until nothing.

## What the sweep catches

- **Color** — unchosen indigo/violet; more than one gradient, or one with no job; dark-and-neon as a "premium" costume. Derive a palette from the domain, the brand, or the content ([[color-scales-oklch]]).
- **Typography** — gradient text (`bg-clip-text`); the default stack shrugged into place (`Inter font-black tracking-tight`, centered). One distinctive type decision per project does more to de-slop a page than any other single change ([[typography-humanity]]).
- **Layout** — the hero every model builds (pill badge, centered headline, one-line subhead, two buttons, orb); three icon cards; the bento grid as three-cards-with-better-kerning. The tell is layout chosen before content: let one feature go full-width with a real screenshot, six small ones become a list, unequal features get unequal space ([[bento-grids]]).
- **Decoration** — glass with nothing behind it; blurred orbs and blobs behind the hero; border *and* shadow *and* ring *and* gradient on one card; `rounded-2xl` as the answer to every radius ([[depth-and-nesting]]).
- **Iconography** — emoji as feature markers; the sparkle badge on every AI feature. One real icon set, or none ([[icon-systems]]).
- **Fabricated proof** — "Trusted by 10,000+" on an unlaunched product, stock-avatar testimonials, a logo wall nobody agreed to. Real numbers and named quotes, or cut the section; an honest gap beats fake proof ([[content-authenticity]]).
- **Copy** — a headline a competitor could paste unchanged is a visual element that says nothing ([[copy-tells]]).
- **Motion** — `fade-in-up` on every block, `hover:scale-105` on cards that aren't clickable, pulsing blobs ([[marketing-surface-rules]]).

## Looking designed by someone

- Derive the palette from something real.
- One distinctive type decision. One is enough; three is a costume party.
- Show the actual product — a real screenshot, real data, a working embed — instead of abstract illustration.
- Let content break symmetry: an odd number of features, one oversized item, a section that is just a sentence.
- Repeat a signature: one odd element used consistently beats ten borrowed ones used once.
- Restraint is a feature. The confident version has fewer effects than the generated one. Adding "personality effects" on top is re-slopping with extra steps.
- Simplification keeps the character: cut repeated framing (a monogram, sidebar and nav in every crop) before meaningful imagery such as avatars or album art. An empty white card is not the cure (Benji Taylor, Stageshow `references/craft.md`).

## When to apply

"Looks AI-generated", "looks like every other landing page", any generated marketing page, dashboard, or app screen before it ships. Spawn [[anti-pattern-scanner]] for the catalog scan; run this node for the pass itself.

## Reference

The pass on one customers card at 400 x 300:

- Subtract: six rows of name, amount and badge become three real rows (the selected customer and its two neighbors); the rows the crop takes are bars at varied widths (84, 64, 78).
- Subtract: the pill on the active nav item goes; weight alone marks it, because a pill would peek out beside the detail card.
- Point of view: the window is pinned top-left and runs off the right and bottom; one detail card straddles its sidebar about half outside, with real words only on the name and the `$72.00` total.
- End check, Benji's five failures: too much (real text everywhere), wireframe (two gray blobs), boxed (the window shrunk into a card with even margins), flat (every object one weight), bland (the brief's look never shows). Subtraction overshoots into wireframe; stop before it.

Gold example: `stageshow/examples/static-card/` (`index.tsx`, `card.css`).
Check: shrink the screenshot to thumbnail size; subject, support and empty space should read as one picture. Then name which of the five failures each remaining fault is, and fix the largest first.

## Gotcha

The pass ends when you can name the one choice a competitor couldn't copy-paste. If nothing on the screen answers, you stopped after half one.

## Sources

- Emil Kowalski's design-engineering practice on generated UI, distilled by HKTITAN.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/examples/static-card/index.tsx`, `stageshow/examples/static-card/card.css`, `stageshow/SKILL.md` (Five ways it fails), `stageshow/references/craft.md` (Restraint).
- Benji Taylor, benji.org/stageshow (read 2026-11-07).
- Related: [[ai-default-tells]], [[content-authenticity]], [[feeling-right]], [[copy-tells]].
