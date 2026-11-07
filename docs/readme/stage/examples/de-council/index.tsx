import { Card, Meter, Prompt, Stage, Text, Window } from '../../kit'
import { Input, Result, Turn } from '../_de/claude'
import '../_de/de.css'

// Built from examples/ai-cards (an answer that carries a card, kept as the
// record) inside examples/hero-demo's Claude Code terminal, with
// examples/static-card's satellite. The council runs, then answers with the
// table council.mjs prints (cmd-council, Output): one row per scored
// delegate, one column per round. The satellite is the last round by
// category for one judge, on one solid accent. Corner bleed: the terminal
// is inset top-left and runs off the right and the bottom; the card sits
// over the terminal's empty lower right, a gutter from both stage edges.
const ROUNDS: [string, string[]][] = [
  ['Claude (opus)', ['7.2/10', '8.4/10', '9.2/10']],
  ['Codex (gpt-6.1-sol)', ['6.8/10', '8.1/10', '9.0/10']],
]
const CATEGORIES: [string, number][] = [['Typography', 9.4], ['Hierarchy', 9.2], ['Contrast', 9.6], ['Motion', 9.0]]
const COLS = { gridTemplateColumns: '21ch 10ch 10ch 10ch' }

export default function Council() {
  return (
    <Stage width={800} height={440} className="de de-council">
      {() => (
        <>
          <Window chrome="terminal" title="my-app — claude" className="de-win" style={{ width: 800, height: 460 }}>
            <div className="ss-term de-term">
              <Prompt path="~/my-app">claude</Prompt>
              <div className="w">{'> /design-engineering council the billing page'}</div>
              <div className="gap" />
              <Turn tool><span className="w">Bash</span>(node scripts/council.mjs --target "Billing settings" --stage)</Turn>
              <Result>Round 3 · Claude and Codex scored · Gemini read as jester</Result>
              <div className="gap" />
              <Turn><span className="w">Council review</span>{'  '}<span className="dim">Rounds: 3</span></Turn>
              <div className="de-cc-table">
                <div style={COLS}><span>Delegate</span><span>Round 1</span><span>Round 2</span><span>Round 3</span></div>
                {ROUNDS.map(([who, scores]) => (
                  <div key={who} style={COLS}><span>{who}</span>{scores.map((s, i) => <span key={i} className={i === 2 ? 'w' : undefined}>{s}</span>)}</div>
                ))}
              </div>
              <div>{'  Missing: none'}</div>
              <Input />
            </div>
          </Window>
          <Card className="de-sat de-council__card" pad="medium" gap={10}>
            <Text className="de-label">Claude, round 3 by category</Text>
            {CATEGORIES.map(([name, v]) => (
              <div key={name} className="de-council__row">
                <Text className="de-sub">{name}</Text>
                <Meter value={v / 10} />
                <Text className="de-num">{v.toFixed(1)}</Text>
              </div>
            ))}
          </Card>
        </>
      )}
    </Stage>
  )
}
