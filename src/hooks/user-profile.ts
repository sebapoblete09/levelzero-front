import { getUserGames } from "@/actions/user";
import {useUser} from "@/providers/UserContext";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function userProfile() {
    const {user} = useUser();
    const router = useRouter();

    useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  const query = useQuery({
    queryKey: ["userGames", user?.username],
    queryFn: () => getUserGames(),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });

  return {
    user,
    games: query.data,
    isLoading: query.isLoading || !user, // Es loading si la query carga O si el usuario aún no llega
  };
}