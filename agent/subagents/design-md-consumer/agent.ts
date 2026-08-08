import { defineAgent } from "eve";

export default defineAgent({
  description:
    "Delegate when the user's project ships a DESIGN.md file (the Google Labs design-token format) and they want generated UI to consume its tokens. Reads DESIGN.md, normalizes the tokens, and produces TypeScript / CSS variables / a Tailwind config / a token-applied snippet that respects the design system.",
  model: "anthropic/claude-sonnet-5",
});
