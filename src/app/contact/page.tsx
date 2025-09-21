import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative -mt-16 h-[36vh] w-full flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-accent/20 to-background" />
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
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" action="https://formspree.io/f/mgvldldr" method="POST" accept-charset="UTF-8">
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
            <CardContent className="p-0">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
                <div className="w-full h-full bg-cover bg-center" style={{backgroundImage: "url('/assets/images/banners/saison_banner.jpg')"}} data-ai-hint="map location" />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
