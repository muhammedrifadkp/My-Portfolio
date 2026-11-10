import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import './AboutTeaser.css'

export default function AboutTeaser() {
  return (
    <section className="teaser wrap section" aria-labelledby="teaser-title">
      <figure className="teaser-photo" data-reveal>
        <img src="/portrait.webp" alt="Muhammed Rifad KP in a navy shirt, standing by a café counter" width="630" height="787" loading="lazy" />
      </figure>
      <div className="teaser-copy" data-stagger="80">
        <h2 id="teaser-title" className="t-h2" data-reveal>Developer, and a teacher.</h2>
        <p className="t-statement" data-reveal>
          I taught full-stack at CADD Centre, and now I run the IT lab at Sirajul Huda while building for clients.
        </p>
        <p data-reveal>
          Teaching keeps me clear. I explain what I build in plain words, I write code someone else can pick up, and I ship on the date we agree.
        </p>
        <div data-reveal>
          <Link to="/about" className="btn btn-quiet">
            More about me <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
