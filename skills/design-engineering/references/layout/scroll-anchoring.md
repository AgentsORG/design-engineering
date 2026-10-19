---
title: scroll-anchoring
summary: When content above the view changes height, keep the row the reader is looking at where it is on screen. Pick an anchor when the user scrolls, keep its screen offset until they scroll again, compare scroll positions by value (never by "a scroll event fired"), and store the scrollTop the browser read back.
tags: [layout, scrolling, virtualization, lists, chat, resize]
---

# Scroll anchoring

Rows above the view grow, an image loads, older messages prepend, the window narrows and every row reflows — and the paragraph the reader was on jumps away. The fix is to anchor the view to a row, not to a pixel offset: the row at the top of the view keeps its position on screen through any change above it. A view that was showing the end of a list, a chat log for example, keeps showing the end after an append.

## The pattern

1. **Read `scrollTop` once** at the start of the frame.
2. **Compare it with the value stored last frame.** If it differs, the user scrolled: pick a new anchor (the first row whose bottom is below `scrollTop`) and record its screen offset, its top minus `scrollTop`. If it matches, data or size changed: keep the old anchor.
3. **Lay out, then restore the offset.** When the anchor row's top moved, `scrollTop = anchorTop − anchorOffset`. If it didn't move, leave the scroll alone.
4. **Write the DOM first, scroll last**, with `behavior: 'instant'`. Write a spacer's new height *before* the new scroll position, or the browser clamps the scroll to the old height.
5. **Read `scrollTop` back and store that**, not the value you asked for. Ask for 10.6 and the browser may hold 10 or 10.5; storing 10.6 makes the next frame think the user scrolled.

## The traps

- **Don't infer user scrolling from scroll events.** Your own `scrollTo` fires one too. React 18 can batch a scroll handler's flag with an unrelated data update into one render, which skips the adjustment exactly when rows shifted. The comparison by value in step 2 has neither problem.
- **Keep the offset from when the anchor was picked.** Adding a per-frame delta to the rounded `scrollTop` drifts: Cheng Lou measured 3–4 px over a 15-step continuous resize in Safari and headless Chrome.
- **One owner.** If you anchor in code, set `overflow-anchor: none` on the scroller so Chrome's built-in anchoring doesn't move the view a second time. CSS `overflow-anchor` alone is the cheaper option for simple pages, with less control.

## When to apply

Feeds, chat logs, virtualized lists, galleries that reflow on resize, any list where rows above the view change height ([[viewport-custom-design]], [[url-as-state]] for restoring position on back).

## Gotcha

When the row at the top of the view shrinks by more than its part above the fold, it leaves the view and the next row becomes the anchor. That's correct, and it looks like a jump of one row. Anchoring with fractional row tops jitters by a sub-pixel each frame, because the browser rounds `scrollTop`; whole-pixel layouts don't.

## Sources

- Cheng Lou, chenguini (MIT, HEAD 84fb27d): `docs/Scrolling.md` "Scroll Anchoring", "React 18+ Pitfall", "Less Preferred Alternatives" (the 3–4 px drift).
- Cheng Lou, handwired (MIT, HEAD 257856e): `docs/behavior-choices.md` "Anchor the scroll position to the row at the top of the view" (`overflow-anchor: none`; spacer height before scroll position).
- Related: [[sticky-and-scroll-tells]], [[frame-rate-independence]], [[performance-discipline]].
