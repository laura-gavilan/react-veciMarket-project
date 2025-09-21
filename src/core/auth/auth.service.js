export const saveUserInLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const getUserLocalStorage = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
};

export const saveTokenInLocalStorage = (token) => {
    localStorage.setItem("token", token);
};

export const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
};

export const removeTokenFromLocalStorage = () => {
    localStorage.removeItem("token");
};