import { useEffect, useRef, useState } from 'react'
import { waProps } from '../lib/whatsapp.js'

const PASSOS = [
  { n: '01', t: 'Você agenda pelo WhatsApp', p: 'Conta o que está sentindo no carro e a gente combina o melhor horário.' },
  { n: '02', t: 'A gente busca seu carro', p: 'Vamos até você e levamos o veículo até a oficina. Sem deslocamento.' },
  { n: '03', t: 'Orçamento em vídeo', p: 'Filmamos o que precisa de reparo. Só seguimos depois da sua aprovação.' },
  { n: '04', t: 'Carro pronto e devolvido', p: 'Executamos o serviço e devolvemos seu carro funcionando direitinho.' },
]
const PONTOS = [0.02, 0.34, 0.66, 0.99] // onde o carro passa em cada número

export default function Steps() {
  const sectionRef = useRef(null)
  const carRef = useRef(null)
  const [ativos, setAtivos] = useState([false, false, false, false])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isDesktop = () => window.matchMedia('(min-width: 1020px)').matches
    let started = false, raf = 0

    const ativar = (p) =>
      setAtivos((prev) => prev.map((v, i) => v || p >= PONTOS[i]))

    const rodarCarro = () => {
      const DUR = 6500
      let t0 = null
      const frame = (t) => {
        if (t0 === null) t0 = t
        const p = ((t - t0) % DUR) / DUR
        const car = carRef.current
        if (car) {
          car.style.left = (p * 100).toFixed(2) + '%'
          car.style.opacity = p < 0.06 ? (p / 0.06).toFixed(2) : p > 0.94 ? ((1 - p) / 0.06).toFixed(2) : '1'
        }
        ativar(p)
        raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting || started) return
        started = true
        if (reduce) {
          setAtivos([true, true, true, true])
          if (carRef.current) { carRef.current.style.left = '50%'; carRef.current.style.opacity = '1' }
        } else if (isDesktop()) {
          rodarCarro()
        } else {
          PASSOS.forEach((_, i) => setTimeout(() => setAtivos((prev) => prev.map((v, k) => v || k <= i)), i * 200))
        }
        obs.disconnect()
      })
    }, { threshold: 0.3 })
    obs.observe(section)
    return () => { obs.disconnect(); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="section steps section--light" id="como-funciona" ref={sectionRef}>
      <div className="steps__bg" aria-hidden="true" />
      <div className="container steps__inner">
        <header className="head reveal">
          <span className="eyebrow">// Como funciona</span>
          <h2>Do agendamento ao carro pronto<br /><span className="hl">em 4 passos</span></h2>
        </header>

        {/* Trilho com o carrinho — visível no mobile, posicionado ABAIXO dos cards via CSS (order) */}
        <div className="steps__rail" aria-hidden="true">
          <div className="steps__rail-car">
            <svg className="car-svg" viewBox="0 0 66 30" width="54" height="24" role="img" aria-label="carro">
              <defs>
                <linearGradient id="railCarG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#7ed957" /><stop offset="1" stopColor="#38e24a" />
                </linearGradient>
              </defs>
              <path d="M4 21 L6 15 C7 13 9 12 12 12 L19 12 C21 8.5 24.5 7 29 7 L39 7 C44 7 47 9 49 12 L58 13 C61 13.5 63 15 63 18 L63 21 C63 22 62 22.5 61 22.5 L6 22.5 C4.5 22.5 4 22 4 21 Z" fill="url(#railCarG)" />
              <path d="M22 11.5 L25.5 8.7 L32 8.7 L32 11.5 Z" fill="#06250f" opacity=".55" />
              <path d="M34 8.7 L39 8.7 L43.5 11.5 L34 11.5 Z" fill="#06250f" opacity=".55" />
              <circle cx="60.5" cy="17.5" r="1.2" fill="#fff" opacity=".9" />
              <g className="car-wheel"><circle cx="18" cy="22.5" r="5" fill="#0a0e16" /><circle cx="18" cy="22.5" r="2" fill="url(#railCarG)" /><rect x="17.3" y="18" width="1.4" height="9" rx=".6" fill="#243246" /></g>
              <g className="car-wheel"><circle cx="49" cy="22.5" r="5" fill="#0a0e16" /><circle cx="49" cy="22.5" r="2" fill="url(#railCarG)" /><rect x="48.3" y="18" width="1.4" height="9" rx=".6" fill="#243246" /></g>
            </svg>
          </div>
        </div>

        <ol className="steps__list">
          {PASSOS.map((s, i) => (
            <li className={`step ${ativos[i] ? 'is-active' : ''}`} key={s.n}>
              <div className="step__badge"><span>{s.n}</span><i className="step__dot" /></div>
              <h3>{s.t}</h3>
              <p>{s.p}</p>
            </li>
          ))}

          <li className="steps__car-track" aria-hidden="true">
            <div className="steps__car" ref={carRef}>
              <svg className="car-svg" viewBox="0 0 66 30" width="58" height="26" role="img" aria-label="carro">
                <defs>
                  <linearGradient id="carG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#7ed957" /><stop offset="1" stopColor="#38e24a" />
                  </linearGradient>
                </defs>
                <path d="M4 21 L6 15 C7 13 9 12 12 12 L19 12 C21 8.5 24.5 7 29 7 L39 7 C44 7 47 9 49 12 L58 13 C61 13.5 63 15 63 18 L63 21 C63 22 62 22.5 61 22.5 L6 22.5 C4.5 22.5 4 22 4 21 Z" fill="url(#carG)" />
                <path d="M22 11.5 L25.5 8.7 L32 8.7 L32 11.5 Z" fill="#06250f" opacity=".55" />
                <path d="M34 8.7 L39 8.7 L43.5 11.5 L34 11.5 Z" fill="#06250f" opacity=".55" />
                <circle cx="60.5" cy="17.5" r="1.2" fill="#fff" opacity=".9" />
                <g className="car-wheel"><circle cx="18" cy="22.5" r="5" fill="#0a0e16" /><circle cx="18" cy="22.5" r="2" fill="url(#carG)" /><rect x="17.3" y="18" width="1.4" height="9" rx=".6" fill="#243246" /></g>
                <g className="car-wheel"><circle cx="49" cy="22.5" r="5" fill="#0a0e16" /><circle cx="49" cy="22.5" r="2" fill="url(#carG)" /><rect x="48.3" y="18" width="1.4" height="9" rx=".6" fill="#243246" /></g>
              </svg>
            </div>
          </li>
        </ol>

        <div className="steps__cta reveal">
          <a className="btn btn--wa btn--lg" {...waProps('agendar')}>
            <span className="ico-wa" aria-hidden="true" /> Quero agendar a busca do meu carro
          </a>
        </div>
      </div>
    </section>
  )
}
