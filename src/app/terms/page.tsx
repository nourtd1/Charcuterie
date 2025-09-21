export default function TermsPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative -mt-16 h-[36vh] w-full flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-accent/20 to-background" />
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-black font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Conditions Générales d’Utilisation</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Les règles d’utilisation de notre site et de nos services.</p>
        </div>
      </section>

      {/* Content Card */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="rounded-2xl bg-card/60 backdrop-blur-md border border-border/40 shadow-sm p-6 md:p-10">
            <p className="text-xs text-muted-foreground mb-6">Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</p>
            <div className="prose prose-invert max-w-none">
              <h2 id="commandes">Commandes</h2>
              <p>Les commandes sont soumises à disponibilité des produits et validation de paiement/livraison.</p>
              <h2 id="responsabilites">Responsabilités</h2>
              <p>Nous mettons tout en œuvre pour la qualité des informations et produits. En cas d’erreur manifeste, contactez-nous.</p>
              <h2 id="contact">Contact</h2>
              <p>Pour toute réclamation: <a href="mailto:certainmg32@gmail.com">certainmg32@gmail.com</a>.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


