export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Price in KES
  categoryId: string;
  images: {
    data: string; // base64 string
    type: string; // mime type
  }[];
  features: string[];
  specifications: Record<string, string>;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}