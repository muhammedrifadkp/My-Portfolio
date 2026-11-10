import { lazy, createElement } from 'react'
import { matchPath } from 'react-router-dom'

/* One table for the client and the prerenderer. */
export const routeTable = [
  { key: 'home', path: '/', load: () => import('./pages/Home') },
  { key: 'projects', path: '/projects', load: () => import('./pages/Projects') },
  { key: 'project', path: '/projects/:slug', load: () => import('./pages/Project') },
  { key: 'about', path: '/about', load: () => import('./pages/About') },
  { key: 'contact', path: '/contact', load: () => import('./pages/Contact') },
  { key: 'ai', path: '/ai', load: () => import('./pages/AI') },
  { key: 'notfound', path: '*', load: () => import('./pages/NotFound') },
]

/**
 * A lazy page that renders straight away once its code has arrived, so the
 * prerendered HTML can be hydrated without a flash and links can warm it up.
 */
function page(load) {
  let Loaded = null
  let pending = null
  const preload = () => pending || (pending = load().then((m) => { Loaded = m.default; return m }))
  const Lazy = lazy(preload)
  const Page = (props) => createElement(Loaded || Lazy, props)
  Page.preload = preload
  return Page
}

export const lazyPages = Object.fromEntries(routeTable.map((r) => [r.key, page(r.load)]))

export const routeFor = (pathname) => routeTable.find((r) => r.path !== '*' && matchPath({ path: r.path, end: true }, pathname)) || routeTable[routeTable.length - 1]

/** Fetch the code for the page at `to` (a path, with or without a hash). */
export const preloadPath = (to) => {
  const pathname = String(to).split(/[?#]/)[0] || '/'
  return lazyPages[routeFor(pathname).key].preload()
}
