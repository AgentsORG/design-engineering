---
title: agent-ready-interfaces
summary: Design a screen so an agent can operate it the way a person does, and so the product stays in charge — every control has a unique name, state flows through change callbacks that know the change came from an agent and can refuse it, anything irreversible is marked to wait for a person with a sentence written for that person, secrets are fillable but never readable, and one test proves an agent can find and change every control. From Vercel Labs' UI SDK agent bridge.
tags: [components, ai, agents, accessibility, permissions, webmcp, ui-sdk]
---

# Agent-ready interfaces

Agents now use interfaces as well as build them, and a screen that is only clickable makes them slow and blind: they screenshot, guess at unlabeled icons and press what they should not. UI SDK's answer is a bridge (`createAgent`) that lists a page's components with their name, state and actions (`snapshot`), runs named steps (`act`) and finds items (`query`). Its own project-settings benchmark reports 5 tool calls instead of 16 and 6.8k characters read instead of 39.8k against browser tools (medians of three Sonnet runs; Vercel's numbers, not reproduced here). The design rules under it hold with or without the library, because the bridge's `label` is the accessible name: what serves a screen reader serves an agent ([[accessibility-baseline]]). This node is the reverse of [[agent-trace-states]], which shows a person what an agent did.

## The bar

1. **Every control has a name, unique where it sits.** A step finds a control by words in its label, and an exact match does not win, because labels are page text anyone can write. "Tip" and "Custom tip" collide; so do a "Water the plants" button and a "Done today: Water the plants" checkbox. Give each control in a row its own verb ("Open Water the plants", "Actions for Jane Doe"), and do not share one menu between rows.
2. **A confirming button never repeats its trigger's words.** "Delete project" opens a dialog whose confirm reads "Delete forever", not "Delete": a press looks among the buttons already on the page first. This is also clearer for people ([[destructive-actions]]).
3. **State flows through change callbacks.** An agent's change calls the component's API, not a click or a keydown, so validation in `onClick` or `onKeyDown` never runs. Put the rule in `onValueChange(value, details)`: `details.source` is `"mouse"`, `"touch"`, `"pen"`, `"keyboard"`, `"virtual"`, `"programmatic"` or `"agent"`, `details.reason` says what asked (`"escape-key"`, `"outside-press"`, `"item-press"`), and `details.cancel()` refuses it. What a popup shows comes from state, never from its trigger's click handler.
4. **Mark what needs a person, with a sentence for that person.** `data-agent-confirm="Deletes the project and all its files"` on anything that deletes, pays or sends. Put it on the button that confirms, not on the trigger (opening a dialog is harmless) or the dialog (that gates Cancel too). Write it from app state. Without an `allow` callback the step fails with "Needs a person"; with one, the app shows the sentence and returns the answer. An unanswered question fails after 5 minutes by default.
5. **Secrets are write-only; private regions are absent.** `data-agent-secret` lets an agent fill a field it can never read back (it reads `"[redacted]"`); password, card and one-time-code fields are secret already. `data-agent-hidden` removes a region, such as recovery codes, from everything the agent sees.
6. **The agent's work is attributable and reversible.** Because each change carries its source, a history can list "Agent set Project name to Atlas" and undo only the agent's changes while a person's later edit stays (`createHistory`, `undoSource("agent")`), or stage a suggestion on the real controls and revert it (`stageChanges`). Both are marked experimental. They restore control values only: a sent request stays sent.
7. **Controls the agent cannot see are bugs.** The bridge lists only the kit's own parts. A bare `<button>`, `<input>` or `<select>` is invisible, including a wizard's Continue.

## Prove it

Write one test per screen: take `snapshot()`, assert that every entry has a label and that each control the task names is present, then `act` on each with the words a person would use. For a marked control, assert the step is refused, then runs once approved. `act` can return `ok: true` while a callback cancelled the value, so check the returned `values` or the DOM. Read the snapshot once by eye: every label should be one a person would recognise.

## Connecting it

Create one bridge in client code, from the same package as the components (`@ui-sdk/react/agent` and its siblings). For your own model, route the three `agentTools` definitions to `snapshot`, `act` and `query`. For the agent built into a browser, `registerTools(agent, { allow })` exposes them through WebMCP (`document.modelContext`); it does nothing where that API is missing, and `allow` is required because you did not write that agent. Ask the person in one place only, or every marked step asks twice.

## Gotcha

`minLength` does not stop a value an agent sets, since browsers check it only while a person types: use `pattern` or your own validation. And an `allow` rule hides nothing: components and their choices stay readable, so privacy is `data-agent-hidden`, not `allow`.

## Sources

- Vercel Labs, UI SDK (Apache-2.0, github.com/vercel-labs/ui, HEAD `8ff6bcf`, `@ui-sdk/*` 0.1.0-beta.2, read 2026-11-13; ui-sdk.dev/docs/agents): `packages/core/skills/ui-sdk/references/agent-ready.md`, `apps/docs/content/docs/agents/index.mdx` (benchmark), `agents/connect-an-agent/{permissions,history-and-undo,webmcp,reference,your-components}.mdx`, `core/kernel/handle-changes.mdx` (sources and reasons). Paraphrased.
- Related: [[ui-sdk-reconciliation]], [[screen-reader-announcements]], [[forms-validation]].
