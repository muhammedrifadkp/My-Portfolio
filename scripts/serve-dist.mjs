/**
 * Serves ./dist the way Vercel does: /about -> about/index.html, unknown -> 404.html (status 404).
 * `vite preview` falls back to the home page for every route, which hides prerender problems.
 *
 *   node scripts/serve-dist.mjs [port=3100]
 */
import { createServer } from 'node:http'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), 'dist')
const port = Number(process.argv[2]) || 3100
const types = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.glb': 'model/gltf-binary',
  '.wasm': 'application/wasm', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.pdf': 'application/pdf',
}

createServer((req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^([/\\])+/, '')
  const candidates = [join(root, path), join(root, path, 'index.html')]
  const file = candidates.find((f) => f.startsWith(root) && existsSync(f) && statSync(f).isFile())
  const send = (status, f) => {
    res.writeHead(status, { 'Content-Type': types[extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' })
    res.end(readFileSync(f))
  }
  if (file) send(200, file)
  else send(404, join(root, '404.html'))
}).listen(port, () => console.log(`dist served at http://localhost:${port}`))
