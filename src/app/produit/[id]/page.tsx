import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import type { Product } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function findProduct(idOrSlug: string): Product | undefined {
  const numeric = Number(idOrSlug);
  if (!Number.isNaN(numeric)) {
    return products.find(p => p.id === numeric);
  }
  return products.find(p => p.slug === idOrSlug);
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = findProduct(params.id);
  if (!product) return notFound();

  const similar = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 8);

  const whatsappLink = `https://wa.me/243972499388?text=${encodeURIComponent(
    `Bonjour, je suis intéressé(e) par le produit "${product.name}". Pourriez-vous me donner le prix et les modalités de commande ?`
  )}`;

  return (
    <div className="bg-background">
      <div className="container mx-auto py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-square rounded-xl overflow-hidden border border-border/40">
            <Image src={product.image} alt={product.name} fill className="object-cover" data-ai-hint={product.dataAiHint} />
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-black font-headline text-primary">{product.name}</h1>
            <p className="mt-3 text-muted-foreground">{product.description}</p>
            <div className="mt-6 flex gap-3">
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">Demander le prix</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/categories/${product.category.toLowerCase().startsWith('vin') ? 'vins' : product.category.toLowerCase().startsWith('boisson') ? 'boissons-naturelles' : product.category.toLowerCase().startsWith('viande') ? 'viandes' : 'autres-produits'}`}>Voir la catégorie</Link>
              </Button>
            </div>
          </div>
        </div>

        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary mb-6">Produits similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {similar.map(p => (
                <Card key={p.id} className="overflow-hidden rounded-xl border border-border/40 bg-card/60 backdrop-blur-md shadow-sm">
                  <div className="relative aspect-square">
                    <Image src={p.image} alt={p.name} fill className="object-cover" data-ai-hint={p.dataAiHint} />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-headline font-semibold line-clamp-1">{p.name}</h3>
                    <Button asChild size="sm" className="mt-2">
                      <Link href={`/produit/${p.id}`}>Voir produit</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}


