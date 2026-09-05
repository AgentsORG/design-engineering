---
title: vibe-to-generator
summary: When the user has a mood, not a spec, don't prompt for finished outputs. Research the visual language until it has names, compress it into rules, then build a seeded generator — pure render(config), click to regenerate, every taste decision a knob, save writes the winning config.
tags: [meta, creative, generative, workflow]
---

# From vibe to generator

Creative work has to produce something new, and prompting alone is bad at new: the model falls back on known patterns, the user rejects the result, asks for "a few more", and the loop burns time without converging. The escape has two halves. **Research** turns a vibe into rules the user can point at — most looks people reach for were shaped by a real process, and that process's constraints *are* the style. **A generator** then plays those rules: every variation one click, every taste decision a knob, the keeper reproducible forever.

## Route first

```text
Can the user point at or precisely describe the exact output?
├── Yes → build it; if too intricate to land by prompting → [[build-a-tool]]
└── No
    ├── Product UI with a few nameable directions? → [[prototype-picker]]
    ├── Can they state the idea as rules a stranger could follow? → skip research
    └── Only a vibe — mood words, an era, "I'm stuck"? → research. Never interrogate
        them into a spec first; the research exists because they can't answer yet.
```

**The two-round rule.** About to produce a *second* round of prompted variants of one visual idea? Stop and propose this pipeline. Two rejected rounds means the user is searching a space, not requesting an item.

## Research the visual language

1. Capture the vibe in the user's own words, verbatim. "Warm", "old-timey", "kind of hand-done" are data; rewriting them into your nearest cliché is how the result drifts.
2. Research the tradition behind it, answering three questions: **what process made this look** (printing method, material, tool, era — its quirks are the process's constraints), **what did the process do to color, texture, and composition**, and **what are the recurring patterns called** (a named pattern can be requested precisely and bound to a knob).
3. Spend tokens here without guilt; a cheap research pass produces generic rules and generic rules produce the mush the user came to escape.
4. Compress into **5–10 rules stated as constraints** ("no more than N colors", "X darkens where it crosses Y", "edges are never clean") plus named patterns. Show them and let the user strike or keep lines **before any code exists** — rules are cheap to edit, renders are not.

## Hard rules for the generator

1. **Output is a pure function of the config**, seed included. All randomness from a seeded PRNG (mulberry32) initialized from `config.seed`; never a bare `Math.random()` in the render path. The save button is a lie otherwise.
2. **A new variation is one click**, not one prompt. Clicking the canvas assigns a fresh seed and re-renders.
3. **Every taste decision is a knob** with tested min and max. Fixed values only for the rules that make the idea itself.
4. **Save writes the full config** as JSON — clipboard at minimum, a file in the project when there's a dev server, path shown after saving. Production imports that file.
5. **The tool is scaffolding; the config and render function are the deliverable.** Isolated route, nothing in production imports it; promote the JSON plus the render, or a static SVG/PNG export when the artifact needn't stay live.

## Sort, build, harvest

Sort every rule into **rules** (hardcoded, what makes it this idea), **modes** (discrete sub-directions, tabs with their own knobs), and **knobs** (every continuous value). An empty knob bucket means the idea is determined — build the output. Build in one sitting: one canvas rendered large (thumbnails hide the texture that makes or breaks generative work), mode tabs, knob panel, click-to-regenerate, the seed visible, save plus a rail of saved configs re-applied on click. Hand off in two lines and stop. Harvest by reading the saved JSON, never by eyeballing the panel; keep the lab route for the next asset.

## When to apply

"I'm stuck", "I need inspiration", "something like…", a mood instead of an image, endless variations of one idea, a rejected round of prompted variants. Pairs with [[svg-creation]] when the output is vector art and with [[visual-imperfection]] when the vibe is texture.

## Gotcha

The generator's job is to play the rules, not to be tasteful on its own. If the rules were generic, every seed looks the same and the knobs move nothing worth moving; go back to research.

## Sources

- Emil Kowalski's design-engineering practice on creative tooling, distilled by HKTITAN.
- Related: [[build-a-tool]], [[prototype-picker]], [[taste-is-trained]], [[svg-creation]].
