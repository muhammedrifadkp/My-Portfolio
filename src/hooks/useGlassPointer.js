import { useEffect } from 'react'

/**
 * Moves the specular glass highlight to where the pointer or touch is.
 * Works seamlessly across both desktop mice and mobile touch screens.
 */
export default function useGlassPointer() {
  useEffect(() => {
    let raf = 0
    let last = null
    let activeEl = null

    const paint = () => {
      raf = 0
      if (!last) return
      const target = last.target
      const el = target?.closest && target.closest('.btn, .glass, .glass-live, .tab, .chip, .faq-item, .screen-panel')
      
      if (activeEl && activeEl !== el) {
        activeEl.style.removeProperty('--touch-active')
      }

      if (!el) {
        activeEl = null
        return
      }

      activeEl = el
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${last.clientX - r.left}px`)
      el.style.setProperty('--my', `${last.clientY - r.top}px`)
      el.style.setProperty('--touch-active', '1')
    }

    const onPointer = (e) => {
      last = e
      if (!raf) raf = requestAnimationFrame(paint)
    }

    const onEnd = () => {
      if (activeEl) {
        activeEl.style.removeProperty('--touch-active')
        activeEl = null
      }
    }

    document.addEventListener('pointermove', onPointer, { passive: true })
    document.addEventListener('pointerdown', onPointer, { passive: true })
    document.addEventListener('pointerup', onEnd, { passive: true })
    document.addEventListener('pointercancel', onEnd, { passive: true })

    return () => {
      document.removeEventListener('pointermove', onPointer)
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('pointerup', onEnd)
      document.removeEventListener('pointercancel', onEnd)
      cancelAnimationFrame(raf)
    }
  }, [])
}
