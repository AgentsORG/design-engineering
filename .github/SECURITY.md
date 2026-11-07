# Security Policy

## Supported versions

This repository ships a markdown **agent skill** plus a small amount of code that runs on your machine: the skill scripts (`skills/design-engineering/scripts/*.mjs`, including `council.mjs` and `grade.mjs`, which call the model CLIs you already have installed), the repo build scripts (`scripts/*.mjs`, `bench/*.mjs`), the one-line installers (`install.sh`, `install.ps1`), the optional Claude Code design-check hook, and the optional eve runtime (`eve/`), which serves an MCP endpoint on `localhost` for local development. Nothing here collects user data or phones home. The security surface is therefore:

- Prompt-injection content in atomic nodes or subagent files (someone proposes text that manipulates the consuming agent).
- Misleading external links (a node points at a malicious URL).
- The installers or the hook doing more than they print (they must back up any settings file before editing it, never touch credentials, and honour `--dry-run`).
- `council.mjs` or `grade.mjs` sending something they should not to a model CLI (`grade.mjs` redacts secret-looking strings before any judge sees the episode; `council.mjs` sends the brief and evidence you pass it as-is, so do not hand it files that hold secrets).
- The eve MCP channel being reachable beyond `localhost` (it uses `localDev()` auth and is not meant to be exposed).
- A dependency in the CI workflow or `eve/package.json` with a known CVE.
- A plugin manifest (`.claude-plugin/marketplace.json` and the others) pointing at unintended skills or agents.

| Version | Supported |
| --- | --- |
| `4.x` | ✅ Yes |
| `< 4.0` | ❌ No (upgrade to the latest release) |

Latest is what's in `main`. We tag releases on the `v*` namespace.

## Reporting a vulnerability

**Do not open a public issue for security reports.**

Email: **harshitkhemani@gmail.com**

Include:

1. A description of the issue (what / where / why it matters).
2. Steps to reproduce — what query triggered the bad behavior, which node returned what.
3. The file path and (if possible) the offending lines.
4. The agent / model the issue showed up on (Claude Opus, Sonnet, GPT, Gemini, and which harness: Claude Code, Codex, Cursor, Gemini CLI, OpenCode, eve) — see [cross-model-testing](../skills/design-engineering/references/meta/cross-model-testing.md) for why this matters.
5. Your suggested fix, if any.

You should receive an acknowledgment within **3 business days**. A triage and proposed fix within **14 days** for confirmed issues.

## Disclosure timeline

- T+0: report received, acknowledged.
- T+3 days: triage complete, severity assessed.
- T+14 days: fix proposed (PR or direct commit) or report closed with explanation.
- T+30 days: public disclosure (issue + commit) if not earlier coordinated.

## Out of scope

- General "this advice is bad" disagreements — those go in a regular issue or PR.
- Disagreements with the opinions in `pov.md` (it's customizable for a reason).
- Style issues in the markdown linter — open a PR.

## Hall of fame

Reporters who responsibly disclose security issues will be credited (with permission) in `CHANGELOG.md` for the release that fixes the issue.
