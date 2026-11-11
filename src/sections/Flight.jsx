import { lazy, Suspense, useEffect, useRef } from 'react'
import ClientOnly from '../components/ClientOnly'
import useInView from '../hooks/useInView'
import useMedia from '../hooks/useMedia'
import { projects } from '../data/site'
import './Flight.css'

const FlightScene = lazy(() => import('../three/Journey'))

const facts = [
  { n: String(projects.length), t: 'sites & apps' },
  { n: '2', t: 'countries: UAE & India' },
  { n: '1', t: 'full-stack dev' },
]

/* Kerala to the Gulf: the plane crosses the sky as the section scrolls. */
export default function Flight() {
  const wrap = useRef(null)
  const state = useRef({ progress: 0, touchX: 0, touchY: 0, touching: false })
  const near = useInView(wrap, '700px', true)
  const visible = useInView(wrap, '100px')
  const compact = useMedia('(max-width: 820px)')

  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const r = wrap.current?.getBoundingClientRect()
      if (!r) return
      const run = r.height - window.innerHeight
      state.current.progress = Math.min(Math.max(-r.top / run, 0), 1)
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf) }
  }, [])

  /* Interactive touch tilt on the 3D sky */
  const lastPos = useRef({ x: 0, y: 0 })
  const onPointerDown = (e) => {
    state.current.touching = true
    lastPos.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerMove = (e) => {
    if (!state.current.touching) return
    const dx = e.clientX - lastPos.current.x
    const dy = e.clientY - lastPos.current.y
    state.current.touchX = Math.max(-1.5, Math.min(1.5, (state.current.touchX || 0) + dx * 0.005))
    state.current.touchY = Math.max(-1.0, Math.min(1.0, (state.current.touchY || 0) - dy * 0.005))
    lastPos.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = () => {
    state.current.touching = false
  }

  return (
    <section ref={wrap} className="flight" aria-labelledby="flight-title">
      <div className="flight-pin">
        <div
          className="flight-canvas"
          aria-hidden="true"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {near && (
            <ClientOnly lite>
              <Suspense fallback={null}>
                <FlightScene state={state} active={visible} compact={compact} />
              </Suspense>
            </ClientOnly>
          )}
        </div>
        <div className="flight-copy wrap">
          <div className="flight-card glass" data-reveal>
            <span className="flight-tag t-small">Flight Route</span>
            <h2 id="flight-title" className="t-h2">Kerala to the Gulf.</h2>
            <p className="flight-lede">
              I build from Calicut for businesses on both sides of the Arabian Sea: property in Abu Dhabi, company setup in Dubai, clinics and shops across Kerala.
            </p>
          </div>
          <ul className="flight-facts glass" data-reveal>
            {facts.map((f) => (
              <li key={f.t}>
                <span className="flight-n tabular">{f.n}</span>
                <span>{f.t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
