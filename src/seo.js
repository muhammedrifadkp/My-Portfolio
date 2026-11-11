/**
 * Titles, descriptions and structured data for every route.
 * The prerender script writes them into each page's HTML; the client keeps
 * them in step as you move between pages.
 */
import { bySlug, education, faqs, hostOf, profile, projects, services, site } from './data/site'

const abs = (path) => site.url + (path === '/' ? '/' : path)
const PERSON = `${site.url}/#person`
const WEBSITE = `${site.url}/#website`
const SERVICE = `${site.url}/#service`
const OG_IMAGE = `${site.url}/og.jpg`

const person = () => ({
  '@type': 'Person',
  '@id': PERSON,
  name: profile.name,
  alternateName: ['Rifad', 'Muhammed Rifad', 'Rifad KP', 'muhammedrifadkp'],
  url: abs('/'),
  image: `${site.url}/portrait.webp`,
  jobTitle: 'Full-Stack Web Developer & Software Engineer',
  description: 'Full-stack developer in Calicut, Kerala, building websites, online stores and web apps for businesses in the UAE and India. Specialised in Next.js, React, Node.js, and Three.js.',
  email: `mailto:${profile.email}`,
  telephone: '+917356852496',
  address: { '@type': 'PostalAddress', addressLocality: profile.locality, addressRegion: profile.region, addressCountry: profile.country },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Yenepoya University' },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Full-Stack Web Developer',
    skills: 'Next.js, React, Node.js, TypeScript, Three.js, MongoDB, Express, Shopify, Tailwind CSS, REST APIs, Web Performance, SEO',
    occupationLocation: [
      { '@type': 'City', name: 'Kozhikode' },
      { '@type': 'AdministrativeArea', name: 'Kerala' },
      { '@type': 'Country', name: 'India' },
      { '@type': 'Country', name: 'United Arab Emirates' },
    ],
  },
  knowsAbout: [
    'Web development', 'Next.js', 'React', 'TypeScript', 'Node.js', 'Express',
    'MongoDB', 'Tailwind CSS', 'Three.js', 'E-commerce websites', 'Shopify development',
    'Search engine optimisation', 'Generative Engine Optimisation (GEO)', 'Full-Stack Engineering'
  ],
  knowsLanguage: ['en', 'ml'],
  sameAs: profile.socials.map((s) => s.href),
})

const website = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE,
  url: abs('/'),
  name: site.name,
  alternateName: [profile.name, 'Rifad KP', 'Muhammed Rifad Portfolio'],
  description: 'Portfolio of Muhammed Rifad KP, full-stack web developer in Kerala & UAE.',
  inLanguage: 'en',
  publisher: { '@id': PERSON },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${site.url}/projects?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
})

const service = () => ({
  '@type': 'ProfessionalService',
  '@id': SERVICE,
  name: `${profile.name} — Web development`,
  url: abs('/'),
  image: OG_IMAGE,
  telephone: '+917356852496',
  email: profile.email,
  priceRange: '$$',
  currenciesAccepted: 'INR, AED, USD',
  paymentAccepted: 'Bank Transfer, UPI, Cash',
  openingHours: 'Mo-Sa 09:00-20:00',
  founder: { '@id': PERSON },
  address: { '@type': 'PostalAddress', addressLocality: profile.locality, addressRegion: profile.region, addressCountry: profile.country },
  geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: [
    { '@type': 'Country', name: 'United Arab Emirates' },
    { '@type': 'Country', name: 'India' },
  ],
  knowsLanguage: ['en', 'ml'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Web development services',
    itemListElement: services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, description: s.text } })),
  },
})

const crumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
})

const page = (type, path, name, description, extra = {}) => ({
  '@type': type,
  '@id': `${abs(path)}#page`,
  url: abs(path),
  name,
  description,
  inLanguage: 'en',
  isPartOf: { '@id': WEBSITE },
  ...extra,
})

const faqNode = () => ({
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
})

const work = (p) => ({
  '@type': 'CreativeWork',
  '@id': `${abs(`/projects/${p.slug}`)}#work`,
  name: p.name,
  headline: `${p.name}: ${p.kind}`,
  description: p.pitch,
  url: abs(`/projects/${p.slug}`),
  sameAs: p.url,
  image: site.url + p.src,
  creator: { '@id': PERSON },
  keywords: p.stack.join(', '),
  genre: p.kind,
})

const graph = (...nodes) => ({ '@context': 'https://schema.org', '@graph': nodes })

