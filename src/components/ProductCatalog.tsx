"use client";

import type { Product, ProductCategory } from '@/lib/types';
import { products } from '@/lib/data';
import { categories } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type SortOption = "recommended" | "price-asc" | "price-desc" | "name-asc" | "name-desc" | "newest" | "popularity-desc";

export type ProductCatalogProps = {
  selectedCategory?: ProductCategory;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  emptyMessage?: string;
};

export function ProductCard({ product, onProductClick }: { product: Product, onProductClick: (product: Product) => void }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const whatsappLink = `https://wa.me/243972499388?text=${encodeURIComponent(
    `Bonjour, je suis intéressé(e) par le produit "${product.name}". Pourriez-vous me donner le prix et les modalités de commande ?`
  )}`;

  return (
    <Card className="w-full flex flex-col overflow-hidden h-full rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group">
      <CardHeader className="p-0">
        <div className="relative aspect-square w-full cursor-pointer overflow-hidden" onClick={() => onProductClick(product)}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            data-ai-hint={product.dataAiHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow" onClick={() => onProductClick(product)}>
        <CardTitle className="text-lg font-headline leading-tight cursor-pointer">{product.name}</CardTitle>
        <Button asChild variant="link" className="px-0 mt-1 text-primary">
          <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">Demander le prix sur WhatsApp</Link>
        </Button>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          onClick={() => {
            if (!user) {
              router.push('/account');
              return;
            }
            addToCart(product, 1);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ajouter au panier
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductDetailsDialog({ product, open, onOpenChange }: { product: Product | null, open: boolean, onOpenChange: (open: boolean) => void }) {
    const { addToCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);

    if (!product) return null;

    const handleAddToCart = () => {
        if (!user) {
            router.push('/account');
            return;
        }
        addToCart(product, quantity);
        onOpenChange(false);
        setQuantity(1);
    }
    const whatsappLink = `https://wa.me/243972499388?text=${encodeURIComponent(
      `Bonjour, je suis intéressé(e) par le produit "${product.name}" (quantité: ${quantity}). Pourriez-vous me donner le prix et les modalités de commande ?`
    )}`;
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] bg-background">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative aspect-square">
                        <Image src={product.image} alt={product.name} fill className="object-cover rounded-md" data-ai-hint={product.dataAiHint} />
                    </div>
                    <div className="flex flex-col">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-headline text-primary">{product.name}</DialogTitle>
                            <DialogDescription className="text-muted-foreground pt-2">{product.description}</DialogDescription>
                        </DialogHeader>
                        <div className="flex-grow my-4">
                            <p className="text-base text-muted-foreground">Prix sur demande. Contactez-nous pour plus d'informations.</p>
                        </div>
                        <DialogFooter className="flex flex-col sm:flex-row sm:justify-start sm:items-center gap-4">
                            <div className="flex items-center gap-2 border rounded-md p-2">
                                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q-1))}><Minus className="h-4 w-4" /></Button>
                                <span className="w-8 text-center font-bold">{quantity}</span>
                                <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q+1)}><Plus className="h-4 w-4" /></Button>
                            </div>
                            <Button asChild className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
                              <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                                Contacter sur WhatsApp
                              </Link>
                            </Button>
                        </DialogFooter>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default function ProductCatalog({ selectedCategory, query, minPrice, maxPrice, emptyMessage }: ProductCatalogProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "all">(selectedCategory || "all");
  const [sortOption, setSortOption] = useState<SortOption>("recommended");
  const [localMinPrice, setLocalMinPrice] = useState<number | "">(typeof minPrice === 'number' ? minPrice : "");
  const [localMaxPrice, setLocalMaxPrice] = useState<number | "">(typeof maxPrice === 'number' ? maxPrice : "");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  const normalizedQuery = (query || "").trim().toLowerCase();

  // Keep local price filters in sync with incoming props (e.g., when navigating to promotions)
  useEffect(() => {
    setLocalMinPrice(typeof minPrice === 'number' ? minPrice : "");
  }, [minPrice]);
  useEffect(() => {
    setLocalMaxPrice(typeof maxPrice === 'number' ? maxPrice : "");
  }, [maxPrice]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  }

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
        setSelectedProduct(null);
    }
  }

  const filterByQuery = (p: Product) => {
    if (!normalizedQuery) return true;
    // Support pseudo requêtes simples, e.g. ":favorites" (placeholder)
    if (normalizedQuery.startsWith(":")) {
      return true;
    }
    return (
      p.name.toLowerCase().includes(normalizedQuery) ||
      p.description.toLowerCase().includes(normalizedQuery)
    );
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => categoryFilter === "all" ? true : p.category === categoryFilter)
      .filter(filterByQuery)
      .filter((p) => {
        const minOk = localMinPrice === "" ? true : p.price >= Number(localMinPrice);
        const maxOk = localMaxPrice === "" ? true : p.price <= Number(localMaxPrice);
        const stockOk = onlyInStock ? (p.inStock !== false) : true;
        return minOk && maxOk && stockOk;
      });
  }, [categoryFilter, normalizedQuery, localMinPrice, localMaxPrice, onlyInStock]);

  const sortedProducts = useMemo(() => {
    const arr = [...filteredProducts];
    switch (sortOption) {
      case "price-asc":
        arr.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        arr.sort((a, b) => b.price - a.price);
        break;
      case "popularity-desc":
        arr.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
        break;
      case "name-asc":
        arr.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        arr.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        arr.sort((a, b) => b.id - a.id);
        break;
      case "recommended":
      default:
        // ordre par défaut inchangé
        break;
    }
    return arr;
  }, [filteredProducts, sortOption]);

  return (
    <>
      {/* Barre d'outils: filtre & tri */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={categoryFilter === "all" ? "all" : categoryFilter} onValueChange={(v) => setCategoryFilter((v as ProductCategory | "all"))}>
            <SelectTrigger className="w-56">
              <SelectValue placeholder="Toutes les catégories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {normalizedQuery && (
            <span className="text-sm text-muted-foreground">Recherche: "{query}"</span>
          )}
          <label className="flex items-center gap-2 ml-2 px-3 py-1.5 rounded-md border border-border/60 bg-background hover:bg-background/80 cursor-pointer select-none">
            <input type="checkbox" className="h-4 w-4" checked={onlyInStock} onChange={(e) => setOnlyInStock(e.target.checked)} />
            <span className="text-sm">En stock uniquement</span>
          </label>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min $"
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(e.target.value === '' ? '' : Number(e.target.value))}
              className="h-9 w-24 rounded-md border border-border bg-background px-2 text-sm"
            />
            <span className="text-muted-foreground text-sm">—</span>
            <input
              type="number"
              placeholder="Max $"
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(e.target.value === '' ? '' : Number(e.target.value))}
              className="h-9 w-24 rounded-md border border-border bg-background px-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden md:inline">Trier par</span>
            <Select value={sortOption} onValueChange={(v) => setSortOption(v as SortOption)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Recommandé" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommandé</SelectItem>
                <SelectItem value="popularity-desc">Popularité</SelectItem>
                <SelectItem value="newest">Nouveautés</SelectItem>
                <SelectItem value="price-asc">Prix : croissant</SelectItem>
                <SelectItem value="price-desc">Prix : décroissant</SelectItem>
                <SelectItem value="name-asc">Nom : A → Z</SelectItem>
                <SelectItem value="name-desc">Nom : Z → A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
              </div>

      {/* Empty state */}
      {sortedProducts.length === 0 && (
        <div className="mt-6 rounded-lg border border-border/60 bg-card/60 backdrop-blur-md p-6 text-center">
          <p className="text-muted-foreground">
            {emptyMessage || "Aucun produit ne correspond à votre recherche pour le moment."}
          </p>
        </div>
      )}

      {/* Grille produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
        {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onProductClick={handleProductClick} />
                ))}
            </div>

      <ProductDetailsDialog product={selectedProduct} open={isDialogOpen} onOpenChange={handleDialogChange} />
    </>
  );
}
