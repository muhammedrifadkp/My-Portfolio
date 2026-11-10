import { lazy, Suspense, useEffect, useRef } from 'react'
import ClientOnly from '../components/ClientOnly'
import useInView from '../hooks/useInView'
import { projects } from '../data/site'
import './Flight.css'

const FlightScene = lazy(() => import('../three/Journey'))

const facts = [
  { n: String(projects.length), t: 'sites and apps on this site, most of them live for real businesses' },
  { n: '2', t: 'countries of clients: the UAE and India' },
  { n: '1', t: 'person, from the first sketch to the last deploy' },
]

/* Kerala to the Gulf: the plane crosses the sky as the section scrolls. */
export default function Flight() {
  const wrap = useRef(null)
  const state = useRef({ progress: 0 })
  const near = useInView(wrap, '700px', true)
  const visible = useInView(wrap, '100px')

  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const r = wrap.current.getBoundingClientRect()
      const run = r.height - window.innerHeight
      state.current.progress = Math.min(Math.max(-r.top / run, 0), 1)
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section ref={wrap} className="flight" aria-labelledby="flight-title">
      <div className="flight-pin">
        <div className="flight-canvas" aria-hidden="true">
          {near && (
            <ClientOnly>
              <Suspense fallback={null}>
                <FlightScene state={state} active={visible} />
              </Suspense>
            </ClientOnly>
          )}
        </div>
        <div className="flight-copy wrap">
          <div className="flight-card glass" data-reveal>
            <h2 id="flight-title" className="t-h2">Kerala to the Gulf.</h2>
            <p className="flight-lede">
              I build from Calicut for businesses on both sides of the Arabian Sea: property in Abu Dhabi, company setup in Dubai, clinics, shops and suppliers across Kerala.
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
