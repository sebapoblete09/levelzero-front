import { STATUS_OPTIONS } from "@/const/addGame";
import { OWNERSHIP_OPTIONS } from "@/const/addGame";
import { Loader2 } from "lucide-react";

export const SelectionGroup = ({
  title,
  options,
  currentValue,
  onChange,
  disabled,
  isSubmitting,
}: {
  title: string;
  options: typeof STATUS_OPTIONS | typeof OWNERSHIP_OPTIONS;
  currentValue: string;
  onChange: (value: string) => void;
  disabled: boolean;
  isSubmitting?: boolean;
}) => (
  <div className="mb-6 md:mb-0 w-full">
    <h3 className="text-sm font-bold uppercase text-white mb-3">{title}</h3>
    <div className="flex flex-col gap-2 w-full">
      {options.map((option) => {
        const isSelected = currentValue === option.value;
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            disabled={disabled}
            className={`
              relative w-full px-4 py-3 bg-black text-white font-mono font-bold uppercase text-xs text-left 
              border-2 border-purple-900/40 transition-all group overflow-hidden
              ${option.accent} 
              disabled:opacity-50 disabled:cursor-not-allowed
              ${isSelected ? "border-white text-white" : ""}
            `}
          >
            <span className="relative z-10 flex items-center justify-between">
              {option.label}
              {isSelected && !isSubmitting && (
                <span className="text-[9px] truncate ml-2">[SELECCIONADO]</span>
              )}
              {isSelected && isSubmitting && (
                <Loader2 className="w-4 h-4 animate-spin text-calypso-DEFAULT" />
              )}
            </span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        );
      })}
    </div>
  </div>
);
