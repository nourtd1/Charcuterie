import { Metadata } from 'next';
import SearchBar from '@/components/SearchBar';
import ProductCatalog from '@/components/ProductCatalog';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export const metadata: Metadata = {
  title: 'Recherche - Charcuterie & alimentation certains',
  description: 'Recherchez vos produits préférés dans notre catalogue.',
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <SearchBar />
      </div>

      <div className="mb-4">
        {query ? (
          <h1 className="text-2xl md:text-3xl font-bold font-headline">Résultats pour "{query}"</h1>
        ) : (
          <h1 className="text-2xl md:text-3xl font-bold font-headline text-muted-foreground">Recherchez un produit</h1>
        )}
        <p className="text-muted-foreground mt-2">Utilisez les filtres, le tri et les bornes de prix pour affiner vos résultats.</p>
      </div>

      <div className="rounded-xl border border-border/40 bg-card/60 backdrop-blur-md p-4 md:p-6 shadow-sm">
        <ProductCatalog query={query} />
      </div>
    </div>
  );
}
