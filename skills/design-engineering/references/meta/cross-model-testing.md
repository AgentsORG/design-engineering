---
title: cross-model-testing
summary: Test skill routing and execution against GPT, Claude Opus, Claude Sonnet. Sonnet and GPT behave quite differently.
tags: [meta, testing, evals, models]
---

# Cross-model testing

Perplexity's Agents team: *"Sonnet and GPT behave quite differently when it comes to Skills."* What loads on one model may not load on another. What works on Opus may fail on Haiku. Routing precision is model-dependent.

This is non-obvious. Most skill authors test on one model (the one they happen to use) and assume the routing is universal. It isn't.

## What to test cross-model

For each model family you support:

1. **Loading precision** — Does the agent load the skill when it should? Run 10 positive queries; the skill should load on all 10.
2. **Loading recall** — Does the agent *not* load the skill when it shouldn't? Run 10 adjacent-but-distinct queries; the skill should not load on any.
3. **Progressive read targeting** — When the skill is loaded, does the agent open the right atomic node? Test 5 queries each mapped to a specific node; verify the agent reads that node.
4. **End-to-end output quality** — For a given input (e.g., "review this CSS"), does the agent produce the right output format? Test with the [[review-format]] table requirement.

## Models to cover (as of 2026)

| Family | Models |
|---|---|
| Claude | Opus 4.x, Sonnet 4.x, Haiku 4.x |
| GPT | GPT-5, GPT-5-mini |
| Gemini | Gemini 2.5 Pro, Gemini 2.5 Flash |

You don't need to cover every model. Cover the orchestration models your downstream users will most likely use. For this skill, the priority is Claude Sonnet + Opus (designed for) and GPT-5 (most common alternative).

## How to run cross-model evals

The `evals/` folder in this repo has three eval files:

- `loading.jsonl` — query + expected_load (true/false)
- `progressive-reads.jsonl` — query + expected_node
- `end-to-end.md` — sample tasks + expected output structure

To run them:

```bash
# Pseudo — depends on your harness. Common patterns:
agent-eval skills/design-engineering/evals/loading.jsonl --model claude-sonnet-4
agent-eval skills/design-engineering/evals/loading.jsonl --model claude-opus-4
agent-eval skills/design-engineering/evals/loading.jsonl --model gpt-5
```

Compare results across models. Any divergence ≥5% on the same eval set is a routing problem that needs description-tuning.

## Common cross-model failure modes

1. **GPT loads on broader keywords** — GPT tends to route on noun matches ("CSS", "animation") more aggressively than Claude. If your description uses generic nouns, GPT may load on tangentially-related queries.
2. **Claude Sonnet skips on verbose descriptions** — Sonnet sometimes skips skills with descriptions over ~80 words. Tighten the description if Sonnet recall is low.
3. **Haiku doesn't load multi-node skills well** — Haiku can struggle with the MOC → leaf navigation. Often it stops at the SKILL.md and never opens references. If supporting Haiku, consider inlining critical nodes into SKILL.md.
4. **Opus over-reads** — Opus may open multiple atomic nodes "just in case." Token budget concern; not a routing bug.

## When to run

- Before changing the SKILL.md description (the routing-critical line).
- Before any change to atomic node summaries (which the agent uses to decide which to read).
- Before a new release / version bump.
- Quarterly, as model behavior drifts with model updates.

## Gotcha

Don't test on synthetic queries you wrote yourself. Source from real user queries (production logs, user feedback, hero queries). Synthetic queries have a flavor that biases the model toward the answer you expect — they tell you the description matches the queries you wrote, not whether it matches reality.

## Sources

- Perplexity Agents team — *"Designing, Refining, and Maintaining Agent Skills"*.
- Anthropic — eval harness patterns.
- Related: [[gotchas]], [[review-format]], [[../../CONTRIBUTING|CONTRIBUTING.md]].
