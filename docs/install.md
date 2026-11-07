# Install

One command sets up everything the package ships: the skill, the Claude Code plugin, the workflow agents for every harness it finds, the design-check hook, and (opt-in) the eve MCP server and companion skills.

```bash
curl -fsSL https://raw.githubusercontent.com/AgentsORG/design-engineering/main/install.sh | bash
```

```powershell
irm https://raw.githubusercontent.com/AgentsORG/design-engineering/main/install.ps1 | iex
```

See every change first, without making any:

```bash
curl -fsSL https://raw.githubusercontent.com/AgentsORG/design-engineering/main/install.sh | bash -s -- --dry-run
```

```powershell
& ([scriptblock]::Create((irm https://raw.githubusercontent.com/AgentsORG/design-engineering/main/install.ps1))) -DryRun
```

## Options

| `install.sh` | `install.ps1` | What it does |
|---|---|---|
| `--dry-run` | `-DryRun` | Print every change; change nothing |
| `--only <parts>` | `-Only <parts>` | Comma list of `skill`, `plugin`, `agents`, `hooks`, `mcp`, `companions` |
| `--harness <list>` | `-Harness <list>` | Comma list of `claude`, `codex`, `cursor`, `gemini`, `opencode` (default: the ones detected) |
| `--yes` | `-Yes` | No prompt |
| `--with-hooks` / `--no-hooks` | `-WithHooks` / `-NoHooks` | Hook on (default) or off |
| `--with-mcp` | `-WithMcp` | Register the local eve MCP server |
| `--with-companions` | `-WithCompanions` | Also install the Agentation skill |
| `--uninstall` | `-Uninstall` | Remove what a previous run installed |

By default the installer downloads the latest release's install bundle (`design-engineering-install.zip`, about 1 MB: the skill, agents, hooks and manifests) and copies the skill from it, so it never clones the whole repository. Pin a release with `DE_REF=v4.2.3` (`$env:DE_REF = 'v4.2.1'` in PowerShell), or use a branch with `DE_REF=main`, which downloads the full repo snapshot. Set `DE_USE_SKILLS_CLI=1` to install the skill through `npx skills` instead. Run either script from a checkout and it installs that checkout instead of downloading.

The installer detects a harness by its CLI on `PATH` or its config folder in your home directory. It is idempotent: a second run changes only what differs. Before it replaces a file it did not write, it copies the original to `~/.config/design-engineering/backups/`. It backs up `settings.json` next to itself before merging the hook. It never reads or writes credentials. Everything it writes is listed in `~/.config/design-engineering/manifest.txt`, and `--uninstall` removes exactly those entries and puts back the copies it backed up.

## What goes where

| Part | Claude Code | Codex | Cursor | Gemini CLI / Antigravity | OpenCode |
|---|---|---|---|---|---|
| Skill | the plugin, else `~/.claude/skills/design-engineering/` | `~/.agents/skills/design-engineering/` | `~/.agents/skills/design-engineering/` | `~/.gemini/skills/design-engineering/` | `~/.config/opencode/skills/design-engineering/` |
| Agents | the plugin, else `~/.claude/agents/*.md` from `plugin/agents/` | `~/.codex/agents/*.toml` from `plugin/harness/codex/agents/` | `~/.cursor/agents/*.md` from `plugin/harness/cursor/agents/` | `~/.gemini/agents/*.md` from `plugin/harness/gemini/agents/` | `~/.config/opencode/agents/*.md` from `plugin/harness/opencode/agents/` |
| Hook | the plugin's `plugin/hooks/hooks.json`, else merged into `~/.claude/settings.json` | not wired yet | not wired yet | not wired yet | not wired yet |
| eve MCP | `claude mcp add` (opt-in) | by hand, below | by hand, below | by hand, below | by hand, below |

The agents in `plugin/harness/` are generated from `plugin/agents/*.md` by `scripts/build-agents.mjs`; see [plugin/harness/README.md](../plugin/harness/README.md).

## Manual install

### Skill

```bash
npx skills add AgentsORG/design-engineering -g -y
```

Without Node, copy the folder:

```bash
git clone --depth 1 https://github.com/AgentsORG/design-engineering
mkdir -p ~/.agents/skills
cp -R design-engineering/skills/design-engineering ~/.agents/skills/
```

Claude Code reads `~/.claude/skills/`, Gemini CLI `~/.gemini/skills/` and OpenCode `~/.config/opencode/skills/`; copy the same folder there for those harnesses. Codex and Cursor read `~/.agents/skills/`.

### Claude Code plugin

The plugin carries the skill, the agents and the hook in one install.

```bash
claude plugin marketplace add AgentsORG/design-engineering
claude plugin install design-engineering@agentsorg -s user
```

