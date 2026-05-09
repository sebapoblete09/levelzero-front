export type Review = {
  igdb_id: number;
  content: string;
  is_spoiler: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type ReviewCreate = {
  content: string;
  is_spoiler: boolean;
};