// IMPORTANTE: Quitamos el "use client" de la primera línea.
// Ahora esto corre en el servidor de Next.js antes de llegar al navegador.

import React from "react";
import { getGameById } from "@/actions/games";
import Image from "next/image";
import { Game } from "@/types/games";

// En un Server Component, Next.js nos pasa los 'params' (como el ID de la URL) automáticamente
export default async function GameDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // 1. Extraemos el ID de los parámetros y lo convertimos a número
  const gameId = parseInt(params.id, 10);

  // 2. Si alguien escribe texto en lugar de un número en la URL (/game/hola), lo atajamos
  if (isNaN(gameId)) {
    return <div className="p-10 text-center text-red-500 font-mono">ID de juego inválido.</div>;
  }

  // 3. Hacemos el Fetch directamente aquí. ¡Sin useEffect, sin useState!
  const game: Game | null = await getGameById(gameId);

  // 4. Si la base de datos no lo encuentra (devuelve null)
  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="border-2 border-red-500 p-8 shadow-[8px_8px_0px_0px_rgba(239,68,68,0.5)]">
          <h1 className="text-2xl font-black italic text-red-500 uppercase">Juego no encontrado</h1>
          <p className="text-muted-foreground font-mono mt-2">El registro #{gameId} no existe en la base de datos.</p>
        </div>
      </div>
    );
  }

  // 5. Arreglamos la URL de la imagen de IGDB (igual que hicimos en los resultados)
  let imageUrl = "/placeholder.png";
  if (game.cover && game.cover.url) {
    imageUrl = `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`;
  }

  // 6. ¡Renderizamos el juego!
  return (
    <main className="container mx-auto p-4 sm:p-8 min-h-screen">
      <div className="bg-black border-2 border-purple-900 p-6 sm:p-10 shadow-[12px_12px_0px_0px_var(--color-calypso-DEFAULT)]">
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Columna Izquierda: Portada */}
          <div className="w-full md:w-1/3 shrink-0">
            <div className="relative aspect-[3/4] w-full border-4 border-purple-900 overflow-hidden group">
              <Image 
                src={imageUrl} 
                alt={`Portada de ${game.name}`}
                fill 
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority // <-- Esto le dice a Next.js que cargue esta imagen lo más rápido posible
              />
            </div>
          </div>

          {/* Columna Derecha: Información */}
          <div className="w-full md:w-2/3 flex flex-col justify-start">
            <h1 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter text-white mb-4 border-b-2 border-purple-900/50 pb-4">
              {game.name}
            </h1>
            
            {/* Si tienes un summary en tu tipo Game, lo mostramos aquí */}
            {game.summary ? (
               <div className="prose prose-invert max-w-none">
                 <p className="text-lg text-gray-300 leading-relaxed font-serif">
                   {game.summary}
                 </p>
               </div>
            ) : (
               <p className="text-muted-foreground font-mono italic">
                 Sin descripción disponible en la base de datos.
               </p>
            )}

            {/* Aquí puedes agregar a futuro botones como "Añadir a mi lista", "Marcar como Completado", etc. */}
            
          </div>
        </div>

      </div>
    </main>
  );
}