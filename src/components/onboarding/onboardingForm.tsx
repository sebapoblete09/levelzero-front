"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserUpdate, Platform } from "@/types/user";
import { platforms } from "@/const/platform";
import { updateUserProfile } from "@/actions/user";
import { useRouter } from "next/navigation";

export default function OnboardingForm({ initialDisplay_name }: { initialDisplay_name: string }) {
  const AVAILABLE_PLATFORMS = platforms;
  const [error, setError] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false); // <-- Nuevo estado para el modal
  const router = useRouter();

  const [formData, setFormData] = useState<UserUpdate>({
    username: "", 
    display_name: initialDisplay_name,
    preferred_platforms: [],
    onboarding_completed: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (error) setError(""); 
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePlatform = (platform: Platform) => {
    setFormData((prev) => {
      const isSelected = prev.preferred_platforms.some((p) => p.id === platform.id);
      return {
        ...prev,
        preferred_platforms: isSelected
          ? prev.preferred_platforms.filter((p) => p.id !== platform.id)
          : [...prev.preferred_platforms, platform],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    
    const rawUsername = formData.username.trim();
    const rawDisplayName = formData.display_name.trim();

    if (!rawUsername || !rawDisplayName) {
      setError("El Nombre y el Gamer Tag son obligatorios.");
      return;
    }

    if (rawUsername.length < 3 || rawUsername.length > 15) {
      setError("El Gamer Tag debe tener entre 3 y 15 caracteres.");
      return;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(rawUsername)) {
      setError("El Gamer Tag solo puede contener letras, números y guiones bajos (_). Sin espacios.");
      return;
    }

    const finalDataToSend = {
      ...formData,
      username: `@${rawUsername}`,
      display_name: rawDisplayName,
    };

    console.log("Datos validados listos para el backend:", finalDataToSend);
    
    const result = await updateUserProfile(finalDataToSend);

    if (!result) {
      setError("Error inesperado al contactar con el servidor. Intenta de nuevo.");
      return;
    }

    if (!result.success) {
      setError(String(result.error)); 
      return;
    }

    // En lugar de redirigir aquí, activamos el modal
    setShowSuccessModal(true);
  };

  // Función para cerrar el modal y redirigir
  const handleContinue = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,1)_2px,transparent_2px)] bg-[size:16px_16px]" />

      {/* --- FORMULARIO PRINCIPAL --- */}
      <form 
        onSubmit={handleSubmit}
        className={`relative z-10 max-w-md w-full bg-black border-2 border-purple-DEFAULT p-10 shadow-[12px_12px_0px_0px_var(--color-calypso-DEFAULT)] transition-opacity duration-300 ${showSuccessModal ? "opacity-50 pointer-events-none blur-sm" : ""}`}
      >
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-calypso-DEFAULT" />

        <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">
          Reclama tu <span className="text-calypso-DEFAULT">ID</span>
        </h1>
        <p className="text-muted-foreground font-mono text-sm uppercase mb-8 border-b border-purple-900/50 pb-4 tracking-widest">
          Base de datos: Nivel Cero
        </p>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-white uppercase tracking-wider block">
              Nombre a Mostrar
            </label>
            <Input 
              type="text" 
              name="display_name"
              value={formData.display_name}
              onChange={handleChange}
              placeholder="Ej: Sebastián"
              className="h-12 bg-purple-900/10 border-2 border-purple-900/50 focus-visible:ring-0 focus-visible:border-calypso-DEFAULT text-white rounded-none font-mono transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-white uppercase tracking-wider block">
              Gamer Tag (Único)
            </label>
            <div className="flex relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-calypso-DEFAULT font-bold font-mono">
                @
              </span>
              <Input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="seba_dev" 
                className="h-12 pl-8 bg-purple-900/10 border-2 border-purple-900/50 focus-visible:ring-0 focus-visible:border-calypso-DEFAULT text-white rounded-none font-mono transition-colors w-full"
              />
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              Solo letras, números y guiones bajos (3-15 caracteres).
            </p>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500 p-3 text-red-400 text-sm font-bold animate-pulse">
              [ERROR] {error}
            </div>
          )}

          <div className="space-y-3 pt-2">
            <label className="text-sm font-bold text-white uppercase tracking-wider block">
              Plataformas Base
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_PLATFORMS.map((platform) => {
                const isSelected = formData.preferred_platforms.some(p => p.id === platform.id);
                return (
                  <button
                    key={platform.id}
                    type="button"
                    onClick={() => togglePlatform(platform)}
                    className={`px-3 py-2 text-xs font-bold uppercase font-mono transition-all border-2 rounded-none
                      ${isSelected 
                        ? "bg-calypso-DEFAULT text-black border-calypso-DEFAULT shadow-[4px_4px_0px_0px_var(--color-purple-DEFAULT)] translate-y-[-2px] translate-x-[-2px]" 
                        : "bg-black text-muted-foreground border-purple-900/50 hover:border-calypso-DEFAULT/50 hover:text-white"
                      }`}
                  >
                    {platform.name}
                  </button>
                );
              })}
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full group relative h-14 bg-white text-black hover:bg-calypso-DEFAULT rounded-none border-2 border-transparent hover:border-white transition-all overflow-hidden mt-8"
          >
            <span className="font-bold text-lg relative z-10 uppercase tracking-widest">
              Ingresar al Sistema
            </span>
            <div className="absolute inset-0 h-full w-0 bg-calypso-DEFAULT transform skew-x-[-20deg] -ml-4 transition-all duration-300 group-hover:w-[120%]" />
          </Button>
        </div>
      </form>

      {/* --- MODAL DE ÉXITO --- */}
      {showSuccessModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          
          <div className="relative z-10 bg-black border-4 border-calypso-DEFAULT p-8 max-w-sm w-full shadow-[16px_16px_0px_0px_var(--color-purple-DEFAULT)] animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center space-y-6">
              
              <div className="w-16 h-16 bg-calypso-DEFAULT flex items-center justify-center rotate-45 mb-2">
                <span className="text-black font-black text-3xl -rotate-45">!</span>
              </div>

              <div>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">
                  Registro Exitoso
                </h2>
                <p className="text-muted-foreground font-mono text-sm">
                  Tus datos han sido sincronizados. Bienvenido a la base de datos de Level Zero, <span className="text-calypso-DEFAULT font-bold">@{formData.username.replace('@', '')}</span>.
                </p>
              </div>

              <Button 
                onClick={handleContinue}
                className="w-full relative h-12 bg-calypso-DEFAULT text-black hover:bg-white rounded-none border-2 border-transparent transition-all overflow-hidden"
              >
                <span className="font-bold uppercase tracking-widest relative z-10">
                  Continuar
                </span>
              </Button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}