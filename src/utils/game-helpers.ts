import { GameCard } from "@/types/games";
import { GameLibrary } from "@/types/library";
import { GameData } from "@/components/ui/game-card";

//Formatear fchas de igdb a una mas legible
export const formatDate = (timestamp: number | undefined | null) => {
  if (!timestamp) return "Desconocida";
  return new Date(timestamp * 1000).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const igdbGameData = (data: GameCard): GameData => ({
  id: data.id,
  name: data.name,
  cover: data.cover,
  platform: data.platforms,
  game_type: data.game_type,
});

export const libraryGameData = (data: GameLibrary): GameData => ({
  id: data.igdb_id,
  name: data.game_title,
  cover: data.cover,
  platform: data.platform,
  ownership: data.ownership, //string
  status: data.status, //string
  added_at: data.added_at,
  game_type: data.game_type,
});
