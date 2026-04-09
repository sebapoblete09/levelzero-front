"use client";

import { GameCard as GameCardType } from "@/types/games";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Button }from  "@/components/ui/button";
export default function GameCard({ game }: { game: GameCardType }) {
  const router = useRouter();
  let imageUrl = "/placeholder.png";

  if (game.cover && game.cover.url) {
    imageUrl = `https:${game.cover?.url.replace("t_thumb", "t_cover_big")}`;
  }

  return (
    <div
      className="bg-black border-2 border-purple-900 p-3 sm:p-4 shadow-[6px_6px_0px_0px_var(--color-calypso-DEFAULT)] sm:shadow-[8px_8px_0px_0px_var(--color-calypso-DEFAULT)] flex flex-row sm:flex-col group gap-4 sm:gap-0"
    >
      {/* Contenedor de la Imagen */}
      <div className="relative shrink-0 w-24 sm:w-full aspect-[3/4] overflow-hidden sm:mb-4 border border-purple-900/50">
        <Image
          src={imageUrl}
          alt={`Portada de ${game.name}`}
          fill
          sizes="(max-width: 768px) 96px, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Contenedor del Texto */}
      {/* 3. Ocupa el espacio sobrante con flex-1 y centra el texto verticalmente en móvil */}
      <div className="flex flex-col flex-2 justify-center sm:justify-end sm:mt-auto">
        <h2
          className="font-bold uppercase tracking-tighter text-white sm:line-clamp-2 line-clamp-3 text-sm sm:text-base"
          title={game.name}
        >
          {game.name}
        </h2>

        <Button variant="persona"  onClick={()=>router.push(`/games/${game.id}`)}>+ Info</Button>
      </div>
    </div>
  );
}
