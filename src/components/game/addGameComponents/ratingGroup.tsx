import { RATING_OPTIONS } from "@/const/addGame";

export const RatingGroup = ({
  currentValue,
  onChange,
  disabled,
}: {
  currentValue: number;
  onChange: (value: number) => void;
  disabled: boolean;
}) => (
  <div className="mb-6 md:mb-0 w-full">
    <h3 className="text-sm font-bold uppercase text-white mb-3">Rating</h3>
    <div className="grid grid-cols-5 gap-2 w-full">
      {RATING_OPTIONS.map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(rating)}
          disabled={disabled}
          className={`
            relative px-2 py-3 sm:px-3 bg-black text-white font-mono font-bold uppercase text-xs 
            border-2 border-purple-900/40 transition-all group overflow-hidden
            hover:border-yellow-400 hover:text-yellow-400 flex items-center justify-center
            disabled:opacity-50 disabled:cursor-not-allowed
            ${currentValue === rating ? "border-yellow-400 text-yellow-400 bg-yellow-400/10" : ""}
          `}
        >
          <span className="relative z-10">{rating}</span>
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      ))}
    </div>
  </div>
);
