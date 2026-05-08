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

      {/* Contenedor Principal: Todo centrado */}
      <div className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-32 flex flex-col justify-center items-center text-center gap-8">
        {/* Badge "BETA" */}
        <div className="inline-flex items-center gap-2 border border-calypso-DEFAULT/40 px-3 py-1">
          <span className="w-1.5 h-1.5 bg-calypso-DEFAULT animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-calypso-DEFAULT">
            Sistema activo // Beta
          </span>
        </div>

        {/* Título principal */}
        <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black italic tracking-tighter text-white uppercase leading-none">
          LEVEL<span className="text-calypso-DEFAULT">ZERO</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-mono max-w-2xl leading-relaxed">
          El mapa definitivo de tu viaje.{" "}
          <span className="text-white">Registra, evalúa y domina</span> tu
          biblioteca de juegos.
        </p>

        {/* Stats rápidas */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 pt-4">
          {[
            { value: "500K+", label: "Juegos" },
            { value: "IGDB", label: "Base de datos" },
            { value: "100%", label: "Gratis" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
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
        <div className="pt-4">
          <Link
            href="#Features"
            className="relative scroll-smooth h-14 px-10 bg-black text-white font-bold text-sm uppercase tracking-widest border-2 border-purple-DEFAULT hover:border-calypso-DEFAULT hover:text-calypso-DEFAULT transition-all inline-flex items-center justify-center shadow-[4px_4px_0px_0px_var(--color-purple-DEFAULT)] hover:shadow-[4px_4px_0px_0px_var(--color-calypso-DEFAULT)]"
          >
            Ver funcionalidades
          </Link>
        </div>
      </div>

      {/* Scroll indicator - Empujado al final con mt-auto */}
      <div className="relative z-10 flex justify-center pb-8 mt-auto">
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
