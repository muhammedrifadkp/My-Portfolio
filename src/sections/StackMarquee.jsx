import { useCallback, useRef } from 'react'
import useScrollProgress from '../hooks/useScrollProgress'
import { stack } from '../data/site'
import './StackMarquee.css'

const half = Math.ceil(stack.length / 2)
const rows = [stack.slice(0, half), stack.slice(half)]

/* Two lines of type that slide past each other as the page scrolls. */
export default function StackMarquee() {
  const ref = useRef(null)
  const paint = useCallback((p) => { ref.current.style.setProperty('--s', p.toFixed(4)) }, [])
  useScrollProgress(ref, paint, { start: 1, end: 0 })
  return (
    <section className="marquee section" aria-labelledby="stack-title">
      <div className="wrap">
        <h2 id="stack-title" className="t-h2" data-reveal>What I build with.</h2>
        <ul className="visually-hidden">
          {stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
      <div ref={ref} className="marquee-rows" aria-hidden="true">
        {rows.map((row, r) => (
          <p key={r} className="marquee-row" style={{ '--dir': r ? 1 : -1 }}>
            {[...row, ...row, ...row].map((word, i) => (
              <span key={i}>{word}</span>
            ))}
          </p>
        ))}
      </div>
    </section>
  )
}
