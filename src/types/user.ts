export type Platform = {
  id: number;
  name: string;
};

export type UserProfile = {
  id: string;
  email: string;
  display_name: string | null;
  username: string | null;
  avatar_url: string | null;
  preferred_platforms: Platform[];
  onboarding_completed: boolean; 
  created_at: string;
  updated_at: string;
};