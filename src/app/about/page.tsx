import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-black font-headline text-primary mb-6">
              Notre Histoire
            </h1>
            <div className="space-y-6 text-muted-foreground text-lg">
                <p>
                    charcuterie & alimentation certains est née d'une passion pour les saveurs authentiques et les produits de qualité. Fondée au cœur de Goma, notre maison a pour mission de vous offrir le meilleur de la charcuterie, des vins sélectionnés et des produits naturels locaux.
                </p>
                <p>
                    Nous croyons en la valeur du fait-maison et du savoir-faire traditionnel. Chaque produit que nous proposons est soigneusement choisi ou préparé pour garantir une expérience gustative inoubliable.
                </p>
                <p>
                    Plus qu'une simple boutique, nous sommes une famille qui souhaite partager son amour de la bonne chère avec vous. Merci de faire partie de notre histoire.
                </p>
            </div>
          </div>
          <div>
            <Card>
                <CardContent className="p-0">
                    <Image 
                        src="/assets/images/team/gerant.jpg"
                        alt="L'équipe de charcuterie & alimentation certains"
                        width={800}
                        height={600}
                        className="rounded-lg object-cover"
                        data-ai-hint="team portrait"
                    />
                </CardContent>
            </Card>
          </div>
        </div>
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
