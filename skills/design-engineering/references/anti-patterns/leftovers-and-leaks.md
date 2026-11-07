---
title: leftovers-and-leaks
summary: What the build process leaves behind and the visitor sees — dev panels mounted for everyone, scaffolding routes indexed, debug logs of a session, secrets behind a public prefix, TODOs on the payment path. Gate what you can't prove is dead; report names, never values.
tags: [anti-patterns, production, security, leftovers, debug]
---

# Leftovers and leaks

Nothing here shows up as a bug. The app works; it just ships an animation inspector to every visitor, indexes `/lab`, and logs the session to the console. That is why this lane finds more blockers per minute than any other in a [[ship-check]]. The rule underneath: **find everything, gate what you can't prove is dead, delete only what is provably dead**. [[code-tells]] covers the stylistic residue in a diff; this node covers what leaks to users.

## Dev tools in production — blocker

Hunt for inspectors, control panels (Leva, Tweakpane, dat.gui), query devtools, render profilers, mobile consoles, grid overlays and feature-flag panels, then find each mount. Gate it on the development build and load it with a dynamic import: a gated render of a statically imported package still ships its bytes. A hidden control panel still feeds its defaults into the UI, so check that shipped defaults are the approved ones. Values dialed in on a panel ([[build-a-tool]], [[vibe-to-generator]]) live in a saved config file production imports, never in a panel default.

## Scaffolding routes — blocker

`/proto`, `/lab`, `/test`, `/playground`, `/sandbox`, `/debug`, `/styleguide`, preview routes added to dodge auth. They get indexed, often skip auth, and show unfinished work. Return not-found in production builds and add them to the robots disallow list as a second layer, never as the only one. Picker harnesses ([[prototype-picker]]) are throwaway and the user usually wants them gone; tools are kept on purpose. Deleting either is the user's call.

## Debug output — blocker when it prints user data

`console.log`, `console.table`, `debugger`, `alert(`, `JSON.stringify` rendered into a `<pre>`. Vet each one: `console.error` in an error boundary or a real `catch` is logging, keep it. A log of a user, session, or auth or payment response is a leak; remove it and say so. Route anything worth keeping through the project's logger.

## Secrets and dev URLs — blocker

A client bundle is public. Hunt for public-prefixed env names (`NEXT_PUBLIC_`, `VITE_`, `PUBLIC_`) containing SECRET, PRIVATE, SERVICE_ROLE or a non-public KEY; literals shaped like keys (`sk_live_`, `sk_test_`, `eyJ`); `localhost`, `127.0.0.1`, tunnel and staging hosts in source; env files tracked by git. Report the file and the variable **name**, never the value, and put "rotate this now" above the verdict, because rotation is urgent and only the user can do it.

## Stale markers — should fix

Commented-out blocks get deleted; version control remembers them. A TODO is read, not deleted: one that names unfinished work on an auth, payment, permission or deletion path ("check ownership here") is probably the most important finding in the lane, so quote it verbatim. Also hunt `.only(` and `.skip(` in tests and fresh `@ts-ignore` or `as any`.

## Reference

The dev panel, before and after the gate:

```tsx
// Bad: static import, hidden in production, still shipped and still feeding its defaults
import { Leva } from 'leva'
<Leva hidden={import.meta.env.PROD} />

// Good: dev-only dynamic import; production reads the saved values
import tuning from './tuning.json'
const DevPanel = import.meta.env.DEV ? lazy(() => import('./DevPanel')) : () => null
```

A secret in the write-up reads: "`.env.local` is tracked by git and holds `NEXT_PUBLIC_STRIPE_SECRET_KEY` (value withheld). Rotate this now."
Gold example: for the write-up, the hand-over template in Stageshow `references/verify.md` (Hand over), which ends on `Unresolved:` and `Not checked:` so the reader knows what nobody looked at.
Check: build for production and search the built output, not the source, for the panel's package name, `/lab` and `sk_live_`; then request `/lab` on that build and expect a 404. Clearing a finding by hiding the thing it points at is a bug, the same rule Stageshow's gate holds (`references/rehearse.md`, Lines that are never intentional).

## Gotcha

`<Panel hidden>` and a robots disallow line both look like fixes and neither is one. The first still drives values and ships bytes; the second is a polite request that leaves the route reachable by anyone with the URL.

## Sources

- Emil Kowalski's design-engineering practice, distilled by AgentsORG.
- Benji Taylor, Stageshow 1.1.1 (MIT, github.com/benjitaylor/skills, HEAD `299140f`, read 2026-11-07): `stageshow/references/verify.md` (Hand over), `stageshow/references/rehearse.md` (Lines that are never intentional).
- Related: [[content-authenticity]], [[share-and-crawl-metadata]], [[production-baseline]].
