import { useCallback, useEffect, useRef } from 'react'
import useScrollProgress from '../hooks/useScrollProgress'
import { stack } from '../data/site'
import { triggerHaptic } from '../utils/haptics'
import './StackMarquee.css'

const half = Math.ceil(stack.length / 2)
const rows = [stack.slice(0, half), stack.slice(half)]

/**
 * Interactive marquee: continuously drifts, accelerates with scroll,
 * and allows direct tactile swipe/touch dragging on mobile devices.
 */
export default function StackMarquee() {
  const ref = useRef(null)
  const scrollP = useRef(0.5)
  const touchOffset = useRef(0)
  const touchVel = useRef(0)
  const touchDown = useRef(false)
  const lastX = useRef(0)
  const lastT = useRef(0)

  const paint = useCallback((p) => {
    scrollP.current = p
  }, [])
  useScrollProgress(ref, paint, { start: 1, end: 0 })

  useEffect(() => {
    let raf = 0
    let drift = 0

    const tick = () => {
      drift += 0.35 // continuous gentle ambient drift
      if (!touchDown.current && Math.abs(touchVel.current) > 0.05) {
        touchOffset.current += touchVel.current
        touchVel.current *= 0.94 // momentum friction
      }
      if (ref.current) {
        ref.current.style.setProperty('--drift', `${drift}px`)
        ref.current.setProperty ? ref.current.setProperty('--s', scrollP.current.toFixed(4)) : ref.current.style.setProperty('--s', scrollP.current.toFixed(4))
        ref.current.style.setProperty('--touch', `${touchOffset.current}px`)
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  /* Touch dragging to interactively flick the marquee */
  const onPointerDown = (e) => {
    touchDown.current = true
    lastX.current = e.clientX
    lastT.current = performance.now()
    touchVel.current = 0
    triggerHaptic('light')
  }

  const onPointerMove = (e) => {
    if (!touchDown.current) return
    const now = performance.now()
    const dt = Math.max(1, now - lastT.current)
    const dx = e.clientX - lastX.current
    touchVel.current = (dx / dt) * 8
    touchOffset.current += dx
    lastX.current = e.clientX
    lastT.current = now
  }

  const onPointerUp = () => {
    touchDown.current = false
  }

  return (
    <section className="marquee section" aria-labelledby="stack-title">
      <div className="wrap">
        <h2 id="stack-title" className="t-h2" data-reveal>What I build with.</h2>
        <ul className="visually-hidden">
          {stack.map((s) => <li key={s}>{s}</li>)}
        </ul>
      </div>
      <div
        ref={ref}
        className="marquee-rows"
        aria-hidden="true"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {rows.map((row, r) => (
          <p key={r} className="marquee-row" style={{ '--dir': r ? 1 : -1 }}>
            {[...row, ...row, ...row, ...row].map((word, i) => (
              <span key={i}>{word}</span>
            ))}
          </p>
        ))}
      </div>
    </section>
  )
}
