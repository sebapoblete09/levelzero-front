import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  // Obtenemos la URL y el código que envía Google
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();

    // Intercambiamos el código por una sesión válida en el servidor
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Si todo sale bien, redirigimos al usuario a la página principal
      return NextResponse.redirect(`${origin}/onboarding`);
    }
  }

  // Si hay error, lo mandamos a una ruta de error genérica
  return NextResponse.redirect(`${origin}/?error=auth_failed`);
}
