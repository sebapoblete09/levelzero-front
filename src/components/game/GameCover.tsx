import Image from "next/image";
import AddToListButton from "./addGame";
import { TagBadge } from "./TagBadge";
import CollapsibleSection from "./CollapsibleSection";
import CollapsibleLanguages from "./CollapsibleLanguages";
import { Game, status } from "@/types/games";
import { owner } from "@/types/library";

interface GameCoverProps {
  game: Game;
  libraryStatus: status | null;
  ownership: owner | null;
  rating: number | null;
}

export function GameCover({
  game,
  libraryStatus,
  ownership,
  rating,
}: GameCoverProps) {
  const isInLibrary = libraryStatus !== null;

  return (
    <div className="w-full md:w-1/5 shrink-0">
      <div className="relative aspect-[3/4] w-32 sm:w-40 md:w-full border-4 border-purple-900 overflow-hidden group">
        <Image
          src={game.cover}
          alt={`Portada de ${game.name}`}
          fill
          sizes="(max-width: 768px) 180px, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
      </div>

      {libraryStatus && (
        <div className="mt-4 p-3 bg-purple-900/20 border border-purple-900/50 rounded">
          <p className="text-sm font-mono text-calypso-DEFAULT uppercase">
            <span className="text-white">Estado en biblioteca:</span>{" "}
            {libraryStatus}
          </p>
        </div>
      )}

      <AddToListButton
        gameId={game.id}
        gameName={game.name}
        isInLibrary={isInLibrary}
        currentStatus={libraryStatus || undefined}
        currentOwnership={ownership || undefined}
        currentRaiting={rating}
      />

      {game.platforms && game.platforms.length > 0 && (
        <div className="mt-8 pt-6 border-t border-purple-900/30">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
            Plataformas
          </h3>
          <div className="flex flex-wrap gap-2">
            {game.platforms.map((platform, index) => (
              <TagBadge key={index}>{platform}</TagBadge>
            ))}
          </div>
        </div>
      )}

      {game.genres && game.genres.length > 0 && (
        <CollapsibleSection title="Géneros">
          <div className="flex flex-wrap gap-2">
            {game.genres.map((genre, index) => (
              <TagBadge key={index}>{genre}</TagBadge>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {game.franchises && game.franchises.length > 0 && (
        <CollapsibleSection title="Franquicias">
          <div className="flex flex-wrap gap-2">
            {game.franchises.map((franchise, index) => (
              <TagBadge key={index}>{franchise}</TagBadge>
            ))}
          </div>
        </CollapsibleSection>
      )}

      <CollapsibleSection title="Game Modes">
        <div>
          {game.game_modes && game.game_modes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Modos de Juego
              </h3>
              <div className="flex flex-wrap gap-2">
                {game.game_modes.map((mode, index) => (
                  <TagBadge key={index}>{mode}</TagBadge>
                ))}
              </div>
            </div>
          )}

          {game.player_perspectives && game.player_perspectives.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                Perspectivas
              </h3>
              <div className="flex flex-wrap gap-2">
                {game.player_perspectives.map((perspective, index) => (
                  <TagBadge key={index}>{perspective}</TagBadge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CollapsibleSection>

      {game.language_supports && game.language_supports.length > 0 && (
        <CollapsibleLanguages languageSupports={game.language_supports} />
      )}
    </div>
  );
}
