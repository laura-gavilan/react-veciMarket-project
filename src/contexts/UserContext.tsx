import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { getTokenFromLocalStorage, saveUserInLocalStorage, removeUserFromLocalStorage } from "../core/auth/auth.service";
import { getProfileApi } from "../core/auth/auth.api";
import type { ChildrenProps, User } from "../types/types";

export type UserContextType = {
    user: User | null;
    loading: boolean;
    updateUser: (newUser: User) => void;
    clearUser: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: ChildrenProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadCurrentUser = async () => {
            const token = getTokenFromLocalStorage();
            if (!token) {
            setLoading(false);
            return;
            }
            try {
                const { user } = await getProfileApi(); 
                setUser(user);
                saveUserInLocalStorage(user);
            } catch (error) {
                console.error("No se pudo cargar el usuario actual:", error);
                setUser(null);
                removeUserFromLocalStorage();
            } finally {
                setLoading(false);
            }
        };

        loadCurrentUser();
    }, []);

    const updateUser = useCallback((newUser: User): void => {
        setUser(newUser);
        saveUserInLocalStorage(newUser);
    }, []);

    const clearUser = useCallback((): void => {
        setUser(null);
        removeUserFromLocalStorage();
    }, []);

    const contextValue = useMemo<UserContextType>(() => ({ user, updateUser, clearUser, loading }), [user, updateUser, clearUser, loading]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};