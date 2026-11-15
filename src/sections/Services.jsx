import { ArrowRight } from 'lucide-react'
import TLink from '../components/TLink'
import { services } from '../data/site'
import './Services.css'

export default function Services() {
  return (
    <section className="services wrap section" aria-labelledby="services-title">
      <div className="services-head">
        <h2 id="services-title" className="t-h2" data-reveal>What I can build for you.</h2>
        <p className="services-lede" data-reveal>
          Work directly with a freelance web developer in Kozhikode (Calicut). From design to deploy, you talk to the person writing the code—fast sites built to rank on Google and easy to update.
        </p>
        <div data-reveal>
          <TLink to="/freelance-web-developer-kozhikode" className="link">
            Web development in Kozhikode <ArrowRight aria-hidden="true" />
          </TLink>
        </div>
      </div>
      <ul className="services-list" data-stagger="90">
        {services.map((s, i) => (
          <li key={s.name} data-reveal className="services-card">
            <span className="services-num tabular">0{i + 1}</span>
            <h3 className="services-name">{s.name}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
