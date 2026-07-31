import axios from "axios";

const api = axios.create({
    baseURL: "https://restaurant-management-system-bf0d.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;