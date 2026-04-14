// app/(main)/profile/page.tsx
"use client";

import { useUser } from "@/providers/UserContext"; // Importa tu contexto
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

  // Protección de ruta: Si no hay usuario en el contexto, al login
  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  // Obtenemos los favoritos usando TanStack Query
  const { data: favorites, isLoading } = useQuery({
    // La 'queryKey' es única. Así, si navega a otro lado y vuelve, carga de la caché.
    queryKey: ["userGames", user?.username],
    queryFn: () => getUserGames(),
    // IMPORTANTE: enabled asegura que no intente buscar en la DB si el usuario aún no carga
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // Caché de 5 minutos
  });

  // Mientras carga el contexto del usuario (evita pantallazos raros)
  if (!user) return null;

  return (
    <main className="container mx-auto p-4 sm:p-8 min-h-screen">
      {/* SECCIÓN 1: Cabecera del Perfil (Instantánea gracias a tu Contexto) */}
      <ProfileHeader userData={user} />

      {/* SECCIÓN 2: Juegos Favoritos */}
      <div>
        <h2 className="text-2xl font-bold uppercase text-white mb-6 border-l-4 border-calypso-DEFAULT pl-3">
          Mis Favoritos
        </h2>

        {isLoading ? (
          <div className="text-calypso-DEFAULT font-mono animate-pulse uppercase">
            Cargando base de datos personal...
          </div>
        ) : favorites && favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {favorites.map((game: GameLibrary) => (
              // Limpieza de URL de IGDB igual que antes
              <GameCard key={game.igdb_id} game={libraryGameData(game)} />
            ))}
          </div>
        ) : (
          <div className="bg-purple-900/10 border border-purple-900 p-8 text-center border-dashed">
            <p className="text-muted-foreground font-mono">
              Aún no tienes juegos en tu biblioteca principal.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
