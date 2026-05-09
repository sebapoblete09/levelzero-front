"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "@/actions/reviews";
import { Review } from "@/types/review";

export function ReviewsSection() {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["userReviews"],
    queryFn: getUserReviews,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <section className="rounded-[2rem] border border-purple-900/50 bg-black/40 p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-calypso-DEFAULT">
            Mis reseñas
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tighter mt-3">
            {reviews && reviews.length > 0 ? `${reviews.length} Reseña${reviews.length > 1 ? 's' : ''}` : 'Aún no hay reseñas'}
          </h2>
        </div>
        {reviews && reviews.length > 0 && (
          <a
            href="/reviews"
            className="inline-flex items-center justify-center w-auto rounded-lg border-2 border-calypso-DEFAULT bg-calypso-DEFAULT px-4 py-2 text-xs font-bold uppercase text-black transition-all hover:bg-transparent hover:text-calypso-DEFAULT"
          >
            Ver todas
          </a>
        )}
      </div>

      {isLoading ? (
        <div className="mt-8 rounded-3xl border border-purple-900/30 bg-zinc-950/80 p-8 text-center">
          <p className="text-gray-400 animate-pulse">Cargando reseñas...</p>
        </div>
      ) : reviews && reviews.length > 0 ? (
        <div className="mt-8 space-y-4">
          {reviews.map((review: Review, index: number) => (
            <div
              key={index}
              className="rounded-xl border border-purple-900/30 bg-zinc-950/80 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <a
                  href={`/game/${review.igdb_id}`}
                  className="text-calypso-DEFAULT font-bold uppercase hover:underline"
                >
                  Ver Juego (ID: {review.igdb_id})
                </a>
                {review.is_spoiler && (
                  <span className="px-2 py-1 text-xs font-bold uppercase bg-red-900/30 border border-red-500 text-red-400">
                    Spoiler
                  </span>
                )}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {review.content}
              </p>
              <div className="mt-3 text-xs text-gray-500 font-mono">
                {review.created_at && new Date(review.created_at).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
                {review.updated_at && review.updated_at !== review.created_at && (
                  <span className="ml-2">(editado)</span>
                )}
              </div>
            </div>
          ))}
        </div>
) : (
        <div className="mt-8 space-y-4">
          {reviews.slice(0, 3).map((review: Review, index: number) => (
            <div
              key={index}
              className="rounded-xl border border-purple-900/30 bg-zinc-950/80 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <a
                  href={`/game/${review.igdb_id}`}
                  className="text-calypso-DEFAULT font-bold uppercase hover:underline"
                >
                  Ver Juego (ID: {review.igdb_id})
                </a>
                {review.is_spoiler && (
                  <span className="px-2 py-1 text-xs font-bold uppercase bg-red-900/30 border border-red-500 text-red-400">
                    Spoiler
                  </span>
                )}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {review.content}
              </p>
              <div className="mt-3 text-xs text-gray-500 font-mono">
                {review.created_at && new Date(review.created_at).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
                {review.updated_at && review.updated_at !== review.created_at && (
                  <span className="ml-2">(editado)</span>
                )}
              </div>
            </div>
          ))}
          {reviews.length > 3 && (
            <a
              href="/reviews"
              className="block text-center text-calypso-DEFAULT font-bold uppercase text-sm mt-4 hover:underline"
            >
              Ver todas las reseñas ({reviews.length})
            </a>
          )}
        </div>
      )}
    </section>
  );
}