import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Search } from 'lucide-react'
import TLink from './TLink'
import { ChatIcon, HomeIcon, Mark, PersonIcon, SparkIcon, WorkIcon } from './Icons'
import { profile, waLink } from '../data/site'
import './Nav.css'

const top = [
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/ai', label: 'Ask AI' },
  { to: '/contact', label: 'Contact' },
]
const tabs = [
  { to: '/', label: 'Home', Icon: HomeIcon },
  { to: '/projects', label: 'Work', Icon: WorkIcon },
  { to: '/about', label: 'About', Icon: PersonIcon },
  { to: '/contact', label: 'Contact', Icon: ChatIcon },
]

const isAt = (pathname, to) => (to === '/' ? pathname === '/' : pathname === to || pathname.startsWith(`${to}/`))

/**
 * Desktop: a glass capsule of links with a lens that slides to the current page.
 * Phone: the same idea as a floating tab bar within reach of the thumb.
 */
export default function Nav({ onSearch }) {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [small, setSmall] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let raf = 0
    const read = () => {
      raf = 0
      const y = window.scrollY
      setScrolled(y > 8)
      if (Math.abs(y - lastY) > 6) { setSmall(y > lastY && y > 120); lastY = y }
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', on, { passive: true })
    return () => { window.removeEventListener('scroll', on); cancelAnimationFrame(raf) }
  }, [])

  const topIndex = top.findIndex((l) => isAt(pathname, l.to))
  const tabIndex = tabs.findIndex((l) => isAt(pathname, l.to))

  return (
    <>
      <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-bar wrap">
          <TLink to="/" className="nav-mark" aria-label={`${profile.name}, home`}>
            <Mark size={30} />
            <span translate="no">Rifad</span>
          </TLink>

          <nav aria-label="Main" className="nav-capsule glass" style={{ '--n': top.length, '--i': topIndex }}>
            <span className={`seg-lens ${topIndex < 0 ? 'is-off' : ''}`} aria-hidden="true" />
            {top.map((l, i) => (
              <TLink key={l.to} to={l.to} className="nav-link" aria-current={i === topIndex ? 'page' : undefined}>
                {l.label}
              </TLink>
            ))}
          </nav>

          <div className="nav-side">
            <button type="button" className="btn btn-round nav-search" onClick={onSearch} aria-label="Search the site" aria-keyshortcuts="Control+K Meta+K">
              <Search aria-hidden="true" />
            </button>
            <a className="btn btn-primary btn-small nav-cta" href={waLink('Hi Rifad, I would like to talk about a website.')} target="_blank" rel="noreferrer">
              Start a project
            </a>
          </div>
        </div>
      </header>

      <div className={`tabbar ${small ? 'is-small' : ''}`}>
        <nav aria-label="Main, phone" className="tabbar-pill glass" style={{ '--n': tabs.length, '--i': tabIndex }}>
          <span className={`seg-lens ${tabIndex < 0 ? 'is-off' : ''}`} aria-hidden="true" />
          {tabs.map(({ to, label, Icon }, i) => (
            <TLink key={to} to={to} className="tab" aria-current={i === tabIndex ? 'page' : undefined}>
              <Icon filled={i === tabIndex} />
              <span>{label}</span>
            </TLink>
          ))}
        </nav>
        <TLink to="/ai" className="tabbar-ask glass" aria-label="Ask AI" aria-current={isAt(pathname, '/ai') ? 'page' : undefined}>
          <SparkIcon filled={isAt(pathname, '/ai')} />
        </TLink>
      </div>
    </>
  )
}
