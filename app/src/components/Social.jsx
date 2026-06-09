import { Iphone16Pro } from './Iphone16Pro.jsx'
import { waProps } from '../lib/whatsapp.js'

// ➜ Confirme/troque o @ e o link do Instagram se necessário
const INSTAGRAM_USER = 'thebergs.c.a'
const INSTAGRAM_URL = 'https://www.instagram.com/thebergs.c.a'

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export default function Social() {
  return (
    <section className="section social" id="redes">
      <div className="container">
        <header className="head reveal">
          <span className="eyebrow">// Redes sociais</span>
          <h2>Siga a The Bergs <span className="hl-grad">nas redes</span></h2>
          <p className="head__sub">Bastidores da oficina, dicas pro seu carro e os serviços do dia a dia. Acompanha a gente por lá!</p>
        </header>

        <div className="social__grid">
          <div className="social__phone reveal">
            <div className="social__glow" aria-hidden="true" />
            <Iphone16Pro src="/assets/instagram.jpg" width={280} height={560} />
          </div>

          <div className="social__content reveal">
            <a className="social__handle" href={INSTAGRAM_URL} target="_blank" rel="noopener">
              <span className="social__ig"><IgIcon /></span>
              <div>
                <strong>@{INSTAGRAM_USER}</strong>
                <small>Instagram · The Bergs Centro Automotivo</small>
              </div>
            </a>

            <p className="social__txt">
              Tem sempre carro novo passando por aqui, antes e depois dos serviços e o
              orçamento em vídeo que a gente faz. Segue lá e fica por dentro!
            </p>

            <div className="social__links">
              <a className="btn btn--ig btn--lg" href={INSTAGRAM_URL} target="_blank" rel="noopener">
                <span className="social__igico"><IgIcon /></span> Seguir no Instagram
              </a>
              <a className="btn btn--wa btn--lg" {...waProps('hero')}>
                <span className="ico-wa" aria-hidden="true" /> Falar no WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
