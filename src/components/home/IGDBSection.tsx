// src/components/home/IGDBSection.tsx

const IGDB_STATS = [
  { value: '500K+', label: 'Juegos indexados' },
  { value: 'HD', label: 'Covers de alta calidad' },
  { value: 'Real-time', label: 'Datos actualizados' },
  { value: 'Multi', label: 'Plataformas soportadas' },
]

export default function IGDBSection() {
  return (
    <section className="relative bg-black border-y-2 border-purple-DEFAULT/40 py-16 overflow-hidden">

      {/* Línea de acento superior */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-calypso-DEFAULT to-transparent" />

      {/* Textura de fondo sutil */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,1)_2px,transparent_2px)] bg-[size:16px_16px]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* TEXTO IZQUIERDO */}
          <div className="flex-1 text-center lg:text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-calypso-DEFAULT mb-3">
               03 · Powered by
            </p>
            <h2 className="text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-white mb-4">
              Internet Games<br />
              <span className="text-calypso-DEFAULT">Database.</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm max-w-sm leading-relaxed mb-6">
              LevelZero se conecta directamente con{' '}
              <span className="text-white font-bold">IGDB</span>, la mayor base de datos de videojuegos del mundo —
              la misma que impulsa Twitch. Información precisa, covers en HD y datos actualizados en tiempo real.
            </p>

            {/* Badge IGDB */}
            <div className="inline-flex items-center gap-3 border-2 border-calypso-DEFAULT/40 bg-calypso-DEFAULT/5 px-4 py-2 shadow-[4px_4px_0px_0px_var(--color-calypso-DEFAULT)]">
              <div className="flex flex-col">
                <span className="font-black italic text-lg text-white tracking-tighter leading-none">IGDB</span>
                <span className="font-mono text-[8px] uppercase tracking-widest text-calypso-DEFAULT">
                  by Twitch
                </span>
              </div>
              <div className="w-px h-8 bg-calypso-DEFAULT/30" />
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider leading-tight">
                Socio<br />Oficial
              </span>
            </div>
          </div>

          {/* STATS DERECHA */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 gap-px bg-purple-DEFAULT/20">
              {IGDB_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-black p-6 group hover:bg-calypso-DEFAULT/5 transition-colors"
                >
                  <p className="font-black italic text-3xl text-calypso-DEFAULT mb-1 tracking-tighter">
                    {stat.value}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Línea de acento inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-DEFAULT to-transparent" />
    </section>
  )
}
