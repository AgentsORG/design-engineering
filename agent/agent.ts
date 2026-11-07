import { defineAgent } from "eve";

// Runtime config for the root design-engineering agent. Identity comes from
// package.json ("design-engineering"); behavior comes from instructions.md;
// knowledge comes from the packaged skill synced into agent/skills/ (and into
// every subagent, since declared subagents inherit nothing) by
// `npm run sync:skills`. Subagents under agent/subagents/ are generated from
// agents/*.md by `npm run build:agents` and declare their own models.
//
// Codex-subscription users can run locally on ChatGPT instead:
//   import { chatgpt } from "eve/models/openai";
//   model: chatgpt(),   // sign in with /login in `eve dev`; local only, never deployed
export default defineAgent({
  description:
    "Design-engineering generalist: routes UI review, motion, typography, colour, sound, SVG, launch-film and council work to the right specialist and keeps the skill graph's verify loop.",
  model: "anthropic/claude-opus-5.5",
  reasoning: "high",
  limits: {
    // Loop guard: the act -> verify -> fix loop (instructions.md ## Loop and
    // hooks/verify-loop.ts) stops here even if the round budget is not spent.
    sessionUsage: ({ window }) =>
      window.inputTokens - window.cacheReadTokens >= 4_000_000 ||
      window.outputTokens >= 300_000,
  },
});
