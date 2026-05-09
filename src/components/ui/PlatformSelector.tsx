"use client";

import { Platform } from "@/types/user";

interface PlatformSelectorProps {
  platforms: Platform[];
  selectedPlatforms: Platform[];
  onToggle: (platform: Platform) => void;
  label?: string;
}

export function PlatformSelector({
  platforms,
  selectedPlatforms,
  onToggle,
  label = "Plataformas Base",
}: PlatformSelectorProps) {
  return (
    <div className="space-y-3 pt-2">
      <label className="text-sm font-bold text-white uppercase tracking-wider block">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {platforms.map((platform) => {
          const isSelected = selectedPlatforms.some(
            (p) => p.id === platform.id,
          );
          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => onToggle(platform)}
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
  );
}