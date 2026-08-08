---
name: apply-design-md
description: Consume the project's design contract — a .design file or DESIGN.md — and thread its tokens through UI code (CSS, Tailwind, or design-system components).
---

# Apply the design contract

Spawn or emulate the **design-md-consumer** subagent (`agents/design-md-consumer.md`).

1. Discover the contract, nearest wins: walk up for a `.design` / `*.design`, resolving `extends`. Then check for `DESIGN.md` at the root, `docs/`, or `design/`. If both exist, `.design` is the contract and DESIGN.md is rationale.
2. Load `skills/design-engineering/references/meta/using-design-file.md` (or `using-design-md.md`) plus `pov.md`.
3. For a `.design`, read the normative core before generating: `agent.instructions` → `intent` → `constraints` → `policy` / `decisions` → `tokens` → `voice` → `components`.
4. Output token mappings and apply them to the target UI the user specified. If `integrations.shadcn.enabled`, write `css_vars` into the declared CSS file — tokens outrank stale literals.
5. Tokens and structured rules are normative; `rationale` and DESIGN.md prose are context.

Precedence when they disagree: user prompt → the contract → this skill → model defaults.

If no contract exists, say so and offer to bootstrap one — copy `templates/design-engineering.design` (this skill's canonical motion and surface defaults) or scaffold a DESIGN.md from `spec/design-md-spec.md`. Scan adjacent signals first; never invent an untracked system silently.
