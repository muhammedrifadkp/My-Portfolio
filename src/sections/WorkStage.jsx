import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowRight, Move3d } from 'lucide-react'
import ClientOnly from '../components/ClientOnly'
import TLink from '../components/TLink'
import { bySlug, onScreen, profile, waLink } from '../data/site'
import { WhatsAppIcon } from '../components/Icons'
import useInView from '../hooks/useInView'
import useMedia from '../hooks/useMedia'
import { triggerHaptic } from '../utils/haptics'
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
  const [ready, setReady] = useState(false)
  const inView = useInView(wrap, '200px')
  const compact = useMedia('(max-width: 820px)')
  const reduced = useMedia('(prefers-reduced-motion: reduce)')
  const onReady = useCallback(() => setReady(true), [])

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
      setStep((prev) => {
        if (prev !== s && s >= 0) triggerHaptic('selection')
        return s
      })
      setHeroOut(Math.min(t / (ZOOM_END * 0.75), 1))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])

  /* drag to turn the desk with smooth touch and pointer tracking */
  const startX = useRef(0)
  const onDown = (e) => {
    startX.current = e.clientX
    state.current.dragging = true
    state.current.drag = state.current.yaw || 0
  }
  const onMove = (e) => {
    if (!state.current.dragging) return
    const dx = e.clientX - startX.current
    state.current.drag = (state.current.drag || 0) + (dx / (compact ? window.innerWidth * 0.7 : window.innerWidth)) * 3.2
    startX.current = e.clientX
  }
  const onUp = () => {
    state.current.dragging = false
  }

  const turn = () => {
    triggerHaptic('light')
    state.current.drag = (state.current.drag || state.current.yaw || 0) + 0.65
  }

  const jumpTo = (i) => {
    triggerHaptic('medium')
    const targetIdx = Math.max(0, Math.min(shows.length - 1, i))
    const el = wrap.current
    const run = el.offsetHeight - window.innerHeight
    const t = ZOOM_END + ((targetIdx + 0.5) / shows.length) * (1 - ZOOM_END)
    window.scrollTo({ top: el.offsetTop + run * t, behavior: reduced ? 'auto' : 'smooth' })
  }

  /* mobile touch swipe gestures on screen-panels */
  const touchStart = useRef(0)
  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
  }
  const onTouchEnd = (e) => {
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 45) {
      if (diff > 0 && step < shows.length - 1) {
        jumpTo(step + 1)
      } else if (diff < 0 && step > 0) {
        jumpTo(step - 1)
      }
    }
  }

  const heroTab = step >= 0 ? -1 : 0

  return (
    <section ref={wrap} className="stage" aria-labelledby="hero-title">
      <div className="stage-pin">
        {/* a still of the desk, on screen at once; the live 3D scene takes over when it has loaded */}
        <picture className={`stage-poster ${ready ? 'is-gone' : ''}`} aria-hidden="true">
          <source media="(max-aspect-ratio: 7/10)" srcSet="/poster-desk-tall.webp" width="780" height="1688" />
          <img src="/poster-desk.webp" alt="" width="1600" height="1000" fetchpriority="high" decoding="async" />
        </picture>
        <div
          className={`stage-canvas ${ready ? 'is-ready' : ''}`}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onPointerLeave={onUp}
          aria-hidden="true"
        >
          <ClientOnly idle>
            <Suspense fallback={null}>
              <StageScene state={state} images={screens} compact={compact} active={inView} onReady={onReady} />
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
              <a href="#work" className="btn btn-primary" tabIndex={heroTab} onClick={() => triggerHaptic('light')}>
                See the work <ArrowRight aria-hidden="true" />
              </a>
              <a href={waLink('Hi Rifad, I saw your portfolio and would like to talk about a website.')} className="btn" target="_blank" rel="noreferrer" tabIndex={heroTab}>
                <WhatsAppIcon /> WhatsApp
              </a>
            </div>
          </div>
          <div className="hero-hint t-small">
            <button type="button" className="btn btn-round" onClick={turn} tabIndex={heroTab} aria-label="Turn the desk">
              <Move3d aria-hidden="true" />
            </button>
            <span>Drag to turn the desk. Scroll to switch it on.</span>
          </div>
        </div>

        {/* one panel per site on the monitor */}
        <div
          className="screen-panels wrap"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {shows.map((p, i) => (
            <article key={p.slug} className={`screen-panel glass ${step === i ? 'is-active' : ''}`} aria-hidden={step === i ? undefined : 'true'}>
              <div className="screen-meta">
                <span className="screen-badge tabular">0{i + 1} / 0{shows.length}</span>
                <p className="t-small muted">{p.kind}</p>
              </div>
              <h2 className="screen-name">{p.name}</h2>
              <p className="screen-pitch">{p.pitch}</p>
              <ul className="screen-stack" aria-label="Built with">
                {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
              </ul>
              <div className="screen-links">
                <a className="btn btn-primary" href={p.url} target="_blank" rel="noreferrer" tabIndex={step === i ? 0 : -1} onClick={() => triggerHaptic('light')}>
                  Visit the site <ArrowUpRight aria-hidden="true" />
                </a>
                <TLink className="link" to={`/projects/${p.slug}`} tabIndex={step === i ? 0 : -1}>
                  About this project <ArrowRight aria-hidden="true" />
                </TLink>
              </div>
            </article>
          ))}
          <nav className={`screen-dots glass ${step >= 0 ? 'is-active' : ''}`} aria-label="Sites on the screen">
            {shows.map((p, i) => (
              <button key={p.slug} type="button" aria-label={`Show ${p.name}`} aria-current={step === i ? 'true' : undefined} onClick={() => jumpTo(i)} tabIndex={step >= 0 ? 0 : -1} />
            ))}
          </nav>
        </div>
      </div>
    </section>
  )
}
