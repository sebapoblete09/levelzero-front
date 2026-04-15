// app/(main)/games/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getGamesByName } from "@/actions/games";
import GameCard from "@/components/ui/game-card";
import { igdbGameData } from "@/utils/game-helpers";

export default function GamesResultsPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gamesSearch", q],
    queryFn: () => getGamesByName(q),
    enabled: q.length >= 2,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading)
    return (
      <div className="p-10 text-center animate-pulse font-mono uppercase">
        Sincronizando con la base de datos...
      </div>
    );

  if (isError)
    return (
      <div className="p-10 text-red-500 text-center">
        Error al recuperar datos del sistema.
      </div>
    );

  return (
    <main className="container mx-auto p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-black italic uppercase mb-8 border-l-4 border-calypso-DEFAULT pl-4">
        Resultados para: <span className="text-calypso-DEFAULT">{q}</span>
        <span className="text-muted-foreground text-lg ml-2 font-mono">
          [{data?.count || 0}]
        </span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6 justify-center">
        {data?.results.map((game) => (
          <GameCard key={game.id} game={igdbGameData(game)} />
        ))}
      </div>

      {data?.results.length === 0 && (
        <p className="text-muted-foreground font-mono mt-8">
          No se encontraron registros para esta búsqueda.
        </p>
      )}
    </main>
  );
}
