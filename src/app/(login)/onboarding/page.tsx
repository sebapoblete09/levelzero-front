// app/(login)/onboarding/page.tsx
import { redirect } from "next/navigation";
import { getUserProfile } from "@/actions/user";
import OnboardingForm from "@/components/onboarding/onboardingForm"

export default async function OnboardingPage() {
  // 1. Llamamos a tu backend en FastAPI
  const userProfile = await getUserProfile();

  // 2. Validación instantánea del lado del servidor
  // Si tiene el perfil y ya completó el onboarding, ¡lo sacamos de aquí!
  if (userProfile && userProfile.onboarding_completed === true) {
    redirect("/");
  }

  const display_name = userProfile?.display_name || "Jhon Doe"; // Valor por defecto si no hay display_name
  // 3. Si no ha completado el onboarding (o si userProfile es null por un error raro),
  // recién ahí le pintamos el formulario en pantalla.
  return <OnboardingForm initialDisplay_name={display_name} />;
}