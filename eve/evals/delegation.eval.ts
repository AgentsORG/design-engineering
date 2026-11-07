import { defineEval } from "eve/evals";
import { includes } from "eve/evals/expect";

// Delegation contract (agent/instructions.md delegation table): a motion audit
// goes to the motion-auditor specialist and an SVG build to svg-creator, and
// the parent relays the specialist's concrete values instead of re-deriving
// them. One session, two turns, so each turn's delegation is checked on its own.
export default defineEval({
  description: "Root delegates motion audits and SVG builds to the right specialists.",
  async test(t) {
    const audit = await t.send(
      "Audit the motion in this CSS and tell me what to change:\n" +
        ".toast { animation: in 600ms ease-in; }\n" +
        "@keyframes in { from { transform: scale(0); opacity: 0 } }",
    );
    t.succeeded();
    t.calledAgent("motion-auditor");
    t.check(audit.reply, includes(/cubic-bezier\(|\d+\s?ms/));
    t.check(audit.reply, includes(/prefers-reduced-motion/));

    const icon = await t.send("Draw me a 24px stroke icon of a paper plane as an SVG.");
    t.succeeded();
    t.calledAgent("svg-creator");
    t.check(icon.reply, includes(/<svg[\s\S]*viewBox="0 0 24 24"/));
    t.judge("The parent states which specialist did the work and passes its result on without contradicting it.", {
      on: icon.session.transcript,
    });
  },
});
