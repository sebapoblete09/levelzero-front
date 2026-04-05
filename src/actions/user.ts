// actions/user.ts
"use server";

import { createClient } from "@/lib/supabase/server"; 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUserProfile() {
  // 1. Instanciamos Supabase usando la función reutilizable
  const supabase = await createClient();

  // 2. Obtenemos la sesión actual de Supabase
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return null; // No está logueado
  }

  try {
    // 3. Hacemos la petición a la API en FastAPI usando el token JWT
    const res = await fetch(`${API_URL}/api/v1/users/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${session.access_token}`,
      },
      // cache: "no-store" es importante para que Next.js no guarde un perfil viejo
      cache: "no-store", 
    });

    if (!res.ok) {
      console.error("Error del backend:", await res.text());
      return null;
    }

    // 4. Devolvemos los datos del usuario
    const userData = await res.json();
    return userData;

  } catch (error) {
    console.error("Error conectando con FastAPI:", error);
    return null;
  }
}