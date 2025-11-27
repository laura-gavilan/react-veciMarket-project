import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { getTokenFromLocalStorage, saveUserInLocalStorage, removeUserFromLocalStorage } from "../core/auth/auth.service";
import { getProfileApi } from "../core/auth/auth.api";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const updateUser = useCallback((newUser) => {
        setUser(newUser);
        saveUserInLocalStorage(newUser);
    }, []);

    const clearUser = useCallback(() => {
        setUser(null);
        removeUserFromLocalStorage();
    }, []);

    const contextValue = useMemo(() => ({
        user,
        setUser: updateUser,
        clearUser,
        loading
    }), [user, updateUser, clearUser, loading]);

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};