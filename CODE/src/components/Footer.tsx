import { footer } from '../content'

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>{footer.text}</p>
      <a className="btn95" href="#top">
        ⬆ חזרה למעלה
      </a>
    </footer>
  )
}
