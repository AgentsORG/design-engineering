---
title: animation-removal-hazards
summary: Deleting an animation is not find-and-replace. Remove its start state, the code that waits for it, and the orphans it leaves; reduce before you delete, and keep motion that bridges a jarring change.
tags: [motion, removal, restraint, cleanup]
---

# Animation removal hazards

When an interface feels slow or over-animated, the fix is subtraction: every animation must defend itself against [[animation-decision-framework]], and the ones that can't get deleted or reduced. But motion is load-bearing in ways that don't show in the diff. Pull it out carelessly and elements stay invisible, unmounts stall, and layout jumps reappear. Check every removal against the hazards below before you edit.

## Hazards

- **Hidden start states.** `initial={{ opacity: 0 }}`, a keyframe with `fill-mode: forwards` starting from `opacity: 0`, or a reveal class waiting on an `IntersectionObserver`. Delete the animation and keep the start state, and the element never appears. Remove both together.
- **Code that waits.** `onAnimationEnd`, `transitionend`, and `setTimeout` calls sized to a duration keep pausing the UI for motion that no longer exists. Delete the wait with the animation.
- **Exit-delayed unmounts.** `AnimatePresence` holds a component in the DOM until its exit finishes, then fires `onExitComplete`. With no exit, unmount is immediate, so move that callback's work to the moment the component closes.
- **Layout animations masking a jump.** A `layout` prop or FLIP animation may be hiding a layout shift. If removing it exposes the jump, keep it and report the shift as its own finding.
- **Focus moved after motion.** Focus set in an animation callback must move immediately once the animation is gone.
- **Tests.** Selectors or waits keyed to animation classes or durations need the same removal.

## Reduce before delete

| Today | Reduced to |
|---|---|
| Hover with scale, lift or shadow growth | Color or opacity only, ≤150ms, `ease` |
| Slide or scale entrance on a frequent surface | Opacity only, 150ms, ease-out |
| UI animation over 300ms | 200–250ms on the same curve |
| Stagger over 80ms per item or 300ms in total | 30ms per item, or fade the group as one |
| Infinite pulse, shimmer or glow on a persistent element | Play once, keep the static end state |

If the reduced version no longer carries its purpose, delete it instead.

## Cleanup

Delete what the removals orphaned: unreferenced `@keyframes` and animation utilities, `motion.div` back to `div` where no motion props remain, empty `AnimatePresence` wrappers, unused variants and imports, zero-reference entries in the Tailwind config or token files. Grep every removed name afterwards. If the motion library is no longer imported anywhere, propose dropping the dependency; don't uninstall it yourself ([[dependency-discipline]]).

## When to apply

"The app feels slow", "too much animation", "tone down the motion", or `/design-engineering motion remove` ([[cmd-motion]]). Prime targets: keyboard-triggered menus, in-app route and tab transitions, fade-in-on-scroll on every section, hover lift on non-primary cards, charts that redraw from zero on every mount, numbers that count up on load, spinners and shimmer on loads under 300ms ([[empty-loading-states]]).

## Gotcha

Deleting everything is also wrong. A toast that would otherwise teleport in, or a panel that shows where it came from, earns its motion; removing it trades slowness for disorientation. Every removal report lists the animations deliberately kept and the purpose that saved each one — that list is what separates a restraint pass from deleting every `transition` in the repo.

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, a81dbca): skills/remove-animations/SKILL.md.
- Related: [[animation-decision-framework]], [[delight-impact-curve]], [[marketing-vs-product-ui]].
