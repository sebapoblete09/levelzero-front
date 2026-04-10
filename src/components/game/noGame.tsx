//componente estetico para mostrar cuando no se encontro el juego por algun motivo

export default function noGame(gameId: number) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="border-2 border-red-500 p-8 shadow-[8px_8px_0px_0px_rgba(239,68,68,0.5)]">
          <h1 className="text-2xl font-black italic text-red-500 uppercase">
            Juego no encontrado
          </h1>
          <p className="text-muted-foreground font-mono mt-2">
            El registro #{gameId} no existe en la base de datos.
          </p>
        </div>
      </div>
    );
}