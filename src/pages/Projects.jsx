import { useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { bySlug, projects, waLink } from '../data/site'
import WorkIndex from '../sections/WorkIndex'
import ContactBand from '../sections/ContactBand'
import { WhatsAppIcon } from '../components/Icons'
import './Projects.css'

const featured = ['pixel-conversions', 'zhm-real-estate', 'ag-star', 'ad-firms', 'fixerland', 'cdc-attendance'].map((s) => bySlug[s])

export default function Projects() {
  useEffect(() => { document.title = 'Work | Muhammed Rifad KP' }, [])
  return (
    <div className="page">
      <header className="work-head wrap">
        <h1 className="t-display" data-reveal>Work.</h1>
        <p className="t-statement work-intro" data-reveal>
          {projects.length} sites and apps, from a Dubai property portal to a phone repair shop in Kerala. Six of them up close first.
        </p>
      </header>

      <div className="panels" aria-label="Featured projects">
        {featured.map((p, i) => (
          <section key={p.slug} className="panel" style={{ '--tint': p.tint }} aria-labelledby={`p-${p.slug}`}>
            <div className="panel-frame">
              <img className="panel-img" src={p.src} alt={`The ${p.name} website`} width="1600" height="1000" loading={i < 2 ? 'eager' : 'lazy'} />
            </div>
            <div className="panel-band glass">
              <div className="panel-band-inner wrap">
                <div className="panel-title">
                  <span className="panel-kind t-small">{p.kind}</span>
                  <h2 id={`p-${p.slug}`} className="panel-name">{p.name}</h2>
                </div>
                <p className="panel-pitch">{p.pitch}</p>
                <span className="panel-actions">
                  <a className="btn btn-primary" href={p.url} target="_blank" rel="noreferrer">Visit <ArrowUpRight aria-hidden="true" /></a>
                  <a className="btn btn-quiet panel-wa" href={waLink(`Hi Rifad, I saw ${p.name} on your portfolio. Can you build something like it for me?`)} target="_blank" rel="noreferrer" aria-label={`Ask on WhatsApp for a site like ${p.name}`}>
                    <WhatsAppIcon />
                  </a>
                </span>
              </div>
            </div>
          </section>
        ))}
      </div>

      <WorkIndex id="more" title="More work" exclude={featured.map((p) => p.slug)} />
      <ContactBand />
    </div>
  )
}
