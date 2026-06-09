// Duas faixas animadas (CSS) logo abaixo do banner.
const TOPO = [
  "Buscamos seu carro em casa", "Orçamento por vídeo", "Diagnóstico honesto",
  "Preço justo", "Multimarcas", "Aerolândia · Fortaleza/CE",
]
const BAIXO = [
  "Mecânica em geral", "Motor", "Suspensão", "Injeção eletrônica", "Elétrica",
  "Embreagem", "Freio", "Linha diesel", "Câmbio automático", "Nacionais e importados",
]

function Scroller({ itens }) {
  // 3 cópias garantem o loop contínuo em telas largas
  return (
    <>
      {[0, 1, 2].map((c) => (
        <div key={c} style={{ display: 'flex', alignItems: 'center' }}>
          {itens.map((t, i) => (
            <div className="item" key={i}>{t}<span className="dot" /></div>
          ))}
        </div>
      ))}
    </>
  )
}

export default function Marquee() {
  return (
    <section className="marquee" aria-label="Nossos serviços e diferenciais">
      <div className="marquee__glow" aria-hidden="true" />
      <div className="stripe stripe--green">
        <div className="scroller"><Scroller itens={TOPO} /></div>
      </div>
      <div className="stripe stripe--dark">
        <div className="scroller"><Scroller itens={BAIXO} /></div>
      </div>
    </section>
  )
}
