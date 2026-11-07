#!/usr/bin/env bash
# design-engineering installer: skill + Claude Code plugin + agents for every
# detected harness + design-check hook (+ optional eve MCP and companions).
#
#   curl -fsSL https://raw.githubusercontent.com/AgentsORG/design-engineering/main/install.sh | bash
#   curl -fsSL .../install.sh | bash -s -- --dry-run
#   DE_REF=v4.0.0 bash install.sh --harness claude,codex --yes
#
# Run from a checkout and it installs that checkout instead of downloading.
# Idempotent; backs up any settings file before editing; never reads or writes
# credentials. --uninstall removes exactly what the manifest says it installed.
set -euo pipefail

DE_REPO="${DE_REPO:-AgentsORG/design-engineering}"
DE_REF="${DE_REF:-latest}"
CFG_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/design-engineering"
MANIFEST="$CFG_DIR/manifest.txt"
SKILL_DST="$HOME/.agents/skills/design-engineering"
ALL_PARTS="skill,plugin,agents,hooks"
ALL_HARNESS="claude,codex,cursor,gemini,opencode"

DRY=0 YES=0 UNINSTALL=0 HOOKS=1 MCP=0 COMPANIONS=0
ONLY="" HARNESS=""

usage() {
  cat <<'EOF'
Usage: install.sh [options]
  --dry-run             print every change, change nothing
  --only <parts>        comma list of: skill,plugin,agents,hooks,mcp,companions
  --harness <list>      comma list of: claude,codex,cursor,gemini,opencode (default: detected)
  --yes, -y             no prompts
  --with-hooks          install the design-check hook (default)
  --no-hooks            skip the hook (and switch the plugin's hook off)
  --with-mcp            register the local eve MCP server with detected CLIs
  --with-companions     also install companion skills (agentation)
  --uninstall           remove what a previous run installed
  -h, --help            this text
Env: DE_REF (latest release by default; a tag like v4.2.1, or a branch like main), DE_REPO (default AgentsORG/design-engineering),
     DE_USE_SKILLS_CLI=1 (install the skill with npx skills instead of copying it from the download)
EOF
}

while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run) DRY=1 ;;
    --only) ONLY="${2:?--only needs a list}"; shift ;;
    --only=*) ONLY="${1#*=}" ;;
    --harness) HARNESS="${2:?--harness needs a list}"; shift ;;
    --harness=*) HARNESS="${1#*=}" ;;
    -y|--yes) YES=1 ;;
    --with-hooks) HOOKS=1 ;;
    --no-hooks) HOOKS=0 ;;
    --with-mcp) MCP=1 ;;
    --with-companions) COMPANIONS=1 ;;
    --uninstall) UNINSTALL=1 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "unknown option: $1" >&2; usage >&2; exit 64 ;;
  esac
  shift
done

PARTS="$ALL_PARTS"
[ "$MCP" = 1 ] && PARTS="$PARTS,mcp"
[ "$COMPANIONS" = 1 ] && PARTS="$PARTS,companions"
[ -n "$ONLY" ] && PARTS="$ONLY"
[ "$HOOKS" = 0 ] && PARTS="$(echo ",$PARTS," | sed 's/,hooks,/,/g; s/^,//; s/,$//')"
want() { case ",$PARTS," in *",$1,"*) return 0 ;; esac; return 1; }

SUMMARY=()
note() { local st="$3"; [ "$DRY" = 1 ] && st="would: $st"; SUMMARY+=("$1|$2|$st"); }   # part|target|status
say() { printf '%s\n' "$*"; }
run() {
  if [ "$DRY" = 1 ]; then say "  [dry-run] $*" >&2; return 0; fi
  "$@"
}
have() { command -v "$1" >/dev/null 2>&1; }
# Windows (Git Bash/MSYS): write C:/... paths into config files that native tools read
native() { if have cygpath; then cygpath -m "$1"; else printf "%s" "$1"; fi; }

