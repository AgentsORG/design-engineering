import { defineEval } from "eve/evals";
import { matches } from "eve/evals/expect";

// The craft floor, DesignBench-style repair task pointed at our own tells:
// a generated modal must not ship the four most common review-checklist
// failures. Fixture rows live in skills/design-engineering/evals/design-bench.jsonl.
export default defineEval({
  description: "Generated modal passes the review-checklist floor.",
  async test(t) {
    await t.send(
      "Write the CSS for a settings modal entrance: overlay plus panel, with an enter and exit animation.",
    );
    t.succeeded();
    t.check(t.reply, matches(/prefers-reduced-motion/));
    t.check(t.reply, matches(/scale\(0\.9\d?\)|scale:\s?0\.9/));
    t.check(t.reply, matches(/^(?![\s\S]*transition:\s?all)/));
    t.check(t.reply, matches(/^(?![\s\S]*scale\(0\))/));
  },
});
