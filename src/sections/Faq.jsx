import { Plus } from 'lucide-react'
import { faqs } from '../data/site'
import { triggerHaptic } from '../utils/haptics'
import './Faq.css'

export default function Faq({ as = 'h2', title = 'Questions people ask.' }) {
  const Title = as
  return (
    <section className="faq wrap section" aria-labelledby="faq-title">
      <Title id="faq-title" className="t-h2 faq-title" data-reveal>{title}</Title>
      <div className="faq-list" data-stagger="50">
        {faqs.map((f) => (
          <details key={f.q} className="faq-item" data-reveal>
            <summary onClick={() => triggerHaptic('light')}>
              <span>{f.q}</span>
              <Plus aria-hidden="true" />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
