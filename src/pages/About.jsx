import { useEffect } from 'react'
import { ArrowUpRight, Download } from 'lucide-react'
import { education, experience, profile, skills, waLink } from '../data/site'
import { WhatsAppIcon } from '../components/Icons'
import ContactBand from '../sections/ContactBand'
import './About.css'

export default function About() {
  useEffect(() => { document.title = 'About | Muhammed Rifad KP' }, [])
  return (
    <div className="page about">
      <header className="about-hero wrap">
        <div className="about-hero-copy" data-stagger="90">
          <h1 className="t-display" data-reveal>I’m Rifad.</h1>
          <p className="t-statement" data-reveal>
            A full-stack developer from Calicut. I build websites, stores and web apps for businesses in the UAE and India, and I teach IT to college students.
          </p>
          <dl className="about-facts" data-reveal>
            <div><dt className="muted t-small">Based in</dt><dd>{profile.city}</dd></div>
            <div><dt className="muted t-small">Studied</dt><dd>BCA, Yenepoya University</dd></div>
            <div><dt className="muted t-small">Clients in</dt><dd>The UAE and India</dd></div>
          </dl>
          <div className="about-actions" data-reveal>
            <a className="btn btn-primary" href={profile.resume} download>
              <Download aria-hidden="true" /> Download CV
            </a>
            <a className="btn btn-quiet" href={waLink('Hi Rifad, I read your About page.')} target="_blank" rel="noreferrer">
              <WhatsAppIcon /> Say hello
            </a>
          </div>
        </div>
        <figure className="about-photo" data-reveal>
          <img src="/portrait.webp" alt="Muhammed Rifad KP in a navy shirt with a lanyard, standing by a café counter" width="630" height="787" />
        </figure>
      </header>

      <section className="about-xp wrap section" aria-labelledby="xp-title">
        <h2 id="xp-title" className="t-h2 about-sticky" data-reveal>Where I’ve worked.</h2>
        <ol className="xp-list">
          {experience.map((x) => (
            <li key={x.role + x.where} className="xp-item" data-reveal>
              <p className="xp-when t-small muted tabular">{x.when}</p>
              <div>
                <h3 className="xp-role">{x.role}</h3>
                <p className="xp-where">{x.where}</p>
                <p className="xp-text">{x.text}</p>
                {x.link && (
                  <a className="link" href={x.link.href} target="_blank" rel="noreferrer">
                    {x.link.label} <ArrowUpRight aria-hidden="true" />
                  </a>
                )}
                {x.shots && (
                  <div className="xp-shots">
                    {x.shots.map((s) => (
                      <img key={s} src={`/work/${s}-800.webp`} alt="" width="800" height="500" loading="lazy" />
                    ))}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="about-skills section" aria-labelledby="skills-title">
        <div className="wrap">
          <h2 id="skills-title" className="t-h2" data-reveal>What I work with.</h2>
          <div className="skills-grid" data-stagger="80">
            {skills.map((g) => (
              <div key={g.group} data-reveal>
                <h3 className="skills-group">{g.group}</h3>
                <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-edu wrap section" aria-labelledby="edu-title">
        <h2 id="edu-title" className="t-h2" data-reveal>Education.</h2>
        <ul className="edu-list">
          {education.map((e) => (
            <li key={e.what} data-reveal>
              <span className="tabular muted">{e.when}</span>
              <span className="edu-what">{e.what}</span>
              <span>{e.where}</span>
            </li>
          ))}
        </ul>
      </section>

      <ContactBand title="Want to work together?" />
    </div>
  )
}
