import { useEffect, useState } from 'react'

const zones = [
  { city: 'Calicut', tz: 'Asia/Kolkata' },
  { city: 'Dubai', tz: 'Asia/Dubai' },
]

/* The time at my desk and at most of my clients', live. */
export default function LocalTime({ className = '' }) {
  const [now, setNow] = useState(null)
  useEffect(() => {
    const tick = () => setNow(new Date())
    tick()
    const id = setInterval(tick, 20000)
    return () => clearInterval(id)
  }, [])
  const at = (tz) => (now ? new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit', timeZone: tz }).format(now) : '\u2013\u2013:\u2013\u2013')
  return (
    <p className={`clock ${className}`}>
      {zones.map((z) => (
        <span key={z.tz} className="clock-zone">
          {z.city} <time className="tabular" dateTime={now ? now.toISOString() : undefined}>{at(z.tz)}</time>
        </span>
      ))}
    </p>
  )
}
