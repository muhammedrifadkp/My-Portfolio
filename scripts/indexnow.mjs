/** Notifies participating search engines about changed URLs after deployment. */
import { site } from '../src/data/site.js'

const KEY = 'cfc7da3d26fbb6cc36170f5c5964452f'
const { host, origin } = new URL(site.url)

try {
  const paths = process.argv.slice(2)
  if (!paths.length) throw new Error('Usage: npm run indexnow -- /changed-path [/another-path]')
  const urls = paths.map((path) => {
    const url = new URL(path, origin)
    if (!path.startsWith('/') || url.href !== origin + url.pathname) {
      throw new Error(`Expected a same-site path without a query or fragment: ${path}`)
    }
    return url.href
  })
  const urlList = [...new Set(urls)]
  const response = await fetch('https://yandex.com/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: KEY, urlList }),
    signal: AbortSignal.timeout(15_000),
  })

  if (response.status !== 200 && response.status !== 202) {
    throw new Error(`HTTP ${response.status}: ${await response.text()}`)
  }
  const detail = response.status === 202 ? 'key verification pending' : 'URLs received'
  console.log(`IndexNow: ${urlList.length} URLs submitted (${detail}).`)
} catch (error) {
  console.error(`IndexNow: ${error.message}`)
  process.exitCode = 1
}

