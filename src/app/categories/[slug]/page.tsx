import ProductCatalog from "@/components/ProductCatalog";
import type { ProductCategory } from "@/lib/types";
import Image from "next/image";
import { Beef, GlassWater, Wine } from "lucide-react";
import { products } from "@/lib/data";

const slugToCategory: Record<string, ProductCategory> = {
  "viandes": "Viandes",
  "boissons-naturelles": "Boissons naturelles",
  "autres-produits": "Autres produits",
  "vins": "Vins rouges",
  // Map "fromages" to Autres produits for now (contains fromage)
  "fromages": "Autres produits",
};

const categoryIcon: Record<string, JSX.Element> = {
  "viandes": <Beef className="w-10 h-10 text-primary" />,
  "boissons-naturelles": <GlassWater className="w-10 h-10 text-primary" />,
  "vins": <Wine className="w-10 h-10 text-primary" />,
  "fromages": <Beef className="w-10 h-10 text-primary" />,
  "autres-produits": <Beef className="w-10 h-10 text-primary" />,
};

function computeTitle(slug: string) {
  switch (slug) {
    case "viandes": return "Viandes";
    case "boissons-naturelles": return "Boissons naturelles";
    case "fromages": return "Fromages & Produits laitiers";
    case "vins": return "Vins & spiritueux";
    case "autres-produits": return "Autres produits";
    default: return slug;
  }
}

export default async function CategoryPage({ params, searchParams }: { params: { slug: string }, searchParams?: Promise<{ [k: string]: string | string[] | undefined }> }) {
  const { slug } = params;
  const resolved = (await searchParams) || {};
  const qParam = typeof resolved.q === 'string' ? resolved.q : undefined;
  const category: ProductCategory | undefined = slugToCategory[slug];

  // Simple derived price defaults based on existing products
  const prices = products.map(p => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  return (
    <div className="bg-background">
      <header className="relative -mt-16 h-[40vh] md:h-[45vh] w-full flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/assets/images/banners/saison_banner.jpg"
          alt={`${computeTitle(slug)} — Catégorie`}
          fill
          className="object-cover -z-20"
          priority
        />
        <div className="absolute inset-0 -z-10 hero-overlay" />
        <div className="relative z-10 w-[92%] max-w-5xl px-4 text-white">
          <div className="flex items-center justify-center gap-3 mb-3">
            {categoryIcon[slug]}
            <h1 className="text-3xl md:text-5xl font-black font-headline leading-tight">{computeTitle(slug)}</h1>
          </div>
          <p className="text-white/90 max-w-2xl mx-auto">Parcourez notre sélection {computeTitle(slug).toLowerCase()}.</p>
        </div>
      </header>

      <div className="container mx-auto py-12 md:py-16">
        <ProductCatalog selectedCategory={category} query={qParam} minPrice={min} maxPrice={max} />
      </div>
    </div>
  );
}


