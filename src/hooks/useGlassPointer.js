import { useEffect } from 'react'

/* Moves the highlight on glass buttons to where the pointer is. */
export default function useGlassPointer() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    let raf = 0
    let last = null
    const paint = () => {
      raf = 0
      if (!last) return
      const el = last.target.closest && last.target.closest('.btn, .glass-live')
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${last.clientX - r.left}px`)
      el.style.setProperty('--my', `${last.clientY - r.top}px`)
    }
    const move = (e) => { last = e; if (!raf) raf = requestAnimationFrame(paint) }
    document.addEventListener('pointermove', move, { passive: true })
    return () => { document.removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])
}
