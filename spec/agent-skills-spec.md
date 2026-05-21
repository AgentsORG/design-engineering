# Agent Skills Specification

This file mirrors the **Agent Skills specification** so the spec is available offline alongside the skill.

- **Canonical source:** [github.com/agentskills/agentskills](https://github.com/agentskills/agentskills) — `docs/specification.mdx`.
- **Live site:** [agentskills.io/specification](https://agentskills.io/specification).
- **Spec license:** CC-BY-4.0 (documentation), Apache-2.0 (code). Originally developed by Anthropic and released as an open standard.
- **Spec status:** unversioned; the format is stable but the validator (`skills-ref`) is in active development.

If the upstream spec diverges from this mirror, the upstream is authoritative. Treat this file as a snapshot for offline reading.

---

## What a skill is

A **skill** is a directory that contains, at minimum, a `SKILL.md` file. The directory name must match the skill's `name` (in frontmatter).

```text
skill-name/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation files
├── assets/           # Optional: templates, images, data
```

## Frontmatter

`SKILL.md` starts with YAML frontmatter:

```yaml
---
name: my-skill-name
description: A clear description of what this skill does and when to use it. Include keywords.
license: MIT
compatibility: Requires Node 20+. Tested on macOS, Linux, Windows.
metadata:
  author: example-org
  version: "1.0.0"
allowed-tools: Bash(git:*) Read Glob
---
```

### Fields

| Field | Required | Constraints |
|-------|----------|-------------|
| `name` | **Yes** | Max 64 chars. Lowercase a–z, 0–9, hyphens. No leading / trailing / consecutive hyphens. **Must match the parent directory name.** |
| `description` | **Yes** | Max 1024 chars. Describes WHAT the skill does AND WHEN to use it. Include keywords that match real user queries. |
| `license` | No | License name (`MIT`, `Apache-2.0`) or a relative reference to a bundled `LICENSE` file. |
| `compatibility` | No | Max 500 chars. Environment requirements — product/platform, package versions, network needs. |
| `metadata` | No | Arbitrary string→string map. Use unique key names to avoid collisions with future spec fields. |
| `allowed-tools` | No | **Experimental.** Space-separated list of pre-approved tools the skill may call. Example: `Bash(git:*) Bash(jq:*) Read` |

## Body

After the frontmatter, the body has **no format restrictions**. It is rendered as Markdown.

Recommended structure:

- Step-by-step instructions.
- Concrete examples.
- Edge cases and gotchas.
- Pointers to `scripts/`, `references/`, `assets/` for on-demand resources.

## Optional directories

### `scripts/`

Executable code the skill calls — Python, Bash, JavaScript, etc.

- Self-contained — the skill shouldn't require the user to install extra runtimes beyond what is documented in `compatibility`.
- Helpful errors — when a script fails, the message should tell the agent how to recover.

### `references/`

On-demand documentation files. The agent reads these only when it needs the depth.

Common patterns:

- `REFERENCE.md` — full reference manual.
- `FORMS.md`, `ERRORS.md` — domain-specific deep-dives.
- Per-topic files indexed from the main `SKILL.md`.

### `assets/`

Static resources — templates, images, data files, configuration scaffolds.

## Progressive disclosure (three tiers)

The spec assumes the consuming agent loads skills progressively:

| Tier | What loads | Budget | When paid |
|------|------------|--------|-----------|
| **Index** | `name` + `description` for every non-hidden skill | ~100 tokens per skill | Every session, every user |
| **Instructions** | Full `SKILL.md` body | <5000 tokens recommended | When the skill is activated |
| **Resources** | Files in `scripts/`, `references/`, `assets/` | Unbounded | On demand |

The implication: **keep `SKILL.md` under 500 lines.** File references should be one level deep from `SKILL.md`, using relative paths.

## Validation

```bash
skills-ref validate ./my-skill
```

(The `skills-ref` CLI is referenced by the spec but is in active development at the time of this mirror. Check the upstream repo for current status.)

---

## How this repo extends the spec

This skill uses two opt-in conventions on top of the base spec:

1. **`metadata.graph: true`** — signals that the skill follows the **skill-graph** pattern (thin `SKILL.md` Map of Content + atomic wikilinked nodes in `references/<theme>/`). See [Akshay Pachaar's "Skill Graphs > SKILL.md"](https://x.com/akshay_pachaar).
2. **`[[wikilinks]]` in prose** — Obsidian-style links between atomic nodes. The wikilink itself carries meaning ("follow this if you need depth on X"), not just a reference. Wikilinks resolve by basename — themed subfolders are organizational, not namespaces.

Both are spec-compatible because they're just markdown.

## Related specs and tools

- **[`agents.md`](https://agents.md)** — repo-level operating guidance for AI agents (this repo's `AGENTS.md`). Complements skills: AGENTS.md is one repo-scoped file, SKILL.md is a portable packaged capability.
- **[`design.md`](https://github.com/google-labs-code/design.md)** — Google Labs' format for describing a visual identity to coding agents. Mirrored at [`spec/design-md-spec.md`](./design-md-spec.md). See `meta/using-design-md.md` in the skill for how the agent should consume one.
- **[skills.sh](https://www.skills.sh)** — discovery and installation index for skills. CLI: `npx skills add <owner>/<repo>`.
- **[Perplexity's Skills guide](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity)** — practical guidance on writing skills well (the "Load when…" description, gotchas flywheel, evals as Step 0, progressive disclosure).
- **[anthropics/skills](https://github.com/anthropics/skills)** — Anthropic's official skills repository. Reference for the `./spec`, `./template`, `./skills`, `.claude-plugin/marketplace.json` layout.
