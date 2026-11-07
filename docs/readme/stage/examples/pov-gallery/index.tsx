import { useLayoutEffect, useRef, useState } from 'react'
import { Stage } from '../../kit'
import { FORKS, Moment, type ForkId } from '../_pov/pov'
import '../_pov/gallery.css'

// The overview: one brief, seven tastes, as a bento (references/bento.md).
// Three columns. The hero spans two: the brief itself, labelled on the
// default taste. Beside it, the one statement tile in large type, inverted
// as the grid's punctuation. Then the six forks, each a component tile: the
// moment alone on the fork's own ground, no window chrome anywhere. One
// Stage per picture at its native width; the copy is page type outside it.
// Every tile shares radius, gap, padding and copy position (top-left); the
// grounds differ because the grounds are the point.

const COL = 376
const ROWS: ForkId[][] = [
  ['duolingo', 'campus-binge', 'smash-and-clash'],
  ['swiggy', 'cursor', 'aave'],
]
// Picture heights per row: the tallest card plus a gutter; Smash&Clash's
// sticker title and Duolingo's stacked buttons set row one
const PICTURE = [352, 296]

function Tile({ fork, height }: { fork: ForkId; height: number }) {
  const f = FORKS[fork]
  return (
    <div className={`pg-tile pv-tile pv--${fork}`}>
      <p className="pg-copy"><b>{f.name}</b> {f.stance}</p>
      <Stage width={COL} height={height} className={`pv pg-pic pv--${fork}`}>
        {() => (
          <div className="pg-slot">
            <Moment fork={fork} />
          </div>
        )}
      </Stage>
    </div>
  )
}

// The brief, labelled: each part of the default card gets a leader to its
// name. Positions are measured from the rendered card, never hard-coded.
const PARTS: [selector: string, name: string][] = [
  ['.pv-title', 'Title'],
  ['.pv-copy', 'One line of copy'],
  ['.pv-value', 'One value'],
  ['.pv-actions', 'Primary and secondary'],
]

function Brief() {
  const slot = useRef<HTMLDivElement>(null)
  const [ys, setYs] = useState<number[]>([])
  const [x, setX] = useState(0)
  useLayoutEffect(() => {
    const root = slot.current
    if (!root) return
    const card = root.querySelector<HTMLElement>('.pv-card')!
    const top = (el: HTMLElement) => { let y = 0; for (let n: HTMLElement | null = el; n && n !== root; n = n.offsetParent as HTMLElement | null) y += n.offsetTop; return y }
    setX(card.offsetLeft + card.offsetWidth)
    setYs(PARTS.map(([sel]) => { const el = card.querySelector<HTMLElement>(sel)!; return top(el) + el.offsetHeight / 2 }))
  }, [])
  return (
    <div className="pg-tile pg-hero pv-tile pv--default">
      <p className="pg-copy"><b>The brief.</b> A daily reminder: a title, one line, one value, two buttons. Here in the default pov.md.</p>
      <Stage width={COL * 2 + 12} height={210} className="pv pg-pic pv--default">
        {() => (
          <div className="pg-brief" ref={slot}>
            <div className="pg-slot"><Moment fork="default" /></div>
            {ys.map((y, i) => (
              <div key={PARTS[i][1]} className="pg-label" style={{ top: y, left: x }}>
                <span className="pg-leader" />
                <span className="pg-name">{PARTS[i][1]}</span>
              </div>
            ))}
          </div>
        )}
      </Stage>
    </div>
  )
}

export default function Gallery() {
  return (
    <div className="pg">
      <Brief />
      <div className="pg-tile pg-statement">
        <p className="pg-big">One brief, seven tastes.</p>
        <p className="pg-small">Each card is drawn only from its fork’s pov file: colour, type, radii, depth, buttons, case and voice.</p>
      </div>
      {ROWS.map((row, r) => row.map((fork) => <Tile key={fork} fork={fork} height={PICTURE[r]} />))}
    </div>
  )
}
