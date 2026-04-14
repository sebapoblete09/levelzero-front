//Card de un juego
export interface GameCard {
  id: number;
  name: string;
  cover: string;
  platforms: string[] | [];
  game_type: string | "";
}

//Lista de juegos obtenida de la API de FastAPI
export type SearchGame = {
  query: string;
  count: number;
  results: GameCard[];
};

export type status =
  | "want_to_play"
  | "playing"
  | "on_hold"
  | "completed"
  | "dropped";

export type lan_support = {
  name: string;
  supports: string[];
};
//Detalles de un Juego
export interface Game extends GameCard {
  alternative_names: string[] | null;
  firs_release_date: number | null;
  franchises: string[] | [];
  game_modes: string[] | [];
  genres: string[] | [];
  involved_companies: string[] | [];
  library_status: status | null;
  player_perspectives: string[] | [];
  rating: number | null;
  screenshots: string[] | [];
  storyline: string;
  summary: string;
  videos: string[] | [];
  language_supports: lan_support[] | [];
}

/*export type UserGames = {
  id: string;
  user_id: string;
  igdb_id: number;
  game_title: string;
  cover: string;
  platform: SubItem[];
  status: Status;
  added_at: string | null;
};*/
