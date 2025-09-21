# Charcuterie & Alimentation Certains — Épicerie fine à Goma

Application e-commerce moderne construite avec Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui et Firebase Authentication. Spécialisée dans la vente de charcuterie, vins et produits du terroir avec livraison locale à Goma - Trois Payotte.

## 🏪 À propos de l'entreprise

**Charcuterie & Alimentation Certains** est une épicerie fine située au cœur de Goma, en République Démocratique du Congo. Nous nous spécialisons dans la sélection et la vente de produits artisanaux de qualité :

- **Charcuterie traditionnelle** (viandes fumées, saucisses, jambons)
- **Boissons naturelles** (jus de fruits frais, limonades artisanales)
- **Vins rouges** sélectionnés
- **Produits locaux** (fromage de chèvre, miel de forêt, épices)

## ✨ Fonctionnalités principales

### 🛒 **E-commerce complet**
- **Catalogue de 24 produits** répartis en 4 catégories spécialisées
- **Système de panier** avec gestion des quantités et persistance
- **Recherche avancée** par nom, description et catégorie
- **Filtres et tri** par prix, nom, recommandation
- **Fiches produits détaillées** avec modales interactives

### 📱 **Intégration WhatsApp Business**
- **Bouton flottant** permanent pour contact direct
- **Messages pré-remplis** avec détails des produits
- **Support des commandes groupées** via panier
- **Numéro principal** : +243 972 499 388

### 🔐 **Authentification sécurisée**
- **Inscription/Connexion** par email et mot de passe
- **Gestion de profil** utilisateur complète
- **Réinitialisation de mot de passe** sécurisée
- **Protection des routes** sensibles

### 📄 **Pages vitrines**
- **Accueil** : Hero section, catégories, produits mis en avant, témoignages
- **Produits** : Catalogue complet avec filtres et recherche
- **À propos** : Histoire de l'entreprise et équipe
- **Contact** : Formulaire de contact et informations de livraison
- **Compte** : Gestion du profil et historique des commandes

## 🚀 Installation et démarrage

### Prérequis

- **Node.js 18+** (recommandé 20+)
- **npm 9+** (ou pnpm/yarn si vous préférez)
- **Git** pour cloner le repository

### Installation

```bash
# Cloner le repository
git clone [URL_DU_REPOSITORY]
cd Aubin-main

# Installer les dépendances
npm install
```

### Lancer en développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:9002`

### Build et déploiement en production

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
- Gaz, Shikwange, Fromage de chèvre local
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

## 📄 Licence

Projet privé — **Charcuterie & Alimentation Certains**  
Usage interne et démonstration. Tous droits réservés.

---

*Développé avec ❤️ pour l'épicerie fine de Goma*
