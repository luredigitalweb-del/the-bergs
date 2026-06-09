import { useEffect, useRef, useState } from 'react'

// ➜ Edite as fotos do ambiente aqui (src + legenda)
const FOTOS = [
  { src: '/assets/ambiente-1.jpg', legenda: 'Box de serviços' },
  { src: '/assets/ambiente-2.jpg', legenda: 'Elevador e suspensão' },
  { src: '/assets/ambiente-3.jpg', legenda: 'Mão na massa' },
  { src: '/assets/ambiente-4.jpg', legenda: 'Orçamento detalhado' },
  { src: '/assets/ambiente-5.jpg', legenda: 'Diagnóstico eletrônico' },
  { src: '/assets/fachada.jpg', legenda: 'Nossa oficina' },
]

export default function Gallery() {
  const trackRef = useRef(null)
  const [ativo, setAtivo] = useState(0)

  const centralizar = (i) => {
    const track = trackRef.current
    const s = track?.children[i]
    if (s) track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2, behavior: 'smooth' })
  }
  const passo = () => {
    const track = trackRef.current
    return (track?.children[0]?.offsetWidth || 320) + 18
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const centro = track.scrollLeft + track.clientWidth / 2
      let idx = 0, melhor = Infinity
      Array.from(track.children).forEach((s, i) => {
        const c = s.offsetLeft + s.offsetWidth / 2, d = Math.abs(c - centro)
        if (d < melhor) { melhor = d; idx = i }
      })
      setAtivo(idx)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="section gallery section--light" id="ambiente">
      <div className="container">
        <header className="head reveal">
          <span className="eyebrow">// Nossa estrutura</span>
          <h2>Nosso ambiente <span className="hl">premium</span></h2>
          <p className="head__sub">Um espaço preparado pra cuidar do seu carro com todo o cuidado que ele merece.</p>
        </header>
      </div>

      <div className="gallery__wrap reveal">
        <button className="gallery__nav gallery__nav--prev" aria-label="Foto anterior"
          onClick={() => trackRef.current?.scrollBy({ left: -passo(), behavior: 'smooth' })}>‹</button>
        <div className="gallery__track" ref={trackRef}>
          {FOTOS.map((f, i) => (
            <figure className="gallery__slide" key={i}>
              <img src={f.src} alt={`${f.legenda} — The Bergs`} loading="lazy" />
              <figcaption>{f.legenda}</figcaption>
            </figure>
          ))}
        </div>
        <button className="gallery__nav gallery__nav--next" aria-label="Próxima foto"
          onClick={() => trackRef.current?.scrollBy({ left: passo(), behavior: 'smooth' })}>›</button>
      </div>

      <div className="gallery__dots" aria-hidden="true">
        {FOTOS.map((_, i) => (
          <button key={i} className={ativo === i ? 'is-active' : ''} aria-label={`Foto ${i + 1}`} onClick={() => centralizar(i)} />
        ))}
      </div>
    </section>
  )
}
