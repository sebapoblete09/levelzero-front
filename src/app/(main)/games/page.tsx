// app/(main)/games/page.tsx
"use client";




import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getGamesByName } from "@/actions/games";
// Importa tus componentes de GameCard aquí

export default function GamesResultsPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  // TanStack Query manejará la caché por nosotros
  const { data, isLoading, isError } = useQuery({
    // La 'queryKey' es única para cada búsqueda. 
    // Si buscas "Persona 3" dos veces, React Query lo sabrá.
    queryKey: ["gamesSearch", q], 
    queryFn: () => getGamesByName(q),
    enabled: q.length >= 2, // Solo ejecuta si hay búsqueda
    staleTime: 1000 * 60 * 5, // 5 minutos de caché absoluta
  });

  if (isLoading) return <div className="p-10 text-center animate-pulse font-mono uppercase">Sincronizando con la base de datos...</div>;
  
  if (isError) return <div className="p-10 text-red-500 text-center">Error al recuperar datos del sistema.</div>;

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-black italic uppercase mb-8 border-l-4 border-calypso-DEFAULT pl-4">
        Resultados obtenidos para: <span className="text-calypso-DEFAULT">{q} : {data?.count}</span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.results.map((game) => (
          <div key={game.id} className="bg-black border-2 border-purple-900 p-4 shadow-[8px_8px_0px_0px_rgba(0,240,255,0.2)]">
             {/* Aquí renderizas tu GameCard */}
             <p className="font-bold uppercase tracking-tighter">{game.name}</p>
          </div>
        ))}
      </div>

      {data?.results.length === 0 && (
        <p className="text-muted-foreground font-mono">No se encontraron registros para esta búsqueda.</p>
      )}
    </main>
  );
}