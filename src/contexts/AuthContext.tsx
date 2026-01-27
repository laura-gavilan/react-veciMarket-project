import { createContext, useEffect, useMemo, useState } from "react";
import { getUserLocalStorage } from "../core/auth/auth.service";
import type { ChildrenProps, UserProps } from "../types/types";
import type { AuthContextProps } from './../types/types';


export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: ChildrenProps) => {
    const [user, setUser] = useState<UserProps | null>(null);

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