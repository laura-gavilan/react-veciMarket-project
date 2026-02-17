import type { User } from "../../types/types";

export const saveUserInLocalStorage = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUserLocalStorage = (): User | null => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const removeUserFromLocalStorage = (): void => {
    localStorage.removeItem("user");
};

export const saveTokenInLocalStorage = (token: string): void => {
    localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = (): string | null => {
    return localStorage.getItem("token");
};

export const removeTokenFromLocalStorage = (): void => {
    localStorage.removeItem("token");
};