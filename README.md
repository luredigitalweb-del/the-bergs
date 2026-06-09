# The Bergs — Landing Page de Conversão

Landing page de **uma página, mobile-first**, feita para **tráfego pago (Meta Ads)** com um objetivo único: **gerar contato no WhatsApp**.

Stack: **HTML + CSS + JS puro** (sem framework, sem build). Carrega rápido e faz deploy em qualquer lugar.

---

## 📁 Arquivos

```
index.html      → estrutura + SEO + Pixel + Schema
styles.css      → todo o visual (cores na seção :root no topo)
script.js       → WhatsApp, Pixel, animações, formulário (config no topo)
assets/
  logo.png      → logo da The Bergs
  fachada.jpg   → foto real da oficina
README.md       → este arquivo
```

---

## ▶️ Como rodar localmente

Como é estático, basta abrir o `index.html` no navegador. Para o mapa e as fontes funcionarem 100%, prefira servir por HTTP:

```bash
# Opção 1 — Python
python -m http.server 8000

# Opção 2 — Node
npx serve .
```

Depois acesse `http://localhost:8000`.

---

## 🚀 Deploy

Sobe direto em qualquer host estático (arraste a pasta):

- **Netlify** → arraste a pasta em app.netlify.com/drop
- **Vercel** → `vercel` na pasta, ou importe o repositório
- **GitHub Pages** → suba os arquivos e ative Pages
- **Hostinger / cPanel** → envie os arquivos para `public_html`

Não precisa de build nem servidor Node em produção.

---

## ✅ O que PRECISA ser preenchido antes de publicar

Tudo está marcado no código com o símbolo **`➜`**. Itens:

| Onde | O quê | Arquivo |
|------|-------|---------|
| `fbq('init', 'PIXEL_ID')` | **Meta Pixel ID** | `index.html` (`<head>`) |
| Bloco GTM/gtag comentado | **GTM/Google Ads** (opcional) | `index.html` (`<head>`) |
| `WHATSAPP` | Confirmar número (já está `5585986011336`) | `script.js` (topo) |
| Instagram `the.beg.s` | Confirmar o @ real | `index.html` (footer) |
| Depoimentos | Trocar pelos prints/textos reais | `index.html` (seção depoimentos) |
| CNPJ (comentado) | Adicionar se houver | `index.html` (footer) |
| `https://www.thebergs.com.br/` | Trocar pelo domínio real (canonical/OG) | `index.html` (`<head>`) |
| `geo` lat/long no Schema | Ajustar para a coordenada exata | `index.html` (JSON-LD) |

> O **Meta Pixel** dispara automaticamente os eventos **`Lead`** e **`Contact`** a cada clique em qualquer botão de WhatsApp. Configure a conversão como `Lead` no Gerenciador de Anúncios.

---

## ✏️ Como editar facilmente

- **Cores:** `styles.css` → bloco `:root` no topo (verde, azul, WhatsApp, fundos).
- **Número de WhatsApp e mensagens:** `script.js` → constantes `WHATSAPP` e `MENSAGENS` no topo.
  - Cada serviço/botão tem uma mensagem própria (a equipe já recebe o contexto).
- **Textos:** direto no `index.html` (está comentado por seção).
- **Fotos:** troque os arquivos em `assets/` mantendo os nomes, ou ajuste os `src`.

### Adicionar uma nova mensagem de WhatsApp
1. Em `script.js`, adicione uma chave em `MENSAGENS`, ex.: `freio: "Olá! Quero serviço de freio."`
2. No `index.html`, coloque `data-wa="freio"` no botão/link. Pronto — o link e o rastreamento são automáticos.

---

## 🎨 Identidade visual

Cores extraídas da **logo** (verde vibrante) e da **fachada real** (azul elétrico + portão verde-limão):

- Verde marca `#3ddc4e` · Azul `#1f6fe0` · WhatsApp `#25d366` · Base grafite `#0c1015`

Fontes: **Sora** (títulos) + **Inter** (corpo), via Google Fonts.

---

## 📋 Checklist de conversão (já implementado)

- [x] Diferencial "busca o carro + orçamento em vídeo" no hero, seção própria e CTAs
- [x] Botão de WhatsApp flutuante sempre visível no mobile
- [x] Mensagens de WhatsApp pré-preenchidas por serviço/contexto
- [x] 5 serviços prioritários em destaque (★)
- [x] Prova social (+9.000 carros, 4 anos, ~180/mês) com contador animado
- [x] Meta Pixel com placeholder + evento `Lead` no clique
- [x] Schema.org `AutoRepair` + Open Graph + Twitter Card
- [x] Formulário leve que abre o WhatsApp já preenchido (sem reload)
- [x] Mapa do Google incorporado + bairros atendidos
- [x] Responsivo (375 / 768 / 1280) e otimizado para mobile
