/* ===============================================================
   THE BERGS — script.js
   ---------------------------------------------------------------
   ⚙️  EDITE AQUI: número de WhatsApp e mensagens pré-preenchidas.
   Cada botão/cartão no HTML tem um atributo  data-wa="CHAVE"  que
   busca a mensagem correspondente abaixo. O link wa.me e o disparo
   do Meta Pixel (evento Lead) são montados automaticamente.
   =============================================================== */

/* >>> NÚMERO DE WHATSAPP (somente dígitos, com DDI 55) <<< */
const WHATSAPP = "5585986011336";

/* >>> MENSAGENS POR CONTEXTO (a chave = data-wa no HTML) <<< */
const MENSAGENS = {
  hero:         "Olá! Vim pelo site e quero agendar a busca do meu carro.",
  agendar:      "Olá! Vim pelo site e quero agendar a busca do meu carro com orçamento por vídeo.",
  flutuante:    "Olá! Vim pelo site da The Bergs e quero falar com a equipe.",
  outro:        "Olá! Vim pelo site e preciso de um serviço pro meu carro. Pode me ajudar?",
  // Serviços (cada um com contexto próprio pra equipe já saber do que se trata)
  revisao:      "Olá! Vim pelo site e tenho interesse em uma revisão geral.",
  diesel:       "Olá! Vim pelo site e tenho interesse no serviço da linha diesel.",
  cambio:       "Olá! Vim pelo site e quero trocar o óleo do câmbio automático.",
  embreagem:    "Olá! Vim pelo site e tenho interesse no serviço de embreagem.",
  motor:        "Olá! Vim pelo site e preciso de um serviço no motor do meu carro.",
  alinhamento:  "Olá! Vim pelo site e quero fazer alinhamento.",
  balanceamento:"Olá! Vim pelo site e quero fazer balanceamento.",
  oleo:         "Olá! Vim pelo site e quero fazer troca de óleo.",
};

/* Monta o link wa.me com a mensagem codificada */
function linkWhats(chave) {
  const msg = MENSAGENS[chave] || MENSAGENS.hero;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

/* Dispara o evento de conversão no Meta Pixel (se carregado) e no gtag (se houver) */
function dispararConversao(chave) {
  try {
    if (typeof fbq === "function") {
      fbq("track", "Lead", { content_name: chave });   // evento de conversão
      fbq("track", "Contact", { content_name: chave });
    }
    if (typeof gtag === "function") {
      gtag("event", "generate_lead", { method: "whatsapp", context: chave });
    }
  } catch (e) { /* silencioso — nunca bloquear o clique */ }
}

/* ---------------------------------------------------------------
   1) Liga todos os elementos com data-wa: define href e rastreia
   --------------------------------------------------------------- */
document.querySelectorAll("[data-wa]").forEach((el) => {
  const chave = el.getAttribute("data-wa");
  el.setAttribute("href", linkWhats(chave));
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
  el.addEventListener("click", () => dispararConversao(chave));
});

/* ---------------------------------------------------------------
   2) Header: sombra ao rolar
   --------------------------------------------------------------- */
const header = document.getElementById("header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------------------------------------------------------------
   3) Reveal on scroll (IntersectionObserver)
   --------------------------------------------------------------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ---------------------------------------------------------------
   4) Contador animado dos números (prova social)
   --------------------------------------------------------------- */
function animarContador(el) {
  const alvo = parseInt(el.dataset.count, 10);
  const prefixo = el.dataset.prefix || "";
  const dur = 1300; let ini = null;
  const fmt = (n) => n.toLocaleString("pt-BR");
  function passo(ts) {
    if (!ini) ini = ts;
    const p = Math.min((ts - ini) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = prefixo + fmt(Math.floor(eased * alvo));
    if (p < 1) requestAnimationFrame(passo);
    else el.textContent = prefixo + fmt(alvo);
  }
  requestAnimationFrame(passo);
}
const ioNum = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting && e.target.dataset.count) { animarContador(e.target); ioNum.unobserve(e.target); }
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach((el) => ioNum.observe(el));

