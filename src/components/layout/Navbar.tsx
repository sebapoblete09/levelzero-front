"use client";
import Link from "next/link";
import { SearchIcon, X } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

// Usamos tu cliente de Supabase y el Contexto
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/providers/UserContext";
import React, { useState } from "react";

export default function Navbar() {
  // ¡El usuario ya viene cargado e instantáneo desde el Layout!
  const { user } = useUser(); 
  const router = useRouter();
  const supabase = createClient();
  const [query, setQuery]= useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleLogout = async () => {
    // 1. Borramos la sesión en el navegador
    await supabase.auth.signOut();
    
    // 2. Le decimos a Next.js que recargue los datos del servidor y lo mandamos al login
    router.refresh(); 
    router.push("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if(query.trim().length >= 2) {
      setIsMobileSearchOpen(false);
      router.push(`/games?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
   <nav className="sticky top-0 z-50 w-full border-b border-purple-900/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* CONDICIONAL: Si el buscador móvil está abierto, mostramos SOLO la barra de búsqueda */}
        {isMobileSearchOpen ? (
          <form 
            onSubmit={handleSearch} 
            className="flex w-full items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-200"
          >
            <Input 
              autoFocus // <-- Súper importante: abre el teclado del celular automáticamente
              placeholder="Buscar juegos..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 rounded-xl border-calypso-DEFAULT bg-black/80 focus-visible:ring-calypso-DEFAULT text-white" 
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileSearchOpen(false)}
              className="text-muted-foreground hover:text-red-400 rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>
          </form>
        ) : (
          /* VISTA NORMAL (Logo + Buscador Desktop + Avatar) */
          <>
            {/* IZQUIERDA: Logo */}
            <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 shrink-0">
              <span className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">
                LEVEL<span className="text-calypso-DEFAULT">ZERO</span>
              </span>
            </Link>

            {/* CENTRO: Buscador Desktop (Oculto en móvil, visible en md en adelante) */}
            <div className="hidden md:flex flex-1 items-center justify-center max-w-xl px-6">
              <div className="relative w-full">
                <form onSubmit={handleSearch} className="flex w-full items-center justify-center">
                  <ButtonGroup className="w-full shadow-sm">
                    <Input 
                      placeholder="Buscar juegos, usuarios..." 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="rounded-l-xl border-purple-900/50 focus-visible:ring-calypso-DEFAULT bg-black/50" 
                    />
                    <Button 
                      type="submit"
                      variant="outline" 
                      aria-label="Search" 
                      className="rounded-r-xl border-purple-900/50 hover:bg-calypso-DEFAULT hover:text-black"
                    >
                      <SearchIcon className="h-4 w-4" />
                    </Button>
                  </ButtonGroup>
                </form>
              </div>
            </div>

            {/* DERECHA: Usuario / Login */}
            <div className="flex items-center justify-end gap-3 sm:gap-4 shrink-0">
              
              {/* Botón de buscar móvil (ACTIVO: Abre el estado isMobileSearchOpen) */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileSearchOpen(true)}
                className="md:hidden rounded-full text-muted-foreground hover:text-calypso-DEFAULT"
              >
                <SearchIcon className="h-5 w-5" />
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full relative h-10 w-10 border-2 border-transparent hover:border-calypso-DEFAULT transition-colors p-0 overflow-hidden">
                      <Avatar className="h-full w-full rounded-full">
                        <AvatarImage src={user.avatar_url || ""} alt="Avatar" className="object-cover" />
                        <AvatarFallback className="bg-purple-900 text-calypso-DEFAULT font-bold rounded-full">
                          {user.display_name?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent className="w-56 bg-black border-2 border-purple-900/50 rounded-xl shadow-lg mt-2" align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none text-white">
                          {user.display_name || user.username}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground font-mono">
                          {user.username || "nuevo_usuario"}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-purple-900/50" />
                    
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="cursor-pointer hover:bg-purple-900/30 text-white rounded-lg mx-1 my-1">
                        <Link href="/profile" className="block w-full h-full py-2 px-4">
                          Mi Perfil
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-purple-900/30 text-white rounded-lg mx-1 my-1">
                        Biblioteca
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer hover:bg-purple-900/30 text-white rounded-lg mx-1 my-1">
                        Configuración
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    
                    <DropdownMenuSeparator className="bg-purple-900/50" />
                    
                    <DropdownMenuGroup>
                      <DropdownMenuItem 
                        onSelect={handleLogout}
                        className="cursor-pointer text-red-400 hover:bg-red-900/30 hover:text-red-300 rounded-lg mx-1 my-1 font-bold"
                      >
                        Cerrar Sesión
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild className="rounded-xl bg-white text-black hover:bg-calypso-DEFAULT font-bold uppercase tracking-wider cursor-pointer shadow-md transition-all hover:scale-105">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}