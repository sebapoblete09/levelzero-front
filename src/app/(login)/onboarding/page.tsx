"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function OnboardingPage() {
  
  // Función temporal solo para visualizar que el botón responde
  const handleDummySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit presionado - Aquí irá la Server Action después");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Decoración de fondo: Patrón de puntos estilo cómic/manga */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,1)_2px,transparent_2px)] bg-[size:16px_16px]" />

      <form 
        onSubmit={handleDummySubmit}
        className="relative z-10 max-w-md w-full bg-black border-2 border-purple-DEFAULT p-10 shadow-[12px_12px_0px_0px_var(--calypso-main)]"
      >
        {/* Adorno superior izquierdo */}
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-calypso-DEFAULT" />

        <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">
          Reclama tu <span className="text-calypso-DEFAULT">ID</span>
        </h1>
        <p className="text-muted-foreground font-mono text-sm uppercase mb-8 border-b border-purple-900/50 pb-4 tracking-widest">
          Base de datos: Nivel Cero
        </p>

        <div className="space-y-8">
          {/* Campo Username */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-white uppercase tracking-wider block">
              Gamer Tag (Único)
            </label>
            <Input 
              type="text" 
              placeholder="Ej: joker_p5" 
              className="h-14 bg-purple-900/10 border-2 border-purple-900/50 focus-visible:ring-0 focus-visible:border-calypso-DEFAULT text-white rounded-none text-lg font-mono transition-colors"
            />
            <p className="text-xs text-muted-foreground font-mono">
              Este será tu nombre público en las reseñas.
            </p>
          </div>

          {/* Botón de Submit */}
          <Button 
            type="submit"
            className="w-full group relative h-14 bg-white text-black hover:bg-calypso-DEFAULT rounded-none border-2 border-transparent hover:border-white transition-all overflow-hidden"
          >
            <span className="font-bold text-lg relative z-10 uppercase tracking-widest">
              Ingresar al Sistema
            </span>
            {/* Efecto visual de barrido al hacer hover */}
            <div className="absolute inset-0 h-full w-0 bg-calypso-DEFAULT transform skew-x-[-20deg] -ml-4 transition-all duration-300 group-hover:w-[120%]" />
          </Button>
        </div>
      </form>
    </div>
  );
}