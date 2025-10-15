import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = ({ roles }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" state={{ message: "Usuario no autenticado" }} replace />;
    }


    if (roles && !roles.includes(user.role)) {
        return <Navigate to="/" state={{ message: "Acceso denegado" }} replace />;
    }

    return <Outlet />;
};