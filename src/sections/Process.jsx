import { useEffect, useRef, useState } from 'react'
import { Lock } from 'lucide-react'
import { process } from '../data/site'
import { triggerHaptic } from '../utils/haptics'
import './Process.css'

const stepLabels = ['Message', 'Design', 'Build', 'Launch']

/**
 * How a project goes. The picture on the left assembles itself as the steps
 * scroll by: a first message, a wireframe, the real site, then the site live.
 * Includes interactive stepper pills and touch swipe gestures on mobile.
 */
export default function Process() {
  const [active, setActive] = useState(0)
  const list = useRef(null)
  const touchStartX = useRef(0)

  useEffect(() => {
    const items = Array.from(list.current?.children || [])
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.dataset.i)
            setActive(idx)
          }
        })
      },
      { rootMargin: '-25% 0px -40% 0px' }
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  const goToStep = (i) => {
    triggerHaptic('medium')
    setActive(i)
    const items = list.current?.children
    if (items && items[i]) {
      items[i].scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0 && active < process.length - 1) {
        goToStep(active + 1)
      } else if (diff < 0 && active > 0) {
        goToStep(active - 1)
      }
    }
  }

  return (
    <section className="process wrap section" aria-labelledby="process-title">
      <h2 id="process-title" className="t-h2" data-reveal>From first message to live site.</h2>
      
      {/* Mobile-friendly interactive stage navigation */}
      <div className="process-nav glass" role="tablist" aria-label="Process stages" data-reveal>
        {process.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={active === i}
            className={`process-tab ${active === i ? 'is-active' : ''}`}
            onClick={() => goToStep(i)}
          >
            <span className="process-tab-num">0{i + 1}</span>
            <span className="process-tab-label">{stepLabels[i]}</span>
          </button>
        ))}
      </div>

      <div className="process-body">
        <div
          className="process-visual glass"
          data-step={active}
          aria-hidden="true"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
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
            <li
              key={s.title}
              data-i={i}
              className={`process-step-item ${active === i ? 'is-active' : ''}`}
              onClick={() => goToStep(i)}
            >
              <span className="process-step-num">Step 0{i + 1}</span>
              <h3 className="t-h3">{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
