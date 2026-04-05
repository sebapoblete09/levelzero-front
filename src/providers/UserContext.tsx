// context/UserContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { UserProfile } from "@/types/user";


type UserContextType = {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ 
  children, 
  initialUser 
}: { 
  children: ReactNode;
  initialUser: UserProfile | null; 
}) {
  // Inicializamos el estado con los datos que llegaron del servidor
  const [user, setUser] = useState<UserProfile | null>(initialUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook personalizado para usar el contexto fácilmente
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
}