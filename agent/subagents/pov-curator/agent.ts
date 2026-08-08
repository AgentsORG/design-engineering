import { defineAgent } from "eve";

export default defineAgent({
  description:
    "Delegate when the installer wants to fork pov.md for their own taste, append a one-liner to gotchas.md after a real failure, or audit whether current overrides still reflect actual decisions. Maintains the two installer-editable files that make the skill personal — pov.md (opinions that override defaults) and gotchas.md (lived failures, append-only).",
  model: "anthropic/claude-sonnet-5",
});