/* ---------------------------------------------------------------
   5) Depoimentos — cards estilo Google em carrossel infinito
   ➜ EDITE AQUI as avaliações (nome, cidade, nota e texto).
   --------------------------------------------------------------- */
(function avaliacoes() {
  const track = document.getElementById("reviews-track");
  if (!track) return;

  const AVALIACOES = [
    { nome: "Marcos S.",   cidade: "Aerolândia",          nota: 5, texto: "Buscaram meu carro em casa e mandaram tudo por vídeo. Não perdi meu dia de trabalho. Atendimento honesto demais." },
    { nome: "Juliana A.",  cidade: "São João do Tauape",  nota: 5, texto: "Achei que ia gastar uma fortuna e só paguei o que realmente precisava. Explicaram tudo. Recomendo de olhos fechados." },
    { nome: "Rafael L.",   cidade: "Vila União",          nota: 5, texto: "Resolveram o problema do meu motor que outra oficina não conseguiu. Profissionais de confiança. Virei cliente fiel." },
    { nome: "Patrícia M.", cidade: "Aldeota",             nota: 5, texto: "Serviço rápido e preço justo. Me mandaram o orçamento em vídeo antes, sem nenhuma surpresa na hora de pagar." },
    { nome: "Anderson R.", cidade: "Dias Macedo",         nota: 5, texto: "Pegaram meu carro, fizeram a revisão e devolveram funcionando perfeito. Comodidade que não tem preço." },
    { nome: "Cláudia F.",  cidade: "Bairro de Fátima",    nota: 5, texto: "Equipe atenciosa e honesta. Hoje só levo meu carro na The Bergs. Confiança total na turma." },
  ];

  // Logo "G" do Google (multicolorida)
  const googleG = '<svg viewBox="0 0 48 48"><path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/><path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"/><path fill="#EA4335" d="M24 9.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 3.18 29.93 1 24 1 15.4 1 7.96 5.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/></svg>';

  function cardHTML(a) {
    const estrelas = "★".repeat(a.nota) + "☆".repeat(5 - a.nota);
    const inicial = a.nome.trim().charAt(0).toUpperCase();
    return `<article class="review">
        <div class="review__top">
          <span class="review__g" title="Avaliação do Google">${googleG}</span>
          <span class="review__stars" aria-label="${a.nota} de 5 estrelas">${estrelas}</span>
        </div>
        <p class="review__text">"${a.texto}"</p>
        <div class="review__author">
          <span class="review__avatar">${inicial}</span>
          <div><strong>${a.nome}</strong><small>${a.cidade} · Fortaleza</small></div>
        </div>
      </article>`;
  }

  // monta os cards + uma cópia idêntica (loop infinito sem emendas)
  const base = AVALIACOES.map(cardHTML).join("");
  track.innerHTML = base + base;
})();

/* ---------------------------------------------------------------
   6) Formulário leve → abre WhatsApp já preenchido (sem reload)
   --------------------------------------------------------------- */
(function leadForm() {
  const btn = document.getElementById("f-enviar");
  if (!btn) return;
  const nome = document.getElementById("f-nome");
  const fone = document.getElementById("f-fone");
  const serv = document.getElementById("f-servico");
  const erro = document.getElementById("f-erro");

  btn.addEventListener("click", () => {
    if (!nome.value.trim() || !fone.value.trim()) {
      erro.hidden = false;
      (!nome.value.trim() ? nome : fone).focus();
      return;
    }
    erro.hidden = true;
    const servico = serv.value ? ` Serviço: ${serv.value}.` : "";
    const msg = `Olá! Meu nome é ${nome.value.trim()} (WhatsApp ${fone.value.trim()}).` +
                `${servico} Vim pelo site e quero agendar a busca do meu carro.`;
    dispararConversao("formulario");
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });
})();

