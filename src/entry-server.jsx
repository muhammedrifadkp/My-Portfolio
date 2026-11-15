import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'
import Home from './pages/Home'
import Kozhikode from './pages/Kozhikode'
import Projects from './pages/Projects'
import Project from './pages/Project'
import About from './pages/About'
import Contact from './pages/Contact'
import AI from './pages/AI'
import NotFound from './pages/NotFound'
import { headTags, metaFor, staticPaths } from './seo'
import { routeFor } from './routes'
import * as data from './data/site'

const pages = { home: Home, kozhikode: Kozhikode, projects: Projects, project: Project, about: About, contact: Contact, ai: AI, notfound: NotFound }

export function render(url) {
  const html = renderToString(
    <StaticRouter location={url}>
      <App pages={pages} />
    </StaticRouter>
  )
  return { html, head: headTags(metaFor(url)), route: routeFor(url).key }
}

export { staticPaths, data }
