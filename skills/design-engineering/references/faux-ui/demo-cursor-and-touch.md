---
title: demo-cursor-and-touch
summary: Driving a product demo like a hand — cursor kinds set by the elements it crosses, travel timed by distance on a shallow arc, a visible press, never over the label it clicks, rests on empty surface; drags as one motion with a fixed grab offset; selections that stay under the I-beam; one camera push-in; phones driven by touch with flicks and UIKit-quick responses.
tags: [faux-ui, cursor, drag, touch, phone, camera, demo]
---

# Demo cursor and touch

A cursor in a demo is a character: it moves like a hand, presses visibly, and every move goes somewhere for a reason. No cursor is also a choice — the states and timing carry a system story, and nothing walks a focus ring or spotlight between controls as a stand-in.

## The pointer

- **Travel is timed by distance on a shallow arc:** `clamp(260 + 0.9 × distance, 300, 650)` ms on an ease-in-out, bowing sideways by `min(0.08 × distance, 24)` px. Short hops are quick; long trips don't drag.
- **A press reads:** a 120ms dwell on arrival, the pointer dips to 0.9 over 80ms, holds 100ms, and releases over 260ms on `(0.22, 1, 0.36, 1)`. The pressed control shows its own product press ([[responsive-feedback]]), and the state changes after the click completes.
- **The kind comes from the element** (I-beam over text, hand on a link, open hand over something draggable, crosshair on a canvas, resize arrows on edges and corners), switching mid-path as it crosses the edge, never after arriving, and morphing between shapes rather than popping. Native app buttons keep the arrow.
- **It never covers the words it clicks:** aim inside the target, off its text (about 85% across, 60% down). It rests on empty surface near its next move, never on an unused control, and fades after about 4 s at rest.
- **It stays where the press happened** while the result changes size.
- **A state the click sets fades in, quickly:** a picked tool, a selected row, an active filter eases its fill in over about 150ms and back out the same, never on in one frame. A choice that moves between options is a segmented control or tabs whose highlight slides.
- **One cursor style per site,** so every demo on a page points the same way. On a dark stage the I-beam turns white with a dark edge.
- **Keyboard stories show the keys** as keycaps, placed clear of anything open.

## Drags and selection

- **A mouse drag is one motion:** the thing follows the pointer the whole way and leaves on release. Drag time `clamp(360 + 1.1 × distance, 450, 900)` ms.
- **Pickup belongs to the press**; a drag starts where the thing is, and the grab offset is where the hand took hold, kept through travel and release. A file from outside enters already held.
- **A carried card is held, not slid:** scale 1.03, a deeper shadow, a degree or two of tilt with its words tilting too, flat on drop, no selection outline in the air.
- **Drop targets never travel:** the slot jumps cell to cell instead of chasing the card. Moving a card between lists closes the source slot on lift and opens the destination in flight.
- **A text selection reads left to right from a word boundary and stays under the I-beam on every frame**, driven from the pointer's position, not grown by time.

## Scroll and camera

- **Nothing scrolls unless the pointer is on it.** Start with whole rows; fade only the edges hiding content once scrolled. Scroll time `clamp(420 + 1.2 × distance, 500, 1400)` ms, and scroll back before the loop ends, never at the seam.
- **The camera needs a reason:** push in only when the payoff would be too small to read at shown size. Frame the wide shot as a good still first; one push-in per story, in and back out, the cursor still while the view moves.

## Phones

- **Touch, never the macOS arrow:** a dot only where the finger taps or drags. It shows 140ms before a tap and lingers 240ms after the lift.
- **In-app responses are UIKit-quick:** `cubic-bezier(0.3, 0.75, 0.1, 1)` over 0.5 s; a card opens into its screen as one object.
- **A swipe is a flick:** a third of the screen in about a quarter second (`clamp(180 + 0.5 × distance, 240, 300)` ms), lifting while still moving; what it threw carries on at that speed, thrown over 0.5 s on `(0.25, 1, 0.5, 1)`. A swiped row's action is its own back, edge to edge, revealed as the row slides off it.
- **Act where people do:** a notification is tapped to open its app; the reply happens in the app, not through long-press actions few people use.
- **Dynamic Island:** animate the black shape's box and radius together, content on its own layer; about 500ms growth, 380ms shrink after a 120ms delay, a 0.965 press squeeze.

## Typing

Stageshow types at 35ms a character (about 28 a second), which suits a short string the viewer only needs to recognise. A prompt that carries the argument types at read speed, about 15 a second ([[launch-video-ui-demo]]).

## When to apply

Any faux UI with a pointer, a drag, a selection, a scroll, a camera move or a phone gesture.

## Reference

The same click, aimed two ways (the script in Stageshow's `examples/buttons`):

| Before | After |
|---|---|
| `a.click('resolve')`: the centre of the button, the arrow over "Resolve" | `a.click({ at: 'resolve', x: 0.84, y: 0.7 })`: inside the box, off the word |
| Arrive and swap the label in the same frame, glyph still on it | 120ms dwell, dip to 0.9, release 260ms; then `a.set({ resolve: 'Resolved' })`, and `a.move('rest')` to an empty point before the loop resets |
| A 700px trip in 300ms on a straight line | `clamp(260 + 0.9 × 700, 300, 650)` = 650ms, bowed 24px |

Gold example: `stageshow/examples/buttons/index.tsx` (presses beside the word, rests on an empty `rest` target); `stageshow/examples/cursor-morph/` for kinds that change mid-path.
Check: film each press with `--slow 6 --every 40`. In no frame may the cursor cover the label it pressed or is about to change, and every move must end at the next action or at rest.

## Gotcha

A cursor resting on the button it just pressed, or parked on the label it is about to change, hides the one thing the beat is about. Move it off as soon as the press lands.

## Sources

- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/references/motion.md` (the cursor, drags and selection, scrolling and the camera, phones in motion; the click-set state is new in 1.1), `stageshow/kit/act.ts` (move, click, drag and scroll timing; touch dwell), `stageshow/kit/cursor.css` (press scale and release curve), `stageshow/examples/buttons/index.tsx`. Paraphrased; the numbers are from his code, re-verified at `299140f`.
- Related: [[demo-story-and-loops]], [[gesture-momentum]], [[stageshow-reconciliation]].
