const FAVORITES_KEY = "favorites";

export const getFavoritesFromLocalStorage = (userId) => {
    const data = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "{}")
    return userId ? data[userId] || [] : [];
};

export const saveFavoritesInLocalStorage = (userId, favorites) => {
    const data = JSON.parse(localStorage.getItem(FAVORITES_KEY) || {})
    if (!userId) return;
    data[userId] = favorites;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(data));
};

export const addFavoriteToLocalStorage = (userId, favorite) => {
    if (!userId) return;
    const favorites = getFavoritesFromLocalStorage(userId);
    const exists = favorites.some((favoriteItem) => favoriteItem._id === favorite._id);
    if (!exists) {
        favorites.push(favorite);
        saveFavoritesInLocalStorage(userId, favorites);
    };
};

export const deleteFavoriteFromLocalStorage = (userId, productId) => {
    if (!userId) return;
    const favorites = getFavoritesFromLocalStorage(userId);
    const newFavorites = favorites.filter((favorite) => favorite._id !== productId);
    saveFavoritesInLocalStorage(userId, newFavorites);
};