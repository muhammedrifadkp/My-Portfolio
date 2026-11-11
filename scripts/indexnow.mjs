/**
 * Submits all site URLs to the IndexNow API (Bing, Yahoo, Yandex, Seznam, Naver).
 * Instant indexing for search engines without waiting for web crawlers.
 */
import { site, projects } from '../src/data/site.js'

const KEY = 'cfc7da3d26fbb6cc36170f5c5964452f'
const HOST = 'www.rifad.site'

const urls = [
  `${site.url}/`,
  `${site.url}/projects`,
  `${site.url}/about`,
  `${site.url}/contact`,
  `${site.url}/ai`,
  ...projects.map((p) => `${site.url}/projects/${p.slug}`)
]

export async function pingIndexNow() {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `${site.url}/${KEY}.txt`,
    urlList: urls
  }

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    })
    if (res.status === 200 || res.status === 202) {
      console.log(`✓ IndexNow: successfully submitted ${urls.length} URLs to Bing and Yahoo`)
    } else {
      console.log(`IndexNow returned status ${res.status}: ${await res.text()}`)
    }
  } catch (err) {
    console.warn(`IndexNow notice: ${err.message}`)
  }
}

if (process.argv[1] && process.argv[1].endsWith('indexnow.mjs')) {
  pingIndexNow()
}

