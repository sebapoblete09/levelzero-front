// actions/user.ts
"use server";
import { revalidatePath } from "next/cache";
import { UserProfile, UserUpdate } from "@/types/user";
import { addGame, GameLibrary } from "@/types/library";
import { createClient } from "@/lib/supabase/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

//Get Perfil del usuario registrado
export async function getUserProfile(): Promise<UserProfile | null> {
  // 1. Instanciamos Supabase usando la función reutilizable
  const supabase = await createClient();

  // 2. Obtenemos la sesión actual de Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null; // No está logueado
  }

  try {
    // 3. Hacemos la petición a la API en FastAPI usando el token JWT
    const res = await fetch(`${API_URL}/api/v1/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      // cache: "no-store" es importante para que Next.js no guarde un perfil viejo
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Error del backend:", await res.text());
      return null;
    }

    // 4. Devolvemos los datos del usuario
    const userData: UserProfile = await res.json();
    return userData;
  } catch (error) {
    console.error("Error conectando con FastAPI:", error);
    return null;
  }
}

//Obtener los juegos del usuario
export async function getUserGames(): Promise<GameLibrary[] | null> {
  // 1. Instanciamos Supabase usando la función reutilizable
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null; // No está logueado
  }

  try {
    const res = await fetch(`${API_URL}/api/v1/library/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
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

//Patch actualizar el perfil del usuario
export async function updateUserProfile(data: UserUpdate) {
  // 1. Instanciamos Supabase usando la función reutilizable
  const supabase = await createClient();

  // 2. Obtenemos la sesión actual de Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null; // No está logueado
  }

  try {
    // 3. Hacemos la petición a la API en FastAPI usando el token JWT
    const res = await fetch(`${API_URL}/api/v1/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        error:
          errorData.detail ||
          "Error al actualizar el perfil en la base de datos.",
      };
    }

    // 4. Devolvemos los datos del usuario
    const updatedUser = await res.json();
    // EL TRUCO DE ORO: Limpiamos el caché de Next.js
    // Esto fuerza al layout.tsx a volver a ejecutar getUserProfile()
    revalidatePath("/", "layout");

    return { success: true, data: updatedUser };
  } catch (error) {
    console.error("Error conectando con FastAPI en PATCH /me:", error);
    return {
      success: false,
      error: "Error de conexión con el servidor backend.",
    };
  }
}

//agregar juego a la biblioteca del usuario
export async function addGameToLibrary(
  gameId: number,
  addData: addGame,
): Promise<{
  success: boolean;
  gameData?: GameLibrary;
  error?: null | string;
}> {
  // LOGS PARA DEBUGGING
  console.log("[DEBUG] addGameToLibrary - Parámetros recibidos:");
  console.log("[DEBUG] gameId:", gameId, "tipo:", typeof gameId);
  console.log("[DEBUG] addData:", JSON.stringify(addData, null, 2));
  console.log("[DEBUG] addData.ownership:", addData.ownership);
  console.log("[DEBUG] addData.status:", addData.status);

  // 1. Instanciamos Supabase usando la función reutilizable
  const supabase = await createClient();

  // 2. Obtenemos la sesión actual de Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log("[DEBUG] addGameToLibrary - No hay sesión activa");
    return { success: false, error: "No está logueado." };
  }

  console.log(
    "[DEBUG] addGameToLibrary - Sesión encontrada, token presente:",
    !!session.access_token,
  );

  try {
    console.log(
      "[DEBUG] addGameToLibrary - Preparando fetch a:",
      `${API_URL}/api/v1/library/add/${gameId}`,
    );
    console.log(
      "[DEBUG] addGameToLibrary - Body que se enviará:",
      JSON.stringify({ addData }, null, 2),
    );

    // 3. Hacemos la petición a la API en FastAPI usando el token JWT
    const res = await fetch(`${API_URL}/api/v1/library/add/${gameId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        ownership: addData.ownership,
        status: addData.status,
      }),
    });

    console.log(
      "[DEBUG] addGameToLibrary - Respuesta del servidor - Status:",
      res.status,
    );
    console.log(
      "[DEBUG] addGameToLibrary - Respuesta del servidor - OK:",
      res.ok,
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.log("[DEBUG] addGameToLibrary - Error del servidor:", errorData);
      return {
        success: false,
        error: errorData.detail || "Error al agregar el juego a la biblioteca.",
      };
    }

    // 4. Devolvemos los datos del usuario
    const gameData = await res.json();
    console.log(
      "[DEBUG] addGameToLibrary - Juego agregado exitosamente:",
      gameData,
    );

    return { success: true, gameData: gameData };
  } catch (error) {
    console.error("[DEBUG] addGameToLibrary - Error de conexión:", error);
    return {
      success: false,
      error: "Error de conexión con el servidor backend.",
    };
  }
}
