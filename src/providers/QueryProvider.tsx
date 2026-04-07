"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // Inicializamos el QueryClient usando useState.
  // 🧠 TRUCO PRO: Esto asegura que el cliente se cree una sola vez por cada usuario,
  // evitando que la caché de un usuario se mezcle con la de otro en el servidor (SSR).
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Tiempo por defecto antes de considerar que los datos están "viejos" (5 minutos)
            staleTime: 1000 * 60 * 5, 
            // Evita que la app haga peticiones a la BD cada vez que el usuario cambia de pestaña
            refetchOnWindowFocus: false, 
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}