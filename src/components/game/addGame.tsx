"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { addGameToLibrary, updateGameToLibrary } from "@/actions/user";
import { status } from "@/types/games";
import { addGame, owner } from "@/types/library";
import { ModalTrigger } from "./addGameComponents/modalTrigger";
import { SelectionGroup } from "./addGameComponents/selectionGroup";
import { OWNERSHIP_OPTIONS, STATUS_OPTIONS } from "@/const/addGame";
import { RatingGroup } from "./addGameComponents/ratingGroup";
import { SubmitButton } from "./addGameComponents/submitButton";

interface AddToListButtonProps {
  gameId: number;
  gameName: string;
  isInLibrary?: boolean;
  currentStatus?: status;
  currentOwnership?: owner;
  currentRaiting?: number | null;
}

export default function AddToListButton({
  gameId,
  gameName,
  isInLibrary = false,
  currentStatus,
  currentOwnership,
  currentRaiting,
}: AddToListButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Nota: Corregí el mapeo interno de "raiting" a "rating" para mantener consistencia
  const [data, setData] = useState<addGame>({
    ownership: currentOwnership || "none",
    status: currentStatus || "want_to_play",
    rating: currentRaiting || 1,
  });

  const handleChange = (name: keyof addGame, value: string | number) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleData = async () => {
    setIsSubmitting(true);

    try {
      const result = isInLibrary
        ? await updateGameToLibrary(gameId, data)
        : await addGameToLibrary(gameId, data);

      if (result.success) {
        console.log(
          `[SISTEMA] ${gameName} ${isInLibrary ? "actualizado" : "agregado"} a: ${data.ownership}, ${data.status}`,
        );
        setSuccessMessage(
          `${gameName} ${isInLibrary ? "actualizado" : "agregado"} exitosamente.`,
        );
        setTimeout(() => {
          setIsOpen(false);
          setSuccessMessage(null);
        }, 3000);
      } else {
        alert(
          `Error al ${isInLibrary ? "actualizar" : "agregar"} el juego: ${result.error}`,
        );
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Ocurrió un error inesperado al procesar la solicitud.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ModalTrigger onClick={() => setIsOpen(true)} isInLibrary={isInLibrary} />

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 ">
          {/* Backdrop con Blur */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => !isSubmitting && setIsOpen(false)}
          />

          {/* Contenedor del Modal Responsivo */}
          <div className="overflow-x-hidden relative z-10 bg-black border-2 border-purple-900 p-6 sm:p-8 w-full max-w-[95vw] md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto shadow-none md:shadow-[12px_12px_0px_0px_var(--color-calypso-DEFAULT)] scrollbar-thin scrollbar-thumb-purple-900 animate-in zoom-in-95 duration-200">
            {" "}
            {!isSubmitting && (
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-purple-900 hover:text-red-500 transition-colors p-2"
                aria-label="Cerrar modal"
              >
                <X className="w-6 h-6" />
              </button>
            )}
            <div className="pr-8">
              <h2 className="text-xl sm:text-2xl font-black uppercase italic tracking-tighter text-white mb-1 break-words">
                {isInLibrary ? "Editar Estado" : "Agregar a Colección"}
              </h2>
              <p className="text-calypso-DEFAULT font-mono text-[10px] sm:text-xs uppercase mb-6 border-b border-purple-900/50 pb-4 break-words">
                ID_TARGET: {gameId} {gameName}
              </p>
            </div>
            {successMessage ? (
              <div className="text-center py-12">
                <p className="text-green-400 font-bold text-lg animate-pulse">
                  {successMessage}
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                {/* Grilla Responsiva: 1 col móvil, 2 cols tablet, 3 cols desktop */}
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

                <div className="mt-auto pt-4">
                  <SubmitButton
                    onClick={handleData}
                    isSubmitting={isSubmitting}
                    isInLibrary={isInLibrary}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
