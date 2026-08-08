# .design Specification (design.v1)

This file mirrors the **`.design` living visual contract** format so the spec is available offline alongside the skill.

- **Canonical source:** [github.com/AgentsORG/design](https://github.com/AgentsORG/design) — `SPEC.md` + `schema/design.v1.schema.json`.
- **Spec license:** MIT.
- **Format version:** `design.v1`.

If the upstream spec diverges, upstream is authoritative. Treat this file as a snapshot for offline reading.

For runtime guidance on **how an agent uses a `.design` file in a user's project**, see the meta node `[[using-design-file]]` in this skill.

---

## What `.design` is

A single portable, machine-readable contract (YAML, JSON-Schema-validated) that encodes a product's tokens, components, policy, copy voice, and a **committed aesthetic intent** — and that agents update in place as the design evolves. Git is the audit trail; the file carries no changelog.

It differs from `DESIGN.md` (Google Labs, mirrored at [`design-md-spec.md`](design-md-spec.md)) in three ways that matter to an agent:

1. **Committed intent.** `intent.direction` / `signature` / `treatment` state what the product is *going for*, so an agent can resolve taste questions the tokens don't answer.
2. **Executable policy.** `decisions` (if → then trees), `policy.if_missing`, and `constraints.always` / `never` make conflict resolution mechanical instead of interpretive.
3. **Self-teaching.** `agent.instructions` is a required field carrying the full drop-in procedure, so the file works even when no skill is installed.

## Required fields

| Field | Purpose |
|---|---|
| `schema` | MUST be `design.v1` |
| `name` | System id |
| `version` | SemVer of the contract |
| `agent.instructions` | Self-contained drop-in procedure |

## Layers

| Layer | Fields | Agent duty |
|---|---|---|
| Identity | `name`, `version`, `status`, `overview`, `intent` (`reference`, `direction`, `signature`, `treatment`, `density`, `trust`), `themes` | Orient taste; commit to the direction; calibrate treatment per surface |
| System | `tokens` (nestable groups, `{tokens.x.y}` ref chains), `components`, `patterns`, `locked` | Bind every component property; reuse the catalog; ask before editing `locked` paths |
| Voice | `voice` (`register`, `casing`, `terminology`, `action_naming`, `errors`) | Apply to all UI copy with the same force as tokens |
| Rationale | `rationale.*` (colors, typography, layout, elevation, shapes, components, dos/donts) | Judgment guidance where tokens under-specify |
| Rules | `policy`, `decisions`, `constraints`, `examples` | Resolve conflicts and missing pieces |
| Integrations | `integrations.shadcn`, `integrations.figma`, `exports`, `assets` | Write theme CSS vars; prefer shadcn primitives; emit declared exports |
| Meta | `agent` (required), `sources`, `provenance`, `extends`, `omitted` | Procedure, provenance, intentional gaps |

## Lifecycle (`status`)

| Status | Meaning |
|---|---|
| `bootstrap` | Draft extraction; expect churn |
| `refine` | Actively shaping the system |
| `lock` | Stable; prefer asking before visual changes |
| `evolve` | Intentional change while protecting `locked` paths |

## Discovery — nearest wins

Walk parent directories from the edited file or cwd. Prefer a literal `.design`; else exactly one `*.design` in that directory; if several, ask which system. Resolve `extends` depth-first, child overriding parent. A monorepo package may own a nearer `.design` that overrides the repo root.

## Precedence

1. Explicit user prompt (this task only)
2. Nearest resolved `.design`
3. The `design` skill procedure
4. Generic taste / frontend skills — **this skill sits here**
5. Model defaults

## Load order

`agent.instructions` → `overview` / `intent` → `constraints` → `policy` / `decisions` → `tokens` → `voice` → `rationale` (on demand) → `components` / `patterns` → `integrations` → `examples` → `locked` (when updating).

### Reading tiers (large files)

| Tier | Sections | When |
|---|---|---|
| Normative core | `schema`, `agent`, `intent`, `constraints`, `policy`, `decisions`, `tokens`, `components`, `locked`, `themes`, `voice` | MUST load before generating UI |
| Judgment | `overview`, `rationale.*`, `patterns`, `examples` | SHOULD load; defer what's irrelevant |
| Tooling | `integrations`, `exports`, `assets`, `sources`, `provenance` | Load when performing that operation |

## Components

Property bags MUST support `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width` (aliases: `background`, `foreground`, `radius`). Variants may nest under `tokens` or sit as flat sibling keys (`button-primary-hover`). Bind every listed property when implementing; obey `when` / `when_not`.

## Treatment calibration

`patterns.<name>.treatment` > `intent.treatment` > request type. Internal tools and dashboards default to `utilitarian` (restrained product craft); landing and marketing surfaces default to `editorial` (distinctive identity register). Concentrate boldness in `intent.signature` and keep everything around it quiet.

## shadcn bridge

`integrations.shadcn` maps tokens onto shadcn's semantic CSS variables. **Tokens win** when they disagree with `css_vars` literals — agents must refresh the CSS after token edits. Key fields: `enabled`, `style`, `base`, `icon_library`, `preset`, `css_variables` (MUST be true for token-driven theming), `base_color`, `css`, `components_json`, `aliases`, `registries`, `radius`, `css_vars.{theme,light,dark}`, `map_from_tokens`.

On Tailwind v4: theme variables live at `:root` / `.dark` outside `@layer base`; custom variables must also be registered under `@theme inline`; `tailwind.config` stays blank; values are written verbatim (never wrapped in `hsl()`). `base_color` and `css_variables` are immutable after init — restyle via `css_vars` or `apply`, never by re-running init.

Emit the **full** current variable set, including `chart-1`…`chart-5` and the sidebar variables.

## Update rules

Edit the YAML in place; bump `version` (SemVer) and `provenance.last_reviewed` when meaningful. Ask before changing any dot-path listed in `locked`. A token rename is MAJOR if consumers break.

**Never** add `ops`, `proposed_changes`, or in-file `history` — git is the change log.

## Verify (drift check)

1. Compare `tokens` ↔ CSS variables / Tailwind theme / token files
2. Compare `integrations.shadcn.css_vars` ↔ the project's global CSS
3. Compare `components` ↔ real imports
4. Flag hardcoded values that should be tokens
5. Report per token group as **added / removed / modified**, with a **regression** flag when anything consumers may rely on was removed or changed. Update `.design` only when asked.

## Never

- Invent a parallel design system beside the file
- Embed binaries or full page HTML trees
- Claim affiliation with third-party brands used only as visual references

## Tooling

The upstream repo ships `scripts/lint_design.py`, `diff_design.py`, `export_design.py`, and `convert_getdesign.py` (bootstrap from a getdesign.md-style brand analysis), plus a JSON Schema at `schema/design.v1.schema.json`.

## Starter

This repo ships a starter contract at [`templates/design-engineering.design`](../templates/design-engineering.design) encoding this skill's canonical motion and surface defaults. Copy it to your project root as `.design` and adapt, or `extends` it from your own contract.
