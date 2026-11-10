import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Mail, Phone, Plus } from 'lucide-react'
import { faqs, profile, waLink } from '../data/site'
import { WhatsAppIcon } from '../components/Icons'
import './Contact.css'

const Logo3D = lazy(() => import('../three/Logo3D'))

const empty = { name: '', reach: '', message: '' }

export default function Contact() {
  useEffect(() => { document.title = 'Contact | Muhammed Rifad KP' }, [])
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(null)
  const nameRef = useRef(null)
  const reachRef = useRef(null)
  const msgRef = useRef(null)
  const refs = { name: nameRef, reach: reachRef, message: msgRef }

  /* warn before leaving with an unsent message */
  useEffect(() => {
    const dirty = Object.values(form).some((v) => v.trim())
    if (!dirty) return
    const warn = (e) => { e.preventDefault(); e.returnValue = '' }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [form])

  const set = (k) => (e) => {
    const value = e.target.value
    setForm((f) => ({ ...f, [k]: value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  const validate = () => {
    const v = { name: form.name.trim(), reach: form.reach.trim(), message: form.message.trim() }
    const e = {}
    if (!v.name) e.name = 'Add your name so I know who’s writing.'
    if (!v.reach) e.reach = 'Add an email or a phone number so I can reply.'
    else if (!/@/.test(v.reach) && v.reach.replace(/\D/g, '').length < 7) e.reach = 'That doesn’t look like an email or a phone number.'
    if (v.message.length < 10) e.message = 'Tell me a little more: what should the site do?'
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) refs[first].current?.focus()
    return first ? null : v
  }

  const body = (v) => `Hi Rifad,\n\n${v.message}\n\nName: ${v.name}\nReach me at: ${v.reach}`

  const submit = (via) => (ev) => {
    if (ev) ev.preventDefault()
    const v = validate()
    if (!v) return
    if (via === 'wa') window.open(waLink(body(v)), '_blank', 'noopener')
    else window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(`Website enquiry from ${v.name}`)}&body=${encodeURIComponent(body(v))}`
    setSent(via)
    setForm(empty)
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit('wa')(e)
  }

  return (
    <div className="page contact">
      <section className="contact-hero wrap" aria-labelledby="contact-title">
        <div className="contact-copy" data-stagger="90">
          <h1 id="contact-title" className="t-display" data-reveal>Let’s talk.</h1>
          <p className="t-statement" data-reveal>
            Tell me about the business and what the website should do. I’ll come back with a plan and a price.
          </p>
          <ul className="contact-ways" data-reveal>
            <li>
              <a href={waLink('Hi Rifad, I would like to talk about a website.')} target="_blank" rel="noreferrer">
                <WhatsAppIcon /> WhatsApp {profile.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}><Mail aria-hidden="true" /> {profile.email}</a>
            </li>
            <li>
              <a href={profile.phoneHref}><Phone aria-hidden="true" /> Call {profile.phone}</a>
            </li>
          </ul>
        </div>
        <div className="contact-logo">
          <Suspense fallback={null}>
            <Logo3D className="contact-canvas" />
          </Suspense>
        </div>
      </section>

      <section className="contact-form-wrap wrap" aria-labelledby="form-title">
        <form className="contact-form" noValidate onSubmit={submit('wa')}>
          <h2 id="form-title" className="t-h2">Write to me.</h2>
          <div className="field">
            <label htmlFor="f-name">Your name</label>
            <input
              id="f-name" ref={nameRef} name="name" autoComplete="name"
              value={form.name} onChange={set('name')} placeholder="Aisha Rahman…"
              aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined}
            />
            {errors.name && <p id="e-name" className="field-error">{errors.name}</p>}
          </div>
          <div className="field">
            <label htmlFor="f-reach">Email or phone</label>
            <input
              id="f-reach" ref={reachRef} name="contact" autoComplete="email" inputMode="email" spellCheck="false"
              value={form.reach} onChange={set('reach')} placeholder="you@company.com or +971…"
              aria-invalid={!!errors.reach} aria-describedby={errors.reach ? 'e-reach' : undefined}
            />
            {errors.reach && <p id="e-reach" className="field-error">{errors.reach}</p>}
          </div>
          <div className="field">
            <label htmlFor="f-msg">What do you need?</label>
            <textarea
              id="f-msg" ref={msgRef} name="message" rows="6"
              value={form.message} onChange={set('message')} onKeyDown={onKey}
              placeholder="A site for my clinic with online booking…"
              aria-invalid={!!errors.message} aria-describedby={errors.message ? 'e-msg' : undefined}
            />
            {errors.message && <p id="e-msg" className="field-error">{errors.message}</p>}
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary"><WhatsAppIcon /> Send on WhatsApp</button>
            <button type="button" className="btn btn-quiet" onClick={submit('mail')}><Mail aria-hidden="true" /> Send by email</button>
          </div>
          <p className="form-status t-small" aria-live="polite">
            {sent === 'wa' && 'WhatsApp opened with your message. Press send there and I’ll reply.'}
            {sent === 'mail' && 'Your email app opened with the message. Press send there and I’ll reply.'}
          </p>
        </form>

        <div className="faq">
          <h2 className="faq-title">Questions people ask</h2>
          {faqs.map((f) => (
            <details key={f.q} className="faq-item">
              <summary>{f.q}<Plus aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
