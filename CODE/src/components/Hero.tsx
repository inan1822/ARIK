import { hero } from '../content'
import VisitorCounter from './VisitorCounter'
import MusicButton from './MusicButton'

const NAV = [
  { href: '#gallery', label: 'אריק בתמונות' },
  { href: '#quiz', label: 'השאלון הגדול' },
  { href: '#facts', label: 'עובדות מרתקות' },
  { href: '#contact', label: 'צור קשר' },
]

export default function Hero() {
  return (
    <header className="section hero" id="top">
      <div className="marquee">
        <span className="marquee-inner">{hero.marquee.repeat(3)}</span>
      </div>

      <h1 className="wordart">{hero.title}</h1>
      <p className="hero-subtitle blink-slow">{hero.subtitle}</p>

      <div className="construction">
        <span>🚧</span>
        <span className="construction-text">{hero.construction}</span>
        <span>🚧</span>
      </div>

      <figure className="hero-figure">
        <img className="hero-photo" src={hero.photo.src} alt={hero.photo.alt} />
        <figcaption>{hero.photo.caption}</figcaption>
      </figure>

      <nav className="nav-buttons">
        {NAV.map((item) => (
          <a key={item.href} className="btn95" href={item.href}>
            {item.label}
          </a>
        ))}
        <MusicButton />
      </nav>

      <div className="hero-meta">
        <div className="counter-block">
          <span className="counter-label">מספר המבקרים באתר:</span>
          <VisitorCounter />
        </div>
        <div className="badge">{hero.badge}</div>
      </div>
    </header>
  )
}
