---
title: cmd-tokens
summary: "/design-engineering tokens [target]" — find the project's design contract (.design or DESIGN.md), resolve precedence, and thread its tokens through the UI; offer to bootstrap one when none exists.
tags: [command, design-md, design-file, tokens, build]
---

# /design-engineering tokens

Aliases: `contract`, `apply-design-md`. **Posture: build.**

## Steps

1. **Find the contract, nearest first.** Walk up from the edited file for a `.design` / `*.design` and resolve `extends`. Then look for `DESIGN.md` at the root, in `docs/` or in `design/`. If both exist, the `.design` is the contract and DESIGN.md is rationale. In a video project the order is `frame.md` → `design.md` → `DESIGN.md`.
2. Read [[using-design-file]] (or [[using-design-md]]) and [[pov]].
3. For a `.design`, read the normative core before generating anything: `agent.instructions` → `intent` → `constraints` → `policy` / `decisions` → `tokens` → `voice` → `components`.
4. Map the tokens onto the target (CSS variables, a Tailwind theme, or design-system props) and apply them. If `integrations.shadcn.enabled` is set, write `css_vars` into the declared CSS file; tokens outrank stale literals.
5. Precedence when sources disagree: the user's prompt → the contract → this skill → model defaults. Tokens and structured rules are normative; rationale and prose are context.

## No contract

Say so, scan the code for the system it already uses, and offer to bootstrap one: the starter in the repo's `templates/design-engineering.design`, or a DESIGN.md scaffolded per [[using-design-md]]. Never invent an untracked system silently.

## Output

The token map (token → where it lands), the edits, and any literal you left in place along with the reason.

You may delegate to the `design-md-consumer` subagent where the host has it.
