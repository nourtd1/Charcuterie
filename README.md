# Charcuterie

Une boutique vitrine Next.js pour charcuterie et produits du terroir, conçue pour une audience locale (Goma/RDC) avec un parcours de conversion centré WhatsApp.

## Démarrage local

```bash
npm install
npm run dev
```

Par défaut, l'application démarre en mode développement sur le port 9002 avec Turbopack.

## Déploiement

<<<<<<< HEAD
Compatible Vercel, Firebase Hosting (SSR) et plateformes Next.js. Définir `NEXT_PUBLIC_SITE_URL` pour des métadonnées OG correctes en production.

---

## Analyse détaillée du site

### Vue d’ensemble
- **Type**: Boutique catalogue/vitrine (charcuterie, vins, produits naturels)
- **Cible**: francophone locale (Goma, RDC), orientation conversion par WhatsApp
- **Qualités**: design moderne, responsive, structure claire App Router, SEO de base bien posé

### Stack et dépendances clés
- Next.js 15 (App Router), React 18, TypeScript, Tailwind CSS
- Radix UI (composants headless), Embla Carousel, Lucide (icônes)
- Firebase Auth (client), Genkit présent mais non surfacé dans l’UI
- Scripts: `dev` (Turbopack), `build`, `start`, `lint`, `typecheck`

### Architecture & routes
- App Router sous `src/app` avec layout global `layout.tsx` (SEO, polices, `Header`, `Footer`, `WhatsAppFab`, Providers `Auth` et `Cart`)
- Pages principales: `/` (home), `/products`, `/about`, `/contact`, `/cart`, `/account`, `/news`, `/blog`, `/search`, `/privacy`, `/terms`, `/cookies`
- Métadonnées SEO configurées dans le layout (OpenGraph, Twitter, robots)

### Données & modèle
- Catalogue statique en mémoire: `src/lib/data.ts` (24 produits) et types dans `src/lib/types.ts`
- Catégories: `Viandes`, `Boissons naturelles`, `Autres produits`, `Vins rouges`
- Images locales sous `public/assets/images/...` (bannières, produits, équipe)

### State management
- **Panier** (`src/context/CartContext.tsx`): `useReducer` (ajout, MAJ quantités, suppression, total, compteur) + toasts. Événement `cartUpdated` pour MAJ du badge. Pas de persistance locale.
- **Auth** (`src/context/AuthContext.tsx`): écoute `onAuthStateChanged` (Firebase). Redirection vers `/account` lors d’actions sensibles si non connecté. UI d’auth à implémenter/compléter sur `/account`.

### UI/UX
- **Header**: navigation, recherche (catégorie + terme), compte (menu), favoris (placeholder), panier avec badge, menu mobile soigné
- **Home**: Hero priorisé, catégories, previews, carrousels (découverte, best sellers, offres), témoignages, blog snippet, infos livraison
- **Catalogue**: filtrage par catégorie, tri (prix, nom, recommandé), dialog détails produit (quantité + CTA WhatsApp). Prix non affichés sur cartes; demande via WhatsApp
- **Search**: `SearchBar` redirige vers `/products?q=...` (ou `/search` selon props). La page `/products` gère filtrage/tri/search efficacement côté client

### SEO
- Métadonnées riches: `title`, `description`, `keywords`, OpenGraph (image héro), Twitter Card, robots
- `metadataBase` dépend de `NEXT_PUBLIC_SITE_URL` (à définir en prod)
- Slugs produits cohérents; sections de contenu éditorial (blog/news) à compléter
- Absence de `sitemap` et `robots.txt` personnalisés (ajout recommandé)

### Performance
- `next/image` configuré (AVIF/WebP, tailles d’appareils), bannière en `priority`
- Assets images locaux → bon LCP potentiel; nombreuses sections visuelles à surveiller (poids bannières, carrousels)
- `next.config.ts` désactive erreurs TypeScript et ESLint en build (risque de régressions silencieuses)

### Accessibilité
- Icônes avec `aria-label` sur actions, inputs avec labels/placeholder, Dialog Radix accessible
- Vérifier focus visibles, ordre de tabulation, textes alternatifs descriptifs sur bannières

### Sécurité
- Config Firebase côté client (Auth uniquement). Pas d’API sensible exposée
- CSP uniquement au niveau optimiseur d’images Next; pas de CSP app globale/headers (recommandé d’en ajouter)
- Pas de clés secrètes en client; pas de traitement paiement côté serveur

### Déploiement & configuration
- README initial minimal (dev et déploiement)
- `apphosting.yaml` présent (piste Firebase App Hosting)
- Variables d’environnement: `NEXT_PUBLIC_SITE_URL` pour SEO/OG

