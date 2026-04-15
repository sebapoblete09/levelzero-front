// app/(main)/profile/page.tsx
"use client";

import { useUser } from "@/providers/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getUserGames } from "@/actions/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileHeader from "@/components/profile/profileHeader";
import GameCard from "@/components/ui/game-card";
import { GameLibrary } from "@/types/library";
import { libraryGameData } from "@/utils/game-helpers";

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  const { data: favorites, isLoading } = useQuery({
    queryKey: ["userGames", user?.username],
    queryFn: () => getUserGames(),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  if (!user) return null;

  return (
    <main className="container mx-auto p-4 sm:p-12 min-h-screen">
      <ProfileHeader userData={user} />

      <section className="mb-10 mt-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6 px-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tighter mt-3">
              Últimos agregados sin completar
            </h2>
          </div>
          <p className="max-w-xl text-sm text-gray-400">
            Estos son los juegos que tienes en tu lista y todavía no están
            marcados como completados.
          </p>
        </div>

        {isLoading ? (
          <div className="text-calypso-DEFAULT font-mono animate-pulse uppercase">
            Cargando tus juegos...
          </div>
        ) : favorites && favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 justify-center">
            {favorites.map((game: GameLibrary) => (
              <GameCard key={game.igdb_id} game={libraryGameData(game)} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-purple-900/50 bg-black/40 p-8 text-center">
            <p className="text-white font-bold text-lg mb-3">
              Nada pendiente por completar
            </p>
            <p className="text-muted-foreground">
              Cuando añadas juegos a tu biblioteca, aparecerán aquí los que aún
              no terminaste.
            </p>
          </div>
        )}
      </section>

      <section className="rounded-[2rem] border border-purple-900/50 bg-black/40 p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-calypso-DEFAULT">
              Mis reseñas
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tighter mt-3">
              Aún no hay reseñas
            </h2>
          </div>
        </div>
        <div className="mt-8 rounded-3xl border border-purple-900/30 bg-zinc-950/80 p-8 text-center">
          <p className="text-gray-400">
            No hay reseñas disponibles por el momento.
          </p>
        </div>
      </section>
    </main>
  );
}
