import { waProps } from '../lib/whatsapp.js'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__bg" aria-hidden="true">
        {/* ➜ Troque a foto aqui se quiser outra (ex.: /assets/ambiente-2.jpg) */}
        <img src="/assets/ambiente-1.jpg" alt="" fetchPriority="high" />
        <div className="hero__scrim" />
      </div>

      <div className="container hero__inner">
        <span className="hero__badge">
          <span className="e-dot" /> Centro automotivo em Fortaleza · Aerolândia
        </span>

        <h1 className="hero__title">
          Diagnóstico honesto e <span className="hl-grad">orçamento por vídeo</span>.
        </h1>

        <p className="hero__sub">
          A gente <strong>busca seu carro em casa</strong>, mostra tudo por vídeo e você
          acompanha o serviço pelo celular. Sem dor de cabeça.
        </p>

        <div className="hero__actions">
          <a className="btn btn--wa btn--lg" {...waProps('hero')}>
            <span className="ico-wa" aria-hidden="true" /> Falar com a equipe
          </a>
          <a className="btn btn--glass btn--lg" href="#servicos">
            Ver serviços <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Faixa de informações — só aparece no desktop */}
        <ul className="hero__stats">
          <li><strong>+9.000</strong><span>carros atendidos</span></li>
          <li><strong>4 anos</strong><span>de mercado</span></li>
          <li><strong>Aerolândia</strong><span>Fortaleza/CE</span></li>
        </ul>
      </div>

      <a href="#como-funciona" className="hero__scroll" aria-label="Rolar para baixo"><span /></a>
    </section>
  )
}