/* ---------------------------------------------------------------
   7) Marquee (faixas animadas abaixo do banner)
   ➜ EDITE AQUI os textos das faixas (informações reais da oficina)
   --------------------------------------------------------------- */
const MARQUEE_TOPO = [   // faixa verde — diferenciais
  "Buscamos seu carro em casa",
  "Orçamento por vídeo",
  "Diagnóstico honesto",
  "Preço justo",
  "Multimarcas",
  "Aerolândia · Fortaleza/CE",
];
const MARQUEE_BAIXO = [  // faixa escura — serviços reais
  "Mecânica em geral",
  "Motor",
  "Suspensão",
  "Injeção eletrônica",
  "Elétrica",
  "Embreagem",
  "Freio",
  "Linha diesel",
  "Câmbio automático",
  "Nacionais e importados",
];
function preencherMarquee(id, itens) {
  const box = document.getElementById(id);
  if (!box) return;
  const frag = document.createDocumentFragment();
  // 3 cópias garantem o loop contínuo em telas largas
  for (let c = 0; c < 3; c++) {
    const grupo = document.createElement("div");
    grupo.style.display = "flex";
    grupo.style.alignItems = "center";
    grupo.innerHTML = itens.map((t) => `<div class="item">${t}<span class="dot"></span></div>`).join("");
    frag.appendChild(grupo);
  }
  box.appendChild(frag);
}
preencherMarquee("scroller-top", MARQUEE_TOPO);
preencherMarquee("scroller-bottom", MARQUEE_BAIXO);

/* ---------------------------------------------------------------
   8) "Como funciona": carro anda na linha e cada card aparece
      no momento em que o carro passa por ele.
   --------------------------------------------------------------- */
(function stepsCarReveal() {
  const section = document.getElementById("como-funciona");
  if (!section) return;
  const car = section.querySelector(".steps__car");
  const steps = Array.from(section.querySelectorAll(".step"));
  if (!steps.length) return;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isDesktop = () => window.matchMedia("(min-width: 1020px)").matches;
  // posição (0..1 no trilho) em que o carro passa por cada número
  const PONTOS = [0.02, 0.34, 0.66, 0.99];
  const DUR = 6500; // ms por volta
  let started = false;

  function revelar(p) {
    steps.forEach((s, i) => { if (p >= PONTOS[i]) s.classList.add("is-active"); });
  }

  function rodarCarro() {
    let t0 = null;
    function frame(t) {
      if (t0 === null) t0 = t;
      const p = ((t - t0) % DUR) / DUR;          // progresso 0..1 (em loop)
      if (car) {
        car.style.left = (p * 100).toFixed(2) + "%";
        car.style.opacity = p < 0.06 ? (p / 0.06).toFixed(2)
                          : p > 0.94 ? ((1 - p) / 0.06).toFixed(2) : "1";
      }
      revelar(p);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function revelarMobile() {
    steps.forEach((s, i) => setTimeout(() => s.classList.add("is-active"), i * 200));
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting || started) return;
      started = true;
      if (reduce) {
        steps.forEach((s) => s.classList.add("is-active"));
        if (car) { car.style.left = "50%"; car.style.opacity = "1"; }
      } else if (isDesktop()) {
        rodarCarro();
      } else {
        revelarMobile();
      }
      obs.disconnect();
    });
  }, { threshold: 0.3 });
  obs.observe(section);
})();

/* ---------------------------------------------------------------
   9) Accordion de serviços (abre/fecha; só um aberto por vez)
   --------------------------------------------------------------- */
