import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Beef, GlassWater, Flame, Wine, Utensils, Star, ArrowRight, Truck, Percent } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { products } from '@/lib/data';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import CategoryPreview from '@/components/CategoryPreview';

const categoryIcons = {
  "Viandes": <Beef className="w-10 h-10 text-primary" />,
  "Boissons naturelles": <GlassWater className="w-10 h-10 text-primary" />,
  "Autres produits": <Flame className="w-10 h-10 text-primary" />,
  "Vins rouges": <Wine className="w-10 h-10 text-primary" />,
};

const categorySlugMap: Record<string, string> = {
  "Viandes": "viande",
  "Boissons naturelles": "boisson-naturelle",
  "Autres produits": "autres-produits",
  "Vins rouges": "vin-rouge",
};

const testimonials = [
  {
    name: "Jean D.",
    quote: "La viande fumée est tout simplement incroyable. On sent la qualité et le savoir-faire. Je recommande vivement !",
    stars: 5,
  },
  {
    name: "Marie L.",
    quote: "Enfin des jus naturels qui ont du goût ! Mention spéciale pour le jus de gingembre, parfait pour un coup de boost matinal.",
    stars: 5,
  },
  {
    name: "Paul B.",
    quote: "Service de livraison rapide et produits toujours frais. Julie's Gourmet est devenue mon épicerie de référence à Goma.",
    stars: 5,
  }
];

const recentBlogPost = {
    title: "Les secrets d'une planche de charcuterie parfaite",
    description: "Découvrez nos astuces pour composer une planche de charcuterie qui impressionnera vos invités à coup sûr.",
    image: "/assets/images/banners/accueil_banner.jpg",
    slug: "/blog/planche-charcuterie",
    dataAiHint: "charcuterie board",
};

const featuredProducts = products.slice(0, 8);
const discoverProducts = products.slice(8, 16);
const bestSellers = [...products].sort((a, b) => b.price - a.price).slice(0, 8);
const specialOffers = products.filter(p => p.price <= 5.5).slice(0, 8);
const buildWhatsAppLink = (productName: string) =>
  `https://wa.me/243972499388?text=${encodeURIComponent(
    `Bonjour, je suis intéressé(e) par le produit "${productName}". Pourriez-vous me donner le prix et les modalités de commande ?`
  )}`;

