import { getGameById } from "@/actions/games";
import Image from "next/image";
import { Game } from "@/types/games";
import AddToListButton from "@/components/game/addGame";
import noGame from "@/components/game/noGame";
import { formatDate } from "@/utils/game-helpers";
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
    return noGame(gameId);
  }

  // 6. ¡Renderizamos el juego!
  // 1. Formateamos la fecha de lanzamiento (De Unix Timestamp a Texto Legible)
  const formattedDate = formatDate(game.firs_release_date);

  return (
    <main className="container mx-auto p-4 sm:p-8 min-h-screen">
      <div className="bg-black border-2 border-purple-900 p-6 sm:p-10 shadow-[12px_12px_0px_0px_var(--color-calypso-DEFAULT)]">
        <div className="flex flex-col md:flex-row gap-8 sm:gap-12">
          {/* Columna Izquierda: Portada */}
          <div className="w-full md:w-1/3 shrink-0">
            <div className="relative aspect-[3/4] w-full border-4 border-purple-900 overflow-hidden group">
              <Image
                src={game.cover}
                alt={`Portada de ${game.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>

            {/* Mostrar status de biblioteca si el juego ya está agregado */}
            {game.library_status && (
              <div className="mt-4 p-3 bg-purple-900/20 border border-purple-900/50 rounded">
                <p className="text-sm font-mono text-calypso-DEFAULT uppercase">
                  <span className="text-white">Estado en biblioteca:</span>{" "}
                  {game.library_status}
                </p>
              </div>
            )}

            {/* Botón de Acción Principal*/}
            <AddToListButton
              gameId={game.id}
              gameName={game.name}
              isInLibrary={game.library_status !== null}
              currentStatus={game.library_status || undefined}
            />
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
                {game.involved_companies &&
                  game.involved_companies.length > 0 &&
                  game.involved_companies.map((company, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-black border border-purple-900/80 text-white font-mono text-xs uppercase shadow-[2px_2px_0px_0px_var(--color-purple-900)]"
                    >
                      {company}
                    </span>
                  ))}
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

            {/* Storyline */}
            {game.storyline && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Historia
                </h3>
                <div className="prose prose-invert max-w-none">
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    {game.storyline}
                  </p>
                </div>
              </div>
            )}

            {/* Rating */}
            {game.rating && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Puntuación
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-calypso-DEFAULT">
                    {Math.round(game.rating)}
                  </span>
                  <span className="text-sm text-gray-400">/ 100</span>
                </div>
              </div>
            )}

            {/* Alternative Names */}
            {game.alternative_names && game.alternative_names.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Nombres Alternativos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {game.alternative_names.map((name, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-black border border-purple-900/80 text-white font-mono text-xs uppercase shadow-[2px_2px_0px_0px_var(--color-purple-900)]"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Franchises */}
            {game.franchises && game.franchises.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Franquicias
                </h3>
                <div className="flex flex-wrap gap-2">
                  {game.franchises.map((franchise, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-black border border-purple-900/80 text-white font-mono text-xs uppercase shadow-[2px_2px_0px_0px_var(--color-purple-900)]"
                    >
                      {franchise}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Game Modes */}
            {game.game_modes && game.game_modes.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Modos de Juego
                </h3>
                <div className="flex flex-wrap gap-2">
                  {game.game_modes.map((mode, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-black border border-purple-900/80 text-white font-mono text-xs uppercase shadow-[2px_2px_0px_0px_var(--color-purple-900)]"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Player Perspectives */}
            {game.player_perspectives &&
              game.player_perspectives.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                    Perspectivas de Jugador
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {game.player_perspectives.map((perspective, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-black border border-purple-900/80 text-white font-mono text-xs uppercase shadow-[2px_2px_0px_0px_var(--color-purple-900)]"
                      >
                        {perspective}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Language Supports */}
            {game.language_supports && game.language_supports.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Soporte de Idiomas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {game.language_supports.map((lang, index) => (
                    <div
                      key={index}
                      className="bg-black/50 border border-purple-900/50 p-3"
                    >
                      <h4 className="text-sm font-bold text-white uppercase mb-2">
                        {lang.name}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {lang.supports.map((support, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-purple-900/20 border border-calypso-DEFAULT/50 text-calypso-DEFAULT font-mono text-xs uppercase"
                          >
                            {support}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Screenshots */}
            {game.screenshots && game.screenshots.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Capturas de Pantalla
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {game.screenshots.slice(0, 6).map((screenshot, index) => (
                    <div
                      key={index}
                      className="relative aspect-video border-2 border-purple-900 overflow-hidden group"
                    >
                      <Image
                        src={screenshot}
                        alt={`Screenshot ${index + 1} de ${game.name}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {game.videos && game.videos.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                  Videos
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {game.videos.slice(0, 4).map((video, index) => (
                    <div
                      key={index}
                      className="relative aspect-video border-2 border-purple-900 overflow-hidden"
                    >
                      <iframe
                        src={`https://www.youtube.com/embed/${video}`}
                        title={`Video ${index + 1} de ${game.name}`}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                    {game.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-black border border-purple-900/80 text-white font-mono text-xs uppercase shadow-[2px_2px_0px_0px_var(--color-purple-900)]"
                      >
                        {genre}
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
                    {game.platforms.map((platform, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-900/20 border border-calypso-DEFAULT/50 text-calypso-DEFAULT font-mono text-xs uppercase shadow-[2px_2px_0px_0px_var(--color-calypso-DEFAULT)]"
                      >
                        {platform}
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
