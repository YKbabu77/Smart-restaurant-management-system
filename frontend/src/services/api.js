import axios from "axios";

const api = axios.create({
    baseURL: "https://restaurant-management-system-bf0d.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

// ============================================
// REQUEST INTERCEPTOR
// Automatically attach JWT to every request
// ============================================

api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;
    },

    (error) => {

        return Promise.reject(error);

    }
);


// ============================================
// RESPONSE INTERCEPTOR
// Handle expired/invalid JWT
// ============================================

api.interceptors.response.use(

    (response) => {

        return response;

    },

    (error) => {

        if (error.response?.status === 401) {

            console.log("JWT expired or invalid.");

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            // Avoid redirecting repeatedly
            if (window.location.pathname !== "/login") {

                window.location.href = "/login";

            }

        }

        return Promise.reject(error);

    }

);


export default api;