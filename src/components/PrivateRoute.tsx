import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import type { UserRole } from "../types/types";

export type PrivateRouteType = {
    roles: UserRole;
};

export const PrivateRoute = ({ roles }: PrivateRouteType) => {
    const { user } = useContext(AuthContext) as AuthContextType;

    if (!user) {
        return <Navigate to="/login" state={{ message: "Usuario no autenticado" }} replace />;
    }


    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" state={{ message: "Acceso denegado" }} replace />;
    }

    return <Outlet />;
};