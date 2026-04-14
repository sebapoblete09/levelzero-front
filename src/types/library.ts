import { status } from "./games";
export type owner = "none" | "physical" | "digital";
export interface GameLibrary {
  id: string;
  user_id: string;
  igdb_id: number;
  game_title: string;
  cover: string;
  platform: string[];
  ownership: owner;
  status: status;
  added_at: string | null;
  game_type?: string | null;
}

export interface addGame {
  ownership: owner;
  status: status;
}
