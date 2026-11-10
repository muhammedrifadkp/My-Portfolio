import TLink from './TLink'
import { profile } from '../data/site'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer wrap">
      <p className="t-small">{profile.name}, {profile.role.toLowerCase()} in {profile.city}</p>
      <nav aria-label="Footer" className="footer-links t-small">
        <TLink to="/projects">Work</TLink>
        <TLink to="/about">About</TLink>
        <TLink to="/contact">Contact</TLink>
        {profile.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer me">{s.label}</a>
        ))}
      </nav>
      <p className="t-small muted footer-end">
        © {new Date().getFullYear()} · Desk model by{' '}
        <a href="https://sketchfab.com/Yolala1232" target="_blank" rel="noreferrer">Yolala1232</a>, CC&nbsp;BY&nbsp;4.0
      </p>
    </footer>
  )
}
