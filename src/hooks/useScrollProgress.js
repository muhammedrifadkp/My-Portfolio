import { useEffect } from 'react'

/**
 * Calls `onProgress(0..1)` as the element travels through the viewport.
 * start/end are viewport fractions: where the element's top is at 0, and where
 * its centre is at 1. One rAF per scroll frame, no React state.
 */
export default function useScrollProgress(ref, onProgress, { start = 0.88, end = 0.45 } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const read = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const from = vh * start
      const to = vh * end - r.height / 2
      onProgress(Math.min(Math.max((from - r.top) / (from - to), 0), 1))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [ref, onProgress, start, end])
}
