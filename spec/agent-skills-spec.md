# Agent Skills Specification

This skill follows the Agent Skills specification.

**Canonical spec:** [https://agentskills.io/specification](https://agentskills.io/specification)

## Quick reference

### Frontmatter

```yaml
---
name: <skill-name>             # required, lowercase a-z, 0-9, hyphens, max 64 chars
description: <when to load>    # required, max 1024 chars
license: <license>             # optional
compatibility: <env>           # optional, max 500 chars
metadata: { ... }              # optional
allowed-tools: <tools>         # optional, experimental
---
```

### Directory layout

```
skill-name/
├── SKILL.md          # required
├── scripts/          # optional
├── references/       # optional
└── assets/           # optional
```

### Progressive disclosure (3 tiers)

1. **Metadata** — frontmatter only, ~100 tokens, loaded at startup.
2. **Instructions** — `SKILL.md` body, target <5000 tokens / <500 lines, loaded on activation.
3. **Resources** — files in `scripts/`, `references/`, `assets/`, loaded on demand.

### Rules

- `name` must match the parent directory name.
- Keep `SKILL.md` under 500 lines.
- File references one level deep.
- Use `metadata:` for non-spec fields (with unique key names to avoid conflicts).

### Validation

```bash
skills-ref validate ./skills/<skill-name>
```

## How this repo extends the spec

This skill uses two opt-in conventions on top of the base spec:

1. **`metadata.graph: true`** — signals that the skill follows the skill-graph pattern (thin SKILL.md MOC + atomic wikilinked nodes in `references/`). See [Akshay Pachaar's framing](https://x.com/akshay_pachaar).
2. **`[[wikilinks]]` in prose** — Obsidian-style links between atomic nodes in `references/`. The wikilink itself carries meaning ("follow this if you need depth on X"), not just a reference.

Both are spec-compatible because they're just markdown.

## Related

- [agents.md](https://agents.md) — repo-level operating guidance for agents (this repo's `AGENTS.md`).
- [skills.sh](https://www.skills.sh) — discovery and installation index for skills.
- [Perplexity's Skills guide](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity) — practical guidance on writing skills well.
