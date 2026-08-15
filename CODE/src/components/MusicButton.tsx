import { useEffect, useRef, useState } from 'react'

// לחן מקורי ועליז בסגנון MIDI. 0 = הפסקה.
const MELODY = [
  659, 0, 659, 0, 784, 0, 659, 587, 523, 0, 523, 587, 659, 587, 523, 0,
  659, 0, 784, 0, 880, 0, 784, 659, 587, 0, 659, 587, 523, 0, 523, 0,
]
const STEP_MS = 190

export default function MusicButton() {
  const [playing, setPlaying] = useState(false)
  const ctxRef = useRef<AudioContext | null>(null)
  const timerRef = useRef<number | null>(null)

  function stop() {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    ctxRef.current?.close().catch(() => {})
    ctxRef.current = null
  }

  useEffect(() => stop, [])

  function toggle() {
    if (playing) {
      stop()
      setPlaying(false)
      return
    }
    const ctx = new AudioContext()
    ctxRef.current = ctx
    let step = 0
    timerRef.current = window.setInterval(() => {
      const freq = MELODY[step % MELODY.length]
      step += 1
      if (!freq) return
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'square'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.045, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.17)
      osc.connect(gain).connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.19)
    }, STEP_MS)
    setPlaying(true)
  }

  return (
    <button type="button" className="btn95" onClick={toggle}>
      {playing ? '⏹ עצור מוזיקה' : '🎵 הפעל מוזיקה'}
    </button>
  )
}
