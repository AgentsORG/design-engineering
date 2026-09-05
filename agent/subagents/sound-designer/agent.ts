import { defineAgent } from "eve";

export default defineAgent({
  description:
    "Delegate when the user wants to add sound to a product UI or a launch video, asks 'should this have a sound?', wants a family of UI sounds generated (ElevenLabs on demand, or open-weight / procedural / CC0 without a key), needs sounds synced to animation frames, or asks why an existing sound feels stock, late, or annoying. Runs the sound cluster end to end — decide, palette, generate, spec, wire up, review — and returns a sound map table plus files.",
  model: "anthropic/claude-sonnet-5",
});
