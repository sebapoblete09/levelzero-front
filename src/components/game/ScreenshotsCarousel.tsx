"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ScreenshotsCarouselProps {
  screenshots: string[];
  gameName: string;
}

export function ScreenshotsCarousel({ screenshots, gameName }: ScreenshotsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const displayedScreenshots = screenshots.slice(0, 8);

  useEffect(() => {
    if (isLightboxOpen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === displayedScreenshots.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isLightboxOpen, displayedScreenshots.length]);

  const goTo = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayedScreenshots.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === displayedScreenshots.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="mb-6">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
          Capturas de Pantalla ({screenshots.length})
        </h3>

        <div className="relative mb-4">
          <div 
            className="relative aspect-[16/9] w-full max-w-lg mx-auto border-2 border-purple-900 overflow-hidden cursor-pointer group"
            onClick={() => setIsLightboxOpen(true)}
          >
            <Image
              src={displayedScreenshots[currentIndex]}
              alt={`Screenshot ${currentIndex + 1} de ${gameName}`}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover transition-opacity duration-500"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 rounded text-xs text-white font-mono">
              {currentIndex + 1} / {displayedScreenshots.length}
            </div>
          </div>

          <button
            onClick={goToPrevious}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 border border-purple-900 text-white p-2 rounded-full hover:bg-purple-900/80 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 border border-purple-900 text-white p-2 rounded-full hover:bg-purple-900/80 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex gap-2 justify-center flex-wrap">
          {displayedScreenshots.map((screenshot, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`relative w-16 h-10 sm:w-20 sm:h-12 flex-shrink-0 border-2 transition-all ${
                index === currentIndex
                  ? "border-calypso-DEFAULT ring-2 ring-calypso-DEFAULT/50"
                  : "border-purple-900 hover:border-purple-600"
              }`}
            >
              <Image
                src={screenshot}
                alt={`Miniatura ${index + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-red-400 p-2 z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white hover:text-calypso-DEFAULT p-2"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div className="relative w-full max-w-4xl aspect-video">
            <Image
              src={displayedScreenshots[currentIndex]}
              alt={`Screenshot ${currentIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            onClick={goToNext}
            className="absolute right-4 text-white hover:text-calypso-DEFAULT p-2"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-4 flex gap-2">
            {displayedScreenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-calypso-DEFAULT" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}