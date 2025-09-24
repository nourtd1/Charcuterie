export type ProductCategory = 'Viandes' | 'Boissons naturelles' | 'Autres produits' | 'Vins rouges';

export const categories: ProductCategory[] = ['Viandes', 'Boissons naturelles', 'Autres produits', 'Vins rouges'];

export type Product = {
  id: number;
  name: string;
  slug: string;
  category: ProductCategory;
  price: number;
  description: string;
  image: string;
  dataAiHint: string;
  inStock?: boolean; // disponibilité du produit
  popularity?: number; // score popularité (plus grand = plus populaire)
};

export type CartItem = {
  product: Product;
  quantity: number;
};
