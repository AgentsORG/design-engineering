import { Card, Prompt, Row, Stage, Text, Window } from '../../kit'
import { Input, Result, Turn } from '../_de/claude'
import '../_de/de.css'

// Built from examples/static-card (a hero window and a detail card that
// straddles its edge, one row selected) with examples/hero-demo's Claude
// Code terminal as the hero. The terminal runs the design-council agent in
// Claude Code; the card is the same agent as build-agents.mjs writes it
// for each harness, Claude Code selected because that is the session shown.
// Corner bleed: the terminal is inset top-left and runs off the bottom;
// the card straddles its right edge, about half outside, over empty
// terminal, a gutter from the stage's right edge.
const HARNESSES: [string, string][] = [
  ['Claude Code', 'agents/design-council.md (plugin)'],
  ['Codex', '~/.codex/agents/design-council.toml'],
  ['Cursor', '~/.cursor/agents/design-council.md'],
  ['Gemini CLI', '~/.gemini/agents/design-council.md'],
  ['OpenCode', '~/.config/opencode/agents/design-council.md'],
]

export default function Agents() {
  return (
    <Stage width={800} height={372} className="de de-agents">
      {() => (
        <>
          <Window chrome="terminal" title="my-app — claude" className="de-win" style={{ width: 600, height: 420 }}>
            <div className="ss-term de-term">
              <Prompt path="~/my-app">claude</Prompt>
              <div className="w">{'> @agent-design-council the billing page'}</div>
              <div className="gap" />
              <Turn tool><span className="w">design-council</span>(Council the billing page)</Turn>
              <Result>Done (34 tool uses · 2m 41s)</Result>
              <div className="gap" />
              <Turn>Round 3: both scored judges clear the bar.</Turn>
              <div>{'  The Council review table is in the PR.'}</div>
              <Input />
            </div>
          </Window>
          <Card className="de-sat de-agents__card" pad="small" gap={2}>
            <div className="de-agents__head">
              <Text className="de-mono de-agents__name">design-council</Text>
              <Text className="de-label">one agent, five harnesses</Text>
            </div>
            {HARNESSES.map(([name, file], i) => (
              <Row key={name} pad={6} selected={i === 0} title={<Text className="de-h">{name}</Text>} subtitle={<Text className="de-mono de-agents__file">{file}</Text>} />
            ))}
          </Card>
        </>
      )}
    </Stage>
  )
}
