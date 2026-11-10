import { lazy, Suspense, useRef } from 'react'
import { profile, waLink } from '../data/site'
import { WhatsAppIcon } from '../components/Icons'
import useInView from '../hooks/useInView'
import './ContactBand.css'

const Logo3D = lazy(() => import('../three/Logo3D'))

export default function ContactBand({ as = 'h2', title = 'Have a website in mind?' }) {
  const ref = useRef(null)
  const near = useInView(ref, '400px', true)
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
              <a className="btn btn-primary" href={waLink('Hi Rifad, I have a website in mind.')} target="_blank" rel="noreferrer">
                <WhatsAppIcon /> Message on WhatsApp
              </a>
              <a className="btn btn-quiet" href={profile.phoneHref}>Call {profile.phone}</a>
            </div>
          </div>
          <div className="cband-logo">
            {near && (
              <Suspense fallback={null}>
                <Logo3D className="cband-canvas" active={visible} />
              </Suspense>
            )}
          </div>
        </div>
        <a className="cband-email" href={`mailto:${profile.email}?subject=${encodeURIComponent('A website project')}`} data-reveal>
          <span>{user}</span><span className="cband-at">@{host}</span>
        </a>
        <div className="cband-foot t-small">
          <span>{profile.city}, India</span>
          <span className="cband-socials">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
          </span>
        </div>
      </div>
    </section>
  )
}
