import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import TLink from '../components/TLink'
import { WhatsAppIcon } from '../components/Icons'
import { bySlug, process as steps, profile, projects, waLink } from '../data/site'
import Faq from '../sections/Faq'
import ContactBand from '../sections/ContactBand'
import './Kozhikode.css'

const localProof = ['rasdent', 'fixerland', 'daily-horeca', 'ag-star', 'zhm-real-estate', 'pixel-conversions'].map((s) => bySlug[s])

const offerings = [
  {
    num: '01',
    title: 'Business & clinic websites',
    when: '2 – 3 weeks',
    text: 'Fast, mobile-first websites for clinics, agencies, institutes and service businesses in Kozhikode and across Kerala—with WhatsApp booking and local Google SEO set up from day one.',
    tags: ['Next.js / React', 'Local SEO', 'WhatsApp enquiries'],
  },
  {
    num: '02',
    title: 'E-commerce & online stores',
    when: '3 – 5 weeks',
    text: 'Shopify or custom Next.js stores with product filters, cart, checkout, and WhatsApp order flows built for shops and B2B suppliers in Kerala and the UAE.',
    tags: ['Shopify', 'Custom storefronts', 'Product finders'],
  },
  {
    num: '03',
    title: 'Full-stack web apps & portals',
    when: '1 – 3 months',
    text: 'Role-based dashboards, booking tools, attendance portals and REST APIs using React, Next.js, Node.js, Express and MongoDB.',
    tags: ['MERN stack', 'Role-based auth', 'APIs & databases'],
  },
  {
    num: '04',
    title: 'Redesigns, speed & SEO upgrades',
    when: '1 – 2 weeks',
    text: 'Replace slow template sites with lightweight, prerendered pages that load quickly on mobile data and give Google clean structured data.',
    tags: ['Core Web Vitals', 'JSON-LD schema', 'Clean UX'],
  },
]

const reasons = [
  {
    title: 'One developer, no agency hand-offs',
    text: 'You speak directly with the engineer writing the code, whether over WhatsApp, a phone call, or an in-person meeting in Kozhikode.',
  },
  {
    title: 'Engineered for speed and Google Search',
    text: 'Sites ship with semantic HTML, fast asset loading, clean URLs, sitemaps and structured schema instead of bloated page-builder themes.',
  },
  {
    title: 'Proven across Kerala and the Gulf',
    text: 'Sixteen live sites and web apps shipped for clinics, automotive stores, bakeries, repair shops and Dubai real estate firms.',
  },
  {
    title: 'Clear scope before work starts',
    text: 'You get a written plan, timeline and price based on the pages and features your business needs—plus ongoing support after launch.',
  },
]

