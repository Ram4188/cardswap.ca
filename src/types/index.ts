export interface GiftCard {
  id: string;
  brand: string;
  value: number;
  sellingPrice: number;
  discount: number;
  image: string;
  expiryDate?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  isGuest: boolean;
}

export interface CartItem extends GiftCard {
  quantity: number;
}