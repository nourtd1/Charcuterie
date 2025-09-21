import { Suspense } from 'react';
import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/lib/data';
import SearchBar from '@/components/SearchBar';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export const metadata: Metadata = {
  title: 'Recherche - Charcuterie & alimentation certains',
  description: 'Recherchez vos produits préférés dans notre catalogue.',
};

function SearchResults({ query }: { query: string }) {
  if (!query) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-muted-foreground mb-4">
          Entrez un terme de recherche
        </h2>
        <p className="text-muted-foreground">
          Utilisez la barre de recherche ci-dessus pour trouver vos produits préférés.
        </p>
      </div>
    );
  }

  // Recherche simple dans les noms et catégories des produits
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.category.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-muted-foreground mb-4">
          Aucun résultat trouvé
        </h2>
        <p className="text-muted-foreground mb-6">
          Nous n'avons trouvé aucun produit correspondant à "{query}".
        </p>
        <Button asChild>
          <Link href="/products">Voir tous les produits</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Résultats pour "{query}" ({filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''})
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden rounded-xl border border-border/40 bg-card/60 backdrop-blur-md shadow-sm">
            <div className="relative aspect-square">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-cover" 
                data-ai-hint={product.dataAiHint} 
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-headline font-semibold line-clamp-1 mb-2">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{product.category}</p>
              <Button asChild variant="link" className="px-0 text-primary">
                <Link href={`https://wa.me/243972499388?text=${encodeURIComponent(
                  `Bonjour, je suis intéressé(e) par le produit "${product.name}". Pourriez-vous me donner le prix et les modalités de commande ?`
                )}`} target="_blank" rel="noopener noreferrer">
                  Demander le prix sur WhatsApp
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar />
      </div>
      
      <Suspense fallback={
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Recherche en cours...</p>
        </div>
      }>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
