---
title: demo-rehearsal
summary: Checking an animated demo the way an audience sees it — prove the still first, then film the whole loop as a contact sheet at the shown width and at 390, step through every press and the loop seam at 40–80ms, treat a fixed list of measured faults as never intentional, hand the frames (not the reasoning) to a fresh-eye reviewer, and leave a REHEARSAL.md that says what was not checked.
tags: [faux-ui, verification, filming, review, rehearsal, qa]
---

# Demo rehearsal

Agents check their work by reading the code back or taking one screenshot once it has settled. Neither shows the frames in between, which is where demo bugs live. A dress rehearsal runs the whole demo at real speed, films it, and reads every frame.

## Order

1. **Prove the still before choreography.** Render the opening and the payoff at both shipping widths beside the closest reference at shown size. Can the viewer find the focal object and what changes before any branding? Clear every framing fault before touching motion.
2. **Set the poster first** ([[demo-story-and-loops]]), then film the loop.
3. **Film the whole loop plus the start of the next** as one contact sheet at a fixed interval, at true size: once at the shown width, once at 390, once per look shipped (light and dark are separate passes).
4. **Step through every beat at 40–80ms:** presses, menus, morphs, hand-offs, exits, the seam. A contact sheet sampled every second cannot show a pop; mark beats by name in the script and film them, never guess delays.
5. **Fix the largest visible fault first** — framing, then hierarchy, then motion, then polish — and re-film from the top.
6. **Hold it beside the closest reference** and ask: what does the eye land on first, and is it the result? Is one window, tile or device clearly leading?

Stageshow automates this with `scripts/film.mjs` (headless Chrome, contact sheets, a JSON report, `--gate` that ends `rehearsal passed`), `jumps.mjs` (one-frame snaps between samples) and `layout.mjs` (text and controls fitting their boxes). Without it, a Playwright loop that screenshots the stage every N ms and records element rects every animation frame does the same job.

## Faults that are never intentional

Fix the cause and re-film; clearing one by hiding, removing or opting out the thing it points at is itself a bug.

| Fault | What it means |
|---|---|
| Cut by the crop | An action, chip, button or shadow sliced by the stage edge |
| Framing | A floating whole window, a gutter crossed by a few px, a popover against an edge |
| Tight inset / tight control / tight mark | Words under 8px from an edge; a button under 8px below a field; a dot within 5px of its avatar or text |
| Tight or loose stack | A title and subtitle under 3px or over 10px of ink apart |
| Empty pane, loose list, fat row | A void under content; rows spread to fill a pane; a one-line row three times its words' height |
| Onion skin | See-through fills overlapping at rest |
| Unit wrapped | A stat's unit on its own line |
| Mixed icons, emoji icon, invented mark | Filled beside outline; an emoji as an icon; a letter tile beside a real company's name |
| Anchor drift | An open popover moving as its list changes height |
| Selection drift | A text highlight not under the I-beam |
| Kit override | Your CSS reshaping a frame or part's geometry |

Other findings are candidates to judge — an element that appears and then moves, a landing that snaps a few px after motion ends, text that steps inside its box as a layer drops, near-empty frames — fix the real ones and say why the rest stand.

## What the tools can't sign off

A clean report is necessary, not sufficient: it catches mistakes, not a dull idea, a wrong path or an implausible gesture. Still watch playback at speed, slowed transitions, an interruption, reduced motion (the poster, whole and complete), a return from offscreen, pause and replay — and after the final edit. A virtual clock proves geometry, not frame rate. Phone width in a desktop browser is not touch.

## The fresh eye

Give a reviewer the frames, the URL, the checklist and the reference stills — never the builder's plan, reasons or notes. First question: does this composition answer *this* product and page, or could it be any product in its category? Then a ranked list, framing first: what to screenshot, which frame shows it, the fix in one line. A predicted failure is not a finding, and neither is a predicted pass. Platform conventions (Messages' blue, macOS lights, a true-size iOS banner) are never sent back.

## Hand over

A `REHEARSAL.md` beside the component:

```md
# Rehearsal: <demo>
Reference: <example> (kept, changed)
Beats: 1 … 2 … 3 … payoff, loop <n>s
Captured: widths, looks, states, reduced motion
Film: <each fault> → <frame> → <fix or why it stands>
Review: <reviewer's list> → <response>
Not checked:
```

## When to apply

Before handing over any animated faux UI, and after every edit that moves something.

## Gotcha

Ten film runs, gate green, frame unchanged: stop iterating and get the fresh eye. The loop has converged on the builder's blind spot.

## Sources

- Benji Taylor, Stageshow (MIT, HEAD `8020574`, read 2026-11-01): `references/rehearse.md`, `references/verify.md`, `references/review.md`, `scripts/film.mjs`, `jumps.mjs`, `layout.mjs`; benji.org/stageshow (why filming, not screenshots). Paraphrased.
- Related: [[stress-scenarios]], [[review-format]], [[agentation-workflow]].
