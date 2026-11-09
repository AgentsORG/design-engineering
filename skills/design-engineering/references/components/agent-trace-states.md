---
title: agent-trace-states
summary: Show an agent's work as one trace of lines — reasoning, tool calls, sources, plan steps — each with an explicit status (running, error, pending, done) mapped from the real tool state, never inferred. Reasoning opens while it runs and closes when done unless the person toggled it; a pending approval is a question outside the trace; a running line after the stream stops is a failure; plans and tasks update in place; sources dedupe by URL. From shadcn/ui's AI Elements, checked against Astryx's open agentic-state questions.
tags: [components, ai, agents, states, tools, streaming, shadcn, astryx]
---

# Agent trace states

An agent's reply has two parts: the answer, and the work behind it. Most UIs get the second one wrong in one of two directions: a wall of raw tool JSON, or a spinner that says nothing until it stops. AI Elements, now 21 copy-in patterns inside shadcn/ui, settles it with one primitive, **Trace**: a list of lines, each an icon, a title, an optional description and a status, that can expand, link out or open a sheet, and can nest (a subagent's own steps). [[states-are-the-work]] applies: each of these states is designed, not left to the default.

## Map the real state, every time

For an AI SDK tool part (`tool-<name>`, keyed by `toolCallId`):

| Tool state | Line | Title |
|---|---|---|
| `input-streaming`, `input-available` | running while the chat streams; **error** once it has stopped | "Running …" / "Failed to run …" |
| `approval-requested` | not a line: a question outside the trace, Deny (outline) and Approve (primary) | — |
| `approval-responded` | running if approved | "Running …" / "Denied …" |
| `output-available` | done | "Ran …" |
| `output-error` | error, with the error text | "Failed to run …" |
| `output-denied` | done | "Denied …" |

The exception: a client-side tool waits in `input-available` until the app supplies its output. That is **waiting**, not failed.

## The rest of the work

- **Reasoning** opens while it streams and closes when it ends, unless the person toggled it, whose choice wins (`open = userChoice ?? running`). Show the disclosure only once text exists. Its duration is measured on the server; the SDK does not time it.
- **Several steps of one run** are lines in one trace, not a stack of bespoke collapsibles.
- **Plans, tasks and todo queues** update in place: a data part with a stable id replaces the last one, so the list ticks rather than grows.
- **Sources** dedupe by URL and fall back to the hostname when there is no title; they come last, after the answer.
- **Context used** is (input + output tokens) ÷ the model's window, which the app supplies.
- **Message actions** are quiet icon buttons with tooltips under the reply: Copy swaps to a check for about 2 s, thumbs up and down are toggles with `aria-pressed`, Edit puts the text back in the field.
- **Running** shimmers the line's title; under reduced motion it holds still and the word carries it ([[reduced-motion-by-pointer]]).

## Questions to ask in review

Astryx's agentic-states record leaves these open on purpose; ask each of a new agent UI: does thinking need a state distinct from ordinary processing? Is user-visible rationale marked as authored content, without implying access to hidden reasoning? Does streaming text look unfinished without pulling the eye from finished text? Which tool details are useful, and do the rest stay collapsed? Does a required human answer outrank passive progress? Are syncing and synced distinct from processing and success? Does partially rendered generated UI hide its churn?

## Gotcha

Inferring "done" from the spinner stopping marks every interrupted tool call as a success. Map from the part's state, and treat *still running after the stream ended* as the failure it is.

## Sources

- shadcn/ui AI Elements (MIT, github.com/shadcn-ui/ui, HEAD `8ab2771`, read 2026-11-09; ui.shadcn.com/docs/ai-elements): `ai-elements/base/{tool,reasoning,confirmation,sources,plan,task,queue,context,message}.mdx`, `components/base/trace.mdx`, `changelog/2026-10-ai-elements.mdx`. The earlier vercel/ai-elements (Apache-2.0, HEAD `ca8be60`) is deprecated at the end of November 2026. Paraphrased.
- Meta, Astryx (MIT, HEAD `9f55320`): `docs/design/agentic-states.md` OQ1–OQ8 (draft). Paraphrased.
- Related: [[streaming-chat-scroll]], [[destructive-actions]], [[shadcn-reconciliation]].
