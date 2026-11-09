---
title: stageshow-reconciliation
summary: Benji Taylor's Stageshow as a companion — when it owns a faux-UI job (a React kit, gold examples, a film-and-gate loop), what this graph keeps (whether it should move, the contract, the page around it, accessibility), and nine conflicts settled, from its 0.8–1 s arrivals against the 300ms UI budget to its autoplaying loops against WCAG 2.2.2's pause.
tags: [faux-ui, companion, reconciliation, stageshow, demo, marketing]
---

# Stageshow, reconciled

Stageshow 1.1.1 (`npx skills add benjitaylor/skills --skill stageshow`; Node 20.19+) builds faux product UI: stills, feature cards, cursor demos and bento grids as ordinary React components. It ships a `SKILL.md` with a seven-step workflow, fifteen references, about forty gold examples to copy from, product studies, specimen sheets (`buttons` and `cards` new in 1.1), bad/good teaching pairs, a copy-in React kit (`Stage` with a scripted `Act`, real-geometry `Window` and `Phone`, motion parts such as `Fly`, `Collapse`, `Roll`, `Count`, `Connector`, `Camera`, and small parts it insists on over lookalikes, `Button`, `Draft`, `Card`, `Divider` and `Kbd` new in 1.1), and scripts that film the result (`film.mjs`, whose `--gate` exits 1 on any never-intentional fault, `jumps.mjs`, `layout.mjs`). The craft is distilled in [[MOC-faux-ui]]; this node says who owns what and settles the conflicts.

## Who owns what when it is installed

| Job | Owner | This graph keeps |
|---|---|---|
| A hero demo, feature card, docs plate or bento tile in a React project | Stageshow: start from the closest gold example, build on the kit (every button, card, draft and shortcut from its kit part), film with `--gate` and hand over only on `rehearsal passed` | the contract's tokens ([[using-design-file]]) mapped onto the kit's `--ss-*` tokens; whether it should move ([[animation-decision-framework]]); the page around it ([[marketing-surface-rules]]); the accessibility below |
| The same picture in a non-React project, or a static image | This graph: [[product-shot-framing]], [[faux-ui-restraint]], built in the project's own stack | everything; Stageshow's kit is React-only |
| A product demo inside a rendered launch film | The film's engine ([[MOC-launch-video]], "A film, end to end"), timed by [[launch-video-ui-demo]] | everything; a page demo and a film shot are different media |
| A grid of feature tiles | Stageshow per tile, planned with [[bento-grids]] | the plan, the page grid ([[viewport-custom-design]]) |
| Reviewing someone's demo | [[demo-rehearsal]]'s fresh-eye brief, output in [[review-format]] | the format and the severity order |

Without it installed, build to the faux-UI nodes and say Stageshow would have owned the job.

## Conflicts, settled

