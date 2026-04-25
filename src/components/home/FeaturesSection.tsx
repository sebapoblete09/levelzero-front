// src/components/home/FeaturesSection.tsx
// NO necesita 'use client' - es puramente estático

const FEATURES_ACTIVE = [
  {
    icon: "◈",
    title: "Biblioteca Personal",
    description:
      "Agrega cualquier juego desde la base de datos IGDB. Organiza tu colección completa en un solo lugar.",
    tag: "Disponible",
  },
  {
    icon: "◉",
    title: "Estados de Juego",
    description:
      "Jugando, Completado, Pendiente, En Pausa, Abandonado. Lleva el control exacto de dónde estás.",
    tag: "Disponible",
  },
  {
    icon: "◇",
    title: "Sistema de Rating",
    description:
      "Puntúa cada juego del 1 al 10. Tu escala personal, sin algoritmos externos que distorsionen tu criterio.",
    tag: "Disponible",
  },
  {
    icon: "▣",
    title: "Propiedad del Juego",
    description:
      "Marca si tienes el juego de forma física, digital o si simplemente está en tu wishlist.",
    tag: "Disponible",
  },
];

const FEATURES_SOON = [
  {
    icon: "◌",
    title: "Estadísticas",
    description:
      "Horas jugadas, géneros favoritos, plataformas dominantes. Visualiza tus patrones de juego.",
    tag: "Próximamente",
  },
  {
    icon: "◎",
    title: "Recomendaciones IA",
    description:
      "Motor de recomendaciones basado en tu historial y ratings para descubrir tu próximo juego favorito.",
    tag: "Próximamente",
  },
  {
    icon: "◫",
    title: "Perfiles Sociales",
    description:
      "Comparte tu biblioteca, compara colecciones con amigos y descubre qué están jugando.",
    tag: "Próximamente",
  },
  {
    icon: "◬",
    title: "Listas Personalizadas",
    description:
      'Crea listas temáticas: "JRPGs épicos", "Para jugar en pareja", lo que quieras.',
    tag: "Próximamente",
  },
];

export default function FeaturesSection() {
  return (
    <section className="relative bg-background py-24 lg:py-32 overflow-hidden">
      {/* Fondo punteado */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,1)_2px,transparent_2px)] bg-[size:16px_16px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de sección */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-calypso-DEFAULT mb-3">
               02 · Funcionalidades
            </p>
            <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-white leading-none">
              Todo lo que
              <br />
              <span className="text-calypso-DEFAULT">necesitas.</span>
            </h2>
          </div>
          <p className="text-muted-foreground font-mono text-sm max-w-sm lg:text-right leading-relaxed">
            Herramientas construidas para gamers reales. Sin fluff, sin
            subscripciones forzadas.
          </p>
        </div>

        {/* ── FEATURES ACTIVAS ── */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 border border-calypso-DEFAULT px-3 py-1 mb-8">
            <span className="w-1.5 h-1.5 bg-calypso-DEFAULT" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-calypso-DEFAULT">
              Operativas ahora
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-purple-DEFAULT/20">
            {FEATURES_ACTIVE.map((feature, index) => (
              <div
                key={feature.title}
                className="relative bg-black p-6 group hover:bg-purple-DEFAULT/5 transition-colors border border-transparent hover:border-calypso-DEFAULT/30"
              >
                {/* Número de índice */}
                <span className="absolute top-3 right-3 font-mono text-[9px] text-muted-foreground/40 uppercase">
                  0{index + 1}
                </span>

                {/* Icono */}
                <div className="text-3xl text-calypso-DEFAULT mb-4 font-mono leading-none">
                  {feature.icon}
                </div>

                <h3 className="font-bold uppercase text-white text-sm tracking-tight mb-2">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground text-xs font-mono leading-relaxed">
                  {feature.description}
                </p>

                {/* Indicador activo */}
                <div className="mt-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-calypso-DEFAULT" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-calypso-DEFAULT">
                    {feature.tag}
                  </span>
                </div>

                {/* Borde izquierdo en hover */}
                <div className="absolute left-0 top-0 bottom-0 w-0 bg-calypso-DEFAULT transition-all duration-200 group-hover:w-0.5" />
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURES PRÓXIMAS ── */}
        <div>
          <div className="inline-flex items-center gap-2 border border-purple-DEFAULT/50 px-3 py-1 mb-8">
            <span className="w-1.5 h-1.5 bg-purple-DEFAULT animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple-glow">
              En desarrollo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-purple-DEFAULT/10">
            {FEATURES_SOON.map((feature, index) => (
              <div
                key={feature.title}
                className="relative bg-black/60 p-6 opacity-70 border border-transparent"
              >
                {/* Número de índice */}
                <span className="absolute top-3 right-3 font-mono text-[9px] text-muted-foreground/30 uppercase">
                  0{index + 5}
                </span>

                {/* Icono */}
                <div className="text-3xl text-purple-DEFAULT/60 mb-4 font-mono leading-none">
                  {feature.icon}
                </div>

                <h3 className="font-bold uppercase text-white/60 text-sm tracking-tight mb-2">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground/60 text-xs font-mono leading-relaxed">
                  {feature.description}
                </p>

                <div className="mt-4 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-purple-DEFAULT/50 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-purple-glow/70">
                    {feature.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
