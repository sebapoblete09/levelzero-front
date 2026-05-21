//Los datos de una review
export type Review = {
  igdb_id: number;
  cover: string;
  name: string;
  content: string;
  is_spoiler: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export interface userReview {
  username: string;
  avatar_url: string;
}
//cada review de un juego en es
export interface GameReview {
  igdb_id: number;
  content: string;
  is_spoiler: boolean;
  created_at: string | null;
  updated_at: string | null;
  profiles: userReview;
}

export type ReviewCreate = {
  content: string;
  is_spoiler: boolean;
};