/** Everything a page needs in <head>. */
export function metaFor(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const base = { path, canonical: abs(path), image: OG_IMAGE, type: 'website', index: true }

  if (path === '/') {
    const title = 'Muhammed Rifad KP | Full-Stack Web Developer in Kerala'
    const description = 'Muhammed Rifad KP builds fast websites, online stores and web apps for businesses in the UAE and India. Next.js, React and Node.js, from Calicut, Kerala.'
    return { ...base, title, description, jsonLd: graph(website(), person(), service(), page('WebPage', '/', title, description, { about: { '@id': PERSON } }), faqNode()) }
  }
  if (path === '/projects') {
    const title = `Work: ${projects.length} Websites and Web Apps | Muhammed Rifad KP`
    const description = `${projects.length} live projects by Muhammed Rifad KP: a Dubai property portal, online stores, clinic and agency sites, and a MERN attendance system.`
    return {
      ...base, title, description,
      jsonLd: graph(website(), person(), page('CollectionPage', path, title, description, {
        mainEntity: { '@type': 'ItemList', numberOfItems: projects.length, itemListElement: projects.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, url: abs(`/projects/${p.slug}`) })) },
      }), crumbs([['Home', '/'], ['Work', path]])),
    }
  }
  if (path.startsWith('/projects/')) {
    const p = bySlug[path.slice('/projects/'.length)]
    if (p) {
      const title = `${p.name}: ${p.kind} | Rifad`
      const description = `${p.pitch} Built by Muhammed Rifad KP with ${p.stack.slice(0, 3).join(', ')}. Live at ${hostOf(p.url)}.`
      return { ...base, title, description, image: site.url + p.src, type: 'article', jsonLd: graph(website(), person(), page('WebPage', path, title, description, { mainEntity: { '@id': `${abs(path)}#work` } }), work(p), crumbs([['Home', '/'], ['Work', '/projects'], [p.name, path]])) }
    }
  }
  if (path === '/about') {
    const title = 'About Muhammed Rifad KP | Full-Stack Developer and IT Teacher'
    const description = 'Rifad is a full-stack developer from Calicut, Kerala, with a BCA from Yenepoya University. He builds for clients in the UAE and India and teaches IT at Sirajul Huda.'
    return {
      ...base, title, description, image: `${site.url}/portrait.webp`, type: 'profile',
      jsonLd: graph(website(), { ...person(), hasCredential: education.map((e) => ({ '@type': 'EducationalOccupationalCredential', name: e.what, recognizedBy: { '@type': 'Organization', name: e.where } })) }, page('ProfilePage', path, title, description, { mainEntity: { '@id': PERSON } }), crumbs([['Home', '/'], ['About', path]])),
    }
  }
  if (path === '/contact') {
    const title = 'Contact Rifad | Start a Website Project'
    const description = `Message Muhammed Rifad KP on WhatsApp at ${profile.phone} or email ${profile.email} to plan a website, online store or web app.`
    return { ...base, title, description, jsonLd: graph(website(), person(), service(), page('ContactPage', path, title, description, { mainEntity: { '@id': PERSON } }), faqNode(), crumbs([['Home', '/'], ['Contact', path]])) }
  }
  if (path === '/ai') {
    const title = 'Ask AI About Rifad’s Work | Muhammed Rifad KP'
    const description = 'Ask an AI assistant about Muhammed Rifad KP: what he has built, what he can build for you, and how to start a project.'
    return { ...base, title, description, jsonLd: graph(website(), person(), page('WebPage', path, title, description), crumbs([['Home', '/'], ['Ask AI', path]])) }
  }
  return { ...base, canonical: null, index: false, title: 'Page not found | Muhammed Rifad KP', description: 'This page does not exist. See the work of Muhammed Rifad KP instead.', jsonLd: graph(website(), person()) }
}

/** Every URL that gets its own HTML file and a sitemap entry. */
export const staticPaths = ['/', '/projects', ...projects.map((p) => `/projects/${p.slug}`), '/about', '/contact', '/ai']

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** The <head> tags for a route, as an HTML string (used when prerendering). */
export function headTags(m) {
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${m.index ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, follow'}" />`,
    m.canonical ? `<link rel="canonical" href="${m.canonical}" />` : '',
    `<meta property="og:site_name" content="${site.name}" />`,
    `<meta property="og:type" content="${m.type}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    m.canonical ? `<meta property="og:url" content="${m.canonical}" />` : '',
    `<meta property="og:image" content="${m.image}" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${m.image}" />`,
    `<script type="application/ld+json" id="ld">${JSON.stringify(m.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.filter(Boolean).join('\n  ')
}

/** Client side: bring <head> in line with the route just navigated to. */
export function applyMeta(pathname) {
  const m = metaFor(pathname)
  document.title = m.title
  const set = (sel, attr, value) => { const el = document.head.querySelector(sel); if (el && value) el.setAttribute(attr, value) }
  set('meta[name="description"]', 'content', m.description)
  set('meta[name="robots"]', 'content', m.index ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, follow')
  set('link[rel="canonical"]', 'href', m.canonical || abs('/'))
  set('meta[property="og:title"]', 'content', m.title)
  set('meta[property="og:description"]', 'content', m.description)
  set('meta[property="og:url"]', 'content', m.canonical || abs('/'))
  set('meta[property="og:image"]', 'content', m.image)
  set('meta[name="twitter:title"]', 'content', m.title)
  set('meta[name="twitter:description"]', 'content', m.description)
  set('meta[name="twitter:image"]', 'content', m.image)
  const ld = document.getElementById('ld')
  if (ld) ld.textContent = JSON.stringify(m.jsonLd)
}
