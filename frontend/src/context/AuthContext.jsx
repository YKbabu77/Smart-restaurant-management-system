import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                return JSON.parse(storedUser);
            } catch (error) {
                console.error("Invalid user data:", error);
                return null;
            }
        }

        return null;
    });

    const login = (token, userData) => {

        localStorage.setItem("token", token);

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setUser(userData);
    };

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);
    };

    const isAuthenticated = !!user;

    const isAdmin = user?.role === "ADMIN";

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                logout,
                isAuthenticated,
                isAdmin
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}