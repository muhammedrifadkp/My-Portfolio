import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ArrowUp, RotateCcw } from 'lucide-react'
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

/* Answers about Rifad come from the site's own data, so they are always right. */
function aboutRifad(q) {
  const s = q.toLowerCase()
  const asks = (...w) => w.some((x) => s.includes(x))
  if (!asks('rifad', 'he ', 'his', 'him', 'you build', 'your work', 'hire', 'contact', 'price', 'cost', 'store', 'website for')) return null
  if (asks('contact', 'email', 'phone', 'reach', 'whatsapp', 'hire', 'price', 'cost', 'quote')) {
    return `You can reach him on WhatsApp at ${profile.phone} or by email at ${profile.email}. Tell him what the site should do and he'll come back with a plan and a price.`
  }
  if (asks('store', 'shop', 'e-commerce', 'ecommerce')) {
    return 'Yes. He has built several stores: AG Star Automobiles (with a Bike Finder that shows only parts that fit your motorcycle), Ztoiq, One Pack Online and FreshMarket, which sends orders straight to WhatsApp.'
  }
  if (asks('skill', 'stack', 'tech', 'language')) {
    return 'He works in React, Next.js, JavaScript and TypeScript on the front end, Node.js, Express and MongoDB on the back end, Three.js and GSAP for motion and 3D, and ships on Vercel.'
  }
  if (asks('built', 'project', 'work', 'portfolio', 'client')) {
    const list = projects.slice(0, 6).map((p) => `**${p.name}**: ${p.kind.toLowerCase()}`).join('\n')
    return `Some of his work:\n${list}\n\nThere are ${projects.length} projects on the Work page.`
  }
  if (asks('do', 'offer', 'service')) {
    return services.map((x) => `**${x.name}**: ${x.text}`).join('\n\n')
  }
  return `${profile.name} is a full-stack developer in ${profile.city}. He builds websites, online stores and web apps for businesses in the UAE and India, and teaches IT at Sirajul Huda.`
}

async function askGemini(prompt) {
  const key = import.meta.env.VITE_GEMINI_API_KEY
  if (!key || !key.startsWith('AIza')) return null
  const system = `You are the assistant on the portfolio of ${profile.name}, a full-stack developer in ${profile.city} (React, Next.js, Node.js, MongoDB, Three.js). Answer web development questions clearly and briefly in markdown. For hiring, point to WhatsApp ${profile.phone} or ${profile.email}.`
  for (const model of ['gemini-2.0-flash', 'gemini-2.0-flash-lite', 'gemini-1.5-flash']) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.6, maxOutputTokens: 1200 },
        }),
      })
      if (res.ok) {
        const data = await res.json()
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text
        if (text) return text
      }
    } catch {
      /* try the next model */
    }
  }
  return null
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
  useEffect(() => { document.title = 'Ask AI | Muhammed Rifad KP' }, [])
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
    setMessages((m) => [...m, { id: Date.now(), from: 'me', text: q }])
    setInput('')
    setBusy(true)
    let a = aboutRifad(q)
    if (!a) a = await askGemini(q)
    if (!a) a = `I couldn't reach the AI just now. I can still answer questions about Rifad's work, or you can ask him directly on WhatsApp at ${profile.phone}.`
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
          <Suspense fallback={<div className="ai-ship" />}>
            <Saucer busy={busy} className="ai-ship" />
          </Suspense>
          <h1 id="ai-title" className="t-h2">Ask about Rifad.</h1>
          <p className="ai-lede">
            Questions about his work get answers from this site. Anything else about building for the web goes to Google Gemini.
          </p>
          <div className="ai-suggest" role="group" aria-label="Suggested questions">
            {suggestions.map((s) => (
              <button key={s} type="button" onClick={() => send(s)} disabled={busy}>{s}</button>
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
            {busy && <div className="ai-msg ai-bot ai-typing" aria-label="Answer on its way"><span /><span /><span /></div>}
          </div>
          <form className="ai-input" onSubmit={(e) => { e.preventDefault(); send() }}>
            <label htmlFor="ai-q" className="visually-hidden">Your question</label>
            <textarea
              id="ai-q" ref={inputRef} rows="1" value={input}
              onChange={(e) => setInput(e.target.value)} onKeyDown={onKey}
              placeholder="Ask a question…" autoComplete="off"
            />
            <button type="submit" className="ai-send" disabled={busy || !input.trim()} aria-label="Send question">
              <ArrowUp aria-hidden="true" />
            </button>
          </form>
          <p className="ai-note t-small muted">
            Want a real answer from Rifad? <a className="link" href={waLink('Hi Rifad, I have a question.')} target="_blank" rel="noreferrer">Message him on WhatsApp</a>
          </p>
        </section>
      </div>
    </div>
  )
}
