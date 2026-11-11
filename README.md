# Rifad — portfolio of Muhammed Rifad KP

Live at **https://www.rifad.site**

A fast, prerendered React site with a few 3D scenes: a desk whose monitor plays live client sites, a flight from Kerala to the Gulf, and a glass RIFAD mark.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # builds, then prerenders every page to its own HTML
node scripts/serve-dist.mjs   # serves ./dist the way Vercel does, http://localhost:3100
```

`npm run preview` (Vite's preview) answers every URL with the home page, so use `serve-dist.mjs` to check the prerendered pages.

## How it is built

| Part | Where |
| --- | --- |
| Content (projects, services, FAQ, contact details, site URL) | `src/data/site.js` |
| Titles, descriptions, canonical URLs, structured data | `src/seo.js` |
| Routes | `src/routes.js` |
| Pages | `src/pages/` |
| Sections used by pages | `src/sections/` |
| 3D scenes (loaded only in the browser, after the text) | `src/three/` |
| Design tokens and the glass button system | `src/index.css` |
| Prerender, sitemap.xml, llms.txt | `scripts/prerender.mjs` |
| AI assistant endpoint | `api/chat.js` |
| Redirects, caching and security headers | `vercel.json` |

### Adding a project

1. Put a 16:10 screenshot in `public/work/` as `<name>-1600.webp` and `<name>-800.webp` (and `<name>-phone.webp` for the phone view).
2. Add an entry to `projects` in `src/data/site.js`.

It then appears in the work list, gets its own page at `/projects/<slug>`, and is added to the sitemap, the structured data, `llms.txt` and the search palette on the next build.

### Search engines and AI assistants

- Every route is real HTML with its own `<title>`, description, canonical link, Open Graph tags and JSON-LD (`Person`, `ProfessionalService`, `FAQPage`, `CreativeWork`, breadcrumbs).
- `sitemap.xml`, `llms.txt` and `llms-full.txt` are generated from `src/data/site.js` at build time.
- `robots.txt` allows search engines and AI crawlers.
- If the main domain changes (for example from `www.rifad.site` to `rifad.site`), change `site.url` in `src/data/site.js`, the `Sitemap:` line in `public/robots.txt` and the first redirect in `vercel.json`.

### 3D models

Source models are in `assets-src/` (not deployed). The optimised copies in `public/models/` are made with:

```bash
python scripts/models/merge-desk.py .cache-desk.glb          # bakes and merges the desk
node scripts/models/draco-glb.cjs .cache-desk.glb public/models/desk.glb
python scripts/models/webp-glb.py in.glb out.glb --max 1024   # re-encodes textures as WebP
```

The desk model is "Gaming Desktop PC" by Yolala1232, CC BY 4.0 (credited in the site footer).

## AI assistant

See [GEMINI_SETUP.md](GEMINI_SETUP.md). In short: set `GEMINI_API_KEY` in the Vercel project. The key is used only on the server.

## Deploy

Push to `main`; Vercel runs `npm run build` and serves `dist/`.
