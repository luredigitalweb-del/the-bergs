// ➜ Edite as avaliações reais aqui (nome, cidade, nota, texto)
const AVALIACOES = [
  { nome: 'Marcos S.', cidade: 'Aerolândia', nota: 5, texto: 'Buscaram meu carro em casa e mandaram tudo por vídeo. Não perdi meu dia de trabalho. Atendimento honesto demais.' },
  { nome: 'Juliana A.', cidade: 'São João do Tauape', nota: 5, texto: 'Achei que ia gastar uma fortuna e só paguei o que realmente precisava. Explicaram tudo. Recomendo de olhos fechados.' },
  { nome: 'Rafael L.', cidade: 'Vila União', nota: 5, texto: 'Resolveram o problema do meu motor que outra oficina não conseguiu. Profissionais de confiança. Virei cliente fiel.' },
  { nome: 'Patrícia M.', cidade: 'Aldeota', nota: 5, texto: 'Serviço rápido e preço justo. Me mandaram o orçamento em vídeo antes, sem nenhuma surpresa na hora de pagar.' },
  { nome: 'Anderson R.', cidade: 'Dias Macedo', nota: 5, texto: 'Pegaram meu carro, fizeram a revisão e devolveram funcionando perfeito. Comodidade que não tem preço.' },
  { nome: 'Cláudia F.', cidade: 'Bairro de Fátima', nota: 5, texto: 'Equipe atenciosa e honesta. Hoje só levo meu carro na The Bergs. Confiança total na turma.' },
]

const GoogleG = () => (
  <svg viewBox="0 0 48 48">
    <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
    <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
    <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z" />
    <path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
  </svg>
)

const Card = ({ a }) => (
  <article className="review">
    <div className="review__top">
      <span className="review__g" title="Avaliação do Google"><GoogleG /></span>
      <span className="review__stars" aria-label={`${a.nota} de 5 estrelas`}>
        {'★'.repeat(a.nota)}{'☆'.repeat(5 - a.nota)}
      </span>
    </div>
    <p className="review__text">"{a.texto}"</p>
    <div className="review__author">
      <span className="review__avatar">{a.nome.trim().charAt(0).toUpperCase()}</span>
      <div><strong>{a.nome}</strong><small>{a.cidade} · Fortaleza</small></div>
    </div>
  </article>
)

export default function Reviews() {
  // duplica a lista pra o loop infinito ficar sem emendas
  const dupl = [...AVALIACOES, ...AVALIACOES]
  return (
    <section className="section testimonials section--light" id="depoimentos">
      <div className="container">
        <header className="head reveal">
          <span className="eyebrow">// Quem confia</span>
          <h2>O que dizem <span className="hl">nossos clientes</span></h2>
          <p className="head__sub">Avaliações reais de quem já confiou o carro à The Bergs.</p>
        </header>
      </div>
      <div className="reviews reveal" aria-label="Avaliações de clientes no Google">
        <div className="reviews__track">
          {dupl.map((a, i) => <Card a={a} key={i} />)}
        </div>
      </div>
    </section>
  )
}
