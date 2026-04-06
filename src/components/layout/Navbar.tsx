"use client";

import Link from "next/link";
import { SearchIcon } from "lucide-react";
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

export default function Navbar() {
  // ¡El usuario ya viene cargado e instantáneo desde el Layout!
  const { user } = useUser(); 
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    // 1. Borramos la sesión en el navegador
    await supabase.auth.signOut();
    
    // 2. Le decimos a Next.js que recargue los datos del servidor y lo mandamos al login
    router.refresh(); 
    router.push("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-purple-900/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        
        {/* IZQUIERDA: Logo */}
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 shrink-0">
          <span className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">
            LEVEL<span className="text-calypso-DEFAULT">ZERO</span>
          </span>
        </Link>

        {/* CENTRO: Buscador (Oculto en móvil, visible en md en adelante) */}
        <div className="hidden md:flex flex-1 items-center justify-center max-w-xl px-6">
          <div className="relative w-full">
            <ButtonGroup className="w-full shadow-sm">
              <Input 
                placeholder="Buscar juegos, usuarios..." 
                className="rounded-l-xl border-purple-900/50 focus-visible:ring-calypso-DEFAULT bg-black/50" 
              />
              <Button variant="outline" aria-label="Search" className="rounded-r-xl border-purple-900/50 hover:bg-calypso-DEFAULT hover:text-black">
                <SearchIcon className="h-4 w-4" />
              </Button>
            </ButtonGroup>
          </div>
        </div>

        {/* DERECHA: Usuario / Login */}
        <div className="flex items-center justify-end gap-3 sm:gap-4 shrink-0">
          
          {/* Botón de buscar solo para móvil (Muestra ícono en lugar de la barra completa) */}
          <Button variant="ghost" size="icon" className="md:hidden rounded-full text-muted-foreground hover:text-calypso-DEFAULT">
            <SearchIcon className="h-5 w-5" />
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* Botón redondeado con borde que cambia al hover */}
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage
                      src={user.avatar_url || ""}
                      alt="Avatar"
                    />
                    <AvatarFallback>
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
                      @{user.username || "nuevo_usuario"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-purple-900/50" />
                
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer hover:bg-purple-900/30 text-white rounded-lg mx-1 my-1">
                    Mi Perfil
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

      </div>
    </nav>
  );
}