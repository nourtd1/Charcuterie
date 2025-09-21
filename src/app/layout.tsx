import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:9002'),
  title: "Charcuterie & produits du terroir — Fraîcheur livrée chez vous",
  description: "Produits artisanaux, sélection quotidienne. Livraison locale rapide à Goma – Trois Payotte. Charcuterie, vins et produits naturels de qualité.",
  keywords: ["charcuterie", "produits du terroir", "Goma", "livraison", "épicerie fine", "vins", "boissons naturelles"],
  authors: [{ name: "Julie's Gourmet Goma" }],
  openGraph: {
    title: "Charcuterie & produits du terroir — Fraîcheur livrée chez vous",
    description: "Produits artisanaux, sélection quotidienne. Livraison locale rapide à Goma – Trois Payotte.",
    type: "website",
    locale: "fr_FR",
    siteName: "Julie's Gourmet Goma",
    images: [
      {
        url: "/assets/images/banners/accueil_banner.jpg",
        width: 1200,
        height: 630,
        alt: "Charcuterie & produits du terroir — Fraîcheur livrée chez vous",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Charcuterie & produits du terroir — Fraîcheur livrée chez vous",
    description: "Produits artisanaux, sélection quotidienne. Livraison locale rapide à Goma – Trois Payotte.",
    images: ["/assets/images/logo/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background">
        <AuthProvider>
            <CartProvider>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <main className="flex-grow pt-16">{children}</main>
                  <Footer />
                  <WhatsAppFab />
                </div>
                <Toaster />
            </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
