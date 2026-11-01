---
title: cmd-stage
summary: "/design-engineering stage [still | demo | bento | review] [brief]" — build faux product UI for a landing page, feature card, docs hero or bento grid; plan first, frame before code, film the loop, review from frames.
tags: [command, faux-ui, build, demo, bento]
---

# /design-engineering stage

Build posture, except `review`, which judges and does not edit. The second word picks the job; without one, a brief that says "animated", "loop", "cursor" or "demo" is `demo`, a grid of features is `bento`, anything else is `still`.

## Every job starts the same

1. Read [[gotchas]] and [[pov]], and resolve the contract ([[using-design-file]]): its colours, type, radii and icon set become the demo's look. With the product's code at hand, read its tokens or a real component's computed styles; never guess them.
2. If Stageshow is installed (its `SKILL.md` under `.agents/skills/` or `.claude/skills/`), hand the build to it and keep what [[stageshow-reconciliation]] says this graph keeps. Otherwise build from the nodes below in the project's own stack.
3. **Write the plan before code:** where it sits and at what size, still or animated (loop, once in view, hover), the layout ([[product-shot-framing]]), the focal object, the action, the payoff, the real strings (3–7), what is left out.

## stage still

1. Frame first ([[product-shot-framing]]), then the screen ([[faux-ui-restraint]]). Design at the shown size, plus a compact design at 358 if it can land in a phone column.
2. Render it at both widths and fix framing before anything else.
3. Return the component, its stills, and a one-line note of the layout and real strings.

## stage demo

1. The still above, as the opening frame.
2. Script the story ([[demo-story-and-loops]]) and the pointer or touch ([[demo-cursor-and-touch]]): 3–5 beats, 10–16 s, a poster frame, a caused reset.
3. Rehearse ([[demo-rehearsal]]): film the loop at both widths, step through each beat and the seam, fix the largest fault first.
4. Add the host's pause/play and Replay, `role="img"` with a label, and the reduced-motion poster ([[stageshow-reconciliation]]).
5. Return the component, the contact sheets, and `REHEARSAL.md` with what was not checked.

## stage bento

1. Write the tile table ([[bento-grids]]) and check it against rules 1–4 and 8 before building any tile.
2. Build each tile as `still` (or one hero `demo`), one Stage per tile at 1:1, copy as page HTML.
3. Check the grid at its widest and narrowest host; return the grid and the plan.

## stage review

Judge posture. Run the fresh-eye brief in [[demo-rehearsal]] from frames you film yourself, rank framing → hierarchy and density → motion → polish, and output a [[review-format]] table. Do not fix anything.

You may delegate `review` to the `ui-reviewer` subagent where the host has it, with the frames attached.
