
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface ProfileHeaderProps {
  userData: UserProfile;
  onEditClick?: () => void;
}

export default function ProfileHeader({
  userData,
  onEditClick,
}: ProfileHeaderProps) {
  return (
    <div className="bg-zinc-950 border border-purple-900/70 rounded-[2rem] p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="relative w-32 h-32 rounded-full border-4 border-calypso-DEFAULT overflow-hidden shadow-[0_0_0_4px_rgb(79,70,229)]">
        <Avatar className="h-32 w-32 sm:w-32 sm:h-32">
          <AvatarImage
            src={userData.avatar_url || "/placeholder.png"}
            alt={userData.display_name || "User"}
          />
          <AvatarFallback>
            {userData.display_name?.charAt(0) || "US"}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="flex-1 grid gap-2 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-white leading-tight">
          {userData?.display_name || userData?.username || "Usuario"}
        </h1>
        <div className="space-y-1 text-sm sm:text-base text-gray-300">
          <p>
            <span className="text-white font-bold">
              {userData?.username || "sin-nick"}
            </span>
          </p>
          <p className="text-calypso-DEFAULT font-mono">{userData?.email}</p>
          {userData?.preferred_platforms &&
            userData.preferred_platforms.length > 0 && (
              <div className="mt-3">
                <p className="text-xs font-bold uppercase tracking-wider text-calypso-DEFAULT mb-2">
                  Plataformas preferidas
                </p>
                <div className="flex flex-wrap gap-2">
                  {userData.preferred_platforms.map((platform, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-900/20 border border-calypso-DEFAULT/50 text-calypso-DEFAULT font-mono text-xs uppercase shadow-[2px_2px_0px_0px_var(--color-calypso-DEFAULT)]"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>

      <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
        {onEditClick && (
          <Button
            onClick={onEditClick}
            className="inline-flex items-center justify-center w-full rounded-lg border-2 border-purple-900/80 bg-transparent px-6 py-3 text-sm font-bold uppercase text-white transition-all hover:border-calypso-DEFAULT hover:text-calypso-DEFAULT"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar Perfil
          </Button>
        )}
        
      </div>
    </div>
  );
}
