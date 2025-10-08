const COMMERCE_KEY = "commerces";


export const getCommercesFromLocalStorage = () => {
    const data = localStorage.getItem(COMMERCE_KEY);
    return data ? JSON.parse(data) : [];
};


export const saveCommercesInLocalStorage = (commerces) => {
    localStorage.setItem(COMMERCE_KEY, JSON.stringify(commerces));
};


export const addCommerceToLocalStorage = (commerce) => {
    const current = getCommercesFromLocalStorage();
    saveCommercesInLocalStorage([...current, commerce]);
};


export const updateCommerceInLocalStorage = (updatedCommerce) => {
    const current = getCommercesFromLocalStorage();
    const updated = current.map(c => c._id === updatedCommerce._id ? updatedCommerce : c);
    saveCommercesInLocalStorage(updated);
};


export const deleteCommerceFromLocalStorage = (commerceId) => {
    const current = getCommercesFromLocalStorage();
    const updated = current.filter(c => c._id !== commerceId);
    saveCommercesInLocalStorage(updated);
};