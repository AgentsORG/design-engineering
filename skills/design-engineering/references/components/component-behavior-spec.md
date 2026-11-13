---
title: component-behavior-spec
summary: Before writing a custom interactive component, write its behavior down — the ARIA pattern, where focus lands on open and on Tab, whether selection follows focus, who owns Escape, where focus goes when the focused part leaves, disabled versus aria-disabled, and which actions an agent may call — then build it from tested behaviors rather than handlers, and prove each key by breaking it. From Vercel Labs' UI SDK component workflow.
tags: [components, accessibility, keyboard, focus, aria, testing, ui-sdk]
---

# Component behavior spec

A custom component fails in the places nobody decided: where focus goes when an item is deleted, whether an arrow key selects or only moves, which layer Escape belongs to. They look fine in a screenshot and are found by the first keyboard user. UI SDK's workflow for building a component it does not ship starts with a written spec, before any code, and the list is worth using whatever the stack. [[keyboard-patterns]] holds the key maps themselves; this node is what to settle before reaching for one.

## Decide in writing

1. **The pattern.** Pick the ARIA Authoring Practices pattern and write its roles, states and keys. A set of choices in two dimensions is a `grid`; a stepper is buttons with `aria-current="step"`. A key with no APG rule (Enter to move an item between lists) is a choice: make it, and say so.
2. **Focus on open and on Tab.** Where focus lands when the component opens or is tabbed into, and whether the group is one tab stop.
3. **Selection and focus.** Either selection follows focus (radio group, single-select listbox), or arrows only move and Space selects (multi-select listbox, data grid). Mixing them is the commonest bug.
4. **Escape.** One owner. Inside a popup, the popup closes on it. A field that clears on Escape claims the key only when there is something to clear, so an empty field lets the dialog behind it close ([[overlay-dismissal-stack]]).
5. **Parts that leave.** When the focused part is removed or moves out, focus needs a named destination, or it drops to `<body>` and the next Tab starts from the top of the page.
6. **Controls that stop applying.** A button that cannot act right now is `aria-disabled`, not `disabled`, if it may hold focus at that moment: `disabled` throws focus to the page ([[press-and-pending-states]]).
7. **What an agent may call.** Which methods are things a person does (`rate`, `moveToTarget`) and so are offered to an agent ([[agent-ready-interfaces]]).

## Build from behaviors, not handlers

The repeated parts of every widget are solved problems: one tab stop with arrow keys, typeahead, a highlight that filters as someone types, grid movement by row and column, focus recovery, reorder by drag and by keyboard, a popup that opens beside its trigger and returns focus on close. In a UI SDK project each is a behavior in `@ui-sdk/core` (`createRovingFocus`, `createTypeahead`, `createListbox`, `createGridFocus`, `createFocusRecovery`, `createReorder`, `createPopup`), joined in one `definePrimitive` and rendered per framework with `createParts`; the render file holds no key handlers, focus moves or ARIA. Elsewhere the rule is the same with a different library ([[library-picks]]): compose the tested piece, write only the connections between pieces.

Three habits carry over to any stack:

- **The role is declared, and the role's needs are enforced.** A part with `role="option"` owes focus, activation and its required states (`aria-selected`). UI SDK makes the type checker demand them; without it, check by hand.
- **A click handler on a `div` hears only clicks.** A part that is not a button needs Space and Enter wired in `keydown`.
- **State is an attribute.** Expose it as ARIA and `data-*` so CSS can style it ([[ui-sdk-reconciliation]]); key list parts by value or id, never by index; read direction from the element when a key is pressed, with no provider.

## Break it on purpose

For each key behavior, break it (return early, skip a call), run the tests, confirm one fails, then restore the file. A test that still passes was testing nothing. For a composite widget, test both arrow directions, that exactly one item is tabbable, Space and Enter, and every state attribute set. Then check in a real browser what a DOM emulator cannot show: top-layer popups and their placement, focus moving between fields mid-typing, typeahead timing, contrast in every reachable state ([[wcag-thresholds]]). Tab through the whole thing once.

## Gotcha

When the docs do not say how a library part behaves, do not read its compiled output and do not guess: write a throwaway test that renders it, fires the event and logs the DOM and callback arguments, then delete it. Wait a tick after mounting, since some state arrives late.

## Sources

- Vercel Labs, UI SDK (Apache-2.0, github.com/vercel-labs/ui, HEAD `8ff6bcf`, `@ui-sdk/*` 0.1.0-beta.2, read 2026-11-13; ui-sdk.dev/docs/core): `packages/core/skills/ui-sdk/references/{create-component,testing,patterns}.md`, `apps/docs/content/docs/core/index.mdx`, `core/behaviors/index.mdx`, `core/testing.mdx`. Paraphrased.
- W3C ARIA Authoring Practices Guide.
- Related: [[component-api-design]], [[stress-scenarios]], [[touch-and-focus]].
