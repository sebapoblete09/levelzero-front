import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import QueryProvider from "@/providers/QueryProvider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LevelZero",
  description: "Map Your Gaming Journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning> 
      <body className={`${inter.className} antialiased bg-background text-foreground min-h-screen`}>
        <QueryProvider>
           {children}
        </QueryProvider>
      </body>
    </html>
  );
}