bkey() { printf "home%s" "${1#$HOME}" | sed "s#[/:]#__#g"; }
record() { [ "$DRY" = 1 ] && return 0; mkdir -p "$CFG_DIR"; grep -qxF "$1" "$MANIFEST" 2>/dev/null || printf '%s\n' "$1" >>"$MANIFEST"; }

# copy one file; back up a pre-existing different file we did not install
put_file() {
  local src="$1" dst="$2"
  if [ -f "$dst" ] && cmp -s "$src" "$dst"; then echo same; return 0; fi
  if [ -f "$dst" ] && ! grep -qxF "file:$dst" "$MANIFEST" 2>/dev/null; then
    run mkdir -p "$CFG_DIR/backups"
    run cp "$dst" "$CFG_DIR/backups/$(bkey "$dst").$(date +%Y%m%d%H%M%S)"
  fi
  run mkdir -p "$(dirname "$dst")"
  run cp "$src" "$dst"
  record "file:$dst"
  echo new
}

# ---------- source: local checkout or downloaded tarball ----------
SCRIPT_DIR=""
if [ -n "${BASH_SOURCE[0]:-}" ] && [ -f "${BASH_SOURCE[0]}" ]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
fi
SRC="" MODE=""
if [ -n "$SCRIPT_DIR" ] && [ -f "$SCRIPT_DIR/skills/design-engineering/SKILL.md" ] && [ -d "$SCRIPT_DIR/plugin/agents" ]; then
  SRC="$SCRIPT_DIR"; MODE="local checkout"
fi

fetch_source() {
  [ -n "$SRC" ] && return 0
  have curl || { echo "curl is required to download $DE_REPO" >&2; exit 1; }
  have tar || { echo "tar is required" >&2; exit 1; }
  DE_TMP="$(mktemp -d)"   # global: an EXIT trap on a local var is unbound under set -u
  trap 'rm -rf "${DE_TMP:-}"' EXIT
  local tmp="$DE_TMP"
  # A release ships a ~1 MB install bundle; a branch only has the full repo snapshot.
  local bundle="" snap="$DE_REF"
  case "$DE_REF" in
    latest) bundle="https://github.com/$DE_REPO/releases/latest/download/design-engineering-install.zip"; snap=main ;;
    v[0-9]*) bundle="https://github.com/$DE_REPO/releases/download/$DE_REF/design-engineering-install.zip" ;;
  esac
  if [ -n "$bundle" ] && have unzip && curl -fsSL -o "$tmp/src.zip" "$bundle"; then
    say "Downloaded $DE_REPO ($DE_REF) install bundle"
    unzip -q "$tmp/src.zip" -d "$tmp" && rm -f "$tmp/src.zip"
    MODE="release $DE_REF"
  else
    say "Downloading $DE_REPO@$snap ..."
    curl -fsSL "https://codeload.github.com/$DE_REPO/tar.gz/$snap" | tar -xz -C "$tmp"
    MODE="download $snap"
  fi
  SRC="$(find "$tmp" -mindepth 1 -maxdepth 1 -type d | head -n1)"
}

# ---------- harness detection ----------
detect() {
  case "$1" in
    claude) have claude || [ -d "$HOME/.claude" ] ;;
    codex) have codex || [ -d "$HOME/.codex" ] ;;
    cursor) have cursor-agent || have cursor || [ -d "$HOME/.cursor" ] ;;
    gemini) have gemini || have agy || [ -d "$HOME/.gemini" ] ;;
    opencode) have opencode || [ -d "$HOME/.config/opencode" ] ;;
    *) return 1 ;;
  esac
}
if [ -z "$HARNESS" ]; then
  for h in ${ALL_HARNESS//,/ }; do detect "$h" && HARNESS="$HARNESS,$h"; done
  HARNESS="${HARNESS#,}"
fi
use_h() { case ",$HARNESS," in *",$1,"*) return 0 ;; esac; return 1; }

