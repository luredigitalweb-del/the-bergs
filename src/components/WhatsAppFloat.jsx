import { waProps } from '../lib/whatsapp.js'

export default function WhatsAppFloat() {
  return (
    <a className="wa-float" {...waProps('flutuante')} aria-label="Falar no WhatsApp">
      <span className="ico-wa ico-wa--lg" aria-hidden="true" />
      <span className="wa-float__txt">Agendar agora</span>
    </a>
  )
}
