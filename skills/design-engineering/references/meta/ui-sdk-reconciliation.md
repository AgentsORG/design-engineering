---
title: ui-sdk-reconciliation
summary: Vercel Labs' UI SDK as a companion — in a project with an @ui-sdk/* package, its `ui-sdk` skill and the docs shipped inside the package own which component or behavior to use, the parts, props and tests; this graph owns the look, the contract precedence, the craft review and pov. What it is (a framework-free behavior core, five adapters, 55 unstyled components, an agent bridge), how it differs from shadcn/ui and Astryx, the `--ui-*` tokens, its rules worth enforcing, and seven conflicts settled.
tags: [meta, companion, ui-sdk, vercel, headless, behaviors, agents, reconciliation]
---

# UI SDK, reconciled

UI SDK (Vercel Labs, public beta since 2026-11-12) is the layer under a component library. Keyboard navigation, focus, selection, dismissal, popups, drag and drop and the ARIA they need are written once in `@ui-sdk/core` as **behaviors** (`createRovingFocus`, `createTypeahead`, `createPopup`, more than fifty). A **primitive** (`definePrimitive`) joins state, an api and named parts; an adapter renders it in React, Vue, Svelte, Solid or web components. The same behaviors build 55 ready-made components with identical parts in all five. Nothing ships styled. Its second half is new: every component can be read and operated by an agent through a bridge, which this graph distills in [[agent-ready-interfaces]]. The decisions it makes an author write down before a custom component are in [[component-behavior-spec]].

It is not shadcn/ui: no code is copied into the project and there is no registry or CLI; it is a dependency, like the headless bases shadcn sits on ([[shadcn-reconciliation]]). It is not Astryx: there is no theme, template or design language ([[astryx-reconciliation]]). It decides behavior and leaves every visual decision open, which is the part this graph owns.

## Who owns what when it is installed

A project is a UI SDK project when `package.json` has an `@ui-sdk/*` dependency. The companion is the `ui-sdk` skill (`npx skills add vercel-labs/ui --skill ui-sdk`; the same file ships at `node_modules/@ui-sdk/core/skills/ui-sdk/SKILL.md` and always matches the installed version).

| Job | Owner | This graph keeps |
|---|---|---|
| What exists | `node_modules/@ui-sdk/<framework>/docs/llms.txt`, then only the component pages the task needs; `https://ui-sdk.dev/web.md` for a page with no build step. Prefer the installed copy over the site | — |
| Which component for a job | the skill's job-to-component table; an element with a hand-written `role="listbox"`, `"menu"`, `"dialog"`, `"tablist"`, `"switch"`, `"slider"` or `"tree"` beside an installed package is almost always a bug | [[component-confusables]] for the name, [[library-picks]] when nothing is installed yet |
| A component it does not ship (stepper, kanban, emoji picker) | one primitive on `@ui-sdk/core` behaviors plus one small render file per framework, never markup with roles by hand | [[component-behavior-spec]] before code; [[keyboard-patterns]] as the key-map check |
| Parts, props, state | the component page: Composition for nesting, `render` to change a part's element (never `as`), `defaultValue` or `value` with `onValueChange(value, details)` | [[component-api-design]] for the app's own wrappers |
| How it looks | nothing, or the optional `@ui-sdk/core/web.css` | everything: tokens from the contract, states, motion, [[pov]] |
| Agents operating the page | `createAgent`, `agentTools`, `registerTools` (WebMCP) | [[agent-ready-interfaces]] as the bar; [[destructive-actions]] for what must ask |
| Tests | `@ui-sdk/core/testing` (`mount`, `checkPattern`, `checkServer`, `checkDirection`) and the agent test | contrast and motion in a real browser ([[wcag-thresholds]]) |

## Styling it

Parts carry `data-slot` (`switch` on a root, `switch-thumb` on a part) and state attributes (`data-open`, `data-pressed`, `data-highlighted`, `data-side="top"`); each component page lists its attributes and CSS variables. Style from those, never from generated ids or inline state styles. Read the slot from the rendered DOM first: a submenu's trigger is `menu-trigger`, and a part rendered through `render` can carry the other component's slot.

