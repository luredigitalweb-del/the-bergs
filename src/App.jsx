import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Steps from './components/Steps.jsx'
import Services from './components/Services.jsx'
import Gallery from './components/Gallery.jsx'
import About from './components/About.jsx'
import Reviews from './components/Reviews.jsx'
import Local from './components/Local.jsx'
import Social from './components/Social.jsx'
import FinalCta from './components/FinalCta.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'

export default function App() {
  // Revela elementos .reveal ao entrar na tela
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Steps />
        <Services />
        <Gallery />
        <About />
        <Reviews />
        <Social />
        <Local />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
