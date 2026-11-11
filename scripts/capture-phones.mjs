/**
 * Takes a phone-size screenshot of every project's live site.
 *
 *   node scripts/capture-phones.mjs <path-to-cdp.mjs> <outDir> [slug ...]
 *
 * <path-to-cdp.mjs> is a small Chrome DevTools helper (headless Chrome over WebSocket).
 * Output: <outDir>/<image-name>.png at 780x1688 (390x844 @2x). Convert with PIL afterwards.
 */
import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { projects } from '../src/data/site.js'

const [, , cdpPath, outDir, ...only] = process.argv
const { Browser, sleep } = await import(pathToFileURL(cdpPath).href)
mkdirSync(outDir, { recursive: true })

const browser = await Browser.launch({ width: 390, height: 844 })
for (const p of projects) {
  if (only.length && !only.includes(p.slug)) continue
  const name = p.src.replace('/work/', '').replace('-1600.webp', '')
  const page = await browser.newPage({ width: 390, height: 844, dsf: 2, mobile: true })
  try {
    await page.send('Emulation.setUserAgentOverride', {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
    })
    await page.goto(p.url, { timeoutMs: 30000, settleMs: 5000 })
    await page.eval('window.scrollTo(0, 0)')
    await sleep(400)
    await page.screenshot({ path: join(outDir, `${name}.png`), format: 'png' })
    console.log('ok  ', p.slug, name)
  } catch (e) {
    console.log('FAIL', p.slug, String(e.message).slice(0, 120))
  }
  await page.close()
}
await browser.close()
