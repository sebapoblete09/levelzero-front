// src/components/home/UpcomingReleases.tsx

const PLACEHOLDER_GAMES = [
  { id: 1, name: "Death Stranding 2", platform: "PS5", date: "26 Jun 2025" },
  { id: 2, name: "Metroid Prime 4", platform: "Switch 2", date: "Q3 2025" },
  { id: 3, name: "Ghost of Yotei", platform: "PS5", date: "Q4 2025" },
  { id: 4, name: "Fable", platform: "Xbox / PC", date: "2025" },
];

export default function UpcomingReleases() {
  return (
    <section className="bg-black border-2 border-purple-DEFAULT p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-calypso-DEFAULT/5 blur-3xl -mr-10 -mt-10 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-calypso-DEFAULT mb-1">
            Próximamente
          </p>
          <h2 className="text-lg font-black italic uppercase tracking-tighter text-white">
            Próximos Lanzamientos
          </h2>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 border border-purple-DEFAULT/20 px-2 py-1">
          Via IGDB
        </span>
      </div>

      {/* Lista */}
      <div className="relative z-10 space-y-px">
        {PLACEHOLDER_GAMES.map((game, index) => (
          <div
            key={game.id}
            className="flex items-center gap-4 p-3 border border-transparent hover:border-calypso-DEFAULT/20 hover:bg-purple-DEFAULT/5 transition-all group"
          >
            {/* Número */}
            <span className="font-mono text-[10px] text-muted-foreground/40 w-4 flex-shrink-0">
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Cover placeholder */}
            <div className="w-8 h-11 bg-purple-DEFAULT/20 border border-purple-DEFAULT/30 flex-shrink-0 animate-pulse" />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-white uppercase tracking-tight truncate group-hover:text-calypso-DEFAULT transition-colors">
                {game.name}
              </p>
              <span className="font-mono text-[9px] text-muted-foreground uppercase">
                {game.platform}
              </span>
            </div>

            {/* Fecha */}
            <span className="font-mono text-[10px] text-calypso-DEFAULT uppercase tracking-wider flex-shrink-0">
              {game.date}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-purple-DEFAULT/20 relative z-10">
        <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 text-center">
          Datos placeholder · IGDB en desarrollo
        </p>
      </div>
    </section>
  );
}
