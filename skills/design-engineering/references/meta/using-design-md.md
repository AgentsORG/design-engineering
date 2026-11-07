---
title: using-design-md
summary: How the agent reads, respects, and (rarely) updates a project's DESIGN.md file. Tokens are normative; prose is context.
tags: [meta, design-md, tokens, workflow]
---

# Using design.md

When a user's project contains a `DESIGN.md` file (per [Google Labs Code's design.md spec](https://github.com/google-labs-code/design.md), mirrored at [`docs/spec/design-md-spec.md`](../../../../docs/spec/design-md-spec.md)), the agent has access to a machine-readable description of the design system. Use it.

> **Check for a `.design` contract first.** If the project has one, it outranks DESIGN.md and this skill both — see [[using-design-file]]. When both exist, `.design` is the contract and DESIGN.md becomes rationale.

## Detection

Before generating any UI, look for `DESIGN.md` in:

1. The repo root: `DESIGN.md`.
2. A `design/` subfolder: `design/DESIGN.md`.
3. A `.design/` hidden folder: `.design/DESIGN.md`.

If found, read it before writing any component, styling any element, or proposing any tokens.

## What to do with the frontmatter

The YAML frontmatter is **normative**. Treat the tokens as the source of truth:

- **`colors`** — when picking a color in generated UI, reference a token (`var(--color-primary)`, `{colors.primary}`, or `theme.colors.primary`) — *don't* hardcode a hex.
- **`typography`** — match `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing` to a defined typography token. If the body uses `Public Sans 16/1.6`, don't generate `Inter 14/1.5`.
- **`rounded`** — use the scale (`sm`, `md`, `lg`, `full`). Mixing `borderRadius: 6` when the scale defines `4/8/16` is a tell.
- **`spacing`** — same. The scale is the contract.
- **`components`** — if a `button-primary` is defined, use it. Don't invent your own primary button.

## What to do with the markdown body

The body is **context**, not contract. Read it for:

- **Overview** — what the system is *trying to feel like*. Use this to disambiguate ambiguous token choices.
- **Do's and Don'ts** — explicit anti-patterns. Treat these as hard constraints.
- **Components section** — usage notes that token definitions can't capture (e.g., "primary buttons are reserved for the single most important action per screen").

## Reading order

For a typical UI generation task:

1. Read `DESIGN.md` (whole file — it's small).
2. Identify which tokens you'll need (colors, typography, spacing, the specific component variants).
3. Cross-reference with this skill — e.g., if `colors` defines a saturated accent, check [[delight-impact-curve]] before applying it everywhere.
4. Generate the UI using token references, not hardcoded values.

## When to propose updating DESIGN.md

The agent **does not** autonomously rewrite a user's DESIGN.md. It's authored by humans (designers + design engineers), not generated.

The agent *may* propose updates — always with human approval — in these cases:

- **Missing token** — generating a component requires a token that doesn't exist. Propose adding it with rationale.
- **Contrast failure** — the contrast linter (`contrast-ratio` rule) flags a token pair. Propose adjustment.
- **Component variant gap** — `button-primary-hover` exists but `button-primary-active` doesn't, and you need it.

Surface the proposal as a code review or PR comment, not a silent edit.

## Validating

Use the `@google/design.md` CLI to validate any change:

```bash
npx -y @google/design.md lint DESIGN.md
```

Run before committing. The linter catches broken refs, contrast failures, missing sections, and section-order violations.

For programmatic use in CI:

```ts
import { lint } from '@google/design.md/linter';
const { findings } = await lint(contents);
if (findings.some(f => f.severity === 'error')) process.exit(1);
```

## Cross-references

| design.md token category | This skill's relevant nodes |
|---|---|
| `colors` | [[color-monochromatic]], [[dark-mode]], [[contrast-and-color-scheme]] |
| `typography` | [[typography-humanity]], [[line-length-tracking]] |
| `rounded` | [[border-radius]] |
| `spacing` | [[viewport-custom-design]] |
| `components.button-*` | [[responsive-feedback]], [[hover-states-subtle]] |
| `components.modal`, sheet, tray | [[tray-rules]], [[fly-not-teleport]] |
| Overall feel / "Do's and Don'ts" | [[feeling-right]], [[unseen-details-compound]] |

## When to apply

Any task where the user has a project with a `DESIGN.md` file. Read it once at task start; reference tokens throughout.

## Reference

Frontmatter tokens bind; prose picks between them. Given `rounded: { sm: 4px, md: 8px, lg: 16px }` and a body style of Public Sans 16/1.6, a settings card comes out as:

- Bad: `font: 14px/1.5 Inter; border-radius: 6px; color: #6b7280;`, three values the file never defined.
- Good: `font-family: var(--font-body); font-size: var(--text-body-md); border-radius: var(--rounded-lg);`, the field inside at `{rounded.md}` and its menu items at `{rounded.sm}`, color from `{colors.primary}` only on the one primary action.
- A token the file lacks (`button-primary-active`) becomes a proposal comment, never a literal.

Gold example: `stageshow/examples/looks/radix.css`, a public design system's tokens set as one look file. It sets only what that system defines and leaves the rest to the kit's defaults, which is how this skill fills what DESIGN.md leaves out.

Check: grep the generated file for literals (`#[0-9a-fA-F]{3,8}`, `[0-9]+px`) and name the missing token behind every survivor. Then render once per color scheme the file defines; as Stageshow's craft rules put it, a light pass does not prove dark.

## Gotcha

DESIGN.md is currently `version: alpha` — the spec is evolving. If the user's file uses fields you don't recognize, pass them through unchanged rather than flagging as errors. The format will expand.

Also: not every project has a DESIGN.md, and not every team wants to author one. If asked "should we add a DESIGN.md?", weigh it against [[dependency-discipline]] — the file pays its way on multi-developer projects, less so on solo work.

## Sources

- Google Labs Code — [github.com/google-labs-code/design.md](https://github.com/google-labs-code/design.md).
- [`docs/spec/design-md-spec.md`](../../../../docs/spec/design-md-spec.md) in this repo (mirrored offline).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/examples/looks/radix.css`, `stageshow/references/craft.md` (a light pass does not prove dark).
- Related: [[agentation-workflow]] (the design-review feedback loop), [[review-format]] (UI critique format).
