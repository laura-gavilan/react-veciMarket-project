import type { ReactNode } from "react";


//**PRODUCTS**//
export interface Product {
    _id: string;
    name: string;
    description?: string;
    price?: number;
    image?: string;
    images?: string;
    newFavorites?: Product[];
    category?: string;
};

export type ProductCardProps = {
    product: Product,
    commerce: { name: string };
    onClick?: () => void;
    isOwner: boolean;
    handleDelete: (productId: string) => void;
};


//**CART */
export type Cart = {
    _id: string;
    items: CartItemProps[];
    status: "active" | "ordered";
    createdAt?: string;
    updatedAt?: string;
    userId?: string;
};

export type CartButtonProps = {
    product: Product;
    small: boolean;
};

//CartItem
export type CartItemProps = {
    productId: Product;
    qty: number;
    priceSnapshot?: number;
};

export type CartComponentsProps = {
    item: CartItemProps;
    updateItem: (productId: string, qty: number) => Promise<void>;
    removeItem: (productId: string) => Promise<void>;
};


//**CATEGORIES**//

export interface CategoryFilterProps {
    categories: string[];
    categoryName: CategoryNamesProps;
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
    showProducts: boolean;
    setShowProducts: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface CategoryProps {
    products: Product[];
    refreshProducts: () => void;
    ownerId: string;
    commerceId: string;
};

export type CategoriesMapProps = {
    [category: string]: Product[];
};

export type CategoryNamesProps = {
    [key: string]: string;
};

export type UserProps = {
    _id: string;
    name: string;
}

//CreditCardModal

export type CreditCardProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    cardNumber: string;
    setCardNumber: React.Dispatch<React.SetStateAction<string>>;
    expiry: string;
    setExpiry: React.Dispatch<React.SetStateAction<string>>;
    cvc: string;
    setCvc: React.Dispatch<React.SetStateAction<string>>;
};

//**COMMERCE **//
// export type CommerceCardProps = {
//     commerce: string;

// };

export interface CommerceProps {
    commerce: {
        _id: string;
        name: string;
        slug: string;
        description: string;
        image?: string;
        images?: string;
        address: CommerceAddress;
        ownerUserId: OwnerUserProps;
        products: Product[];
        isActive?: boolean;
    }
    // productCount: Number;
    onClick: () => void;
};

//***COMMERCEFORM***//

export type CreateCommerceFormProps = {
    onSubmit: (form: CommerceForm) => void;
}



export interface CommerceForm {
    category?: string;
    name: string;
    description: string;
    image?: string;
    address: CommerceAddress;
    isActive?: boolean;
};

export interface CommerceAddress {
    street: string;
    city: string;
    phone: string;
    email: string;
    schedule: string;
};

export interface EditCommerceFormRef {
    reset: () => void;
    focusFirst: () => void;
};

export type SlugProps = {
    [key: string]: string;
};



//**FAVORITES **//
export interface UseFavoritesProps {
    favorites: Product[];
    addFavorite: (product: Product) => Promise<void>;
    deleteFavorite: (productId: string) => Promise<void>;
    isFavorite: (productId: string) => boolean;
    toggleFavorite: (product: Product) => void;
    totalFavorites: number;
};

export type FavoriteButtonProps = {
    product: Product;
}

//**USER */
export interface OwnerUserProps {
    _id: string;
    name: string;
    email: string;
    role: string;
};


//**ERROR */

//AuthError
export type AuthErrorProps = {
    error: string;
    onRetry: () => void;
    onClear: () => void;
};

//PageError
export type PageErrorProps = {
    title?: string;
    message: string;
    icon?: string;
    onRetry?: () => void;
    retryText?: string;
    className?: string,
    containerClassName?: string;
    fullPage?: boolean;
};


//ErrorBoundary
export type ErrorBoundaryProps = {
    fallback: ReactNode
    children: ReactNode;
};

export type ErrorBoundaryState = {
    hasError: boolean;
};


//**CONTEXT**//
export interface ChildrenProps {
    children: ReactNode;
    className?: string;
};

export interface CartContextValue {
    cart: Cart | null;
    loading: boolean;
    fetchCart: () => Promise<void>;
    addItem: (product: Product, qty: number) => Promise<void>;
    updateItem: (productId: string, qty: number) => Promise<void>;
    removeItem: (productId: string) => Promise<void>;
    checkout: () => Promise<unknown>;
    clearCart: () => Promise<void>;
};

export interface AuthContextProps {
    user: UserProps | null;
    setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
};

export interface CommerceContextProps {
    commerces: CommerceProps[];
    loading: boolean;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    fetchCommerces: () => Promise<void>;
    addCommerce: (commerce: CommerceProps) => Promise<void>;
    updateCommerce: (commerce: CommerceProps) => Promise<void>;
    deleteCommerce: (commerceId: string) => Promise<void>;
};

export type EditableDataProps = {
    name: string;
    slug: string;
    image?: string;
    description: string;
    address: CommerceAddress;
    isActive?: boolean;
}