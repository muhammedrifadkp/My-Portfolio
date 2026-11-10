import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUpRight, CornerDownLeft, Copy, Download, FileText, Mail, Phone, Search } from 'lucide-react'
import { useGo } from './TLink'
import { ChatIcon, GitHubIcon, HomeIcon, PersonIcon, SparkIcon, WhatsAppIcon, WorkIcon } from './Icons'
import { profile, projects, waLink } from '../data/site'
import './CommandPalette.css'

const open = (href) => () => window.open(href, '_blank', 'noopener')

function buildItems(go, say) {
  const page = (label, to, Icon, more = '') => ({ group: 'Pages', label, more, Icon, run: () => go(to) })
  return [
    page('Home', '/', HomeIcon),
    page('Work', '/projects', WorkIcon, 'projects portfolio sites'),
    page('About', '/about', PersonIcon, 'experience education skills cv'),
    page('Ask AI', '/ai', SparkIcon, 'assistant chat question'),
    page('Contact', '/contact', ChatIcon, 'hire message form'),
    { group: 'Actions', label: 'Message on WhatsApp', more: 'hire chat start project', Icon: WhatsAppIcon, run: open(waLink('Hi Rifad, I would like to talk about a website.')) },
    { group: 'Actions', label: 'Copy email address', more: profile.email, Icon: Copy, run: async () => { try { await navigator.clipboard.writeText(profile.email); say('Email address copied') } catch { window.location.href = `mailto:${profile.email}` } }, stay: true },
    { group: 'Actions', label: 'Write an email', more: profile.email, Icon: Mail, run: () => { window.location.href = `mailto:${profile.email}` } },
    { group: 'Actions', label: `Call ${profile.phone}`, more: 'phone', Icon: Phone, run: () => { window.location.href = profile.phoneHref } },
    { group: 'Actions', label: 'Download CV', more: 'resume pdf', Icon: Download, run: open(profile.resume) },
    { group: 'Actions', label: 'Open GitHub', more: 'code source', Icon: GitHubIcon, run: open(profile.socials[0].href) },
    ...projects.map((p) => ({ group: 'Projects', label: p.name, more: `${p.kind} ${p.stack.join(' ')}`, hint: p.kind, Icon: FileText, run: () => go(`/projects/${p.slug}`) })),
  ]
}

/* Ctrl/⌘ K: jump to any page or project, or start a conversation. */
export default function CommandPalette({ onClose }) {
  const go = useGo()
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const [note, setNote] = useState('')
  const input = useRef(null)
  const list = useRef(null)
  const items = useMemo(() => buildItems(go, setNote), [go])

  const found = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean)
    if (!words.length) return items.filter((i) => i.group !== 'Projects').concat(items.filter((i) => i.group === 'Projects').slice(0, 5))
    return items.filter((i) => words.every((w) => `${i.label} ${i.more || ''}`.toLowerCase().includes(w)))
  }, [q, items])

  useEffect(() => setActive(0), [q])

  useEffect(() => {
    const before = document.activeElement
    document.body.style.overflow = 'hidden'
    input.current?.focus()
    return () => { document.body.style.overflow = ''; before?.focus?.() }
  }, [])

  useEffect(() => {
    list.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const run = (item) => {
    if (!item) return
    item.run()
    if (!item.stay) onClose()
  }

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, found.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
    else if (e.key === 'Home') { e.preventDefault(); setActive(0) }
    else if (e.key === 'End') { e.preventDefault(); setActive(found.length - 1) }
    else if (e.key === 'Enter') { e.preventDefault(); run(found[active]) }
    else if (e.key === 'Escape') { e.preventDefault(); onClose() }
    else if (e.key === 'Tab') e.preventDefault() // one focus stop: the input drives the list
  }

  let group = ''
  return (
    <div className="cmd" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="cmd-panel glass" role="dialog" aria-modal="true" aria-label="Search the site" onKeyDown={onKey}>
        <div className="cmd-field">
          <Search aria-hidden="true" />
          <input
            ref={input}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmd-list"
            aria-activedescendant={found[active] ? `cmd-${active}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck="false"
            placeholder="Search pages, projects, actions…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <button type="button" className="cmd-esc" onClick={onClose} aria-label="Close search">Esc</button>
        </div>
        <ul id="cmd-list" ref={list} role="listbox" aria-label="Results" className="cmd-list">
          {found.length === 0 && <li className="cmd-empty" role="presentation">Nothing matches “{q}”. Try a project name, or “WhatsApp”.</li>}
          {found.map((item, i) => {
            const head = item.group !== group
            group = item.group
            return (
              <li key={item.group + item.label} role="presentation">
                {head && <p className="cmd-group" role="presentation">{item.group}</p>}
                <div
                  id={`cmd-${i}`}
                  role="option"
                  aria-selected={i === active}
                  className="cmd-item"
                  onMouseMove={() => setActive(i)}
                  onClick={() => run(item)}
                >
                  <item.Icon aria-hidden="true" />
                  <span className="cmd-label">{item.label}</span>
                  {item.hint && <span className="cmd-hint">{item.hint}</span>}
                  {i === active ? <CornerDownLeft className="cmd-go" aria-hidden="true" /> : item.group === 'Actions' ? <ArrowUpRight className="cmd-go" aria-hidden="true" /> : null}
                </div>
              </li>
            )
          })}
        </ul>
        <p className="cmd-note" aria-live="polite">{note}</p>
      </div>
    </div>
  )
}
