# The Bergs — Landing Page (React + Vite)

Landing page de conversão da **The Bergs Centro Automotivo** (Fortaleza/CE).
Mobile-first, focada em gerar contato no **WhatsApp**. Feita em **React + Vite**.

## ▶️ Como rodar (desenvolvimento)

```bash
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
- **Vercel / Netlify**: importe o repositório. Build: `npm run build` · Publish: `dist`.
- **Hostinger / cPanel**: envie o conteúdo de `dist/` para `public_html`.

## 📁 Estrutura

```
index.html              → HTML base (SEO, fontes, Meta Pixel, GTM, Schema.org)
vite.config.js
public/assets/          → imagens (logo, fachada, fotos do ambiente)
src/
  main.jsx              → ponto de entrada
  App.jsx               → compõe as seções + reveal ao rolar
  styles.css            → todo o visual (cores no :root no topo)
  lib/whatsapp.js       → ⚙️ número, mensagens e rastreamento (EDITE AQUI)
  components/
    Header, Hero, Marquee, Steps, Services, Gallery,
    About, Reviews, Local, Social, FinalCta, Footer, WhatsAppFloat
```

## ✏️ O que editar

| O quê | Onde |
|------|------|
| Número e mensagens do WhatsApp | `src/lib/whatsapp.js` |
| Cores / fontes | `src/styles.css` (bloco `:root` no topo) |
| Serviços (textos, tags) | `src/components/Services.jsx` |
| Fotos do ambiente | `src/components/Gallery.jsx` + arquivos em `public/assets/` |
| Depoimentos | `src/components/Reviews.jsx` (array `AVALIACOES`) |
| Instagram | `src/components/Social.jsx` (`@thebergs.c.a`) |

## 📊 Rastreamento
- **Google Tag Manager:** ativo no `index.html` — container **`GTM-56962DJ8`**.
- **Meta Pixel:** presente no `index.html` com `PIXEL_ID` de exemplo — **troque pelo ID real** (ou gerencie o Pixel dentro do GTM).

## ⚠️ Antes de publicar
- Trocar `PIXEL_ID` (ou remover, se o Pixel for via GTM).
- Confirmar depoimentos reais do Google em `Reviews.jsx`.
- Domínio real (canonical/OG no `index.html`) e CNPJ no rodapé (se houver).
