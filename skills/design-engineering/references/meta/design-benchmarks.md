---
title: design-benchmarks
summary: How design output gets measured — DesignBench's generation / edit / repair tasks with compile, CLIP, and MLLM-judge metrics; Design Arena's anonymous pairwise votes aggregated by Bradley-Terry — and this skill's own eval suite that borrows both shapes.
tags: [meta, evals, benchmarks, testing]
---

# Design benchmarks and this skill's evals

Taste is trained, but it is also measurable, and two public benchmarks define the shapes worth borrowing. Neither measures *craft* directly — one measures whether generated UI matches and compiles, the other measures whether people prefer it — so this skill runs both shapes side by side with its own checklist-derived assertions. [[cross-model-testing]] covers routing evals; this node covers output quality.

## DesignBench (WebPAI, arXiv 2506.06251)

900 webpage samples across 11 topics, four stacks (vanilla HTML/CSS, React, Vue, Angular), three tasks that mirror real work: **generation** (UI image → code), **edit** (change an implementation from an instruction, with image, code, or both as context, across 9 edit types: add/change/delete × text, color, position, size, shape, component-level), and **repair** (fix a broken UI across issue categories such as occlusion, crowding, alignment, color and contrast, overflow). Metrics: compile success, visual similarity via CLIP, code-modification similarity, and MLLM-as-judge scoring; difficulty is graded by element count, interdependencies, and cascading scope. Headline findings: models adopt framework components poorly (about 19% Angular component adoption), detect UI issues badly (average accuracy around 0.27), and edit better from code than from images.

What to borrow: the **task triad**. A design skill that only helps generation is untested on the two-thirds of real work that is editing and repairing.

## Design Arena (by Intelligence)

A crowdsourced arena: a prompt is sent to several models, the first outputs are shown anonymously side by side, a human picks the better one, winners are matched again until a 1–4 ranking exists, and every pairwise choice is a vote. Ratings come from a Bradley-Terry fit (iterated to convergence, normalized, then `400 × log10(strength)`), models below a minimum vote count are dropped, and identities stay hidden to prevent brand bias. Separate leaderboards per category — websites, UI components, mobile apps, slides, games, 3D, SVGs, data visualizations, logos, video, text-to-speech — plus an overall frontend board.

What to borrow: **anonymous pairwise judgment.** "Which of these two is better?" is answerable by a person or a judge model where "is this good?" is not, and it is the only honest way to score an aesthetic change.

## This skill's suite

| Layer | File | Shape | Asserts |
|---|---|---|---|
| Routing | `evals/loading.jsonl`, `evals/progressive-reads.jsonl` | fixtures | The skill loads when it should; the right node opens |
| Contract | `evals/review-format.eval.ts`, `motion-values.eval.ts`, `sound-values.eval.ts` | eve scored | Review tables, concrete values |
| Craft floor | `evals/design-bench.eval.ts` + `skills/design-engineering/evals/design-bench.jsonl` | generation / edit / repair fixtures | Deterministic checks lifted from [[review-checklist]]: no `transition: all`, no `scale(0)`, reduced-motion present, inputs ≥ 16px, labelled icon buttons, no `z-index: 9999`, no hover-only actions, no sound before a gesture |
| Preference | `design-bench.jsonl` rows tagged `arena` | pairwise | Two candidates per prompt; a human or judge model picks; log the win rate per node change |

The craft floor is DesignBench's *repair* task pointed at our own tells: each fixture is a broken snippet and the row the checklist should catch. The preference layer is Design Arena's protocol at PR scale: when a node changes what the agent produces, generate before-and-after candidates for three fixtures, judge them blind, and record the result in the PR. A node that loses the pairwise more than it wins is reverted, however good it reads.

## When to apply

Before changing the SKILL.md description or any node that alters output (motion values, palette rules, sound defaults); when comparing models for a design task; when someone asks "is this skill actually helping?"

## Gotcha

Compile rate and CLIP similarity reward *matching the reference*, including its flaws. A repair that fixes an overflow the reference also had can score lower than a faithful reproduction of the bug. Read the pairwise layer before trusting the similarity layer.

## Sources

- Xiao et al., *DesignBench: A Comprehensive Benchmark for MLLM-based Front-end Code Generation* (arXiv 2506.06251), and the WebPAI/DesignBench repository and annotation guideline.
- Design Arena methodology notes (notes.designarena.ai/methodology) — Bradley-Terry aggregation, anonymity, vote thresholds.
- Perplexity Agent Skills team — evals as Step 0.
- Related: [[cross-model-testing]], [[review-checklist]], [[taste-is-trained]].
