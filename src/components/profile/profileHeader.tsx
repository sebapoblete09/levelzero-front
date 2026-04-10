




import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { UserProfile } from "@/types/user";

export default function ProfileHeader({ userData }: { userData: UserProfile  }) {
    return (
        <div className="bg-black border-2 border-purple-900 p-6 mb-8 shadow-[8px_8px_0px_0px_var(--color-calypso-DEFAULT)] flex items-center gap-6">
        <Avatar size="lg">
            <AvatarImage
            src={userData.avatar_url || "/placeholder.png"}
            alt={userData.display_name || "User"}
      />
      <AvatarFallback>{userData.display_name?.charAt(0) || "US"}</AvatarFallback>
    </Avatar>
        <div>
          <h1 className="text-4xl font-black italic uppercase text-white tracking-tighter">
            {userData?.display_name}
          </h1>
          <p className="text-calypso-DEFAULT font-mono font-bold">
            {userData?.username}
          </p>
        </div>
      </div>
    )
}