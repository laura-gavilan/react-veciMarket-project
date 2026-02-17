import type { Commerce } from "../../types/types";

const COMMERCE_KEY = "commerces";

export const getCommercesFromLocalStorage = (): Commerce[] => {
    const data = localStorage.getItem(COMMERCE_KEY);
    return data ? JSON.parse(data) : [];
};


export const saveCommercesInLocalStorage = (commerces: Commerce[]): void => {
    localStorage.setItem(COMMERCE_KEY, JSON.stringify(commerces));
};


export const addCommerceToLocalStorage = (commerce: Commerce): void => {
    const current = getCommercesFromLocalStorage();
    saveCommercesInLocalStorage([...current, commerce]);
};


export const updateCommerceInLocalStorage = (updatedCommerce: Commerce): void => {
    const current = getCommercesFromLocalStorage();
    const updated = current.map(commerce => commerce._id === updatedCommerce._id ? updatedCommerce : commerce);
    saveCommercesInLocalStorage(updated);
};


export const deleteCommerceFromLocalStorage = (commerceId: string): void => {
    const current = getCommercesFromLocalStorage();
    const updated = current.filter(commerce => commerce._id !== commerceId);
    saveCommercesInLocalStorage(updated);
};