// app/(main)/games/page.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { getGamesByName } from "@/actions/games";
import Image from "next/image";

export default function GamesResultsPage() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["gamesSearch", q], 
    queryFn: () => getGamesByName(q),
    enabled: q.length >= 2, 
    staleTime: 1000 * 60 * 5, 
  });

  if (isLoading) return <div className="p-10 text-center animate-pulse font-mono uppercase">Sincronizando con la base de datos...</div>;
  
  if (isError) return <div className="p-10 text-red-500 text-center">Error al recuperar datos del sistema.</div>;

  return (
    <main className="container mx-auto p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-black italic uppercase mb-8 border-l-4 border-calypso-DEFAULT pl-4">
        Resultados para: <span className="text-calypso-DEFAULT">{q}</span> 
        <span className="text-muted-foreground text-lg ml-2 font-mono">[{data?.count || 0}]</span>
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {data?.results.map((game) => {
          let imageUrl = "/placeholder.png"; 
          
          if (game.cover && game.cover.url) {
            imageUrl = `https:${game.cover.url.replace('t_thumb', 't_cover_big')}`;
          }

          return (
            <div 
              key={game.id} 
              // 1. Aquí está la magia: flex-row en móvil, sm:flex-col en escritorio
              className="bg-black border-2 border-purple-900 p-3 sm:p-4 shadow-[6px_6px_0px_0px_var(--color-calypso-DEFAULT)] sm:shadow-[8px_8px_0px_0px_var(--color-calypso-DEFAULT)] flex flex-row sm:flex-col group gap-4 sm:gap-0"
            >
               
               {/* Contenedor de la Imagen */}
               {/* 2. En móvil: ancho fijo de w-24 (96px). En escritorio: w-full. Mantenemos el aspect-[3/4] siempre */}
               <div className="relative shrink-0 w-24 sm:w-full aspect-[3/4] overflow-hidden sm:mb-4 border border-purple-900/50">
                 <Image 
                  src={imageUrl} 
                  alt={`Portada de ${game.name}`}
                  fill 
                  sizes="(max-width: 768px) 96px, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                 />
               </div>

               {/* Contenedor del Texto */}
               {/* 3. Ocupa el espacio sobrante con flex-1 y centra el texto verticalmente en móvil */}
               <div className="flex flex-col flex-1 justify-center sm:justify-end sm:mt-auto">
                 <h2 
                   className="font-bold uppercase tracking-tighter text-white sm:line-clamp-2 line-clamp-3 text-sm sm:text-base" 
                   title={game.name}
                 >
                   {game.name}
                 </h2>
                 {/* Aquí a futuro puedes agregar el año de salida o la consola debajo del nombre */}
               </div>
               
            </div>
          );
        })}
      </div>

      {data?.results.length === 0 && (
        <p className="text-muted-foreground font-mono mt-8">No se encontraron registros para esta búsqueda.</p>
      )}
    </main>
  );
}