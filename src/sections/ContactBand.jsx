import { lazy, Suspense, useRef } from 'react'
import ClientOnly from '../components/ClientOnly'
import LocalTime from '../components/LocalTime'
import { profile, waLink } from '../data/site'
import { WhatsAppIcon } from '../components/Icons'
import useInView from '../hooks/useInView'
import { triggerHaptic } from '../utils/haptics'
import './ContactBand.css'

const GlassLogo = lazy(() => import('../three/GlassLogo'))

export default function ContactBand({ as = 'h2', title = 'Have a website in mind?' }) {
  const ref = useRef(null)
  const near = useInView(ref, '500px', true)
  const visible = useInView(ref, '0px')
  const Title = as
  const [user, host] = profile.email.split('@')

  return (
    <section ref={ref} className="cband" aria-labelledby="cband-title">
      <div className="cband-inner wrap">
        <div className="cband-top">
          <div className="cband-intro" data-stagger="80">
            <Title id="cband-title" className="t-h2" data-reveal>{title}</Title>
            <p className="t-statement" data-reveal>Tell me what it should do for your business, and I’ll come back with a plan and a price.</p>
            <div className="cband-actions" data-reveal>
              <a
                className="btn btn-primary"
                href={waLink('Hi Rifad, I have a website in mind.')}
                target="_blank"
                rel="noreferrer"
                onClick={() => triggerHaptic('light')}
              >
                <WhatsAppIcon /> Message on WhatsApp
              </a>
              <a
                className="btn"
                href={profile.phoneHref}
                onClick={() => triggerHaptic('light')}
              >
                Call {profile.phone}
              </a>
            </div>
          </div>
          <div className="cband-logo" aria-hidden="true">
            <span className="cband-logo-hint t-small">Touch & spin 3D mark</span>
            {near && (
              <ClientOnly lite>
                <Suspense fallback={null}>
                  <GlassLogo active={visible} />
                </Suspense>
              </ClientOnly>
            )}
          </div>
        </div>
        <a
          className="cband-email"
          href={`mailto:${profile.email}?subject=${encodeURIComponent('A website project')}`}
          data-reveal
          onClick={() => triggerHaptic('light')}
        >
          <span>{user}</span><span className="cband-at">@{host}</span>
        </a>
        <div className="cband-foot t-small">
          <LocalTime />
          <span className="cband-socials">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                onClick={() => triggerHaptic('light')}
              >
                {s.label}
              </a>
            ))}
          </span>
        </div>
      </div>
    </section>
  )
}
