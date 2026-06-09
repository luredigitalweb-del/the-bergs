import { useState } from 'react'
import { waProps } from '../lib/whatsapp.js'

const S = (paths) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths}</svg>
)

const ICONES = {
  revisao: S(<><rect x="5" y="5" width="14" height="16" rx="2" /><path d="M9 5V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" /><path d="M8.5 13.5l2 2 4-4.5" /></>),
  diesel: S(<><rect x="4" y="4" width="9" height="17" rx="1.8" /><line x1="4" y1="10" x2="13" y2="10" /><path d="M13 7h2.5A1.5 1.5 0 0 1 17 8.5V16a1.5 1.5 0 0 0 3 0V9.5L17 6.5" /><line x1="3" y1="21" x2="14" y2="21" /></>),
  cambio: S(<><circle cx="12" cy="4.5" r="1.8" /><line x1="12" y1="6.3" x2="12" y2="14" /><path d="M12 14l-4 5" /><path d="M12 14l4 5" /><line x1="7" y1="19" x2="17" y2="19" /></>),
  embreagem: S(<><circle cx="9.5" cy="12" r="5.5" /><path d="M14 7.2a5.5 5.5 0 0 1 0 9.6" /><circle cx="9.5" cy="12" r="1.6" /></>),
  motor: S(<><path d="M4 14a8 8 0 0 1 16 0" /><path d="M12 14l4.5-3.5" /><circle cx="12" cy="14" r="1.3" /><line x1="3.5" y1="14" x2="5.5" y2="14" /><line x1="18.5" y1="14" x2="20.5" y2="14" /></>),
  alinhamento: S(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.6" /><line x1="12" y1="9.4" x2="12" y2="3" /><line x1="9.8" y1="13.3" x2="4.5" y2="16.5" /><line x1="14.2" y1="13.3" x2="19.5" y2="16.5" /></>),
  balanceamento: S(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3.4" /><line x1="12" y1="3" x2="12" y2="6.2" /><line x1="12" y1="17.8" x2="12" y2="21" /><line x1="3" y1="12" x2="6.2" y2="12" /><line x1="17.8" y1="12" x2="21" y2="12" /></>),
  oleo: S(<><path d="M12 3.5s5.5 6.3 5.5 10.5a5.5 5.5 0 0 1-11 0C6.5 9.8 12 3.5 12 3.5z" /><path d="M9.7 14a2.3 2.3 0 0 0 2.3 2.3" /></>),
}

const CHECKS = [
  'Buscamos seu carro em casa',
  'Orçamento por vídeo antes de aprovar',
  'Diagnóstico honesto',
  'Preço justo',
]

const SERVICOS = [
  { key: 'revisao', num: '01', tag: 'Mais procurado', nome: 'Revisão geral', desc: 'Checagem completa do seu carro pra rodar tranquilo, sem surpresa na estrada. A gente revisa item por item e te mostra tudo por vídeo.' },
  { key: 'diesel', num: '02', tag: 'Alta demanda', nome: 'Linha diesel', desc: 'Serviço especializado pra sua linha diesel render mais e durar mais. Diagnóstico preciso do que realmente precisa — sem inventar serviço.' },
  { key: 'cambio', num: '03', tag: 'Especialidade', nome: 'Câmbio automático', desc: 'Troca de óleo do câmbio feita do jeito certo, com o fluido correto pro seu veículo. Prolonga a vida da transmissão e evita dor de cabeça.' },
  { key: 'embreagem', num: '04', tag: 'Serviço completo', nome: 'Embreagem', desc: 'Troca e regulagem de embreagem com peça de confiança e garantia no serviço. Seu carro engatando macio de novo.' },
  { key: 'motor', num: '05', tag: 'Diagnóstico preciso', nome: 'Motor', desc: 'Reparo e retífica de motor com diagnóstico preciso. Você só paga pelo que o carro realmente precisa — orçamento honesto, sempre.' },
  { key: 'alinhamento', num: '06', tag: 'Dia a dia', nome: 'Alinhamento', desc: 'Alinhamento que deixa a direção firme e faz seus pneus durarem muito mais. Rápido, computadorizado e bem feito.' },
  { key: 'balanceamento', num: '07', tag: 'Conforto', nome: 'Balanceamento', desc: 'Balanceamento roda a roda pra acabar com a trepidação no volante e te dar mais conforto e segurança ao dirigir.' },
  { key: 'oleo', num: '08', tag: 'Rápido', nome: 'Troca de óleo', desc: 'Troca de óleo e filtro com o produto certo pro seu motor. Rápido, sem complicação e sem enrolação.' },
]

export default function Services() {
  const [aberto, setAberto] = useState(0) // primeiro aberto

  return (
    <section className="section services" id="servicos">
      <div className="container">
        <header className="head reveal">
          <span className="eyebrow">// Nossos serviços</span>
          <h2>O que a gente resolve <span className="hl">no seu carro</span></h2>
          <p className="head__sub">Toque no serviço e fale direto com a equipe pelo WhatsApp.</p>
        </header>

        <div className="acc">
          {SERVICOS.map((s, i) => {
            const open = aberto === i
            const toggle = (e) => {
              if (e.target.closest('[data-wa-link]')) return
              setAberto(open ? -1 : i)
            }
            return (
              <div className={`acc__item ${open ? 'is-open' : ''}`} key={s.key}>
                <div
                  className="acc__head" role="button" tabIndex={0} aria-expanded={open}
                  onClick={toggle}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setAberto(open ? -1 : i) } }}
                >
                  <span className="acc__ico">{ICONES[s.key]}</span>
                  <span className="acc__titles">
                    <span className="acc__tag">{s.tag}</span>
                    <span className="acc__name">{s.nome}</span>
                  </span>
                  <a className="acc__quote" data-wa-link {...waProps(s.key)}>
                    <span className="ico-wa" aria-hidden="true" /><span className="acc__quote-txt">Orçamento</span>
                  </a>
                  <span className="acc__num">{s.num}</span>
                  <span className="acc__toggle" aria-hidden="true" />
                </div>
                <div className="acc__panel"><div className="acc__panel-in"><div className="acc__body">
                  <div className="acc__col">
                    <p className="acc__desc">{s.desc}</p>
                    <a className="acc__cta" data-wa-link {...waProps(s.key)}>
                      <span className="ico-wa" aria-hidden="true" /> Quero este serviço
                    </a>
                  </div>
                  <ul className="acc__checks">
                    {CHECKS.map((c, k) => <li key={k}><i className="tick" /> {c}</li>)}
                  </ul>
                </div></div></div>
              </div>
            )
          })}
        </div>

        <p className="services__note reveal">Não achou seu serviço?{' '}
          <a className="link-inline" {...waProps('outro')}>Fala com a gente que a gente resolve →</a>
        </p>
      </div>
    </section>
  )
}
