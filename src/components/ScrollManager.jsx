import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import useIsoLayoutEffect from '../hooks/useIsoLayoutEffect'

const positions = new Map()

/**
 * Manages scroll restoration across route changes
 * and provides a responsive, performant scroll-progress indicator for mobile and desktop.
 */
export default function ScrollManager() {
  const { key, hash, pathname } = useLocation()
  const type = useNavigationType()
  const first = useRef(true)
  const current = useRef(key)
  const path = useRef(pathname)
  const barRef = useRef(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const y = window.scrollY
        positions.set(current.current, y)
        if (barRef.current) {
          const max = document.documentElement.scrollHeight - window.innerHeight
          const p = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0
          barRef.current.style.transform = `scaleX(${p})`
        }
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [pathname])

  useIsoLayoutEffect(() => {
    current.current = key
    const samePage = path.current === pathname
    path.current = pathname
    if (first.current) { first.current = false; return } // the browser restores a reload itself
    window.history.scrollRestoration = 'manual'
    if (type === 'POP') { window.scrollTo(0, positions.get(key) || 0); return }
    if (samePage && !hash) return
    const target = hash && document.getElementById(hash.slice(1))
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [key])

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      aria-hidden="true"
    />
  )
}
