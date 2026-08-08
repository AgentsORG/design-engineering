import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

// The flagship contract: a UI review request comes back as a
// Before | After | Why table, not prose. Mirrors the routing fixtures in
// skills/design-engineering/evals/loading.jsonl.
export default defineEval({
  description:
    "A UI review request returns the required Before | After | Why table.",
  async test(t) {
    await t.send(
      "Review this CSS for a modal animation:\n" +
        ".modal { transition: all 0.3s ease-in; transform: scale(0); }",
    );
    t.succeeded();
    t.check(t.reply, includes("| Before | After | Why |"));
  },
});
