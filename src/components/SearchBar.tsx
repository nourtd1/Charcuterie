'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  targetPath?: string; // chemin de redirection, ex: "/search" ou "/products"
}

export default function SearchBar({ 
  placeholder = "Rechercher : ex. jambon fumé, lardons...",
  className = "",
  targetPath = "/search",
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`${targetPath}?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form role="search" onSubmit={handleSearch} className={className}>
      <div className="relative">
        <Input
          type="search"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-12 md:h-14 text-base md:text-lg bg-white/95 backdrop-blur-sm border-white/20 text-foreground placeholder:text-muted-foreground/70 focus:bg-white focus:ring-2 focus:ring-primary/50 shadow-lg search-input"
          aria-label="Rechercher des produits"
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md"
          aria-label="Lancer la recherche"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
