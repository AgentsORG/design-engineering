import { defineAgent } from "eve";

export default defineAgent({
  description:
    "Delegate when the user wants an SVG to move — an animated icon, logo reveal, stroke drawing, path morph, mascot loop, chart transition — or wants a frame sequence or flat video clip turned into one editable animated SVG. Picks the engine for where the file lives, writes the animation, and verifies size, reduced motion, and timing.",
  model: "anthropic/claude-sonnet-5",
});
