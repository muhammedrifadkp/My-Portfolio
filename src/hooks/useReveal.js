import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Marks [data-reveal] elements with data-in as they scroll into view.
 * The inline script in index.html does the same for the prerendered HTML
 * before this code has loaded; this hook takes over for later pages.
 */
export default function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.setAttribute('data-in', ''); io.unobserve(e.target) }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
    const scan = () => {
      document.querySelectorAll('[data-stagger]').forEach((group) => {
        const step = Number(group.dataset.stagger) || 80
        let i = 0
        Array.from(group.children).forEach((el) => {
          if (el.hasAttribute('data-reveal')) el.style.setProperty('--d', `${i++ * step}ms`)
        })
      })
      document.querySelectorAll('[data-reveal]:not([data-in])').forEach((el) => io.observe(el))
    }
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(document.getElementById('main') || document.body, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [pathname])
}
