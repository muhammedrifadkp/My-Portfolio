import { useEffect, useState } from 'react'

/* false on the server and on first paint, then the real answer (safe to hydrate) */
export default function useMedia(query) {
  const [match, setMatch] = useState(false)
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setMatch(m.matches)
    on()
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [query])
  return match
}
