import { defineAgent } from "eve";

export default defineAgent({
  description:
    "Delegate when the user hands over a reference launch film or their own render (a local file, or a URL the user explicitly supplies and approves downloading) and wants it measured — cut rate, still share, first word, name timing, type cadence, typing speed, seams, endcard, loudness, onsets against motion — or reviewed against the measured launch-film corpus. Returns the launch-video-review rubric table plus a per-film JSON in the corpus shape.",
  model: "anthropic/claude-sonnet-5",
});
