"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserUpdate, Platform } from "@/types/user";
import { createClient } from "@/lib/supabase/client";
import {platforms} from "@/const/platform";

import { updateUserProfile } from "@/actions/user";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
  const supabase = createClient(); // Inicializamos Supabase
  const AVAILABLE_PLATFORMS = platforms
  const [error, setError] = useState<string>("")
  const router = useRouter();


  const [formData, setFormData] = useState<UserUpdate>({
    username: "", 
    display_name: "", // Lo iniciamos vacío
    preferred_platforms: [],
    onboarding_completed: true,
  });

  // Si el contexto tarda unos milisegundos en cargar, esto asegura que el input se llene
  useEffect(() => {
    const fetchGoogleData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Google guarda el nombre en 'full_name' dentro de 'user_metadata'
      if (user?.user_metadata?.full_name) {
        setFormData((prev) => ({ 
          ...prev, 
          display_name: user.user_metadata.full_name 
        }));
      }
    };

    fetchGoogleData();
  }, [supabase]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Limpiamos el error si el usuario empieza a escribir de nuevo
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
    setError(""); // Reiniciamos el error
    
    const rawUsername = formData.username.trim();
    const rawDisplayName = formData.display_name.trim();

    // --- 1. VALIDACIONES ---
    if (!rawUsername || !rawDisplayName) {
      setError("El Nombre y el Gamer Tag son obligatorios.");
      return;
    }

    if (rawUsername.length < 3 || rawUsername.length > 15) {
      setError("El Gamer Tag debe tener entre 3 y 15 caracteres.");
      return;
    }

    // Expresión regular: Solo permite letras (mayúsculas y minúsculas), números y guiones bajos
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(rawUsername)) {
      setError("El Gamer Tag solo puede contener letras, números y guiones bajos (_). Sin espacios.");
      return;
    }

    // --- 2. FORMATEO DE DATOS ---
    // Nos aseguramos de que el username lleve el "@" antes de mandarlo al backend
    const finalDataToSend = {
      ...formData,
      username: `@${rawUsername}`,
      display_name: rawDisplayName,
    };

    console.log("Datos validados listos para el backend:", finalDataToSend);
    
    // ==========================================
    // 🔌 AQUÍ CONECTARÁS TU SERVER ACTION
    // const result = await updateUserProfile(finalDataToSend);
    // if (result.success) router.push('/');
    // ==========================================
    const result = await updateUserProfile(finalDataToSend);

   if (!result) {
      setError("Error inesperado al contactar con el servidor. Intenta de nuevo.");
      return;
    }

    // 2. Ahora TypeScript sabe que 'result' existe de forma segura
    if (!result.success) {
      // Usamos String() por si el error viene en otro formato
      setError(String(result.error)); 
      return;
    }

    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,1)_2px,transparent_2px)] bg-[size:16px_16px]" />

      <form 
        onSubmit={handleSubmit}
        className="relative z-10 max-w-md w-full bg-black border-2 border-purple-DEFAULT p-10 shadow-[12px_12px_0px_0px_var(--color-calypso-DEFAULT)]"
      >
        <div className="absolute -top-3 -left-3 w-6 h-6 bg-calypso-DEFAULT" />

        <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">
          Reclama tu <span className="text-calypso-DEFAULT">ID</span>
        </h1>
        <p className="text-muted-foreground font-mono text-sm uppercase mb-8 border-b border-purple-900/50 pb-4 tracking-widest">
          Base de datos: Nivel Cero
        </p>

        <div className="space-y-6">
          
          {/* Campo Display Name */}
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

          {/* Campo Username con el "@" fijo en la UI */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-white uppercase tracking-wider block">
              Gamer Tag (Único)
            </label>
            <div className="flex relative">
              {/* El arroba fijo visual */}
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-calypso-DEFAULT font-bold font-mono">
                @
              </span>
              <Input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="seba_dev" 
                // Añadimos pl-8 (padding-left) para que el texto empiece después del "@"
                className="h-12 pl-8 bg-purple-900/10 border-2 border-purple-900/50 focus-visible:ring-0 focus-visible:border-calypso-DEFAULT text-white rounded-none font-mono transition-colors w-full"
              />
            </div>
            <p className="text-xs text-muted-foreground font-mono">
              Solo letras, números y guiones bajos (3-15 caracteres).
            </p>
          </div>

          {/* Mensaje de Error Visual */}
          {error && (
            <div className="bg-red-900/30 border border-red-500 p-3 text-red-400 text-sm font-bold animate-pulse">
              [ERROR] {error}
            </div>
          )}

          {/* Campo Plataformas */}
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

          {/* Botón de Submit */}
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
    </div>
  );
}