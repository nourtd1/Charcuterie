# 📸 Guide de Remplacement des Images

Ce dossier contient l'organisation complète des images pour votre boutique en ligne **Julie's Gourmet Goma**.

## 🗂️ Structure des Dossiers

```
assets/images/
├── logo/                    # Logo et favicon
├── products/               # Images des produits
│   ├── viandes/           # Viandes et charcuteries
│   ├── boissons_naturelles/ # Jus naturels
│   ├── autres_produits/   # Gaz, shikwange, etc.
│   └── vins_rouges/       # Vins de la boutique
├── banners/               # Bannières du site
└── team/                  # Photos de l'équipe
```

## 🔄 Comment Remplacer les Images

### 1. **Images des Produits** (`products/`)

Chaque fichier placeholder correspond exactement à un produit de votre catalogue :

#### Viandes (`products/viandes/`)
- `viande_fumee_porc.jpg` → Viande fumée de porc (15.99€)
- `lardons_fumes.jpg` → Lardons fumés (8.49€)
- `saucisses.jpg` → Saucisses (12.00€)

#### Boissons Naturelles (`products/boissons_naturelles/`)
- `jus_ananas.jpg` → Jus d'ananas (4.50€)
- `jus_orange.jpg` → Jus d'orange (4.00€)
- `jus_prune.jpg` → Jus de prune (5.00€)
- `jus_passiflore.jpg` → Jus de passiflore (5.50€)
- `jus_mangue.jpg` → Jus de mangue (5.20€)
- `jus_gingembre.jpg` → Jus de gingembre (4.80€)
- `jus_citron.jpg` → Jus de citron (3.50€)

#### Autres Produits (`products/autres_produits/`)
- `gaz.jpg` → Recharge de gaz (25.00€)
- `shikwange.jpg` → Shikwange (7.00€)

#### Vins Rouges (`products/vins_rouges/`)
- `vin_celar.jpg` → Vin Rouge Celar (18.00€)
- `vin_drosdy.jpg` → Vin Rouge Drosdy (22.50€)
- `vin_baron.jpg` → Vin Rouge Baron (15.00€)

### 2. **Logo et Identité** (`logo/`)
- `logo.png` → Votre logo principal (format PNG avec transparence)
- `favicon.ico` → Favicon du site (16x16, 32x32, 48x48px)

### 3. **Bannières** (`banners/`)
- `accueil_banner.jpg` → Bannière principale de la page d'accueil
- `promo_banner.jpg` → Bannières promotionnelles
- `saison_banner.jpg` → Bannières saisonnières

### 4. **Équipe** (`team/`)
- `gerant.jpg` → Photo du gérant
- `vendeur1.jpg` → Photo d'un membre de l'équipe
- `vendeur2.jpg` → Photo d'un autre membre de l'équipe

## 📐 Spécifications Techniques

### **Images Produits**
- **Format** : JPG de qualité élevée
- **Dimensions** : 600x600px (ratio 1:1)
- **Poids** : Maximum 500KB par image
- **Conseil** : Photos avec fond neutre ou blanc pour un rendu professionnel

### **Bannières**
- **Format** : JPG de qualité élevée
- **Dimensions** : 1920x800px (accueil), 1920x600px (autres)
- **Poids** : Maximum 1MB par image
- **Conseil** : Images haute résolution pour tous les écrans

### **Photos Équipe**
- **Format** : JPG de qualité élevée
- **Dimensions** : 400x400px (ratio 1:1)
- **Poids** : Maximum 300KB par photo
- **Conseil** : Photos professionnelles avec éclairage uniforme

### **Logo**
- **Format** : PNG avec transparence
- **Dimensions** : Minimum 200x200px
- **Conseil** : Version vectorielle recommandée pour la qualité

## 🔧 Étapes de Remplacement

### **Méthode 1 : Remplacement Direct**
1. Supprimez le fichier placeholder (ex: `viande_fumee_porc.jpg`)
2. Renommez votre image avec le nom exact du placeholder
3. Placez-la dans le bon dossier
4. Vérifiez les dimensions et le poids

### **Méthode 2 : Outils de Retouche**
1. Ouvrez votre image dans un éditeur (Photoshop, GIMP, Canva)
2. Redimensionnez selon les spécifications
3. Optimisez la qualité/poids
4. Sauvegardez avec le nom exact requis

## 🚀 Après Remplacement

Une fois vos images remplacées :

1. **Testez le site** : Vérifiez que toutes les images s'affichent correctement
2. **Performance** : Contrôlez la vitesse de chargement
3. **Responsive** : Testez sur mobile, tablette et desktop
4. **SEO** : Vérifiez que les balises `alt` sont appropriées

## 📱 Optimisation Mobile

- **Images produits** : S'adaptent automatiquement aux écrans
- **Bannières** : Redimensionnées par Next.js selon la taille d'écran
- **Performance** : Formats modernes (WebP, AVIF) générés automatiquement

## 🛠️ Outils Recommandés

### **Compression d'Images**
- [TinyPNG](https://tinypng.com/) - Compression sans perte
- [Squoosh](https://squoosh.app/) - Outil Google pour optimisation
- [ImageOptim](https://imageoptim.com/) - Pour Mac

### **Retouche d'Images**
- [Canva](https://canva.com/) - Interface simple
- [GIMP](https://gimp.org/) - Gratuit et puissant
- [Photoshop](https://adobe.com/photoshop) - Professionnel

## ⚠️ Points d'Attention

1. **Noms de fichiers** : Respectez exactement les noms indiqués
2. **Extensions** : Gardez les extensions `.jpg`, `.png`, `.ico`
3. **Dossiers** : Ne déplacez pas les fichiers dans d'autres dossiers
4. **Sauvegarde** : Gardez toujours une copie de vos images originales

## 🆘 Support

Si vous rencontrez des problèmes :
1. Vérifiez que le nom du fichier correspond exactement
2. Contrôlez les dimensions et le format
3. Testez avec une image de test simple
4. Consultez les logs de la console du navigateur

---

**Bonne préparation de vos images ! 🎉**

*Votre boutique aura un rendu professionnel avec vos vraies photos de produits.*
