# design-engineering

[![skills.sh](https://skills.sh/b/HKTITAN/design-engineering)](https://skills.sh/HKTITAN/design-engineering)
[![CI](https://github.com/HKTITAN/design-engineering/actions/workflows/lint.yml/badge.svg)](https://github.com/HKTITAN/design-engineering/actions/workflows/lint.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

An agent skill that encodes design engineering — the invisible details that make UI feel right. Distills [Emil Kowalski](https://emilkowal.ski) (animation), [Benji Taylor](https://benji.org) (delight + [Agentation](https://www.agentation.com)), [Jakub Antalik](https://transitions.dev) (transitions), [James Frewin](https://guidelines.sh) (guidelines), [Vercel](https://vercel.com/design/guidelines) (web-interface rules), [Ben DC](https://github.com/bendc/frontend-guidelines) (CSS conventions), [Google Labs design.md](https://github.com/google-labs-code/design.md) (design-token format), [lucide-animated](https://lucide-animated.com) (icon animation), and [DiceBear](https://www.dicebear.com) (avatars) into one navigable skill graph.

Not a tutorial. Not a doc site. **A working memory the agent loads** when you're reviewing UI code, picking an easing curve, designing a component, or asking "why does this feel flat?"

## Install

```bash
npx skills add HKTITAN/design-engineering
```

This uses the [skills.sh](https://skills.sh) CLI to install into your detected agent (Claude Code, Cursor, Windsurf, Codex, Gemini, Cline, Aider, and [18+ others](https://www.skills.sh/agent)). The CLI prompts for scope (project vs. global) and method (symlink vs. copy).

### Recommended companions

Two tools that compound the value of this skill — install both:

```bash
# Obsidian — view + edit the skill graph in a real graph view
# https://obsidian.md → "Open folder as vault" → pick this repo

# Agentation — click-to-annotate design review in your localhost dev environment
npx skills add benjitaylor/agentation
```

**Obsidian** turns the wikilinks-and-frontmatter graph into a navigable canvas. `Ctrl/Cmd + G` opens the graph view; theme folders cluster naturally; you can edit any node in place and the agent picks up the change. See the *View and edit in Obsidian* section below.

**Agentation** ([agentation.com](https://www.agentation.com), [github.com/benjitaylor/agentation](https://github.com/benjitaylor/agentation)) mounts a toolbar in your dev environment so you can click any element on the page and annotate it. The annotation becomes structured markdown — selectors, file paths, computed styles — that your AI agent can act on directly. This skill's `[[pointing-beats-describing]]` and `[[agentation-workflow]]` nodes encode the underlying principle and the two-session workflow.

Both pair naturally with this skill — Obsidian for editing the knowledge, Agentation for applying it to a running app.

## Paste this into your coding agent

The fastest way to set up any coding agent — Claude Code, Cursor, Windsurf, Codex, Aider, Cline, or anything that reads project rules — is to drop the block below into your agent's instructions / `AGENTS.md` / `.cursorrules` / system prompt.

```text
You have access to the design-engineering skill — a navigable graph of
opinionated, source-cited design-engineering knowledge. Load it when the
user is reviewing UI code, designing a component or page layout, picking
an easing curve or transition pattern, deciding "should this animate at
all?", choosing an avatar / typography / color system, auditing for
AI-default tells, or asking "why does this feel flat?"

- Repo:        https://github.com/HKTITAN/design-engineering
- Skill root:  https://github.com/HKTITAN/design-engineering/tree/main/skills/design-engineering
- Install:     npx skills add HKTITAN/design-engineering
- Authoring rules and conventions: AGENTS.md at the repo root.

The skill is a hub-and-spoke graph:
- `skills/design-engineering/SKILL.md` is a thin Map of Content with
  short descriptions plus [[wikilinks]] to atomic concept nodes.
- `skills/design-engineering/references/<theme>/` holds the atomic nodes
  in 8 themed folders: philosophy, motion, typography, surface,
  components, layout, anti-patterns, meta.
- Each themed folder has its own `MOC-<theme>.md` indexing the nodes
  in that theme.
- Wikilinks like [[easing-curves]] resolve by basename across the whole
  graph — themes are organizational, not namespaces.

The themes:
- philosophy/     — taste, delight, beauty, feeling-right, when polish matters
- motion/         — animation, easing, springs, gestures, transitions, debugging
- typography/     — humanizing text, line length, tracking
- surface/        — color, shadow, radius, dark mode, imperfection
- components/     — hovers, empty/loading states, icons, cards, forms, avatars
- layout/         — viewport-custom design, sticky chrome, scroll discipline
- anti-patterns/  — AI-default tells, content-authenticity audits
- meta/           — review format (required for UI critiques), gotchas, pov,
                    review-checklist, cross-model testing

Rules:
1. For any UI code review, use the format defined in
   `references/meta/review-format.md` (a markdown table with
   Before | After | Why columns) and scan against
   `references/meta/review-checklist.md` (an 11-row audit).
2. Cite the node basename you used (e.g. [[easing-curves]],
   [[delight-impact-curve]]). Don't paraphrase a node without naming it.
3. Prefer reading a specific `references/<theme>/<node>.md` over the
   whole SKILL.md when you know the area — cheaper on context, the graph
   is built for it.
4. Before producing UI code or a review, load
   `references/meta/gotchas.md` (lived failures) and
   `references/meta/pov.md` (installer overrides) so your suggestions
   match this installer's taste and avoid known failure modes.

Smoke test: when the user says "review this CSS for a modal animation,"
which node should you open first? Expected:
`references/meta/review-format.md` (the required output format), then
the relevant motion nodes ([[easing-curves]], [[duration-table]],
[[never-scale-from-zero]]).
```

## What's included

One skill, organised into **8 themed clusters**. Each cluster has its own MOC and a handful of atomic nodes.

| Theme | Use it when… |
|---|---|
| `philosophy` | Justifying polish, picking between two valid approaches, debating delight budget, deciding whether the work matters. The "why bother" cluster. |
| `motion` | Adding or reviewing any animation. Choosing easing curves, durations, springs, gestures, transitions, stagger. Debugging "this feels janky." The largest cluster — animation is the most overused tool in modern UI. |
| `typography` | Picking a typeface, setting line length, tracking, OpenType, hierarchy. Avoiding AI-default font tells. |
| `surface` | Color palette, dark mode, shadows, border radius, visual imperfection. The "background" choices that decide feel. |
| `components` | Building or reviewing buttons, hovers, empty/loading states, cards, forms, avatars (DiceBear), icons. The atoms users actually touch. |
| `layout` | Page-level grids, viewports (each gets its own design, not a scaled desktop), sticky chrome, scroll behavior. |
| `anti-patterns` | Auditing for "could this have been generated in 30s with a prompt?" tells. Content authenticity. The deletion cluster. |
| `meta` | Required UI-review format, review checklist, cross-model testing guidance, gotchas (lived failures), pov (installer overrides). |

## Structure: a skill graph, not a SKILL.md file

The skill is a **graph**, not a single file. The pattern (per [Akshay Pachaar's "Skill Graphs > SKILL.md"](https://x.com/akshay_pachaar)):

- **`SKILL.md`** is a *Map of Content* (~90 lines) — short descriptions of every cluster, plus `[[wikilinks]]` to follow.
- **`references/<theme>/MOC-<theme>.md`** is the topic hub for each theme — a more detailed index of that theme's nodes.
- **`references/<theme>/<node>.md`** are atomic concept files — one complete thought each, 40–80 lines, with YAML frontmatter and outbound `[[wikilinks]]`.
- The agent **scans descriptions and frontmatter first**, then follows only the links it needs. Most decisions happen before reading a single full node.
- Wikilinks resolve by basename across the whole graph — themed subfolders are organizational, not namespaces. The graph is fully navigable from any entry point.
- The skill follows [Perplexity's progressive-disclosure pattern](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity) — three tiers of context cost (index → SKILL.md body → on-demand nodes).

## Repository layout

```text
design-engineering/
├── README.md
├── AGENTS.md                          ← repo-level agent guidance
├── CONTRIBUTING.md                    ← node format, PR checklist, cross-model
├── CODE_OF_CONDUCT.md                 ← Contributor Covenant v2.1
├── SECURITY.md                        ← responsible-disclosure policy
├── CHANGELOG.md                       ← Keep a Changelog / SemVer
├── LICENSE                            ← MIT
├── .github/
│   ├── workflows/lint.yml             ← markdownlint + frontmatter + wikilinks
│   └── PULL_REQUEST_TEMPLATE.md
├── .claude-plugin/marketplace.json    ← Claude Code marketplace manifest
├── .markdownlint.jsonc
├── spec/
│   └── agent-skills-spec.md           ← pointer to the Agent Skills specification
├── template/
│   └── TEMPLATE.md                    ← starter template (not SKILL.md so the CLI ignores it)
└── skills/design-engineering/
    ├── SKILL.md                       ← thin Map of Content (~90 lines)
    ├── evals/                         ← Perplexity Step-0 evals
    │   ├── README.md
    │   ├── loading.jsonl              ← positive/negative routing queries
    │   └── progressive-reads.jsonl    ← which nodes the agent should open
    └── references/
        ├── philosophy/  (taste-is-trained, unseen-details-compound,
        │              beauty-is-leverage, delight-impact-curve,
        │              feeling-right, marketing-vs-product-ui,
        │              states-are-the-work, data-is-content,
        │              dependency-discipline, pointing-beats-describing)
        ├── motion/      (animation-decision-framework, easing-curves,
        │              duration-table, spring-animations, transform-opacity-only,
        │              transform-mastery, clip-path-tricks, never-scale-from-zero,
        │              gesture-momentum, stagger-choreography, prefers-reduced-motion,
        │              fly-not-teleport, responsive-feedback, sonner-principles,
        │              debugging-animations, cross-blur-transitions,
        │              compose-subtract-asymmetry, distance-falloff-propagation,
        │              multi-segment-shake, lerp-breathing, morphing-icons,
        │              shared-letter-morph, hover-default-imperative, tray-rules,
        │              css-conventions, animations-dev-curriculum)
        ├── typography/  (typography-humanity, line-length-tracking)
        ├── surface/     (color-monochromatic, dark-mode, shadows-whisper,
        │              border-radius, visual-imperfection,
        │              contrast-and-color-scheme)
        ├── components/  (hover-states-subtle, empty-loading-states, icon-systems,
        │              cards-design, forms-validation, avatar-systems,
        │              interaction-personality, accessibility-baseline,
        │              optimistic-updates, copy-voice)
        ├── layout/      (viewport-custom-design, sticky-and-scroll-tells,
        │              url-as-state)
        ├── anti-patterns/  (ai-default-tells, content-authenticity)
        └── meta/        (review-format, review-checklist, cross-model-testing,
                       using-design-md, agentation-workflow,
                       gotchas, pov)
```

The `spec/` folder mirrors two external specs offline:

- [`spec/agent-skills-spec.md`](spec/agent-skills-spec.md) — full mirror of the [Agent Skills specification](https://github.com/agentskills/agentskills) (Apache-2.0 / CC-BY-4.0).
- [`spec/design-md-spec.md`](spec/design-md-spec.md) — full mirror of [Google Labs' `design.md` format](https://github.com/google-labs-code/design.md) (Apache-2.0).

Total: **75 markdown files** in the skill — 1 SKILL.md, 8 MOCs, 63 atomic nodes, 3 evals.

## View and edit in Obsidian

This skill is a graph of `.md` files connected by `[[wikilinks]]` with YAML frontmatter — the exact shape [Obsidian](https://obsidian.md) was built for. Open the repo as a vault to see every node, every edge, and edit any file in place.

**Recommended**: install [kepano/obsidian-skills](https://www.skills.sh/kepano/obsidian-skills). It teaches your agent to navigate and edit skill graphs through Obsidian, so you can see clusters at a glance in the graph view and push changes back without leaving the canvas.

```bash
npx skills add kepano/obsidian-skills
```

To open this skill as a vault:

1. In Obsidian, click **Open folder as vault**.
2. Point it at this repo's root.
3. `Ctrl/Cmd + G` opens the graph view. `MOC-<theme>.md` files are the hubs — start there and follow the links.

## Customize for yourself

When you install this skill, edit two files to make it yours:

- `skills/design-engineering/references/meta/pov.md` — your opinions, taste calls, and overrides on defaults.
- `skills/design-engineering/references/meta/gotchas.md` — append a one-liner every time your agent gets a UI detail wrong.

These two files are designed to be edited per-installer. Everything else should stay close to canonical. With [kepano/obsidian-skills](https://www.skills.sh/kepano/obsidian-skills) installed, both edits land in the graph view as you make them.

## Contributing

PRs welcome. The shorter the better.

- [CONTRIBUTING.md](CONTRIBUTING.md) — format, what belongs as a node vs. a gotcha, PR checklist, cross-model testing requirements.
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — Contributor Covenant v2.1.
- [SECURITY.md](SECURITY.md) — responsible disclosure for prompt-injection or misleading-link reports.
- [CHANGELOG.md](CHANGELOG.md) — release notes (Keep a Changelog, SemVer).
- CI runs [`markdownlint`, frontmatter validation, required-files check, and wikilink resolution](.github/workflows/lint.yml) on every PR.

## Sources

- **Emil Kowalski** — [emilkowalski/skill](https://github.com/emilkowalski/skill), [animations.dev](https://animations.dev), [emilkowal.ski](https://emilkowal.ski), [sonner.emilkowal.ski](https://sonner.emilkowal.ski)
- **Benji Taylor** — [benji.org](https://benji.org) (Family Values, Honkish, Liveline, Morphing Icons with Claude, Annotating, Agentation) + [Agentation](https://www.agentation.com) ([github.com/benjitaylor/agentation](https://github.com/benjitaylor/agentation), [skills.sh/benjitaylor/agentation](https://www.skills.sh/benjitaylor/agentation/agentation))
- **Jakub Antalik** — [transitions.dev](https://transitions.dev), [github.com/Jakubantalik/transitions.dev](https://github.com/Jakubantalik/transitions.dev)
- **James Frewin** — [guidelines.sh](https://guidelines.sh)
- **Vercel** — [vercel.com/design/guidelines](https://vercel.com/design/guidelines) (web-interface guidelines: a11y, optimistic updates, URL-as-state, contrast, copy voice)
- **Ben DC** — [github.com/bendc/frontend-guidelines](https://github.com/bendc/frontend-guidelines) (CSS dialect choices, dependency discipline)
- **dmytro / @pqoqubbw** — [lucide-animated.com](https://lucide-animated.com)
- **DiceBear** — [dicebear.com/styles](https://www.dicebear.com/styles), [github.com/dicebear/styles](https://github.com/dicebear/styles)
- **Google Labs Code** — [github.com/google-labs-code/design.md](https://github.com/google-labs-code/design.md) (design-token format mirrored in `spec/`)
- **agentskills.io** — [github.com/agentskills/agentskills](https://github.com/agentskills/agentskills) (Agent Skills specification mirrored in `spec/`)
- **HKTITAN / Duolingo Skills** — [hktitan/duolingo](https://github.com/hktitan/duolingo) (skill-graph layout reference)
- **Akshay Pachaar** — [Skill Graphs > SKILL.md](https://x.com/akshay_pachaar)
- **Perplexity Agents team** — [Designing, Refining, and Maintaining Agent Skills](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity)
- **Anthropic** — [anthropics/skills](https://github.com/anthropics/skills) (`spec/` + `template/` layout)

## See also

- [skills.sh](https://skills.sh) — the CLI and registry
- [Agent Skills spec](https://agentskills.io/specification) — frontmatter and directory standard (mirrored at [`spec/agent-skills-spec.md`](spec/agent-skills-spec.md))
- [agents.md](https://agents.md) — the AGENTS.md format
- [design.md](https://github.com/google-labs-code/design.md) — design-token format for coding agents (mirrored at [`spec/design-md-spec.md`](spec/design-md-spec.md))
- [Agentation](https://www.agentation.com) — click-to-annotate design review for your localhost dev environment
- [kepano/obsidian-skills](https://www.skills.sh/kepano/obsidian-skills) — companion skill for editing skill graphs in Obsidian

## License

MIT. See [LICENSE](LICENSE).
