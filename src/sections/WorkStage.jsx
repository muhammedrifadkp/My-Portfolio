import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowRight, Move3d } from 'lucide-react'
import ClientOnly from '../components/ClientOnly'
import { bySlug, onScreen, profile, waLink } from '../data/site'
import { WhatsAppIcon } from '../components/Icons'
import useInView from '../hooks/useInView'
import useMedia from '../hooks/useMedia'
import './WorkStage.css'

const StageScene = lazy(() => import('../three/StageScene'))
const shows = onScreen.map((s) => bySlug[s])
const screens = shows.map((p) => p.src)
const ZOOM_END = 0.22 // share of the run spent moving in to the monitor

/**
 * Hero + the pinned workstation. The desk holds still while the
 * monitor shows one live client site per screen of scrolling.
 */
export default function WorkStage() {
  const wrap = useRef(null)
  const state = useRef({ progress: 0, step: 0, drag: 0, dragging: false, yaw: 0 })
  const [step, setStep] = useState(-1) // -1 = hero
  const [heroOut, setHeroOut] = useState(0)
  const inView = useInView(wrap, '200px')
  const compact = useMedia('(max-width: 820px)')
  const reduced = useMedia('(prefers-reduced-motion: reduce)')

  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const el = wrap.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const run = r.height - window.innerHeight
      const t = Math.min(Math.max(-r.top / run, 0), 1)
      state.current.progress = t / ZOOM_END
      const s = t < ZOOM_END * 0.8 ? -1 : Math.min(shows.length - 1, Math.floor(((t - ZOOM_END) / (1 - ZOOM_END)) * shows.length))
      state.current.step = Math.max(0, s)
      setStep((prev) => (prev === s ? prev : s))
      setHeroOut(Math.min(t / (ZOOM_END * 0.55), 1))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])

  /* drag to turn the desk (horizontal only, so touch scrolling still works) */
  const startX = useRef(0)
  const onDown = (e) => { startX.current = e.clientX; state.current.dragging = true; state.current.drag = state.current.yaw }
  const onMove = (e) => {
    if (!state.current.dragging) return
    state.current.drag = state.current.yaw + ((e.clientX - startX.current) / window.innerWidth) * 3
    startX.current = e.clientX
  }
  const onUp = () => { state.current.dragging = false }

  const turn = (dir) => { state.current.yaw += dir * 0.5 }

  const jumpTo = (i) => {
    const el = wrap.current
    const run = el.offsetHeight - window.innerHeight
    const t = ZOOM_END + ((i + 0.5) / shows.length) * (1 - ZOOM_END)
    window.scrollTo({ top: el.offsetTop + run * t, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <section ref={wrap} className="stage" aria-labelledby="hero-title">
      <div className="stage-pin">
        <div
          className="stage-canvas"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={onUp}
          aria-hidden="true"
        >
          <ClientOnly>
            <Suspense fallback={null}>
              <StageScene state={state} images={screens} compact={compact} active={inView} />
            </Suspense>
          </ClientOnly>
        </div>

        {/* first screen */}
        <div className={`hero-copy wrap ${heroOut >= 1 ? 'is-gone' : ''}`} style={{ '--out': heroOut }} aria-hidden={step >= 0 ? 'true' : undefined}>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-half hero-half-a">Muhammed Rifad</span>{' '}
            <span className="hero-half hero-half-b">builds the web.</span>
          </h1>
          <div className="hero-foot">
            <p className="hero-lede">
              Full-stack developer in {profile.city}. Websites, online stores and web apps for businesses in the UAE and India.
            </p>
            <div className="hero-actions">
              <a href="#work" className="btn btn-primary" tabIndex={step >= 0 ? -1 : 0}>
                See the work <ArrowRight aria-hidden="true" />
              </a>
              <a href={waLink('Hi Rifad, I saw your portfolio and would like to talk about a website.')} className="btn btn-quiet" target="_blank" rel="noreferrer" tabIndex={step >= 0 ? -1 : 0}>
                <WhatsAppIcon /> WhatsApp
              </a>
            </div>
          </div>
          <div className="hero-hint t-small">
            <button type="button" onClick={() => turn(-1)} tabIndex={step >= 0 ? -1 : 0} aria-label="Turn the desk left">
              <Move3d aria-hidden="true" />
            </button>
            Drag to turn the desk. Scroll to switch it on.
          </div>
        </div>

        {/* one panel per site on the monitor */}
        <div className="screen-panels wrap">
          {shows.map((p, i) => (
            <article key={p.slug} className={`screen-panel glass ${step === i ? 'is-active' : ''}`} aria-hidden={step === i ? undefined : 'true'}>
              <p className="t-small muted">{p.kind}</p>
              <h2 className="screen-name">{p.name}</h2>
              <p className="screen-pitch">{p.pitch}</p>
              <ul className="screen-stack t-small" aria-label="Built with">
                {p.stack.map((s) => <li key={s}>{s}</li>)}
              </ul>
              <div className="screen-links">
                <a className="btn btn-primary" href={p.url} target="_blank" rel="noreferrer" tabIndex={step === i ? 0 : -1}>
                  Visit the site <ArrowUpRight aria-hidden="true" />
                </a>
                <a className="link" href={waLink(`Hi Rifad, I saw ${p.name} on your portfolio. Can you build something like it for me?`)} target="_blank" rel="noreferrer" tabIndex={step === i ? 0 : -1}>
                  Build me one like this
                </a>
              </div>
            </article>
          ))}
          <nav className={`screen-dots ${step >= 0 ? 'is-active' : ''}`} aria-label="Sites on the screen">
            {shows.map((p, i) => (
              <button key={p.slug} type="button" aria-label={`Show ${p.name}`} aria-current={step === i ? 'true' : undefined} onClick={() => jumpTo(i)} tabIndex={step >= 0 ? 0 : -1} />
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
