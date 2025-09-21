import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Les secrets d'une planche de charcuterie parfaite",
    description: "Découvrez nos astuces pour composer une planche de charcuterie qui impressionnera vos invités à coup sûr.",
    image: "/assets/images/banners/accueil_banner.jpg",
    slug: "/blog/planche-charcuterie",
    dataAiHint: "charcuterie board",
  },
  {
    id: 2,
    title: "Accords Vins et Fromages : Le guide du débutant",
    description: "Ne vous trompez plus jamais en associant vin et fromage. Voici nos conseils pour des accords parfaits.",
    image: "/assets/images/banners/promo_banner.jpg",
    slug: "/blog/accords-vins-fromages",
    dataAiHint: "wine cheese",
  },
  {
    id: 3,
    title: "Recette : Notre marinade secrète pour le porc fumé",
    description: "Nous partageons exceptionnellement notre recette de marinade qui rend notre porc fumé si unique et savoureux.",
    image: "/assets/images/banners/saison_banner.jpg",
    slug: "/blog/recette-porc-fume",
    dataAiHint: "smoked pork",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-secondary/30">
        <div className="container mx-auto py-16 md:py-24">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black font-headline text-primary">Notre Blog</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Conseils, recettes et histoires de notre épicerie.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                    <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <CardHeader className="p-0">
                            <div className="relative aspect-video">
                                <Image src={post.image} alt={post.title} fill className="object-cover" data-ai-hint={post.dataAiHint} />
                            </div>
                        </CardHeader>
                        <CardContent className="p-6 flex-grow">
                            <CardTitle className="font-headline text-xl mb-2">{post.title}</CardTitle>
                            <CardDescription>{post.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                             <Button asChild variant="link" className="p-0 h-auto">
                                <Link href={post.slug}>
                                    Lire la suite <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    </div>
  );
}
