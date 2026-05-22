---
title: agents
summary: Six workflow subagents that ship with the design-engineering skill. Each handles a narrow, high-frequency task and loads its own slice of the skill graph.
tags: [meta, agents, subagents]
---

# Subagents

Six narrow-purpose subagents ship with this skill. Each is a single markdown file with YAML frontmatter (`name`, `description`, `tools`, `model`) and a system-prompt body — the standard format read by Claude Code, Cursor, Codex, and any harness that supports the [Claude Code subagent spec](https://docs.claude.com/en/docs/claude-code/sub-agents).

## When to spawn

| Subagent | Spawn when… |
|---|---|
| [[ui-reviewer]] | The user asks for a UI code review, animation critique, hover-state audit, or "is this well-built?" on CSS / motion / component code. Returns a Before / After / Why table. |
| [[motion-auditor]] | The user asks about animation timing, easing, springs, transitions, gestures, or "this feels janky / theatrical / hesitant." Specializes in motion + transitions.dev catalog. |
| [[anti-pattern-scanner]] | The user asks "does this look AI-generated?", wants a content-authenticity audit, or is deleting AI-default tells (purple gradients, Inter-on-marketing, stock copy, placeholder testimonials). |
| [[agentation-fix-loop]] | The user is running the [[agentation-workflow]] two-session pattern and you are the Session-2 (fix) side. Watches MCP annotations, applies fixes, commits. |
| [[design-md-consumer]] | The user's project ships a `DESIGN.md` and they want generated UI to use its tokens. Reads, normalizes, and outputs TS / CSS / Tailwind / token-applied code. |
| [[pov-curator]] | The installer wants to fork [[pov]] for their own taste, append a one-liner to [[gotchas]] after a failure, or audit drift between [[pov]] and recent work. |

## Pick the right one

These overlap intentionally — they're scoped to *workflows*, not themes. Use this decision flow:

- **Code in hand, user wants a review** → `ui-reviewer` (general) or `motion-auditor` (if the code is motion-specific).
- **No code yet, planning new motion** → `motion-auditor`.
- **Page / marketing / hero feels off** → `anti-pattern-scanner` (find what to delete) → then `ui-reviewer` (refine what's left).
- **Live dev server + annotations** → `agentation-fix-loop`.
- **Project has DESIGN.md** → `design-md-consumer` before any UI generation.
- **Installer wants to make the skill theirs** → `pov-curator`.

## What they all share

Every subagent loads `references/meta/gotchas.md` and `references/meta/pov.md` before producing output. The installer's overrides trump canonical defaults of Emil, Benji, Jakub, guidelines.sh, Vercel, Ben DC. This is non-negotiable — without it, the skill is a generic taste filter instead of *this installer's* taste filter.

Every subagent cites the skill node it drew from. If the recommendation can't be traced to a `[[node-name]]`, the subagent doesn't make the recommendation.

Every subagent ships its own `## Soul` section at the bottom of its file — narrowing the repo-root [SOUL.md](../../../SOUL.md) to that subagent's specific identity (who it is, truths it holds, boundaries, voice). Read the soul block when spawning the subagent; it tells you the floor below the system prompt.

## What they are not

- **Not theme parrots.** There is no `motion-agent`, `typography-agent`, `surface-agent`. The skill itself navigates themes — subagents only exist where a *workflow* (review, audit, fix-loop, fork) earns its context cost.
- **Not autonomous.** Each one returns a structured result to the main agent. They don't push code without explicit user instruction.
- **Not replacements for the skill.** A subagent loads ~5–10 nodes for its workflow. The main agent still owns the full graph and handles questions that don't match any subagent.

## Spec

These files follow the [Claude Code subagent spec](https://docs.claude.com/en/docs/claude-code/sub-agents):

```yaml
---
name: subagent-name              # lowercase, hyphens, matches filename
description: When to spawn…      # one paragraph, starts with "Load when"
tools: Read, Grep, Edit, Bash    # whitelist; omit `tools` to inherit all
model: sonnet                    # or opus / haiku / inherit
---
```

The body is a system prompt. Length is unbounded but each one in this skill stays under 150 lines.

## Adding a new subagent

Don't, unless:

1. The workflow appears in real installer logs at least 5 times.
2. It can't be handled by the main agent loading 3–4 nodes inline.
3. It has a clearly bounded scope that won't drift into general-purpose review.

If those three pass, add the file here, link it from [[SKILL]] under "Workflow subagents," update this README, and bump the skill version.

## Related

- [[SKILL]] — the Map of Content these subagents extend.
- [SOUL.md](../../../SOUL.md) — the identity layer every subagent inherits.
- [AGENTS.md](../../../AGENTS.md) — repo-level editing rules; "Subagents" entry in File conventions.
