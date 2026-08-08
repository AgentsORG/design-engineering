import { defineEval } from "eve/evals";
import { matches } from "eve/evals/expect";

// Motion advice must name concrete values (a cubic-bezier or a millisecond
// duration), never just "use a softer ease".
export default defineEval({
  description: "Easing advice names a concrete curve or duration.",
  async test(t) {
    await t.send("What easing curve should I use for a dropdown opening?");
    t.succeeded();
    t.check(t.reply, matches(/cubic-bezier\(|\d+\s?ms/));
  },
});
