import { lazy, Suspense, useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import ScrollManager from './components/ScrollManager.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import useReveal from './hooks/useReveal'
import useGlassPointer from './hooks/useGlassPointer'
import { routeTable } from './routes'
import { applyMeta } from './seo'

const CommandPalette = lazy(() => import('./components/CommandPalette'))

function Shell({ pages }) {
  useReveal()
  useGlassPointer()
  const { pathname } = useLocation()
  const [search, setSearch] = useState(false)

  useEffect(() => { applyMeta(pathname) }, [pathname])
  useEffect(() => { setSearch(false) }, [pathname])

  useEffect(() => {
    const onKey = (e) => {
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable
      if ((e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && !typing)) {
        e.preventDefault()
        setSearch((s) => !s)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollManager />
      <Nav onSearch={() => setSearch(true)} />
      <main id="main">
        <Suspense fallback={<div className="page" style={{ minHeight: '100svh' }} />}>
          <Routes>
            {routeTable.map((r) => {
              const Page = pages[r.key]
              return <Route key={r.key} path={r.path} element={<Page />} />
            })}
          </Routes>
        </Suspense>
      </main>
      <Footer />
      {search && (
        <Suspense fallback={null}>
          <CommandPalette onClose={() => setSearch(false)} />
        </Suspense>
      )}
    </>
  )
}

export default function App({ pages }) {
  return (
    <ErrorBoundary>
      <Shell pages={pages} />
    </ErrorBoundary>
  )
}
