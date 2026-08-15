import { useEffect } from 'react'

const TRAIL_INTERVAL_MS = 45

export default function MouseTrail() {
  useEffect(() => {
    let last = 0
    function onMove(e: MouseEvent) {
      const now = performance.now()
      if (now - last < TRAIL_INTERVAL_MS) return
      last = now
      const star = document.createElement('span')
      star.className = 'trail-star'
      star.textContent = '⭐'
      star.style.left = `${e.clientX + 6}px`
      star.style.top = `${e.clientY + 6}px`
      document.body.appendChild(star)
      window.setTimeout(() => star.remove(), 700)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return null
}
