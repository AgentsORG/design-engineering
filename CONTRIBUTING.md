# Contributing to `design-engineering`

Thanks for considering a contribution. This skill graph grows by accretion of small, opinionated, high-signal nodes — not by long PRs that add lots of text. The shorter the PR, usually the better the PR.

> **TL;DR:**
> - One node per PR is ideal.
> - Atomic nodes are 40–80 lines. If yours is longer, split it.
> - Cite a source. Hand-waved knowledge from training data doesn't belong here.
> - Add to `meta/gotchas.md` instead of writing a new node when the lesson is a one-liner.
> - Run the [agentskills.io validator](https://agentskills.io/specification) before opening the PR.

---

## What belongs as a node, and what doesn't

**Add a node when:**

- The topic is durable (won't change month-to-month).
- The agent gets it wrong without explicit instruction.
- You have a source — a person, a library, a documented technique. Not just "I think this is right."
- It's narrow enough to live in 40–80 lines.

**Don't add a node when:**

- The model already knows this from training data (e.g. "use `flex` for layout"). See Perplexity's [Skills guide](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity): every Skill is a tax.
- The information changes monthly (library API surfaces, framework versions).
- The lesson is a one-line "don't do X" → that's a gotcha (see below), not a node.
- The topic already exists in another node. Extend the existing one or link to it; don't fork.

## Node format

Every atomic node lives in `skills/design-engineering/references/<theme>/<name>.md` and follows this shape:

```markdown
---
title: <name>                                    # match filename
summary: <one-sentence summary, 80–120 chars>    # used by Obsidian + agents at scan time
tags: [<theme>, <topic>, <topic>]
---

# <Title Case Name>

<One-paragraph statement of the principle. Open with the rule, not the backstory.>

## <Concrete guidance section>

<Body content. Code examples in fenced blocks. Tables for tabular data. Short prose otherwise.>

## When to apply

<Specific situations. "Every modal." "Reviewing a marketing page." Not "When relevant.">

## Gotcha

<Counter-example or known failure mode. Every node ends with a gotcha.>

## Sources

- <Person / repo / article that this distills>.
- Related: [[wikilink-1]], [[wikilink-2]].
```

### Conventions

- **Filename:** lowercase, hyphenated, no spaces. Unique across the whole repo (Obsidian resolves wikilinks by basename).
- **Length:** 40–80 lines for atomic nodes; 30–60 lines for MOCs.
- **Wikilinks:** `[[bare-name]]` only. No paths (`[[motion/easing-curves]]` is wrong). No extensions (`[[easing-curves.md]]` is wrong).
- **Code examples:** lean toward terse. Show the technique, not the entire setup.
- **Voice:** opinionated, declarative. "Use X. Never Y." Not "You could consider X, depending on your situation."

## Themes (where the node goes)

| Theme | Folder | What goes here |
|---|---|---|
| Philosophy | `references/philosophy/` | Why, when, what-matters |
| Motion | `references/motion/` | Animation, easing, transition, gesture |
| Sound | `references/sound/` | Whether to make a sound, the palette, spec, playback, sound–motion sync, generation, launch-video register |
| SVG | `references/svg/` | Authoring clean SVG, animating it, morphing paths, video-to-vector mascots |
| Typography | `references/typography/` | Type, tracking, weight, hierarchy |
| Surface | `references/surface/` | Color, shadow, radius, dark mode, imperfection |
| Components | `references/components/` | Hover/loading/empty states, icons, cards, forms, avatars |
| Layout | `references/layout/` | Page-level grids, viewports, sticky chrome |
| Anti-patterns | `references/anti-patterns/` | What to remove. Consolidated tells. |
| Meta | `references/meta/` | Review format, gotchas, POV, cross-model — non-content special files |

Adding a new theme = adding `references/<theme>/`, a `MOC-<theme>.md` inside, and linking it from `SKILL.md`. Don't add a theme for fewer than 3 nodes — fold into an existing one.

## Gotcha vs node

Most "I learned not to do X" lessons belong in `references/meta/gotchas.md`, not as a node. The bar:

- **Gotcha (one-liner in `gotchas.md`):** "Don't `position: sticky` inside a parent with `clip-path`. Breaks on Safari."
- **Node (own file):** "Cross-blur transitions" — has a technique, a code sample, when-to-apply guidance, and a gotcha *inside* it.

When in doubt, prefer gotcha. The gotchas file is append-mostly and high-signal over time — see [Perplexity's "gotchas flywheel"](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity).

## Updating descriptions and SKILL.md

The `SKILL.md` description (the "Load when …" line in frontmatter) is the routing trigger. **Do not change it without an eval.** Small word changes can shift routing significantly.

If you do need to update it:
1. List 3–5 real user queries the skill should load for.
2. List 2–3 adjacent queries it should *not* load for.
3. Test against both before opening the PR.

This is the highest-stakes line in the repo. Treat it accordingly.

## PR checklist

Before opening:

- [ ] The node passes the "would the agent get this wrong without it?" test.
- [ ] The node has a source cited at the bottom.
- [ ] The node is 40–80 lines (atomic) or 30–60 (MOC).
- [ ] Wikilinks use `[[bare-name]]`, no path or extension.
- [ ] The matching `MOC-<theme>.md` has been updated to include the new node.
- [ ] If a wikilink in your prose points at a node that doesn't exist yet, either create it or remove the link — no dead links.
- [ ] You ran `skills-ref validate ./skills/design-engineering` (or equivalent) — no warnings.
- [ ] If the change touches `SKILL.md`'s description, you've thought about routing → followed the **Cross-model checks** below.
- [ ] If you added a node, added at least one row to `skills/design-engineering/evals/progressive-reads.jsonl`.

## Evals (Perplexity Step 0)

Per [Perplexity's skill-building guide](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity), evals come *before* the skill content. This repo ships them under `skills/design-engineering/evals/`:

- `loading.jsonl` — positive (`should_load: true`) and negative (`should_load: false`) routing queries. Whenever you touch the SKILL.md `description`, add at least 2 new rows in each direction.
- `progressive-reads.jsonl` — which atomic node(s) the agent should open per query. Whenever you add a new node, add at least 1 row.
- `evals/README.md` — format spec and how to run.

## Cross-model checks

Skill descriptions route differently on different model families. Before merging any description change or new MOC-level link, run a smoke test against:

1. **Claude Opus (latest)** — opus-4.x.
2. **Claude Sonnet (latest)** — sonnet-4.x. Routes more conservatively than Opus.
3. **GPT-4-class** (GPT-4o, GPT-5, or current equivalent) — phrasing-sensitive.

For each model, paste 3 positive + 2 negative queries from `evals/loading.jsonl`. Confirm the skill loads / doesn't load as expected.

See `skills/design-engineering/references/meta/cross-model-testing.md` for the full procedure (the same content the skill itself loads when the agent needs to reason about cross-model routing).

## Local development

Open the repo as an [Obsidian](https://obsidian.md) vault to see the graph. Theme folders cluster naturally; wikilinks render as edges. This is the best way to verify your additions integrate.

```bash
git clone https://github.com/AgentsORG/design-engineering
cd design-engineering
# open in Obsidian: File → Open folder as vault → select this directory
```

## License

All contributions are MIT-licensed under the terms of [LICENSE](LICENSE).

## Where to talk

Open an issue at [github.com/AgentsORG/design-engineering/issues](https://github.com/AgentsORG/design-engineering/issues). For taste questions ("should this be a node or a gotcha?"), open a discussion first — saves both of us a forced rewrite.

---

Thanks. Less is more. Stay opinionated.
