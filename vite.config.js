import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site is built twice: once for the browser (dist) and once for Node
// (dist-ssr), which scripts/prerender.mjs uses to write a real HTML file per page.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    target: 'es2020',
    sourcemap: false,
    cssCodeSplit: false, // one small stylesheet, so prerendered pages are styled before any JS runs
    manifest: !isSsrBuild,
    chunkSizeWarningLimit: 900,
  },
  preview: { port: 3000, strictPort: true },
}))
