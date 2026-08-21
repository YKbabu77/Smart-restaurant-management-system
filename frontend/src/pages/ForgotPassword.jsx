import "../styles/ForgotPassword.css";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import api from "../services/api";

function ForgotPassword() {

    const [identifier, setIdentifier] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setResetToken("");

        try {

            const response = await api.post(
                "/api/auth/forgot-password",
                {
                    identifier: identifier
                }
            );

            setMessage(
                response.data.message ||
                "Password reset token generated."
            );

            // TEMPORARY DEVELOPMENT ONL

        } catch (error) {

            console.error(error);

            if (error.response?.data?.error) {

                setMessage(error.response.data.error);

            } else {

                setMessage(
                    "Unable to process your request."
                );

            }
        }
    };


    return (

        <div className="forgot-password-page">

            <Helmet>
                <title>
                    Food Paradise | Forgot Password
                </title>
            </Helmet>


            <div className="forgot-password-container">

                <h1>
                    Forgot Password?
                </h1>

                <p>
                    Enter your email address or phone number
                    to reset your password.
                </p>


                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Email or Phone Number
                        </label>

                        <input
                            type="text"
                            value={identifier}
                            onChange={(e) =>
                                setIdentifier(e.target.value)
                            }
                            placeholder="Enter email or phone number"
                            required
                        />

                    </div>


                    {message && (

                        <p className="reset-message">
                            {message}
                        </p>

                    )}


                    <button
                        type="submit"
                        className="forgot-password-btn"
                    >
                        Send Reset Request
                    </button>

                </form>


                <div className="back-to-login">

                    <Link to="/login">
                        ← Back to Login
                    </Link>

                </div>

            </div>

        </div>

    );
}

export default ForgotPassword;