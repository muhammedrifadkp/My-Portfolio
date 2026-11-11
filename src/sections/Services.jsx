import { services } from '../data/site'
import './Services.css'

export default function Services() {
  return (
    <section className="services wrap section" aria-labelledby="services-title">
      <div className="services-head">
        <h2 id="services-title" className="t-h2" data-reveal>What I can build for you.</h2>
        <p className="services-lede" data-reveal>
          One developer from design to deploy. You talk to the person writing the code, and the site is fast, found on Google and easy to update.
        </p>
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
