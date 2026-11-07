import { Caret, Prompt, Stage, Window } from '../../kit'
import '../_de/de.css'

// Built from examples/hero-demo's terminal, here the hero: the kit's
// Window chrome="terminal", a Prompt and a Caret. The output is install.sh's
// own, line for line, on a machine with Claude Code and Codex: its header,
// the PART / TARGET / STATUS summary, the Verify lines, then the prompt
// back. One liberty: the script pads TARGET to 58 columns
// (printf '%-11s %-58s %s'); it is 40 here so STATUS stays inside the crop.
// Corner bleed: inset top-left, off the right; the window ends a gutter
// under the caret.
const CMD = 'curl -fsSL https://raw.githubusercontent.com/AgentsORG/design-engineering/main/install.sh | bash'
const row = (p: string, t: string, s = '') => `${p.padEnd(11)} ${t.padEnd(44)} ${s}`
const ROWS: [string, string, string][] = [
  ['skill', '/Users/ada/.agents/skills/design-engineering', 'copied'],
  ['plugin', 'design-engineering@agentsorg', 'installed'],
  ['agents', 'claude', 'from plugin'],
  ['agents', '/Users/ada/.codex/agents', '13 files (13 new/updated)'],
  ['hooks', 'plugin/hooks/hooks.json', 'on (PostToolUse Edit|Write)'],
  ['hooks', 'codex', 'not wired (see docs/install.md)'],
]

export default function Install() {
  return (
    <Stage width={800} height={540} className="de de-install">
      {() => (
        <Window chrome="terminal" title="~ — zsh" className="de-win" style={{ width: 830, height: 560 }}>
          <div className="ss-term de-term">
            <Prompt path="~">{CMD}</Prompt>
            <div>Downloaded AgentsORG/design-engineering (latest) install bundle</div>
            <div>design-engineering 4.2.3 from release latest</div>
            <div>Harnesses: claude,codex</div>
            <div>Parts:     skill,plugin,agents,hooks</div>
            <div className="gap" />
            <div className="w">{row('PART', 'TARGET', 'STATUS')}</div>
            <div className="dim">{row('-'.repeat(11), '-'.repeat(44), '-'.repeat(6))}</div>
            {ROWS.map(([p, t, s], i) => (
              <div key={i}>{row(p, t)}<span className={s.startsWith('not') ? 'dim' : 'ok'}>{s}</span></div>
            ))}
            <div className="gap" />
            <div className="w">Verify:</div>
            <div>{'  Claude Code: '}<span className="a">/design-engineering review</span>{'   then  '}<span className="a">@agent-design-council</span>{' (or @agent-ui-reviewer)'}</div>
            <div>{"  Codex:       ask 'use the ui-reviewer agent on src/'  (agents in ~/.codex/agents)"}</div>
            <div className="dim">{'  Uninstall:   bash install.sh --uninstall   (manifest: /Users/ada/.config/design-engineering/manifest.txt)'}</div>
            <Prompt path="~"><Caret /></Prompt>
          </div>
        </Window>
      )}
    </Stage>
  )
}
