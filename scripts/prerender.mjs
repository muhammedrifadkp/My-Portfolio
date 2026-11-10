/**
 * Runs after `vite build`. Turns the single-page app into real HTML files:
 * one per route, each with its own title, description, canonical URL and
 * structured data, so search engines and AI crawlers read the content
 * without running any JavaScript. Also writes sitemap.xml and llms.txt.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const dist = path.join(root, 'dist')
const { render, staticPaths, data } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const manifest = JSON.parse(fs.readFileSync(path.join(dist, '.vite/manifest.json'), 'utf8'))
const { site, profile, projects, services, faqs, process: steps, experience, education, skills } = data

/* the JS a page needs, so the browser can fetch it alongside the entry */
const pageFile = { home: 'Home', projects: 'Projects', project: 'Project', about: 'About', contact: 'Contact', ai: 'AI', notfound: 'NotFound' }
function preloads(route) {
  const seen = new Set()
  const walk = (key) => {
    const chunk = manifest[key]
    if (!chunk || seen.has(chunk.file)) return
    seen.add(chunk.file)
    ;(chunk.imports || []).forEach(walk)
  }
  walk(`src/pages/${pageFile[route]}.jsx`)
  const entry = manifest['index.html']
  return [...seen].filter((f) => !entry || f !== entry.file).map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`)
}

function build(url, extraHead = []) {
  const { html, head, route } = render(url)
  return template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, head)
    .replace('<!--preload-->', [...extraHead, ...preloads(route)].join('\n  '))
    .replace('<!--app-html-->', html)
}

const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}

const heroPoster = [
  '<link rel="preload" as="image" href="/poster-desk.webp" media="(min-aspect-ratio: 88/100)" fetchpriority="high" />',
  '<link rel="preload" as="image" href="/poster-desk-tall.webp" media="(max-aspect-ratio: 88/100)" fetchpriority="high" />',
]

for (const url of staticPaths) {
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url, 'index.html')
  write(file, build(url, url === '/' ? heroPoster : []))
}
write(path.join(dist, '404.html'), build('/404'))

/* ---- sitemap.xml ---- */
const today = new Date().toISOString().slice(0, 10)
const priority = (u) => (u === '/' ? '1.0' : u === '/projects' ? '0.9' : u.startsWith('/projects/') ? '0.7' : '0.8')
const loc = (u) => site.url + (u === '/' ? '/' : u)
write(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${staticPaths
  .map((u) => {
    const p = u.startsWith('/projects/') ? projects.find((x) => u.endsWith(x.slug)) : null
    const image = p ? `\n    <image:image><image:loc>${site.url}${p.src}</image:loc></image:image>` : ''
    return `  <url>\n    <loc>${loc(u)}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority(u)}</priority>${image}\n  </url>`
  })
  .join('\n')}
</urlset>
`
)

/* ---- llms.txt: the site in plain Markdown for AI assistants ---- */
const projectLine = (p) => `- [${p.name}](${site.url}/projects/${p.slug}): ${p.kind}. ${p.pitch} Built with ${p.stack.join(', ')}. Live at ${p.url}`
const llms = `# ${profile.name} (${site.name})

> ${profile.name} is a full-stack web developer based in ${profile.city}, India. He builds websites, online stores and web apps for businesses in the United Arab Emirates and India, using Next.js, React, TypeScript, Node.js and MongoDB. This is his portfolio: ${site.url}

## Key facts

- Name: ${profile.name} (also known as Rifad)
- Role: Freelance full-stack web developer and IT teacher
- Location: Calicut (Kozhikode), Kerala, India. Works remotely with clients in the UAE (Dubai, Abu Dhabi) and across India
- Education: Bachelor of Computer Applications, Yenepoya University, Mangaluru (2021 to 2024)
- Contact: WhatsApp or phone ${profile.phone}, email ${profile.email}
- Profiles: ${profile.socials.map((s) => `${s.label} ${s.href}`).join(', ')}
- Projects shown: ${projects.length}

## Services

${services.map((s) => `- ${s.name}: ${s.text}`).join('\n')}

## How a project goes

${steps.map((s, i) => `${i + 1}. ${s.title} ${s.text}`).join('\n')}

## Pages

- [Home](${site.url}/): overview, selected work, services and contact
- [Work](${site.url}/projects): all ${projects.length} projects
- [About](${site.url}/about): experience, skills and education
- [Contact](${site.url}/contact): WhatsApp, email, phone and common questions
- [Ask AI](${site.url}/ai): an assistant that answers questions about his work

## Projects

${projects.map(projectLine).join('\n')}

## Questions and answers

${faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}
`
write(path.join(dist, 'llms.txt'), llms)

const full = `${llms}
## Experience

${experience.map((x) => `- ${x.role}, ${x.where} (${x.when}): ${x.text}`).join('\n')}

## Education

${education.map((e) => `- ${e.what}, ${e.where} (${e.when})`).join('\n')}

## Skills

${skills.map((g) => `- ${g.group}: ${g.items.join(', ')}`).join('\n')}

## Project details

${projects.map((p) => `### ${p.name}\n- Type: ${p.kind}\n- What it is: ${p.pitch}\n- Highlights: ${p.points.join('; ')}\n- Built with: ${p.stack.join(', ')}\n- Live site: ${p.url}\n- Case page: ${site.url}/projects/${p.slug}`).join('\n\n')}
`
write(path.join(dist, 'llms-full.txt'), full)

console.log(`prerendered ${staticPaths.length} pages + 404, sitemap.xml, llms.txt, llms-full.txt`)
