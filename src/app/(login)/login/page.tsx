"use client";

import { Button } from "@/components/ui/button";
import { Gamepad2, Star, Library, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const handleGoogleLogin = async () => {
    // Cliente de Supabase para el navegador
    const supabase = createClient();
    
    // Ejecuta el login y redirige a la ruta callback que creamos ayer
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <section className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-background">
      
      {/* MITAD IZQUIERDA: Formulario y Features */}
      <div className="relative flex flex-col justify-center items-center p-8 lg:p-24 z-10">
        
        {/* Decoración de fondo estilo UI Japonesa (líneas diagonales sutiles) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }} 
        />

        {/* Tarjeta Principal (Card) */}
        <div className="w-full max-w-md bg-black border-2 border-purple-DEFAULT p-10 relative shadow-[12px_12px_0px_0px_var(--calypso-main)]">
          
          {/* Adorno superior izquierdo (Estilo P3) */}
          <div className="absolute -top-3 -left-3 w-6 h-6 bg-calypso-DEFAULT" />
          
          <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2">
            LEVEL<span className="text-calypso-DEFAULT">ZERO</span>
          </h1>
          <p className="text-muted-foreground font-mono text-sm uppercase mb-8 tracking-widest border-b border-purple-900/50 pb-4">
            Sistema de Autenticación
          </p>

          <ul className="space-y-6 mb-10">
            <li className="flex items-start gap-4">
              <div className="mt-1 bg-purple-900/50 p-2 border border-purple-DEFAULT">
                <Library className="w-5 h-5 text-calypso-DEFAULT" />
              </div>
              <div>
                <h3 className="font-bold text-white uppercase">Tu Biblioteca Digital</h3>
                <p className="text-sm text-muted-foreground">Registra, organiza y haz seguimiento de todo lo que juegas.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="mt-1 bg-purple-900/50 p-2 border border-purple-DEFAULT">
                <Star className="w-5 h-5 text-calypso-DEFAULT" />
              </div>
              <div>
                <h3 className="font-bold text-white uppercase">Reseñas y Logros</h3>
                <p className="text-sm text-muted-foreground">Califica juegos y comparte tu opinión con la comunidad.</p>
              </div>
            </li>
          </ul>

          {/* Botón de Google */}
          <Button 
            onClick={handleGoogleLogin}
            className="w-full group relative h-14 bg-white text-black hover:bg-calypso-DEFAULT rounded-none border-2 border-transparent hover:border-white transition-all overflow-hidden"
          >
            {/* Ícono de Google SVG */}
            <svg className="w-6 h-6 mr-3 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-bold text-lg relative z-10 uppercase tracking-wider">Continuar con Google</span>
            
            {/* Efecto de barra diagonal al hacer hover */}
            <div className="absolute inset-0 h-full w-0 bg-calypso-DEFAULT transform skew-x-[-20deg] -ml-4 transition-all duration-300 group-hover:w-[120%]" />
          </Button>

        </div>
      </div>

      {/* MITAD DERECHA: Imagen y Arte (Se oculta en celulares) */}
      <div className="hidden lg:flex relative flex-col justify-center items-center border-l-4 border-purple-DEFAULT overflow-hidden group">
        
        {/* Imagen de fondo. Reemplaza la URL con arte del Persona o el que gustes */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop')",
            filter: "brightness(0.4) contrast(1.2) sepia(0.2) hue-rotate(240deg)" // Le da un tinte morado/azulado
          }}
        />

        {/* Textura de puntos encima de la imagen (muy usado en UI de Atlus) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.8)_2px,transparent_2px)] bg-[size:8px_8px] opacity-30" />

        {/* Caja de Texto Inclinada */}
        <div className="relative z-10 transform -skew-x-6 bg-black/90 border-4 border-calypso-DEFAULT p-8 max-w-lg backdrop-blur-sm">
          {/* Adorno diagonal */}
          <div className="absolute -top-4 -right-4 w-8 h-12 bg-purple-DEFAULT transform skew-x-12" />
          
          <h2 className="text-5xl font-black text-white uppercase leading-none mb-4 transform skew-x-6">
            Reclama tu <br/>
            <span className="text-calypso-DEFAULT">Identidad</span>
          </h2>
          <p className="text-lg text-purple-200 transform skew-x-6 font-mono">
            Únete a la base de datos definitiva. Tu historial, tus reglas.
          </p>
        </div>

      </div>

    </section>
  );
}