import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import TLink from '../components/TLink'
import { categories, projects } from '../data/site'
import './WorkIndex.css'

/* Every project as one line; hovering a line floats its screenshot by the cursor. */
export default function WorkIndex({ id = 'work', title = 'All the work.', exclude = [] }) {
  const [params, setParams] = useSearchParams()
  const type = categories.some((c) => c.id === params.get('type')) ? params.get('type') : 'all'
  const pool = projects.filter((p) => !exclude.includes(p.slug))
  const list = pool.filter((p) => type === 'all' || p.category === type)
  const count = (c) => pool.filter((p) => c === 'all' || p.category === c).length

  const [hover, setHover] = useState(null)
  const preview = useRef(null)
  const pos = useRef({ x: 0, y: 0, cx: 0, cy: 0 })

  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    let raf
    const tick = () => {
      const p = pos.current
      p.cx += (p.x - p.cx) * 0.18
      p.cy += (p.y - p.cy) * 0.18
      if (preview.current) preview.current.style.transform = `translate3d(${p.cx}px, ${p.cy}px, 0) rotate(${(p.x - p.cx) * 0.03}deg)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const onMove = (e) => {
    pos.current.x = e.clientX + 28
    pos.current.y = e.clientY - 120
  }

  const pick = (cat) => {
    const next = new URLSearchParams(params)
    if (cat === 'all') next.delete('type')
    else next.set('type', cat)
    setParams(next, { replace: true })
  }

  return (
    <section id={id} className="index wrap section" aria-labelledby={`${id}-title`} onPointerMove={onMove}>
      <div className="index-head">
        <h2 id={`${id}-title`} className="t-h2" data-reveal>{title}</h2>
        <div className="index-filters" role="group" aria-label="Filter projects" data-reveal>
          {categories.filter((c) => count(c.id) > 0).map((c) => (
            <button key={c.id} type="button" className="btn btn-small" aria-pressed={type === c.id} onClick={() => pick(c.id)}>
              {c.label} <span className="tabular index-count">{count(c.id)}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className="index-list" onPointerLeave={() => setHover(null)}>
        {list.map((p) => (
          <li key={p.slug} data-reveal>
            <TLink to={`/projects/${p.slug}`} className="index-row" onPointerEnter={() => setHover(p.slug)}>
              <img className="index-thumb" src={p.small} alt="" width="800" height="500" loading="lazy" />
              <span className="index-name">{p.name}</span>
              <span className="index-kind">{p.kind}</span>
              <span className="index-stack muted">{p.stack.slice(0, 3).join(', ')}</span>
              <ArrowRight className="index-arrow" aria-hidden="true" />
            </TLink>
          </li>
        ))}
      </ul>

      <div ref={preview} className={`index-preview ${hover ? 'is-on' : ''}`} aria-hidden="true">
        {pool.map((p) => (
          <img key={p.slug} src={p.small} alt="" width="800" height="500" loading="lazy" className={hover === p.slug ? 'is-on' : ''} />
        ))}
      </div>
    </section>
  )
}
