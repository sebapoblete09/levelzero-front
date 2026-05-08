import { Loader2 } from "lucide-react";

export const SubmitButton = ({
  onClick,
  isSubmitting,
  isInLibrary,
}: {
  onClick: () => void;
  isSubmitting: boolean;
  isInLibrary: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={isSubmitting}
    className="w-full mt-6 relative h-12 bg-calypso-DEFAULT text-black hover:bg-white rounded-none border-2 border-transparent hover:border-calypso-DEFAULT transition-all overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <span className="font-bold text-sm relative z-10 uppercase tracking-widest flex items-center justify-center">
      {isSubmitting ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
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
);
