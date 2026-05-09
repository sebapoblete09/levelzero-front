"use client";

import Link from "next/link";
import { useUser } from "@/providers/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getUserGames } from "@/actions/user";
import { GameLibrary } from "@/types/library";
import { libraryGameData } from "@/utils/game-helpers";
import GameCard from "../ui/game-card";

interface UserGamesGridProps {
  username?: string;
}

export function UserGamesGrid({ username }: UserGamesGridProps) {
  const { user } = useUser();
  const queryUsername = username || user?.username;

  const { data: favorites, isLoading } = useQuery({
    queryKey: ["userGames", queryUsername],
    queryFn: () => getUserGames({ limit: 5 }),
    enabled: !!queryUsername,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="text-calypso-DEFAULT font-mono animate-pulse uppercase">
        Cargando tus juegos...
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div className="rounded-4xl border border-purple-900/50 bg-black/40 p-8 text-center">
        <p className="text-white font-bold text-lg mb-3">
          Nada pendiente por completar
        </p>
        <p className="text-muted-foreground">
          Acá aparecerán tus últimos juegos agregados
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 justify-center">
      {favorites.map((game: GameLibrary) => (
        <GameCard key={game.igdb_id} game={libraryGameData(game)} />
      ))}
    </div>
  );
}

export function UserGamesSection() {
  return (
    <section className="mb-10 mt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6 px-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tighter mt-3">
            Últimos juegos agregados
          </h2>
        </div>
        <Link
          href="/library"
          className="inline-flex items-center justify-center w-auto rounded-lg border-2 border-calypso-DEFAULT bg-calypso-DEFAULT px-4 py-2 text-xs font-bold uppercase text-black transition-all hover:bg-transparent hover:text-calypso-DEFAULT ml-auto"
        >
          Ir a la biblioteca
        </Link>
      </div>
      <UserGamesGrid />
    </section>
  );
}
