---
title: animated-hit-testing
summary: While something animates, a press goes to where it is heading, not where it is drawn — except when the press starts a drag. Pin a dragged element's spring to the pointer, keep the just-released item above the rest until it settles, and select a row in a scroll list on release, not on press.
tags: [motion, interaction, hit-testing, drag, springs, touch, lists]
---

# Animated hit testing

An animated element has two positions: where it is **drawn** this frame, and where its spring is **heading**. Hit-test presses against the destination. A stack of toasts sliding up after one is dismissed is the test. With destinations, three presses 80 ms apart on the same spot near the top dismiss three toasts, the way rapid clicks on one spot close Safari's tabs one after another. Against drawn positions only the first lands: the second and third hit the gap a toast is still sliding up to fill.

```js
// a press: test the stable target, not the moving picture
const hit = items.findIndex(item => contains(item.destRect, pointer))
// the start of a drag: test what the user sees under the finger
const grabbed = items.findIndex(item => contains(item.drawnRect, pointer))
```

The pointer and the rectangles must share one coordinate space. Inside a scroll view, convert the pointer first: `pointerYLocal = pointerY + scrollTop`.

## Drag and release

- **Pin the spring during the drag.** Set both position and destination to the pointer each move (`x.pos = x.dest = dragX`), so the element sits under the finger with no springy lag. On release, the layout sets a new destination and the spring takes it there, carrying the release velocity ([[gesture-momentum]]).
- **Three depth bands.** The dragged item sits on top, the just-released item stays above the rest while it animates back, and everything else keeps its stable order underneath. Dropping the released item back into normal order on `pointerup` makes it slide *under* its neighbours on the way home. Clear the "last dragged" mark once its position and scale have settled ([[z-index-strategy]]).
- `user-select: none` on the draggable, so a drag never starts a text selection.
- **Drop targets never travel.** The slot shows in the cell under the pointer and jumps to the next cell, hidden over the card's own cell; a slot that chases the card gives every press a moving target. Keep the grab offset where the hand took hold, never re-centred.

## Select on release in a scroll list

In a list the user scrolls by touch, a press can't select a row: the press that starts a scroll ends in `pointercancel`, and a selection on press would fire on every scroll. Select the row under the **release**, and only when the press also started on the list. A release is never the start of a scroll. Read `scrollTop` at the top of the frame so the row under the release matches what is drawn.

## When to apply

Toasts, tab strips, reorderable lists, stacked cards, anything a user can press twice before its animation ends ([[sonner-principles]], [[responsive-feedback]]). A press that starts a drag still grabs the drawn position.

## Reference

A reorderable row, carried and released, in CSS:

- Bad: the row keeps `transition: transform 0.32s` while carried, so it trails the pointer and the next press hits where it was a frame ago.
- Good: carried, the lifted slot has `transition: none` and sits at `z-index: 2`; only the row inside eases `scale: 1.02` and the lift shadow over `0.25s`. Released, `transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)` takes it home.
- Interrupted: a second choice 200ms into a 600ms highlight move continues from where the highlight is drawn, never from its start.

Gold example: `stageshow/examples/freeform-drag/` (`drag.css`, the carried vs lifted card) and `stageshow/examples/reorder/`; the interrupt pair in `stageshow/teaching/contrasts.tsx`.

Check: film the drop and step it at 40 to 80ms. On every frame from release to settle the released row is drawn above its neighbours, and a press fired 80ms after release lands on the row's destination, not on the gap it is leaving.

## Gotcha

Two destinations can overlap, for example while items swap places, and then a press can hit both. Pick one deliberately (the topmost destination, or the one whose drawn rectangle also contains the pointer), or the result depends on array order. A press 80 ms after a dismissal can also act on a different element than the one drawn under it. That is the point of the rule, but it surprises anyone testing with screenshots.

## Sources

- Cheng Lou, chenguini (MIT, HEAD 84fb27d): `docs/ui.md` "Hit Testing", `docs/Input.md` "Pinning Springs During Drag", "Z-Index During Drag & Release", "CSS for Drag".
- Cheng Lou, handwired (MIT, HEAD 257856e): `docs/behavior-choices.md` "Hit-test destinations instead of drawn positions" (the three-press toast measurement) and "Scroll a list natively, and select a row at the release".
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `examples/freeform-drag/drag.css`, `examples/reorder/reorder.css`, `references/motion.md` (Drags and selection), `teaching/contrasts.tsx` (interrupt).
- Related: [[spring-animations]], [[gesture-momentum]], [[touch-and-focus]], [[frame-rate-independence]].
