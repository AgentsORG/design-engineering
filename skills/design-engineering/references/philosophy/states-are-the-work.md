---
title: states-are-the-work
summary: Loading, empty, error, partial, offline, permission-denied. The real design surface is the states, not the happy path.
tags: [philosophy, states, product]
---

# States are the work

Designers default to designing the happy path — data loaded, user authenticated, content present. Engineers ship the happy path. Then real users hit states the design never considered, and the product looks broken.

The 100th-session truth: most of what a user sees is *not* the happy state. It's a state the designer never opened Figma for.

## The state taxonomy

For every screen, design (or at least sketch) each of these:

- **Loading** — data fetch in progress. See [[empty-loading-states]].
- **Empty** — query returns zero results. No items yet. New account.
- **Partial** — some content loaded, some still loading. Lazy-rendered lists.
- **Error** — API failed. Network down. Permission denied.
- **Offline** — no connection at all. Different from a single failed call.
- **Permission-denied** — authenticated but unauthorised. Hide vs. show-locked.
- **Stale** — content cached, last refreshed N minutes ago. Show the staleness.
- **Over-quota** — user hit a limit. Free tier exceeded. Read-only mode.
- **Maintenance** — feature temporarily disabled. Read-only, banner explaining.
- **Onboarding** — first-run experience, sample data, guided tour.
- **Power-user** — bulk selection mode, keyboard nav active.
- **Sync conflict** — local and remote disagree. Which wins, how does user choose.

## What "design the states" means concretely

- Each state has its own Figma frame.
- Each state has copy written for it (real copy, not "Error: something went wrong").
- The state-to-state transitions are designed: how do you go from loading → empty without flash? From error → retry-success without confusion?
- Power-user features (keyboard shortcuts, bulk select) are first-class, not bolt-ons. If you accumulate enough lessons here, split out a dedicated `power-user-paths.md` node.
- Each state reserves its room before it arrives. An error has a lane under the field that caused it from the first frame and leaves the moment the value is fixed; a reset (refresh, retry) has a cause the user can see.

## The 90/10 rule

90% of "this product feels broken" reports trace to an unhandled state. Not a bug in the happy path — a state nobody designed for.

Fixing states is the single highest-leverage post-launch design work.

## When to apply

- During design reviews: ask "what about loading? empty? error?" for every screen.
- During code reviews: grep for `useState`, `useQuery`, `useFetch` — every one of these has at least a loading and error state. Are they both handled?
- During QA: deliberately set network to offline, deliberately log out mid-session, deliberately exhaust quota. Most apps fail this within 60 seconds.

## Reference

Design the swap between states, not just the frames. Benji Taylor's sign-up and orders examples get both right:

- Bad: an error `<p>` mounts under the email field on blur, the form grows a line and the submit button jumps down.
- Good: the message lane exists from frame one; hint and error crossfade in it (out 0.15s, in 0.25s ease-out after 0.07s, the slot holding the larger), so nothing below moves.
- Bad: a skeleton over the whole page, title, tabs and column heads included.
- Good: chrome, title and column heads are real from frame one; only the data loads, each bar at its words' x-height and width, rows resolving whole, top to bottom, 70ms apart.
- Busy and done change on the button itself ("Creating account" to "Account created" in one place), never in a new element beside it.

Gold example: `stageshow/examples/form-error/` (error, valid, sending, done in one form) and `stageshow/examples/loading/` (skeleton to content, refresh as the caused reset).

Check: film the screen through each state in the taxonomy at the shown width and at 390, then step each transition frame by frame (`--every 40` to `--every 50`). Any frame with a layout jump, an empty control or two labels at once is an undesigned transition.

## Gotcha

Don't conflate "empty" with "error." An empty inbox and a broken inbox should look different and read differently. Generic "No data" messages collapse the two and frustrate users who can't tell which.

## Sources

- guidelines.sh — "States are the real design work."
- Brad Frost — "Loading state best practices."
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/examples/form-error/index.tsx`, `stageshow/examples/loading/index.tsx`, `stageshow/kit/motion/States.css`, `stageshow/SKILL.md` (step 7, filming at 390), `stageshow/references/rehearse.md` (frame-by-frame sampling).
- Related: [[empty-loading-states]], [[marketing-vs-product-ui]] — the "design for the 100th session" framing is covered in `marketing-vs-product-ui`.
