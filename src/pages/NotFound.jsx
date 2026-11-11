import { lazy, Suspense } from 'react'
import ClientOnly from '../components/ClientOnly'
import TLink from '../components/TLink'
import './NotFound.css'

const FoxScene = lazy(() => import('../three/FoxScene'))

export default function NotFound() {
  return (
    <div className="page notfound wrap">
      <div className="nf-copy" data-stagger="90">
        <h1 className="t-display" data-reveal>Lost the trail.</h1>
        <p className="t-statement" data-reveal>This page isn’t here. The fox is still looking, but the work is one click away.</p>
        <div className="nf-actions" data-reveal>
          <TLink className="btn btn-primary" to="/">Go home</TLink>
          <TLink className="btn" to="/projects">See the work</TLink>
        </div>
      </div>
      <div className="nf-stage" aria-hidden="true">
        <ClientOnly lite>
          <Suspense fallback={null}>
            <FoxScene />
          </Suspense>
        </ClientOnly>
      </div>
    </div>
  )
}
