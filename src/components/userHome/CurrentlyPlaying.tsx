"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUserGames } from "@/actions/user";
import { UserProfile } from "@/types/user";
import { GameLibrary } from "@/types/library";
import { libraryGameData } from "@/utils/game-helpers";
import GameCard from "../ui/game-card";

interface CurrentlyPlayingProps {
  user: UserProfile;
}

export default function CurrentlyPlaying({ user }: CurrentlyPlayingProps) {
  const { data: games, isLoading } = useQuery({
    queryKey: ["currentlyPlaying", user?.username],
    queryFn: () => getUserGames({ limit: 2, status: "playing" }),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className="bg-black border-2 border-purple-DEFAULT p-6 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-DEFAULT/10 blur-3xl -mr-10 -mt-10 pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-calypso-DEFAULT mb-1">
            En progreso
          </p>
          <h2 className="text-lg font-black italic uppercase tracking-tighter text-white">
            Jugando Ahora
          </h2>
        </div>
        <Link
          href="/library?status=playing"
          className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-calypso-DEFAULT transition-colors"
        >
          Ver todo →
        </Link>
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-purple-DEFAULT/10 border border-purple-DEFAULT/20 animate-pulse"
              />
            ))}
          </div>
        ) : games && games.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {games.map((game: GameLibrary) => (
              <GameCard key={game.igdb_id} game={libraryGameData(game)} />
            ))}
          </div>
        ) : (
          <div className="border border-purple-DEFAULT/20 p-8 text-center">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
              Sin actividad registrada
            </p>
            <p className="text-white font-bold text-sm mb-4">
              ¿Qué estás jugando ahora?
            </p>
            <Link
              href="/library"
              className="font-mono text-[10px] uppercase tracking-widest text-calypso-DEFAULT hover:underline"
            >
              Explorar catálogo →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
