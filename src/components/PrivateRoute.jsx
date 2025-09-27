import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    const {user} = useContext(AuthContext);

    if(!user) {
        return <Navigate to="/" state={{ usuario: "no existe usuario"}} />
    };

    return <Outlet />
}