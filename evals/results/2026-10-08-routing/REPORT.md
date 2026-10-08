# Routing check — the diagram trigger (2.7.0)

The SKILL.md description gains one trigger clause, "drawing a diagram or tldraw canvas". To stay under the Agent Skills limit of 1,024 characters, the source list drops "'s audio-haptic principles" after "Apple". The description goes from 1,010 to 1,020 characters.

Four blind judges each saw one description beside twelve competing skill descriptions. The competitors were animations, hyperframes, sound-effects, design, naive-design, supabase, diagram-design, figma-generate-diagram, tldraw-offline, tldraw-migrate, gsap-plugins and better-icons. For each of 61 queries, every judge decided whether a router would load design-engineering; loading other skills alongside it was allowed. The queries are the 51 earlier rows of `skills/design-engineering/evals/loading.jsonl` plus the 10 rows added with this change: seven diagram, canvas and SVG-companion cases, and three negatives (a tldraw SDK upgrade, a shape count on a `.tldraw` file, and PlantUML export in CI).

| Judge | Old description | New description |
|---|---|---|
| Claude Opus | 55/61 | 60/61 |
| Claude Sonnet | 55/61 | 60/61 |

- **No regressions.** All four judges matched every one of the 51 earlier rows, so the trim cost no existing routing.
- **The new clause does its job.** With the old description, every judge declined the five diagram and canvas rows (52–56). With the new one, every judge loaded them.
- **The negatives held.** All three negatives (59–61) stayed unloaded in every arm.
- **GSAP loaded in every arm.** The DrawSVG row (57) loaded in both arms, through the existing "animating SVG (logo reveals)" clause.
- **Row 58 was relabelled after the run.** All four judges declined "find a settings icon in our Phosphor set and add it to the toolbar". On review, the original label (load) was wrong: the pack is already chosen, so the job is a lookup for better-icons with no design decision, and `icon-systems` applies only when the pack is being chosen. The row now reads `should_load: false`, and all four judges agree with it, which makes the new description 61/61 against the corrected labels.
- **Not covered.** No GPT-class judge was run.

The close calls the judges named:
- **Row 54** (diagram or table): a judge with the old description said the description had no diagram hook.
- **Row 56** (laying out a sprint board on tldraw): loaded alongside tldraw-offline, which does the canvas work.
- **Rows 9 and 12** (form-validation timing, a breathing chart): loaded in every arm, as in the 2.6.0 check.

Decisions (1 = load), in query order, against the labels as they stood during the run:

- `expected (run)`: `1111111111110000000011111000111111100110011111100011111111000`
- `opus-old`: `1111111111110000000011111000111111100110011111100010000010000`
- `opus-new`: `1111111111110000000011111000111111100110011111100011111110000`
- `sonnet-old`: `1111111111110000000011111000111111100110011111100010000010000`
- `sonnet-new`: `1111111111110000000011111000111111100110011111100011111110000`
