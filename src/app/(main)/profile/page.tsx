// app/(main)/profile/page.tsx
"use client";

import { useUser } from "@/providers/UserContext"; // Importa tu contexto
import { useQuery } from "@tanstack/react-query";
import { getUserGames} from "@/actions/user";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { UserGames } from "@/types/games";

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
      <div className="bg-black border-2 border-purple-900 p-6 mb-8 shadow-[8px_8px_0px_0px_var(--color-calypso-DEFAULT)] flex items-center gap-6">
        {/* Avatar grande (opcional) */}
        <div className="w-20 h-20 bg-purple-900 rounded-full flex items-center justify-center border-2 border-calypso-DEFAULT text-white font-black text-3xl">
          {user.display_name?.charAt(0).toUpperCase() || "U"}
        </div>
        
        <div>
          <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter">
            {user.display_name}
          </h1>
          <p className="text-calypso-DEFAULT font-mono font-bold">
            {user.username}
          </p>
        </div>
      </div>

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
            
            {favorites.map((game:UserGames) => {
              // Limpieza de URL de IGDB igual que antes
              let imageUrl = "/placeholder.png"; 
              if (game.cover) {
                imageUrl = `https:${game.cover.replace('t_thumb', 't_cover_big')}`;
              }

              return (
                <div key={game.id} className="relative aspect-[3/4] border-2 border-purple-900 group overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                  <Image 
                    src={imageUrl}
                    alt={game.game_title}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay con el nombre al pasar el mouse (opcional) */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                     <span className="text-white font-bold text-xs uppercase truncate w-full block">
                       {game.game_title}
                     </span>
                  </div>
                </div>
              );
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