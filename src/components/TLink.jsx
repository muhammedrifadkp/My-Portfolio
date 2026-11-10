import { forwardRef, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { useHref, useLocation, useNavigate } from 'react-router-dom'
import { preloadPath } from '../routes'

/**
 * Navigate with a page transition (View Transitions API where the browser has
 * it, a plain navigation where it does not). The page's code is fetched first,
 * so the new page is complete in the first frame of the transition.
 */
export function useGo() {
  const navigate = useNavigate()
  return useCallback(
    (to, opts) => {
      const run = () => navigate(to, opts)
      preloadPath(to)
        .catch(() => {})
        .then(() => {
          const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          if (!document.startViewTransition || still) run()
          else document.startViewTransition(() => flushSync(run))
        })
    },
    [navigate]
  )
}

/* An <a> that the router handles: modifier clicks and middle clicks still open new tabs. */
const TLink = forwardRef(function TLink({ to, onClick, children, ...rest }, ref) {
  const href = useHref(to)
  const go = useGo()
  const { pathname } = useLocation()
  const warm = () => preloadPath(to).catch(() => {})
  const handle = (e) => {
    if (onClick) onClick(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target === '_blank') return
    e.preventDefault()
    const [path, hash] = String(to).split('#')
    if ((path || '/') === pathname && !hash) window.scrollTo({ top: 0, behavior: 'smooth' })
    else go(to)
  }
  return (
    <a ref={ref} href={href} onClick={handle} onPointerEnter={warm} onFocus={warm} onTouchStart={warm} {...rest}>
      {children}
    </a>
  )
})

export default TLink
