'use client'



export default function Home() {
  
  return (
      <main className="relative min-h-[calc(100vh-4rem)] flex flex-col bg-background text-foreground overflow-hidden">
      
      {/* Decoración de fondo consistente con el Onboarding */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,1)_2px,transparent_2px)] bg-[size:16px_16px]" />

      {/* CONTENEDOR PRINCIPAL RESPONSIVO
        - px-4 para móvil, lg:px-8 para pantallas grandes.
        - flex-col en móvil (uno arriba del otro).
        - lg:flex-row en PC (uno al lado del otro).
      */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
        
        {/* COLUMNA IZQUIERDA: Textos Hero */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
          
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black italic tracking-tighter text-white uppercase leading-none">
            LEVEL<span className="text-calypso-DEFAULT">ZERO</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground font-mono max-w-md border-l-4 border-purple-DEFAULT pl-4 lg:pl-6">
            El mapa definitivo de tu viaje. Registra, evalúa y domina tu biblioteca.
          </p>

        </div>

        {/* COLUMNA DERECHA: Placeholder para contenido futuro */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          
          {/* CAJA ESTILO PERSONA 
            Aquí dentro puedes poner un carrusel de juegos o una imagen destacada luego.
            La sombra dura (shadow) y la transición le dan ese toque interactivo.
          */}
          <div className="w-full max-w-md aspect-[4/3] bg-black border-2 border-purple-DEFAULT relative shadow-[12px_12px_0px_0px_var(--color-calypso-DEFAULT)] flex items-center justify-center group transition-all duration-300 hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[20px_20px_0px_0px_var(--color-calypso-DEFAULT)]">
            
            {/* Adorno geométrico en la esquina */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-calypso-DEFAULT" />
            
            <p className="font-mono text-muted-foreground/50 uppercase tracking-widest text-center px-4">
              [ Espacio reservado para Últimos Lanzamientos ]
            </p>
            
          </div>

        </div>

      </div>
    </main>
  )
}