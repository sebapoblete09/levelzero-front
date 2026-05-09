import { SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ButtonGroup } from "@/components/ui/button-group";

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
  isMobileSearchOpen: boolean;
  setIsMobileSearchOpen: (open: boolean) => void;
}

export function SearchBar({
  query,
  setQuery,
  onSearch,
  isMobileSearchOpen,
  setIsMobileSearchOpen,
}: SearchBarProps) {
  if (isMobileSearchOpen) {
    return (
      <form
        onSubmit={onSearch}
        className="flex w-full items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-200"
      >
        <Input
          autoFocus
          placeholder="Buscar juegos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 rounded-xl border-calypso-DEFAULT bg-black/80 focus-visible:ring-calypso-DEFAULT text-white"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileSearchOpen(false)}
          className="text-muted-foreground hover:text-red-400 rounded-full"
        >
          <X className="h-6 w-6" />
        </Button>
      </form>
    );
  }

  return (
    <div className="hidden md:flex flex-1 items-center justify-center max-w-xl px-6">
      <div className="relative w-full">
        <form onSubmit={onSearch} className="flex w-full items-center justify-center">
          <ButtonGroup className="w-full shadow-sm">
            <Input
              placeholder="Buscar juegos, usuarios..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-l-xl border-purple-900/50 focus-visible:ring-calypso-DEFAULT bg-black/50"
            />
            <Button
              type="submit"
              variant="outline"
              aria-label="Search"
              className="rounded-r-xl border-purple-900/50 hover:bg-calypso-DEFAULT hover:text-black"
            >
              <SearchIcon className="h-4 w-4" />
            </Button>
          </ButtonGroup>
        </form>
      </div>
    </div>
  );
}