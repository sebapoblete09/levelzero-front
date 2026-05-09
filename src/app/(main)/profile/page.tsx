// app/(main)/profile/page.tsx
"use client";

import { useUser } from "@/providers/UserContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileHeader from "@/components/profile/profileHeader";
import EditProfileModal from "@/components/profile/EditProfileModal";
import { UserGamesSection } from "@/components/profile/UserGamesGrid";
import { ReviewsSection } from "@/components/profile/ReviewsSection";

export default function ProfilePage() {
  const { user } = useUser();
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <main className="container mx-auto p-4 sm:p-12 min-h-screen">
      <ProfileHeader
        userData={user}
        onEditClick={() => setIsEditModalOpen(true)}
      />

      <EditProfileModal
        userData={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <UserGamesSection />
      <ReviewsSection />
    </main>
  );
}