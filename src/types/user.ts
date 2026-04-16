export type UserProfile = {
  id: string;
  email: string;
  display_name: string;
  username: string | null;
  avatar_url: string | null;
  preferred_platforms: string[];
  onboarding_completed: boolean;
  created_at: string | null;
  updated_at: string | null;
};

export type Platform = {
  id: number;
  name: string;
};
export type UserUpdate = {
  username: string;
  display_name: string;
  preferred_platforms: Platform[];
  onboarding_completed: boolean;
};
