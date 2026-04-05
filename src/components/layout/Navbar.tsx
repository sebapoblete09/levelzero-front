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
    router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-purple-900/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        {/* Izquierda: Logo */}
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <span className="text-2xl font-black italic tracking-tighter text-white">
            LEVEL<span className="text-calypso-DEFAULT">ZERO</span>
          </span>
        </Link>

        {/* Derecha: Buscador + Usuario/Login */}
        <div className="hidden md:flex flex-1 items-center justify-end max-w-2xl px-6 gap-6">
          
          {/* Buscador */}
          <div className="relative w-full max-w-md">
            <ButtonGroup className="w-full">
              <Input 
                placeholder="Buscar Persona 3 Reload..." 
                className="rounded-none border-purple-900/50 focus-visible:ring-calypso-DEFAULT" 
              />
              <Button variant="outline" aria-label="Search" className="rounded-none border-purple-900/50 hover:bg-calypso-DEFAULT hover:text-black">
                <SearchIcon className="h-4 w-4" />
              </Button>
            </ButtonGroup>
          </div>

          {/* Menú de Usuario */}
          <div>
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-none border-2 border-transparent hover:border-calypso-DEFAULT transition-colors">
                    <Avatar className="h-9 w-9 rounded-none">
                      {/* Aquí usamos tu avatar_url de FastAPI, no el metadata de Supabase */}
                      <AvatarImage
                        src={user.avatar_url || ""}
                        alt="Avatar"
                        className="rounded-none"
                      />
                      {/* Mostramos las iniciales si no hay foto */}
                      <AvatarFallback className="rounded-none bg-purple-900 text-calypso-DEFAULT font-bold">
                        {user.display_name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-48 bg-black border-purple-900/50 rounded-none shadow-[4px_4px_0px_0px_var(--calypso-main)]" align="end">
                  <DropdownMenuLabel className="text-white">
                    {user.display_name || user.username || "Usuario"}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-purple-900/50" />
                  
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="cursor-pointer hover:bg-purple-900/30 text-white rounded-none">
                      Mi Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-purple-900/30 text-white rounded-none">
                      Configuración
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  
                  <DropdownMenuSeparator className="bg-purple-900/50" />
                  
                  <DropdownMenuGroup>
                    <DropdownMenuItem 
                      variant="destructive" 
                      onSelect={handleLogout}
                      className="cursor-pointer text-red-400 hover:bg-red-900/20 hover:text-red-300 rounded-none font-bold"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="rounded-none bg-white text-black hover:bg-calypso-DEFAULT font-bold uppercase tracking-wider cursor-pointer">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}