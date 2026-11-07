import { Card, Meter, Stage, Text, Window, Bar } from '../../kit'
import '../_de/de.css'

// Built from examples/static-card, the same frame as de-grade. The window is
// evals/results/2026-09-05-sonnet/REPORT.md as written: the arms table
// (rules passed, fixtures fully clean), then the per-fixture table, whose
// rows run off the crop as filler. The card is the one fixture where the
// arms differ most, with what the baseline missed, word for word.
const ARMS: [string, number, string, string][] = [
  ['baseline', 32 / 36, '32 / 36 (89%)', '7 / 10'],
  ['skill', 35 / 36, '35 / 36 (97%)', '9 / 10'],
]
const COLS = { gridTemplateColumns: '72px 120px 104px 80px' }
const FIX = { gridTemplateColumns: '136px 80px 80px 80px' }

export default function Bench() {
  return (
    <Stage width={800} height={420} className="de de-bench">
      {() => (
        <>
          <Window title="REPORT.md" className="de-win de-card-win" style={{ width: 820, height: 440 }}>
            <div className="de-page">
              <div className="de-stack">
                <Text className="de-h">design-bench · 2026-09-05-sonnet</Text>
                <Text className="de-sub">Same model in both arms; the only difference is whether the agent read SKILL.md.</Text>
              </div>
              <div className="de-table">
                <div className="de-tr" data-head style={COLS}>
                  <Text className="de-label">Arm</Text><Text className="de-label">Rules passed</Text><span /><Text className="de-label">Fully clean</Text>
                </div>
                {ARMS.map(([arm, v, rules, clean]) => (
                  <div key={arm} className="de-tr" style={COLS}>
                    <Text className="de-mono">{arm}</Text>
                    <Meter value={v} tone={arm === 'skill' ? 'accent' : 'ink'} />
                    <Text className="de-num">{rules}</Text>
                    <Text className="de-sub de-strong">{clean}</Text>
                  </div>
                ))}
              </div>
              <div className="de-table">
                <div className="de-tr" data-head style={FIX}>
                  <Text className="de-label">Fixture</Text><Text className="de-label">Task</Text><Text className="de-label">Baseline</Text><Text className="de-label">Skill</Text>
                </div>
                {[[96, 52, 24, 24], [84, 40, 24, 24], [108, 46, 24, 24]].map((w, i) => (
                  <div key={i} className="de-tr" style={FIX}>
                    {w.map((x, j) => <Bar key={j} w={x} tone={j ? 2 : 3} />)}
                  </div>
                ))}
              </div>
            </div>
          </Window>
          <Card className="de-sat de-grade__card" pad="medium" gap={8}>
            <div className="de-grade__head">
              <Text className="de-mono de-strong">edit-hover-01</Text>
              <Text className="de-sub">baseline 3/5 · skill 5/5</Text>
            </div>
            <Text className="de-label">What the baseline missed</Text>
            <Text className="de-mono de-grade__fact">missing hover: ?hover</Text>
            <Text className="de-mono de-grade__fact">present translateY\(-4px\)</Text>
          </Card>
        </>
      )}
    </Stage>
  )
}
