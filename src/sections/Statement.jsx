import { useCallback, useRef } from 'react'
import useScrollProgress from '../hooks/useScrollProgress'
import './Statement.css'

const text = 'I build the whole thing: the page your customers see, the server behind it, and the search listing that brings them in. One developer, start to finish.'
const words = text.split(' ')

/* The words fill with ink as the paragraph crosses the screen. */
export default function Statement() {
  const ref = useRef(null)
  const paint = useCallback((p) => { ref.current.style.setProperty('--p', p.toFixed(4)) }, [])
  useScrollProgress(ref, paint)
  return (
    <section className="statement wrap section" aria-labelledby="statement-title">
      <h2 id="statement-title" className="visually-hidden">What I do</h2>
      <p ref={ref} className="statement-text" style={{ '--n': words.length }}>
        {words.map((w, i) => (
          <span key={i} className="statement-w" style={{ '--i': i }}>{w} </span>
        ))}
      </p>
    </section>
  )
}
