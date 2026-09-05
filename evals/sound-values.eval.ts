import { defineEval } from "eve/evals";
import { matches } from "eve/evals/expect";

// Sound advice must be concrete — a duration in milliseconds, a loudness or
// peak figure, or an explicit "no sound" — never "a subtle chime".
export default defineEval({
  description: "Sound advice names a duration, a level, or says no sound.",
  async test(t) {
    await t.send("What sound should play when a message is sent in my chat app?");
    t.succeeded();
    t.check(t.reply, matches(/\d+\s?ms|LUFS|dBFS|no sound|silent|silence/i));
  },
});
