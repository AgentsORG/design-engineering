# design.md Specification

This file mirrors the **design.md format specification** so the spec is available offline alongside the skill.

- **Canonical source:** [github.com/google-labs-code/design.md](https://github.com/google-labs-code/design.md) — `docs/spec.md`.
- **Spec license:** Apache-2.0.
- **Format version:** `alpha` — active development; expect changes. Pin the version field in any DESIGN.md you author.

If the upstream spec diverges, upstream is authoritative. Treat this file as a snapshot for offline reading.

For runtime guidance on **how an agent uses a `design.md` file in a user's project**, see the meta node `[[using-design-md]]` in this skill.

---

## What design.md is

> A format specification for describing a visual identity to coding agents. DESIGN.md gives agents a persistent, structured understanding of a design system.

It is **both a file format and a documentation convention**:

- **YAML frontmatter** — machine-readable design tokens (colors, typography, spacing, components).
- **Markdown body** — human-readable rationale (Overview, Do's and Don'ts, narrative around the tokens).

A coding agent reads a project's `DESIGN.md` before generating UI. The tokens are normative; the prose is context.

## File layout

A `DESIGN.md` file lives at a known location in the user's project — typically the repo root, or `design/DESIGN.md`. The agent should look in conventional locations.

```text
project-root/
├── DESIGN.md           ← canonical location
├── design/
│   └── DESIGN.md       ← alternate location
└── …
```

## Frontmatter token schema

```yaml
---
version: alpha
name: Heritage

colors:
  primary: "#1A2C3D"
  background: "#F4EFE8"
  ink: "#0F1419"
  cta: "#B8553E"

typography:
  display:
    fontFamily: "Public Sans"
    fontSize: 56
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: -0.02
  body:
    fontFamily: "Public Sans"
    fontSize: 16
    fontWeight: 400
    lineHeight: 1.6

rounded:
  sm: 4
  md: 8
  lg: 16
  full: 9999

spacing:
  xs: 4
  sm: 8
  md: 16
  lg: 24
  xl: 48

components:
  button-primary:
    backgroundColor: "{colors.cta}"
    textColor: "{colors.background}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm} {spacing.lg}"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
---
```

### Field reference

| Section | Type | Notes |
|---|---|---|
| `version` | string | Currently `alpha`. Mandatory. |
| `name` | string | Human name of the design system. |
| `colors` | map of token → hex | Hex strings (`"#1A2C3D"`). |
| `typography` | map of token → typography object | Fields: `fontFamily`, `fontSize`, `fontWeight`, `lineHeight`, `letterSpacing`, `fontFeature`, `fontVariation`. |
| `rounded` | map of scale level → dimension | Conventional levels: `sm`, `md`, `lg`, `full`. |
| `spacing` | map of scale level → dimension or number | Conventional levels: `xs`, `sm`, `md`, `lg`, `xl`. |
| `components` | map of component name → component object | Fields: `backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`. |

### Token references

Use `{path.to.token}` to reference another token:

```yaml
backgroundColor: "{colors.cta}"
typography: "{typography.body}"
padding: "{spacing.sm} {spacing.lg}"
```

The linter resolves refs and flags broken ones (`broken-ref` rule, error severity).

### Component variants

Express variants as related keys: `button-primary`, `button-primary-hover`, `button-primary-active`, `button-secondary`, etc. There is no nested `variants:` field — the naming convention IS the variant system.

## Markdown body — section order

The body uses `##` headings in this canonical order. Sections can be omitted, but present sections must follow this order (the `section-order` linter rule enforces it).

1. **Overview** — narrative description of the design system's intent and feel.
2. **Colors** — rationale for the palette; what each color is *for*.
3. **Typography** — voice; when to use display vs body; pairing rules.
4. **Layout** — grid, spacing principles, container widths.
5. **Elevation & Depth** — shadow language; when surfaces lift.
6. **Shapes** — corner radius philosophy; iconography choices.
7. **Components** — call out the components defined in frontmatter; usage examples.
8. **Do's and Don'ts** — explicit anti-patterns.

## CLI: `@google/design.md`

```bash
npm install -g @google/design.md

# Lint a DESIGN.md file (structure, contrast WCAG AA 4.5:1, broken refs)
design-md lint DESIGN.md

# Diff two DESIGN.md files (token-level regression detection)
design-md diff before.md after.md

# Export to a framework-specific tokens format
design-md export --format json-tailwind DESIGN.md         # Tailwind v3 JSON
design-md export --format css-tailwind DESIGN.md          # Tailwind v4 CSS
design-md export --format dtcg DESIGN.md                  # W3C Design Tokens

# Output the spec itself (for injection into agent prompts)
design-md spec --format markdown
design-md spec --rules-only --format json
```

### Programmatic API

```ts
import { lint } from '@google/design.md/linter';

const { findings, summary, designSystem } = await lint(designMdContents);
```

## Linter rules

| Rule | Severity | What it checks |
|------|----------|---------------|
| `broken-ref` | error | `{path.to.token}` references resolve to a defined token |
| `missing-primary` | warn | A `primary` color is defined |
| `contrast-ratio` | warn | Component foreground/background pairs meet WCAG AA 4.5:1 |
| `orphaned-tokens` | warn | Every defined token is referenced somewhere |
| `token-summary` | info | Token count and category breakdown |
| `missing-sections` | info | Recommended `##` sections are present |
| `missing-typography` | warn | At least one typography token is defined |
| `section-order` | warn | Present `##` sections follow the canonical order |

## How a coding agent uses design.md

The spec says: *read it before generating UI. The tokens are normative; the prose is context.*

The agent does **not** generate a `DESIGN.md` autonomously by default — humans author the file; the agent consumes it. Some workflows have the agent propose updates after a design review, but always with human approval.

See `[[using-design-md]]` in this skill for the runtime workflow.

## Bundled skills (in the upstream repo)

The `google-labs-code/design.md` repo also ships agent skills under `.agents/skills/` that are useful in any project, not just one with a DESIGN.md:

- `agent-dx-cli-scale` — CLI scaling patterns.
- `ink` — building React-Ink CLIs.
- `tdd` — test-driven development.
- `typed-service-contracts` — service contract typing.

These are not part of the spec — they're bundled examples.

---

## Related

- This skill's `[[using-design-md]]` node — runtime guidance for the agent.
- This skill's `[[color-monochromatic]]`, `[[typography-humanity]]`, `[[contrast-and-color-scheme]]` — the design principles a DESIGN.md should encode.
- The Agent Skills spec — [`./agent-skills-spec.md`](./agent-skills-spec.md).
