import type { ReactNode } from "react";
import type { CartItemsType } from "../components/CartItems";
import type { Product } from "../components/ProductCard";
import type { CategoryKey } from "../components/Category";
import type { OrderStatus } from "../components/FilteredOrders";
import type { OrderItem } from "../core/orders/useOrders";


//**PRODUCTS**//

export type ProductForm = {
    name: string;
    description: string;
    price: string | number;
    releaseDate: string;
    category: CategoryKey[];
    images?: string[];
};
//**FAVORITES **//

export type favoritesApiResponse = {
    ok: boolean, 
    favoritos: Product[],
};
//**CATEGORIES**//
export type CategoryType = {
    _id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
};


//**CART */
export interface Cart {
    _id: string;
    id?: string,
    items: CartItemsType[];
    status: "active" | "ordered";
    createdAt?: string;
    updatedAt?: string;
    userId?: string;
    notes?: string;
};


//**USER */
export interface User {
    _id: string;
    username: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    role: UserRole;
    isActive: boolean;
    favoritos: string[];
    orders: Orders;
    id: string;
};

export type UserRole = "admin" | "user";


export type UserForm = {
    username: string;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
};

// export interface OwnerUser {
//     _id: string;
//     name: string;
//     email: string;
//     role: string;
// };


//**COMMERCE **//
export interface Commerce {
    _id: string;
    name: string;
    slug: string;
    description: string;
    image?: string;
    images?: string[];
    address: CommerceAddress;
    ownerUserId: string;
    products: Product[];
    isActive?: boolean;
};


export type CommerceForm = {
    category?: string;
    name: string;
    description: string;
    image?: string;
    address: CommerceAddress;
    isActive?: boolean;
};

export type CommerceAddress = {
    street: string;
    city: string;
    phone: string;
    email: string;
    schedule: string;
};

export type CreateCommerce = Omit<Commerce, "_id" | "ownerUserId" | "products">;

//**CONTEXT**//
export type ChildrenProps = {
    children: ReactNode;
    className?: string;
};


//**ORDERS */
export interface Orders {
    _id: string,
    userId: string,
    items: OrderItem[],
    status: OrderStatus,
    subtotal: number;
    tax: number,
    total: number;
    placedAt: string,
    createdAt: string,
    updatedAt: string,
    id: string,
    notes?: string;
};


export type RegisterForm = {
    username: string;
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    password: string;
    bio?: string;
    phoneNumber: string;
    address: string;
    role: string;
};





