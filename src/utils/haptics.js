/**
 * Tactile haptic feedback utility for mobile touch devices.
 * Uses navigator.vibrate when supported, safely falls back silently.
 */
export function triggerHaptic(type = 'light') {
  if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.vibrate) return

  try {
    switch (type) {
      case 'light':
        navigator.vibrate(8)
        break
      case 'medium':
        navigator.vibrate(16)
        break
      case 'heavy':
        navigator.vibrate([12, 40, 18])
        break
      case 'selection':
        navigator.vibrate(5)
        break
      case 'success':
        navigator.vibrate([10, 30, 15])
        break
      default:
        navigator.vibrate(8)
    }
  } catch {
    // Ignore any vibration errors
  }
}

