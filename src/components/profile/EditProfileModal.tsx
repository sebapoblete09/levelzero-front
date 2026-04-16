"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserProfile, Platform, UserUpdate } from "@/types/user";
import { platforms } from "@/const/platform";
import { updateUserProfile } from "@/actions/user";

interface EditProfileModalProps {
  userData: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({
  userData,
  isOpen,
  onClose,
}: EditProfileModalProps) {
  const router = useRouter();
  const AVAILABLE_PLATFORMS = platforms;
  const [error, setError] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<UserUpdate>({
    username: userData.username?.replace(/^@/, "") || "",
    display_name: userData.display_name || "",
    preferred_platforms: userData.preferred_platforms.map(
      (name) =>
        AVAILABLE_PLATFORMS.find((platform) => platform.name === name) || {
          id: -1,
          name,
        },
    ),
    onboarding_completed: userData.onboarding_completed,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (error) setError("");
    const key = name as keyof Omit<
      UserUpdate,
      "preferred_platforms" | "onboarding_completed"
    >;
    const sanitizedValue =
      name === "username" ? value.replace(/^@/, "") : value;
    setFormData((prev) => ({ ...prev, [key]: sanitizedValue }));
  };

  const togglePlatform = (platform: Platform) => {
    setFormData((prev) => {
      const isSelected = prev.preferred_platforms.some(
        (p) => p.id === platform.id,
      );
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
    setShowSuccess(false);

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
      setError(
        "El Gamer Tag solo puede contener letras, números y guiones bajos (_). Sin espacios.",
      );
      return;
    }

    // TODO: Call server action here
    const finalDataToSend: UserUpdate = {
      ...formData,
      username: `@${rawUsername}`,
      preferred_platforms: formData.preferred_platforms.filter(
        (platform) => platform.id !== -1,
      ),
    };

    const result = await updateUserProfile(finalDataToSend);
    if (!result?.success) {
      setError(result?.error || "Error al actualizar el perfil.");
      return;
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      router.refresh();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 bg-black border-4 border-calypso-DEFAULT p-6 sm:p-8 max-w-md sm:max-w-lg w-full shadow-[16px_16px_0px_0px_var(--color-purple-DEFAULT)] animate-in zoom-in-95 duration-200">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl sm:text-3xl font-black uppercase italic tracking-tighter text-white">
              Editar Perfil
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                {AVAILABLE_PLATFORMS.map((platform) => {
                  const isSelected = formData.preferred_platforms.some(
                    (p) => p.id === platform.id,
                  );
                  return (
                    <button
                      key={platform.id}
                      type="button"
                      onClick={() => togglePlatform(platform)}
                      className={`px-3 py-2 text-xs font-bold uppercase font-mono transition-all border-2 rounded-none
                        ${
                          isSelected
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
                Guardar Cambios
              </span>
              <div className="absolute inset-0 h-full w-0 bg-calypso-DEFAULT transform skew-x-[-20deg] -ml-4 transition-all duration-300 group-hover:w-[120%]" />
            </Button>
          </form>

          {showSuccess && (
            <div className="bg-green-900/30 border border-green-500 p-3 text-green-400 text-sm font-bold animate-pulse text-center">
              Perfil actualizado exitosamente
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
