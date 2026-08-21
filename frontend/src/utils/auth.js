export const getToken = () => {
    return localStorage.getItem("token");
};

export const getUser = () => {
    const user = localStorage.getItem("user");

    if (!user) {
        return null;
    }

    try {
        return JSON.parse(user);
    } catch (error) {
        console.error("Invalid user data:", error);
        return null;
    }
};

export const isLoggedIn = () => {
    return !!getToken();
};

export const isAdmin = () => {
    const user = getUser();

    return user?.role === "ADMIN";
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};