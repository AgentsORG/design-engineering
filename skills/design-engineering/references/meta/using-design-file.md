---
title: using-design-file
summary: How the agent discovers, reads, follows, updates, and verifies a project's .design contract — and why it outranks this skill's defaults.
tags: [meta, design-file, tokens, contract, workflow]
---

# Using a `.design` contract

A `.design` file (schema `design.v1`, spec mirrored at [`spec/design-file-spec.md`](../../../../spec/design-file-spec.md)) is a machine-readable visual contract: tokens, components, copy voice, executable policy, and a committed aesthetic intent. When a project has one, it is the source of truth and **this skill drops to advisory**.

## Where this skill sits

The format defines a precedence chain, and it is worth internalizing because it decides who wins every disagreement:

1. Explicit user prompt (this task only)
2. The nearest `.design`
3. The `design` skill procedure
4. **Generic taste skills — this one**
5. Model defaults

So: if `.design` sets `tokens.motion.duration.base: 400ms`, you use 400ms even though [[duration-table]] says most UI lands under 300ms. Raise the tension once, in prose, then comply. The skill supplies craft **where the contract is silent** — that gap is large, and it is where the whole motion and surface canon still applies.

## Detection

Walk up from the file you're editing. Prefer a literal `.design`; otherwise exactly one `*.design` in that directory. Several candidates → ask which system. Resolve `extends` depth-first, child overriding parent. In a monorepo, a package's nearer contract beats the repo root.

If UI work is requested and no contract exists, **offer to bootstrap — don't invent an untracked system.** Scan adjacent signals first: design notes in `AGENTS.md`, an existing `DESIGN.md` (see [[using-design-md]]), global CSS, Tailwind config, `components.json`. Extract the whole visual vocabulary — density, elevation language, motion character, copy tone — not just hex values.

## Reading

Load `agent.instructions` first — it is required and self-contained, so the file works even where no skill is installed. Then `intent` → `constraints` → `policy` / `decisions` → `tokens` → `voice` → `components`. Pull `rationale.*` on demand for the task at hand.

`intent` is the field with no `DESIGN.md` equivalent, and it is the one that resolves taste arguments: `direction` (the committed aesthetic), `signature` (where boldness is allowed to concentrate), `treatment` (`utilitarian` vs `editorial` register). Calibrate per surface — `patterns.<name>.treatment` overrides `intent.treatment`. A dashboard gets restrained product craft; only editorial surfaces run the distinctive-identity register. Everything outside `signature` stays quiet, which is the same instinct as [[delight-impact-curve]] with a budget written down.

## Following

Bind every property a component lists — `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`. Never write a raw hex, spacing, or radius when a token exists. Obey `when` / `when_not` and walk `decisions` first-match-wins. When a component isn't catalogued, `policy.if_missing` decides: `ask`, `nearest`, or `invent_with_note`.

Apply `voice.*` to UI copy with the same force as tokens — `register`, `casing`, the `terminology` map, `action_naming` continuity, and the `errors` style rule. This is [[copy-voice]] with the vocabulary pinned.

## Updating and verifying

Edit the YAML in place and bump `version`; git is the audit trail. Never add `proposed_changes` or an in-file changelog. Ask before touching any dot-path in `locked`.

A drift check compares `tokens` against the real CSS/Tailwind theme and `components` against real imports, then reports per token group as **added / removed / modified** with a **regression** flag — closer to [[review-format]]'s discipline than to a lint pass. Report before fixing; update the contract only when asked.

## shadcn

When `integrations.shadcn.enabled`, prefer installed shadcn primitives over parallel ones, and write `css_vars` into the declared CSS file. **Tokens outrank stale `css_vars` literals** — refresh the CSS after token edits rather than trusting what's already in `:root`. Emit the full variable set including charts and sidebar. See [`spec/design-file-spec.md`](../../../../spec/design-file-spec.md) for the Tailwind v4 mechanics.

## Sound, video, and companions

Contract 1.3 adds `tokens.sound` (default toggle state, one material, levels, durations, sync tolerance), `assets.sounds`, `decisions.sound`, `targets[]` video entries, and `exports.frame_md`. When they exist they outrank [[sound-spec]] and [[sound-decision-framework]]; when the group is absent, the contract is saying *silent* and this graph must not add a sound. A `video` target flips the default — see [[launch-video-sound]] — and `exports.frame_md` is how a HyperFrames project inherits the brand's motion and material. The `design` skill also names the companions it routes to; [[skill-router]] is this graph's side of the same handshake.

## `.design` vs `DESIGN.md`

Both can exist. `.design` is the machine-readable contract with intent and executable policy; `DESIGN.md` is prose-plus-tokens ([[using-design-md]]). When both are present, `.design` wins and `DESIGN.md` becomes rationale — offer to converge them rather than maintaining two sources.

## Gotcha

Don't let the contract's existence stop the craft work. A `.design` that pins colors and radii says nothing about whether a spinner flashes under 800ms, whether the exit is 60% of the entrance, or whether a hover shifts 1px or 4px. Silence is not permission to default — it's where [[review-checklist]] still runs.

## Sources

- AgentsORG — [github.com/AgentsORG/design](https://github.com/AgentsORG/design), `design.v1`. Mirrored at [`spec/design-file-spec.md`](../../../../spec/design-file-spec.md).
- Starter contract encoding this skill's defaults: [`templates/design-engineering.design`](../../../../templates/design-engineering.design).
- Related: [[using-design-md]], [[copy-voice]], [[delight-impact-curve]], [[review-format]].
