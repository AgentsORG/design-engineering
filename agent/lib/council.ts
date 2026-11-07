import { z } from "zod";

// Shared structured-output contract for the design council (agent/subagents/
// design-council/) and its nested judges. Send it as `outputSchema` from a
// client, an eval, or a workflow tool's `ctx.agent("design-council").send()`.
// Rubric categories mirror skills/design-engineering/references/meta/
// grading-rubric.md; a judge scores only the categories the brief selects.

export const councilCategories = [
  "typography",
  "hierarchy",
  "colour-contrast",
  "spacing-layout",
  "motion",
  "states",
  "accessibility",
  "copy",
] as const;

export const councilCategorySchema = z.enum(councilCategories);

/** 1-10, or null when the judge could not score it. `no score` is never invented. */
export const judgeScoreSchema = z.number().int().min(1).max(10).nullable();

export const findingSchema = z.object({
  id: z.string().describe("Stable id, e.g. F1, reused across rounds."),
  severity: z.enum(["blocker", "should", "nit"]),
  before: z.string(),
  after: z.string(),
  why: z.string(),
  outcome: z.enum(["open", "fixed", "wontfix", "disputed"]).default("open"),
});

export const judgeVerdictSchema = z.object({
  judge: z.string().describe("Delegate name, e.g. claude-judge."),
  provider: z.enum(["anthropic", "openai", "google"]),
  scored: z.boolean().describe("false for the unscored jester."),
  scores: z.record(councilCategorySchema, judgeScoreSchema),
  findings: z.array(findingSchema),
  confidence: z.number().min(0).max(1),
  evidenceSeen: z.array(z.string()).describe("Screenshots, films, diffs or reference products the judge actually looked at."),
});

export const councilRoundSchema = z.object({
  round: z.number().int().min(1),
  verdicts: z.array(judgeVerdictSchema),
  missingProviders: z.array(z.string()).describe("Providers that were unavailable; reported, never substituted."),
});

export const councilResultSchema = z.object({
  summary: z.string().describe("Terse verdict: what passed, what still blocks, at most 120 words."),
  status: z.enum(["passed", "budget-spent", "blocked", "needs-human"]),
  rounds: z.array(councilRoundSchema).min(1),
  /** Markdown `## Council review` table for the PR description. */
  councilReviewMarkdown: z.string(),
  tasteNote: z.string().nullable().describe("The one human taste note taken mid-climb, if any."),
});

export type CouncilCategory = z.infer<typeof councilCategorySchema>;
export type JudgeVerdict = z.infer<typeof judgeVerdictSchema>;
export type CouncilResult = z.infer<typeof councilResultSchema>;
