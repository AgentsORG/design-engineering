# design-bench · 2026-09-05-sonnet

Deterministic checks from `skills/design-engineering/evals/design-bench.jsonl`. Same model in both arms; the only difference is whether the agent read `SKILL.md` and followed its routing before answering.

| arm | rules passed | fixtures fully clean |
| --- | --- | --- |
| baseline | 32 / 36 (89%) | 7 / 10 |
| skill | 35 / 36 (97%) | 9 / 10 |

| fixture | task | rules | baseline | skill | what the baseline missed | what the skill missed |
| --- | --- | --- | --- | --- | --- | --- |
| gen-modal-01 | generation | 5 | 5/5 | 5/5 |  |  |
| gen-form-01 | generation | 5 | 5/5 | 4/5 |  | missing `font-size: ?1[6-9]px\|text-base` |
| gen-toolbar-01 | generation | 4 | 3/4 | 4/4 | missing `hover: ?hover` |  |
| gen-send-sound-01 | generation | 5 | 5/5 | 5/5 |  |  |
| edit-hover-01 | edit | 5 | 3/5 | 5/5 | missing `hover: ?hover`<br>present `translateY\(-4px\)` |  |
| edit-dropdown-01 | edit | 6 | 6/6 | 6/6 |  |  |
| repair-input-01 | repair | 2 | 2/2 | 2/2 |  |  |
| repair-darkmode-01 | repair | 2 | 1/2 | 2/2 | present `background: ?#000;` |  |
| repair-spinner-01 | repair | 1 | 1/1 | 1/1 |  |  |
| repair-focus-01 | repair | 1 | 1/1 | 1/1 |  |  |

Arena rows (arena-hero-01, arena-mascot-01) need a pairwise judge and are not scored here.

Outputs: 20 files in this directory.
