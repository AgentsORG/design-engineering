import { defineAgent } from "eve";

export default defineAgent({
  description:
    "Delegate when the user wants an SVG made or fixed — an icon, illustration, logo mark, mascot pose, chart glyph, or generative vector art — or when a generated SVG needs to become clean, editable, token-aware, optimized, and accessible. Returns the file plus a one-table report of what changed and why.",
  model: "anthropic/claude-sonnet-5",
});
