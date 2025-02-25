export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
  relatedProducts: RelatedProduct[];
  media?: string[];
  category_id?: number;
}

export interface RelatedProduct {
  id: number;
  name: string;
  image: string;
  price: number;
}

export interface ProductCardProps {
  product: Product;
  onBuy: () => void;
}
