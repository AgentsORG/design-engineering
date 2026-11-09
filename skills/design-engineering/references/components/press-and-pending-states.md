---
title: press-and-pending-states
summary: A press paints the part being manipulated, only while held, and release restores the exact resting pixels. Disabled never answers a press, a persistent selection outranks the pressed overlay, pending work keeps the control's size and purpose with aria-busy, and no interaction state moves a surface to another elevation. On touch, a press that slides across an action group acts on the action it lifts on. From Meta's Astryx.
tags: [components, states, press, loading, touch, buttons, astryx]
---

# Press and pending states

Press feedback answers one question: *is the thing under my finger responding?* Astryx (Meta's open-source design system, 150+ components) pins that down per component instead of leaving it to each author, and the result is a short set of rules that most hand-built controls break. They sit under [[responsive-feedback]], which owns the *motion* of a press (scale, timing); this node owns *which surface paints and when*.

## Where the press paints

Paint one pressed-overlay token (Astryx: `--color-overlay-pressed`) over the existing fill of the **part the hand is moving**, not the whole row:

| Control | Paints | Never paints |
|---|---|---|
| Checkbox, radio | the indicator | the label row |
| Switch | track and thumb together | — |
| Slider | only the thumb being dragged, even when the drag began on the track | the track |
| Tab, link, collapsible trigger | its own surface | siblings |
| Segmented control | an unselected item | the selected item, which keeps its raised surface |

The overlay is transient: it clears on release or cancel, and the control returns to the **same** pixels it would have had without the press. A press is never a state that persists.

## The rules around it

- **Disabled means no response.** A disabled control gains no pressed paint and does nothing on release. Keeping it focusable (to explain why it is unavailable) does not make it operable.
- **Persistent selection wins.** Pressing what is already selected leaves its selected treatment untouched.
- **Pending keeps purpose and geometry.** While an action runs, set `aria-busy`, keep width and height fixed and show a spinner inside; the accessible name does not change. Pending styling and disabled styling stay visibly different ([[empty-loading-states]]).
- **Elevation belongs to the painted surface.** A standalone button owns its resting shadow; a connected group that paints one surface owns one shadow and its members none; a layout wrapper that paints nothing never gains a shadow because it holds buttons. Hover, press, focus, loading and disabled change the paint, **never the elevation tier** ([[depth-and-nesting]]).

## Slide to choose (touch action groups)

Under a touch presentation, a press in a toolbar, segmented control or menu that slides across siblings acts on the action **it lifts on**, through that action's own activation; at most one action fires per gesture. While held, the highlight follows the finger, one action at a time, and nothing is highlighted over a disabled action, a gap or outside the group. Lifting outside the group, a second finger, lost focus or a cancelled pointer acts on nothing. A mouse keeps the platform rule (press and release on the same target).

## Gotcha

Darkening the whole list row while its checkbox is pressed reads as "the row is selected." Paint the indicator, and let [[hover-states-subtle]] own the row.

## Sources

- Meta, Astryx (MIT, github.com/meta/astryx, HEAD `9f55320`, read 2026-11-09): `docs/design/user-states.md` (current), `docs/families/buttons.md` FR3, FR4, FR8, FR9, FR12 and `docs/families/action-groups.md` FR1–FR3 (current). Paraphrased.
- Related: [[touch-and-focus]], [[astryx-reconciliation]].
