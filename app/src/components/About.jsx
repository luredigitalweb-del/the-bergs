import { waProps } from '../lib/whatsapp.js'

const Ico = (paths) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>
)

const FEATURES = [
  {
    ico: Ico(<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2l-5.3 5.3a1.6 1.6 0 0 0 2.2 2.2l5.3-5.3a4 4 0 0 0 5.2-5.4l-2.5 2.5-2.3-.6-.6-2.3 2.5-2.5z" />),
    t: 'Começou do zero',
    p: <>Fundada por dois irmãos — <strong>Landsberg</strong> (comercial e peças) e <strong>Vandsberg</strong> (mecânica) — reinvestindo tudo o que ganhavam, com coragem e trabalho.</>,
  },
  {
    ico: Ico(<><path d="M5 13l1.6-4.2A2 2 0 0 1 8.5 7.5h7a2 2 0 0 1 1.9 1.3L19 13" /><path d="M4 13h16v4H4z" /><circle cx="7.5" cy="17.5" r="1.4" /><circle cx="16.5" cy="17.5" r="1.4" /></>),
    t: '+9.000 carros atendidos',
    p: <>Em pouco mais de 4 anos, já são mais de 9.000 carros e cerca de 180 clientes por mês — gente que volta porque confia.</>,
  },
  {
    ico: Ico(<><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></>),
    t: 'Honestidade em primeiro lugar',
    p: <>Você paga só pelo que o carro realmente precisa e aprova tudo por vídeo antes de qualquer serviço.</>,
  },
  {
    ico: Ico(<><path d="M3 7h11v8H3z" /><path d="M14 10h3.5L20 13v2h-6z" /><circle cx="7" cy="17" r="1.6" /><circle cx="16.5" cy="17" r="1.6" /></>),
    t: 'A gente vai até você',
    p: <>Buscamos e levamos seu carro sob agendamento. Você resolve sem sair de casa nem perder o seu dia.</>,
  },
]

export default function About() {
  return (
    <section className="section about" id="sobre">
      <div className="container">
        <header className="head reveal">
          <span className="eyebrow"><span className="e-dot" /> Sobre nós</span>
          <h2>Dois irmãos e uma oficina que <span className="hl-grad">Fortaleza confia</span>.</h2>
          <p className="head__sub">Da coragem de começar do zero ao orçamento enviado por vídeo:
            a história da The Bergs é sobre tratar o seu carro com a mesma honestidade que trataríamos o nosso.</p>
        </header>

        <div className="about__grid">
          <div className="about__media reveal">
            <img src="/assets/fachada.jpg" alt="Oficina The Bergs em Fortaleza" width="900" height="1100" loading="lazy" />
            <span className="about__pill"><span className="e-dot" /> Aerolândia · Fortaleza/CE</span>
          </div>

          <div className="about__features reveal">
            {FEATURES.map((f, i) => (
              <article className="feat" key={i}>
                <span className="feat__ico">{f.ico}</span>
                <div><h3>{f.t}</h3><p>{f.p}</p></div>
              </article>
            ))}

            <a className="about__cta" {...waProps('hero')}>
              <span className="about__cta-ico"><span className="ico-wa" aria-hidden="true" /></span>
              <span className="about__cta-txt"><small>Atendendo toda Fortaleza</small><strong>Fale com a equipe da The Bergs</strong></span>
              <span className="about__cta-arrow" aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
