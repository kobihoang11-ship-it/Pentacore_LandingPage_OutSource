import { useState } from 'react'
import { HEADER } from '../config/content'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const hasNav = HEADER.navLinks?.length > 0

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[20px] bg-black/10">
      <div className="max-w-[1760px] mx-auto flex items-center justify-between px-5 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img
            src={HEADER.logo.src}
            alt={HEADER.logo.alt}
            className="h-7 sm:h-9 w-auto"
          />
        </a>

        {/* Desktop nav */}
        {hasNav && (
          <nav className="hidden md:flex items-center gap-8">
            {HEADER.navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-inter text-sm text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}

        {/* Mobile hamburger (only when nav links exist) */}
        {hasNav && (
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        )}
      </div>

      {/* Mobile drawer */}
      {hasNav && menuOpen && (
        <nav className="md:hidden bg-black/90 backdrop-blur-xl border-t border-brand-border">
          {HEADER.navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-5 py-4 font-inter text-white/80 hover:text-white border-b border-brand-border/50 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
