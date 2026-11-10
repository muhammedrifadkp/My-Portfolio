import { useRef } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import TLink from '../components/TLink'
import { GitHubIcon, WhatsAppIcon } from '../components/Icons'
import { bySlug, hostOf, projects, waLink } from '../data/site'
import NotFound from './NotFound'
import './Project.css'

export default function Project() {
  const { slug } = useParams()
  const p = bySlug[slug]
  const shot = useRef(null)
  if (!p) return <NotFound />
  const next = projects[(projects.indexOf(p) + 1) % projects.length]
  const ask = `Hi Rifad, I saw ${p.name} on your portfolio. Can you build something like it for me?`

  /* the window leans toward the pointer, with a soft light that follows it */
  const tilt = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = shot.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    shot.current.style.setProperty('--ry', `${(x - 0.5) * 7}deg`)
    shot.current.style.setProperty('--rx', `${(0.5 - y) * 5}deg`)
    shot.current.style.setProperty('--gx', `${x * 100}%`)
    shot.current.style.setProperty('--gy', `${y * 100}%`)
  }
  const rest = () => {
    shot.current.style.setProperty('--ry', '0deg')
    shot.current.style.setProperty('--rx', '0deg')
  }

  return (
    <article className="page proj">
      <div className="wrap">
        <TLink to="/projects" className="link proj-back"><ArrowLeft aria-hidden="true" /> All work</TLink>
        <header className="proj-head">
          <div className="proj-title" data-stagger="80">
            <p className="proj-kind" data-reveal>{p.kind}</p>
            <h1 className="t-display" data-reveal>{p.name}</h1>
          </div>
          <div className="proj-lead" data-stagger="80">
            <p className="t-statement" data-reveal>{p.pitch}</p>
            <div className="proj-actions" data-reveal>
              <a className="btn btn-primary" href={p.url} target="_blank" rel="noreferrer">Visit the live site <ArrowUpRight aria-hidden="true" /></a>
              <a className="btn" href={waLink(ask)} target="_blank" rel="noreferrer"><WhatsAppIcon /> Build me one like this</a>
            </div>
          </div>
        </header>
      </div>

      <figure className="proj-stage" style={{ '--tint': p.tint }} onPointerMove={tilt} onPointerLeave={rest}>
        <div ref={shot} className="proj-window" data-reveal>
          <div className="proj-bar">
            <span className="proj-dots" aria-hidden="true"><i /><i /><i /></span>
            <a className="proj-url" href={p.url} target="_blank" rel="noreferrer"><Lock aria-hidden="true" /> {hostOf(p.url)}</a>
          </div>
          <img src={p.src} srcSet={`${p.small} 800w, ${p.src} 1600w`} sizes="(max-width: 900px) 92vw, 1100px" alt={`The home page of ${p.name}`} width="1600" height="1000" />
        </div>
      </figure>

      <div className="proj-facts wrap">
        <section aria-labelledby="proj-what" data-reveal>
          <h2 id="proj-what" className="t-h3">What it does</h2>
          <ul className="proj-list">{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
        </section>
        <section aria-labelledby="proj-stack" data-reveal>
          <h2 id="proj-stack" className="t-h3">Built with</h2>
          <ul className="proj-stack">{p.stack.map((s) => <li key={s} className="chip">{s}</li>)}</ul>
        </section>
        <section aria-labelledby="proj-links" data-reveal>
          <h2 id="proj-links" className="t-h3">See it</h2>
          <ul className="proj-links">
            <li><a className="link" href={p.url} target="_blank" rel="noreferrer">{hostOf(p.url)} <ArrowUpRight aria-hidden="true" /></a></li>
            {p.code && <li><a className="link" href={p.code} target="_blank" rel="noreferrer"><GitHubIcon width="16" height="16" /> Source on GitHub</a></li>}
          </ul>
        </section>
      </div>

      <div className="wrap">
        <TLink to={`/projects/${next.slug}`} className="proj-next">
          <span className="proj-next-copy">
            <span className="muted">Next project</span>
            <span className="t-h2">{next.name} <ArrowRight aria-hidden="true" /></span>
          </span>
          <img src={next.small} alt="" width="800" height="500" loading="lazy" />
        </TLink>
      </div>
    </article>
  )
}