| Topic | Stageshow | This graph | Settled |
|---|---|---|---|
| Duration | arrivals 0.8–1 s, flights 750ms, rows 420–460ms | [[duration-table]]: UI under 300ms | Illustration time, not interface time. Inside a demo, storytelling motion takes its values; the product's own feedback (a press, a hover, a menu) keeps the product's real timing, as Stageshow itself says |
| Exit easing | a closing popover accelerates (`(0.4, 0, 1, 1)`); since 1.1 `Roll` moves old and new together on one decelerating curve (`(0.32, 0.72, 0, 1)`), no longer an ease-in out | [[easing-curves]]: never ease-in on UI, exits included | An outgoing layer overlapped by its replacement may accelerate, because the eye is on the incoming one. A lone exit in product UI stays ease-out. The roll no longer needs the exception |
| Press scale | the cursor glyph dips to 0.9; since 1.1 the kit `Button` presses to 0.97 | [[responsive-feedback]]: buttons 0.97; films press the cursor to 0.84 ([[launch-video-ui-demo]]) | Three different objects. Cursor 0.9 in a page demo, 0.84 in a film; the pressed control uses the product's own press, which the kit `Button` now matches at 0.97 by default |
| Typing speed | 35ms a character (~28/s) | [[launch-video-ui-demo]]: ~15/s to be read, ~50 to be recognised | 35ms for a short string the viewer only recognises; a prompt that carries the argument types at ~15/s and holds |
| Autoplay | heroes loop 10–16 s; tiles play once in view | [[marketing-surface-rules]]: motion maps to input | A demo is a figure, not page motion: allowed, one lead per viewport, stopped offscreen (the Stage does this), the poster under reduced motion |
| Pause | no pause control; replay is a keyed remount | [[wcag-thresholds]] 2.2.2: anything moving over 5 s has a visible pause | Every looping demo longer than 5 s gets a visible pause/play button in the host, beside Replay. `play="once"` or hover-played scenes under 5 s are exempt |
| Screen readers | faux titles are `div`s, never headings | [[marketing-surface-rules]]: code-built illustrations get `role="img"` and an `aria-label` | Both. Wrap the stage in `role="img"` with a label that says what the demo shows ("Assigning a conversation to Maya"), `user-select: none`, and keep its fake controls out of the tab order |
| Placeholder content | grey bars for filler | [[content-authenticity]]: real data, never lorem ipsum | Not in conflict: authenticity governs what is read. The 3–7 real strings must be specific and plausible; bars stand for what nobody is meant to read |
| Other companies' marks | a bundled registry of real bank, payment and app logos; product studies of Figma, Slack, Linear and others | [[ai-default-tells]]: no invented logos | Real marks only where the relationship is real (an integration you ship, a payment method you accept); studies of other products are for borrowing an interaction, never for a page that implies endorsement. Its `NOTICE.md` says the same |

## Dependencies

The kit is copied source on React 18+, react-dom and lucide-react, with no animation runtime, so it passes [[dependency-discipline]]. Filming needs `playwright-core` and a locally installed Chrome (or `CHROME_PATH`), dev-only. The playground's `npm install` also pulls Vite and an optional `portless`; tell the user before the first install.

## Reference

The job done with Stageshow installed, before and after this node's settlements:

| Before | After |
|---|---|
| Gold copied, product name changed, filmed once without the gate | The brief's tokens mapped onto `--ss-*`, its own icons, chrome and words; filmed with `--gate` until `rehearsal passed` |
| A bare `Stage` in the page, a 14 s loop, no controls | The stage wrapped in `role="img"` with a label, fake controls out of the tab order, a visible Pause beside Replay in the host |
| A hand-styled `.btn` and `.card` beside the kit's `Field` | The kit `Button` and `Card`, restyled by their props and tokens |

Gold example: the Gold table in `stageshow/SKILL.md` (Examples), copy the closest row; `stageshow/examples/buttons/` and `stageshow/examples/cards/` for the parts.
Check: film your copy beside the gold's still; if someone could name the gold's product from yours, the swap is not done. Then tab to the loop's Pause with the keyboard.

## Gotcha

Copying a gold example and changing only the product name is not done: it still reads as the example's product. Swap in the brief's tokens, icons, chrome and words, then film it beside the gold to prove it.

## Sources

- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `README.md` (install), `stageshow/SKILL.md` (1.1: always `--gate`, use the kit part), `stageshow/README.md`, `stageshow/NOTICE.md`, `stageshow/package.json`, `stageshow/references/*.md`, `stageshow/kit/motion/*.css`, `stageshow/kit/controls/Button.css`, `Button.tsx`, `Draft.tsx`, `stageshow/kit/parts/Card.tsx`, `Divider.tsx`, `Kbd.tsx`, `stageshow/kit/cursor.css`, `stageshow/kit/act.ts`, `stageshow/scripts/film.mjs`; benji.org/stageshow and the launch post (x.com/benjitaylor/status/2116593247854453244, 2026-10-31). Values are his; the settlements are this graph's.
- Related: [[skill-router]], [[fun-isometric-reconciliation]] (the same pattern for a sticker companion).
