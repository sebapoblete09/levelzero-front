// src/components/layout/Footer.tsx
import Link from "next/link";

const SOCIAL_LINKS = [
  {
    name: "TikTok",
    href: "https://tiktok.com/@levelzeroapp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
    available: true,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/levelzeroapp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
    available: false, // Próximamente
  },
  {
    name: "X",
    href: "https://x.com/levelzeroapp",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    available: false, // Próximamente
  },
];

const LEGAL_LINKS = [
  { name: "Política de Privacidad", href: "/privacy" },
  { name: "Términos de Uso", href: "/terms" },
  { name: "Cookies", href: "/cookies" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t-2 border-purple-DEFAULT/40 overflow-hidden">
      {/* Fondo punteado */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,1)_2px,transparent_2px)] bg-[size:16px_16px]" />

      {/* Línea de acento superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-calypso-DEFAULT/50 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          {/* IZQUIERDA: Logo + tagline */}
          <div className="flex flex-col gap-3">
            <span className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">
              LEVEL<span className="text-calypso-DEFAULT">ZERO</span>
            </span>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground max-w-xs leading-relaxed">
              Map Your Gaming Journey.{" "}
              <span className="text-calypso-DEFAULT">Powered by IGDB.</span>
            </p>
          </div>

          {/* CENTRO: Redes sociales */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60">
              Síguenos
            </p>
            <div className="flex items-center gap-2">
              {SOCIAL_LINKS.map((social) => (
                <div key={social.name} className="relative group">
                  {social.available ? (
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="flex items-center justify-center w-9 h-9 border-2 border-purple-DEFAULT/40 text-muted-foreground hover:border-calypso-DEFAULT hover:text-calypso-DEFAULT transition-all hover:shadow-[3px_3px_0px_0px_var(--color-calypso-DEFAULT)]"
                    >
                      {social.icon}
                    </Link>
                  ) : (
                    <div
                      aria-label={`${social.name} - Próximamente`}
                      className="flex items-center justify-center w-9 h-9 border-2 border-purple-DEFAULT/20 text-muted-foreground/30 cursor-not-allowed relative"
                    >
                      {social.icon}
                      {/* Tooltip "Próximamente" */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-purple-DEFAULT/40 px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                        <span className="font-mono text-[8px] uppercase tracking-wider text-purple-glow">
                          Pronto
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* DERECHA: Links legales */}
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground/60">
              Legal
            </p>
            <ul className="flex flex-col gap-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground hover:text-calypso-DEFAULT transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 pt-6 border-t border-purple-DEFAULT/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40">
            © {currentYear} LevelZero · Todos los derechos reservados
          </p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40">
            Datos de juegos:{" "}
            <span className="text-calypso-DEFAULT/60">IGDB · Twitch</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
