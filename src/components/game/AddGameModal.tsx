"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { addGameToLibrary, updateGameToLibrary } from "@/actions/user";
import { status } from "@/types/games";
import { addGame, owner } from "@/types/library";
import { ReviewCreate } from "@/types/review";
import { SelectionGroup } from "./addGameComponents/selectionGroup";
import { OWNERSHIP_OPTIONS, STATUS_OPTIONS } from "@/const/addGame";
import { RatingGroup } from "./addGameComponents/ratingGroup";
import { SubmitButton } from "./addGameComponents/submitButton";
import { createReview } from "@/actions/reviews";

interface AddGameModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: number;
  gameName: string;
  isInLibrary: boolean;
  currentStatus?: status;
  currentOwnership?: owner;
  currentRating?: number | null;
}

export function AddGameModal({
  isOpen,
  onClose,
  gameId,
  gameName,
  isInLibrary,
  currentStatus,
  currentOwnership,
  currentRating,
}: AddGameModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [data, setData] = useState<addGame>({
    ownership: currentOwnership || "none",
    status: currentStatus || "want_to_play",
    rating: currentRating || 1,
  });

  const [review, setReview] = useState<ReviewCreate>({
    content: "",
    is_spoiler: false,
  });

  const handleChange = (name: keyof addGame, value: string | number) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewChange = (
    field: keyof ReviewCreate,
    value: string | boolean,
  ) => {
    setReview((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const gameResult = isInLibrary
        ? await updateGameToLibrary(gameId, data)
        : await addGameToLibrary(gameId, data);

      const reviewResult = await createReview(gameId, review);

      if (gameResult.success && reviewResult.success) {
        setSuccessMessage(
          `${gameName} ${isInLibrary ? "actualizado" : "agregado"} exitosamente.`,
        );
        setTimeout(() => {
          onClose();
          setSuccessMessage(null);
          setReview({ content: "", is_spoiler: false });
        }, 3000);
      } else {
        alert(
          `Error al ${isInLibrary ? "actualizar" : "agregar"} el juego: ${gameResult.error}`,
        );
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Ocurrió un error inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ">
      <div
        className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
        onClick={() => !isSubmitting && onClose()}
      />
      <div className="overflow-x-hidden relative z-10 bg-black border-2 border-purple-900 p-6 sm:p-8 w-full max-w-[95vw] md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto shadow-none md:shadow-[12px_12px_0px_0px_var(--color-calypso-DEFAULT)] scrollbar-thin scrollbar-thumb-purple-900 animate-in zoom-in-95 duration-200">
        {!isSubmitting && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-purple-900 hover:text-red-500 transition-colors p-2"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        <div className="pr-8">
          <h2 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter text-white mb-1">
            {isInLibrary ? "Editar Estado" : "Agregar a Colección"}
          </h2>
          <p className="text-calypso-DEFAULT font-mono text-[10px] sm:text-xs uppercase mb-6 border-b border-purple-900/50 pb-4">
            ID: {gameId} | {gameName}
          </p>
        </div>
        {successMessage ? (
          <div className="text-center py-12">
            <p className="text-green-400 font-bold text-lg animate-pulse">
              {successMessage}
            </p>
          </div>
        ) : (
          <div className="flex flex-col h-full space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <SelectionGroup
                title="Propiedad"
                options={OWNERSHIP_OPTIONS}
                currentValue={data.ownership}
                onChange={(val) => handleChange("ownership", val)}
                disabled={isSubmitting}
              />
              <SelectionGroup
                title="Estado"
                options={STATUS_OPTIONS}
                currentValue={data.status}
                onChange={(val) => handleChange("status", val)}
                disabled={isSubmitting}
                isSubmitting={isSubmitting}
              />
              <RatingGroup
                currentValue={data.rating}
                onChange={(val) => handleChange("rating", val)}
                disabled={isSubmitting}
              />
            </div>

            <div className="border-t border-purple-900/30 pt-4">
              <label className="text-sm font-bold text-white uppercase tracking-wider block mb-2">
                Reseña (opcional)
              </label>
              <textarea
                value={review.content}
                onChange={(e) => handleReviewChange("content", e.target.value)}
                placeholder="Escribe tu opinión sobre el juego..."
                className="w-full h-24 bg-purple-900/10 border-2 border-purple-900/50 focus-visible:ring-0 focus-visible:border-calypso-DEFAULT text-white rounded-none font-mono transition-colors p-3 resize-none"
                disabled={isSubmitting}
              />
              <label className="flex items-center gap-2 cursor-pointer mt-2">
                <input
                  type="checkbox"
                  checked={review.is_spoiler}
                  onChange={(e) =>
                    handleReviewChange("is_spoiler", e.target.checked)
                  }
                  className="w-5 h-5 accent-calypso-DEFAULT"
                  disabled={isSubmitting}
                />
                <span className="text-sm text-gray-400 font-mono uppercase">
                  Contiene spoilers
                </span>
              </label>
            </div>

            <div className="mt-auto pt-4">
              <SubmitButton
                onClick={handleSubmit}
                isSubmitting={isSubmitting}
                isInLibrary={isInLibrary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
