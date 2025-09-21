"use client";

import { useCart } from "@/hooks/use-cart";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, getCartItemCount } = useCart();
  const totalItems = getCartItemCount();
  const subtotal = 0;
  const shippingCost = 0;
  const total = 0;
  const buildWhatsAppLink = (productName?: string, quantity?: number) =>
    `https://wa.me/243972499388?text=${encodeURIComponent(
      productName
        ? `Bonjour, je souhaite commander ${quantity ?? 1} x "${productName}". Pouvez-vous me communiquer le prix et les modalités ?`
        : `Bonjour, je souhaite finaliser une commande. Pouvez-vous me communiquer les prix et modalités ?`
    )}`;

  if (!loading && !user) {
    return (
      <div className="container mx-auto py-24 text-center">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-8 text-3xl font-bold font-headline">Connexion requise</h1>
        <p className="mt-4 text-muted-foreground">Veuillez vous connecter pour accéder à votre panier.</p>
        <Button asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/account">Se connecter</Link>
        </Button>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-24 text-center">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-8 text-3xl font-bold font-headline">Votre panier est vide</h1>
        <p className="mt-4 text-muted-foreground">Il semble que vous n'ayez encore rien ajouté. Parcourez nos produits !</p>
        <Button asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/">Commencer vos achats</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold font-headline mb-8">Votre Panier</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(({ product, quantity }) => (
            <Card key={product.id} className="flex items-center p-4">
              <div className="relative h-24 w-24 rounded-md overflow-hidden">
                <Image src={product.image} alt={product.name} fill className="object-cover" data-ai-hint={product.dataAiHint} />
              </div>
              <div className="ml-4 flex-grow">
                <h2 className="font-bold text-lg">{product.name}</h2>
                <p className="text-sm text-muted-foreground">{product.category}</p>
                <Button asChild variant="link" className="px-0 mt-1 text-primary">
                  <Link href={buildWhatsAppLink(product.name, quantity)} target="_blank" rel="noopener noreferrer">Demander le prix sur WhatsApp</Link>
                </Button>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1 border rounded-md">
                    <Button variant="ghost" size="icon" onClick={() => updateQuantity(product.id, quantity - 1)}><Minus className="h-4 w-4" /></Button>
                    <span className="w-8 text-center font-bold">{quantity}</span>
                    <Button variant="ghost" size="icon" onClick={() => updateQuantity(product.id, quantity + 1)}><Plus className="h-4 w-4" /></Button>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(product.id)}>
                  <Trash2 className="h-5 w-5 text-destructive" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-28">
            <CardHeader>
              <CardTitle>Résumé de la commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-sm">Les prix ne sont pas affichés. Contactez-nous sur WhatsApp pour obtenir un devis et finaliser votre commande.</p>
              <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer">Contacter sur WhatsApp</Link>
              </Button>
            </CardContent>
            <CardFooter />
          </Card>
        </div>
      </div>
    </div>
  );
}
