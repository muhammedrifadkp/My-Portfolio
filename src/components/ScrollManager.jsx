import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import useIsoLayoutEffect from '../hooks/useIsoLayoutEffect'

const positions = new Map()

/* New page: top (or the #hash). Back and Forward: where you were. */
export default function ScrollManager() {
  const { key, hash } = useLocation()
  const type = useNavigationType()
  const first = useRef(true)
  const current = useRef(key)

  useEffect(() => {
    let raf = 0
    const save = () => {
      if (raf) return
      raf = requestAnimationFrame(() => { raf = 0; positions.set(current.current, window.scrollY) })
    }
    window.addEventListener('scroll', save, { passive: true })
    return () => window.removeEventListener('scroll', save)
  }, [])

  useIsoLayoutEffect(() => {
    current.current = key
    if (first.current) { first.current = false; return } // the browser restores a reload itself
    window.history.scrollRestoration = 'manual'
    if (type === 'POP') { window.scrollTo(0, positions.get(key) || 0); return }
    const target = hash && document.getElementById(hash.slice(1))
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [key])

  return null
}
