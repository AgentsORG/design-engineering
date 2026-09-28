import { defineEval } from "eve/evals";
import { matches } from "eve/evals/expect";

// Launch-film advice must name numbers (seconds or a share of runtime, and a
// cut rate per minute), never "keep it snappy". It does not pin one register's
// values: the rate belongs to the register the agent names. The number must
// sit next to the rate: before it ("15 cuts a minute"), as the interval ("a
// cut every 3-4 s"), or right after a "cuts per minute" label on the same line
// ("Cuts per minute: 12-16"). So "a minute-long film" or "in a minute" is not
// a rate, "3 sections" is not a time, and the prompt's own 60 seconds echoed
// back is not an answer.
export default defineEval({
  description: "Launch-film advice names measured numbers.",
  async test(t) {
    await t.send(
      "For a 60-second product launch film, how many cuts per minute should it have, when should the product name appear, and how long should the endcard hold?",
    );
    t.succeeded();
    t.check(
      t.reply,
      matches(/(?<![\d.])(?!60\s?(s\b|secs?\b|seconds?\b))\d+(\.\d+)?\s?(s\b|secs?\b|seconds?\b|%)/i),
    );
    t.check(
      t.reply,
      matches(
        /\d+(\.\d+)?\s*(cuts?|shots?|times)?\s*(per min|\/\s?min|a minute)|\d+(\.\d+)?\s*(cuts?|shots?)\s*(in a minute|per 60\s?(s\b|secs?\b|seconds?\b))|\b(cuts?|shots?)\s*(per min(ute)?|\/\s?min|a minute)[ \t:*_|=~≈–—-]{0,6}(?!60\s?(s\b|secs?\b|seconds?\b))\d|\b(cut(s|ting)?|shots?)\s+(\w+\s+)?every\s*~?\d+(\.\d+)?(\s?([-–]|to)\s?\d+(\.\d+)?)?\s?(s\b|secs?\b|seconds?\b)/i,
      ),
    );
  },
});
