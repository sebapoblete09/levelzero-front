"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex flex-col bg-background text-foreground overflow-hidden">
      {/* Grid punteado de fondo */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,1)_2px,transparent_2px)] bg-[size:16px_16px]" />

      {/* Línea diagonal decorativa */}
      <div className="absolute top-0 right-0 w-px h-full bg-purple-DEFAULT/20 rotate-[15deg] origin-top-right translate-x-32 hidden lg:block" />

      {/* Acento de esquina superior izquierda */}
      <div className="absolute top-0 left-0 w-24 h-px bg-calypso-DEFAULT" />
      <div className="absolute top-0 left-0 w-px h-24 bg-calypso-DEFAULT" />

      {/* Acento de esquina inferior derecha */}
      <div className="absolute bottom-0 right-0 w-24 h-px bg-purple-DEFAULT" />
      <div className="absolute bottom-0 right-0 w-px h-24 bg-purple-DEFAULT" />

      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* ── COLUMNA IZQUIERDA ── */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
          {/* Badge "BETA" */}
          <div className="inline-flex items-center gap-2 border border-calypso-DEFAULT/40 px-3 py-1">
            <span className="w-1.5 h-1.5 bg-calypso-DEFAULT animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-calypso-DEFAULT">
              Sistema activo // Beta
            </span>
          </div>

          {/* Título principal */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter text-white uppercase leading-none">
            LEVEL
            <span className="text-calypso-DEFAULT">ZERO</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-muted-foreground font-mono max-w-md border-l-4 border-purple-DEFAULT pl-4 lg:pl-6 leading-relaxed">
            El mapa definitivo de tu viaje.{" "}
            <span className="text-white">Registra, evalúa y domina</span> tu
            biblioteca de juegos.
          </p>

          {/* Stats rápidas */}
          <div className="flex gap-8 pt-2">
            {[
              { value: "500K+", label: "Juegos" },
              { value: "IGDB", label: "Base de datos" },
              { value: "100%", label: "Gratis" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-black italic text-calypso-DEFAULT">
                  {stat.value}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
            <Link
              href="/games"
              className="relative h-14 px-8 bg-white text-black font-bold text-sm uppercase tracking-widest overflow-hidden group inline-flex items-center justify-center border-2 border-transparent hover:border-white transition-all"
            >
              <span className="relative z-10">Explorar Catálogo</span>
              <div className="absolute inset-0 h-full w-0 bg-calypso-DEFAULT transform skew-x-[-20deg] -ml-4 transition-all duration-300 group-hover:w-[120%]" />
            </Link>

            <Link
              href="/login"
              className="relative h-14 px-8 bg-black text-white font-bold text-sm uppercase tracking-widest border-2 border-purple-DEFAULT hover:border-calypso-DEFAULT hover:text-calypso-DEFAULT transition-all inline-flex items-center justify-center shadow-[4px_4px_0px_0px_var(--color-purple-DEFAULT)] hover:shadow-[4px_4px_0px_0px_var(--color-calypso-DEFAULT)]"
            >
              Crear Cuenta
            </Link>
          </div>
        </div>

        {/* ── COLUMNA DERECHA ── */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          {/* Mockup de la interfaz */}
          <div className="relative w-full max-w-lg">
            {/* Tarjeta principal */}
            <div className="relative bg-black border-2 border-purple-DEFAULT shadow-[12px_12px_0px_0px_var(--color-calypso-DEFAULT)] p-6 group transition-all duration-300 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[16px_16px_0px_0px_var(--color-calypso-DEFAULT)]">
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-calypso-DEFAULT" />

              {/* Header falso */}
              <div className="flex items-center justify-between mb-5 border-b border-purple-DEFAULT/30 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-widest text-calypso-DEFAULT">
                   Mi Biblioteca
                </span>
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-purple-DEFAULT" />
                  <span className="w-2 h-2 bg-calypso-DEFAULT" />
                </div>
              </div>

              {/* Juegos de ejemplo */}
              <div className="space-y-3">
                {[
                  {
                    name: "Persona 3 Reload",
                    status: "Jugando",
                    statusColor: "text-calypso-DEFAULT border-calypso-DEFAULT",
                    platform: "PS5",
                  },
                  {
                    name: "Elden Ring",
                    status: "Completado",
                    statusColor: "text-green-400 border-green-400",
                    platform: "PC",
                  },
                  {
                    name: "Baldur's Gate 3",
                    status: "Pendiente",
                    statusColor: "text-purple-400 border-purple-400",
                    platform: "PC",
                  },
                ].map((game) => (
                  <div
                    key={game.name}
                    className="flex items-center gap-3 p-3 border border-purple-DEFAULT/20 hover:border-calypso-DEFAULT/40 transition-colors group/item"
                  >
                    <div className="w-10 h-14 bg-purple-DEFAULT/20 border border-purple-DEFAULT/30 flex-shrink-0 flex items-center justify-center">
                      <span className="font-mono text-[8px] text-muted-foreground uppercase">
                        {game.platform}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm text-white uppercase tracking-tight truncate">
                        {game.name}
                      </p>
                      <span
                        className={`text-[9px] font-mono uppercase border px-1.5 py-0.5 ${game.statusColor}`}
                      >
                        {game.status}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`w-1.5 h-1.5 ${i < 4 ? "bg-calypso-DEFAULT" : "bg-purple-DEFAULT/30"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer falso */}
              <div className="mt-4 pt-4 border-t border-purple-DEFAULT/30 flex items-center justify-between">
                <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                  3 / 142 juegos
                </span>
                <span className="font-mono text-[9px] text-calypso-DEFAULT uppercase tracking-widest">
                  Ver todo →
                </span>
              </div>
            </div>

            {/* Tarjeta flotante de rating */}
            <div className="absolute -bottom-6 -left-6 bg-black border-2 border-calypso-DEFAULT p-3 shadow-[4px_4px_0px_0px_var(--color-purple-DEFAULT)] z-10">
              <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest mb-1">
                Rating promedio
              </p>
              <p className="font-black text-2xl italic text-calypso-DEFAULT">
                8.4
                <span className="text-sm text-muted-foreground font-normal">
                  /10
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-calypso-DEFAULT to-transparent" />
        </div>
      </div>
    </section>
  );
}
