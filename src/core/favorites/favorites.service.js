const FAVORITES_KEY = "favorites";

export const getFavoritesFromLocalStorage = () => {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveFavoritesInLocalStorage = (favorites) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const addFavoriteToLocalStorage = (favorite) => {
    const favorites = getFavoritesFromLocalStorage();
    const exists = favorites.map((favorite) => favorite.id === favorite._id);
    if (!exists) {
        favorites.push(favorite);
        saveFavoritesInLocalStorage(favorites);
    }
};

export const deleteFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const newFavorites = favorites.filter((favorite) => favorite._id !== productId);
    saveFavoritesInLocalStorage(newFavorites);
};