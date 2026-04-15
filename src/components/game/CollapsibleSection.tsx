"use client";
import { useState } from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function CollapsibleSection({ title, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 pt-6 border-t border-purple-900/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider mb-3 md:hidden"
      >
        <span>{isOpen ? "▼" : "▶"}</span>
        {title}
      </button>
      <div className="hidden md:block">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-calypso-DEFAULT inline-block" />
          {title}
        </h3>
        {children}
      </div>
      <div className="md:hidden">{isOpen && children}</div>
    </div>
  );
}
