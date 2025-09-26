"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";

interface CategoryPreviewProps {
  category: string;
  icon: React.ReactNode;
  slug: string;
  maxProducts?: number;
}

const buildWhatsAppLink = (productName: string) =>
  `https://wa.me/243972499388?text=${encodeURIComponent(
    `Bonjour, je suis intéressé(e) par le produit "${productName}". Pourriez-vous me donner le prix et les modalités de commande ?`
  )}`;

export default function CategoryPreview({ 
  category, 
  icon, 
  slug, 
  maxProducts = 4 
}: CategoryPreviewProps) {
  const categoryProducts = products.filter(p => p.category === category).slice(0, maxProducts);
  const totalProducts = products.filter(p => p.category === category).length;
  
  if (categoryProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-background/50 rounded-2xl p-8 border border-border/40 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-xl">
            <span className="text-primary">{icon}</span>
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold font-headline text-primary">{category}</h3>
            <p className="text-muted-foreground">
              {totalProducts} produit{totalProducts > 1 ? 's' : ''} disponible{totalProducts > 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Button asChild variant="outline" className="hidden md:flex group">
          <Link href={`/categories/${slug}`}>
            Voir tout
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categoryProducts.map(product => (
          <Card key={product.id} className="overflow-hidden rounded-xl border border-border/40 bg-card/60 backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="relative aspect-square overflow-hidden">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300" 
                data-ai-hint={product.dataAiHint} 
              />
            </div>
            <CardContent className="p-4">
              <h4 className="font-headline font-semibold line-clamp-1 text-sm group-hover:text-primary transition-colors duration-300">
                {product.name}
              </h4>
              <Button asChild variant="link" className="px-0 mt-1 text-primary text-xs hover:text-primary/80">
                <Link href={buildWhatsAppLink(product.name)} target="_blank" rel="noopener noreferrer">
                  Demander le prix
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-6 md:hidden">
        <Button asChild variant="outline" className="group">
          <Link href={`/categories/${slug}`}>
            Voir tous les produits {category.toLowerCase()}
          </Link>
        </Button>
      </div>
    </div>
  );
}
