"use server";
import { createClient } from "@/lib/supabase/server";
import { Review, ReviewCreate } from "@/types/review";
import { cache } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserReviews = cache(async (): Promise<Review[] | null> => {
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
    const res = await fetch(`${API_URL}/api/v1/reviews/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      // cache: "no-store" es importante para que Next.js no guarde reviews viejas
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Error del backend:", await res.text());
      return null;
    }

    // 4. Devolvemos los datos del usuario
    const userReviews: Review[] = await res.json();
    console.log(userReviews);
    return userReviews;
  } catch (error) {
    console.error("Error conectando con FastAPI:", error);
    return null;
  }
});

export async function createReview(
  gameId: number,
  review: ReviewCreate,
): Promise<{
  success: boolean;
  reviewData?: ReviewCreate;
  error?: null | string;
}> {
  // LOGS PARA DEBUGGING
  console.log("[DEBUG] createReview - Parámetros recibidos:");
  console.log("[DEBUG] gameId:", gameId, "tipo:", typeof gameId);
  console.log("[DEBUG] reviewData:", JSON.stringify(review, null, 2));
  console.log("[DEBUG] reviewData.content:", review.content);
  console.log("[DEBUG] reviewData.spoiler:", review.is_spoiler);

  // 1. Instanciamos Supabase usando la función reutilizable
  const supabase = await createClient();

  // 2. Obtenemos la sesión actual de Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    console.log("[DEBUG] createReview - No hay sesión activa");
    return { success: false, error: "No está logueado." };
  }

  console.log(
    "[DEBUG] createReview - Sesión encontrada, token presente:",
    !!session.access_token,
  );

  try {
    console.log(
      "[DEBUG] createReview - Preparando fetch a:",
      `${API_URL}/api/v1/reviews/${gameId}`,
    );
    console.log(
      "[DEBUG] createReview - Body que se enviará:",
      JSON.stringify({ review }, null, 2),
    );

    // 3. Hacemos la petición a la API en FastAPI usando el token JWT
    const res = await fetch(`${API_URL}/api/v1/reviews/${gameId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        content: review.content,
        is_spoiler: review.is_spoiler,
      }),
    });

    console.log(
      "[DEBUG] reviewCreate - Respuesta del servidor - Status:",
      res.status,
    );
    console.log("[DEBUG] reviewCreate - Respuesta del servidor - OK:", res.ok);

    if (!res.ok) {
      const errorData = await res.json();
      console.log("[DEBUG] reviewCreate - Error del servidor:", errorData);
      return {
        success: false,
        error: errorData.detail || "Error al agregar el juego a la biblioteca.",
      };
    }

    // 4. Devolvemos los datos del usuario
    const reviewData = await res.json();
    console.log(
      "[DEBUG] createReview - Juego agregado exitosamente:",
      reviewData,
    );

    return { success: true, reviewData: reviewData };
  } catch (error) {
    console.error("[DEBUG] reviewData - Error de conexión:", error);
    return {
      success: false,
      error: "Error de conexión con el servidor backend.",
    };
  }
}
