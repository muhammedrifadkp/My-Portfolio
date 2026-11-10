import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { categories, projects } from '../data/site'
import './WorkIndex.css'

/* Every project as one line; hovering a line floats its screenshot by the cursor. */
export default function WorkIndex({ id = 'work', title = 'All the work', exclude = [] }) {
  const [params, setParams] = useSearchParams()
  const type = categories.some((c) => c.id === params.get('type')) ? params.get('type') : 'all'
  const list = projects.filter((p) => !exclude.includes(p.slug) && (type === 'all' || p.category === type))
  const counts = Object.fromEntries(categories.map((c) => [c.id, projects.filter((p) => !exclude.includes(p.slug) && (c.id === 'all' || p.category === c.id)).length]))

  const [hover, setHover] = useState(null)
  const preview = useRef(null)
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0 })

  useEffect(() => {
    let raf
    const tick = () => {
      const p = pos.current
      p.cx += (p.x - p.cx) * 0.18
      p.cy += (p.y - p.cy) * 0.18
      if (preview.current) preview.current.style.transform = `translate3d(${p.cx}px, ${p.cy}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const onMove = (e) => {
    pos.current.x = e.clientX + 28
    pos.current.y = e.clientY - 120
  }

  const pick = (id) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('type')
    else next.set('type', id)
    setParams(next, { replace: true, preventScrollReset: true })
  }

  return (
    <section id={id} className="index wrap section" aria-labelledby={`${id}-title`} onPointerMove={onMove}>
      <div className="index-head">
        <h2 id={`${id}-title`} className="t-h2" data-reveal>{title}</h2>
        <div className="index-filters" role="group" aria-label="Filter projects" data-reveal>
          {categories.map((c) => (
            <button key={c.id} type="button" aria-pressed={type === c.id} onClick={() => pick(c.id)}>
              {c.label} <span className="tabular muted">{counts[c.id]}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className="index-list" onPointerLeave={() => setHover(null)}>
        {list.map((p) => (
          <li key={p.slug} data-reveal>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              className="index-row"
              onPointerEnter={() => setHover(p.slug)}
              onFocus={() => setHover(null)}
            >
              <img className="index-thumb" src={p.small} alt="" width="800" height="500" loading="lazy" />
              <span className="index-name">{p.name}</span>
              <span className="index-kind">{p.kind}</span>
              <span className="index-stack muted">{p.stack.slice(0, 3).join(', ')}</span>
              <ArrowUpRight className="index-arrow" aria-hidden="true" />
              <span className="visually-hidden"> (opens the live site)</span>
            </a>
          </li>
        ))}
      </ul>

      <div ref={preview} className={`index-preview ${hover ? 'is-on' : ''}`} aria-hidden="true">
        {projects.map((p) => (
          <img key={p.slug} src={p.small} alt="" width="800" height="500" loading="lazy" className={hover === p.slug ? 'is-on' : ''} />
        ))}
      </div>
    </section>
  )
}
