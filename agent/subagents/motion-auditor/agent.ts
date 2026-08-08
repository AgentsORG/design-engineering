import { defineAgent } from "eve";

export default defineAgent({
  description:
    "Delegate when the user asks about animation timing, easing, springs, transitions, gestures, stagger, or 'this feels janky / theatrical / hesitant'. Specializes in the motion cluster plus the transitions.dev catalog. Returns either a Before | After | Why table (for code) or a one-page motion plan (for new animation work).",
  model: "anthropic/claude-sonnet-5",
});
