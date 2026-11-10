import { useEffect, useRef, useState } from 'react'
import { Lock } from 'lucide-react'
import { process } from '../data/site'
import './Process.css'

/**
 * How a project goes. The picture on the left assembles itself as the steps
 * scroll by: a first message, a wireframe, the real site, then the site live.
 * The site it becomes is Rasdent, a dental clinic I built.
 */
export default function Process() {
  const [active, setActive] = useState(0)
  const list = useRef(null)

  useEffect(() => {
    const items = Array.from(list.current.children)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.i)) })
      },
      { rootMargin: '-48% 0px -48% 0px' }
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="process wrap section" aria-labelledby="process-title">
      <h2 id="process-title" className="t-h2" data-reveal>From first message to live site.</h2>
      <div className="process-body">
        <div className="process-visual" data-step={active} aria-hidden="true">
          <div className="pv-stage">
            <div className="pv-chat">
              <p className="pv-bubble pv-in">Hi Rifad, we need a website for our dental clinic.</p>
              <p className="pv-bubble pv-out">Happy to help. What should it do for your patients?</p>
              <p className="pv-bubble pv-in">Show our treatments and take bookings.</p>
            </div>
            <div className="pv-window">
              <div className="pv-bar">
                <span className="pv-dots"><i /><i /><i /></span>
                <span className="pv-url"><Lock /> rasdent.in</span>
                <span className="pv-live">Live</span>
              </div>
              <div className="pv-page">
                <div className="pv-wire">
                  <div className="pv-wire-nav"><i /><i /><i /><i /></div>
                  <div className="pv-wire-hero"><b /><b /><em /></div>
                  <div className="pv-wire-cards"><span /><span /><span /></div>
                </div>
                <img className="pv-real" src="/work/rasdent-800.webp" alt="" width="800" height="500" loading="lazy" />
              </div>
            </div>
            <p className="pv-toast">New booking request on WhatsApp</p>
          </div>
        </div>
        <ol ref={list} className="process-steps">
          {process.map((s, i) => (
            <li key={s.title} data-i={i} className={active === i ? 'is-active' : ''}>
              <h3 className="t-h3">{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
