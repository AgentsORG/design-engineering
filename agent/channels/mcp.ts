import { localDev } from "eve/channels/auth";
import { mcpChannel } from "eve/channels/mcp";

// Publishes the design-engineering agent as an MCP server so Claude Code,
// Codex, Cursor and other MCP clients can hand it long-running design work
// (agent_start / agent_get / agent_update / agent_cancel), call its tools
// directly, and read its skills under skill://.
//
//   claude mcp add --transport http design-engineering http://localhost:2000/eve/v1/mcp
//
// localDev() accepts requests only under `eve dev` / `vercel dev` and rejects
// every request in production. Swap in oauthResource(oidc(...)) or another
// production auth strategy before deploying.
export default mcpChannel({
  auth: localDev(),
  tools: true,
  skills: true,
});