`web.css` sits wholly in `@layer ui-sdk`, so declare `@layer ui-sdk;` at the top of the global stylesheet (above `@import "tailwindcss"`) and any unlayered rule wins without `!important`. Theme it through its tokens: `--ui-background` / `--ui-foreground`, `--ui-muted` / `--ui-muted-foreground`, `--ui-primary` / `--ui-primary-foreground`, `--ui-border`, `--ui-input`, `--ui-destructive`, `--ui-ring`, `--ui-ring-border`, `--ui-overlay`, `--ui-shadow`, `--ui-radius`, `--ui-spacing`, `--ui-font-size`, `--ui-line-height`, `--ui-font-sans`, `--ui-font-mono` and the `--ui-icon-*` masks. They pair like shadcn's, so a `.design` contract maps onto them the same way. Controls are `calc(var(--ui-spacing) * 8)` tall and it draws chevrons, checks and steppers in `::before` / `::after` unless the part holds an `<svg>`: a text glyph beside the default gives two icons.

Popup content gets `data-starting-style` before it enters and `data-ending-style` while it leaves, and stays mounted until the exit finishes; `data-closed` describes the state but keeps nothing mounted. Popups expose `--anchor-width`, `--available-height` and `--transform-origin`, which is the origin [[never-scale-from-zero]] asks for.

## Conflicts, settled

| Topic | UI SDK | This graph | Settled |
|---|---|---|---|
| Colours | `web.css` writes `light-dark()` and sets `color-scheme: light dark` | [[dark-mode]]: modes are designed; a `.design` contract outranks any kit | Set the `--ui-*` tokens from the contract for both schemes; a light-only product sets `color-scheme: light` on `:root` |
| Selected and highlighted rows | must read alone at 3:1: a fill, a full outline or a weight change, never a one-edge stripe | [[hover-states-subtle]], [[wcag-thresholds]] | Agreed; hover may stay quieter, selection may not |
| Reduced motion | panels and its scroll picker jump to the end; the page's own enter and exit CSS needs its own rule | [[reduced-motion-by-pointer]] | Write the rule: the kit only covers what it animates itself |
| Enter and exit timing | none; it supplies the attributes and waits for the exit | [[duration-table]], [[easing-curves]] | Values come from here, on `data-starting-style` and `data-ending-style` |
| Springs and throws | `@ui-sdk/core/gesture`: `solveSpring` (response in seconds, damping ratio), `createVelocityTracker` (70 ms horizon, stale after 40 ms, capped at 8 px/ms), `projectDistance`, `rubberBand` | [[spring-animations]], [[gesture-momentum]], [[momentum-projection]] | Use its maths in a UI SDK app; the choice of response and damping stays here |
| Pending button | `aria-disabled` rather than `disabled` when the control may hold focus | [[press-and-pending-states]] | Agreed: `disabled` drops focus to the page |
| Comments in app code | almost none, no JSDoc | [[leftovers-and-leaks]] | Agreed |

It is beta (`0.1.0-beta.2` when read) under Vercel's public beta terms: pin the version, expect API changes, and read the installed docs rather than this node for any signature.

## Sources

- Vercel Labs, UI SDK (Apache-2.0, github.com/vercel-labs/ui, HEAD `8ff6bcf`, `@ui-sdk/*` 0.1.0-beta.2, read 2026-11-13; ui-sdk.dev, ui-sdk.dev/docs): `README.md`, `packages/core/skills/ui-sdk/SKILL.md` and `references/{build-interface,create-component,styles,testing}.md`, `apps/docs/content/docs/core/{index,start}.mdx`, `core/kernel/style-a-component.mdx`, `core/behaviors/motion.mdx`, `react/styling-and-animation.mdx`, `core/changelog/introducing-ui-sdk.mdx`; the live `llms.txt` files checked against the repo the same day. Paraphrased; no source text or code copied.
- AgentsORG — the ownership split and settlements.
