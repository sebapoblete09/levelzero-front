// src/app/(main)/page.tsx

import Home from "@/components/home/Homepage";
import UserDashboard from "@/components/userHome/UserHome";
import { getUserProfile } from "@/actions/user";

export default async function HomePage() {
  // Le preguntamos al servidor directamente si hay alguien logueado
  const userProfile = await getUserProfile();

  // Si hay usuario (y sabemos que si llegó aquí ya pasó el onboarding gracias a tu layout)
  if (userProfile) {
    return <UserDashboard />;
  }

  // Si es un visitante casual o no hay sesión
  return <Home />;
}
