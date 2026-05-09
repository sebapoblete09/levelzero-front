"use client";
import { useState } from "react";
import { status } from "@/types/games";
import { owner } from "@/types/library";
import { ModalTrigger } from "./addGameComponents/modalTrigger";
import { AddGameModal } from "./AddGameModal";

interface AddToListButtonProps {
  gameId: number;
  gameName: string;
  isInLibrary?: boolean;
  currentStatus?: status;
  currentOwnership?: owner;
  currentRaiting?: number | null;
}

export default function AddToListButton({
  gameId,
  gameName,
  isInLibrary = false,
  currentStatus,
  currentOwnership,
  currentRaiting,
}: AddToListButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ModalTrigger onClick={() => setIsOpen(true)} isInLibrary={isInLibrary} />
      <AddGameModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        gameId={gameId}
        gameName={gameName}
        isInLibrary={isInLibrary}
        currentStatus={currentStatus}
        currentOwnership={currentOwnership}
        currentRating={currentRaiting}
      />
    </>
  );
}