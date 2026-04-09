"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { addGameToLibrary } from "@/actions/user";
import { Status } from "@/types/games";

interface AddToListButtonProps {
  gameId: number;
  gameName: string;
}

export default function AddToListButton({ gameId, gameName }: AddToListButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mapeo de estados con estilos de acento para el modal
  const statusOptions: { value: Status; label: string; accent: string }[] = [
    { value: "playing", label: "Jugando Ahora", accent: "hover:border-calypso-DEFAULT hover:text-calypso-DEFAULT" },
    { value: "want_to_play", label: "Pendiente (Backlog)", accent: "hover:border-purple-400 hover:text-purple-400" },
    { value: "completed", label: "Completado", accent: "hover:border-green-400 hover:text-green-400" },
    { value: "on_hold", label: "En Pausa", accent: "hover:border-yellow-400 hover:text-yellow-400" },
    { value: "dropped", label: "Abandonado", accent: "hover:border-red-500 hover:text-red-500" },
  ];

  const handleSelectStatus = async (status: Status) => {
    setIsSubmitting(true);
    
    // Llamada a tu Server Action que ahora solo requiere ID y Status
    const result = await addGameToLibrary(gameId, status);
    
    if (result.success) {
      console.log(`[SISTEMA] ${gameName} actualizado a: ${status}`);
      setIsOpen(false);
    } else {
      alert("Error al conectar con la base de datos: " + result.error);
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
          Añadir a Colección
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
              Estado de Sincronización
            </h2>
            <p className="text-calypso-DEFAULT font-mono text-[10px] uppercase mb-6 border-b border-purple-900/50 pb-4">
              ID_TARGET: {gameId} // {gameName}
            </p>

            {/* Opciones */}
            <div className="flex flex-col gap-3">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelectStatus(option.value)}
                  disabled={isSubmitting}
                  className={`
                    relative w-full px-4 py-4 bg-black text-white font-mono font-bold uppercase text-xs text-left 
                    border-2 border-purple-900/40 transition-all group overflow-hidden
                    ${option.accent} 
                    disabled:opacity-50 disabled:cursor-not-allowed
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

            {/* Decoración estética de los bordes */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-calypso-DEFAULT" />
          </div>
        </div>
      )}
    </>
  );
}