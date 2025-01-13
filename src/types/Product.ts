export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    description: string;
    relatedProducts: RelatedProduct[];
  }
  
  export interface RelatedProduct {
    id: number;
    name: string;
    image: string;
    price: number;
  }
  