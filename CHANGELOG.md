# Changelog

All notable changes to this skill are recorded here. Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] — 2026-05-21

Adds two more named sources — [Vercel's web-interface guidelines](https://vercel.com/design/guidelines) and [Ben DC's frontend-guidelines](https://github.com/bendc/frontend-guidelines) — distilled into 7 new atomic nodes covering accessibility, copy voice, URL state, contrast math, optimistic updates, CSS conventions, and dependency discipline.

### Added — 7 new nodes

**`components/` (3 nodes)**

- `accessibility-baseline.md` — Keyboard-everywhere, `:focus-visible` rings, hit targets (24/44px), ARIA names on icon-only buttons, polite aria-live for async. The a11y floor below taste. (Vercel + bendc)
- `optimistic-updates.md` — Update UI immediately on likely-success actions, reconcile or undo on failure. Largest perceived-latency win available without infra changes. Pair destructive actions with Undo toasts. (Vercel)
- `copy-voice.md` — Active voice, Title Case for headings/buttons, "&" over "and", numerals for counts, error messages that guide the exit. Microcopy is design. (Vercel)

**`layout/` (1 node)**

- `url-as-state.md` — Filters, tabs, pagination, panels — all live in the URL. Back/forward restores scroll. Deep-link every modal. (Vercel)

**`surface/` (1 node)**

- `contrast-and-color-scheme.md` — APCA over WCAG 2 for contrast math. `<meta name="theme-color">` + `color-scheme: dark`. Interactions raise contrast. Avoid gradient banding. (Vercel)

**`motion/` (1 node)**

- `css-conventions.md` — `1turn` over `360deg`, unitless line-height, hex over rgb, native browser APIs over libraries. Ben DC's CSS dialect choices. (bendc)

**`philosophy/` (1 node)**

- `dependency-discipline.md` — Every dependency is a tax. Replicate simple utilities. Draw shapes in CSS. Prefer native browser APIs. The bundle is design. (bendc)

### Changed

- `SKILL.md` description expanded to mention writing UI copy and auditing a11y. All 5 affected MOCs updated to link the new nodes.
- `marketplace.json` version bumped to 1.1.0; description expanded to list the new source authors.
- `README.md` — repo layout tree includes new nodes; Sources section adds Vercel + bendc with their specific contributions; file count updated to 72 markdown files.
- `AGENTS.md` — Sources of truth section adds Vercel + bendc with the node lists they sourced.

## [1.0.0] — 2026-05-21

Initial public release of the `design-engineering` skill graph.

### Skill content

**8 themed clusters, 53 atomic nodes + 8 MOCs + 1 SKILL.md.**

- `philosophy/` — 8 nodes: taste-is-trained, unseen-details-compound, beauty-is-leverage, delight-impact-curve, feeling-right, marketing-vs-product-ui, states-are-the-work, data-is-content.
- `motion/` — 25 nodes covering animation decisions, easing, durations, springs, gestures, stagger, accessibility, transitions, library design, debugging, and Benji Taylor's full catalog (lerp-breathing, morphing-icons, shared-letter-morph, tray-rules) plus the lucide-animated hover-default-imperative pattern.
- `typography/` — 2 nodes: typography-humanity, line-length-tracking.
- `surface/` — 5 nodes: color-monochromatic, dark-mode, shadows-whisper, border-radius, visual-imperfection.
- `components/` — 7 nodes: hover-states-subtle, empty-loading-states, icon-systems, cards-design, forms-validation, avatar-systems (all 31 DiceBear v9.x styles with previews), interaction-personality.
- `layout/` — 2 nodes: viewport-custom-design, sticky-and-scroll-tells.
- `anti-patterns/` — 2 nodes: ai-default-tells, content-authenticity.
- `meta/` — 5 files: review-format (required for UI critiques), review-checklist, cross-model-testing, gotchas, pov.

### Evals (Perplexity Step 0)

- `skills/design-engineering/evals/loading.jsonl` — 20 positive + negative routing tests.
- `skills/design-engineering/evals/progressive-reads.jsonl` — 20 retrieval tests.
- `skills/design-engineering/evals/README.md` — format spec.

### Scaffolding

- `spec/agent-skills-spec.md` — pointer to the [Agent Skills specification](https://agentskills.io/specification).
- `template/SKILL.md` — starter template for new skills.
- `.claude-plugin/marketplace.json` — Claude Code marketplace manifest.

### Policy and CI

- `CODE_OF_CONDUCT.md` — Contributor Covenant v2.1.
- `SECURITY.md` — responsible-disclosure (3-business-day acknowledgement).
- `CONTRIBUTING.md` — node format, length targets, themes table, PR checklist, evals guidance, cross-model testing.
- `.github/workflows/lint.yml` — markdownlint, frontmatter check, required-files check, `Load when` description check, wikilink resolution check.
- `.github/PULL_REQUEST_TEMPLATE.md`.
- `AGENTS.md` — repo-level operating guidance for AI agents editing the repo.

### Sources distilled

- **Emil Kowalski** — [emilkowalski/skill](https://github.com/emilkowalski/skill), [animations.dev](https://animations.dev), Sonner, Vaul.
- **Benji Taylor** — [benji.org](https://benji.org) (Family Values, Honkish, Liveline, Morphing Icons with Claude, Annotating, Agentation).
- **Jakub Antalik** — [transitions.dev](https://transitions.dev) (cross-blur, compose-subtract-asymmetry, distance-falloff-propagation, multi-segment-shake).
- **James Frewin** — [guidelines.sh](https://guidelines.sh).
- **dmytro / @pqoqubbw** — [lucide-animated.com](https://lucide-animated.com).
- **DiceBear** — [dicebear.com/styles](https://www.dicebear.com/styles) — all 31 v9.x styles in `components/avatar-systems`.
- **HKTITAN / Duolingo Skills** — [hktitan/duolingo](https://github.com/hktitan/duolingo) — skill-graph layout reference.
- **Akshay Pachaar** — [Skill Graphs > SKILL.md](https://x.com/akshay_pachaar) — skill-graph framing.
- **Perplexity Agents team** — [Designing, Refining, and Maintaining Agent Skills](https://research.perplexity.ai/articles/designing-refining-and-maintaining-agent-skills-at-perplexity) — progressive disclosure, gotchas flywheel, evals-first.
- **Anthropic** — [anthropics/skills](https://github.com/anthropics/skills) — `spec/` + `template/` repo layout.

### Install

```bash
npx skills add HKTITAN/design-engineering
```

[Unreleased]: https://github.com/HKTITAN/design-engineering/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/HKTITAN/design-engineering/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/HKTITAN/design-engineering/releases/tag/v1.0.0
