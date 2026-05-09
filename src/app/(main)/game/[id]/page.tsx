import { getGameById } from "@/actions/games";
import { GameCover } from "@/components/game/GameCover";
import { GameInfo } from "@/components/game/GameInfo";
import { GameMedia } from "@/components/game/GameMedia";
import noGame from "@/components/game/noGame";

export default async function GameDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const resolvedParams = await params;
  const gameId = parseInt(resolvedParams.id, 10);

  if (isNaN(gameId)) {
    return (
      <div className="p-10 text-center text-red-500 font-mono">
        ID de juego inválido. El valor recibido fue: {params.id}
      </div>
    );
  }

  const game = await getGameById(gameId);

  if (!game) {
    return noGame(gameId);
  }

  return (
    <main className="container mx-auto p-4 sm:p-8 min-h-screen">
      <div className="bg-black border-2 border-purple-900 p-6 sm:p-10 shadow-[12px_12px_0px_0px_var(--color-calypso-DEFAULT)]">
        <div className="flex flex-col md:flex-row gap-6 lg:gap-12 items-start text-left">
          <GameCover
            game={game}
            libraryStatus={game.library_status}
            ownership={game.ownership}
            rating={game.rating}
          />
          <GameInfo game={game} />
        </div>

        <div className="mt-8 pt-8 border-t border-purple-900/30">
          <GameMedia
            screenshots={game.screenshots}
            videos={game.videos}
            gameName={game.name}
          />
        </div>
      </div>
    </main>
  );
}