export type Category = 'hardware' | 'game' | 'deals';

export interface Review {
    id: string;
    user: string;
    rating: number;
    comment: string;
    date: string;
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    category: Category;
    brand?: string; // For hardware
    specs?: Record<string, string>; // For hardware key-value specs
    platform?: string; // For games
    genre?: string; // For games
    reviews?: Review[];
    originalPrice?: number;
    inStock?: boolean;
    isNew?: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Address {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}
