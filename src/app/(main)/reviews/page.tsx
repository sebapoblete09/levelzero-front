"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "@/actions/reviews";
import { Review } from "@/types/review";
import Image from "next/image";

export default function ReviewsPage() {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["userReviews"],
    queryFn: getUserReviews,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <main className="container mx-auto p-4 sm:p-8 min-h-screen">
      <div className="bg-black border-2 border-purple-900 p-6 sm:p-10 shadow-[12px_12px_0px_0px_var(--color-calypso-DEFAULT)]">
        <h1 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-white mb-2">
          Mis Reseñas
        </h1>
        <p className="text-calypso-DEFAULT font-mono text-sm uppercase mb-8">
          {reviews?.length || 0} Reseña{(reviews?.length || 0) !== 1 ? "s" : ""}
        </p>

        {isLoading ? (
          <div className="text-center py-12 animate-pulse font-mono uppercase text-gray-400">
            Cargando reseñas...
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review: Review, index: number) => (
              <div
                key={index}
                className="rounded-xl border border-purple-900/50 bg-zinc-950/80 p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  {/* Grupo Izquierdo: Portada + Nombre del juego */}
                  <div className="flex items-center gap-4">
                    <a
                      href={`/game/${review.igdb_id}`}
                      className="group relative h-16 w-12 flex-shrink-0 overflow-hidden rounded border border-purple-900/50 bg-zinc-900 sm:h-20 sm:w-14"
                    >
                      {review.cover && (
                        <Image
                          src={review.cover}
                          alt={`Portada de ${review.name}`}
                          fill
                          sizes="(max-width: 768px) 48px, 56px"
                          className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
                        />
                      )}
                    </a>
                    <a
                      href={`/game/${review.igdb_id}`}
                      className="text-calypso-DEFAULT font-bold uppercase hover:underline sm:text-lg line-clamp-2 leading-tight"
                    >
                      {review.name}
                    </a>
                  </div>

                  {/* Grupo Derecho: Tag de Spoiler + Fechas */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-2 mt-2 sm:mt-0">
                    {review.is_spoiler && (
                      <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest bg-red-900/30 border border-red-500 text-red-400">
                        Spoiler
                      </span>
                    )}
                    <span className="text-[10px] sm:text-xs text-gray-500 font-mono text-left sm:text-right flex flex-wrap sm:flex-col gap-1 items-center sm:items-end">
                      {review.created_at &&
                        new Date(review.created_at).toLocaleDateString(
                          "es-ES",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      {review.updated_at &&
                        review.updated_at !== review.created_at && (
                          <span className="text-gray-600">(editado)</span>
                        )}
                    </span>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {review.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-purple-900/30 bg-zinc-950/80 p-8 text-center">
            <p className="text-gray-400 mb-4">No hay reseñas disponibles.</p>
            <a
              href="/games"
              className="text-calypso-DEFAULT font-bold uppercase hover:underline"
            >
              Explorar juegos →
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
