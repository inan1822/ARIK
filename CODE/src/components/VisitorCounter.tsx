const STORAGE_KEY = 'arik-visitor-count'
const COUNTER_START = 46

// רץ פעם אחת בכל טעינת עמוד (ולא בכל רינדור) — לכן מחוץ לקומפוננטה.
function bumpCount(): number {
  try {
    const visits = Number(localStorage.getItem(STORAGE_KEY) ?? '0') + 1
    localStorage.setItem(STORAGE_KEY, String(visits))
    return COUNTER_START + visits
  } catch {
    return COUNTER_START + 1
  }
}

const count = bumpCount()

export default function VisitorCounter() {
  const digits = String(count).padStart(6, '0').split('')
  return (
    <span className="counter" title="מונה אמיתי לחלוטין">
      {digits.map((d, i) => (
        <span key={i}>{d}</span>
      ))}
    </span>
  )
}
