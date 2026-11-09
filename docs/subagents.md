---
title: agents
summary: Thirteen workflow subagents that ship with the design-engineering skill. Each handles a narrow, high-frequency task, loads its own slice of the skill graph and runs a bounded act, verify, fix loop. One canonical file per agent; a generator writes the Codex, OpenCode, Gemini, Cursor and eve forms.
tags: [meta, agents, subagents, loops]
---

# Subagents

Thirteen narrow-purpose subagents ship with this skill. Each is one markdown file in `plugin/agents/` with YAML frontmatter and a system-prompt body, in the [Claude Code subagent format](https://code.claude.com/docs/en/sub-agents). That file is the only one you edit: `scripts/build-agents.mjs` writes every other harness's form from it (see [One source, every harness](#one-source-every-harness)).

## When to spawn

| Subagent | Spawn when… |
|---|---|
| [[ui-reviewer]] | The user asks for a UI code review, animation critique, hover-state audit, or "is this well-built?" on CSS / motion / component code. Returns a Before / After / Why table. |
| [[motion-auditor]] | The user asks about animation timing, easing, springs, transitions, gestures, or "this feels janky / theatrical / hesitant." Specializes in motion + transitions.dev catalog. |
| [[anti-pattern-scanner]] | The user asks "does this look AI-generated?", wants a content-authenticity audit, or is deleting AI-default tells (purple gradients, Inter-on-marketing, stock copy, placeholder testimonials). |
| [[agentation-fix-loop]] | The user is running the [[agentation-workflow]] two-session pattern and you are the Session-2 (fix) side. Watches MCP annotations, applies fixes, verifies, commits. |
| [[design-md-consumer]] | The user's project ships a `.design` file (design.v1) or a `DESIGN.md` and they want generated UI to use its tokens. Reads, normalizes, and outputs TS / CSS / Tailwind / token-applied code. |
| [[pov-curator]] | The installer wants to fork [[pov]] for their own taste, append a one-liner to [[gotchas]] after a failure, or audit drift between [[pov]] and recent work. |
| [[sound-designer]] | The user wants sound in a product UI or a launch video — "should this have a sound?", a generated family of UI sounds (ElevenLabs, or open-weight / procedural / CC0 without a key), sounds synced to animation frames, or a review of sounds that feel stock, late, or annoying. Returns a sound map table plus files. |
| [[svg-creator]] | The user wants an SVG made or fixed — icon, illustration, logo mark, mascot pose, generative art — or a generated SVG made clean, editable, token-aware, optimized, and labelled. Returns the file plus a Before / After / Why table. |
| [[svg-animator]] | The user wants an SVG to move — animated icon, logo reveal, stroke draw, morph, mascot loop — or a frame sequence / flat clip turned into one editable animated SVG. Picks the engine for where the file lives; returns a motion plan plus the file. |
| [[launch-film-analyst]] | The user hands over a reference launch film or their own render and wants it measured (cut rate, still share, first word, name timing, type cadence, typing speed, seams, endcard, loudness, onsets vs motion) or reviewed against the measured corpus. Returns the [[launch-video-review]] rubric table plus a per-film JSON. |
| `design-council` | The user says "council", or wants a UI, page or film pushed until independent judges on different providers agree it's good. Fans one judge brief out to a Claude `design-judge`, GPT through `codex exec` and, when present, Gemini as an unscored jester; loops fixes until every judge clears the threshold or the budget ends; reports a missing provider instead of substituting one. Returns the `## Council review` table (rounds, per-delegate scores, `no score` never invented). |
| `design-judge` | One read-only judge for the council, or a second opinion on its own. Scores the rubric's categories 1–10 from before / after evidence and reference products, never sees the target threshold, and returns JSON scores, Before / After / Why evidence and a confidence. |
| `design-grader` | Grade a design episode — a human's or an agent's brief, diff or output, rendered evidence and optional transcript — on one scale. Deterministic checks first (they can only cap a score), judges second; returns per-axis facts, interpretation, counterweight, confidence and a band. |

<!-- The last three rows (design-council, design-judge, design-grader): written from the 4.0.0 build brief. Keep them in step with plugin/agents/design-council.md, design-judge.md and design-grader.md. -->

## Pick the right one

These overlap intentionally — they're scoped to *workflows*, not themes. Use this decision flow:

- **Code in hand, user wants a review** → `ui-reviewer` (general) or `motion-auditor` (if the code is motion-specific).
- **No code yet, planning new motion** → `motion-auditor`.
- **Page / marketing / hero feels off** → `anti-pattern-scanner` (find what to delete) → then `ui-reviewer` (refine what's left).
- **Live dev server + annotations** → `agentation-fix-loop`.
- **Project has a `.design` or DESIGN.md** → `design-md-consumer` before any UI generation.
- **Installer wants to make the skill theirs** → `pov-curator`.
- **Anything with audio — product or launch video** → `sound-designer` (it says no first, then generates via `scripts/sound-family.mjs`, or renders a video stem from the motion with `sound-sheet.mjs`).
- **A vector asset to draw or clean** → `svg-creator`; **a vector asset to move, or a clip to vectorize** → `svg-animator` (which sends unnamed-group files back to `svg-creator` first).
- **A launch film to measure or review** → `launch-film-analyst`; **deciding how to make one** → the main agent walks [[MOC-launch-video]].
- **"Is it good yet?" across providers, or "council"** → `design-council` (it spawns `design-judge`; never call the judges yourself and add up their scores).
- **Scoring a person's or an agent's design work** → `design-grader`.
- **Not sure which — or the job belongs to impeccable, the `design` skill, or HyperFrames** → the main agent runs `references/meta/skill-router.md` before spawning anything.

## Loops

Every subagent carries a `## Loop` section: **act → verify → fix**, inside an explicit budget. The verify step is a deterministic check wherever one exists, so "done" means a check passed, not that the agent feels finished.

| Subagent | Budget | Verify step |
|---|---|---|
| `ui-reviewer` | 3 rounds | Every Before quote is Grepped in the code, every Why's node is Globbed, the grep patterns of [[review-checklist]] rows 1–3, 6, 8, 9, 14, 20, 30, 32, 34 re-run; later rounds re-scan all forty rows on the changed code. |
| `motion-auditor` | 3 rounds | Every value re-checked against [[duration-table]] bands, the 60–80 % exit ratio and the [[easing-curves]] list; checklist rows 1–6 and 34 re-grepped. Films check against `launch-video-motion`. |
| `anti-pattern-scanner` | 3 rounds | Checklist rows 14–22 grepped; each Delete row's quote Grepped; after deletions, a returning tell or a replacement tell reopens its id. |
| `agentation-fix-loop` | 3 attempts per annotation | The element carries the change, the project's typecheck / lint / tests pass, rows 1–3 and 34 re-grepped; only then commit and resolve. |
| `design-md-consumer` | 3 rounds | Every literal, `var(--…)` and token comment matched to a contract token; dark scheme, shadcn variable set and `locked` paths checked; rows 1–3, 9, 17, 26 grepped. |
| `pov-curator` | 2 rounds | `gotchas.md` stays byte-identical above the new line (append-only), the line matches the format, the cited node exists. |
| `sound-designer` | 3 rounds per family | ffprobe channels / rate / duration, astats peak (−3 dBFS), silencedetect lead-in for UI files; ebur128 LUFS and −1 dBTP plus onset frames for film stems. |
| `svg-creator` | 3 rounds | SVGO re-run (barely shrinks, keeps `viewBox`, ids, `<title>`), byte size against budget, root `viewBox` without width / height, no rasters or editor metadata, labelled or hidden. |
| `svg-animator` | 3 rounds | Size budget, reduced-motion rule, no layout or filter animation, `transform-box` + `transform-origin`, values against the motion tables, flipbook size line. |
| `launch-film-analyst` | 3 measurement passes | A blind second cut count settled from per-cut sheets, ebur128 re-run on disagreement, the JSON checked for every key and `null` (never 0) for the unmeasured. |
| `design-council` | 4 rounds by default (the user may set another) | Every judge at or above the threshold on the current evidence; scarce judges join only once the cheap ones pass. |
| `design-judge` | 2 rounds inside one call (one council round) | Its JSON parses against the rubric schema and every score cites evidence. |
| `design-grader` | 2 rounds; `grade.mjs` caches by input hash | Deterministic checks run first and cap the axes; a claim the checks contradict is flagged as gaming. |

The rules every loop shares, adapted with attribution from Theo Browne's tstack `sol-loop` and `council` (MIT):

- **Rounds.** Round 1 covers the whole target. A later round — the main agent re-invokes the subagent with its ledger after a change — covers only the changed lines and the open ids.
- **Ledger.** One line per finding with a stable id, a severity (`blocker` = the intended case is wrong, `should` = a real miss users will hit, `nit` = the rest) and an outcome (`fixed`, `declined: <why>`, `open`).
- **Stop** when the verify step passes with no blocker or should open, when a round finds only nits, when a finding is disputed twice (both sides in two lines; the user decides), or when the budget ends — and say which.
- **No approval by silence.** A timeout or no reply is not approval, and an ended budget is not a pass. No agent agrees, resolves or drops a finding just to end the loop.
- **Scope guard.** Stay inside the target; prefer the change that deletes or narrows; if a round grew the change, cut first.

The harness enforces a ceiling under the prose budget: Claude Code `maxTurns`, OpenCode `steps`, Gemini `max_turns`, and on eve a `limits.sessionUsage` guard sized from `maxTurns`. Codex and Cursor have no per-agent cap, so the `## Loop` budget is the cap there.

## Skill root

Subagents run outside this repo, so every body opens with a `## Skill root` section: the paths it reads are relative to the first of `./skills/design-engineering`, `~/.agents/skills/design-engineering`, `~/.claude/skills/design-engineering`, or the installed plugin's `skills/design-engineering` (`${CLAUDE_PLUGIN_ROOT}/skills/design-engineering` in Claude Code, which substitutes the variable in plugin agent bodies) that holds a `SKILL.md`. If none exists, the agent says so instead of answering from memory. The generator swaps that list for each harness's own skill folders, and pins eve twins to `$HOME/.agents/skills/design-engineering/`, where eve seeds the skill.

## One source, every harness

`plugin/agents/<name>.md` is canonical. `node scripts/build-agents.mjs` reads every `plugin/agents/*.md` — new files are picked up by the glob, nothing is listed by hand — and writes:

| Harness | Generated file | What changes |
|---|---|---|
| eve | `eve/agent/subagents/<name>/agent.ts` + `instructions.md` | `description` starts "Delegate when"; `sonnet` → `anthropic/claude-sonnet-5.5`, `opus` → `anthropic/claude-opus-5.5`; `effort` → `reasoning`; a `limits.sessionUsage` guard from `maxTurns`; skill paths spelled out under `$HOME/.agents/skills/design-engineering/`. |
| Codex | `plugin/harness/codex/agents/<name>.toml` | `name`, `description`, `developer_instructions`, `model_reasoning_effort`; read-only reviewers get `features.shell_tool = false` (Codex agents inherit the sandbox). |
| OpenCode | `plugin/harness/opencode/agents/<name>.md` | `mode: subagent`, `steps` from `maxTurns`, `permissions` (edit and shell denied for read-only agents). |
| Gemini CLI | `plugin/harness/gemini/agents/<name>.md` | `max_turns`, `timeout_mins`, Gemini tool names (`read_file`, `grep_search`, `run_shell_command` …), MCP tools as `mcp_<server>_*`. |
| Cursor | `plugin/harness/cursor/agents/<name>.md` | `model: inherit`, `readonly` for reviewers. Cursor also reads `.claude/agents/` directly. |

`plugin/harness/README.md` (also generated) says where each file installs. The output is deterministic — sorted, LF, no timestamps — and CI runs `node scripts/build-agents.mjs --check`, which exits 1 when any generated file is missing, stale or orphaned. Never edit a generated file; edit the agent and rebuild. An eve twin file whose first line contains `build-agents: keep` is hand-written and left alone, for a subagent that needs more than the generated `agent.ts` (the council's nested provider members).

## What they all share

Every subagent loads `references/meta/gotchas.md` and `references/meta/pov.md` before producing output. The installer's overrides trump canonical defaults of Emil, Benji, Jakub, guidelines.sh, Vercel, Ben DC. This is non-negotiable — without it, the skill is a generic taste filter instead of *this installer's* taste filter.

Every subagent cites the skill node it drew from. If the recommendation can't be traced to a `[[node-name]]`, the subagent doesn't make the recommendation.

Every subagent ships its own `## Soul` section at the bottom of its file — narrowing the repo's [SOUL.md](SOUL.md) to that subagent's specific identity (who it is, truths it holds, boundaries, voice). Read the soul block when spawning the subagent; it tells you the floor below the system prompt.

## What they are not

- **Not theme parrots.** There is no `motion-agent`, `typography-agent`, `surface-agent`. The skill itself navigates themes — subagents only exist where a *workflow* (review, audit, fix-loop, fork, generate-and-wire, judge) earns its context cost. `sound-designer` qualifies because generation, post-processing, and wiring are tool calls, not reading. `launch-film-analyst` qualifies because ffprobe and ffmpeg runs and dozens of contact sheets read as images would flood the main context. `design-council` qualifies because it fans out to other providers' CLIs.
- **Not unbounded.** Each loop has a budget and stop conditions, and returns a structured result plus its ledger to the main agent. None pushes code without explicit user instruction.
- **Not replacements for the skill.** A subagent loads ~5–10 nodes for its workflow. The main agent still owns the full graph and handles questions that don't match any subagent.

## Spec

These files follow the [Claude Code subagent format](https://code.claude.com/docs/en/sub-agents):

```yaml
---
name: subagent-name              # lowercase, hyphens, matches filename
description: When to spawn…      # one line, starts with "Load when"
tools: Read, Grep, Edit, Bash    # whitelist; list Agent only if it spawns subagents
model: sonnet                    # or opus / haiku / inherit
maxTurns: 30                     # hard turn cap; the generator reuses it per harness
effort: high                     # low / medium / high / xhigh / max
color: blue                      # Claude Code UI colour
---
```

Keep every field on one line (the generator's parser and CI's grep both expect it). Plugin-installed agents ignore `permissionMode`, `mcpServers` and `hooks`, so the agents here don't use them. The body is a system prompt: under 150 lines, with `## Skill root`, `## Loop` and `## Soul` sections.

## Adding a new subagent

Don't, unless:

1. The workflow appears in real installer logs at least 5 times.
2. It can't be handled by the main agent loading 3–4 nodes inline.
3. It has a clearly bounded scope that won't drift into general-purpose review.

If those three pass: add `plugin/agents/<name>.md` (with `## Skill root`, `## Loop` and `## Soul`) and its path to the `agents` list in `.claude-plugin/plugin.json`, run `node scripts/build-agents.mjs`, add a row to `references/meta/skill-router.md`, `references/meta/routing-table.md`, [[SKILL]] "Workflow subagents", `eve/agent/instructions.md` "Delegation" and this page, run `node scripts/build-registry.mjs`, and bump the skill version.

## Related

- [[SKILL]] — the Map of Content these subagents extend.
- [SOUL.md](SOUL.md) — the identity layer every subagent inherits.
- [AGENTS.md](../AGENTS.md) — repo-level editing rules; "Subagents" entry in File conventions.
- [plugin/harness/README.md](../plugin/harness/README.md) — where each generated agent installs.
