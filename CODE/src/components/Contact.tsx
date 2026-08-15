import { useEffect, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { contact } from '../content'

const TIRED_MS = 10_000

export default function Contact() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [tired, setTired] = useState(false)
  const [fleeing, setFleeing] = useState(false)
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const tiredTimer = useRef<number | null>(null)

  useEffect(
    () => () => {
      if (tiredTimer.current !== null) clearTimeout(tiredTimer.current)
    },
    [],
  )

  function showTired() {
    setTired(true)
    if (tiredTimer.current !== null) clearTimeout(tiredTimer.current)
    tiredTimer.current = window.setTimeout(() => setTired(false), TIRED_MS)
  }

  // קפיצה למיקום אקראי על המסך — רחוק מהישג יד.
  function flee() {
    const margin = 16
    const btnW = 170
    const btnH = 55
    const x = margin + Math.random() * Math.max(40, window.innerWidth - btnW - margin * 2)
    const y = margin + Math.random() * Math.max(40, window.innerHeight - btnH - margin * 2)
    setPos({ x, y })
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const n = attempts + 1
    setAttempts(n)

    if (n <= 2) {
      const subject = encodeURIComponent(
        name ? `${contact.form.subjectPrefix} — מאת ${name}` : contact.form.subjectPrefix,
      )
      const body = encodeURIComponent(message)
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
      return
    }

    if (n === 3) {
      // יותר מפעמיים — אריק עייף. יורד לבד אחרי 10 שניות.
      showTired()
      return
    }

    // ממשיכים לשלוח? הכפתור עובר לגור במקומות אקראיים.
    setFleeing(true)
    flee()
  }

  return (
    <section className="section contact" id="contact">
      {tired &&
        createPortal(
          <div className="tired-overlay" aria-hidden="true">
            <p className="tired-text blink">{contact.tired.text}</p>
            <img src={contact.tired.photo.src} alt={contact.tired.photo.alt} />
            <p className="tired-subtext">{contact.tired.subtext}</p>
          </div>,
          document.body,
        )}

      <h2 className="wordart wordart-small">{contact.title}</h2>
      <p className="section-intro">{contact.lead}</p>
      <a className="contact-email blink" href={`mailto:${contact.email}`}>
        {contact.email}
      </a>
      {contact.lines.map((line) => (
        <p key={line} className="contact-line">
          {line}
        </p>
      ))}

      <form className="guestbook" onSubmit={onSubmit}>
        <table className="guestbook-table">
          <tbody>
            <tr>
              <td className="guestbook-label">{contact.form.nameLabel}</td>
              <td>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="guestbook-label">{contact.form.messageLabel}</td>
              <td>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="guestbook-submit">
                {fleeing ? (
                  // הכפתור הבורח חי ישירות על ה-body: מסנני הצבע והרעידות של
                  // שאר האתר הופכים position:fixed ליחסי-מסמך, וכאן הוא נשאר
                  // יחסי למסך באמת. שליחה ממילא כבר לא אפשרית — רק בריחה.
                  createPortal(
                    <button
                      type="button"
                      className="btn95 btn-flee"
                      style={pos ? { left: pos.x, top: pos.y } : undefined}
                      onMouseEnter={flee}
                      onFocus={flee}
                      onClick={flee}
                    >
                      {contact.form.submitLabel}
                    </button>,
                    document.body,
                  )
                ) : (
                  <button type="submit" className="btn95">
                    {contact.form.submitLabel}
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      <div className="contact-photos">
        {contact.photos.map((photo, i) => (
          <figure
            key={photo.src}
            className={`polaroid mini ${i % 2 === 0 ? 'tilt-l' : 'tilt-r'}`}
          >
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
