# Evals

Per [Perplexity's skill-building guide](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity), evals are **Step 0** — write them before the skill, run them when the skill changes, paste them into PRs that touch the description.

This folder ships starter evals. Forks should add their own.

## What lives here

| File | Format | Tests |
|---|---|---|
| `loading.jsonl` | one query per line | Does the agent load this skill on a query that should trigger it? Does it *not* load on a query that shouldn't? |
| `progressive-reads.jsonl` | one query per line | Once the skill is loaded, does the agent open the right atomic node for the query? |
| `end-to-end.md` | freeform | A handful of realistic review/design tasks with the expected gotchas the agent should cite. Run manually. |

## `loading.jsonl` format

```jsonl
{"query": "<user query>", "should_load": true, "reason": "<why>"}
{"query": "<user query>", "should_load": false, "reason": "<adjacent skill that should load instead>"}
```

## `progressive-reads.jsonl` format

```jsonl
{"query": "<user query>", "expected_nodes": ["<node-basename>", ...], "forbidden_nodes": ["<node>", ...]}
```

`expected_nodes` are nodes the agent must open. `forbidden_nodes` are sibling-like nodes it should *not* open (catches over-eager retrieval).

## How to run them

There's no automated runner shipped here. Two ways to use the files:

1. **Manual** — open Claude Code / Cursor / your agent, paste a query from `loading.jsonl`, check whether `design-engineering` loads. Paste a query from `progressive-reads.jsonl`, check which files the agent reads.
2. **Custom harness** — build a wrapper around the Anthropic SDK / OpenAI SDK that submits each query, captures the loaded skills (from system prompt inspection) and read tool calls, and asserts against the JSONL expectations.

A reference harness lives at [anthropics/claude-skill-evals](https://github.com/anthropics/claude-skill-evals) (community project — link may rot; check `awesome-agent-skills` lists for current best).

## Cross-model

Run every eval against at least **Claude Opus**, **Claude Sonnet**, and **GPT-4-class**. Sonnet and GPT route descriptions differently — what loads on one may not load on the other. See [[meta/cross-model-testing]] for the full guidance.

## When to update

- **Always**, if you change `SKILL.md`'s `description`. Description changes shift routing; you need evidence the change didn't break recall on existing positive queries or introduce false positives.
- When you add a new theme folder, add 2+ rows to `loading.jsonl` covering queries that should resolve to that theme.
- When you add a new atomic node, add 1 row to `progressive-reads.jsonl` covering a query the node should answer.

## Gotcha

These evals test *routing* and *retrieval* — they don't test whether the node content is correct. Content correctness is human-reviewed via the PR process. Don't try to automate taste.

## Sources

- Perplexity Agent Skills team — "Step 0: Write the evals" + "Eval suites" sections of [the guide](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity).
- Related: [[meta/cross-model-testing]], `CONTRIBUTING.md` PR checklist.
