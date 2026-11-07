# Evals and benchmarks

Three local ways to measure the skill, from cheapest to most thorough. All of them run on your own Claude Code login; nothing is uploaded except what the model sees.

| Runner | What it answers | Command |
| --- | --- | --- |
| eve evals (`*.eval.ts`) | Does the eve agent route and recall values correctly? | `npx eve eval` |
| Plugin eval suite (`plugin/`) | With the plugin installed, do answers pass regex and judge graders more often than without it? Did the skill fire? | `claude plugin eval .` |
| Ablation bench (`../scripts/bench.mjs`) | How much does the whole skill, and each reference cluster, move the score? Which gaps are noise? What does it cost? | `node scripts/bench.mjs` |

Fixtures for the bench live in `skills/design-engineering/evals/design-bench.jsonl`; their format is in that folder's `README.md`.

## Plugin eval suite

`.claude-plugin/plugin.json` points Claude Code at `evals/plugin` (`"experimental": { "evals": "evals/plugin" }`). Each case is a folder:

```text
evals/plugin/<case>/
  prompt.md          frontmatter (max_turns, timeout_seconds, allowed_tools, tags) + the prompt
  graders/*.md       one grader per file: regex, tool_used (Skill, with-only) or llm
```

```sh
claude plugin eval .                                  # every case, 3 runs, with and without the plugin
claude plugin eval . --case modal-enter --runs 1      # one case, quick
claude plugin eval . --tag motion -j 4 --model sonnet # a tag, 4 at once
```

The `skill-fired` grader (`tool_used: Skill`, `arm: with-only`) is reported as a plugin-fired indicator, not scored, so the Δ column compares answers only. Results land in `evals/plugin/results/` (git-ignored).

## Ablation bench

```sh
node scripts/bench.mjs --arms none,full --fixtures 2 --tries 1 --model sonnet --concurrency 2   # smoke test
node scripts/bench.mjs --arms none,full --tries 3                                               # skill vs no skill
node scripts/bench.mjs --arms all --tries 3 --relevant-only --concurrency 4                     # every cluster
node scripts/bench.mjs --report-only --out evals/results/2026-11-07-sonnet-ablation             # rebuild the report
node scripts/bench.mjs --arms all --relevant-only --dry-run                                     # plan only
```

- **Arms.** `none` has no design-engineering at all. `full` loads an isolated copy of the plugin through `--plugin-dir`. `minus-<cluster>` is that copy without `references/<cluster>/` (`minus-agents` drops the subagents). Clusters are read from disk.
- **Isolation.** Each run is a fresh `claude -p` in an empty temp folder with `--setting-sources project`, `--strict-mcp-config` and the tools `Read, Glob, Grep, Skill`. The bench reads the stream-json `system/init` line of every run: `none` must list no design-engineering skill, agent or plugin, and plugin arms must list exactly the bench copy. Runs that fail are excluded and counted in the report.
- **`--relevant-only`.** A minus-cluster arm runs only fixtures whose `clusters` tag (or review-checklist rows, which count as `meta`) touches that cluster.
- **Scoring.** The `must_match` / `must_not_match` rules from `run-bench.mjs`, plus the deterministic checks in `skills/design-engineering/scripts/grade.mjs` (reported as findings per answer; checks only catch mistakes, they never raise a score).
- **Statistics.** A paired two-level bootstrap (fixtures, then tries) gives a 95% CI for each gap. The minimum detectable difference is 2.8 × the bootstrap SE; a gap below it is labelled noise. With fewer than two fixtures or two tries the report says so instead of inventing a noise floor.
- **Verdicts.** keep (removing the cluster costs more than the MDD), retire (removing it helps by more than the MDD), slim (noise: trim weight, keep fact-carrying nodes) or insufficient data.
- **Cost.** `total_cost_usd`, tokens and wall time per arm, from each run's result line.
- **Resumable.** Each run is saved to `<out>/runs/<arm>/<fixture>.t<k>.json`; a rerun skips finished runs and retries errors. `--max-cost-usd` stops a sweep at a ceiling.

Output: `evals/results/<date>-<model>-ablation/REPORT.md` and `report.json` (committed) and `runs/` (git-ignored).

## Older runs

`run-bench.mjs` scores hand-collected `<fixture>.baseline.md` / `<fixture>.skill.md` answers in a results folder (`node evals/run-bench.mjs evals/results/2026-09-05-sonnet`). The bench imports its scorer, so both read the same rules.
