import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Award, Lightbulb, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative -mt-16 h-[32vh] md:h-[40vh] w-full flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/assets/images/banners/accueil_banner.jpg"
          alt="Charcuterie & produits du terroir — À propos"
          fill
          sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px"
          className="object-cover -z-20"
          priority
        />
        <div className="absolute inset-0 -z-10 hero-overlay" />
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-black font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">À propos de Certains</h1>
          <p className="mt-3 text-muted-foreground max-w-3xl mx-auto">
            Alimentation & charcuterie, portée par l’exigence de la qualité et l’esprit d’entreprendre.
          </p>
        </div>
      </section>

      <div className="container mx-auto py-12 md:py-16">
        {/* Bio + Portrait */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold font-headline text-foreground mb-4">Faida Kilimushi Julienne</h2>
            <div className="prose prose-invert max-w-none text-muted-foreground">
              <p>Faida Kilimushi Julienne est une entrepreneure congolaise originaire du Sud-Kivu, en République Démocratique du Congo (RDC), où elle est née et a grandi. Très tôt animée par une passion pour le commerce et l’indépendance financière, elle a choisi de se lancer dans l’entrepreneuriat comme moyen de bâtir son avenir et d’apporter une contribution positive à sa communauté.</p>
              <p>En 2024, elle fait ses premiers pas dans le domaine du commerce de la charcuterie. Ses débuts, marqués par un engagement sans faille et un travail acharné, lui permettent de rapidement se faire remarquer pour son sérieux, son professionnalisme et son sens aigu des affaires.</p>
              <p>Portée par sa vision et sa détermination, Faida décide d’étendre ses activités au-delà du Sud-Kivu pour s’installer à Goma, une ville stratégique et dynamique de l’Est du Congo. Là, elle développe son commerce et fonde une enseigne qui deviendra sa marque de référence : « Certains », une alimentation et charcuterie qui connaît aujourd’hui une belle réputation dans la région.</p>
              <p>Son entreprise propose principalement des produits de viande de qualité, mais aussi des jus 100 % naturels, répondant ainsi aux attentes d’une clientèle variée soucieuse de consommer des produits sains et authentiques. Grâce à cette diversité, elle attire à la fois des familles, des jeunes et des professionnels qui voient en « Certains » une adresse de confiance.</p>
              <p>Au-delà de l’aspect commercial, le parcours de Faida illustre une volonté constante de progresser et de s’imposer comme un modèle de persévérance féminine dans l’entrepreneuriat. Elle incarne une nouvelle génération de femmes d’affaires congolaises, dynamiques et engagées, qui participent activement au développement économique local.</p>
              <p>Aujourd’hui, Faida Kilimushi Julienne continue de bâtir son histoire autour de trois piliers essentiels.</p>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link href="/products">Découvrir la boutique</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
          <div>
            <Card>
                <CardContent className="p-0">
                    <div className="relative w-full aspect-[1/2] sm:aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4] overflow-hidden rounded-xl border border-border/40 shadow-sm bg-muted">
                      <Image
                        src="/assets/images/team/gerant.jpg"
                        alt="Portrait du gérant – charcuterie & alimentation Certains"
                        fill
                        sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
                        className="object-cover object-center"
                        priority
                        data-ai-hint="team portrait"
                      />
                    </div>
                </CardContent>
            </Card>
          </div>
        </div>

        {/* Valeurs */}
        <section className="mt-16">
          <h3 className="text-2xl font-extrabold font-headline text-foreground text-center">Nos piliers</h3>
          <p className="text-center text-muted-foreground mt-2">Ce qui guide « Certains » au quotidien.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Award className="h-6 w-6 text-accent" />
                  <h4 className="text-lg font-semibold">Qualité</h4>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Sélection rigoureuse des viandes et produits naturels pour fidéliser notre clientèle.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Lightbulb className="h-6 w-6 text-accent" />
                  <h4 className="text-lg font-semibold">Innovation</h4>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Offres et services qui se démarquent dans un secteur concurrentiel.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-accent" />
                  <h4 className="text-lg font-semibold">Résilience</h4>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Faire face aux défis économiques et logistiques propres à la région.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact rapide */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-lg border border-border/40 bg-card/60 backdrop-blur-md p-6">
            <h2 className="text-xl font-semibold font-headline mb-2">Nous contacter</h2>
            <p className="text-sm text-muted-foreground mb-4">Pour toute question, commande ou devis.</p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> +243 972 499 388</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> +243 840 985 905</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> certainmg32@gmail.com</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
