import { defineEvalConfig } from "eve/evals";

// Most evals are deterministic gates (includes / calledAgent). The delegation
// and council evals add soft t.judge(...) checks graded by the default judge
// model (typesafe-ai/jev); soft judges are tracked, never gating.
export default defineEvalConfig({
  judge: { model: "typesafe-ai/jev" },
  maxConcurrency: 4,
  timeoutMs: 15 * 60_000,
});
