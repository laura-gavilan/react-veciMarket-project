import { useContext } from "react"
import { loginApi, registerApi } from "./auth.api";
import { AuthContext } from "../../contexts/AuthContext";


export const useAuth = () => {
    const { setUser } = useContext(AuthContext);

    const login = async ({ email }) => {
        console.log(`${email} y ${password}`);

        const authData = await loginApi({ email, password });

        if (authData) {
            saveTokenInLocalStorage(authData.token);
            saveUserInLocalStorage(authData.user);
            setUser(authData.user);
        }
    };

    const register = async (user) => {
        console.log(`${user.email}`);

        const authData = await registerApi(user);

        if (authData) {
            saveTokenInLocalStorage(authData.token);
            saveUserInLocalStorage(authData.user);
            setUser(authData.user);
        }
    };

    return { login, register };
}