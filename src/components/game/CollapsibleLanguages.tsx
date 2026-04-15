"use client";
import { useState } from "react";

interface LanguageSupport {
  name: string;
  supports: string[];
}

interface Props {
  languageSupports: LanguageSupport[];
}

export default function CollapsibleLanguages({ languageSupports }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 pt-6 border-t border-purple-900/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-3"
      >
        <span>{isOpen ? "▼" : "▶"}</span>
        Idioma y audio:
      </button>
      {isOpen && (
        <div className="flex flex-col gap-3">
          {languageSupports.map((lang, index) => (
            <div key={index}>
              <h4 className="text-xs font-bold text-white uppercase mb-2">
                {lang.name}
              </h4>
              <div className="flex flex-wrap gap-1">
                {lang.supports.map((support, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 bg-purple-900/20 border border-calypso-DEFAULT/50 text-calypso-DEFAULT font-mono text-[10px] uppercase"
                  >
                    {support}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
