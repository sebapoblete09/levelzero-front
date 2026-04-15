import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfile } from "@/types/user";

export default function ProfileHeader({ userData }: { userData: UserProfile }) {
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
        </div>
      </div>

      <div className="w-full md:w-auto">
        <Link
          href="/library"
          className="inline-flex items-center justify-center w-full rounded-lg border-2 border-calypso-DEFAULT bg-calypso-DEFAULT px-6 py-3 text-sm font-bold uppercase text-black transition-all hover:bg-transparent hover:text-calypso-DEFAULT"
        >
          Ir a la biblioteca
        </Link>
      </div>
    </div>
  );
}
