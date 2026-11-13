---
title: shadcn-reconciliation
summary: shadcn/ui as a companion — its skill, CLI and MCP server own which component to add, its base (Base UI, Radix or React Aria), its props and its registry; this graph owns the contract precedence, the craft review and pov. Its five principles, the token pairs, the rules worth enforcing anywhere, registry safety, and six conflicts settled (loading buttons, className, z-index, space-* versus gap, dark overrides, AI Elements' new home).
tags: [meta, companion, shadcn, registry, tokens, reconciliation]
---

# shadcn/ui, reconciled

shadcn/ui is not a component library but a way to build one: the top layer of component code is copied into the project and becomes the project's own, over headless bases that still take upstream fixes. Its five principles are open code, composition (one interface across components), distribution (a flat-file registry schema plus a CLI), beautiful defaults, and AI-ready (open code a model can read and improve). Since October 2026 it also hosts **AI Elements**, the agent-interface patterns distilled into [[streaming-chat-scroll]] and [[agent-trace-states]].

## Who owns what when it is installed

A project is a shadcn project when it has a `components.json`. The companion is the `shadcn` skill (`npx skills add shadcn/ui`), which loads `npx shadcn@latest info --json` into context.

| Job | Owner | This graph keeps |
|---|---|---|
| What the project uses | `shadcn info --json`: framework, Tailwind version, aliases, **base**, icon library, installed components | — |
| A component's API | `shadcn docs <component>`; respect the base: `render` on Base UI (the default since July 2026), `asChild` on Radix | [[component-api-design]] for the app's own wrappers |
| Finding and adding parts | `search`, `view` before `add`, `add --dry-run` / `--diff`; the MCP server (`shadcn mcp init --client claude`) for the same in-agent | Search first: compose existing parts before writing custom UI |
| Themes and presets | `apply <preset>` (`--only theme` or `font`), `preset decode`; never decode a preset code by hand | The `.design` contract outranks `css_vars` ([[skill-router]]) |
| A registry of the app's own | `registry.json` + `registry-item.json` (`registry:ui`, `block`, `page`, `theme`, `base`, `font` …), `shadcn build`, `registry validate` | — |

## Tokens

Tokens are surface / foreground pairs: `background` with `foreground`, `primary` with `primary-foreground`, and `card`, `popover`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `chart-1…5`, `sidebar-*`, `radius`. Values are OKLCH in `:root` and `.dark`, mapped into Tailwind v4 with `@theme inline`; a new role (say `warning` / `warning-foreground`) is added in all three places. The radius scale derives from one `--radius` (sm ×0.6 up to 4xl ×2.6), which keeps nested corners related ([[depth-and-nesting]]).

## Rules worth enforcing in any shadcn app

Semantic token classes only (`bg-primary`, `text-muted-foreground`), never raw palette colours and never hand-written `dark:` overrides. `className` is for layout, not for re-colouring a component. Forms are `Field` groups with `data-invalid` on the field and `aria-invalid` on the control; two to seven options are a toggle group. Every dialog, sheet and drawer has a title (visually hidden if need be); every avatar has a fallback. Use the `Alert`, `Empty`, `Skeleton`, `Badge` and `Separator` parts instead of hand-styled divs; an icon in a button takes `data-icon="inline-start"` or `"inline-end"`, not size classes.

## Registry safety

A third-party registry runs code in the project. `view` an item before `add`; pin a GitHub registry dependency to a tag or SHA (`owner/repo/item#v1.2.0`); keep tokens for private registries in env vars (`${REGISTRY_TOKEN}`), never in `components.json`.

## Conflicts, settled

| Topic | shadcn | This graph | Settled |
|---|---|---|---|
| Loading button | no `isLoading`; a `Spinner` plus `disabled` | pending keeps geometry and stays distinct from disabled ([[press-and-pending-states]]) | Spinner inside, `aria-busy`, fixed width; `disabled` only if a second submit must be blocked, and then still styled as pending |
| Overlay stacking | no manual z-index on overlays | [[z-index-strategy]] | Agreed: the component's portal layer owns it |
| Spacing utilities | `gap-*`, not `space-*`; `size-*` when width equals height | [[grouping-by-space]] | Agreed |
| Dark mode | the same tokens overridden under `.dark` | [[dark-mode]]: modes are designed | Both: override the tokens, and design the dark values rather than inverting |
| Copied code drifting from upstream | the code is yours | [[dependency-discipline]] | Keep the copied layer thin; `add --diff` before re-adding |
| AI chat parts | AI Elements in shadcn (`npx shadcn@latest add trace code-block`, then copy the pattern) | — | Use the shadcn patterns; the older `npx ai-elements` / elements.ai-sdk.dev install is deprecated (end of November 2026) |

Astryx ships its components to shadcn users as registry items that install compositions and CSS imports, never component source ([[astryx-reconciliation]]). UI SDK is a different layer: a behavior dependency with no registry and no copied code ([[ui-sdk-reconciliation]]).

## Sources

- shadcn/ui (MIT, github.com/shadcn-ui/ui, HEAD `8ab2771`, CLI `shadcn@4.23.0`, read 2026-11-09; ui.shadcn.com): `apps/v4/content/docs/(root)/{index,cli,theming,mcp}.mdx`, `registry/*.mdx`, `apps/v4/public/schema.json`, `skills/shadcn/SKILL.md` and `rules/{styling,forms,composition,icons,chat}.md`, `changelog/2026-*`. Paraphrased.
- AgentsORG — the ownership split and settlements.
