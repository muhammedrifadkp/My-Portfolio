import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ArrowUp, RotateCcw } from 'lucide-react'
import ClientOnly from '../components/ClientOnly'
import { profile, projects, services, waLink } from '../data/site'
import './AI.css'

const Saucer = lazy(() => import('../three/Saucer'))

const suggestions = [
  'What has Rifad built?',
  'Can he build an online store?',
  'How do I contact him?',
  'Explain React hooks simply',
]

const hello = {
  id: 0,
  from: 'bot',
  text: "Hi, I'm Rifad's assistant. Ask me about his work, what he can build for you, or any web development question.",
}

/* Short answers from the site's own data: used when the AI service cannot be reached. */
function offline(q) {
  const s = q.toLowerCase()
  const asks = (...w) => w.some((x) => s.includes(x))
  if (asks('contact', 'email', 'phone', 'reach', 'whatsapp', 'hire', 'price', 'cost', 'quote')) {
    return `You can reach him on WhatsApp at ${profile.phone} or by email at ${profile.email}. Tell him what the site should do and he'll come back with a plan and a price.`
  }
  if (asks('store', 'shop', 'e-commerce', 'ecommerce')) {
    return 'Yes. He has built several stores: AG Star Automobiles (with a Bike Finder that shows only parts that fit your motorcycle), Ztoiq, One Pack Online and FreshMarket, which sends orders straight to WhatsApp.'
  }
  if (asks('skill', 'stack', 'tech', 'language')) {
    return 'He works in React, Next.js, JavaScript and TypeScript on the front end, Node.js, Express and MongoDB on the back end, Three.js for 3D, and ships on Vercel.'
  }
  if (asks('built', 'project', 'work', 'portfolio', 'client')) {
    const list = projects.slice(0, 6).map((p) => `**${p.name}**: ${p.kind.toLowerCase()}`).join('\n')
    return `Some of his work:\n${list}\n\nThere are ${projects.length} projects on the Work page.`
  }
  if (asks('do', 'offer', 'service', 'rifad', 'who')) {
    return `${profile.name} is a full-stack developer in ${profile.city}. He builds websites, online stores and web apps for businesses in the UAE and India.\n\n${services.map((x) => `**${x.name}**: ${x.text}`).join('\n\n')}`
  }
  return null
}

/* The site's own server function talks to the model, so no API key ever reaches the browser. */
async function ask(question, history) {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 25000)
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, history }),
      signal: ctrl.signal,
    })
    if (!res.ok) return null
    const data = await res.json()
    return typeof data.answer === 'string' && data.answer.trim() ? data.answer : null
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

/* minimal, escape-first markdown: code blocks, inline code, bold, line breaks */
function Message({ text }) {
  const parts = text.split(/```[a-zA-Z0-9_+#-]*\n?([\s\S]*?)(?:```|$)/g)
  return parts.map((part, i) => {
    if (i % 2 === 1) return <pre key={i}><code>{part.trim()}</code></pre>
    const html = part
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^#{1,4} (.*)$/gm, '<strong>$1</strong>')
      .replace(/^[*-] (.*)$/gm, '• $1')
      .replace(/\n/g, '<br>')
    return part.trim() ? <p key={i} dangerouslySetInnerHTML={{ __html: html }} /> : null
  })
}

export default function AI() {
  const [messages, setMessages] = useState([hello])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const el = listRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, busy])

  const send = async (raw = input) => {
    const q = raw.trim()
    if (!q || busy) return
    const history = messages.filter((m) => m.id !== 0).slice(-6).map((m) => ({ from: m.from, text: m.text }))
    setMessages((m) => [...m, { id: Date.now(), from: 'me', text: q }])
    setInput('')
    setBusy(true)
    const a =
      (await ask(q, history)) ||
      offline(q) ||
      `I couldn't reach the AI just now. I can still answer questions about Rifad's work, or you can ask him directly on WhatsApp at ${profile.phone}.`
    setMessages((m) => [...m, { id: Date.now() + 1, from: 'bot', text: a }])
    setBusy(false)
    inputRef.current?.focus()
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="page ai">
      <div className="ai-grid wrap">
        <section className="ai-intro" aria-labelledby="ai-title">
          <div className="ai-ship" aria-hidden="true">
            <ClientOnly>
              <Suspense fallback={null}>
                <Saucer busy={busy} className="ai-ship-canvas" />
              </Suspense>
            </ClientOnly>
          </div>
          <h1 id="ai-title" className="t-h2">Ask about Rifad.</h1>
          <p className="ai-lede">
            An AI assistant that knows this site: the projects, the services and how to start. It also answers general questions about building for the web.
          </p>
          <div className="ai-suggest" role="group" aria-label="Suggested questions">
            {suggestions.map((s) => (
              <button key={s} type="button" className="btn btn-small" onClick={() => send(s)} disabled={busy}>{s}</button>
            ))}
          </div>
        </section>

        <section className="ai-chat glass" aria-label="Chat">
          <div className="ai-chat-head">
            <span className="ai-chat-title">Rifad’s assistant</span>
            <button type="button" className="ai-reset" onClick={() => setMessages([hello])} aria-label="Start a new chat">
              <RotateCcw aria-hidden="true" />
            </button>
          </div>
          <div ref={listRef} className="ai-log" role="log" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={`ai-msg ai-${m.from}`}>
                <Message text={m.text} />
              </div>
            ))}
            {busy && <div className="ai-msg ai-bot ai-typing" role="status" aria-label="Answer on its way"><span /><span /><span /></div>}
          </div>
          <form className="ai-input" onSubmit={(e) => { e.preventDefault(); send() }}>
            <label htmlFor="ai-q" className="visually-hidden">Your question</label>
            <textarea
              id="ai-q" ref={inputRef} rows="1" value={input} maxLength={600}
              onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
              placeholder="Ask a question…" autoComplete="off"
            />
            <button type="submit" className="ai-send" disabled={busy || !input.trim()} aria-label="Send question">
              <ArrowUp aria-hidden="true" />
            </button>
          </form>
          <p className="ai-note t-small">
            Want an answer from Rifad himself? <a className="link" href={waLink('Hi Rifad, I have a question.')} target="_blank" rel="noreferrer">Message him on WhatsApp</a>
          </p>
        </section>
      </div>
    </div>
  )
}
