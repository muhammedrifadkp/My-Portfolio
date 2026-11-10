import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { lazyPages, preloadPath } from './routes'
import './utils/security'
import './index.css'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App pages={lazyPages} />
    </BrowserRouter>
  </StrictMode>
)

/* Prerendered HTML is hydrated once this page's code is here; otherwise render fresh. */
preloadPath(window.location.pathname).finally(() => {
  window.__app = true
  if (root.firstElementChild) hydrateRoot(root, app)
  else createRoot(root).render(app)
})
