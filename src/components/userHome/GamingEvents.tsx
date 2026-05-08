// src/components/home/GamingEvents.tsx

const PLACEHOLDER_EVENTS = [
  {
    id: 1,
    name: "Summer Game Fest",
    date: "06 Jun 2025",
    days: 12,
    type: "Show",
  },
  {
    id: 2,
    name: "Xbox Games Showcase",
    date: "09 Jun 2025",
    days: 15,
    type: "Show",
  },
  { id: 3, name: "Gamescom", date: "20 Ago 2025", days: 87, type: "Evento" },
  {
    id: 4,
    name: "The Game Awards",
    date: "Dic 2025",
    days: 210,
    type: "Premios",
  },
];

export default function GamingEvents() {
  return (
    <section className="bg-black border-2 border-purple-DEFAULT p-6 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-DEFAULT/10 blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="mb-6 relative z-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-calypso-DEFAULT mb-1">
          Agenda
        </p>
        <h2 className="text-lg font-black italic uppercase tracking-tighter text-white">
          Eventos Gaming
        </h2>
      </div>

      {/* Lista de eventos */}
      <div className="relative z-10 space-y-3">
        {PLACEHOLDER_EVENTS.map((event) => (
          <div
            key={event.id}
            className="flex items-center justify-between gap-3 p-3 border border-purple-DEFAULT/20 hover:border-calypso-DEFAULT/30 transition-colors group"
          >
            <div className="flex-1 min-w-0">
              {/* Type badge */}
              <span className="font-mono text-[8px] uppercase tracking-widest text-purple-glow border border-purple-DEFAULT/30 px-1.5 py-0.5 mb-1 inline-block">
                {event.type}
              </span>
              <p className="font-bold text-xs text-white uppercase tracking-tight truncate group-hover:text-calypso-DEFAULT transition-colors">
                {event.name}
              </p>
              <p className="font-mono text-[9px] text-muted-foreground mt-0.5">
                {event.date}
              </p>
            </div>

            {/* Días restantes */}
            <div className="flex flex-col items-center flex-shrink-0 border border-calypso-DEFAULT/30 px-2 py-1 min-w-[48px]">
              <span className="font-black italic text-lg text-calypso-DEFAULT leading-none">
                {event.days}
              </span>
              <span className="font-mono text-[7px] uppercase tracking-wider text-muted-foreground">
                días
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-purple-DEFAULT/20 relative z-10">
        <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 text-center">
          Datos placeholder · Supabase en desarrollo
        </p>
      </div>
    </section>
  );
}
