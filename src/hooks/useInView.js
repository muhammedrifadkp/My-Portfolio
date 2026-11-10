import { useEffect, useState } from 'react'

export default function useInView(ref, margin = '0px', once = false) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting)
      if (once && e.isIntersecting) io.disconnect()
    }, { rootMargin: margin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margin, once])
  return inView
}
