"use client";

import Link from "next/link";
import { Utensils, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { STORE_MAP_URL } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[#ECECEC]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Bloc 1 – Logo & description + réseaux */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Utensils className="h-7 w-7 text-primary" />
              <span className="text-lg md:text-xl font-bold font-headline">
                charcuterie & alimentation certains
              </span>
            </Link>
            <p className="text-sm text-white/80 leading-relaxed">
              Votre épicerie fine de quartier, sélectionnant avec passion les meilleurs produits du terroir.
            </p>
            <div className="flex items-center gap-4 text-white/80">
              <Link href="#" aria-label="Instagram" className="hover:text-primary" target="_blank" rel="noopener noreferrer"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" aria-label="Facebook" className="hover:text-primary" target="_blank" rel="noopener noreferrer"><Facebook className="h-5 w-5" /></Link>
              <Link href="#" aria-label="Twitter" className="hover:text-primary" target="_blank" rel="noopener noreferrer"><Twitter className="h-5 w-5" /></Link>
            </div>
          </div>

          {/* Bloc 2 – Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-headline text-white">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <span>
                  Avenue des Saveurs 12, Quartier Trois Payotte<br />
                  40000 Goma, RDC
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+243972499388" className="hover:text-primary">+243 972 499 388</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+243840985905" className="hover:text-primary">+243 840 985 905</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:certainmg32@gmail.com" className="hover:text-primary break-all">certainmg32@gmail.com</a>
              </li>
            </ul>

            {/* Bouton unique vers la carte */}
            <div className="mt-4">
              <Button asChild className="inline-flex items-center gap-2">
                <Link
                  href={STORE_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voir la localisation sur Google Maps"
                >
                  <MapPin className="h-4 w-4" /> Voir sur la carte
                </Link>
              </Button>
            </div>
          </div>

          {/* Bloc 3 – Horaires d’ouverture */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-headline text-white">Horaires d’ouverture</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex justify-between"><span>Lun – Ven</span><span>09:00 – 18:00</span></li>
              <li className="flex justify-between"><span>Samedi</span><span>10:00 – 17:00</span></li>
              <li className="flex justify-between"><span>Dimanche</span><span>Fermé</span></li>
            </ul>
            <div className="text-sm mt-2 text-white">
              <span className="inline-block rounded-md bg-primary text-primary-foreground px-2 py-1">Livraison offerte dès 50€</span>
            </div>
          </div>

          {/* Bloc 4 – Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-headline text-white">Newsletter</h3>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Votre adresse email"
                aria-label="Votre adresse email"
                className="h-11 w-full rounded-md border border-white/15 bg-white/10 px-3 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-primary/60"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-md px-4 text-sm font-semibold hero-cta-primary"
              >
                S’inscrire
              </button>
            </form>
            <p className="text-xs text-white/60">Recevez nos nouveautés et offres du moment.</p>
          </div>
        </div>
      </div>

      {/* Bandeau inférieur */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs sm:text-sm text-white/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} charcuterie & alimentation certains. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-primary">Mentions légales</Link>
            <span className="hidden sm:block h-4 w-px bg-white/15" />
            <Link href="/privacy" className="hover:text-primary">Politique de confidentialité</Link>
            <span className="hidden sm:block h-4 w-px bg-white/15" />
            <Link href="/terms" className="hover:text-primary">CGV</Link>
            <span className="hidden sm:block h-4 w-px bg-white/15" />
            <Link href="/cookies" className="hover:text-primary">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
