/* The site's own marks and tab icons. 24px grid, currentColor. */

/* R with a full stop: the same mark as the favicon. */
export const Mark = ({ size = 28, ...p }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" {...p}>
    <defs>
      <linearGradient id="mark-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#19b092" />
        <stop offset="1" stopColor="#006a56" />
      </linearGradient>
      <linearGradient id="mark-h" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity="0.5" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#mark-g)" />
    <path d="M2 16A14 14 0 0 1 16 2h32a14 14 0 0 1 14 14v9C44 33 20 33 2 25Z" fill="url(#mark-h)" />
    <path d="M18.5 47V18h11a9.5 9.5 0 0 1 0 19h-11m10.5 0 9 10" fill="none" stroke="#fff" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="50" cy="46.5" r="4" fill="#b6ffe8" />
  </svg>
)

const tab = (paths) => function TabIcon({ filled, ...p }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      {paths(filled)}
    </svg>
  )
}

export const HomeIcon = tab(() => (
  <path d="M3.5 10.8 12 3.6l8.5 7.2V19a1.5 1.5 0 0 1-1.5 1.5h-4.2v-5.7H9.2v5.7H5A1.5 1.5 0 0 1 3.5 19Z" />
))
export const WorkIcon = tab(() => (
  <>
    <rect x="3.5" y="3.5" width="7.2" height="7.2" rx="2.2" />
    <rect x="13.3" y="3.5" width="7.2" height="7.2" rx="2.2" />
    <rect x="3.5" y="13.3" width="7.2" height="7.2" rx="2.2" />
    <rect x="13.3" y="13.3" width="7.2" height="7.2" rx="2.2" />
  </>
))
export const PersonIcon = tab(() => (
  <>
    <circle cx="12" cy="8" r="4.2" />
    <path d="M4 20.2c.6-3.6 3.9-5.7 8-5.7s7.4 2.1 8 5.7a.9.9 0 0 1-.9 1H4.9a.9.9 0 0 1-.9-1Z" />
  </>
))
export const ChatIcon = tab(() => (
  <path d="M5.5 4.5h13A2.5 2.5 0 0 1 21 7v7.5a2.5 2.5 0 0 1-2.5 2.5H12l-4.6 3.6a.6.6 0 0 1-1-.5V17h-.9A2.5 2.5 0 0 1 3 14.5V7a2.5 2.5 0 0 1 2.5-2.5Z" />
))
export const SparkIcon = tab(() => (
  <>
    <path d="M10.5 3.5c.5 3.9 2.1 5.500 6 6-3.900.5-5.500 2.100-6 6-.5-3.900-2.100-5.500-6-6 3.900-.5 5.500-2.100 6-6Z" />
    <path d="M18 14.500c.2 1.800 1 2.500 2.800 2.800-1.800.2-2.500 1-2.800 2.800-.2-1.800-1-2.500-2.800-2.800 1.800-.3 2.500-1 2.800-2.800Z" />
  </>
))

export const GitHubIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"/></svg>
)
export const WhatsAppIcon = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}><path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.66-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.87 1.21 3.07c.15.2 2.09 3.2 5.07 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35ZM12.05 21.5h-.01a9.43 9.43 0 0 1-4.81-1.32l-.35-.2-3.57.93.96-3.48-.23-.36a9.42 9.42 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.46-9.44a9.4 9.4 0 0 1 9.44 9.45c0 5.21-4.24 9.45-9.44 9.45Zm8.04-17.49A11.32 11.32 0 0 0 12.05.67C5.78.67.68 5.77.67 12.04c0 2 .52 3.96 1.52 5.69L.57 23.63l6.03-1.58a11.350 11.350 0 0 0 5.44 1.39h.01c6.270 0 11.370-5.100 11.380-11.370a11.300 11.300 0 0 0-3.340-8.060Z"/></svg>
)
