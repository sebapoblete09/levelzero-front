"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "@/actions/reviews";
import { Review } from "@/types/review";

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
          {reviews?.length || 0} Reseña{(reviews?.length || 0) !== 1 ? 's' : ''}
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
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <a
                    href={`/game/${review.igdb_id}`}
                    className="text-calypso-DEFAULT font-bold uppercase hover:underline"
                  >
                    Ver Juego (ID: {review.igdb_id})
                  </a>
                  <div className="flex items-center gap-2">
                    {review.is_spoiler && (
                      <span className="px-2 py-1 text-xs font-bold uppercase bg-red-900/30 border border-red-500 text-red-400">
                        Spoiler
                      </span>
                    )}
                    <span className="text-xs text-gray-500 font-mono">
                      {review.created_at && new Date(review.created_at).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                      {review.updated_at && review.updated_at !== review.created_at && (
                        <span className="ml-2">(editado)</span>
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