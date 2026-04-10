// app/(main)/profile/page.tsx
"use client";

import { UserGames } from "@/types/games";
import { userProfile } from "@/hooks/user-profile";
import ProfileHeader from "@/components/profile/profileHeader";
import GameCard from "@/components/ui/game-library-card";

export default function ProfilePage() {
  
 const {user,games,isLoading} = userProfile();

  // Mientras carga el contexto del usuario (evita pantallazos raros)
  if (isLoading || !user) {
    return <div className="p-10 text-white font-mono">Cargando perfil...</div>;
  }

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
        ) : games && games.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            
            {games.map((game:UserGames) => {
              return <GameCard key={game.igdb_id} game={game} />       
            })}
            
          </div>
        ) : (
          <div className="bg-purple-900/10 border border-purple-900 p-8 text-center border-dashed">
            <p className="text-muted-foreground font-mono">Aún no tienes juegos en tu biblioteca principal.</p>
          </div>
        )}
      </div>

    </main>
  );
}