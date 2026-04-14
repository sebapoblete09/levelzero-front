"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { addGameToLibrary } from "@/actions/user";
import { status } from "@/types/games";
import { addGame, owner } from "@/types/library";

interface AddToListButtonProps {
  gameId: number;
  gameName: string;
  isInLibrary?: boolean;
  currentStatus?: status;
  currentOwnership?: owner;
}

export default function AddToListButton({
  gameId,
  gameName,
  isInLibrary = false,
  currentStatus,
  currentOwnership,
}: AddToListButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<addGame>({
    ownership: currentOwnership || "none",
    status: currentStatus || "want_to_play",
  });
  // Mapeo de estados con estilos de acento para el modal
  const statusOptions: { value: status; label: string; accent: string }[] = [
    {
      value: "playing",
      label: "Jugando Ahora",
      accent: "hover:border-calypso-DEFAULT hover:text-calypso-DEFAULT",
    },
    {
      value: "want_to_play",
      label: "Pendiente (Backlog)",
      accent: "hover:border-purple-400 hover:text-purple-400",
    },
    {
      value: "completed",
      label: "Completado",
      accent: "hover:border-green-400 hover:text-green-400",
    },
    {
      value: "on_hold",
      label: "En Pausa",
      accent: "hover:border-yellow-400 hover:text-yellow-400",
    },
    {
      value: "dropped",
      label: "Abandonado",
      accent: "hover:border-red-500 hover:text-red-500",
    },
  ];

  const ownershipOptions: { value: string; label: string; accent: string }[] = [
    {
      value: "none",
      label: "Ninguno",
      accent: "hover:border-gray-400 hover:text-gray-400",
    },
    {
      value: "physical",
      label: "Físico",
      accent: "hover:border-blue-400 hover:text-blue-400",
    },
    {
      value: "digital",
      label: "Digital",
      accent: "hover:border-cyan-400 hover:text-cyan-400",
    },
  ];

  const handleChange = (name: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleData = async (addData: addGame) => {
    setIsSubmitting(true);

    // Llamada a tu Server Action que ahora solo requiere ID y Status
    const result = await addGameToLibrary(gameId, addData);

    if (result.success) {
      console.log(
        `[SISTEMA] ${gameName} ${isInLibrary ? "actualizado" : "agregado"} a: ${addData.ownership}, ${addData.status}`,
      );
      setIsOpen(false);
    } else {
      alert(
        `Error al ${isInLibrary ? "actualizar" : "agregar"} el juego a la biblioteca: ${result.error}`,
      );
    }

    setIsSubmitting(false);
  };

  return (
    <>
      {/* BOTÓN PRINCIPAL (EL QUE DISPARA EL MODAL) */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-6 relative h-14 bg-white text-black hover:bg-calypso-DEFAULT rounded-none border-2 border-transparent hover:border-white transition-all overflow-hidden group"
      >
        <span className="font-bold text-lg relative z-10 uppercase tracking-widest">
          {isInLibrary ? "Editar Estado" : "Añadir a Colección"}
        </span>
        <div className="absolute inset-0 h-full w-0 bg-calypso-DEFAULT transform skew-x-[-20deg] -ml-4 transition-all duration-300 group-hover:w-[120%]" />
      </button>

      {/* OVERLAY Y MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop con Blur */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => !isSubmitting && setIsOpen(false)}
          />

          {/* Contenedor del Modal */}
          <div className="relative z-10 bg-black border-2 border-purple-900 p-6 sm:p-8 max-w-sm w-full shadow-[12px_12px_0px_0px_var(--color-calypso-DEFAULT)] animate-in zoom-in-95 duration-200">
            {/* Cerrar */}
            {!isSubmitting && (
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-purple-900 hover:text-red-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            )}

            <h2 className="text-xl font-black uppercase italic tracking-tighter text-white mb-1">
              {isInLibrary ? "Editar Estado" : "Agregar a Colección"}
            </h2>
            <p className="text-calypso-DEFAULT font-mono text-[10px] uppercase mb-6 border-b border-purple-900/50 pb-4">
              ID_TARGET: {gameId} {gameName}
            </p>

            {/* Ownership Options */}
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase text-white mb-3">
                Propiedad
              </h3>
              <div className="flex flex-col gap-2">
                {ownershipOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleChange("ownership", option.value)}
                    disabled={isSubmitting}
                    className={`
                      relative w-full px-4 py-3 bg-black text-white font-mono font-bold uppercase text-xs text-left 
                      border-2 border-purple-900/40 transition-all group overflow-hidden
                      ${option.accent} 
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${data.ownership === option.value ? "border-white text-white" : ""}
                    `}
                  >
                    <span className="relative z-10 flex items-center justify-between">
                      {option.label}
                      {data.ownership === option.value && (
                        <span className="text-[9px]">[SELECCIONADO]</span>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            {/* Status Options */}
            <div className="mb-6">
              <h3 className="text-sm font-bold uppercase text-white mb-3">
                Estado
              </h3>
              <div className="flex flex-col gap-3">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleChange("status", option.value)}
                    disabled={isSubmitting}
                    className={`
                      relative w-full px-4 py-4 bg-black text-white font-mono font-bold uppercase text-xs text-left 
                      border-2 border-purple-900/40 transition-all group overflow-hidden
                      ${option.accent} 
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${data.status === option.value ? "border-white text-white" : ""}
                    `}
                  >
                    <span className="relative z-10 flex items-center justify-between">
                      {option.label}
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin text-calypso-DEFAULT" />
                      ) : (
                        <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">
                          [EXECUTE]
                        </span>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={() => handleData(data)}
              disabled={isSubmitting}
              className="w-full mt-4 relative h-12 bg-calypso-DEFAULT text-black hover:bg-white rounded-none border-2 border-transparent hover:border-calypso-DEFAULT transition-all overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-bold text-sm relative z-10 uppercase tracking-widest">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                    {isInLibrary ? "Actualizando..." : "Agregando..."}
                  </>
                ) : isInLibrary ? (
                  "Actualizar Estado"
                ) : (
                  "Agregar Juego"
                )}
              </span>
              <div className="absolute inset-0 h-full w-0 bg-white transform skew-x-[-20deg] -ml-4 transition-all duration-300 group-hover:w-[120%]" />
            </button>

            {/* Decoración estética de los bordes */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-calypso-DEFAULT" />
          </div>
        </div>
      )}
    </>
  );
}

//agregar para elegir si lo tiene o no, y si es fisico o digital
