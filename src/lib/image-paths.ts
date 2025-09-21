// Configuration des chemins d'images pour la boutique
// Ce fichier centralise tous les chemins d'images pour faciliter la maintenance

export const IMAGE_PATHS = {
  // Logo et identité
  LOGO: '/assets/images/logo/logo.png',
  FAVICON: '/assets/images/logo/favicon.ico',
  
  // Bannières
  BANNERS: {
    ACCUEIL: '/assets/images/banners/accueil_banner.jpg',
    PROMO: '/assets/images/banners/promo_banner.jpg',
    SAISON: '/assets/images/banners/saison_banner.jpg',
  },
  
  // Équipe
  TEAM: {
    GERANT: '/assets/images/team/gerant.jpg',
    VENDEUR1: '/assets/images/team/vendeur1.jpg',
    VENDEUR2: '/assets/images/team/vendeur2.jpg',
  },
  
  // Produits par catégorie
  PRODUCTS: {
    VIANDES: {
      VIANDE_FUMEE_PORC: '/assets/images/products/viandes/viande_fumee_porc.jpg',
      LARDONS_FUMES: '/assets/images/products/viandes/lardons_fumes.jpg',
      SAUCISSES: '/assets/images/products/viandes/saucisses.jpg',
    },
    BOISSONS_NATURELLES: {
      JUS_ANANAS: '/assets/images/products/boissons_naturelles/jus_ananas.jpg',
      JUS_ORANGE: '/assets/images/products/boissons_naturelles/jus_orange.jpg',
      JUS_PRUNE: '/assets/images/products/boissons_naturelles/jus_prune.jpg',
      JUS_PASSIFLORE: '/assets/images/products/boissons_naturelles/jus_passiflore.jpg',
      JUS_MANGUE: '/assets/images/products/boissons_naturelles/jus_mangue.jpg',
      JUS_GINGEMBRE: '/assets/images/products/boissons_naturelles/jus_gingembre.jpg',
      JUS_CITRON: '/assets/images/products/boissons_naturelles/jus_citron.jpg',
    },
    AUTRES_PRODUITS: {
      GAZ: '/assets/images/products/autres_produits/gaz.jpg',
      SHIKWANGE: '/assets/images/products/autres_produits/shikwange.jpg',
    },
    VINS_ROUGES: {
      VIN_CELAR: '/assets/images/products/vins_rouges/vin_celar.jpg',
      VIN_DROSDY: '/assets/images/products/vins_rouges/vin_drosdy.jpg',
      VIN_BARON: '/assets/images/products/vins_rouges/vin_baron.jpg',
    },
  },
} as const;

// Fonction utilitaire pour construire les chemins d'images
export function getProductImagePath(category: string, productSlug: string): string {
  const categoryPath = category.toLowerCase().replace(/\s+/g, '_');
  return `/assets/images/products/${categoryPath}/${productSlug.replace(/-/g, '_')}.jpg`;
}

// Fonction utilitaire pour construire les chemins de bannières
export function getBannerPath(bannerType: 'accueil' | 'promo' | 'saison'): string {
  return `/assets/images/banners/${bannerType}_banner.jpg`;
}

// Fonction utilitaire pour construire les chemins d'équipe
export function getTeamImagePath(member: 'gerant' | 'vendeur1' | 'vendeur2'): string {
  return `/assets/images/team/${member}.jpg`;
}
