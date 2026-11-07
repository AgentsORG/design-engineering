import { defineState } from "eve/context";
import { defineHook } from "eve/hooks";
import { DEFAULT_ROUND_BUDGET, readLoopMarker } from "../lib/loop";

// Bounded verify-and-retry for the root agent. When a turn completes with
// `<!-- loop: continue -->` (instructions.md ## Loop), start the next round so
// the agent re-runs its deterministic checks and fixes what is still open.
// The budget is DEFAULT_ROUND_BUDGET extra rounds per loop; limits.sessionUsage
// in agent.ts is the hard stop. A person's message drops the continuation and
// resets the counter, so a person can always end the loop and a new task
// always gets the full budget.
//
// turn.settled carries only the reply *part ids*, not the text, so the reply
// text is collected from content.completed and looked up by id.
const rounds = defineState("verify-loop.rounds", () => 0);
const replyText = defineState<Record<string, string>>("verify-loop.reply-text", () => ({}));

export default defineHook({
  events: {
    async "delivery.admitted"(event) {
      const source = event.data.source;
      // Anything not sent by a hook (a person, a schedule, a channel) starts a fresh loop.
      if (!source || !("hook" in source) || !source.hook) rounds.update(() => 0);
    },
    async "content.completed"(event) {
      const { partId, kind, phase, value } = event.data;
      if (kind !== "text" || phase !== "reply" || typeof value !== "string") return;
      replyText.update((parts) => ({ ...parts, [partId]: value }));
    },
    async "turn.settled"(event, ctx) {
      const parts = replyText.get();
      replyText.update(() => ({}));
      if (event.data.outcome !== "completed") {
        rounds.update(() => 0);
        return;
      }
      const text = (event.data.reply ?? []).map((id) => parts[id] ?? "");
      const decision = readLoopMarker(text);
      if (!decision.continue || rounds.get() >= DEFAULT_ROUND_BUDGET) {
        rounds.update(() => 0);
        return;
      }
      rounds.update((n) => n + 1);
      ctx.continue(
        `Verify round ${rounds.get() + 1} of ${DEFAULT_ROUND_BUDGET + 1}: re-run the deterministic checks for the open findings in your ledger, fix what still fails, and update each finding's outcome. Do not agree just to end the loop. End with <!-- loop: continue --> only if a blocker is still open and a fix is in scope; otherwise <!-- loop: done -->.`,
      );
    },
  },
});
