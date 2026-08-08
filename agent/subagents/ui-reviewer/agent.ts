import { defineAgent } from "eve";

export default defineAgent({
  description:
    "Delegate when the user asks for a UI code review, animation critique, hover-state audit, component review, or 'is this well-built?' on any CSS, motion, or component code. Returns a Before | After | Why markdown table per the required review-format and scans against the eleven-row review-checklist before signing off.",
  model: "anthropic/claude-sonnet-5",
});
