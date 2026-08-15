import { gallery } from '../content'

export default function Gallery() {
  return (
    <section className="section gallery" id="gallery">
      <h2 className="wordart wordart-small">אריק בתמונות</h2>
      <p className="section-intro">
        אוסף נדיר של תיעוד ויזואלי. בכל התמונות: אריק.
      </p>
      <div className="gallery-grid">
        {gallery.map((photo, i) => (
          <figure
            key={photo.src}
            className={`polaroid ${i % 2 === 0 ? 'tilt-l' : 'tilt-r'}`}
          >
            {photo.isNew && <span className="new-badge">!NEW</span>}
            <img src={photo.src} alt={photo.alt} loading="lazy" />
            <figcaption>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
