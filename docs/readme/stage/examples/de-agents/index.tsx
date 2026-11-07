import { Bar, Stage, Text, Window, Badge, Row } from '../../kit'
import '../_de/de.css'

// One canonical agent, emitted in every harness's own format.
const HARNESS = ['Claude Code', 'Codex', 'Cursor', 'Gemini', 'OpenCode']
const AGENTS: [string, string][] = [
  ['design-council', 'harness/codex/agents/design-council.toml'],
  ['design-judge', 'harness/codex/agents/design-judge.toml'],
  ['design-grader', 'harness/codex/agents/design-grader.toml'],
]

export default function Agents() {
  return (
    <Stage width={720} height={380} className="de">
      {() => (
        <Window title="Codex agents" sidebarWidth={168} className="de-win" sidebar={
          <div className="de-side">
            <Text className="de-label de-side__head">Harness</Text>
            {HARNESS.map((h, i) => (
              <div key={h} className="de-nav" data-on={i === 1 || undefined}>
                <Text className="de-small de-strong">{h}</Text>
              </div>
            ))}
          </div>
        }>
          <div className="de-body de-body--side">
            <div style={{ width: 500 }}>
              {AGENTS.map(([n, p]) => (
                <div key={n} className="de-rw"><Row pad={0} title={<Text className="de-mono">{n}</Text>} subtitle={<Text className="de-code de-dim">{p}</Text>}>
                  <Badge>loop, 3 rounds</Badge>
                </Row></div>
              ))}
              {[0, 1, 2].map((i) => <div key={i} className="de-rw"><Row pad={0} title={<Bar w={110} tone={3} />} subtitle={<Bar w={220} tone={2} />} /></div>)}
            </div>
          </div>
        </Window>
      )}
    </Stage>
  )
}
