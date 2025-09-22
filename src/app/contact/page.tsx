import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import Map from "@/components/Map";
import Link from "next/link";
import NextImage from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative -mt-16 h-[36vh] w-full flex items-center justify-center text-center overflow-hidden">
        <NextImage
          src="/assets/images/banners/accueil_banner.jpg"
          alt="Charcuterie & produits du terroir — Contact"
          fill
          sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, (max-width: 1280px) 1280px, 1920px"
          className="object-cover -z-20"
          priority
        />
        <div className="absolute inset-0 -z-10 hero-overlay" />
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-black font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Contactez-nous</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">Nous sommes là pour vous aider. Par téléphone, email ou via ce formulaire.</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cartes infos */}
          <div className="space-y-6">
            <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-sm">
              <CardHeader>
                <MapPin className="h-10 w-10 text-accent" />
                <CardTitle>Notre Adresse</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">Goma – Trois Payotte</CardContent>
            </Card>
            <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-sm">
              <CardHeader>
                <Phone className="h-10 w-10 text-accent" />
                <CardTitle>Par Téléphone</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+243972499388" className="hover:text-primary block">+243 972 499 388</a>
                <a href="tel:+243840985905" className="hover:text-primary block mt-1">+243 840 985 905</a>
                <p className="text-sm text-muted-foreground mt-2">Lundi - Samedi, 8h - 19h</p>
              </CardContent>
            </Card>
            <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-sm">
              <CardHeader>
                <Mail className="h-10 w-10 text-accent" />
                <CardTitle>Par Email</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:certainmg32@gmail.com" className="hover:text-primary break-all">certainmg32@gmail.com</a>
                <p className="text-sm text-muted-foreground mt-2">Réponse sous 24h</p>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-2">
            <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-sm">
              <CardHeader>
                <CardTitle>Envoyez-nous un message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" action="https://formspree.io/f/mgvldldr" method="POST" acceptCharset="UTF-8">
                  <div className="col-span-1 md:col-span-1">
                    <label className="text-sm text-muted-foreground">Nom complet</label>
                    <Input name="name" placeholder="Votre nom" className="mt-1" required />
                  </div>
                  <div className="col-span-1 md:col-span-1">
                    <label className="text-sm text-muted-foreground">Email</label>
                    <Input name="email" type="email" placeholder="vous@exemple.com" className="mt-1" required />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="text-sm text-muted-foreground">Sujet</label>
                    <Input name="subject" placeholder="Objet de votre message" className="mt-1" required />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="text-sm text-muted-foreground">Message</label>
                    <Textarea name="message" placeholder="Votre message..." className="mt-1 min-h-[140px]" required />
                  </div>
                  {/* Anti-spam (honeypot) */}
                  <input type="text" name="_gotcha" className="hidden" aria-hidden="true" tabIndex={-1} />
                  <div className="col-span-1 md:col-span-2 flex justify-end">
                    <Button type="submit" className="gap-2"><Send className="h-4 w-4" /> Envoyer</Button>
                  </div>
                </form>
                <p className="text-xs text-muted-foreground mt-3">En envoyant ce formulaire, vous acceptez notre <a className="underline hover:text-primary" href="/privacy">politique de confidentialité</a>.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Carte / Map */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <Card className="bg-card/60 backdrop-blur-md border border-border/40 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" /> Nous trouver
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Goma – Trois Payotte</p>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <Map
                  latitude={-1.680}
                  longitude={29.230}
                  zoom={15}
                  className="w-full h-full"
                  title="Localisation Goma – Trois Payotte"
                />
                {/* Overlay actions */}
                <div className="pointer-events-none absolute top-3 right-3 flex gap-2">
                  <Button asChild size="sm" variant="secondary" className="pointer-events-auto bg-background/80 backdrop-blur-md border border-border/60">
                    <Link href={`https://www.openstreetmap.org/?mlat=${-1.68}&mlon=${29.23}#map=16/${-1.68}/${29.23}`} target="_blank" rel="noopener noreferrer">Ouvrir sur OSM</Link>
                  </Button>
                  <Button asChild size="sm" variant="secondary" className="pointer-events-auto bg-background/80 backdrop-blur-md border border-border/60">
                    <Link href={`https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=${-1.68}%2C${29.23}`} target="_blank" rel="noopener noreferrer">Itinéraire</Link>
                  </Button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">Carte OpenStreetMap affichée à titre indicatif.</p>
                <div className="flex items-center gap-2">
                  <Button asChild size="sm">
                    <Link href={`https://www.openstreetmap.org/?mlat=${-1.68}&mlon=${29.23}#map=16/${-1.68}/${29.23}`} target="_blank" rel="noopener noreferrer">Voir en plein écran</Link>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link href="/about">À propos</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
