# Evals

Per [Perplexity's skill-building guide](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity), evals are **Step 0** — write them before the skill, run them when the skill changes, paste them into PRs that touch the description.

This folder ships the skill's own evals. Forks should add their own.

## What lives here

| File | Format | Tests |
|---|---|---|
| `loading.jsonl` | one query per line | Does the agent load this skill on a query that should trigger it? Does it *not* load on a query that shouldn't? |
| `progressive-reads.jsonl` | one query per line | Once the skill is loaded, does the agent open the right atomic node for the query? |
| `dispatch.jsonl` | one invocation per line | Does `/design-engineering <verb> [target]` open the right command file (`expected_command`: a `cmd-*` basename, `router`, `menu` or `none`), then the right nodes? CI checks that every verb in the SKILL.md table has a file and a row here. |
| `design-bench.jsonl` | one fixture per line | End-to-end generation, edit, repair and review tasks with deterministic `must_match` / `must_not_match` rules on the answer. Optional `clusters` tags the reference folders a fixture exercises (used by the ablation bench); `score_on: "text"` scores the whole reply instead of its code blocks. `arena` rows need a pairwise judge. |

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

## `design-bench.jsonl` format

```jsonl
{"id": "<task>-<topic>-01", "task": "generation|edit|repair|review", "clusters": ["motion"], "prompt": "...", "input": "<code to edit, optional>", "must_match": ["<regex>"], "must_not_match": ["<regex>"], "checklist_rows": [1, 2]}
```

`edit` rows use `instruction` and `repair` rows use `issue` in place of `prompt`. Rules are JavaScript regexes run with the `m` flag.

## How to run them

From the repository root (see `evals/README.md` for every runner):

1. **Ablation bench** — `node scripts/bench.mjs --arms none,full --tries 3` runs `design-bench.jsonl` through `claude -p` with and without an isolated plugin copy, and `--arms all --relevant-only` adds a `minus-<cluster>` arm per reference folder. It writes `evals/results/<date>-<model>-ablation/REPORT.md` with a noise floor and keep / slim / retire verdicts.
2. **Plugin eval suite** — `claude plugin eval .` runs `evals/plugin/<case>/` (regex, `tool_used: Skill` and `llm` graders) three times per case, with and without the plugin.
3. **Manual** — paste a query from `loading.jsonl` into Claude Code, Cursor or another agent and check whether `design-engineering` loads; paste one from `progressive-reads.jsonl` and check which files it reads.

## Cross-model

Run every eval against at least **Claude Opus**, **Claude Sonnet**, and **GPT-4-class**. Sonnet and GPT route descriptions differently — what loads on one may not load on the other. See [[meta/cross-model-testing]] for the full guidance.

## When to update

- **Always**, if you change `SKILL.md`'s `description`. Description changes shift routing; you need evidence the change didn't break recall on existing positive queries or introduce false positives.
- When you add a new theme folder, add 2+ rows to `loading.jsonl` covering queries that should resolve to that theme, and a `design-bench.jsonl` fixture tagged with that cluster so its ablation arm has something to measure.
- When you add a new atomic node, add 1 row to `progressive-reads.jsonl` covering a query the node should answer.

## Gotcha

`loading`, `progressive-reads` and `dispatch` test *routing* and *retrieval*; `design-bench` tests a narrow slice of output with regexes. None of them proves the node content is good. Content correctness is human-reviewed via the PR process, and a cluster the bench marks "slim" may still carry facts only a value-recall eval protects. Don't try to automate taste.

## Sources

- Perplexity Agent Skills team — "Step 0: Write the evals" + "Eval suites" sections of [the guide](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity).
- Related: [[meta/cross-model-testing]], [[meta/design-benchmarks]], `CONTRIBUTING.md` PR checklist.