(function accordion() {
  const items = Array.from(document.querySelectorAll(".acc__item"));
  if (!items.length) return;

  function toggle(item) {
    const abrir = !item.classList.contains("is-open");
    items.forEach((i) => {
      i.classList.remove("is-open");
      const h = i.querySelector(".acc__head");
      if (h) h.setAttribute("aria-expanded", "false");
    });
    if (abrir) {
      item.classList.add("is-open");
      const h = item.querySelector(".acc__head");
      if (h) h.setAttribute("aria-expanded", "true");
    }
  }

  items.forEach((item) => {
    const head = item.querySelector(".acc__head");
    if (!head) return;
    head.addEventListener("click", (e) => {
      // não alterna se clicou no botão de WhatsApp (deixa o link abrir)
      if (e.target.closest("[data-wa]")) return;
      toggle(item);
    });
    head.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(item); }
    });
  });
})();

/* ---------------------------------------------------------------
   10) Carrossel "Nosso ambiente"
   ➜ EDITE AQUI as fotos: troque/adicione itens no array GALERIA.
     - src: caminho da imagem (ex.: "assets/ambiente-1.jpg")
     - legenda: texto que aparece na foto
     - Deixe src: "" para mostrar um slot de placeholder ("Foto em breve").
   --------------------------------------------------------------- */
(function galeria() {
  const track = document.getElementById("gallery-track");
  const dotsBox = document.getElementById("gallery-dots");
  if (!track) return;

  const GALERIA = [
    { src: "assets/ambiente-1.jpg", legenda: "Box de serviços" },
    { src: "assets/ambiente-2.jpg", legenda: "Elevador e suspensão" },
    { src: "assets/ambiente-3.jpg", legenda: "Mão na massa" },
    { src: "assets/ambiente-4.jpg", legenda: "Orçamento detalhado" },
    { src: "assets/ambiente-5.jpg", legenda: "Diagnóstico eletrônico" },
    { src: "assets/fachada.jpg",    legenda: "Nossa oficina" },
  ];

  const icoFoto = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="12.5" r="3.5"/></svg>';

  GALERIA.forEach((item) => {
    const fig = document.createElement("figure");
    fig.className = "gallery__slide";
    if (item.src) {
      fig.innerHTML = `<img src="${item.src}" alt="${item.legenda} — The Bergs" loading="lazy" />` +
                      `<figcaption>${item.legenda}</figcaption>`;
    } else {
      fig.classList.add("is-ph");
      fig.innerHTML = `<div class="gallery__ph">${icoFoto}<strong>${item.legenda}</strong><small>Foto em breve</small></div>`;
    }
    track.appendChild(fig);
  });

  const slides = Array.from(track.children);
  const centralizar = (s) => track.scrollTo({ left: s.offsetLeft - (track.clientWidth - s.offsetWidth) / 2, behavior: "smooth" });

  // dots
  slides.forEach((s, i) => {
    const b = document.createElement("button");
    b.setAttribute("aria-label", "Foto " + (i + 1));
    if (i === 0) b.classList.add("is-active");
    b.addEventListener("click", () => centralizar(s));
    dotsBox.appendChild(b);
  });
  const dots = Array.from(dotsBox.children);
  track.addEventListener("scroll", () => {
    const centro = track.scrollLeft + track.clientWidth / 2;
    let idx = 0, melhor = Infinity;
    slides.forEach((s, i) => {
      const c = s.offsetLeft + s.offsetWidth / 2, d = Math.abs(c - centro);
      if (d < melhor) { melhor = d; idx = i; }
    });
    dots.forEach((d, k) => d.classList.toggle("is-active", k === idx));
  }, { passive: true });

  // setas
  const passo = () => (slides[0] ? slides[0].offsetWidth : 320) + 18;
  const prev = document.getElementById("gal-prev");
  const next = document.getElementById("gal-next");
  if (prev) prev.addEventListener("click", () => track.scrollBy({ left: -passo(), behavior: "smooth" }));
  if (next) next.addEventListener("click", () => track.scrollBy({ left: passo(), behavior: "smooth" }));
})();

/* ---------------------------------------------------------------
   11) Ano automático no footer
   --------------------------------------------------------------- */
const ano = document.getElementById("year");
if (ano) ano.textContent = new Date().getFullYear();
