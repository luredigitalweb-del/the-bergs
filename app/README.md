# The Bergs — Landing Page (React + Vite)

Landing page de conversão da **The Bergs Centro Automotivo**, agora em **React** (Vite).
Mobile-first, focada em gerar contato no **WhatsApp**.

## ▶️ Como rodar (desenvolvimento)

```bash
cd app
npm install      # só na primeira vez
npm run dev
```

Abre em **http://localhost:5199** (se a porta estiver ocupada, o Vite escolhe outra e mostra no terminal).

## 🚀 Build de produção / deploy

```bash
npm run build    # gera a pasta dist/
npm run preview  # testa o build localmente
```

A pasta **`dist/`** é o site pronto (HTML/CSS/JS estáticos). Sobe em qualquer host:
- **Netlify / Vercel**: importe o projeto (build command `npm run build`, publish dir `dist`), ou arraste a pasta `dist`.
- **Hostinger / cPanel**: envie o conteúdo de `dist/` para `public_html`.

## 📁 Estrutura

```
app/
  index.html              → HTML base (SEO, fontes, Meta Pixel, Schema.org)
  vite.config.js
  public/assets/          → imagens (logo, fachada, fotos do ambiente)
  src/
    main.jsx              → ponto de entrada
    App.jsx               → compõe as seções + reveal ao rolar
    styles.css            → todo o visual (cores no :root no topo)
    lib/whatsapp.js       → ⚙️ número, mensagens e rastreamento (EDITE AQUI)
    components/
      Header, Hero, Marquee, Steps, Services, Gallery,
      About, Reviews, Local, FinalCta, Footer, WhatsAppFloat
```

## ✏️ O que editar

| O quê | Onde |
|------|------|
| Número e mensagens do WhatsApp | `src/lib/whatsapp.js` |
| Cores / fontes | `src/styles.css` (bloco `:root` no topo) |
| Serviços (textos, tags) | `src/components/Services.jsx` |
| Fotos do ambiente | `src/components/Gallery.jsx` + arquivos em `public/assets/` |
| Depoimentos | `src/components/Reviews.jsx` (array `AVALIACOES`) |
| Meta Pixel ID | `index.html` (troque `PIXEL_ID`) |

## ⚠️ Antes de publicar (procure por `➜` no código)
- **Meta Pixel ID** em `index.html`
- Confirmar **Instagram** (`@the.beg.s`) e **depoimentos reais** do Google
- Domínio real (canonical/OG) e CNPJ no footer (se houver)
