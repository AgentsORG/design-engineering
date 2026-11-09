---
title: prefers-reduced-motion
summary: The one accessibility rule everyone skips. Disable large translations/scales, not all motion.
tags: [motion, accessibility]
---

# `prefers-reduced-motion`

The `prefers-reduced-motion` media query is set by users with vestibular disorders, attention-related conditions, or who simply prefer less motion. About 5–15% of users have it enabled, depending on platform.

The mistake almost everyone makes: setting `* { animation-duration: 0ms !important }` and calling it done. That breaks more than it fixes.

## What to actually do

| Type of motion | When reduced | Notes |
|---|---|---|
| Large translations (slide-in panels, route transitions) | **Disable.** Replace with instant or opacity fade | Causes the most discomfort |
| Large scale changes (modal entrance from 0.8 → 1) | **Disable.** Replace with opacity only | Same as above |
| Parallax | **Disable.** Static positioning | The worst offender |
| Opacity fades | **Keep.** ~120ms is fine | Not motion-disordering |
| Color/background transitions | **Keep.** | Not motion |
| Hover micro-interactions (1px shift, color change) | **Keep but consider shortening.** | Borderline |
| Loading spinners | **Disable.** Use a static label or progress bar | Critical |
| Auto-playing video / carousel | **Disable.** Require interaction to start | Critical |

## The CSS pattern

```css
.modal {
  transform: scale(0.95);
  opacity: 0;
  transition: transform 200ms, opacity 200ms;
}
.modal[data-state="open"] {
  transform: scale(1);
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .modal {
    transform: none;
    transition: opacity 120ms;
  }
}
```

Note: we keep the opacity transition, drop the scale.

## The React / Framer Motion pattern

```tsx
const reducedMotion = useReducedMotion();
<motion.div
  initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2 }}
/>
```

## When this matters most

- Any modal, dialog, drawer, or popover.
- Page transitions in single-page apps.
- Hero animations on marketing pages (high-motion by design — disable them).
- Confetti and celebration moments (provide a static success state).

## Fewer and gentler, or none?

Emil's published skills say fewer and gentler: keep opacity and color changes that explain a state, drop movement, scale, parallax and overshoot. His practice notes go further and disable everything, opacity fades included. This node keeps the short fade as the default because it carries meaning without motion; take the stricter line when a product's audience or a client's standard asks for it. Either way, ship the reduced path with the animation, not as a follow-up.

## Beyond the media query

Some motion causes vestibular trouble even with the setting off: a whole-viewport background in motion, a slow loop around 0.2 Hz (one cycle about every 5s), a hard jump in brightness. Ease a theme switch instead of cutting it. When a large surface has to travel, make it partly see-through on the way, or fade it out for the move and back in once it lands. Transparency and contrast preferences are in [[translucent-materials]].

## Reference

The reduced path is the finished state, not frame 0: the toast already shown, the chart already drawn, an overlay already on its target, nothing caught mid-change. Read the preference live, and treat a host that renders a still as reduced too. Adapted from `stageshow/kit/reduced-motion.ts`:

```ts
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)'), update = () => setReduced(mq.matches);
    update(); mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return useContext(StillContext) || reduced; // a static host counts as reduced
}
```

- **Gold example:** `stageshow/kit/reduced-motion.ts`; `stageshow/kit/motion/Follow.tsx` places its overlay straight on the target when reduced. For a demo Benji goes further than this node's short-fade default: the stage drops its loop and shows its `poster` (`stageshow/references/kit.md`, Playback).
- **Check:** render with the setting on, cover the motion and ask what happened: the still answers on its own. Then toggle the preference during playback and back (`stageshow/references/rehearse.md`, Reduced motion): it switches without a reload and strands nothing at `opacity: 0`.

## Gotcha

Loading spinners are *the* worst offender for reduced motion. A perpetual spinner is exactly the kind of motion the setting exists to suppress. Provide a "Loading..." text label or a progress bar instead. See [[empty-loading-states]].

The second worst: an entrance that starts from `opacity: 0` and only runs under `no-preference`. With reduced motion on, the text never arrives. The reduced state is the *finished* state. taste-skill fails a page whose first screen has two or more text blocks invisible under reduced motion; test it by rendering with the setting on.

## Sources

- WCAG 2.1 — Animation from Interactions.
- Emil Kowalski — prefers-reduced-motion as a first-class concern, not an afterthought.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `c8a7962`, read 2026-11-07): skills/animate/SKILL.md, skills/review-animations/STANDARDS.md (fewer and gentler, not zero); unchanged through `715c180`.
- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/apple-design/SKILL.md §14 (vestibular triggers beyond the media query).
- Emil Kowalski's design-engineering practice, distilled by AgentsORG (disable all, opacity included).
- Leonxlnx, taste-skill v2.1.1 (MIT, HEAD a9c73c3): `skills/taste-skill/scripts/lib/rules.mjs` (`reduced-hidden`) and `references/motion.md` §2 (35 of 99 award sites have any reduced-motion rule).
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/kit/reduced-motion.ts`, `stageshow/kit/motion/Follow.tsx`, `stageshow/references/kit.md` (Playback), `stageshow/references/motion.md` (Story, the poster), `stageshow/references/rehearse.md` (Reduced motion).
