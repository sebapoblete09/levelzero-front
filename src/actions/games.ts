// actions/games.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { SearchGame, Game } from "@/types/games";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// obtener lista de juegos por nombre
export async function getGamesByName(name: string): Promise<SearchGame | null> {
  // Validación de seguridad y rendimiento: El backend pide mínimo 2 caracteres
  if (!name || name.trim().length < 2) {
    return null;
  }

  try {
    // Agregamos ?q= y codificamos el texto para que soporte espacios y símbolos
    const url = `${API_URL}/api/v1/games/search?q=${encodeURIComponent(name)}`;

    const res = await fetch(url, {
      method: "GET",
      // "no-store" está perfecto aquí para que las búsquedas siempre estén actualizadas
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Error del backend:", await res.text());
      return null;
    }

    // Casteamos la respuesta con el tipo correcto que armamos arriba
    const gamesData: SearchGame = await res.json();
    return gamesData;
  } catch (error) {
    // Aquí usamos el 'error' que captura el bloque catch
    console.error("Error conectando con FastAPI:", error);
    return null;
  }
}

//Obtener un juego por su ID
export async function getGameById(id: number): Promise<Game | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/games/game/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Error del backend:", await res.text());
      return null;
    }
    const GameData: Game = await res.json();
    return GameData;
  } catch (error) {
    console.error("Error conectando con FastAPI:", error);
    return null;
  }
}


//añadir un juego a la lista de favoritos del usuario
//export async function addGameToFavorites(gameId: number){