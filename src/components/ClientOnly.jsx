import { useEffect, useState } from 'react'

/* Renders children in the browser only: 3D scenes have nothing to prerender. */
export default function ClientOnly({ children, fallback = null }) {
  const [on, setOn] = useState(false)
  useEffect(() => setOn(true), [])
  return on ? children : fallback
}
