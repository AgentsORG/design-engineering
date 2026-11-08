# Notices

This repository is MIT licensed; see [LICENSE](../LICENSE). It also contains or adapts work by others under their own licenses. Each is listed here with what was taken and where it lives.

## Vendored code

- **Stageshow** by Benji Taylor (MIT, Stageshow 1.1.1, HEAD `299140f`). The faux-UI kit under `docs/readme/stage/kit/` and the scene scaffolding under `docs/readme/stage/` are copied from it to build the README stills. Its license is kept at [docs/readme/stage/LICENSE](readme/stage/LICENSE) and its own notice at [docs/readme/stage/NOTICE.md](readme/stage/NOTICE.md). Stageshow's brand artwork (`kit/brands/`, not covered by its MIT license) is not vendored. Stageshow's app icons (`assets/app-icons.ts`) are not vendored.

## Adapted work (paraphrased, not copied)

- **tstack** by Theo Browne (MIT, github.com/t3dotgg/tstack, HEAD `1085050`). The `design-council` agent, `skills/design-engineering/scripts/council.mjs` and the shared loop rules in [docs/subagents.md](subagents.md) adapt its `council` and `sol-loop` skills to design review: cross-provider judges, per-category scores, a hidden threshold, staged judges and a scope guard. Copyright (c) 2026 Theo Browne; the MIT permission notice applies to the adapted portions.
- **emilkowalski/skills** (MIT, github.com/emilkowalski/skills, commit `5206a95`). Cited by name and commit in the nodes that draw on it.
- **Emil Kowalski's design-engineering practice, distilled by AgentsORG.** Paraphrased principles with attribution; no course material is reproduced.

## Strategies only

The `design-grader` agent, `skills/design-engineering/references/meta/grading-rubric.md`, `skills/design-engineering/references/meta/design-moves.md` and `skills/design-engineering/scripts/grade.mjs` take only the general strategy of grading a design episode on several axes from deterministic checks first and judges second. Their axes, bands, prompts, checks and catalog are written for this repo; no code, prompts or scoring rules were copied from any other grader.

## Other sources

Every atomic node cites its own sources at the bottom, and [AGENTS.md](../AGENTS.md) lists them under "Sources of truth". Product names and marks used as examples remain with their owners.
