---
title: screenshot-critique
summary: Critique the render, never your own code — single-purpose passes over screenshots at three widths, a fixed write-up per round, a fix order where later items cannot rescue earlier ones, and a three-round stop. Subtraction that leaves a page thin loses.
tags: [anti-patterns, review, critique, screenshots, procedure, marketing]
---

# Screenshot critique

An agent that critiques the page it just wrote reads its own intentions back: the class names say "hero", so it sees a hero. Critique the **render** instead: screenshots at 1440, 768 and 390, first screen and full page, opened before the code. [[unslop-pass]] says what to strip and what to put back. This node is how to look, how to write it down, and when to stop.

## Passes, one at a time

Make each pass on its own; blending them is how a page gets "looks good overall".

1. **One second, then five.** Glance away: there should be exactly one answer (a word, an image, an object), not "a website". Then five seconds as a stranger: what is this, who is it for, what do I do next? ([[page-frame]])
2. **Squint, then cover the logo** — the two passes in [[unslop-pass]]. Then scroll: does the idea reach the pricing and the footer, or turn into stock blocks after the first screen?
3. **Edges.** Follow the left edge of every text block down the page and count the distinct x positions. Two or three, reused on purpose, is a composition; six means things were placed one at a time.
4. **Frame.** Equal margins, no half-empty section, no stretch of nothing taller than half a screen ([[page-frame]]).
5. **Sameness.** Write one word per section's layout (split, list, grid, full-bleed, statement). The same word twice in a row, or three times on the page, is the template showing.
6. **Phone.** Is the 390 screen its own composition, with its own crop and line breaks, or the desktop squeezed?
7. **Fullness and substance.** Is each screen composed, or a narrow column of small text in dead ground? Does every section the brief asked for deliver its information completely, at a readable size?
8. **Collisions.** Anything over a headline or a button at any scroll position; anything off the phone's edge.

## Write it down, every round

```text
ROUND n
Seen in one second: …
Idea (one sentence): …
Layout words by section: hero=… / …=… / …
Top three problems, most visible first — screenshot, finding, fix:
```

Name findings the way a designer would to a colleague: "the supporting paragraph starts 40 px left of the headline's edge", "the testimonials are the third split in a row". "Could be more polished" is not a finding.

## Fix in order, stop at three

Fix **idea → hierarchy → composition → type → imagery → colour → detail → motion**. Later items cannot rescue earlier ones: no amount of kerning saves a page with no idea. Run at most three rounds: critique, fix the top three, re-shoot, critique. Stop early when a round finds nothing a stranger would notice, and if the last round still falls short, report the remaining problems plainly instead of rounding up.

## Gotcha

Subtraction can overshoot. In taste-skill's blind tests a richer page full of template devices beat a cleaner page that was thin, every time, and its own skill lost to the no-skill baseline on average across five rounds (6.6–7.7 against 7.5–8.0). Removing tells is half the job. Passes 7–8 are where you check the page kept its substance; when a deletion leaves a gap, enlarge what remains or close the gap, and never refill it with an ornament.

## Sources

- Leonxlnx, taste-skill v2.1.1 (MIT, HEAD a9c73c3): `skills/taste-skill/references/critique.md` §1, §4–6 (the passes, the round write-up, the fix order, the three-round stop) and `references/research.md` §11 (five rounds, 16 briefs, one model juror per brief, so single scores carry about half a point of noise). Its Awwwards-weighted scores and caps encode its house style and are not adopted.
- Related: [[unslop-pass]], [[page-frame]], [[ai-default-tells]], [[review-format]].
