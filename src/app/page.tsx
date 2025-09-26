import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Beef, GlassWater, Flame, Wine, Utensils, Star, ArrowRight, Truck, Percent, ShieldCheck, Award, Leaf, Globe, Package, Ship } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { products } from '@/lib/data';
import SearchBar from '@/components/SearchBar';
import CategoryCard from '@/components/CategoryCard';
import CategoryPreview from '@/components/CategoryPreview';
import Reveal from '@/components/Reveal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
    quote: "Service de livraison rapide et produits toujours frais. Alimentation Certains est devenue mon épicerie de référence à Goma.",
    stars: 5,
  }
];

const recentBlogPost = {
    title: "Les secrets d'une planche de charcuterie parfaite",
    description: "Découvrez nos astuces pour composer une planche de charcuterie qui impressionnera vos invités à coup sûr.",
    image: "/assets/images/banners/accueil_banner.jpg",
    slug: "/blog",
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
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002';

export default function Home() {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: "Alimentation Certains",
    url: siteUrl,
    logo: `${siteUrl}/assets/images/logo/logo.png`,
    sameAs: ['https://wa.me/243972499388']
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: "Alimentation Certains",
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
  return (
    <>
      {/* Hero Carousel - plus pro */}
      <section className="relative -mt-16 overflow-hidden">
        <Carousel opts={{ align: 'start', loop: true }}>
          <CarouselContent>
            {[{
              image: '/assets/images/banners/accueil_banner.jpg',
              title: "Charcuterie & produits du terroir",
              subtitle: "Fraîcheur livrée chez vous",
              hint: 'gourmet food background'
            }, {
              image: '/assets/images/banners/promo_banner.jpg',
              title: "Promotions de la semaine",
              subtitle: "Des offres à ne pas manquer",
              hint: 'weekly deals banner'
            }, {
              image: '/assets/images/banners/saison_banner.jpg',
              title: "Saveurs de saison",
              subtitle: "Sélection fraîche du moment",
              hint: 'seasonal products banner'
            }].map((slide, idx) => (
              <CarouselItem key={idx}>
                <header className="relative h-[75vh] sm:h-[70vh] md:h-[65vh] w-full flex items-center justify-center text-center" role="banner" aria-label="Section d'accueil principale">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px"
                    className="object-cover -z-20"
                    priority={idx === 0}
                    data-ai-hint={slide.hint}
                    quality={85}
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-0 -z-10 hero-overlay" />
                  <div className="relative z-10 max-w-6xl w-[95%] sm:w-[92%] px-3 sm:px-4 flex flex-col items-center justify-center min-h-full py-8 sm:py-12">
                    {/* Titre principal avec animation d'entrée */}
                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black font-headline text-white mb-3 sm:mb-4 leading-tight animate-slide-in-left">
                      {slide.title}
                    </h1>
                    
                    {/* Sous-titre avec animation d'entrée */}
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3 animate-slide-in-right">
                      {slide.subtitle}
                    </div>
                    
                    {/* Description avec animation fade-in */}
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2 animate-fade-in-up">
                      Produits artisanaux, sélection quotidienne. Livraison locale rapide à Goma – Trois Payotte.
                    </p>
                    
                    {/* Phrase d'accroche animée avec rotation des messages */}
                    <div className="mb-8 sm:mb-10 text-center">
                      <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white/95 mb-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className="inline-block animate-bounce text-2xl">✨</span>
                          <span className="animate-pulse">Fraîcheur garantie</span>
                          <span className="inline-block animate-bounce text-2xl delay-100">✨</span>
                        </div>
                      </div>
                      <div className="text-base sm:text-lg md:text-xl text-white/80 animate-fade-in-up">
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                          <span className="inline-flex items-center gap-1">
                            <Truck className="w-4 h-4" />
                            Livraison rapide à Goma
                          </span>
                          <span className="hidden sm:inline text-white/40">•</span>
                          <span className="inline-flex items-center gap-1">
                            <Leaf className="w-4 h-4" />
                            Produits artisanaux
                          </span>
                          <span className="hidden sm:inline text-white/40">•</span>
                          <span className="inline-flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            Qualité premium
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bouton CTA principal moderne avec animations avancées */}
                    <div className="mb-6 sm:mb-8">
                      <Button 
                        size="lg" 
                        className="hero-cta-modern group relative overflow-hidden bg-gradient-to-r from-primary via-orange-500 to-accent hover:from-primary/90 hover:via-orange-400 hover:to-accent/90 text-white font-bold text-lg sm:text-xl px-8 sm:px-12 py-4 sm:py-5 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 hover:animate-pulse border-2 border-white/20 hover:border-white/40" 
                        asChild
                      >
                        <Link href="/products" aria-label="Commander maintenant nos produits">
                          <span className="relative z-10 flex items-center gap-3">
                            <span className="group-hover:animate-bounce">🛒</span>
                            Commander maintenant
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-accent via-orange-400 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </Link>
                      </Button>
                    </div>
                    <nav className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm md:text-base" role="navigation" aria-label="Navigation rapide">
                      <a href="#viande" className="hero-quick-link" aria-label="Aller à la section viandes">Viande</a>
                      <span className="text-white/60" aria-hidden="true">•</span>
                      <a href="#boisson" className="hero-quick-link" aria-label="Aller à la section boissons">Boisson</a>
                      <span className="text-white/60" aria-hidden="true">•</span>
                      <a href="#offre-du-jour" className="hero-quick-link" aria-label="Aller à la section offres du jour">Offre du jour</a>
                    </nav>
                  </div>
                </header>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </section>

      {/* KPI Stats Strip */}
      <section className="py-8 md:py-12 bg-background border-t border-border/40">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="p-4 rounded-xl border border-border/40 bg-card/60 backdrop-blur-md text-center">
            <p className="text-3xl md:text-4xl font-black font-headline text-primary">150+</p>
            <p className="text-sm text-muted-foreground mt-1">Produits sélectionnés</p>
          </div>
          <div className="p-4 rounded-xl border border-border/40 bg-card/60 backdrop-blur-md text-center">
            <p className="text-3xl md:text-4xl font-black font-headline text-primary">98%</p>
            <p className="text-sm text-muted-foreground mt-1">Clients satisfaits</p>
          </div>
          <div className="p-4 rounded-xl border border-border/40 bg-card/60 backdrop-blur-md text-center">
            <p className="text-3xl md:text-4xl font-black font-headline text-primary">24h</p>
            <p className="text-sm text-muted-foreground mt-1">Livraison locale moyenne</p>
          </div>
          <div className="p-4 rounded-xl border border-border/40 bg-card/60 backdrop-blur-md text-center">
            <p className="text-3xl md:text-4xl font-black font-headline text-primary">300+</p>
            <p className="text-sm text-muted-foreground mt-1">Commandes livrées</p>
          </div>
        </div>
      </section>

      {/* Import/Export & Logistique - section améliorée */}
      <section className="relative py-12 md:py-16 bg-secondary/30 overflow-hidden">
        <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Texte & points clés */}
          <Reveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/30">
                <Truck className="h-5 w-5 text-accent" />
              </span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/30">
                <Globe className="h-5 w-5 text-primary" />
              </span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 ring-1 ring-foreground/20">
                <Ship className="h-5 w-5 text-foreground" />
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-foreground">Import / Export & Logistique</h2>
            <p className="text-muted-foreground mt-3 max-w-xl">De l'approvisionnement à la livraison finale, nous orchestrons une chaîne logistique fiable pour particuliers et professionnels, avec un suivi transparent à chaque étape.</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/60 backdrop-blur-md p-4">
                <Package className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-headline font-semibold">Sourcing sécurisé</p>
                  <p className="text-sm text-muted-foreground">Sélection des meilleurs fournisseurs et contrôle qualité.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/60 backdrop-blur-md p-4">
                <Ship className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-headline font-semibold">Acheminement optimisé</p>
                  <p className="text-sm text-muted-foreground">Transport maritime, aérien et routier selon vos délais.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/60 backdrop-blur-md p-4">
                <Globe className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-headline font-semibold">Douanes simplifiées</p>
                  <p className="text-sm text-muted-foreground">Gestion documentaire et conformité réglementaire.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border/40 bg-card/60 backdrop-blur-md p-4">
                <Truck className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="font-headline font-semibold">Livraison locale</p>
                  <p className="text-sm text-muted-foreground">Dernier kilomètre fiable à Goma et environs.</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button asChild><Link href="/contact">Demander un devis</Link></Button>
              <Button asChild variant="outline"><Link href="/about">En savoir plus</Link></Button>
            </div>
          </Reveal>

          {/* Visuel */}
          <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden ring-1 ring-border/40 shadow-lg">
            <Image src="/assets/images/banners/promo_banner.jpg" alt="Chaîne logistique" fill className="object-cover" data-ai-hint="supply chain logistics map" />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-background/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border/40 bg-background/70 backdrop-blur p-3">
                <p className="text-xs text-muted-foreground">Délai moyen</p>
                <p className="text-sm font-headline font-semibold">5-10 jours</p>
              </div>
              <div className="rounded-xl border border-border/40 bg-background/70 backdrop-blur p-3">
                <p className="text-xs text-muted-foreground">Taux de fiabilité</p>
                <p className="text-sm font-headline font-semibold">98%</p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Categories Section */}
      <section id="categories" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Nos Catégories</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                Des saveurs pour chaque occasion, sélectionnées avec le plus grand soin.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {Object.entries(categoryIcons).map(([category, icon]) => (
              <Reveal key={category}>
              <CategoryCard
                key={category}
                category={category}
                icon={icon}
                slug={categorySlugMap[category]}
                showProductCount={true}
                variant="default"
              />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Category Preview Section */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Découvrez nos catégories</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
              Cliquez sur une catégorie pour voir tous les produits disponibles
            </p>
          </Reveal>
          
          {/* Category Previews */}
          <div className="space-y-16">
            {Object.entries(categoryIcons).map(([category, icon]) => (
              <div key={category} id={category === 'Viandes' ? 'viande' : (category === 'Boissons naturelles' ? 'boisson' : undefined)}>
                <Reveal>
                  <CategoryPreview
                    category={category}
                    icon={icon}
                    slug={categorySlugMap[category]}
                    maxProducts={4}
                  />
                </Reveal>
              </div>
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
              <Card key={p.id} className="overflow-hidden rounded-xl border border-border/40 bg-card/60 backdrop-blur-md shadow-sm group transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-square">
                  <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={p.dataAiHint} />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-headline font-semibold line-clamp-1">{p.name}</h3>
                  <Button asChild variant="link" className="px-0 mt-1 text-primary">
                    <Link href={buildWhatsAppLink(p.name)} target="_blank" rel="noopener noreferrer">Demander le prix sur WhatsApp</Link>
                  </Button>
                  <Button asChild size="sm" className="mt-1"><Link href={`/produit/${p.id}`}>Voir produit</Link></Button>
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
                  <Card className="overflow-hidden rounded-xl border border-border/40 bg-card/60 backdrop-blur-md shadow-sm group transition-all duration-300 hover:shadow-xl">
                    <div className="relative aspect-square">
                      <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={p.dataAiHint} />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-headline font-semibold line-clamp-1">{p.name}</h3>
                      <Button asChild variant="link" className="px-0 mt-1 text-primary">
                        <Link href={buildWhatsAppLink(p.name)} target="_blank" rel="noopener noreferrer">Demander le prix sur WhatsApp</Link>
                      </Button>
                      <Button asChild size="sm" className="mt-1"><Link href={`/produit/${p.id}`}>Voir produit</Link></Button>
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
              <Card key={p.id} className="overflow-hidden rounded-xl border border-border/40 bg-card/60 backdrop-blur-md shadow-sm group transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-square">
                  <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={p.dataAiHint} />
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
                  <Button asChild size="sm" className="mt-1"><Link href={`/produit/${p.id}`}>Voir produit</Link></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section id="offre-du-jour" className="py-16 md:py-20 bg-background">
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
              <Card key={p.id} className="overflow-hidden rounded-xl border border-border/40 bg-card/60 backdrop-blur-md shadow-sm group transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-square">
                  <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={p.dataAiHint} />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-headline font-semibold line-clamp-1">{p.name}</h3>
                  <Button asChild variant="link" className="px-0 mt-1 text-primary">
                    <Link href={buildWhatsAppLink(p.name)} target="_blank" rel="noopener noreferrer">Demander le prix sur WhatsApp</Link>
                  </Button>
                  <Button asChild size="sm" className="mt-1"><Link href={`/produit/${p.id}`}>Voir produit</Link></Button>
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
                    alt="Alimentation Certains Storefront"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-[50%_22%] md:object-[50%_18%]"
                    data-ai-hint="gourmet store"
                />
            </div>
            <Reveal>
              <Utensils className="h-12 w-12 text-accent mb-4 drop-shadow-sm" />
              <h2 className="text-3xl md:text-4xl font-bold font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">Notre Histoire</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Alimentation Certains est née d'une passion pour les saveurs authentiques et les produits de qualité. Fondée au cœur de Goma, notre épicerie fine a pour mission de vous offrir le meilleur de la charcuterie, des vins sélectionnés et des produits naturels locaux.
              </p>
              <Button asChild variant="link" className="p-0 h-auto text-lg text-primary hover:text-accent transition-colors">
                <Link href="/about">En savoir plus <ArrowRight className="ml-2" /></Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border/40 bg-card/60 backdrop-blur-md text-center">
              <ShieldCheck className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="font-headline font-semibold">Qualité Contrôlée</h3>
              <p className="text-muted-foreground mt-1">Sélection rigoureuse de nos producteurs et de nos lots.</p>
            </div>
            <div className="p-6 rounded-xl border border-border/40 bg-card/60 backdrop-blur-md text-center">
              <Award className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="font-headline font-semibold">Service 5 étoiles</h3>
              <p className="text-muted-foreground mt-1">Des centaines de clients satisfaits à Goma.</p>
            </div>
            <div className="p-6 rounded-xl border border-border/40 bg-card/60 backdrop-blur-md text-center">
              <Leaf className="h-10 w-10 text-accent mx-auto mb-3" />
              <h3 className="font-headline font-semibold">Produits Naturels</h3>
              <p className="text-muted-foreground mt-1">Sans artifices. Goûts authentiques et traçabilité.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary text-center mb-8">FAQ</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-commande">
              <AccordionTrigger>Comment passer commande ?</AccordionTrigger>
              <AccordionContent>
                Parcourez le catalogue, ouvrez une fiche produit et utilisez le bouton WhatsApp
                pour demander le prix et finaliser votre commande avec notre équipe.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-livraison">
              <AccordionTrigger>Quels sont les délais de livraison ?</AccordionTrigger>
              <AccordionContent>
                Livraison locale à Goma en 24h en moyenne, du lundi au samedi (9h–18h).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-paiement">
              <AccordionTrigger>Quels moyens de paiement acceptez‑vous ?</AccordionTrigger>
              <AccordionContent>
                Paiement à la livraison ou selon les modalités convenues via WhatsApp (cash ou mobile money).
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-qualite">
              <AccordionTrigger>Comment garantissez‑vous la qualité des produits ?</AccordionTrigger>
              <AccordionContent>
                Sélection rigoureuse des fournisseurs, contrôle des lots et chaîne du froid maîtrisée.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-12">Ce que nos clients disent</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card/60 backdrop-blur-md border border-border/40 shadow-sm rounded-xl hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-accent fill-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-4 leading-relaxed">"{testimonial.quote}"</p>
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

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">Restez informé(e)</h2>
          <p className="text-muted-foreground mt-2 mb-6">Recevez nos nouvelles, offres et arrivages en avant-première.</p>
          <div className="mx-auto max-w-xl flex flex-col sm:flex-row gap-3">
            <Input type="email" placeholder="Votre email" className="h-11" />
            <Button className="h-11" asChild>
              <Link href="https://wa.me/243972499388" target="_blank" rel="noopener noreferrer">S'inscrire</Link>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">En cliquant, vous acceptez nos <Link href="/privacy" className="underline">règles de confidentialité</Link>.</p>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </>
  );
}
