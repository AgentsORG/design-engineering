import { defineAgent } from "eve";

// Nested council member of design-council (modelled on eve's
// eve-llm-council-template). Read-only: bash, write_file and edit_file are
// disabled in ./tools. Output contract: judgeVerdictSchema in agent/lib/council.ts.
export default defineAgent({
  description:
    "Anthropic Claude judge of the design council. Scores one design brief's before/after evidence against the rubric categories it is given, independently, and returns a JSON verdict with Before/After/Why findings.",
  model: "anthropic/claude-opus-5.5",
  reasoning: "high",
  limits: {
    sessionUsage: ({ window }) =>
      window.inputTokens - window.cacheReadTokens >= 600_000 || window.outputTokens >= 40_000,
  },
});
