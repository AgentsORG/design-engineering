import { defineAgent } from "eve";

// Runtime config for the root design-engineering agent. Identity comes from
// package.json ("design-engineering"); behavior comes from instructions.md;
// knowledge comes from the packaged skill synced into agent/skills/ by
// `npm run sync:skills`. Subagents under agent/subagents/ declare their own
// models and descriptions.
export default defineAgent({
  model: "anthropic/claude-opus-4.8",
});
