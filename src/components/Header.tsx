"use client";

import Link from "next/link";
import { LogOut, ShoppingCart, User, Utensils, Menu, X, Search, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products } from "@/lib/data";


const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/products", label: "Boutique" },
    { href: "/news", label: "Nouveautés" },
    { href: "/about", label: "À Propos" },
    { href: "/contact", label: "Contact" },
];

function NavLink({ href, label, onClick, isActive }: { href: string; label: string; onClick?: () => void; isActive?: boolean }) {
    return (
        <Link 
            href={href}
            onClick={onClick}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              "relative transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-gradient-to-r after:from-primary after:to-accent after:rounded-full after:transition-[width] after:duration-300 hover:after:w-full",
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
        >
            {label}
        </Link>
    );
}

const categorySlugMap: Record<string, string> = {
  "Viandes": "viande",
  "Boissons naturelles": "boisson-naturelle",
  "Autres produits": "autres-produits",
  "Vins rouges": "vin-rouge",
};

export default function Header() {
  const { getCartItemCount } = useCart();
  const [itemCount, setItemCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => set.add(p.category));
    const labels = Array.from(set);
    const items = labels
      .filter(label => categorySlugMap[label])
      .map(label => ({ label, slug: categorySlugMap[label] }));
    return [{ label: "Toutes les catégories", slug: "all" }, ...items];
  }, []);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateCount = () => {
        setItemCount(getCartItemCount());
    }
    window.addEventListener('cartUpdated', updateCount);
    updateCount(); 
    return () => window.removeEventListener('cartUpdated', updateCount);
  }, [getCartItemCount]);

  const handleLogout = async () => {
    await signOut(auth);
    toast({ title: "Déconnexion réussie" });
    router.push('/');
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('q', searchTerm.trim());
    if (selectedCategory && selectedCategory !== 'all') params.set('category', selectedCategory);
    const query = params.toString();
    router.push(`/products${query ? `?${query}` : ''}`);
  };

  return (
    <header className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "shadow-lg border-b border-border/40 bg-gradient-to-b from-background/90 to-background/70 backdrop-blur-md"
          : "border-b border-transparent bg-background/60 backdrop-blur-md"
    )}>
      <div className="container flex h-16 max-w-screen-2xl items-center gap-4">
        <Link href="/" className="mr-2 flex items-center space-x-2">
          <Utensils className="h-7 w-7 text-primary" />
          <div className="flex flex-col leading-tight">
          <span className="font-bold sm:inline-block font-headline text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Alimentation Certains
          </span>
            <span className="hidden sm:block text-[11px] text-muted-foreground">Qualité & service</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm" aria-label="Navigation principale">
          {navLinks.map(link => {
            if (link.label === "Boutique") {
              return (
                <DropdownMenu key={link.href}>
                  <DropdownMenuTrigger asChild>
                    <button className={cn(
                      "relative transition-colors duration-300",
                      pathname?.startsWith('/products') ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}>
                      Boutique
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/products">Catalogue</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/products?filter=promotions">Promotions</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {categories.slice(1).map(({ label, slug }) => (
                      <DropdownMenuItem key={slug} asChild className="cursor-pointer">
                        <Link href={`/categories/${slug}`}>{label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            const isActive = pathname === link.href;
            return <NavLink key={link.href} {...link} isActive={isActive} />
          })}
        </nav>

        {/* Search Bar (desktop) */}
        <form onSubmit={handleSearch} className="hidden lg:flex flex-1 items-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(({ label, slug }) => (
                <SelectItem key={slug} value={slug}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un produit..."
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button type="submit">Rechercher</Button>
        </form>

        {/* Right side icons (mobile) */}
        <div className="flex lg:hidden items-center justify-end gap-1 ml-auto">
          <Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Favoris" onClick={() => router.push('/products?q=%3Afavorites')}>
            <Heart className="h-5 w-5" />
          </Button>
          {!loading && user && (
            <Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Mon compte" onClick={() => router.push('/account')}>
              <User className="h-5 w-5" />
            </Button>
          )}
            <Link href="/cart" aria-label="Panier">
            <Button variant="ghost" size="icon" className="relative h-10 w-10">
                    <ShoppingCart className="h-5 w-5" />
                    {isClient && itemCount > 0 && (
                      <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground ring-1 ring-border">
                        {itemCount}
                      </span>
                    )}
                  <span className="sr-only">Panier</span>
                </Button>
              </Link>
             <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Ouvrir le menu">
                        {isMobileMenuOpen ? (
                          <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
                        ) : (
                          <Menu className="h-6 w-6 transition-transform duration-300" />
                        )}
                        <span className="sr-only">Ouvrir le menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
                    <div className="p-6">
                <Link href="/" className="mr-6 flex items-center space-x-2 mb-6" onClick={() => setIsMobileMenuOpen(false)}>
                            <Utensils className="h-7 w-7 text-primary" />
                            <span className="font-bold font-headline text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Alimentation Certains
                            </span>
                        </Link>
                        <nav className="flex flex-col gap-6 text-lg" aria-label="Navigation mobile">
                            {navLinks.map(link => {
                              const isActive = pathname === link.href;
                              if (link.label !== 'Boutique') {
                                return <NavLink key={link.href} {...link} isActive={isActive} onClick={() => setIsMobileMenuOpen(false)}/>;
                              }
                              return (
                                <div key={link.href} className="flex flex-col gap-3">
                                  <NavLink {...link} isActive={pathname?.startsWith('/products')} onClick={() => setIsMobileMenuOpen(false)} />
                                  <div className="ml-3 flex flex-col gap-2 text-base">
                                    <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">Catalogue</Link>
                                    <Link href="/products?filter=promotions" onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">Promotions</Link>
                                    {categories.slice(1).map(({ label, slug }) => (
                                      <Link key={slug} href={`/categories/${slug}`} onClick={() => setIsMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">{label}</Link>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                            
                            {/* Section Compte utilisateur */}
                            <div className="border-t border-border/40 pt-6">
                              {!loading && user ? (
                                <div className="space-y-4">
                                  <div className="flex items-center gap-3 p-3 bg-background/60 rounded-lg border">
                                    <User className="h-5 w-5 text-primary" />
                                    <div>
                                      <p className="font-medium">{user.displayName || 'Mon Compte'}</p>
                                      <p className="text-sm text-muted-foreground">{user.email}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-col gap-2">
                                    <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 p-2 text-muted-foreground hover:text-foreground hover:bg-background/60 rounded-lg transition-colors">
                                      <User className="h-4 w-4" />
                                      Profil & Commandes
                                    </Link>
                                    <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors w-full text-left">
                                      <LogOut className="h-4 w-4" />
                                      Déconnexion
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20 hover:from-primary/20 hover:to-accent/20 transition-colors">
                                  <User className="h-5 w-5 text-primary" />
                                  <span className="font-medium">Se connecter</span>
                                </Link>
                              )}
                            </div>
                        </nav>
                <div className="mt-6">
                  <form onSubmit={(e) => { handleSearch(e); setIsMobileMenuOpen(false); }} className="flex items-center gap-2">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Catégories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(({ label, slug }) => (
                          <SelectItem key={slug} value={slug}>{slug === 'all' ? 'Toutes' : label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Recherche..."
                    />
                    <Button type="submit" size="icon" aria-label="Rechercher"><Search className="h-4 w-4"/></Button>
                  </form>
                            </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>

        {/* Right side icons (desktop) */}
        <div className="hidden lg:flex items-center justify-end gap-2">
            {!loading && (
              user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span>{user.displayName || 'Mon Compte'}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link href="/account">Profil & Commandes</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="/account?tab=security">Sécurité</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Déconnexion</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                 <Button asChild variant="ghost">
                  <Link href="/account">
                    Se connecter
                  </Link>
                </Button>
              )
            )}
          <Button variant="ghost" size="icon" className="h-10 w-10" aria-label="Favoris" onClick={() => router.push('/products?q=%3Afavorites')}>
            <Heart className="h-5 w-5" />
          </Button>
          <Link href="/cart" aria-label="Panier">
            <Button variant="ghost" size="icon" className="relative h-10 w-10">
                <ShoppingCart className="h-5 w-5" />
                {isClient && itemCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground ring-1 ring-border">
                    {itemCount}
                  </span>
                )}
              <span className="sr-only">Panier</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
