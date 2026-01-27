import type { CommerceProps } from "../../types/types";


const COMMERCE_KEY = "commerces";

export const getCommercesFromLocalStorage = (): CommerceProps[] => {
    const data = localStorage.getItem(COMMERCE_KEY);
    return data ? JSON.parse(data) : [];
};


export const saveCommercesInLocalStorage = (commerces: CommerceProps[]): void => {
    localStorage.setItem(COMMERCE_KEY, JSON.stringify(commerces));
};


export const addCommerceToLocalStorage = (commerce: CommerceProps): void => {
    const current = getCommercesFromLocalStorage();
    saveCommercesInLocalStorage([...current, commerce]);
};


export const updateCommerceInLocalStorage = (updatedCommerce: CommerceProps): void => {
    const current = getCommercesFromLocalStorage();
    const updated = current.map(commerce => commerce.commerce._id === updatedCommerce.commerce._id ? updatedCommerce : commerce);
    saveCommercesInLocalStorage(updated);
};


export const deleteCommerceFromLocalStorage = (commerceId: string): void => {
    const current = getCommercesFromLocalStorage();
    const updated = current.filter(commerce => commerce.commerce._id !== commerceId);
    saveCommercesInLocalStorage(updated);
};