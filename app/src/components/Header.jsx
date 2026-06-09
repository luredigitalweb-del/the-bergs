import { useEffect, useState } from 'react'
import { waProps } from '../lib/whatsapp.js'

const LINKS = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#redes', label: 'Redes' },
  { href: '#local', label: 'Contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`} id="header">
      <div className="container">
        <div className="navbar">
          <a href="#hero" className="navbar__logo" aria-label="The Bergs — início" onClick={() => setMenuOpen(false)}>
            <img src="/assets/logo.png" alt="The Bergs Centro Automotivo" width="150" height="48" />
          </a>

          <nav className="navbar__nav" aria-label="Navegação principal">
            {LINKS.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>

          <div className="navbar__actions">
            <a className="btn btn--wa navbar__cta" {...waProps('agendar')}>
              Orçamento<span className="navbar__cta-extra">&nbsp;grátis</span> <span aria-hidden="true">→</span>
            </a>
            <button
              className={`navbar__burger ${menuOpen ? 'is-open' : ''}`}
              aria-label="Abrir menu" aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>
          </div>

          {/* Menu mobile (abre com o hambúrguer) */}
          <div className={`navbar__mobile ${menuOpen ? 'is-open' : ''}`}>
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            ))}
            <a className="btn btn--wa" {...waProps('agendar')} onClick={() => setMenuOpen(false)}>
              <span className="ico-wa" aria-hidden="true" /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
