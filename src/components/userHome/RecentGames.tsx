import Link from "next/link";
// import GameCard from "@/components/ui/game-card"; // Tu componente de tarjeta

export default function RecentGames() {
  // Aquí luego harás el fetch a tu API: GET /library/me?limit=3

  return (
    <section>
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">
            Actividad Reciente
          </h2>
          <p className="text-xs font-mono text-gray-500 uppercase">
            Tus últimas adiciones
          </p>
        </div>
        <Link
          href="/library"
          className="text-xs font-bold text-calypso-DEFAULT hover:text-white uppercase tracking-widest transition-colors"
        >
          Ver todo +
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* MOCKUP: Aquí iterarás tu componente GameCard */}
        <div className="aspect-[3/4] border-2 border-purple-900/30 rounded-xl bg-zinc-900 flex items-center justify-center text-gray-600 font-mono text-xs text-center p-4">
          [Game Card 1]
        </div>
        <div className="aspect-[3/4] border-2 border-purple-900/30 rounded-xl bg-zinc-900 flex items-center justify-center text-gray-600 font-mono text-xs text-center p-4">
          [Game Card 2]
        </div>
        <div className="aspect-[3/4] border-2 border-purple-900/30 rounded-xl bg-zinc-900 flex items-center justify-center text-gray-600 font-mono text-xs text-center p-4">
          [Game Card 3]
        </div>
      </div>
    </section>
  );
}
