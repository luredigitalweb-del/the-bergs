import { waProps } from '../lib/whatsapp.js'

const Ico = (paths) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>
)

export default function Local() {
  const mapa = 'https://www.google.com/maps?q=Rua%20Te%C3%B3filo%20Cordeiro%2C%2019%2C%20Aerol%C3%A2ndia%2C%20Fortaleza%20-%20CE%2C%2060850-490&output=embed'
  return (
    <section className="section local section--light" id="local">
      <div className="container">
        <header className="head reveal">
          <span className="eyebrow">// Onde estamos</span>
          <h2>Aerolândia, <span className="hl">Fortaleza</span></h2>
        </header>

        <div className="local__inner">
          <div className="local__info reveal">
            <ul className="local__list">
              <li><span>{Ico(<><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>)}</span>
                <div>Rua Teófilo Cordeiro, 19 — Aerolândia, Fortaleza/CE<br /><small>CEP 60850-490</small></div></li>
              <li><span>{Ico(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>)}</span>
                <div>Segunda a sexta: 8h às 18h<br /><small>Sábado: 8h às 12h</small></div></li>
              <li><span>{Ico(<path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />)}</span>
                <div>WhatsApp: (85) 8523-8451</div></li>
            </ul>
            <p className="local__served"><strong>Atendemos toda a região:</strong> Aldeota,
              São João do Tauape, Pio XII, Aerolândia, Dias Macedo, Castelão, Vila União e Bairro de Fátima.</p>

            <a className="btn btn--wa btn--lg" {...waProps('hero')}>
              <span className="ico-wa" aria-hidden="true" /> Falar no WhatsApp
            </a>
          </div>

          <div className="local__map reveal">
            <iframe title="Mapa — The Bergs Centro Automotivo" src={mapa}
              width="100%" height="100%" style={{ border: 0 }} loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  )
}
