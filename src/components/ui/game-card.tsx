"use client";

import { status } from "@/types/games";
import { owner } from "@/types/library";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export interface GameData {
  id: number;
  name: string;
  cover: string;
  platform: string[];
  ownership?: owner; //string
  status?: status; //string
  added_at?: string | null;
  game_type?: string | null;
}
export default function GameCard({ game }: { game: GameData }) {
  const router = useRouter();

  const getStatusColor = (status?: status) => {
    switch (status) {
      case "playing":
        return "border-calypso-DEFAULT text-calypso-DEFAULT";
      case "want_to_play":
        return "border-purple-400 text-purple-400";
      case "completed":
        return "border-green-400 text-green-400";
      case "on_hold":
        return "border-yellow-400 text-yellow-400";
      case "dropped":
        return "border-red-500 text-red-500";
      default:
        return "border-gray-400 text-gray-400";
    }
  };

  const getOwnershipColor = (ownership?: owner) => {
    switch (ownership) {
      case "physical":
        return "border-blue-400 text-blue-400";
      case "digital":
        return "border-cyan-400 text-cyan-400";
      case "none":
        return "border-gray-400 text-gray-400";
      default:
        return "border-gray-400 text-gray-400";
    }
  };

  const getStatusLabel = (status?: status) => {
    switch (status) {
      case "playing":
        return "Jugando";
      case "want_to_play":
        return "Pendiente";
      case "completed":
        return "Completado";
      case "on_hold":
        return "En Pausa";
      case "dropped":
        return "Abandonado";
      default:
        return "Sin Estado";
    }
  };

  const getOwnershipLabel = (ownership?: owner) => {
    switch (ownership) {
      case "physical":
        return "Físico";
      case "digital":
        return "Digital";
      case "none":
        return "Ninguno";
      default:
        return "Ninguno";
    }
  };

  return (
    <div className="bg-black border-2 border-purple-900 p-3 shadow-[4px_4px_0px_0px_var(--color-calypso-DEFAULT)] flex flex-row sm:flex-col group hover:shadow-[6px_6px_0px_0px_var(--color-calypso-DEFAULT)] transition-shadow duration-300 relative">
      {/* Contenedor de la Imagen */}
      <div className="relative w-24 h-32 sm:w-full sm:h-64 overflow-hidden mx-auto mb-2 border border-purple-900/50 flex-shrink-0">
        <Image
          src={game.cover}
          alt={`Portada de ${game.name}`}
          fill
          sizes="(max-width: 768px) 96px, (max-width: 1200px) 192px, 192px"
          className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />

        {(game.status || game.ownership) && (
          <div className="absolute left-1 top-1 sm:left-3 sm:top-3 z-20 flex flex-wrap gap-1 sm:gap-2">
            {game.status && (
              <span
                className={`px-1 sm:px-2 py-0.5 sm:py-1 border text-[8px] sm:text-[10px] font-mono uppercase ${getStatusColor(game.status)} bg-black/80`}
              >
                {getStatusLabel(game.status)}
              </span>
            )}
            {game.ownership && (
              <span
                className={`px-1 sm:px-2 py-0.5 sm:py-1 border text-[8px] sm:text-[10px] font-mono uppercase ${getOwnershipColor(game.ownership)} bg-black/80`}
              >
                {getOwnershipLabel(game.ownership)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Contenedor del Texto */}
      <div className="flex flex-col flex-1 relative min-w-0 ">
        <h2
          className="font-bold uppercase tracking-tighter text-white line-clamp-2 text-sm mb-2"
          title={game.name}
        >
          {game.name}
        </h2>

        {/* Plataformas */}
        {game.platform && game.platform.length > 0 && (
          <div className="mb-2">
            <div className="flex flex-wrap gap-1">
              {game.platform.slice(0, 2).map((platform, index) => (
                <span
                  key={index}
                  className="px-1.5 py-0.5 bg-purple-900/20 border border-calypso-DEFAULT/50 text-calypso-DEFAULT font-mono text-xs uppercase"
                >
                  {platform}
                </span>
              ))}
              {game.platform.length > 2 && (
                <span className="px-1.5 py-0.5 bg-purple-900/20 border border-calypso-DEFAULT/50 text-calypso-DEFAULT font-mono text-xs uppercase">
                  +{game.platform.length - 2}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Información adicional */}
        <div className="space-y-1 mb-2 text-xs text-gray-400 font-mono">
          {game.game_type && (
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Tipo:</span>
              <span className="text-white uppercase">{game.game_type}</span>
            </div>
          )}
          {game.added_at && (
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Añadido:</span>
              <span className="text-white">
                {new Date(game.added_at).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="mb-2">
        {/* Botón de acción pequeño en esquina inferior derecha */}
        <Button
          variant="default"
          onClick={() => router.push(`/game/${game.id}`)}
          className="absolute bottom-0 right-0 text-lg p-1"
        >
          + info
        </Button>
      </div>
    </div>
  );
}
