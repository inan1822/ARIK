import { facts } from '../content'

export default function Facts() {
  return (
    <section className="section facts" id="facts">
      <h2 className="wordart wordart-small">{facts.title}</h2>
      <div className="facts-wrap">
        <ul className="facts-list">
          {facts.items.map((fact) => (
            <li key={fact}>
              <span className="fact-star">⭐</span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
        <div className="facts-photos">
          {facts.photos.map((photo, i) => (
            <figure
              key={photo.src}
              className={`polaroid ${i % 2 === 0 ? 'tilt-r' : 'tilt-l'}`}
            >
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
