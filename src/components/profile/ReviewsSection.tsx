"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserReviews } from "@/actions/reviews";
import { Review } from "@/types/review";
import Image from "next/image";

export function ReviewsSection() {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["userReviews"],
    queryFn: getUserReviews,
    staleTime: 1000 * 60 * 5,
  });

  // Guardamos esta validación en una variable para que el código sea más legible
  const hasReviews = reviews && reviews.length > 0;

  return (
    <section className="rounded-[2rem] border border-purple-900/50 bg-black/40 p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.35em] text-calypso-DEFAULT">
            Mis reseñas
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tighter mt-3">
            {hasReviews
              ? `${reviews.length} Reseña${reviews.length > 1 ? "s" : ""}`
              : "Aún no hay reseñas"}
          </h2>
        </div>
        {hasReviews && (
          <a
            href="/reviews"
            className="inline-flex items-center justify-center w-auto rounded-lg border-2 border-calypso-DEFAULT bg-calypso-DEFAULT px-4 py-2 text-xs font-bold uppercase text-black transition-all hover:bg-transparent hover:text-calypso-DEFAULT"
          >
            Ver todas
          </a>
        )}
      </div>

      {isLoading ? (
        // ESTADO 1: CARGANDO
        <div className="mt-8 rounded-3xl border border-purple-900/30 bg-zinc-950/80 p-8 text-center">
          <p className="text-gray-400 animate-pulse">Cargando reseñas...</p>
        </div>
      ) : !hasReviews ? (
        // ESTADO 2: SIN RESEÑAS
        <div className="mt-8 rounded-3xl border border-purple-900/30 bg-zinc-950/80 p-8 text-center">
          <p className="text-gray-400">
            No has escrito ninguna reseña todavía.
          </p>
        </div>
      ) : (
        // ESTADO 3: CON RESEÑAS (Mostramos máximo 3)
        <div className="mt-8 space-y-4">
          {reviews.slice(0, 3).map((review: Review, index: number) => (
            <div
              key={index}
              className="rounded-xl border border-purple-900/30 bg-zinc-950/80 p-4"
            >
              <div className="flex items-start justify-between mb-4 gap-4">
                {/* Grupo Izquierdo: Portada + Nombre del juego */}
                <div className="flex items-center gap-4">
                  <a
                    href={`/game/${review.igdb_id}`}
                    className="group relative h-20 w-14 flex-shrink-0 overflow-hidden rounded border border-purple-900/50 bg-zinc-900 sm:h-24 sm:w-16"
                  >
                    {review.cover && (
                      <Image
                        src={review.cover}
                        alt={`Portada de ${review.name}`}
                        fill
                        sizes="(max-width: 768px) 56px, 64px"
                        className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
                      />
                    )}
                  </a>

                  <a
                    href={`/game/${review.igdb_id}`}
                    className="text-calypso-DEFAULT font-bold uppercase hover:underline sm:text-lg line-clamp-2"
                  >
                    {review.name}
                  </a>
                </div>

                {/* Grupo Derecho: Tag de Spoiler */}
                {review.is_spoiler && (
                  <span className="flex-shrink-0 px-2 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-red-900/30 border border-red-500 text-red-400 mt-1">
                    Spoiler
                  </span>
                )}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {review.content}
              </p>
              <div className="mt-3 text-xs text-gray-500 font-mono">
                {review.created_at &&
                  new Date(review.created_at).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                {review.updated_at &&
                  review.updated_at !== review.created_at && (
                    <span className="ml-2">(editado)</span>
                  )}
              </div>
            </div>
          ))}

          {/* Botón inferior si hay más de 3 reseñas */}
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