export default function Kozhikode() {
  return (
    <div className="page kzk">
      <header className="kzk-hero wrap">
        <div className="kzk-hero-copy" data-stagger="80">
          <p className="kzk-badge chip" data-reveal>
            <MapPin aria-hidden="true" /> Kozhikode (Calicut), Kerala
          </p>
          <h1 className="t-h2 kzk-title" data-reveal>
            Freelance web developer in Kozhikode.
          </h1>
          <p className="t-statement kzk-lede" data-reveal>
            I’m Muhammed Rifad KP—a freelance full-stack web developer and web designer in Calicut building fast business websites, online stores and custom web apps for clients in Kerala and the UAE.
          </p>
          <div className="kzk-actions" data-reveal>
            <a
              className="btn btn-primary"
              href={waLink('Hi Rifad, I am looking for a freelance web developer in Kozhikode.')}
              target="_blank"
              rel="noreferrer"
            >
              <WhatsAppIcon /> Discuss your website
            </a>
            <TLink to="/projects" className="btn">
              See live projects <ArrowRight aria-hidden="true" />
            </TLink>
          </div>
        </div>

        <aside className="kzk-card glass" data-reveal>
          <p className="kzk-card-label t-small">Direct from Calicut</p>
          <dl className="kzk-facts">
            <div>
              <dt className="muted t-small">Developer</dt>
              <dd>{profile.name}</dd>
            </div>
            <div>
              <dt className="muted t-small">Service area</dt>
              <dd>Kozhikode, Kerala, India &amp; UAE</dd>
            </div>
            <div>
              <dt className="muted t-small">Core stack</dt>
              <dd>Next.js, React, Node.js, MongoDB, Shopify</dd>
            </div>
            <div>
              <dt className="muted t-small">Typical launch</dt>
              <dd>2 to 4 weeks for business websites</dd>
            </div>
          </dl>
          <div className="kzk-card-foot">
            <a className="link" href={profile.phoneHref}>Call {profile.phone}</a>
            <TLink className="link" to="/contact">Project form <ArrowRight aria-hidden="true" /></TLink>
          </div>
        </aside>
      </header>

      <section className="kzk-offers wrap section" aria-labelledby="kzk-offers-title">
        <div className="kzk-head" data-stagger="70">
          <h2 id="kzk-offers-title" className="t-h2" data-reveal>Web development services in Kozhikode.</h2>
          <p className="kzk-sub" data-reveal>
            Whether you run a clinic in Calicut, a wholesale shop across Kerala, or a growing brand in the UAE, each site is tailored to convert visitors into WhatsApp enquiries and orders.
          </p>
        </div>

        <ul className="kzk-grid" data-stagger="70">
          {offerings.map((o) => (
            <li key={o.num} className="kzk-offer glass" data-reveal>
              <div className="kzk-offer-top">
                <span className="kzk-num tabular">{o.num}</span>
                <span className="t-small muted">{o.when}</span>
              </div>
              <h3 className="t-h3">{o.title}</h3>
              <p>{o.text}</p>
              <ul className="kzk-tags" aria-label="Included">
                {o.tags.map((t) => <li key={t} className="chip">{t}</li>)}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="kzk-why section" aria-labelledby="kzk-why-title">
        <div className="wrap kzk-why-box">
          <div className="kzk-why-head" data-stagger="70">
            <h2 id="kzk-why-title" className="t-h2" data-reveal>Why work directly with a local freelancer.</h2>
            <p className="kzk-sub" data-reveal>
              Every project follows a clear four-step build process—from planning and live preview links to domain setup, Google Search Console indexing and ongoing care.
            </p>
          </div>
          <ol className="kzk-reasons" data-stagger="60">
            {reasons.map((r, i) => (
              <li key={r.title} className="kzk-reason" data-reveal>
                <span className="kzk-num tabular">0{i + 1}</span>
                <div>
                  <h3>{r.title}</h3>
                  <p>{r.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="kzk-proof wrap section" aria-labelledby="kzk-proof-title">
        <div className="kzk-proof-head" data-stagger="70">
          <h2 id="kzk-proof-title" className="t-h2" data-reveal>Recent client work.</h2>
          <TLink to="/projects" className="link" data-reveal>
            Explore all {projects.length} projects <ArrowRight aria-hidden="true" />
          </TLink>
        </div>
        <ul className="kzk-work-grid" data-stagger="60">
          {localProof.map((p) => (
            <li key={p.slug} className="kzk-work-card" data-reveal>
              <TLink to={`/projects/${p.slug}`} className="kzk-work-shot">
                <img src={p.small} alt={`${p.name} website`} width="800" height="500" loading="lazy" />
              </TLink>
              <div className="kzk-work-body">
                <p className="t-small muted">{p.kind}</p>
                <h3>
                  <TLink to={`/projects/${p.slug}`}>{p.name}</TLink>
                </h3>
                <p className="kzk-work-pitch">{p.pitch}</p>
                <div className="kzk-work-links">
                  <TLink to={`/projects/${p.slug}`} className="link">
                    Case study <ArrowRight aria-hidden="true" />
                  </TLink>
                  <a href={p.url} target="_blank" rel="noreferrer" className="link">
                    Live site <ArrowUpRight aria-hidden="true" />
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="kzk-steps wrap section" aria-labelledby="kzk-steps-title">
        <h2 id="kzk-steps-title" className="t-h2" data-reveal>How we start.</h2>
        <ol className="kzk-step-list" data-stagger="70">
          {steps.map((s, i) => (
            <li key={s.title} className="kzk-step" data-reveal>
              <span className="kzk-num tabular">0{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <Faq title="Kozhikode web development FAQ." />
      <ContactBand title="Need a web developer in Kozhikode?" />
    </div>
  )
}
