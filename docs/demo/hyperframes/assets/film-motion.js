/* design-engineering launch film — shared motion helpers.
   The register (Skale's UI-motion, per references/meta/pov.md) and the numbers come from
   references/launch-video/: arrivals settle exponentially with a time constant sized to the move,
   exits accelerate on the mirror curve, decisions are stamped, words build one at a time and the
   newest word carries the accent until it settles. Everything here is deterministic. */
window.FM = (() => {
  // Exponential arrival over `dur` seconds with time constant `tau`, normalised to end exactly at 1.
  const eo = (dur, tau = 0.12) => (p) => (1 - Math.exp((-p * dur) / tau)) / (1 - Math.exp(-dur / tau));
  // The mirror exit: starts slow, leaves fast.
  const ei = (dur, tau = 0.12) => (p) => 1 - eo(dur, tau)(1 - p);

  // Seeded PRNG (mulberry32) — any "random" offset in the film comes from here.
  const rng = (seed) => () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  // Build words one at a time: each arrives with a short rise and a clearing blur. A word marked
  // `.mk` is set in the scene's accent in CSS and settles to `base` ~0.2 s after it lands
  // (launch-video-type: the newest word is marked, then settles). A `.keep` word stays in the accent.
  function words(tl, els, t0, step, o = {}) {
    const { base, y = 22, blur = 8, dur = 0.3, settle = 0.2 } = o;
    const times = [];
    Array.from(els).forEach((el, i) => {
      const t = t0 + i * step;
      times.push(t);
      tl.fromTo(el, { autoAlpha: 0, y, filter: `blur(${blur}px)` },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: dur, ease: eo(dur, 0.09) }, t);
      if (base && el.classList.contains("mk") && !el.classList.contains("keep")) {
        tl.to(el, { color: base, duration: 0.16, ease: "none" }, t + settle);
      }
    });
    return times;
  }

  // Human typing: per-character onsets for `text`, `cps` characters a second inside a word,
  // a longer gap between words, +-30 % spread per key (HeyGen's measured hand: sd ~0.29 x interval).
  function keys(text, t0, seed, cps = 18, wordGap = 0.2) {
    const r = rng(seed), out = [];
    let t = t0;
    for (let i = 0; i < text.length; i++) {
      out.push(t);
      const base = text[i] === " " ? wordGap : 1 / cps;
      t += base * (1 + (r() - 0.5) * 0.6);
    }
    return out;
  }

  // CSS cubic-bezier as an ease: solve x(t) = p, return y(t). Used where the film shows a UI curve.
  function bezier(x1, y1, x2, y2) {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const X = (t) => ((ax * t + bx) * t + cx) * t, Y = (t) => ((ay * t + by) * t + cy) * t;
    const dX = (t) => (3 * ax * t + 2 * bx) * t + cx;
    return (p) => {
      if (p <= 0) return 0;
      if (p >= 1) return 1;
      let t = p;
      for (let i = 0; i < 8; i++) { const e = X(t) - p, d = dX(t); if (Math.abs(e) < 1e-6 || Math.abs(d) < 1e-6) break; t -= e / d; }
      let lo = 0, hi = 1;
      if (Math.abs(X(t) - p) > 1e-5) { t = p; for (let i = 0; i < 40; i++) { if (X(t) < p) lo = t; else hi = t; t = (lo + hi) / 2; } }
      return Y(t);
    };
  }

  return { eo, ei, rng, words, keys, bezier };
})();
