export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewsCount?: number;
  tag?: string;
  subCategory?: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface WishlistItem {
  product: Product;
}

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  avatar: string;
}

export type Department = 'fashion' | 'beauty' | 'kids' | 'accessories' | 'silk-gold';

export type ScreenMode = 'store' | 'splash' | 'onboarding' | 'login' | 'cart' | 'wishlist' | 'profile' | 'payment';
