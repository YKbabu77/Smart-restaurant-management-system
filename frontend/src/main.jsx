import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { HelmetProvider } from "react-helmet-async";

import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HelmetProvider>

            <BrowserRouter>

                <AuthProvider>

                    <App />

                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop
                        closeOnClick
                        pauseOnHover
                        theme="colored"
                    />

                </AuthProvider>

            </BrowserRouter>

        </HelmetProvider>
    </React.StrictMode>
);