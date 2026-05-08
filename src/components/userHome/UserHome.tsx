"use client";
import { useUser } from "@/providers/UserContext";

import WelcomeHeader from "./WelcomeHeader";
import RecentGames from "./RecentGames";
import CurrentlyPlaying from "./CurrentlyPlaying";
import UpcomingReleases from "./UpcomingReleases";
import GamingEvents from "./GamingEvents";

export default function UserDashboard() {
  const { user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      {/* 1. Saludo */}
      <WelcomeHeader name={user?.display_name} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <UpcomingReleases />
        </div>
        <div>
          <GamingEvents />
        </div>
      </div>

      {/* 2 + 3. Continuar jugando + Backlog counter */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <CurrentlyPlaying user={user} />
        </div>
        <div></div>
      </div>

      {/* 4. Actividad reciente */}
      <RecentGames />
    </div>
  );
}
