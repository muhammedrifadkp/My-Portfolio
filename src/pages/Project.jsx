import { useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import TLink from '../components/TLink'
import { WhatsAppIcon } from '../components/Icons'
import { bySlug, hostOf, projects, waLink } from '../data/site'
import NotFound from './NotFound'
import './Project.css'

export default function Project() {
  const { slug } = useParams()
  const p = bySlug[slug]
  if (!p) return <NotFound />
  const next = projects[(projects.indexOf(p) + 1) % projects.length]
  const ask = 'Hi Rifad, I saw ' + p.name + ' on your portfolio. Can you build something like it for me?'
  return (
    <article className="page proj wrap">
      <TLink to="/projects" className="link proj-back"><ArrowLeft aria-hidden="true" /> All work</TLink>
      <header className="proj-head" data-stagger="80">
        <h1 className="t-display" data-reveal>{p.name}</h1>
        <p className="t-statement proj-pitch" data-reveal>{p.pitch}</p>
        <div className="proj-actions" data-reveal>
          <a className="btn btn-primary" href={p.url} target="_blank" rel="noreferrer">Visit {hostOf(p.url)} <ArrowUpRight aria-hidden="true" /></a>
          <a className="btn" href={waLink(ask)} target="_blank" rel="noreferrer"><WhatsAppIcon /> Build me one like this</a>
        </div>
      </header>
      <figure className="proj-shot" style={{ '--tint': p.tint }} data-reveal>
        <img src={p.src} srcSet={p.small + ' 800w, ' + p.src + ' 1600w'} sizes="(max-width: 900px) 100vw, 1200px" alt={'The ' + p.name + ' website'} width="1600" height="1000" />
      </figure>
      <div className="proj-facts">
        <section aria-labelledby="proj-what">
          <h2 id="proj-what" className="t-h3">What it does</h2>
          <ul className="proj-list">{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
        </section>
        <section aria-labelledby="proj-kind">
          <h2 id="proj-kind" className="t-h3">The project</h2>
          <p>{p.kind}. Live at <a className="link" href={p.url} target="_blank" rel="noreferrer">{hostOf(p.url)}</a>.</p>
        </section>
        <section aria-labelledby="proj-stack">
          <h2 id="proj-stack" className="t-h3">Built with</h2>
          <ul className="proj-stack">{p.stack.map((s) => <li key={s} className="chip">{s}</li>)}</ul>
        </section>
      </div>
      <TLink to={'/projects/' + next.slug} className="proj-next">
        <span className="muted">Next project</span>
        <span className="t-h2">{next.name}</span>
      </TLink>
    </article>
  )
}
