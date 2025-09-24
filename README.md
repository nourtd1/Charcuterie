# Charcuterie

Une boutique vitrine Next.js pour charcuterie et produits du terroir, conçue pour une audience locale (Goma/RDC) avec un parcours de conversion centré WhatsApp.

## Démarrage local

```bash
npm install
npm run dev
```

Par défaut, l'application démarre en mode développement sur le port 9002 avec Turbopack.

## Déploiement

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


