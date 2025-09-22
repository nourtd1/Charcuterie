import Image from "next/image";

export default function CookiesPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative -mt-16 h-[36vh] w-full flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/assets/images/banners/accueil_banner.jpg"
          alt="Politique de Cookies"
          fill
          sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px"
          className="object-cover -z-20"
          priority
        />
        <div className="absolute inset-0 -z-10 hero-overlay" />
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-black font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Politique de Cookies</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Comprendre et gérer les cookies utilisés sur notre site.</p>
        </div>
      </section>

      {/* Content Card */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-2xl bg-card/60 backdrop-blur-md border border-border/40 shadow-sm p-6 md:p-10">
            <p className="text-xs text-muted-foreground mb-6">Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</p>
            <div className="prose prose-invert max-w-none">
              <h2 id="types">Types de cookies</h2>
              <ul>
                <li>Cookies nécessaires au fonctionnement du site.</li>
                <li>Cookies analytiques pour mesurer l’audience.</li>
              </ul>
              <h2 id="gestion">Gestion</h2>
              <p>Vous pouvez configurer votre navigateur pour refuser les cookies non essentiels.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


