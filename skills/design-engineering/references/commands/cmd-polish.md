---
title: cmd-polish
summary: "/design-engineering polish [target]" — the screen works but feels unfinished: check the phase, then run the polish pass (optical corrections, states, hairlines, cursors, focus) and apply the fixes.
tags: [command, polish, build]
---

# /design-engineering polish

**Posture: build.** Edit the code, then show what changed.

## Steps

1. **Check the phase first.** If the layout or hierarchy is still wrong, polishing it is wasted work. Say so and run [[feeling-right]] first ([[skill-router]] §2).
2. Read [[ui-polish-pass]], [[states-are-the-work]], [[gotchas]] and [[pov]], plus the project's contract if one exists ([[using-design-file]]).
3. Walk the pass in order. Fix states before decoration: hover, focus, active, disabled, empty, loading and error ([[empty-loading-states]], [[touch-and-focus]]). Then the optical details: [[border-radius]] nesting, [[shadows-whisper]], [[line-behavior]], [[visual-imperfection]].
4. Make the edits with the contract's tokens, never new literals.

## Output

The edits, followed by a short [[review-format]] table of the changes that matter most (at most five rows).

## Hand-offs

Motion feels off → [[cmd-motion]]. Mobile feels like a website → [[cmd-mobile]]. Accessibility gaps → [[cmd-a11y]]. Launch week, the whole app → [[cmd-ship]]. Worst-case data breaks the layout → [[cmd-break]].
