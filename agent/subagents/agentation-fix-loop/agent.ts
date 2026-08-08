import { defineAgent } from "eve";

export default defineAgent({
  description:
    "Delegate when the user is running an Agentation two-session workflow and this agent is the Session 2 (fix) side. Watches MCP annotations from the critique session, reads each annotation's selector + file path + critique, applies the fix in code, commits, and loops to the next. Use only when the agentation MCP server is connected.",
  model: "anthropic/claude-sonnet-5",
});
