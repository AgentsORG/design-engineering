# Skill template

This file is a starter template for adding a new skill to this repo. It is **deliberately named `TEMPLATE.md` (not `SKILL.md`)** so the [skills.sh](https://skills.sh) CLI does not pick it up as an installable skill.

## How to use this template

1. Decide the new skill's name — lowercase, hyphenated (e.g. `my-new-skill`).
2. Create the folder `skills/<my-new-skill>/`.
3. Copy the SKILL.md template block below into `skills/<my-new-skill>/SKILL.md`.
4. Update the frontmatter — `name` (must match folder), `description` (the "Load when…" line), `metadata.author`.
5. Decide if you're using the skill-graph pattern. If yes → create `references/<theme>/` subfolders and atomic nodes; keep `graph: true`. If no → write all content directly in `SKILL.md`; set `graph: false`; stay under 500 lines per the [agentskills spec](../spec/agent-skills-spec.md).
6. Add an entry to `.claude-plugin/marketplace.json` so the new skill is published as a Claude Code plugin.
7. Add a CI required-files row in `.github/workflows/lint.yml` if you want CI to enforce its presence.

## SKILL.md template

Copy from the next line down through the end of this file into your new `skills/<my-new-skill>/SKILL.md`:

```markdown
---
name: my-new-skill
description: Load when ___. One or two sentences describing the user queries that should trigger this skill. Use real phrasing, not workflow summary. Examples — "designing X", "reviewing Y", "asking Z".
license: MIT
metadata:
  author: YOUR_NAME
  version: "0.1.0"
  graph: false
---

# my-new-skill

## When to use this skill

(Optional — usually the frontmatter description is enough. Add this section only if you want explicit decision-tree guidance for the agent.)

## How to use this skill

(For graph-style skills, this becomes a Map of Content section with wikilinks to atomic nodes.)

## Body

(Replace this section with the actual skill content. Be terse. Every sentence costs tokens in every session.)

## Gotchas

(Append-only list of failure cases. Each entry: `[YYYY-MM-DD] one-line description → fix in [[node-name]]`.)

---

Built following the [Agent Skills specification](https://agentskills.io/specification).
```

## Why TEMPLATE.md not SKILL.md

The `skills.sh` CLI globs `**/SKILL.md` across the repo when discovering installable skills. A file at `template/SKILL.md` would appear in the install picker as a second skill candidate alongside the real one, which is confusing for installers.

Naming this file `TEMPLATE.md` keeps the same starter content available to contributors while avoiding the false-positive in the CLI picker.

## Related

- [`AGENTS.md`](../AGENTS.md) — repo-level conventions when editing skills.
- [`CONTRIBUTING.md`](../CONTRIBUTING.md) — PR conventions, node format, length targets, cross-model testing.
- [`spec/agent-skills-spec.md`](../spec/agent-skills-spec.md) — full Agent Skills specification (offline mirror).
