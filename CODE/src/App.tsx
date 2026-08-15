import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Quiz from './components/Quiz'
import Facts from './components/Facts'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MouseTrail from './components/MouseTrail'

export default function App() {
  return (
    <>
      <MouseTrail />
      <Hero />
      <div className="rainbow-hr" />
      <Gallery />
      <div className="rainbow-hr" />
      <Quiz />
      <div className="rainbow-hr" />
      <Facts />
      <div className="rainbow-hr" />
      <Contact />
      <Footer />
    </>
  )
}
