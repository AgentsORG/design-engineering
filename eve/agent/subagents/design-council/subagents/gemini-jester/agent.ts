import { defineAgent } from "eve";

// Nested council member of design-council (modelled on eve's
// eve-llm-council-template). Read-only: bash, write_file and edit_file are
// disabled in ./tools. Output contract: judgeVerdictSchema in agent/lib/council.ts.
export default defineAgent({
  description:
    "Google Gemini jester of the design council. Unscored: reads the same evidence and returns the strongest case against the current direction, so the scored judges have something to answer.",
  model: "google/gemini-3.5-flash",
  reasoning: "medium",
  limits: {
    sessionUsage: ({ window }) =>
      window.inputTokens - window.cacheReadTokens >= 600_000 || window.outputTokens >= 40_000,
  },
});
