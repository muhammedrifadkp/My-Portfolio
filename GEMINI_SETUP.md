# AI assistant setup

The "Ask AI" page sends questions to `/api/chat`, a small server function (`api/chat.js`). It calls Google Gemini with the site's own facts as context. The API key lives only on the server, never in the browser.

## One-time setup

1. Create a key at https://aistudio.google.com/apikey
2. In Vercel: Project → Settings → Environment Variables, add

   ```
   GEMINI_API_KEY = <your key>
   ```

   for Production (and Preview if you want it there).
3. Redeploy.

An older `VITE_GEMINI_API_KEY` is still read as a fallback, but a key with the `VITE_` prefix was once shipped to browsers. Treat such a key as public: delete it in Google AI Studio and use a new one under `GEMINI_API_KEY`.

## Checking it

```bash
curl -X POST https://www.rifad.site/api/chat -H "Content-Type: application/json" -d "{\"question\":\"What has Rifad built?\"}"
```

- `200 {"answer": ...}`: working.
- `503`: no key is set.
- `502 {"tried": ["model: status", ...]}`: Gemini refused. `400` or `403` means the key is wrong, expired or restricted; `429` means the quota is used up; `404` means that model name no longer exists (edit `MODELS` in `api/chat.js`).

When the endpoint cannot answer, the page falls back to short answers built from `src/data/site.js`, so visitors never see an error.

## Locally

`npm run dev` does not run server functions, so the page uses the built-in answers. To test the real thing locally, use `vercel dev` with `GEMINI_API_KEY` in `.env.local`.
