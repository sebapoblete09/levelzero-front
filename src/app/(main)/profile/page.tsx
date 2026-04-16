// app/(main)/profile/page.tsx
"use client";

import { useUser } from "@/providers/UserContext";
import { useQuery } from "@tanstack/react-query";
import { getUserGames } from "@/actions/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileHeader from "@/components/profile/profileHeader";
import EditProfileModal from "@/components/profile/EditProfileModal";
import GameCard from "@/components/ui/game-card";
import { GameLibrary } from "@/types/library";
import { libraryGameData } from "@/utils/game-helpers";
import Link from "next/link";

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  const { data: favorites, isLoading } = useQuery({
    queryKey: ["userGames", user?.username],
    queryFn: () => getUserGames({ limit: 5 }),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  if (!user) return null;

  return (
    <main className="container mx-auto p-4 sm:p-12 min-h-screen">
      <ProfileHeader
        userData={user}
        onEditClick={() => setIsEditModalOpen(true)}
      />

      <EditProfileModal
        userData={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

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
              Aca Aapareceran tus ultimos juegos agregados
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
