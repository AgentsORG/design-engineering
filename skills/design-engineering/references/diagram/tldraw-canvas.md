---
title: tldraw-canvas
summary: An editable canvas instead of a finished figure — which tldraw surface owns the job (the Desktop app's agent skill, the tldraw MCP app, the SDK), and the canvas rules that keep a board editable: bound arrows, Mermaid for structure, one shape per card, frames, lints before done, anchored comments, durable scripts and their trust.
tags: [diagram, tldraw, canvas, whiteboard, companions]
---

# tldraw canvases

A canvas is for pictures people keep editing. Its quality is measured by what survives the next person's drag: arrows that stay attached, cards that carry their own words, groups that move as one. So build boards out of real relationships (bindings, frames, parents), not coordinates that only look right. tldraw ships three agent surfaces. This node routes between them and holds the canvas rules; the surface's own skill holds the API.

## Which surface

| Situation | Surface | Notes |
|---|---|---|
| The user has tldraw Desktop open (`.tldraw` files, or legacy `.tldr`) | the `tldraw-offline` skill and subagent, installed by the app's agent setup | a local HTTP server: `/api/search` to read, `/api/doc/:id/exec` to edit, a script workspace for durable behavior; a per-launch bearer token |
| A hosted client with no local app (Claude, ChatGPT, Cursor) | the tldraw MCP app, `https://tldraw-mcp-app.tldraw.workers.dev/mcp` | tools `search` (the Editor API) and `exec` (code against the live canvas in the client) |
| Building a canvas product | the tldraw SDK; `tldraw-migrate` for version upgrades | product engineering: this graph owns only the UI's craft |

Delegate long Desktop jobs to its subagent.

## Canvas rules

- **Bind every meaningful connection** with `helpers.createArrowBetweenShapes`. A raw arrow that only looks attached detaches on the next drag. Unbound arrows are for decoration only.
- **Generate structure; don't place it.** A flowchart, sequence, state machine or mind map comes from `helpers.mermaid(source)`, which creates bound shapes. Two diagrams to compare are subgraphs of one source. On a canvas Mermaid is the right start, because people rearrange the result; in a finished figure Mermaid's layout is a tell ([[diagram-craft]]).
- **A card and its words are one shape.** Put the label in the geo shape's `richText`; a long label needs a bigger card. Use `text` shapes only for words that stand alone, like a heading over a group.
- **Arrange with the editor, not with arithmetic.** Use `alignShapes`, `stackShapes` and `distributeShapes`, and draw containers with `helpers.boxShapes`. Shapes inside a frame take coordinates relative to the frame, and text never crosses a frame's edge.
- **Lint before you call it done.** Run `helpers.getLints()` and fix every lint your edit introduced, on the shape you edited. Don't move a neighbour you weren't asked to touch.
- **One accent here too.** Canvas styles are named colors (`black`, `grey`, `blue`, `orange`…), not hex, so a contract's palette can't reach a stock board. Pick one named color for the focal shapes and keep the rest neutral ([[color-monochromatic]]).

## People share the board

- **Comments are anchored instructions.** Read the threads first and use each anchor to find the shapes it means. Reply in the thread you acted on, and resolve it. A thread addressed to someone else is not yours. This is [[pointing-beats-describing]] on a canvas, the same loop as [[agentation-workflow]].
- **Ambiguity stops the edit.** "Make the important one stand out" over six identical cards is a question, and an unanswered question is not permission to pick one.
- **Static edits go through `/exec`; behavior goes in the script workspace.** A board script runs whenever the file opens, so treat a `.tldraw` file from someone else as code. Ask before writing to a board whose scripts you did not start.

## When to apply

Whiteboarding, planning boards, editable architecture sketches, design review on a canvas, and any task that names tldraw, a `.tldraw` or `.tldr` file, or a board. For a figure readers will only read, use [[diagram-decision]].

## Gotcha

The surfaces speak different shape formats. Desktop takes raw tldraw SDK records; the MCP app's `exec` goes through a focused proxy with simple string ids and flat `_type` shapes. Read the surface's own `search` before writing code, and never paste a snippet from one into the other. On Desktop, never edit a `.tldraw` archive while it is open. Save a local document yourself with `helpers.saveDoc()` instead of asking the user to.

## Sources

- tldraw, the `tldraw-offline` agent skill installed by tldraw Desktop (read 2026-10-08; the app is not open source, so this graph cites it and copies nothing).
- tldraw/tldraw (HEAD `035b741`, 2026-10-06): `apps/mcp-app/README.md` and `plugins/tldraw-mcp/mcp.json` (the MCP app and its Cursor plugin); `skills/tldraw-migrate`, also served at `tldraw.dev/.well-known/agent-skills/`.
- tldraw/tldraw-offline README, "Bring your own AI" (agent access and script trust).
