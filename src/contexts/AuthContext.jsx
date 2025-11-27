import { createContext, useEffect, useMemo, useState } from "react";
import { getUserLocalStorage } from "../core/auth/auth.service";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = getUserLocalStorage();
        if (user) {
            setUser(user);
        }
    }, []);

    const contextValue = useMemo(() => ({ user, setUser }), [user]);

    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
};