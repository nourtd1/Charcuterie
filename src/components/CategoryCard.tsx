"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { products } from "@/lib/data";

interface CategoryCardProps {
  category: string;
  icon: React.ReactNode;
  slug: string;
  showProductCount?: boolean;
  variant?: "default" | "preview";
}

export default function CategoryCard({ 
  category, 
  icon, 
  slug, 
  showProductCount = true,
  variant = "default" 
}: CategoryCardProps) {
  const productCount = products.filter(p => p.category === category).length;
  
  if (variant === "preview") {
    return (
      <div className="bg-background/50 rounded-2xl p-8 border border-border/40 hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300">
              <span className="text-primary group-hover:scale-110 transition-transform duration-300">{icon}</span>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-headline text-primary">{category}</h3>
              {showProductCount && (
                <p className="text-muted-foreground">
                  {productCount} produit{productCount > 1 ? 's' : ''} disponible{productCount > 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>
          <Button asChild variant="outline" className="hidden md:flex group">
            <Link href={`/products?category=${slug}`}>
              Voir tout
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/products?category=${slug}`}>
      <Card className="text-center p-6 bg-card/60 backdrop-blur-md border border-border/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full rounded-xl group cursor-pointer">
        <div className="flex justify-center items-center mb-4">
          <span className="text-primary group-hover:scale-110 transition-transform duration-300">{icon}</span>
        </div>
        <h3 className="text-lg font-headline font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {category}
        </h3>
        {showProductCount && (
          <p className="text-sm text-muted-foreground mt-2">
            {productCount} produit{productCount > 1 ? 's' : ''}
          </p>
        )}
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
            Découvrir
            <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </Card>
    </Link>
  );
}