Inside a session it is one step on Claude Code 2.1.275 or later: `/plugin install design-engineering --marketplace AgentsORG/design-engineering` (or `/plugin marketplace add AgentsORG/design-engineering`, then `/plugin install design-engineering@agentsorg`). To pin a release, add the marketplace as `https://github.com/AgentsORG/design-engineering.git#v4.0.0`.

### Agents per harness

From a checkout:

```bash
cp plugin/agents/*.md ~/.claude/agents/                         # Claude Code without the plugin
cp plugin/harness/codex/agents/*.toml ~/.codex/agents/          # Codex
cp plugin/harness/cursor/agents/*.md ~/.cursor/agents/          # Cursor
cp plugin/harness/gemini/agents/*.md ~/.gemini/agents/          # Gemini CLI
cp plugin/harness/opencode/agents/*.md ~/.config/opencode/agents/  # OpenCode
```

Use the project folders instead (`.claude/agents/`, `.codex/agents/`, `.cursor/agents/`, `.gemini/agents/`, `.opencode/agents/`) to scope the agents to one repo. Cursor also reads `.claude/agents/`.

### Design-check hook

After every `Edit` or `Write` to a `.css`, `.scss`, `.tsx`, `.jsx`, `.svg`, `.html`, `.vue` or `.svelte` file, `plugin/hooks/design-check.mjs` runs the deterministic checks from `skills/design-engineering/scripts/grade.mjs` (or a small built-in rule set when the grader is not installed) and adds any findings to the agent's context as a note. It never blocks a tool call and sends nothing over the network.

The plugin wires it through `plugin/hooks/hooks.json`. Without the plugin, copy the script and merge the entry into `~/.claude/settings.json`:

```bash
mkdir -p ~/.config/design-engineering/hooks
cp plugin/hooks/design-check.mjs plugin/hooks/merge-settings.mjs ~/.config/design-engineering/hooks/
node ~/.config/design-engineering/hooks/merge-settings.mjs \
  --settings ~/.claude/settings.json \
  --command "node \"$HOME/.config/design-engineering/hooks/design-check.mjs\""
```

`merge-settings.mjs` backs up the file, adds one `PostToolUse` entry, and leaves everything else alone; `--remove` takes it out again. To edit by hand, merge [plugin/hooks/settings-snippet.json](../plugin/hooks/settings-snippet.json).

Switch the hook off without uninstalling: set `DE_HOOKS=0`, or create `~/.config/design-engineering/hooks.off` (what `--no-hooks` does when the plugin is installed).

### eve MCP server

The eve runtime in `eve/` serves an MCP channel, so any MCP client can hand work to the design-engineering agent. Start it from a checkout with `cd eve && npm install && npm run dev`, then register it:

```bash
claude mcp add --transport http -s user design-engineering http://localhost:2000/eve/v1/mcp
```

For Codex, Cursor, Gemini CLI and OpenCode, add an HTTP MCP server named `design-engineering` with the URL `http://localhost:2000/eve/v1/mcp` in that harness's MCP settings.

### shadcn registry

The same pieces ship as shadcn registry items, for projects that already use the shadcn CLI. Each item installs to the same place the installer uses (the skill to `~/.agents/skills/design-engineering/`, the agents to `~/.claude/agents/`, the starter contract to `~/.design`):

```bash
npx shadcn@latest add https://raw.githubusercontent.com/AgentsORG/design-engineering/main/registry/r/design-engineering.json
npx shadcn@latest add https://raw.githubusercontent.com/AgentsORG/design-engineering/main/registry/r/design-engineering-agents.json
npx shadcn@latest add https://raw.githubusercontent.com/AgentsORG/design-engineering/main/registry/r/design-engineering-design-file.json
npx shadcn@latest add https://raw.githubusercontent.com/AgentsORG/design-engineering/main/registry/r/design-engineering-motion.json
```

`design-engineering-motion` is a theme item: the motion tokens (easing curves and durations) as CSS variables. Before 4.1.0 these items lived under `/main/r/`; that path no longer resolves.

### Companions

```bash
npx skills add benjitaylor/agentation -g -y
```

Stageshow (faux product UI) installs from [benji.org/stageshow](https://benji.org/stageshow).

## Verify

| Harness | Try |
|---|---|
| Claude Code | `/design-engineering review`, then `@agent-design-council` or `@agent-ui-reviewer` |
| Codex | "use the ui-reviewer agent on src/" |
| Cursor | `/design-engineering` in Agent chat |
| Gemini CLI | `/agents list` |
| OpenCode | `@ui-reviewer` |

## Uninstall

```bash
bash install.sh --uninstall
```

```powershell
.\install.ps1 -Uninstall
```

Skills added with `npx skills` come out with `npx skills remove design-engineering -g`; the plugin with `claude plugin uninstall design-engineering@agentsorg`.