agent_dir() {
  case "$1" in
    claude) echo "$HOME/.claude/agents" ;;
    codex) echo "$HOME/.codex/agents" ;;
    cursor) echo "$HOME/.cursor/agents" ;;
    gemini) echo "$HOME/.gemini/agents" ;;
    opencode) echo "$HOME/.config/opencode/agents" ;;
  esac
}
agent_src() {
  case "$1" in
    claude) echo "$SRC/plugin/agents" ;;
    *) echo "$SRC/plugin/harness/$1/agents" ;;
  esac
}

plugin_installed() { have claude && claude plugin list 2>/dev/null | grep -q 'design-engineering'; }

print_summary() {
  say ""
  printf '%-11s %-58s %s\n' PART TARGET STATUS
  printf '%-11s %-58s %s\n' ----------- ---------------------------------------------------------- ------
  local row p t s
  for row in "${SUMMARY[@]+"${SUMMARY[@]}"}"; do
    IFS='|' read -r p t s <<<"$row"
    printf '%-11s %-58s %s\n' "$p" "$t" "$s"
  done
  say ""
}


# ---------- uninstall ----------
if [ "$UNINSTALL" = 1 ]; then
  say "Uninstalling design-engineering"
  if [ -f "$MANIFEST" ]; then
    # pass 1: config edits (needs merge-settings.mjs, so before files go)
    while IFS= read -r line; do
      case "$line" in
        settings:*) s="${line#settings:}"
          if [ -f "$CFG_DIR/hooks/merge-settings.mjs" ] && have node; then
            run node "$CFG_DIR/hooks/merge-settings.mjs" --settings "$s" --remove && note hooks "$s" "hook removed"
          else
            note hooks "$s" "remove the design-check.mjs entry by hand"
          fi ;;
        plugin:*) if have claude; then run claude plugin uninstall design-engineering@agentsorg -s user || true; note plugin claude removed; fi ;;
        mcp:claude) if have claude; then run claude mcp remove design-engineering -s user || true; note mcp claude removed; fi ;;
      esac
    done <"$MANIFEST"
    # pass 2: files and folders we copied
    while IFS= read -r line; do
      case "$line" in
        file:*) f="${line#file:}"
          bak="$(ls -1 "$CFG_DIR/backups/$(bkey "$f")".* 2>/dev/null | sort | tail -n1 || true)"
          if [ -n "$bak" ]; then run mv "$bak" "$f"; note remove "$f" "restored your earlier copy"
          elif [ -e "$f" ]; then run rm -f "$f"; note remove "$f" removed; fi ;;
        dir:*) d="${line#dir:}"; if [ -e "$d" ]; then run rm -rf "$d"; note remove "$d" removed; fi ;;
      esac
    done <"$MANIFEST"
    run rm -rf "$CFG_DIR/hooks" "$CFG_DIR/hooks.off" "$MANIFEST"
    [ -d "$CFG_DIR/backups" ] && say "Backups kept in $CFG_DIR/backups"
  else
    say "No manifest at $MANIFEST; nothing recorded to remove."
  fi
  print_summary
  say "Skills added with 'npx skills' are removed with: npx skills remove design-engineering -g"
  exit 0
fi

