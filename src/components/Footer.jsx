import { waProps } from '../lib/whatsapp.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/assets/logo.png" alt="The Bergs Centro Automotivo" width="150" height="48" loading="lazy" />
          <p>Centro automotivo multimarcas em Fortaleza. Diagnóstico honesto, preço justo e orçamento por vídeo.</p>
        </div>
        <div className="footer__col">
          <h4>Contato</h4>
          <a {...waProps('hero')}>WhatsApp: (85) 98601-1336</a>
          <a href="https://www.instagram.com/thebergs.c.a" target="_blank" rel="noopener">Instagram: @thebergs.c.a</a>
        </div>
        <div className="footer__col">
          <h4>Onde estamos</h4>
          <p>Rua Teófilo Cordeiro, 19 — Aerolândia, Fortaleza/CE</p>
          <p>Seg–Sex: 8h–18h · Sáb: 8h–12h</p>
        </div>
      </div>
      <div className="footer__bottom container">
        <span>© {new Date().getFullYear()} The Bergs Centro Automotivo.</span>
        {/* ➜ Adicione o CNPJ aqui se houver */}
      </div>
    </footer>
  )
}
