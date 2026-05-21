import Link from "next/link";
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

import { UserProfile } from "@/types/user";

interface UserMenuProps {
  user: UserProfile;
  onLogout: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full relative h-10 w-10 border-2 border-transparent hover:border-calypso-DEFAULT transition-colors p-0 overflow-hidden"
        >
          <Avatar className="h-full w-full rounded-full">
            <AvatarImage
              src={user.avatar_url || ""}
              alt="Avatar"
              className="object-cover"
            />
            <AvatarFallback className="bg-purple-900 text-calypso-DEFAULT font-bold rounded-full">
              {user.display_name?.charAt(0).toUpperCase() ||
                user.username?.charAt(0).toUpperCase() ||
                "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-black border-2 border-purple-900/50 rounded-xl shadow-lg mt-2"
        align="end"
      >
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
            <Link href="/library" className="block w-full h-full py-2 px-4">
              Biblioteca
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-purple-900/30 text-white rounded-lg mx-1 my-1">
            <Link href="/reviews" className="block w-full h-full py-2 px-4">
              Mis Reseñas
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-purple-900/50" />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onSelect={onLogout}
            className="cursor-pointer text-red-400 hover:bg-red-900/30 hover:text-red-300 rounded-lg mx-1 my-1 font-bold"
          >
            Cerrar Sesión
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
