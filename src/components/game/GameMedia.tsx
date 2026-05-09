import { ScreenshotsCarousel } from "./ScreenshotsCarousel";

interface GameMediaProps {
  screenshots?: string[];
  videos?: string[];
  gameName: string;
}

export function GameMedia({ screenshots, videos, gameName }: GameMediaProps) {
  return (
    <div className="space-y-8">
      {screenshots && screenshots.length > 0 && (
        <ScreenshotsCarousel screenshots={screenshots} gameName={gameName} />
      )}

      {videos && videos.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
            Videos ({videos.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videos.slice(0, 4).map((video, index) => (
              <div
                key={index}
                className="relative aspect-video border-2 border-purple-900 overflow-hidden rounded-lg"
              >
                <iframe
                  src={`https://www.youtube.com/embed/${video}`}
                  title={`Video ${index + 1} de ${gameName}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}