import { useEffect, useState } from 'react'

/* Data Saver on, a 2G link or 2 GB of memory or less: skip decoration that costs a lot to start. */
const isLite = () => {
  const c = navigator.connection
  if (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''))) return true
  return !!(navigator.deviceMemory && navigator.deviceMemory <= 2)
}

/**
 * Renders children in the browser only (3D scenes have nothing to prerender).
 *  idle  wait until the browser has nothing better to do, so the page can be used first
 *  lite  stay on `fallback` for visitors who asked for less data or have a very small device
 */
export default function ClientOnly({ children, fallback = null, idle = false, lite = false }) {
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (lite && isLite()) return undefined
    if (!idle || !('requestIdleCallback' in window)) { setOn(true); return undefined }
    const id = window.requestIdleCallback(() => setOn(true), { timeout: 1800 })
    return () => window.cancelIdleCallback(id)
  }, [idle, lite])
  return on ? children : fallback
}
