import { waProps } from '../lib/whatsapp.js'

export default function FinalCta() {
  return (
    <section className="finalcta">
      <div className="finalcta__bg" aria-hidden="true" />
      <div className="container finalcta__inner reveal">
        <h2>Seu carro merece um<br />diagnóstico <span className="hl">honesto</span>.</h2>
        <p>Agende a busca agora. A gente vai até você, mostra tudo por vídeo e só faz o que realmente precisa.</p>
        <a className="btn btn--wa btn--xl" {...waProps('agendar')}>
          <span className="ico-wa" aria-hidden="true" /> Agendar a busca do meu carro
        </a>
        <span className="finalcta__sub">Resposta rápida no horário comercial · Fortaleza/CE</span>
      </div>
    </section>
  )
}