### Points de vigilance / risques
1. Build tolérant aux erreurs: `typescript.ignoreBuildErrors` et `eslint.ignoreDuringBuilds` activés → bugs potentiels en prod
2. Prix non affichés: conversion dépendante de WhatsApp; pas de rich snippets `Product`
3. Panier non persistant: perte au rafraîchissement, friction UX
4. Auth flow incomplet: redirection `/account` sans UI d’auth complète visible
5. Recherche duale: `/search` vs `/products` → garder une seule source de vérité
6. SEO: pas de `sitemap`/`robots` dédiés; `metadataBase` à configurer
7. Analytics absent: pas de GA4/GTM pour suivi

### Recommandations (quick wins)
1. Réactiver qualité build: supprimer `ignoreBuildErrors` TS/ESLint et corriger erreurs
2. Persister le panier: `localStorage` (sauvegarde/réhydratation `CartContext.items`)
3. Unifier la recherche: pointer toutes les barres vers `/products?q=...` et retirer `/search` (ou l’implémenter)
4. Ajouter `sitemap` et `robots`: `app/sitemap.ts` et `app/robots.ts`
5. Définir `NEXT_PUBLIC_SITE_URL` en prod
6. Analytics: intégrer GA4/GTM
7. Optimiser images héro (poids, dimensions) et limiter `priority` aux visuels critiques

### Améliorations ultérieures
- Back-office: passer le catalogue à Firestore/CMS headless (édition non-technique)
- Affichage prix + promos + stock; balisage Schema.org `Product` et microdonnées
- Checkout léger: capturer coordonnées + fenêtre de livraison; paiement offline au départ
- Favoris persistants (localStorage/profil)
- i18n (si cible anglophone/tourisme)
- Tests unitaires et règles ESLint/TS strictes

### Ce qui fonctionne bien
- Design soigné, moderne, responsive
- Parcours catégories/filtrage intuitif
- SEO de base solide via `metadata`
- Conversion WhatsApp adaptée au contexte local

---

## Rappels utiles

### Tech stack
- Next.js 15 + App Router
- TypeScript, Tailwind CSS, Radix UI
- Firebase Auth (client), Embla Carousel, Lucide

### Scripts
- `npm run dev`: développement sur `http://localhost:9002`
- `npm run build`: build de production
- `npm start`: démarrage production
- `npm run lint`, `npm run typecheck`

### Configuration Next.js
- `images`: AVIF/WebP, tailles prédéfinies, `minimumCacheTTL: 60`
- Note: supprimer en prod les options qui ignorent TS/ESLint

### Variables d’environnement
- `NEXT_PUBLIC_SITE_URL`: URL publique (utilisée pour SEO/OG)


=======
```bash
# Construire l'application
npm run build

# Lancer en production
npm start
```

### Scripts disponibles

- `npm run dev` : Démarre le serveur Next.js en mode développement (port 9002)
- `npm run build` : Construit l'application optimisée pour la production
- `npm start` : Lance le serveur de production
- `npm run lint` : Exécute ESLint pour vérifier la qualité du code
- `npm run typecheck` : Vérifie les types TypeScript sans émettre de fichiers
- `npm run genkit:dev` : Lance l'environnement Genkit (IA) en local

## ⚙️ Configuration

### Firebase Authentication

Le projet utilise Firebase Authentication pour la gestion des utilisateurs. La configuration est incluse dans `src/lib/firebase.ts` :

```typescript
// Configuration Firebase
const firebaseConfig = {
  projectId: "julies-gourmet-goma",
  appId: "1:425260412899:web:7616cc475706af7417bad6",
  storageBucket: "julies-gourmet-goma.firebasestorage.app",
  apiKey: "AIzaSyDNO5oCWhxSAJ_54HyDr50MJEilbQCKzxY",
  authDomain: "julies-gourmet-goma.firebaseapp.com",
  messagingSenderId: "425260412899"
};
```

### Variables d'environnement (recommandé pour la production)

Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 📁 Architecture du projet

```
src/
├── app/                    # Routes Next.js (App Router)
│   ├── about/             # Page À propos
│   ├── account/           # Authentification et profil
│   ├── cart/              # Panier d'achat
│   ├── contact/           # Page de contact
│   ├── products/          # Catalogue produits
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── ui/               # Composants shadcn/ui
│   ├── Header.tsx        # Navigation principale
│   ├── Footer.tsx        # Pied de page
│   ├── ProductCatalog.tsx # Catalogue produits
│   ├── SearchBar.tsx     # Barre de recherche
│   └── WhatsAppFab.tsx   # Bouton WhatsApp flottant
├── context/              # Contextes React
│   ├── AuthContext.tsx   # Gestion authentification
│   └── CartContext.tsx   # Gestion panier
├── hooks/                # Hooks personnalisés
│   ├── use-auth.ts       # Hook authentification
│   ├── use-cart.ts       # Hook panier
│   └── use-toast.ts      # Hook notifications
└── lib/                  # Utilitaires et données
    ├── data.ts           # Données produits (24 produits)
    ├── types.ts          # Types TypeScript
    ├── firebase.ts       # Configuration Firebase
    └── utils.ts          # Fonctions utilitaires
```