# ---------- install ----------
fetch_source
VERSION="$(sed -n 's/.*"version": *"\([^"]*\)".*/\1/p' "$SRC/.claude-plugin/plugin.json" 2>/dev/null | head -n1)"
say "design-engineering ${VERSION:-?} from $MODE"
say "Harnesses: ${HARNESS:-none detected}"
say "Parts:     $PARTS"
[ "$DRY" = 1 ] && say "Dry run: nothing will be changed."
say ""

if [ "$YES" != 1 ] && [ "$DRY" != 1 ] && [ -t 0 ]; then
  printf 'Proceed? [Y/n] '; read -r ans || ans=""
  case "$ans" in n|N|no) say "Aborted."; exit 1 ;; esac
fi

USE_PLUGIN=0
if want plugin && use_h claude && have claude; then USE_PLUGIN=1; fi

# skill: skills.sh layout (~/.agents/skills) is read by Codex, Cursor, OpenCode, Gemini
if want skill; then
  if [ "$MODE" != "local checkout" ] && have npx && [ "${DE_USE_SKILLS_CLI:-0}" = 1 ]; then
    agents_flag=""
    for h in ${HARNESS//,/ }; do
      case "$h" in claude) [ "$USE_PLUGIN" = 1 ] || agents_flag="$agents_flag claude-code" ;;
        gemini) agents_flag="$agents_flag gemini-cli" ;; *) agents_flag="$agents_flag $h" ;; esac
    done
    if [ -n "$agents_flag" ]; then
      # shellcheck disable=SC2086
      if run npx -y skills add "$DE_REPO" -g -y -a $agents_flag; then
        note skill "npx skills ($agents_flag )" installed
      else
        say "npx skills failed; copying the skill from the downloaded release instead."
        SKILL_COPY=1
      fi
    else
      note skill "npx skills" "skipped (plugin covers Claude Code)"
    fi
  else
    SKILL_COPY=1
  fi
  if [ "${SKILL_COPY:-0}" = 1 ]; then
    if [ -d "$SKILL_DST" ] && [ ! -f "$SKILL_DST/.de-installed" ] && [ ! -L "$SKILL_DST" ]; then
      run mkdir -p "$CFG_DIR/backups"
      run mv "$SKILL_DST" "$CFG_DIR/backups/design-engineering-skill.$(date +%Y%m%d%H%M%S)"
    fi
    run rm -rf "$SKILL_DST"
    run mkdir -p "$(dirname "$SKILL_DST")"
    run cp -R "$SRC/skills/design-engineering" "$SKILL_DST"
    [ "$DRY" = 1 ] || : >"$SKILL_DST/.de-installed"
    record "dir:$SKILL_DST"
    note skill "$SKILL_DST" "copied"
    # harnesses whose global skill dir is not ~/.agents/skills
    for h in ${HARNESS//,/ }; do
      case "$h" in
        claude) [ "$USE_PLUGIN" = 1 ] && continue; d="$HOME/.claude/skills/design-engineering" ;;
        gemini) d="$HOME/.gemini/skills/design-engineering" ;;
        opencode) d="$HOME/.config/opencode/skills/design-engineering" ;;
        *) continue ;;
      esac
      if [ -e "$d" ] && [ ! -f "$d/.de-installed" ]; then note skill "$d" "kept (existing, not ours)"; continue; fi
      run rm -rf "$d"; run mkdir -p "$(dirname "$d")"; run cp -R "$SRC/skills/design-engineering" "$d"
      [ "$DRY" = 1 ] || : >"$d/.de-installed"
      record "dir:$d"; note skill "$d" copied
    done
  fi
fi

# Claude Code plugin (skill + agents + hook in one)
if [ "$USE_PLUGIN" = 1 ]; then
  if [ "$DRY" != 1 ] && plugin_installed; then
    run claude plugin marketplace update agentsorg >/dev/null 2>&1 || true
    note plugin "design-engineering@agentsorg" "already installed (marketplace updated)"
  else
    mk_src="$DE_REPO"; [ "$DE_REF" != main ] && [ "$DE_REF" != latest ] && mk_src="https://github.com/$DE_REPO.git#$DE_REF"
    run claude plugin marketplace add "$mk_src" || true
    run claude plugin install design-engineering@agentsorg -s user
    note plugin "design-engineering@agentsorg" installed
  fi
  record "plugin:design-engineering@agentsorg"
elif want plugin && use_h claude; then
  note plugin claude "skipped (claude CLI not on PATH)"
fi

