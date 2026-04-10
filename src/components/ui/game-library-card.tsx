"use client";

import { UserGames } from "@/types/games";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatCoverUrl } from "@/utils/game-helpers";
export default function GameCard({ game }: { game: UserGames }) {
  const router = useRouter();

  const imageUrl = formatCoverUrl(game.cover);

  return (
    <div className="relative aspect-[3/4] border-2 border-purple-900 group overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
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
      <div className="flex flex-row">
        <Button
          variant="outline"
          size="sm"
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => router.push(`/game/${game.igdb_id}`)}
        >
          Ver Detalles
        </Button>
        <Button
          variant="outline"
          size="sm"
        >
          Editar Estado
        </Button>


      </div>
    </div>
  );
}

