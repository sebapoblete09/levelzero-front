type SubItem = {
  id: number;
  name: string;
};

export type company = {
  id: number;
  company: string;
};

export type GameType = {
  id: number;
  type:string;
}

//Datos de un juego en especifico
export type Game = {
  id: number;
  name: string;
  summary: string | null;
  cover: Cover | null;
  first_release_date: number | null;
  genres: SubItem[];
  platforms: SubItem[];
  involved_companies: company[];
};

//Portada del juego
export type Cover = {
  url: string;
};

//Card de un juego que se mostrara al buscar
export type GameCard = {
  id: number;
  name: string;
  cover: Cover | null;
  platforms: SubItem[];
  game_types: GameType;
};

//Lista de juegos obtenida de la API de FastAPI
export type SearchGame = {
  query: string;
  count: number;
  results: GameCard[];
};

export type Status =
  | "want_to_play"
  | "playing"
  | "on_hold"
  | "completed"
  | "dropped";

export type UserGames = {
  id: string;
  user_id: string;
  igdb_id: number;
  game_title: string;
  cover: string;
  platform: SubItem[];
  status: Status;
  added_at: string | null;
};



