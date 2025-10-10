import { createContext, useState, useEffect } from "react";
import { getUserLocalStorage, saveUserInLocalStorage, removeUserFromLocalStorage } from "../core/auth/auth.service";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const storedUser = getUserLocalStorage();
        if (storedUser) setUser(storedUser);
    }, []);


    const updateUser = (newUser) => {
        setUser(newUser);
        saveUserInLocalStorage(newUser);
    };

    const clearUser = () => {
        setUser(null);
        removeUserFromLocalStorage();
    };

    return (
        <UserContext.Provider value={{ user, setUser: updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};
