import { Stage, Window, Prompt, Caret } from '../../kit'
import '../_de/de.css'

// One line installs everything for every harness it finds, then prints a summary.
const ROWS: [string, string, boolean][] = [
  ['skill', '~/.agents/skills/design-engineering', true],
  ['Claude Code', 'plugin, 13 agents, design-check hook', true],
  ['Codex', '13 agents (.toml)', true],
  ['Cursor', '13 agents', true],
  ['Gemini', '13 agents', true],
  ['OpenCode', 'not found, skipped', false],
]

export default function Install() {
  return (
    <Stage width={720} height={380} className="de">
      {() => (
        <Window chrome="terminal" title="~ — zsh" className="de-win">
          <div className="de-term">
            <Prompt path="~">curl -fsSL https://raw.githubusercontent.com/AgentsORG/design-engineering/main/install.sh | bash</Prompt>
            <div className="ss-term__line dim">detected  claude  codex  cursor  gemini</div>
            <div className="ss-term__line de-gap" />
            {ROWS.map(([p, w, ok]) => (
              <div key={p} className={`ss-term__line de-pre${ok ? '' : ' dim'}`}>
                <span className={ok ? 'ok' : 'dim'}>{ok ? '✓' : '–'}</span>{'  '}{p.padEnd(13)}{w}
              </div>
            ))}
            <div className="ss-term__line de-gap" />
            <div className="ss-term__line">verify  /design-engineering  @agent-design-council</div>
            <Prompt path="~"><Caret /></Prompt>
          </div>
        </Window>
      )}
    </Stage>
  )
}
