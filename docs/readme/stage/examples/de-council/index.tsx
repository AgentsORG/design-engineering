import { Bar, Stage, Text, Window, Badge, Card, Meter } from '../../kit'
import '../_de/de.css'

// The council: three providers judge before/after evidence, round by round.
// A missing provider is reported, never substituted; the jester is unscored.
const JUDGES: [string, string, string[]][] = [
  ['Claude', 'design-judge', ['6.1', '7.4', '8.3']],
  ['GPT', 'codex exec', ['5.8', '7.1', '8.0']],
  ['Gemini', 'jester, unscored', ['no score', 'no score', 'no score']],
]
const CATS: [string, number][] = [['Typography', 8], ['Hierarchy', 9], ['Contrast', 8], ['Motion', 7]]
const COLS = '150px 60px 60px 60px'

export default function Council() {
  return (
    <Stage width={720} height={380} className="de">
      {() => (
        <>
          <Window title="design-council — PR #212" className="de-win">
            <div className="de-body">
              <div className="de-line" style={{ width: 390 }}>
                <Text className="de-h">Council review</Text>
                <Badge tone="success" dot>Round 3 passed</Badge>
              </div>
              <div className="de-table" style={{ width: 390 }}>
                <div className="de-tr" data-head style={{ gridTemplateColumns: COLS }}>
                  <Text className="de-label">Judge</Text><Text className="de-label">R1</Text><Text className="de-label">R2</Text><Text className="de-label">R3</Text>
                </div>
                {JUDGES.map(([who, how, s], i) => (
                  <div key={who} className="de-tr" data-on={i === 0 || undefined} style={{ gridTemplateColumns: COLS }}>
                    <div className="de-stack">
                      <Text className="de-h de-h--sm">{who}</Text>
                      <Text className="de-code de-dim">{how}</Text>
                    </div>
                    {s.map((v, j) => <Text key={j} className={v === 'no score' ? 'de-small de-dim' : 'de-num'}>{v}</Text>)}
                  </div>
                ))}
                <div className="de-tr" style={{ gridTemplateColumns: COLS }}><Bar w={110} tone={2} /><Bar w={24} tone={2} /><Bar w={24} tone={2} /><Bar w={24} tone={2} /></div>
              </div>
            </div>
          </Window>
          <Card className="de-sat" pad="medium" gap={4}>
            <Text className="de-label">Claude, round 3</Text>
            {CATS.map(([c, v]) => (
              <div key={c} className="de-line">
                <Text className="de-small">{c}</Text>
                <div className="de-pair"><Meter value={v / 10} className="de-meter" /><Text className="de-num">{String(v)}</Text></div>
              </div>
            ))}
          </Card>
        </>
      )}
    </Stage>
  )
}
