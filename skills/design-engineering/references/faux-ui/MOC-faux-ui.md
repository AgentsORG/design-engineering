---
title: MOC-faux-ui
summary: Faux product UI — the still or short animated product shot on a landing page, feature card, docs hero or bento tile. A believable interface simplified to what the viewer needs, framed with intent, every motion caused, then filmed and checked frame by frame. Distilled from Benji Taylor's Stageshow.
tags: [moc, faux-ui, product-shot, marketing, demo, bento]
---

# MOC — Faux UI

A product shot is not the product. It is an illustration of one moment in it: a window cropped to the panel where the story happens, a cursor that does one satisfying thing, a payoff that holds. Agents can build the parts; what they get wrong is the hundred small decisions around them, and the result reads as generated. This cluster writes those decisions down.

The one sentence the cluster hangs on: **it reads as a real product, simplified to what the viewer needs, framed with intent, and every motion has a cause.**

Five ways it fails, each owned by a node:

| Failure | Looks like | Owner |
|---|---|---|
| Too much | Real text in every row, numbers everywhere | [[faux-ui-restraint]] |
| Wireframe | Two grey blobs and a button | [[faux-ui-restraint]] |
| Boxed | A whole window shrunk into a card with even margins | [[product-shot-framing]] |
| Flat | Every object the same weight in the same bordered card | [[product-shot-framing]], [[bento-grids]] |
| Bland | A grey window and a cursor, whatever the brief's style was | [[faux-ui-restraint]] (character is real too) |

## Order of work

Most of the quality is decided before code. Run `/design-engineering stage` ([[cmd-stage]]) or follow this order by hand:

1. [[product-shot-framing]] — medium, size, layout and crop, decided first.
2. [[faux-ui-restraint]] — the word budget, fidelity, type, spacing, icons and chrome of the still.
3. [[demo-story-and-loops]] — story shape, beats, poster, loop and reset, the timing of things that change.
4. [[demo-cursor-and-touch]] — the cursor, drags, selection, scroll, camera, phones.
5. [[demo-rehearsal]] — film it, read every frame, a fresh-eye review, the handover note.

A grid of tiles is one picture planned as a set: [[bento-grids]]. With Stageshow installed it owns the build: [[stageshow-reconciliation]].

## Cross-cluster

- A product demo inside a rendered launch film is [[launch-video-ui-demo]]: a different medium with bigger cursors and no replay. [[stageshow-reconciliation]] says which owns which.
- Page-level motion rules ([[marketing-surface-rules]]) still bind the page around the demo; a looping demo needs the pause [[wcag-thresholds]] asks for.
- Fake content tells ([[content-authenticity]], [[ai-default-tells]]) apply to the words a demo shows; filler bars at its edges are not lorem ipsum.
- Collaborators shown live in a demo follow [[presence-signals]].
