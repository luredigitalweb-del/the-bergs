/* ===============================================================
   CONFIG CENTRAL — WhatsApp, mensagens e rastreamento
   ⚙️ EDITE AQUI o número e as mensagens por contexto/serviço.
   =============================================================== */

/* Número (somente dígitos, com DDI 55) */
export const WHATSAPP = "558585238451";

/* Mensagens pré-preenchidas por contexto (chave -> texto) */
export const MENSAGENS = {
  hero:          "Olá! Vim pelo site e quero agendar a busca do meu carro.",
  agendar:       "Olá! Vim pelo site e quero agendar a busca do meu carro com orçamento por vídeo.",
  flutuante:     "Olá! Vim pelo site da The Bergs e quero falar com a equipe.",
  outro:         "Olá! Vim pelo site e preciso de um serviço pro meu carro. Pode me ajudar?",
  revisao:       "Olá! Vim pelo site e tenho interesse em uma revisão geral.",
  diesel:        "Olá! Vim pelo site e tenho interesse no serviço da linha diesel.",
  cambio:        "Olá! Vim pelo site e quero trocar o óleo do câmbio automático.",
  embreagem:     "Olá! Vim pelo site e tenho interesse no serviço de embreagem.",
  motor:         "Olá! Vim pelo site e preciso de um serviço no motor do meu carro.",
  alinhamento:   "Olá! Vim pelo site e quero fazer alinhamento.",
  balanceamento: "Olá! Vim pelo site e quero fazer balanceamento.",
  oleo:          "Olá! Vim pelo site e quero fazer troca de óleo.",
};

/* Monta o link wa.me com a mensagem codificada */
export function waHref(chave) {
  const msg = MENSAGENS[chave] || MENSAGENS.hero;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

/* Dispara o evento de conversão (Meta Pixel + gtag, se existirem) */
export function dispararConversao(chave) {
  try {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Lead", { content_name: chave });
      window.fbq("track", "Contact", { content_name: chave });
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", { method: "whatsapp", context: chave });
    }
  } catch (e) { /* nunca bloquear o clique */ }
}

/* Props prontas para um <a> de WhatsApp (href + abrir nova aba + rastrear) */
export function waProps(chave) {
  return {
    href: waHref(chave),
    target: "_blank",
    rel: "noopener",
    onClick: () => dispararConversao(chave),
  };
}
