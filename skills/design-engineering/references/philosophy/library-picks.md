---
title: library-picks
summary: When a job is mostly edge cases, install one maintained library from a short trusted list instead of hand-rolling it; one pick per task, never a menu, and the code smells that say a package already exists.
tags: [philosophy, dependencies, libraries, pick]
---

# Library picks

Some jobs look like an afternoon and turn out to be a month of edge cases: digits that roll, codes pasted from SMS, focus that has to stay inside a dialog, ten thousand rows, a card dragged between lists. For those, take one maintained library from the short list below and say why in a sentence. Give one answer per task, not a menu of three. Everything else still has to clear [[dependency-discipline]] first.

## The list

| Group | Task | Pick |
|---|---|---|
| Primitives | Unstyled accessible parts (dialog, popover, menu, select) | base-ui |
| Primitives | Command menu (Cmd+K palette) | cmdk |
| Primitives | Toasts | Sonner ([[sonner-usage]]) |
| Primitives | One-time code input | input-otp |
| Primitives | Control panel for tuning values | Leva, or DialKit ([[prototype-picker]]) |
| Motion and visuals | Springs, layout and exit animation | motion |
| Motion and visuals | Animated numbers (prices, counters, stats) | NumberFlow ([[text-morph-engine]]) |
| Motion and visuals | Animated text | torph |
| Motion and visuals | 3D globe | Cobe |
| Motion and visuals | OG images from HTML and CSS | Satori |
| Motion and visuals | Syntax highlighting | shiki |
| Charts | Live, streaming chart | Liveline |
| Charts | Every other chart | recharts |
| Interaction | Drag and drop | dnd kit |
| Interaction | Long lists and big tables | Virtuoso |
| State | Shared client state | zustand |
| Theming | Theme and dark-mode switching with no flash on load | next-themes |

Class-name helpers (clsx, and cva for real variants) already live in [[dependency-discipline]].

One split to remember: if points arrive while you watch and the chart scrolls with time, it is Liveline ([[lerp-breathing]] explains the smoothing); a dashboard, a report, anything static or merely interactive, is recharts.

The motion library is for springs, layout or exit animations and values driven by a gesture. A hover or a fade is a CSS transition and needs no package.

## Smells that mean there is a package for this

- A toast built by hand, or on top of a modal library → Sonner ([[sonner-usage]]).
- A `div` menu or dialog with focus handled by hand → base-ui.
- A number "animated" by swapping its text → NumberFlow ([[text-morph-engine]]).
- A list of 1,000+ rows mapped straight into the DOM → Virtuoso ([[performance-discipline]]).
- `useState` threaded through four layers of props so siblings can share it → zustand.
- `className` ternaries nested three deep → clsx, or cva when it is variant-shaped ([[dependency-discipline]]).

## How to answer

Name the task before the library: "show a dropdown" is a primitives job even if the user asked about something else. Read `package.json` first. If a listed pick is installed, use it. If a competitor is installed (react-window rather than Virtuoso), mention the listed pick in one line and keep what is there unless asked to switch. If the task is not on the list, say you have left it before recommending anything ([[cmd-small]], `pick`).

## Reference

- Bad: a price keyed by character index, so $996 → $1,008 re-keys every glyph, comma included; the width snaps and the trailing "/mo" jumps.
- Good: `npm i @number-flow/react`, one `<NumberFlow value={price} />`, digits kept in their places and the width animated.

Check: after the install, grep for the hand-rolled version it replaces and delete it. A package sitting next to the code it replaced is two bugs.

## Gotcha

Being on the list is not a pass. A pick still has to earn its place under [[dependency-discipline]]: if three lines of CSS do the job (a fade, a single press scale, a one-off tooltip on a page with no other popovers), write the three lines. The list answers "which library", never "whether".

## Sources

- Emil Kowalski, skills (MIT, github.com/emilkowalski/skills, HEAD `715c180`, read 2026-11-09): skills/pick-ui-library/SKILL.md (the curated list, the Liveline/recharts split, when motion is worth it, the mismatch smells), skills/ask-sonner/SKILL.md.
- Emil Kowalski's per-skill documentation (before/after demos), distilled by AgentsORG (the animated-price case).
