import { ArrowRight, ArrowUpRight } from 'lucide-react'
import TLink from '../components/TLink'
import { bySlug, projects } from '../data/site'
import WorkIndex from '../sections/WorkIndex'
import ContactBand from '../sections/ContactBand'
import './Projects.css'

const featured = ['pixel-conversions', 'zhm-real-estate', 'ag-star', 'ad-firms', 'fixerland', 'cdc-attendance'].map((s) => bySlug[s])

export default function Projects() {
  return (
    <div className="page">
      <header className="work-head wrap">
        <h1 className="t-display" data-reveal>Work.</h1>
        <p className="t-statement work-intro" data-reveal>
          {projects.length} sites and apps, from a Dubai property portal to a dental clinic’s booking site. Six of them up close first.
        </p>
      </header>

      <div className="panels">
        {featured.map((p, i) => (
          <section key={p.slug} className="panel" style={{ '--tint': p.tint }} aria-labelledby={`p-${p.slug}`}>
            <TLink to={`/projects/${p.slug}`} className="panel-frame" aria-label={`${p.name}: about this project`}>
              <img
                className="panel-img"
                src={p.src}
                srcSet={`${p.small} 800w, ${p.src} 1600w`}
                sizes="(max-width: 820px) 100vw, 78vw"
                alt={`The ${p.name} website`}
                width="1600"
                height="1000"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </TLink>
            <div className="panel-band glass">
              <div className="panel-band-inner wrap">
                <div className="panel-title">
                  <span className="panel-kind t-small">{p.kind}</span>
                  <h2 id={`p-${p.slug}`} className="panel-name">{p.name}</h2>
                </div>
                <p className="panel-pitch">{p.pitch}</p>
                <span className="panel-actions">
                  <a className="btn btn-primary" href={p.url} target="_blank" rel="noreferrer">Visit <ArrowUpRight aria-hidden="true" /></a>
                  <TLink className="btn" to={`/projects/${p.slug}`}>Details <ArrowRight aria-hidden="true" /></TLink>
                </span>
              </div>
            </div>
          </section>
        ))}
      </div>

      <WorkIndex id="more" title="More work." exclude={featured.map((p) => p.slug)} />
      <ContactBand />
    </div>
  )
}
