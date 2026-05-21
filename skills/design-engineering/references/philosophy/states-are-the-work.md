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

## The 90/10 rule

90% of "this product feels broken" reports trace to an unhandled state. Not a bug in the happy path — a state nobody designed for.

Fixing states is the single highest-leverage post-launch design work.

## When to apply

- During design reviews: ask "what about loading? empty? error?" for every screen.
- During code reviews: grep for `useState`, `useQuery`, `useFetch` — every one of these has at least a loading and error state. Are they both handled?
- During QA: deliberately set network to offline, deliberately log out mid-session, deliberately exhaust quota. Most apps fail this within 60 seconds.

## Gotcha

Don't conflate "empty" with "error." An empty inbox and a broken inbox should look different and read differently. Generic "No data" messages collapse the two and frustrate users who can't tell which.

## Sources

- guidelines.sh — "States are the real design work."
- Brad Frost — "Loading state best practices."
- Related: [[empty-loading-states]], [[marketing-vs-product-ui]] — the "design for the 100th session" framing is covered in `marketing-vs-product-ui`.
