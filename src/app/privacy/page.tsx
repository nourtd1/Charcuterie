import Image from "next/image";

export default function PrivacyPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative -mt-16 h-[36vh] w-full flex items-center justify-center text-center overflow-hidden">
        <Image
          src="/assets/images/banners/accueil_banner.jpg"
          alt="Politique de Confidentialité"
          fill
          sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px"
          className="object-cover -z-20"
          priority
        />
        <div className="absolute inset-0 -z-10 hero-overlay" />
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-black font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Politique de Confidentialité</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Comment nous collectons et protégeons vos données.</p>
        </div>
      </section>

      {/* Content Card */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-2xl bg-card/60 backdrop-blur-md border border-border/40 shadow-sm p-6 md:p-10">
            <p className="text-xs text-muted-foreground mb-6">Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</p>
            <div className="prose prose-invert max-w-none">
              <h2 id="donnees">Données collectées</h2>
              <ul>
                <li>Informations de contact (email, téléphone) lors des échanges et commandes.</li>
                <li>Données d’usage du site (cookies analytiques).</li>
              </ul>
              <h2 id="utilisation">Utilisation</h2>
              <p>Amélioration du service, traitement des commandes, et communication sur vos demandes.</p>
              <h2 id="securite">Sécurité</h2>
              <p>Nous mettons en place des mesures raisonnables pour protéger vos données contre l’accès non autorisé.</p>
              <h2 id="contact">Contact</h2>
              <p>Pour toute question, écrivez à <a href="mailto:certainmg32@gmail.com">certainmg32@gmail.com</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