export default function Home() {
  return (
    <>
      {/* Hero Section - Refonte moderne */}
      <header className="relative -mt-16 h-[70vh] md:h-[65vh] w-full flex items-center justify-center text-center overflow-hidden">
        {/* Fond image WebP avec overlay dégradé */}
        <Image
          src="/assets/images/banners/accueil_banner.jpg"
          alt="Charcuterie & produits du terroir — Fraîcheur livrée chez vous"
          fill
          sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px"
          className="object-cover -z-20"
          priority
          data-ai-hint="gourmet food background"
        />
        {/* Overlay dégradé pour le contraste */}
        <div className="absolute inset-0 -z-10 hero-overlay" />

        {/* Contenu central */}
        <div className="relative z-10 max-w-5xl w-[92%] px-4">
          {/* Titre principal (H1) */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-headline text-white mb-4 leading-tight">
            Charcuterie & produits du terroir
          </h1>
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
            Fraîcheur livrée chez vous
          </div>
          
          {/* Sous-titre */}
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Produits artisanaux, sélection quotidienne. Livraison locale rapide à Goma – Trois Payotte.
          </p>

          {/* Barre de recherche */}
          <SearchBar className="mb-8 max-w-2xl mx-auto" />

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button 
              size="lg" 
              className="hero-cta-primary" 
              asChild
            >
              <Link href="/products">Voir le catalogue</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="hero-cta-secondary" 
              asChild
            >
              <Link href="/products?filter=promotions">Promotions</Link>
            </Button>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base">
            <Link 
              href="/products?category=viande" 
              className="hero-quick-link"
            >
              Viandes
            </Link>
            <span className="text-white/60">•</span>
            <Link 
              href="/products?category=boisson-naturelle" 
              className="hero-quick-link"
            >
              Boissons
            </Link>
            <span className="text-white/60">•</span>
            <Link 
              href="/products?filter=offres-du-jour" 
              className="hero-quick-link"
            >
              Offres du jour
            </Link>
          </div>
        </div>
      </header>

      {/* Import/Export Banner */}
      <section className="relative py-10 md:py-14 bg-secondary/30 overflow-hidden">
        <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-56 md:h-72 rounded-2xl overflow-hidden ring-1 ring-border/40 shadow-lg">
            <Image src="/assets/images/banners/promo_banner.jpg" alt="Logistique import/export" fill className="object-cover" data-ai-hint="logistics transport" />
          </div>
          <div>
            <Truck className="h-10 w-10 text-accent mb-3" />
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-foreground">Import / Export & Logistique</h2>
            <p className="text-muted-foreground mt-3">Nous sourçons et expédions des produits de qualité, avec une chaîne logistique fiable pour servir particuliers et professionnels.</p>
            <div className="mt-4">
              <Button asChild variant="outline"><Link href="/contact">Demander un devis</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto">
           <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Nos Catégories</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                Des saveurs pour chaque occasion, sélectionnées avec le plus grand soin.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
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

      {/* Category Preview Section */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Découvrez nos catégories</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
              Cliquez sur une catégorie pour voir tous les produits disponibles
            </p>
          </div>
          
          {/* Category Previews */}
          <div className="space-y-16">
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
      
      {/* Featured Products */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Produits mis en avant</h2>
              <p className="text-muted-foreground mt-2">Une sélection soignée à découvrir en premier.</p>
            </div>
            <Button asChild variant="link" className="h-auto p-0"><Link href="/products">Voir tout</Link></Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(p => (
              <Card key={p.id} className="overflow-hidden rounded-xl border border-border/40 bg-card/60 backdrop-blur-md shadow-sm">
                <div className="relative aspect-square">
                  <Image src={p.image} alt={p.name} fill className="object-cover" data-ai-hint={p.dataAiHint} />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-headline font-semibold line-clamp-1">{p.name}</h3>
                  <Button asChild variant="link" className="px-0 mt-1 text-primary">
                    <Link href={buildWhatsAppLink(p.name)} target="_blank" rel="noopener noreferrer">Demander le prix sur WhatsApp</Link>
                  </Button>
                  <Button asChild size="sm" className="mt-1"><Link href={`/products`}>Voir produit</Link></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Carousel */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">À découvrir</h2>
          </div>
          <Carousel opts={{ align: "start" }}>
            <CarouselContent>
              {discoverProducts.map(p => (
                <CarouselItem key={p.id} className="md:basis-1/2 lg:basis-1/4">
                  <Card className="overflow-hidden rounded-xl border border-border/40 bg-card/60 backdrop-blur-md shadow-sm">
                    <div className="relative aspect-square">
                      <Image src={p.image} alt={p.name} fill className="object-cover" data-ai-hint={p.dataAiHint} />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-headline font-semibold line-clamp-1">{p.name}</h3>
                      <Button asChild variant="link" className="px-0 mt-1 text-primary">
                        <Link href={buildWhatsAppLink(p.name)} target="_blank" rel="noopener noreferrer">Demander le prix sur WhatsApp</Link>
                      </Button>
                      <Button asChild size="sm" className="mt-1"><Link href={`/products`}>Voir produit</Link></Button>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Desktop controls inside Carousel */}
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
            {/* Mobile controls inside Carousel */}
            <div className="flex md:hidden justify-center gap-2 mt-4">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </Carousel>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Meilleures ventes</h2>
              <p className="text-muted-foreground mt-2">Les produits plébiscités par nos clients.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(p => (
              <Card key={p.id} className="overflow-hidden rounded-xl border border-border/40 bg-card/60 backdrop-blur-md shadow-sm">
                <div className="relative aspect-square">
                  <Image src={p.image} alt={p.name} fill className="object-cover" data-ai-hint={p.dataAiHint} />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center text-accent"><Star className="h-4 w-4 fill-accent" /></span>
                    <span className="text-xs text-muted-foreground">Populaire</span>
                  </div>
                  <h3 className="font-headline font-semibold mt-1 line-clamp-1">{p.name}</h3>
                  <Button asChild variant="link" className="px-0 mt-1 text-primary">
                    <Link href={buildWhatsAppLink(p.name)} target="_blank" rel="noopener noreferrer">Demander le prix sur WhatsApp</Link>
                  </Button>
                  <Button asChild size="sm" className="mt-1"><Link href={`/products`}>Voir produit</Link></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Offres spéciales</h2>
              <p className="text-muted-foreground mt-2">Des prix malins sur une sélection limitée.</p>
            </div>
            <Percent className="h-8 w-8 text-accent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialOffers.map(p => (
              <Card key={p.id} className="overflow-hidden rounded-xl border border-border/40 bg-card/60 backdrop-blur-md shadow-sm">
                <div className="relative aspect-square">
                  <Image src={p.image} alt={p.name} fill className="object-cover" data-ai-hint={p.dataAiHint} />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-headline font-semibold line-clamp-1">{p.name}</h3>
                  <Button asChild variant="link" className="px-0 mt-1 text-primary">
                    <Link href={buildWhatsAppLink(p.name)} target="_blank" rel="noopener noreferrer">Demander le prix sur WhatsApp</Link>
                  </Button>
                  <Button asChild size="sm" className="mt-1"><Link href={`/products`}>Voir produit</Link></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Snippet */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden ring-1 ring-border/40 shadow-lg">
                 <Image
                    src="/assets/images/team/gerant.jpg"
                    alt="Julie's Gourmet Goma Storefront"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    data-ai-hint="gourmet store"
                />
            </div>
            <div>
              <Utensils className="h-12 w-12 text-accent mb-4 drop-shadow-sm" />
              <h2 className="text-3xl md:text-4xl font-bold font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">Notre Histoire</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Julie's Gourmet Goma est née d'une passion pour les saveurs authentiques et les produits de qualité. Fondée au cœur de Goma, notre épicerie fine a pour mission de vous offrir le meilleur de la charcuterie, des vins sélectionnés et des produits naturels locaux.
              </p>
              <Button asChild variant="link" className="p-0 h-auto text-lg text-primary hover:text-accent transition-colors">
                <Link href="/about">En savoir plus <ArrowRight className="ml-2" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-12">Ce que nos clients disent</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/60 backdrop-blur-md border border-border/40 shadow-sm rounded-xl">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold font-headline">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Snippet */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-4">Notre Dernier Article</h2>
                  <h3 className="text-xl font-headline mb-2">{recentBlogPost.title}</h3>
                  <p className="text-muted-foreground mb-6">{recentBlogPost.description}</p>
                  <Button asChild>
                    <Link href={recentBlogPost.slug}>
                        Lire la suite <ArrowRight className="ml-2" />
                    </Link>
                  </Button>
                </div>
                 <Link href={recentBlogPost.slug}>
                    <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 rounded-2xl border border-border/40 bg-card/60 backdrop-blur-md">
                        <div className="relative aspect-video">
                            <Image src={recentBlogPost.image} alt={recentBlogPost.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover hover:scale-[1.02] transition-transform duration-500" data-ai-hint={recentBlogPost.dataAiHint} />
                        </div>
                    </Card>
                 </Link>
            </div>
        </div>
      </section>

      {/* Delivery Information Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-accent text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">
            Livraison à Domicile
          </h2>
          <p className="max-w-3xl mx-auto text-primary-foreground/80 mb-8">
            Profitez de nos produits frais livrés directement à votre porte. Simple, rapide et fiable.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-background/10 rounded-xl ring-1 ring-background/20">
              <h3 className="text-xl font-bold font-headline">Commande Minimum</h3>
              <p className="text-3xl font-black mt-2">$20</p>
              <p className="text-primary-foreground/80 mt-2 text-sm">Pour toute commande à livrer.</p>
            </div>
            <div className="p-6 bg-background/10 rounded-xl ring-1 ring-background/20">
              <h3 className="text-xl font-bold font-headline">Fenêtre de Livraison</h3>
              <p className="text-3xl font-black mt-2">9h - 18h</p>
              <p className="text-primary-foreground/80 mt-2 text-sm">Du Lundi au Samedi.</p>
            </div>
            <div className="p-6 bg-background/10 rounded-xl ring-1 ring-background/20">
              <h3 className="text-xl font-bold font-headline">Livraison Gratuite</h3>
              <p className="text-3xl font-black mt-2">&gt; $100</p>
              <p className="text-primary-foreground/80 mt-2 text-sm">Pour les commandes dépassant 100 $.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
