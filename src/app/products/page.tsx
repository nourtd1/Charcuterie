import ProductCatalog from "@/components/ProductCatalog";
import CategoryCard from "@/components/CategoryCard";
import CategoryPreview from "@/components/CategoryPreview";
import type { ProductCategory } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Shield, CreditCard, Beef, GlassWater, Flame, Wine } from "lucide-react";
import { products } from "@/lib/data";
import SearchBar from "@/components/SearchBar";

const slugToCategory: Record<string, ProductCategory> = {
  "viande": "Viandes",
  "viandes": "Viandes",
  "boisson-naturelle": "Boissons naturelles",
  "boissons-naturelles": "Boissons naturelles",
  "autres-produits": "Autres produits",
  "autre-produit": "Autres produits",
  "vin-rouge": "Vins rouges",
  "vins-rouges": "Vins rouges",
};

// Icônes et slugs utilisés pour l'affichage comme sur la page d'accueil
const categoryIcons: Record<string, React.ReactNode> = {
  "Viandes": <Beef className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  "Boissons naturelles": <GlassWater className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  "Autres produits": <Flame className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
  "Vins rouges": <Wine className="w-8 h-8 md:w-10 md:h-10 text-primary" />,
};

const categorySlugMap: Record<string, string> = {
  "Viandes": "viande",
  "Boissons naturelles": "boisson-naturelle",
  "Autres produits": "autres-produits",
  "Vins rouges": "vin-rouge",
};

function normalizeCategory(param?: string): ProductCategory | undefined {
  if (!param) return undefined;
  const v = decodeURIComponent(param).trim().toLowerCase().replace(/\s+/g, '-');
  if (slugToCategory[v]) return slugToCategory[v];
  // fallback: startsWith heuristique
  if (v.startsWith("viande")) return "Viandes";
  if (v.startsWith("boisson")) return "Boissons naturelles";
  if (v.startsWith("autre")) return "Autres produits";
  if (v.startsWith("vin")) return "Vins rouges";
  return undefined;
}

export default async function ProductsPage({ searchParams }: { searchParams?: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const params = (await searchParams) || {};
  const qParam = typeof params.q === 'string' ? params.q : undefined;
  const categoryParam = typeof params.category === 'string' ? params.category : undefined;
  const normalizedCategory = normalizeCategory(categoryParam);
  const discoverProducts = products.slice(8, 16);

  return (
    <div className="bg-background">
      {/* Hero Produits - uniforme avec la home */}
      <header className="relative -mt-16 h-[70vh] md:h-[65vh] w-full flex items-center justify-center text-center overflow-hidden">
        {/* Fond image + overlay */}
        <Image
          src="/assets/images/banners/accueil_banner.jpg"
          alt="Charcuterie & produits du terroir — Boutique"
          fill
          sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px"
          className="object-cover z-0"
          priority
        />
        <div className="absolute inset-0 z-10 hero-overlay" />

        {/* Contenu central */}
        <div className="relative z-20 max-w-5xl w-[92%] px-4 text-white">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-headline mb-2 leading-tight">
            Notre Catalogue
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Produits artisanaux, sélection quotidienne. Livraison locale rapide à Goma – Trois Payotte.
          </p>

          {/* Barre de recherche (redirige vers /products?q=...) */}
          <SearchBar className="mb-8 max-w-2xl mx-auto" targetPath="/products" />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button size="lg" className="hero-cta-primary" asChild>
              <Link href="/products">Voir le catalogue</Link>
            </Button>
            <Button size="lg" variant="outline" className="hero-cta-secondary" asChild>
              <Link href="/products?filter=promotions">Promotions</Link>
            </Button>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base">
            <Link href="/products?category=viande" className="hero-quick-link">Viandes</Link>
            <span className="text-white/60">•</span>
            <Link href="/products?category=boisson-naturelle" className="hero-quick-link">Boissons</Link>
            <span className="text-white/60">•</span>
            <Link href="/products?filter=offres-du-jour" className="hero-quick-link">Offres du jour</Link>
          </div>
        </div>
      </header>

      {/* Avantages */}
      <section className="py-10 md:py-14 bg-secondary/30">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-sm rounded-xl">
            <CardHeader className="flex-row items-center gap-3">
              <Truck className="h-6 w-6 text-accent" />
              <CardTitle className="font-headline">Livraison rapide</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">Commande minimum $20. Livraison 9h - 18h, Lun-Sam.</CardContent>
          </Card>
          <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-sm rounded-xl">
            <CardHeader className="flex-row items-center gap-3">
              <Shield className="h-6 w-6 text-accent" />
              <CardTitle className="font-headline">Qualité garantie</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">Sélection soignée de produits authentiques et frais.</CardContent>
          </Card>
          <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-sm rounded-xl">
            <CardHeader className="flex-row items-center gap-3">
              <CreditCard className="h-6 w-6 text-accent" />
              <CardTitle className="font-headline">Paiement simple</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">Processus de commande fluide et sécurisé.</CardContent>
          </Card>
        </div>
      </section>

      

      {/* Catégories en cartes (uniformisé avec l'accueil) */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary">Parcourir par catégorie</h2>
            <p className="text-muted-foreground mt-2">Accédez rapidement à ce qui vous intéresse.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Object.entries(categoryIcons).map(([category, icon]) => (
              <CategoryCard
                key={category}
                category={category}
                icon={icon}
                slug={categorySlugMap[category]}
                showProductCount={true}
                variant="default"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Aperçu des catégories (uniformisé avec l'accueil) */}
      <section className="py-12 md:py-16 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary">Aperçu par catégorie</h2>
            <p className="text-muted-foreground mt-2">Un coup d'œil aux produits populaires par catégorie.</p>
          </div>
          <div className="space-y-12">
            {Object.entries(categoryIcons).map(([category, icon]) => (
              <CategoryPreview
                key={category}
                category={category}
                icon={icon}
                slug={categorySlugMap[category]}
                maxProducts={4}
              />
            ))}
          </div>
        </div>
      </section>

      

      {/* Catalogue */}
      <div className="container mx-auto py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Nos Produits</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                Parcourez nos catégories pour trouver des produits de qualité supérieure, sélectionnés avec soin pour vous.
            </p>
        </div>
        <ProductCatalog selectedCategory={normalizedCategory} query={qParam} />
      </div>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary text-center mb-8">FAQ</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <details className="group rounded-lg border border-border/40 bg-card/60 backdrop-blur-md p-4">
              <summary className="cursor-pointer font-semibold font-headline">Quels sont les délais et zones de livraison ?</summary>
              <p className="mt-2 text-muted-foreground">Livraison du lundi au samedi, 9h-18h, avec commande minimum de $20. Livraison offerte au-delà de $100.</p>
            </details>
            <details className="group rounded-lg border border-border/40 bg-card/60 backdrop-blur-md p-4">
              <summary className="cursor-pointer font-semibold font-headline">Puis-je retourner un produit ?</summary>
              <p className="mt-2 text-muted-foreground">Contactez-nous sous 48h après réception en expliquant le souci. Nous trouverons la meilleure solution.</p>
            </details>
            <details className="group rounded-lg border border-border/40 bg-card/60 backdrop-blur-md p-4">
              <summary className="cursor-pointer font-semibold font-headline">Comment suivre ma commande ?</summary>
              <p className="mt-2 text-muted-foreground">Vous recevrez des mises à jour par message. Pour toute question, rendez-vous sur la page Contact.</p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
