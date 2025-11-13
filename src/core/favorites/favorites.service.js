const FAVORITES_KEY = "favorites";

export const getFavoritesFromLocalStorage = (userId) => {
    const data = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "{}");
    return data[userId] || [];
};

export const saveFavoritesInLocalStorage = (userId, favorites) => {
    const data = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "{}")
    data[userId] = favorites;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(data));
};

export const addFavoriteToLocalStorage = (userId, favorite) => {
    const data = JSON.parse(localStorage.getItem("favorites") || "{}");
    const favorites = data[userId] || [];

    const exists = favorites.some(favorite => favorite._id === favorite._id);
    if (!exists) {
        favorites.push(favorite);
        data[userId] = favorites;
        localStorage.setItem("favorites", JSON.stringify(data));
    }
};

export const deleteFavoriteFromLocalStorage = (userId, productId) => {
    const data = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "{}");
    const favorites = data[userId] || [];
    const newFavorites = favorites.filter(favorite => favorite._id !== productId);
    data[userId] = newFavorites;
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(data));
};