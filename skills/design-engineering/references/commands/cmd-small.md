---
title: cmd-small
summary: The short verbs — diagram, options, name, which, agentation, pov — each one owner and a stop condition.
tags: [command, routing]
---

# The short verbs

Each of these hands off to one owner node. Open it, follow it, and stop where the owner says to stop.

## /design-engineering diagram [what]

Decide whether to draw at all, and on which surface ([[diagram-decision]]). A finished figure follows [[diagram-craft]] (diagram-design when installed, [[diagram-design-reconciliation]]). A live, editable canvas or a `.tldraw` file follows [[tldraw-canvas]].

## /design-engineering options [what]

Aliases: `variants`, `explore`. The user is undecided. Build three to five genuinely different directions behind a live picker, record the decision, then delete the harness ([[prototype-picker]]). "Something like…" with no spec → [[vibe-to-generator]].

Sub-modes of `options`:
- `riff`: three more directions near the one you kept.
- `tune`: add a control panel to the kept direction and nothing else.
- `mix`: take parts of other variants onto the chosen base, as a matrix of portable features ([[prototype-picker]]).
- `keep`: record the decision and delete the harness. Keep the worst-case data as a fixture.

## /design-engineering pick "a task"

Aliases: `library`. Name the task, not the library the user named. Read `package.json` first: never add a competitor to something already installed. Recommend one maintained library, with its install line and the reason, and say so when the best fit is off your trusted list. If a few lines of code would do, say that instead ([[dependency-discipline]]).

## /design-engineering name "the thing"

Aliases: `word`, `vocab`. **Posture: name.** Give the precise term from [[design-vocabulary]] and the node that goes deeper, in one line, then stop. Write no code.

## /design-engineering which [job]

Aliases: `route`, `who`. Say which node, subagent or installed companion owns the job, and why, in at most three lines ([[skill-router]]). Do not do the job.

## /design-engineering agentation

The Session-2 fix loop ([[agentation-workflow]]). Pull annotations from the Agentation MCP server, or from markdown the user pastes. Fix one annotation at a time with minimal diffs that you can defend in [[review-format]] terms, and commit only if asked. With no annotations, ask the user to export or paste them. You may delegate to `agentation-fix-loop` where the host has it.

## /design-engineering pov [fork | gotcha "what went wrong"]

`fork`: produce a diff-ready [[pov]], short and opinionated, that the installer can adopt. `gotcha`: draft one append-only line for [[gotchas]] in its dated format: specific, actionable, linked to the owner node. Never overwrite either file without the user's yes. You may delegate to `pov-curator` where the host has it.
