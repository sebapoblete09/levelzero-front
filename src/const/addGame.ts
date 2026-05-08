import { status } from "@/types/games";

export const STATUS_OPTIONS: {
  value: status;
  label: string;
  accent: string;
}[] = [
  {
    value: "playing",
    label: "Jugando Ahora",
    accent: "hover:border-calypso-DEFAULT hover:text-calypso-DEFAULT",
  },
  {
    value: "want_to_play",
    label: "Pendiente (Backlog)",
    accent: "hover:border-purple-400 hover:text-purple-400",
  },
  {
    value: "completed",
    label: "Completado",
    accent: "hover:border-green-400 hover:text-green-400",
  },
  {
    value: "on_hold",
    label: "En Pausa",
    accent: "hover:border-yellow-400 hover:text-yellow-400",
  },
  {
    value: "dropped",
    label: "Abandonado",
    accent: "hover:border-red-500 hover:text-red-500",
  },
];

export const OWNERSHIP_OPTIONS: {
  value: string;
  label: string;
  accent: string;
}[] = [
  {
    value: "none",
    label: "Ninguno",
    accent: "hover:border-gray-400 hover:text-gray-400",
  },
  {
    value: "physical",
    label: "Físico",
    accent: "hover:border-blue-400 hover:text-blue-400",
  },
  {
    value: "digital",
    label: "Digital",
    accent: "hover:border-cyan-400 hover:text-cyan-400",
  },
];

export const RATING_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);
