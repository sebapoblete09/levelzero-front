"use server";

import { createClient } from "@/lib/supabase/server";
/*import { GameNote, GameNoteCreate, GameNoteUpdate } from "@/types/note";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Obtener todas las notas de un juego
export async function getGameNotes(
  gameId: number
): Promise<GameNote[] | null> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return null;
  }

  try {
    const res = await fetch(`${API_URL}/api/v1/notes/${gameId}`, {
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

    const notes: GameNote[] = await res.json();
    return notes;
  } catch (error) {
    console.error("Error conectando con FastAPI:", error);
    return null;
  }
}

// Crear una nota
export async function createGameNote(
  gameId: number,
  data: GameNoteCreate
): Promise<{ success: boolean; note?: GameNote; error?: string }> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, error: "No está logueado." };
  }

  try {
    const res = await fetch(`${API_URL}/api/v1/notes/${gameId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.detail || "Error al crear la nota." };
    }

    const note = await res.json();
    return { success: true, note };
  } catch (error) {
    console.error("Error conectando con FastAPI:", error);
    return { success: false, error: "Error de conexión con el servidor." };
  }
}

// Actualizar una nota
export async function updateGameNote(
  noteId: number,
  data: GameNoteUpdate
): Promise<{ success: boolean; note?: GameNote; error?: string }> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, error: "No está logueado." };
  }

  try {
    const res = await fetch(`${API_URL}/api/v1/notes/${noteId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.detail || "Error al actualizar la nota." };
    }

    const note = await res.json();
    return { success: true, note };
  } catch (error) {
    console.error("Error conectando con FastAPI:", error);
    return { success: false, error: "Error de conexión con el servidor." };
  }
}

// Eliminar una nota
export async function deleteGameNote(
  noteId: number
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, error: "No está logueado." };
  }

  try {
    const res = await fetch(`${API_URL}/api/v1/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.detail || "Error al eliminar la nota." };
    }

    return { success: true };
  } catch (error) {
    console.error("Error conectando con FastAPI:", error);
    return { success: false, error: "Error de conexión con el servidor." };
  }
}*/