## 🛠️ Stack technique

### Frontend
- **Next.js 15.3.3** - Framework React avec App Router
- **React 18.3.1** - Bibliothèque UI
- **TypeScript 5** - Typage statique
- **Tailwind CSS 3.4.1** - Framework CSS utilitaire

### UI/UX
- **shadcn/ui** - Composants UI modernes
- **Radix UI** - Primitives accessibles
- **Lucide React** - Icônes
- **React Hook Form** - Gestion des formulaires
- **Zod** - Validation de schémas

### Backend & Services
- **Firebase Authentication** - Authentification utilisateurs
- **Formspree** - Gestion des formulaires de contact

### Développement
- **ESLint** - Linting du code
- **PostCSS** - Traitement CSS
- **Turbopack** - Bundler rapide (dev)

## 📊 Données produits

Le catalogue contient **24 produits** répartis en **4 catégories** :

### 🥩 Viandes (6 produits)
- Viande fumée de porc, Lardons fumés, Saucisses
- Poulet fumé entier, Jambon de pays

### 🥤 Boissons naturelles (8 produits)
- Jus d'ananas, d'orange, de prune, de passiflore
- Jus de mangue, de gingembre, de citron
- Limonade artisanale, Thé glacé à la menthe

### 🍷 Vins rouges (6 produits)
- Vin Celar, Drosdy, Baron, Le Petit Sommelier
- Grand Cru Réserve

### 🧀 Autres produits (4 produits)
- Gaz, Shikwange, Fromages
- Miel de forêt, Piment en poudre

## 🎨 Design System

### Palette de couleurs
- **Primaire** : Orange vif (#F77F00) - CTAs et accents
- **Arrière-plan** : Bleu nuit (#0D1B2A) - Fond principal
- **Texte** : Blanc cassé (#E0E1DD) - Contraste optimal
- **Cartes** : Bleu clair (#1B263B) - Sections et composants

### Typographie
- **Police principale** : Alegreya (serif élégante)
- **Hiérarchie** : Titres, sous-titres, corps de texte
- **Responsive** : Adaptation automatique des tailles

## 📱 Fonctionnalités mobiles

- **Design responsive** adapté à tous les écrans
- **Navigation mobile** avec menu hamburger
- **Recherche optimisée** pour mobile
- **Bouton WhatsApp** toujours accessible
- **Images optimisées** avec lazy loading

## 🚀 Optimisations performances

- **Images Next.js** avec formats WebP/AVIF
- **Lazy loading** automatique
- **Code splitting** par routes
- **Optimisation des bundles** avec Turbopack
- **Cache des images** configuré

## 📈 SEO et accessibilité

### SEO
- **Métadonnées** complètes par page
- **Open Graph** pour les réseaux sociaux
- **Structure sémantique** HTML5
- **URLs optimisées** et descriptives

### Accessibilité
- **Navigation clavier** complète
- **Contraste** respectant les standards WCAG
- **Labels ARIA** pour les composants
- **Focus management** approprié

## 🔧 Améliorations futures

### Fonctionnalités e-commerce
- [ ] Système de paiement intégré (Stripe/PayPal)
- [ ] Gestion des stocks en temps réel
- [ ] Système de favoris pour les utilisateurs
- [ ] Historique des commandes complet
- [ ] Notifications push pour les promotions

### Contenu et marketing
- [ ] Blog/actualités avec CMS
- [ ] Système de newsletter
- [ ] Programme de fidélité
- [ ] Avis clients et évaluations
- [ ] Galerie photos des produits

### Technique
- [ ] Tests automatisés (Jest/Cypress)
- [ ] Monitoring et analytics
- [ ] CDN pour les images
- [ ] PWA (Progressive Web App)
- [ ] Optimisation Core Web Vitals

## 📞 Support et contact

- **Email** : certainmg32@gmail.com
- **Téléphone** : +243 972 499 388 / +243 840 985 905
- **Adresse** : Avenue des Saveurs 12, Quartier Trois Payotte, 40000 Goma, RDC
- **WhatsApp** : +243 972 499 388

## 👨‍💻 Développement & Crédits

Ce projet a été développé par :

Nour

📧 Email : annourmah@gmail.com

📱 Téléphone : +250 798 977 292

🌐 Portfolio : https://portfolio-nour-td.vercel.app/

Merci de mentionner l’auteur en cas de réutilisation ou de redistribution du code.

## 📄 Licence

Projet privé — **Charcuterie & Alimentation Certains**  
Usage interne et démonstration. Tous droits réservés.

---

*Développé avec Nour pour l'épicerie fine de Goma*
>>>>>>> df6abfba9838ff2375d9b346c1ed3fc6ccce1891
