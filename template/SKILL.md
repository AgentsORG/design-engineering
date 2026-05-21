---
name: your-skill-name
description: Load when ___. One or two sentences describing the user queries that should trigger this skill. Use real phrasing, not workflow summary. Examples — "designing X", "reviewing Y", "asking Z".
license: MIT
metadata:
  author: YOUR_NAME
  version: "0.1.0"
  graph: false
---

# your-skill-name

<!--
This is a starter template for a new skill in this repo.

How to use:
1. Copy this file to `skills/<your-skill-name>/SKILL.md`.
2. Update the frontmatter:
   - `name`: lowercase, hyphenated. Must match the folder name.
   - `description`: "Load when ___" phrasing. This is the hardest line in the skill. Aim for ~50 words. Describe real user queries, not what the skill does.
3. Decide if you're using the skill-graph pattern:
   - If yes → keep `graph: true`, create a `references/` folder, write atomic nodes, link from this file.
   - If no → keep `graph: false`, write all content directly in this file. Stay under 500 lines.
4. Delete this comment block before committing.
-->

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
