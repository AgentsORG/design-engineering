import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";
import { councilResultSchema } from "../agent/lib/council";

// Council contract (agents/design-council.md): the root hands a scored design
// review to design-council, which fans the same brief out to its nested
// judges, reports missing providers instead of substituting, never invents a
// score, and returns the structured CouncilResult with a ## Council review table.
const brief = `Run the design council on this change. Categories: typography, hierarchy, motion, accessibility. Budget: 1 round.
Before:
<button style="font: 13px Arial; color:#9a9a9a; background:#eee; transition: all .5s">Save</button>
After:
<button class="save">Save changes</button>
.save { font: 500 14px/20px Inter, system-ui; color: #fff; background: #0b5cff; border-radius: 8px; padding: 8px 14px;
  transition: background-color 150ms cubic-bezier(0.23, 1, 0.32, 1); }
.save:focus-visible { outline: 2px solid #0b5cff; outline-offset: 2px; }
Reference products: Linear's primary button, Vercel's primary button.`;

export default defineEval({
  description: "design-council returns a schema-valid, uninvented council result.",
  async test(t) {
    const turn = await t.send(brief, { outputSchema: councilResultSchema });
    t.succeeded();
    t.calledAgent("design-council");

    const parsed = councilResultSchema.safeParse(turn.data);
    t.check(parsed.success ? "valid" : JSON.stringify(parsed.error.issues).slice(0, 500), includes(/^valid$/));
    if (!parsed.success) return;

    const result = parsed.data;
    t.check(result.councilReviewMarkdown, includes(/## Council review/));
    t.check(result.councilReviewMarkdown, includes(/\|\s*Round/i));
    for (const round of result.rounds) {
      for (const v of round.verdicts) {
        // Unscored jester never carries numbers; scored judges never score outside 1-10 (schema).
        if (!v.scored) t.check(JSON.stringify(Object.values(v.scores)), includes(/^\[(null,?)*\]$/));
      }
    }
    t.judge("Every missing provider is named as missing rather than replaced by another model's score.", {
      on: JSON.stringify(result),
    });
  },
});
