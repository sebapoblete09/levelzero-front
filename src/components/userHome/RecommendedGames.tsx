export default function RecommendedGames() {
  // Aquí podrías hacer un fetch a IGDB basado en los géneros que más juega

  return (
    <section>
      <div className="mb-6 border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold text-white uppercase tracking-wider">
          Recomendaciones del Sistema
        </h2>
        <p className="text-xs font-mono text-gray-500 uppercase">
          Basado en tu biblioteca
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* MOCKUP de Recomendaciones */}
        <div className="h-24 border border-white/5 rounded-xl bg-zinc-900/50 flex items-center p-4">
          <span className="text-gray-500 text-xs font-mono">
            Espacio para sugerencia...
          </span>
        </div>
        <div className="h-24 border border-white/5 rounded-xl bg-zinc-900/50 flex items-center p-4">
          <span className="text-gray-500 text-xs font-mono">
            Espacio para sugerencia...
          </span>
        </div>
      </div>
    </section>
  );
}
