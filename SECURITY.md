# Security Policy

## Supported versions

This repository ships a markdown-based **agent skill** — no executable code, no servers, no user data is collected by the skill itself. The "security surface" is therefore:

- Prompt-injection content in atomic nodes (someone proposes a node whose text manipulates the consuming agent).
- Misleading external links (a node points at a malicious URL).
- A dependency in the CI workflow with a known CVE.
- The `.claude-plugin/marketplace.json` manifest pointing at unintended skills.

| Version | Supported |
| --- | --- |
| `1.x` | ✅ Yes |
| `< 1.0` | ❌ No (not published) |

Latest is what's in `main`. We tag releases on the `v*` namespace.

## Reporting a vulnerability

**Do not open a public issue for security reports.**

Email: **harshitkhemani@gmail.com**

Include:

1. A description of the issue (what / where / why it matters).
2. Steps to reproduce — what query triggered the bad behavior, which node returned what.
3. The file path and (if possible) the offending lines.
4. The agent / model the issue showed up on (Claude Opus, Sonnet, GPT-4, etc.) — see [[meta/cross-model-testing]] for why this matters.
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