# agents per harness
if want agents; then
  for h in ${HARNESS//,/ }; do
    if [ "$h" = claude ] && [ "$USE_PLUGIN" = 1 ]; then note agents claude "from plugin"; continue; fi
    src="$(agent_src "$h")" dst="$(agent_dir "$h")"
    if [ ! -d "$src" ]; then note agents "$h" "no files in $(basename "$(dirname "$src")")/agents"; continue; fi
    n=0 changed=0
    ext=md; [ "$h" = codex ] && ext=toml
    for f in "$src"/*."$ext"; do
      [ -f "$f" ] || continue
      r="$(put_file "$f" "$dst/$(basename "$f")")"; n=$((n + 1)); [ "$r" = new ] && changed=$((changed + 1))
    done
    note agents "$dst" "$n files ($changed new/updated)"
  done
fi

# hooks
if [ "$HOOKS" = 0 ] && [ "$USE_PLUGIN" = 1 ]; then
  run mkdir -p "$CFG_DIR"; [ "$DRY" = 1 ] || : >"$CFG_DIR/hooks.off"
  note hooks "plugin hook" "switched off ($CFG_DIR/hooks.off)"
fi
if want hooks; then
  run mkdir -p "$CFG_DIR/hooks"
  for f in design-check.mjs merge-settings.mjs; do put_file "$SRC/plugin/hooks/$f" "$CFG_DIR/hooks/$f" >/dev/null; done
  [ -f "$CFG_DIR/hooks.off" ] && run rm -f "$CFG_DIR/hooks.off"
  if [ "$USE_PLUGIN" = 1 ]; then
    note hooks "plugin/hooks/hooks.json" "on (PostToolUse Edit|Write)"
  elif use_h claude; then
    settings="$HOME/.claude/settings.json"
    flag=""; [ "$DRY" = 1 ] && flag="--dry-run"
    if have node; then
      if [ "$DRY" = 1 ]; then
        say "  [dry-run] node merge-settings.mjs --settings $settings --command 'node \"$CFG_DIR/hooks/design-check.mjs\"'"
      else
        node "$CFG_DIR/hooks/merge-settings.mjs" --settings "$settings" --command "node \"$(native "$CFG_DIR")/hooks/design-check.mjs\"" $flag
      fi
      record "settings:$settings"; note hooks "$settings" "PostToolUse merged (backup kept)"
    else
      note hooks "$settings" "skipped (node not found)"
    fi
  fi
  for h in codex gemini cursor opencode; do
    use_h "$h" && note hooks "$h" "not wired (see docs/install.md)"
  done
fi

# optional: eve MCP server (start it in a checkout with: cd eve && npm install && npm run dev)
if want mcp; then
  url="http://localhost:2000/eve/v1/mcp"
  if use_h claude && have claude; then
    if [ "$DRY" != 1 ] && claude mcp get design-engineering >/dev/null 2>&1; then
      note mcp claude "already registered"
    else
      run claude mcp add --transport http -s user design-engineering "$url"; record "mcp:claude"; note mcp claude "$url"
    fi
  fi
  for h in codex cursor gemini opencode; do use_h "$h" && note mcp "$h" "add $url by hand (docs/install.md)"; done
fi

# optional companions
if want companions; then
  if have npx; then
    run npx -y skills add benjitaylor/agentation -g -y && note companions agentation installed
  else
    note companions agentation "skipped (npx not found)"
  fi
  note companions stageshow "manual: https://benji.org/stageshow"
fi

# ---------- summary ----------
print_summary
say "Verify:"
use_h claude && say "  Claude Code: /design-engineering review   then  @agent-design-council (or @agent-ui-reviewer)"
use_h codex && say "  Codex:       ask 'use the ui-reviewer agent on src/'  (agents in ~/.codex/agents)"
use_h cursor && say "  Cursor:      /design-engineering in Agent chat; subagents from ~/.cursor/agents"
use_h gemini && say "  Gemini:      gemini, then /agents list"
use_h opencode && say "  OpenCode:    @ui-reviewer"
say "  Uninstall:   bash install.sh --uninstall   (manifest: $MANIFEST)"
[ "$DRY" = 1 ] && say "" && say "Dry run complete. Re-run without --dry-run to apply."
exit 0
