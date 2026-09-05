---
title: build-a-tool
summary: When prompting for an artifact keeps landing on "closer, but not quite", stop iterating on the output and build the small tool that produces it — diagnose the gap, pitch the tool, put every judgment on a live control, save writes a file, harvest the config.
tags: [meta, tooling, workflow, process]
---

# Build a tool to build the thing

Prompting for an intricate result is a slot machine: every attempt costs a round trip, lands "close", and gives the user no way to steer except rewriting the prompt. A tool converts that loop into knobs — the process is built once and the taste decisions become adjustments the user makes by eye in seconds. Two halves in strict order: **diagnose, then build.** Skipping the diagnosis produces a generic playground.

## Diagnose the gap

Answer from the conversation; ask only for what you can't infer.

- **What actually ships?** Name the artifact and where it lives. The tool is never it.
- **Why can't you build it directly?** Classify:

```text
Why does prompting keep missing?
├── Judgment only the user's eye can make (density, balance, "when it feels right")
│   → dial-in tool: rebuild the process, bind every taste value to a control
├── Must match something that exists (a design, another app's output, a reference)
│   → matching tool: reproduce the process that made the reference, render beside it at ship size
├── Exists in the wrong form (right pixels, wrong format)
│   → converter: ingest the source, export exactly what the project needs
├── Can only be judged in a state that is slow to reach (a screen, a dataset, a moment)
│   → stage: a route that puts the work in that state instantly
└── No target yet — the user will know it when they see it
    → exploration, not matching: [[vibe-to-generator]]
```

Most real tools combine two branches; name the combination.

- **What knows the process?** An app that produced the reference, a named technique, a spec. Reproduce a process known to work; don't invent one. If an existing app made the reference, its settings panel is your parameter list.
- **What format does the project need?** Decided by what the code must do with the output, never by what is easiest to export.

**When not to.** One or two direct attempts would land it; the result is fully determined with no judgment left; unclear which side you're on → make one honest direct attempt first. **The stop-the-loop rule:** if a round of "closer, but not quite" has happened, the diagnosis is done — say so and propose the tool instead of retrying the prompt in different words.

## Pitch it, then build it

Four lines before code: **the gap** (one sentence), **the tool** (what it renders, which branch), **the controls** (which decisions belong to the user's eye), **the export** (the exact format and how saving works). This is the cheapest moment to be corrected.

Then, in one sitting:

1. **Isolated route** (`/lab/<slug>`); nothing in production imports it.
2. **Rebuild the process, not the output.** A tool that traces the output matches once and can't be adjusted.
3. **The target stays on screen**, beside the output, at ship size. Matching from memory across a tab switch is how "close enough" ships.
4. **Every judgment call is a live control**, with tested bounds — a slider that reaches a broken render teaches distrust. Fixed values are only for the rules of the process.
5. **Instant feedback.** No "apply" step; keep panel rows unconditional.
6. **Save writes a file.** The full configuration as JSON in the project (plus the artifact data if separate), path shown in the UI. Production imports that file, so saving *is* shipping the decision.

Hand off in two lines — the URL and the verbs — and stop. Hovering with suggestions defeats the point of the knobs.

## Harvest

When the user picks a keeper: read the saved config (never copy values by eye), wire the export and the cleaned-up render logic into the real artifact, and leave the tool in place unless asked — the next asset in the same language goes through it.

## When to apply

"Build me a tool for this", a result the agent keeps missing, two rounds burned on one artifact. Sibling workflows: [[prototype-picker]] compares discrete directions; [[vibe-to-generator]] searches a space with no target.

## Gotcha

A tool whose knob bucket is empty didn't need building — the idea was fully determined. Go build the output.

## Sources

- Emil Kowalski's design-engineering practice on tools as a means to an end, distilled by HKTITAN.
- Related: [[prototype-picker]], [[vibe-to-generator]], [[taste-is-trained]].
