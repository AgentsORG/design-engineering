import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

// The craft floor, DesignBench-style repair task pointed at our own tells:
// a generated modal must not ship the four most common review-checklist
// failures. Fixture rows live in skills/design-engineering/evals/design-bench.jsonl.
export default defineEval({
  description: "Generated modal passes the review-checklist floor.",
  async test(t) {
    const turn = await t.send(
      "Write the CSS for a settings modal entrance: overlay plus panel, with an enter and exit animation.",
    );
    t.succeeded();
    t.check(turn.reply, includes(/prefers-reduced-motion/));
    t.check(turn.reply, includes(/scale\(0\.9\d?\)|scale:\s?0\.9/));
    t.check(turn.reply, includes(/^(?![\s\S]*transition:\s?all)/));
    t.check(turn.reply, includes(/^(?![\s\S]*scale\(0\))/));
  },
});
