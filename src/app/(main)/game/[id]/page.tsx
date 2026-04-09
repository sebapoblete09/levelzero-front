// IMPORTANTE: Quitamos el "use client" de la primera línea.
// Ahora esto corre en el servidor de Next.js antes de llegar al navegador.

import React from "react";
import { getGameById } from "@/actions/games";
import Image from "next/image";
import {Game } from "@/types/games";
import AddToListButton from "@/components/game/addGame";

// En un Server Component, Next.js nos pasa los 'params' (como el ID de la URL) automáticamente
export default async function GameDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // 1. Extraemos el ID de los parámetros y lo convertimos a número
  const resolvedParams = await params;
  const gameId = parseInt(resolvedParams.id, 10);

  // 2. Si alguien escribe texto en lugar de un número en la URL (/game/hola), lo atajamos
  if (isNaN(gameId)) {
    return (
      <div className="p-10 text-center text-red-500 font-mono">
        ID de juego inválido. El valor recibido fue: {params.id}
      </div>
    );
  }

  // 3. Hacemos el Fetch directamente aquí. ¡Sin useEffect, sin useState!
  const game: Game | null = await getGameById(gameId);

  // 4. Si la base de datos no lo encuentra (devuelve null)
  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="border-2 border-red-500 p-8 shadow-[8px_8px_0px_0px_rgba(239,68,68,0.5)]">
          <h1 className="text-2xl font-black italic text-red-500 uppercase">
            Juego no encontrado
          </h1>
          <p className="text-muted-foreground font-mono mt-2">
            El registro #{gameId} no existe en la base de datos.
          </p>
        </div>
      </div>
    );
  }

  // 5. Arreglamos la URL de la imagen de IGDB (igual que hicimos en los resultados)
  let imageUrl = "/placeholder.png";
  if (game.cover && game.cover.url) {
    imageUrl = `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`;
  }

  // 6. ¡Renderizamos el juego!
  // 1. Formateamos la fecha de lanzamiento (De Unix Timestamp a Texto Legible)
  const formattedDate = game.first_release_date
    ? new Date(game.first_release_date * 1000).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Desconocida";


    
  return (
    <main className="container mx-auto p-4 sm:p-8 min-h-screen">
      <div className="bg-black border-2 border-purple-900 p-6 sm:p-10 shadow-[12px_12px_0px_0px_var(--color-calypso-DEFAULT)]">
        <div className="flex flex-col md:flex-row gap-8 sm:gap-12">
          {/* Columna Izquierda: Portada */}
          <div className="w-full md:w-1/3 shrink-0">
            <div className="relative aspect-[3/4] w-full border-4 border-purple-900 overflow-hidden group">
              <Image
                src={imageUrl}
                alt={`Portada de ${game.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>

            {/* Botón de Acción Principal (Placeholder para futuro) */}
            <AddToListButton gameId={game.id} gameName={game.name} />
          </div>

          {/* Columna Derecha: Información */}
          <div className="w-full md:w-2/3 flex flex-col justify-start">
            {/* Título Principal */}
            <h1 className="text-4xl sm:text-6xl font-black italic uppercase tracking-tighter text-white mb-2">
              {game.name}
            </h1>

            {/* Fila de Metadata (Fecha y Desarrolladora) */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-6 border-b-2 border-purple-900/50 pb-4">
              <div className="text-calypso-DEFAULT font-mono text-sm uppercase flex items-center">
                <span className="text-muted-foreground mr-2 font-bold">
                  » Lanzamiento:
                </span>
                {formattedDate}
              </div>
              <div className="text-calypso-DEFAULT font-mono text-sm uppercase flex items-center">
                <span className="text-muted-foreground mr-2 font-bold">
                  » Estudio:
                </span>
                {game.involved_companies && game.involved_companies.length > 0 && (
                    game.involved_companies.map((company) => (
                      <span
                        key={company.id}
                        className="px-3 py-1 bg-black border border-purple-900/80 text-white font-mono text-xs uppercase shadow-[2px_2px_0px_0px_var(--color-purple-900)]"
                      >
                          {company.company.name}
                      </span>
                    ))
                )}
              </div>
            </div>

            {/* Resumen del juego */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Sinopsis
              </h3>
              {game.summary ? (
                <div className="prose prose-invert max-w-none">
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    {game.summary}
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground font-mono italic">
                  Sin descripción disponible en la base de datos.
                </p>
              )}
            </div>

            {/* Cuadrícula de Etiquetas (Géneros y Plataformas) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-auto border-t border-purple-900/30 pt-6">
              {/* Bloque Géneros */}
              {game.genres && game.genres.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-calypso-DEFAULT inline-block" />
                    Géneros
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-black border border-purple-900/80 text-white font-mono text-xs uppercase shadow-[2px_2px_0px_0px_var(--color-purple-900)]"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Bloque Plataformas */}
              {game.platforms && game.platforms.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-calypso-DEFAULT inline-block" />
                    Plataformas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.platforms.map((platform) => (
                      <span
                        key={platform.id}
                        className="px-3 py-1 bg-purple-900/20 border border-calypso-DEFAULT/50 text-calypso-DEFAULT font-mono text-xs uppercase shadow-[2px_2px_0px_0px_var(--color-calypso-DEFAULT)]"
                      >
                        {platform.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
