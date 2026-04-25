// src/components/home/PricingSection.tsx
import Link from "next/link";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "Para siempre",
    description: "Todo lo que necesitas para empezar a mapear tu viaje gaming.",
    cta: "Empezar Gratis",
    ctaHref: "/login",
    accent: "border-purple-DEFAULT",
    shadow: "shadow-[8px_8px_0px_0px_var(--color-purple-DEFAULT)]",
    shadowHover: "hover:shadow-[12px_12px_0px_0px_var(--color-purple-DEFAULT)]",
    featured: false,
    features: [
      { text: "Biblioteca ilimitada de juegos", available: true },
      { text: "Estados de juego (5 tipos)", available: true },
      { text: "Rating personal (1-10)", available: true },
      { text: "Registro de propiedad", available: true },
      { text: "Búsqueda en catálogo IGDB", available: true },
      { text: "Perfil público", available: true },
      { text: "Estadísticas avanzadas", available: false },
      { text: "Recomendaciones IA", available: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$4.99",
    period: "por mes",
    description: "Para el gamer que quiere el control total de su experiencia.",
    cta: "Próximamente",
    ctaHref: "#",
    accent: "border-calypso-DEFAULT",
    shadow: "shadow-[8px_8px_0px_0px_var(--color-calypso-DEFAULT)]",
    shadowHover:
      "hover:shadow-[12px_12px_0px_0px_var(--color-calypso-DEFAULT)]",
    featured: true,
    features: [
      { text: "Todo lo del plan Free", available: true },
      { text: "Estadísticas avanzadas", available: true },
      { text: "Recomendaciones IA personalizadas", available: true },
      { text: "Listas personalizadas ilimitadas", available: true },
      { text: "Exportar biblioteca (CSV/JSON)", available: true },
      { text: "Perfil social con seguidores", available: true },
      { text: "Sin anuncios (nunca los habrá)", available: true },
      { text: "Soporte prioritario", available: true },
    ],
  },
];

export default function PricingSection() {
  return (
    <section className="relative bg-background py-24 lg:py-32 overflow-hidden">
      {/* Fondo punteado */}
      <div className="absolute inset-0 opacity-[0.025] pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,1)_2px,transparent_2px)] bg-[size:16px_16px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-calypso-DEFAULT mb-3">
            04 · Planes
          </p>
          <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-white leading-none mb-4">
            Simple y <span className="text-calypso-DEFAULT">transparente.</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm max-w-md mx-auto leading-relaxed">
            Sin sorpresas. Sin bloquear funciones esenciales detrás de un
            paywall. El plan Free es para siempre.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-black border-2 ${plan.accent} p-8 ${plan.shadow} transition-all duration-300 ${plan.shadowHover} hover:-translate-y-1 hover:-translate-x-1`}
            >
              {/* Esquina decorativa */}
              {plan.featured && (
                <>
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-calypso-DEFAULT" />
                  <div className="absolute -top-3 right-8 bg-calypso-DEFAULT px-3 py-0.5">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-black font-bold">
                      Próximamente
                    </span>
                  </div>
                </>
              )}

              {/* Plan header */}
              <div className="mb-6 pb-6 border-b border-purple-DEFAULT/30">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-black italic text-2xl text-white uppercase tracking-tighter">
                    {plan.name}
                  </h3>
                  {plan.featured && (
                    <span className="font-mono text-[9px] uppercase tracking-widest text-calypso-DEFAULT border border-calypso-DEFAULT/40 px-2 py-0.5">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-black italic text-4xl text-calypso-DEFAULT">
                    {plan.price}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    {plan.period}
                  </span>
                </div>
                <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Features list */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-center gap-3">
                    {feature.available ? (
                      <span className="w-4 h-4 border border-calypso-DEFAULT flex items-center justify-center flex-shrink-0">
                        <span className="w-1.5 h-1.5 bg-calypso-DEFAULT" />
                      </span>
                    ) : (
                      <span className="w-4 h-4 border border-purple-DEFAULT/30 flex-shrink-0" />
                    )}
                    <span
                      className={`font-mono text-xs uppercase tracking-wide ${
                        feature.available
                          ? "text-white"
                          : "text-muted-foreground/40"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.ctaHref}
                className={`relative w-full h-12 font-bold text-xs uppercase tracking-widest overflow-hidden group inline-flex items-center justify-center border-2 transition-all ${
                  plan.featured
                    ? "bg-calypso-DEFAULT text-black border-calypso-DEFAULT hover:bg-white hover:border-white"
                    : "bg-white text-black border-white hover:bg-calypso-DEFAULT hover:border-calypso-DEFAULT"
                }`}
              >
                <span className="relative z-10">{plan.cta}</span>
              </Link>
            </div>
          ))}
        </div>

        {/* Nota al pie */}
        <p className="text-center font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest mt-12">
          * Los precios del plan Pro son estimados y pueden cambiar antes del
          lanzamiento oficial.
        </p>
      </div>
    </section>
  );
}
