"use client";
import Link from "next/link";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "@/providers/UserContext";
import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { UserMenu } from "./UserMenu";

export default function Navbar() {
  const { user } = useUser();
  const router = useRouter();
  const supabase = createClient();
  const [query, setQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      setIsMobileSearchOpen(false);
      router.push(`/games?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-purple-900/50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {isMobileSearchOpen ? (
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={handleSearch}
            isMobileSearchOpen={isMobileSearchOpen}
            setIsMobileSearchOpen={setIsMobileSearchOpen}
          />
        ) : (
          <>
            <Link href="/">
              <span className="text-xl sm:text-2xl font-black italic tracking-tighter text-white">
                LEVEL<span className="text-calypso-DEFAULT">ZERO</span>
              </span>
            </Link>

            <SearchBar
              query={query}
              setQuery={setQuery}
              onSearch={handleSearch}
              isMobileSearchOpen={isMobileSearchOpen}
              setIsMobileSearchOpen={setIsMobileSearchOpen}
            />

            <div className="flex items-center justify-end gap-3 sm:gap-4 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileSearchOpen(true)}
                className="md:hidden rounded-full text-muted-foreground hover:text-calypso-DEFAULT"
              >
                <SearchIcon className="h-5 w-5" />
              </Button>

              {user ? (
                <UserMenu user={user} onLogout={handleLogout} />
              ) : (
                <Button
                  asChild
                  className="rounded-xl bg-white text-black hover:bg-calypso-DEFAULT font-bold uppercase tracking-wider cursor-pointer shadow-md transition-all hover:scale-105"
                >
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
