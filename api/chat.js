/**
 * POST /api/chat  { question: string, history?: [{ from: 'me' | 'bot', text: string }] }
 * Answers with Google Gemini, grounded in the site's own data.
 * The API key stays on the server: set GEMINI_API_KEY in the Vercel project
 * (the older VITE_GEMINI_API_KEY is read too, so an existing setup keeps working).
 */
import { experience, faqs, process as steps, profile, projects, services, site, skills } from '../src/data/site.js'

const MODELS = ['gemini-flash-latest', 'gemini-flash-lite-latest', 'gemini-3-flash-preview', 'gemini-2.5-flash']
const ALLOWED = [/^https:\/\/(www\.)?rifad\.site$/, /^https:\/\/[a-z0-9-]+\.vercel\.app$/, /^http:\/\/localhost(:\d+)?$/]

const system = `You are the assistant on the portfolio website of ${profile.name} ("Rifad"), ${site.url}.
Answer questions about Rifad using only the facts below. If something is not covered, say you don't know and suggest asking him on WhatsApp (${profile.phone}) or by email (${profile.email}). Never invent clients, prices, dates or reviews.
You may also answer general web development questions, briefly and clearly.
Keep answers short (under 120 words unless code is needed), friendly and in plain language. Use simple Markdown: **bold**, short lists, fenced code blocks. Refer to Rifad as "he".

FACTS
- ${profile.name} is a freelance full-stack web developer based in Calicut (Kozhikode), Kerala, India. He works remotely with businesses in the UAE and India.
- Contact: WhatsApp or phone ${profile.phone}; email ${profile.email}. Site: ${site.url}
- Services: ${services.map((s) => `${s.name} (${s.text})`).join(' | ')}
- How a project goes: ${steps.map((s, i) => `${i + 1}) ${s.title} ${s.text}`).join(' ')}
- Skills: ${skills.map((g) => `${g.group}: ${g.items.join(', ')}`).join('; ')}
- Experience: ${experience.map((x) => `${x.role} at ${x.where} (${x.when}): ${x.text}`).join(' | ')}
- Education: Bachelor of Computer Applications, Yenepoya University, Mangaluru (2021 to 2024).
- Common questions: ${faqs.map((f) => `Q: ${f.q} A: ${f.a}`).join(' | ')}
- Projects (${projects.length}): ${projects.map((p) => `${p.name}, ${p.kind}: ${p.pitch} Built with ${p.stack.join(', ')}. Live: ${p.url}. Page: ${site.url}/projects/${p.slug}`).join(' | ')}`

const hits = new Map() // per warm instance: a light brake on abuse, not a guarantee

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Use POST.' })
  }
  const origin = req.headers.origin
  if (origin && !ALLOWED.some((re) => re.test(origin))) return res.status(403).json({ error: 'Not allowed from this site.' })

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown'
  const now = Date.now()
  const recent = (hits.get(ip) || []).filter((t) => now - t < 60000)
  if (recent.length >= 12) return res.status(429).json({ error: 'Too many questions. Try again in a minute.' })
  hits.set(ip, [...recent, now])

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {}
  const question = typeof body.question === 'string' ? body.question.trim().slice(0, 600) : ''
  if (!question) return res.status(400).json({ error: 'Ask a question.' })
  const history = Array.isArray(body.history) ? body.history.slice(-6) : []

  const key = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY
  if (!key) return res.status(503).json({ error: 'The assistant is not configured.' })

  const contents = [
    ...history
      .filter((m) => m && typeof m.text === 'string')
      .map((m) => ({ role: m.from === 'me' ? 'user' : 'model', parts: [{ text: m.text.slice(0, 1200) }] })),
    { role: 'user', parts: [{ text: question }] },
  ]

  const tried = []
  for (const model of MODELS) {
    try {
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        signal: AbortSignal.timeout(9000),
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents,
          generationConfig: { temperature: 0.5, maxOutputTokens: 900 },
        }),
      })
      tried.push(`${model}: ${r.status}`)
      if (!r.ok) continue
      const data = await r.json()
      const answer = (data.candidates?.[0]?.content?.parts || []).map((p) => p.text || '').join('').trim()
      if (answer) {
        res.setHeader('Cache-Control', 'no-store')
        return res.status(200).json({ answer })
      }
    } catch (e) {
      tried.push(`${model}: ${e.name || 'error'}`)
    }
  }
  /* status codes only (400/403 = key problem, 429 = quota, 404 = model name): safe to show, useful to fix */
  return res.status(502).json({ error: 'The assistant could not answer just now.', tried })
}

function safeParse(text) {
  try { return JSON.parse(text) } catch { return {} }
}
