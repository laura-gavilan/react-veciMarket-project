import type { Product } from "../../types/types";

const FAVORITES_KEY = "favorites";

export const getFavoritesFromLocalStorage = (userId: string): Product[] => {
    const data = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "{}");
    return data[userId] || [];
};

export const saveFavoritesInLocalStorage = (userId: string, favorites: Product[]) => {
    const data = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "{}")
    data[userId] = favorites;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(data));
};

export const addFavoriteToLocalStorage = ((userId: string, favorite: Product) => {
    const data = JSON.parse(localStorage.getItem("favorites") || "{}");
    const favorites: Product[] = data[userId] || [];

    const exists = favorites.some((favorite: Product) => favorite._id === favorite._id);
    if (!exists) {
        favorites.push(favorite);
        data[userId] = favorites;
        localStorage.setItem("favorites", JSON.stringify(data));
    }
});

export const deleteFavoriteFromLocalStorage = (userId: string, productId: string) => {
    const data = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "{}");
    const favorites: Product[] = data[userId] || [];
    const newFavorites = favorites.filter((favorite: Product) => favorite._id !== productId);
    data[userId] = newFavorites;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(data));
};