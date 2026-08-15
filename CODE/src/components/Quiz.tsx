import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { quiz, type Photo } from '../content'

export default function Quiz() {
  const total = quiz.questions.length
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const [wrong, setWrong] = useState(false)
  const [mistakes, setMistakes] = useState(0)
  const [rewards, setRewards] = useState<Photo[]>([])
  const [done, setDone] = useState(false)

  const current = quiz.questions[index]
  const isLast = index === total - 1
  const punishing = !done

  // עונש שלישי: כל העמוד רועד. עונש רביעי: כל הצבעים באתר מתחלפים
  // מהר ובקפיצות. הכל נעלם רק כשמסיימים את השאלון נכון.
  useEffect(() => {
    const root = document.getElementById('root')
    root?.classList.toggle('quake', mistakes >= 3 && punishing)
    root?.classList.toggle('color-chaos', mistakes >= 4 && punishing)
    document.body.classList.toggle('color-chaos-bg', mistakes >= 4 && punishing)
    return () => {
      root?.classList.remove('quake', 'color-chaos')
      document.body.classList.remove('color-chaos-bg')
    }
  }, [mistakes, punishing])

  function check() {
    if (selected === null || answered) return
    if (current.correct.includes(selected)) {
      setAnswered(true)
      setWrong(false)
      setRewards((prev) => [...prev, current.reward])
    } else {
      setMistakes((m) => m + 1)
      setWrong(true)
      setSelected(null)
    }
  }

  function next() {
    if (isLast) {
      setDone(true)
      return
    }
    // Math.min מגן מדאבל-קליק מהיר שהיה מקפיץ את האינדקס מעבר לשאלה האחרונה
    setIndex((i) => Math.min(i + 1, total - 1))
    setSelected(null)
    setAnswered(false)
    setWrong(false)
  }

  function reset() {
    setIndex(0)
    setSelected(null)
    setAnswered(false)
    setWrong(false)
    setMistakes(0)
    setRewards([])
    setDone(false)
  }

  return (
    <section className="section quiz" id="quiz">
      {mistakes >= 1 && punishing && (
        <svg
          className="big-x"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <line x1="3" y1="3" x2="97" y2="97" />
          <line x1="97" y1="3" x2="3" y2="97" />
        </svg>
      )}

      {mistakes >= 2 &&
        punishing &&
        createPortal(
          <div className="sad-overlay" aria-hidden="true">
            <p className="sad-text blink">{quiz.sad.text}</p>
            <img src={quiz.sad.photo.src} alt={quiz.sad.photo.alt} />
            <p className="sad-subtext">{quiz.sad.subtext}</p>
          </div>,
          document.body,
        )}

      <h2 className="wordart wordart-small">{quiz.title}</h2>
      <p className="section-intro">{quiz.intro}</p>
      <p className="quiz-warning">{quiz.warning}</p>

      {done ? (
        <div className="quiz-card">
          <p className="quiz-completion">{quiz.completion}</p>
          <button type="button" className="btn95" onClick={reset}>
            {quiz.resetLabel}
          </button>
        </div>
      ) : (
        <div className="quiz-card">
          <p className="quiz-progress">{quiz.progress(index + 1, total)}</p>
          <h3 className="quiz-question">{current.question}</h3>
          <div className="quiz-options">
            {current.options.map((option, i) => (
              <label key={i} className="quiz-option">
                <input
                  type="radio"
                  name={`q-${index}`}
                  checked={selected === i}
                  disabled={answered}
                  onChange={() => {
                    setSelected(i)
                    setWrong(false)
                  }}
                />
                <span>
                  {['א', 'ב', 'ג', 'ד'][i]}) {option}
                </span>
              </label>
            ))}
          </div>

          {wrong && (
            <div className="quiz-wrong">
              <p className="wrong-flash">{quiz.wrongFlash}</p>
              <p className="wrong-hint">{quiz.wrongHint}</p>
            </div>
          )}

          {!answered ? (
            <button
              type="button"
              className="btn95"
              disabled={selected === null}
              onClick={check}
            >
              {quiz.checkLabel}
            </button>
          ) : (
            <div className="quiz-result">
              <p className="correct-flash">{quiz.correctFlash}</p>
              <figure className="polaroid tilt-r quiz-reward">
                <img src={current.reward.src} alt={current.reward.alt} />
                <figcaption>{current.reward.caption}</figcaption>
              </figure>
              <button type="button" className="btn95" onClick={next}>
                {isLast ? quiz.finishLabel : quiz.nextLabel}
              </button>
            </div>
          )}
        </div>
      )}

      {rewards.length > 0 && (
        <div className="rewards-strip">
          <h4 className="rewards-title">{quiz.rewardsTitle}</h4>
          <div className="rewards-row">
            {rewards.map((reward) => (
              <figure key={reward.src} className="polaroid mini">
                <img src={reward.src} alt={reward.alt} />
                <figcaption>{reward.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
