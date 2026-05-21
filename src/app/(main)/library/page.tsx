"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import GameCard from "@/components/ui/game-card";
import { GameLibrary } from "@/types/library";
import { libraryGameData } from "@/utils/game-helpers";
import { getUserGames } from "@/actions/user";
// Importamos la MISMA función que usas en el Profile

export default function LibraryPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [ownershipFilter, setOwnershipFilter] = useState("all");
  const [page, setPage] = useState(1);

  // Reutilizamos la misma lógica de React Query, pero expandiendo la queryKey
  const { data: games, isLoading } = useQuery({
    // La queryKey ahora observa los estados para separar el caché por cada filtro
    queryKey: ["userGames", "library", page, statusFilter, ownershipFilter],
    queryFn: () =>
      getUserGames({
        // Si el filtro es "all", mandamos undefined para que el backend no filtre
        status: statusFilter === "all" ? undefined : statusFilter,
        ownership: ownershipFilter === "all" ? undefined : ownershipFilter,
        // username: Si tu backend necesita el usuario explícito, lo pasas aquí.
        // Si usa el token de sesión (auth.getSession()), no hace falta.
      }),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8 min-h-screen">
      {/* ── ENCABEZADO ── */}
      <div className="relative bg-black border-2 border-purple-900 p-8 sm:p-12 shadow-[8px_8px_0px_0px_var(--color-calypso-DEFAULT)] overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-900/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-calypso-DEFAULT/50 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 border border-calypso-DEFAULT/40 bg-calypso-DEFAULT/10 px-3 py-1 mb-4">
              <span className="w-1.5 h-1.5 bg-calypso-DEFAULT animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-calypso-DEFAULT">
                Base de datos central
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black uppercase italic tracking-tighter text-white leading-none">
              Tu <span className="text-calypso-DEFAULT">Biblioteca</span>
            </h1>
          </div>
        </div>
      </div>

      {/* ── BARRA DE FILTROS ── */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-zinc-950 border border-white/5 p-4 rounded-xl">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest mr-auto">
          Filtros de búsqueda:
        </span>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1); // Resetear a la página 1 al cambiar de filtro
          }}
          className="w-full sm:w-auto bg-black border border-purple-900/50 text-white text-sm px-4 py-2 focus:border-calypso-DEFAULT focus:outline-none transition-colors cursor-pointer"
        >
          <option value="all">Todos los estados</option>
          <option value="playing">Jugando</option>
          <option value="completed">Completados</option>
          <option value="backlog">En espera</option>
          <option value="dropped">Abandonados</option>
        </select>

        <select
          value={ownershipFilter}
          onChange={(e) => {
            setOwnershipFilter(e.target.value);
            setPage(1); // Resetear a la página 1 al cambiar de filtro
          }}
          className="w-full sm:w-auto bg-black border border-purple-900/50 text-white text-sm px-4 py-2 focus:border-calypso-DEFAULT focus:outline-none transition-colors cursor-pointer"
        >
          <option value="all">Cualquier propiedad</option>
          <option value="digital">Digital</option>
          <option value="physical">Físico</option>
          <option value="none">Ninguno / Sub</option>
        </select>
      </div>

      {/* ── GRILLA DE JUEGOS ── */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="aspect-[3/4] w-full bg-zinc-900 border border-purple-900/20 animate-pulse rounded-lg" />
              <div className="h-4 w-3/4 bg-zinc-900 animate-pulse rounded" />
            </div>
          ))}
        </div>
      ) : !games || games.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-white/10 rounded-2xl">
          <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">
            No hay juegos aquí.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 px-4 justify-center">
          {games.map((game: GameLibrary) => (
            <GameCard key={game.igdb_id} game={libraryGameData(game)} />
          ))}
        </div>
      )}

      {/* ── PAGINACIÓN ── */}
      <div className="flex justify-center items-center gap-4 pt-8 border-t border-white/5">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || isLoading}
          className="px-6 py-2 border border-purple-900 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:border-calypso-DEFAULT disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Anterior
        </button>
        <span className="text-calypso-DEFAULT font-mono text-sm">
          Página {page}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          // Le decimos: "Si games no existe, asume que su length es 0. ¿Es 0 menor que 10? Sí (true)."
          disabled={isLoading || (games?.length ?? 0) < 10}
          className="px-6 py-2 border border-purple-900 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-white hover:border-calypso-DEFAULT disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Siguiente
        </button>
      </div>
    </main>
  );
}
