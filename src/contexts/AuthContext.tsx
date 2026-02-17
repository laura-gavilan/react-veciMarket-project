import { createContext, useEffect, useMemo, useState } from "react";
import { getUserLocalStorage } from "../core/auth/auth.service";
import type { ChildrenProps, User } from "../types/types";

export interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: ChildrenProps) => {
    const [user, setUser] = useState<User | null>(null);

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