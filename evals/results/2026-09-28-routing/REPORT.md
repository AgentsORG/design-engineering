# Routing check — SKILL.md description trim (2.6.0)

The description was trimmed from 1,515 to 1,010 characters to meet the Agent Skills 1,024-character limit. The trigger clauses were kept and the source list compressed. Four blind judges each saw one description beside twelve competing skill descriptions and decided, for each of 51 queries, whether a router would load design-engineering. The queries are the 41 rows of `skills/design-engineering/evals/loading.jsonl` plus the 10 rows appended with this change.

| Judge | Old description | New description |
|---|---|---|
| Claude Opus | 51/51 | 51/51 |
| Claude Sonnet | 51/51 | 51/51 |

Every judge agreed with `should_load` on every row, and old and new produced identical decisions. No GPT-class model was run. The close calls were the same in both arms: form-validation timing and making a chart breathe (both loaded), and a Stripe checkout component (not loaded).

Decisions (1 = load), in query order:

- `opus-old`: `111111111111000000001111100011111110011001111110001`
- `opus-new`: `111111111111000000001111100011111110011001111110001`
- `sonnet-old`: `111111111111000000001111100011111110011001111110001`
- `sonnet-new`: `111111111111000000001111100011111110011001111110001`
