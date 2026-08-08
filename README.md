# design-engineering

[![skills.sh](https://skills.sh/b/AgentsORG/design-engineering)](https://skills.sh/AgentsORG/design-engineering)
[![CI](https://github.com/AgentsORG/design-engineering/actions/workflows/lint.yml/badge.svg)](https://github.com/AgentsORG/design-engineering/actions/workflows/lint.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Design engineering for AI agents — the invisible details that make UI feel right. Distills [Emil Kowalski](https://emilkowal.ski) (animation), [Benji Taylor](https://benji.org) (delight + [Agentation](https://www.agentation.com)), [Jakub Antalik](https://transitions.dev) (transitions), [James Frewin](https://guidelines.sh) (guidelines), [Vercel](https://vercel.com/design/guidelines) (web-interface rules), [Ben DC](https://github.com/bendc/frontend-guidelines) (CSS conventions), [Google Labs design.md](https://github.com/google-labs-code/design.md) (design-token format), [lucide-animated](https://lucide-animated.com) (icon animation), [DiceBear](https://www.dicebear.com) (avatars), and [Index](https://index.how) (design vocabulary) into one navigable skill graph.

Not a tutorial. Not a doc site. **A working memory the agent loads** when you're reviewing UI code, picking an easing curve, designing a component, or asking "why does this feel flat?"

## The four primitives

Since v2.0.0 the repo is organized around four primitives, each owned by an open spec, each independently useful:

| Primitive | What it is | Where | Spec |
|---|---|---|---|
| **Knowledge** | The skill graph — 72 atomic, wikilinked nodes in 8 themed clusters | `skills/design-engineering/` | [Agent Skills](https://agentskills.io/specification) |
| **Package** | The portable plugin — one manifest, portable skills, namespaced client extensions | `plugin.json` + `skills/` | [Agent Plugins v1.0.0](https://agent-plugins.org/) |
| **Runtime** | A durable agent that *runs* the knowledge — root agent, six specialist subagents, scored evals | `agent/` + `evals/` | [eve](https://eve.dev/) |
| **Client extensions** | Per-host adapters — subagents, slash commands, host manifests, shadcn registry | `agents/`, `commands/`, `.claude-plugin/`, `.codex-plugin/`, `.cursor-plugin/`, `.plugin/`, `registry.json` + `r/` | per host |

The knowledge is the core; everything else is a delivery mechanism for it. `plugin.json` declares the client extensions under reverse-domain namespaces (`com.anthropic.claude-code`, `com.openai.codex`, `com.cursor.editor`, `dev.vercel.plugins`, `dev.eve.agent`) so any Agent Plugins client can discover what this repo ships and ignore what it doesn't implement.

## Install

The fastest path — one command, any agent:

```bash
npx skills add AgentsORG/design-engineering
```

This uses the [skills.sh](https://skills.sh) CLI to install into your detected agent (Claude Code, Cursor, Windsurf, Codex, Gemini, Cline, Aider, and [18+ others](https://www.skills.sh/agent)). The CLI prompts for scope (project vs. global) and method (symlink vs. copy).

### Plugins CLI (Claude Code + Cursor + Codex)

Install the full plugin bundle — skill graph, six workflow subagents, and slash commands — in one step via [vercel-labs/plugins](https://github.com/vercel-labs/plugins):

```bash
npx plugins add AgentsORG/design-engineering

# Dry run — see skills, agents, and commands before installing
npx plugins discover AgentsORG/design-engineering
```

Restart your agent tools after install. Slash commands (when your host supports them) include `/design-engineering:review-ui`, `/design-engineering:motion-audit`, `/design-engineering:scan-ai-tells`, `/design-engineering:agentation-fix`, `/design-engineering:apply-design-md`, and `/design-engineering:fork-pov`.

### Per-agent install

The repo ships host manifests so you can install via each agent's native plugin system:

**Claude Code** — `.claude-plugin/marketplace.json` + `.claude-plugin/plugin.json`; skills under `skills/` auto-discover.

```bash
/plugin marketplace add AgentsORG/design-engineering
/plugin install design-engineering
```

**Codex** — `.codex-plugin/plugin.json` with the full `interface` block.

```bash
codex plugin marketplace add AgentsORG/design-engineering --sparse .codex-plugin --sparse skills
```

**Cursor** — `.cursor-plugin/plugin.json`; install via the Cursor Marketplace or `Settings → Plugins → Load unpacked`.

All manifests share `name`, `version`, `description`, `author`, `homepage`, `repository`, and `license`; the root `plugin.json` is canonical and CI enforces version parity across all six plus `SKILL.md`.

### shadcn CLI

The repo doubles as a [shadcn registry](https://ui.shadcn.com/docs/registry), so a frontend project can pull the skill — or just its motion tokens — with the CLI it already has:

```bash
# The full skill graph → .agents/skills/design-engineering/
npx shadcn@latest add https://raw.githubusercontent.com/AgentsORG/design-engineering/main/r/design-engineering.json
```

Four items ship:

| Item | Installs | Into |
|---|---|---|
| `design-engineering` | The full skill graph (85 files) | `.agents/skills/design-engineering/` |
| `design-engineering-agents` | Six subagents + six slash commands | `.claude/agents/`, `.claude/commands/` |
| `design-engineering-design-file` | The starter `.design` contract | `.design` at project root |
| `design-engineering-motion` | Motion tokens as theme CSS variables | your global CSS |

Swap the filename in the URL for any of them. The motion item is the lightest way in — four easing curves and a duration scale, no skill install:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/AgentsORG/design-engineering/main/r/design-engineering-motion.json
```

That gives you `--ease-out-quart`, `--ease-out-expo`, `--ease-in-out`, `--ease-spring`, and `--duration-press` through `--duration-page`. On Tailwind v4, register the ones you want utilities for under `@theme inline`. Preview any item before installing with `--dry-run`, or read it with `npx shadcn@latest view <url>`.

Registry sources live in [`registry.json`](registry.json); the built, content-embedded items in [`r/`](r/) are generated by `npm run build:registry` and committed so the raw URLs resolve.

### Run it as an agent (eve)

The repo is also a runnable [eve](https://eve.dev/) project — a durable backend design-engineering agent with the skill graph seeded into its sandbox and six specialist subagents it can delegate to:

```bash
npm install
npm run dev      # syncs the skill graph into agent/skills/ and starts eve dev
npm run eval     # scored checks: review-format table contract, concrete motion values
```

`agent/instructions.md` is the identity (distilled from [SOUL.md](SOUL.md)), `agent/agent.ts` the runtime config, `agent/subagents/<name>/` the specialists (each with its own `agent.ts` description the root reads to decide when to delegate), and `evals/*.eval.ts` the regression gates. `agent/skills/` is generated by `scripts/sync-skills.mjs` from the canonical `skills/design-engineering/` — single source of truth, two consumers.

### Recommended companions

```bash
# Obsidian — view + edit the skill graph in a real graph view
# https://obsidian.md → "Open folder as vault" → pick this repo

# Agentation — click-to-annotate design review in your localhost dev environment
npx skills add benjitaylor/agentation
```

**Obsidian** turns the wikilinks-and-frontmatter graph into a navigable canvas. **Agentation** ([agentation.com](https://www.agentation.com)) mounts a toolbar in your dev environment so annotations become structured markdown your agent can act on — see `[[pointing-beats-describing]]` and `[[agentation-workflow]]`.

## Paste this into your coding agent

Drop the block below into your agent's instructions / `AGENTS.md` / `.cursorrules` / system prompt:

```text
You have access to the design-engineering skill — a navigable graph of
opinionated, source-cited design-engineering knowledge. Load it when the
user is reviewing UI code, designing a component or page layout, picking
an easing curve or transition pattern, deciding "should this animate at
all?", choosing an avatar / typography / color system, auditing for
AI-default tells, or asking "why does this feel flat?"

- Repo:        https://github.com/AgentsORG/design-engineering
- Skill root:  skills/design-engineering/
- Install:     npx skills add AgentsORG/design-engineering

Navigation:
- Route first: references/meta/routing-table.md maps intent → entry node
  and names the four postures (build / judge / decide / name).
- When two intents blur, references/meta/disambiguation.md names the
  tiebreaker; multi-cluster jobs follow references/meta/stacking-chains.md.
- SKILL.md is a thin Map of Content with [[wikilinks]] to atomic nodes in
  8 themed folders: philosophy, motion, typography, surface, components,
  layout, anti-patterns, meta. Wikilinks resolve by basename.

Rules:
1. For any UI code review, use the Before | After | Why table from
   references/meta/review-format.md, scanned against
   references/meta/review-checklist.md.
2. Cite the node basename you used (e.g. [[easing-curves]]). Don't
   paraphrase a node without naming it.
3. Prefer reading a specific references/<theme>/<node>.md over the whole
   SKILL.md — cheaper on context; the graph is built for it.
4. Before producing UI code or a review, load references/meta/gotchas.md
   (lived failures) and references/meta/pov.md (installer overrides).

Smoke test: "review this CSS for a modal animation" → open
references/meta/review-format.md first, then the relevant motion nodes
([[easing-curves]], [[duration-table]], [[never-scale-from-zero]]).
```

## What's included

One skill, organised into **8 themed clusters**. Each cluster has its own MOC (meta indexes from SKILL.md directly).

| Theme | Use it when… |
|---|---|
| `philosophy` | Justifying polish, picking between two valid approaches, debating delight budget. The "why bother" cluster. |
| `motion` | Adding or reviewing any animation. Easing, durations, springs, gestures, transitions, stagger. The largest cluster. |
| `typography` | Picking a typeface, line length, tracking. Avoiding AI-default font tells. |
| `surface` | Color palette, dark mode, shadows, border radius, visual imperfection. |
| `components` | Buttons, hovers, empty/loading states, cards, forms, avatars, icons, a11y, copy. |
| `layout` | Page-level grids, viewports, sticky chrome, URL-as-state. |
| `anti-patterns` | Auditing for "could this have been generated in 30s with a prompt?" tells. The deletion cluster. |
| `meta` | Routing (`routing-table`, `disambiguation`, `stacking-chains`), required review format + checklist, design.md consumption, Agentation workflow, gotchas, pov. |

## Structure: a skill graph, not a SKILL.md file

The skill is a **graph**, not a single file (per [Akshay Pachaar's "Skill Graphs > SKILL.md"](https://x.com/akshay_pachaar)):

- **`SKILL.md`** is a *Map of Content* — short descriptions of every cluster, plus `[[wikilinks]]` to follow.
- **`references/<theme>/MOC-<theme>.md`** is the topic hub for each theme.
- **`references/<theme>/<node>.md`** are atomic concept files — one complete thought each, 40–80 lines, with YAML frontmatter and outbound `[[wikilinks]]`.
- **`references/meta/routing-table.md`** is the entry router: classify the intent, open exactly one node. Most decisions happen before reading a single full node.
- Wikilinks resolve by basename across the whole graph — themed subfolders are organizational, not namespaces.
- The skill follows [Perplexity's progressive-disclosure pattern](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity) — three tiers of context cost (index → SKILL.md body → on-demand nodes).

## Repository layout

```text
design-engineering/
├── plugin.json                        ← canonical Agent Plugins v1.0.0 manifest (portable core + extensions)
├── package.json                       ← eve app root (npm run dev / eval / sync:skills)
├── tsconfig.json
├── README.md
├── AGENTS.md                          ← repo-level agent guidance (the "what / how")
├── SOUL.md                            ← identity layer (the "who / why") — voice, taste lineage
├── CONTRIBUTING.md / CODE_OF_CONDUCT.md / SECURITY.md / CHANGELOG.md / LICENSE
├── .github/workflows/lint.yml         ← markdownlint + frontmatter + wikilinks + manifest parity
├── .claude-plugin/                    ← Claude Code manifest + marketplace   (com.anthropic.claude-code)
├── .codex-plugin/                     ← OpenAI Codex manifest                (com.openai.codex)
├── .cursor-plugin/                    ← Cursor IDE manifest                  (com.cursor.editor)
├── .plugin/                           ← vendor-neutral plugins-CLI manifest  (dev.vercel.plugins)
├── agents/                            ← six workflow subagents (Claude Code subagent format)
├── commands/                          ← six slash-command workflows
├── agent/                             ← eve runtime                          (dev.eve.agent)
│   ├── agent.ts                       ← defineAgent() — model + runtime config
│   ├── instructions.md                ← base system prompt, distilled from SOUL.md
│   ├── skills/                        ← generated: skill graph synced in (gitignored)
│   └── subagents/<name>/              ← agent.ts (description + model) + instructions.md × 6
├── evals/                             ← eve evals: defineEval() scored checks
│   ├── evals.config.ts
│   ├── review-format.eval.ts          ← review requests must return the Before|After|Why table
│   └── motion-values.eval.ts          ← easing advice must name concrete values
├── scripts/sync-skills.mjs            ← skills/ → agent/skills/ (single source of truth)
├── registry.json                      ← shadcn registry source          (com.shadcn.registry)
├── r/                                 ← built registry items (generated, committed for raw URLs)
├── scripts/build-registry.mjs         ← registry.json + r/*.json builder
├── spec/                              ← offline mirrors: agent-skills-spec.md, design-md-spec.md, design-file-spec.md
├── templates/design-engineering.design ← starter .design contract (this skill's motion + surface defaults)
├── template/TEMPLATE.md
└── skills/design-engineering/         ← THE KNOWLEDGE (portable core)
    ├── SKILL.md                       ← thin Map of Content
    ├── evals/                         ← Step-0 routing fixtures (loading.jsonl, progressive-reads.jsonl)
    └── references/                    ← 8 themed clusters, 72 atomic nodes, 7 MOCs
```

Total: **72 atomic nodes** across 8 clusters (82 markdown files in the skill), 6 workflow subagents ×2 formats, 6 commands, 3 eve evals, 6 plugin manifests.

## Agent Plugins conformance

The repo follows the [Agent Plugins specification v1.0.0](https://agent-plugins.org/):

- **`plugin.json`** at the root with `$schema: https://agent-plugins.org/schemas/1.0.0/plugin.schema.json` — the portable identity.
- **`skills/`** — each immediate child directory containing a `SKILL.md` is one skill, per the [Agent Skills spec](https://agentskills.io/specification) (mirrored offline at [`spec/agent-skills-spec.md`](spec/agent-skills-spec.md)).
- **Client extensions** are declared in `plugin.json` under `extensions`, keyed by reverse-domain namespace. Clients that don't implement a namespace ignore it — a Cursor install never parses the eve runtime; an eve deploy never parses the Codex interface block.
- No `mcp.json` — this plugin ships no MCP servers (Agentation's MCP is a companion install, not bundled).

## View and edit in Obsidian

The graph of `.md` files connected by `[[wikilinks]]` with YAML frontmatter is the exact shape [Obsidian](https://obsidian.md) was built for. **Open folder as vault** → pick this repo root → `Ctrl/Cmd + G` for the graph view. `MOC-<theme>.md` files are the hubs. Recommended companion: [kepano/obsidian-skills](https://www.skills.sh/kepano/obsidian-skills).

## Customize for yourself

When you install this skill, edit two files to make it yours:

- `skills/design-engineering/references/meta/pov.md` — your opinions, taste calls, and overrides on defaults.
- `skills/design-engineering/references/meta/gotchas.md` — append a one-liner every time your agent gets a UI detail wrong.

These two files are designed to be edited per-installer. Everything else should stay close to canonical.

## Contributing

PRs welcome. The shorter the better. See [CONTRIBUTING.md](CONTRIBUTING.md), [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md), [SECURITY.md](SECURITY.md), [CHANGELOG.md](CHANGELOG.md). CI runs [markdownlint, frontmatter validation, required-files, wikilink resolution, and six-manifest version parity](.github/workflows/lint.yml) on every PR.

## Sources

- **Emil Kowalski** — [emilkowalski/skill](https://github.com/emilkowalski/skill), [animations.dev](https://animations.dev), [emilkowal.ski](https://emilkowal.ski), [sonner.emilkowal.ski](https://sonner.emilkowal.ski)
- **Index (Emil Kowalski & Glenn Carstens-Peters)** — [index.how](https://index.how)
- **Benji Taylor** — [benji.org](https://benji.org) + [Agentation](https://www.agentation.com)
- **Jakub Antalik** — [transitions.dev](https://transitions.dev)
- **James Frewin** — [guidelines.sh](https://guidelines.sh)
- **Vercel** — [vercel.com/design/guidelines](https://vercel.com/design/guidelines)
- **Ben DC** — [github.com/bendc/frontend-guidelines](https://github.com/bendc/frontend-guidelines)
- **dmytro / @pqoqubbw** — [lucide-animated.com](https://lucide-animated.com)
- **DiceBear** — [dicebear.com/styles](https://www.dicebear.com/styles)
- **Google Labs Code** — [github.com/google-labs-code/design.md](https://github.com/google-labs-code/design.md) (mirrored in `spec/`)
- **AgentsORG `.design`** — [github.com/AgentsORG/design](https://github.com/AgentsORG/design) (the `design.v1` visual contract; mirrored in `spec/`)
- **agentskills.io** — [Agent Skills specification](https://github.com/agentskills/agentskills) (mirrored in `spec/`)
- **Akshay Pachaar** — [Skill Graphs > SKILL.md](https://x.com/akshay_pachaar)
- **Perplexity Agents team** — [Designing, Refining, and Maintaining Agent Skills](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity)
- **Anthropic** — [anthropics/skills](https://github.com/anthropics/skills) (`spec/` + `template/` layout)

## See also

- [Agent Plugins spec](https://agent-plugins.org/) — the portable-plugin interoperability floor this repo conforms to
- [eve](https://eve.dev/) — the durable-agent framework the `agent/` + `evals/` runtime targets
- [skills.sh](https://skills.sh) — the CLI and registry
- [Agent Skills spec](https://agentskills.io/specification) — frontmatter and directory standard
- [agents.md](https://agents.md) — the AGENTS.md format
- [steipete/SOUL.md](https://github.com/steipete/SOUL.md) — identity layer for agents
- [design.md](https://github.com/google-labs-code/design.md) — design-token format for coding agents
- [.design](https://github.com/AgentsORG/design) — the `design.v1` living visual contract this skill defers to
- [shadcn registry](https://ui.shadcn.com/docs/registry) — how the `r/` items are consumed
- [Agentation](https://www.agentation.com) — click-to-annotate design review
- [kepano/obsidian-skills](https://www.skills.sh/kepano/obsidian-skills) — edit skill graphs in Obsidian

## License

MIT. See [LICENSE](LICENSE).
