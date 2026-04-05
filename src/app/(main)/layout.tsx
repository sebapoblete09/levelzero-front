// app/(main)/layout.tsx
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { getUserProfile } from "@/actions/user";
import { UserProvider } from "@/providers/UserContext";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Llamamos a tu backend mediante la Server Action
  const userProfile = await getUserProfile();

  // 2. Lógica de Onboarding
  if (userProfile && userProfile.onboarding_completed === false) {
    // Si no ha terminado el onboarding, lo pateamos a la ruta /onboarding
    redirect("/onboarding");
  }

  return (
    // 3. Envolvemos la app en el Provider y le pasamos los datos pre-cargados
    <UserProvider initialUser={userProfile}>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </UserProvider>
  );
}