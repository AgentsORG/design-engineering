import { defineAgent } from "eve";

export default defineAgent({
  description:
    "Delegate when the user asks 'does this look AI-generated?', wants a content-authenticity audit, asks to delete AI-default tells from a UI, or is reviewing marketing copy that feels generic. Specializes in the anti-patterns cluster — purple gradients, Inter-on-marketing, stock copy, generic icons, placeholder testimonials. Returns a deletion list.",
  model: "anthropic/claude-sonnet-5",
});
