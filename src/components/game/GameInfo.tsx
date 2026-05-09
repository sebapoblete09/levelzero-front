import { TagBadge } from "./TagBadge";
import CollapsibleSection from "./CollapsibleSection";
import { formatDate } from "@/utils/game-helpers";
import { Game } from "@/types/games";

interface GameInfoProps {
  game: Game;
}

export function GameInfo({ game }: GameInfoProps) {
  const formattedDate = formatDate(game.first_release_date);

  return (
    <div className="w-full md:w-2/3 flex flex-col justify-start">
      <h1 className="hidden md:block text-4xl sm:text-6xl font-black italic uppercase tracking-tighter text-white mb-2">
        {game.name}
      </h1>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 mb-6 border-b-2 border-purple-900/50 pb-4">
        <div className="text-calypso-DEFAULT font-mono text-sm uppercase flex items-center">
          <span className="text-muted-foreground mr-2 font-bold">
            » Lanzamiento:
          </span>
          {formattedDate}
        </div>
        <div className="text-calypso-DEFAULT font-mono text-sm uppercase flex items-center flex-wrap gap-2">
          <span className="text-muted-foreground mr-2 font-bold">
            » Estudio:
          </span>
          {game.involved_companies &&
            game.involved_companies.length > 0 &&
            game.involved_companies.map((company, index) => (
              <TagBadge key={index}>{company}</TagBadge>
            ))}
        </div>
      </div>

      <CollapsibleSection title="Sinopsis">
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
      </CollapsibleSection>

      {game.storyline && (
        <CollapsibleSection title="Historia">
          <div className="prose prose-invert max-w-none">
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              {game.storyline}
            </p>
          </div>
        </CollapsibleSection>
      )}

      {(game.rating || game.lzrating) && (
        <CollapsibleSection title="Puntuación">
          <div className="flex items-center gap-2">
            {game.rating && (
              <>
                <span className="text-2xl font-bold text-calypso-DEFAULT">
                  {Math.round(game.rating)}
                </span>
                <span className="text-sm text-gray-400">/ 100</span>
              </>
            )}
            {game.lzrating && (
              <>
                {game.rating && <span className="text-gray-600 mx-2">|</span>}
                <span className="text-2xl font-bold text-purple-400">
                  {Math.round(game.lzrating)}
                </span>
                <span className="text-sm text-gray-400">LZ</span>
              </>
            )}
          </div>
        </CollapsibleSection>
      )}

      {game.alternative_names && game.alternative_names.length > 0 && (
        <CollapsibleSection title="Nombres Alternativos">
          <div className="flex flex-wrap gap-2">
            {game.alternative_names.map((name, index) => (
              <TagBadge key={index} variant="outline">{name}</TagBadge>
            ))}
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
}