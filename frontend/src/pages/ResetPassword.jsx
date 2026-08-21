import "../styles/ResetPassword.css";

import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import api from "../services/api";

function ResetPassword() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const tokenFromUrl = searchParams.get("token") || "";

    const [token, setToken] = useState(tokenFromUrl);

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        if (newPassword !== confirmPassword) {

            setMessage(
                "Passwords do not match."
            );

            return;
        }

        try {

            const response = await api.post(
                "/api/auth/reset-password",
                {
                    token: token,
                    newPassword: newPassword
                }
            );

            setMessage(
                response.data.message ||
                "Password reset successfully."
            );

            setTimeout(() => {

                navigate("/login");

            }, 2000);

        } catch (error) {

            console.error(error);

            if (error.response?.data?.error) {

                setMessage(
                    error.response.data.error
                );

            } else {

                setMessage(
                    "Password reset failed."
                );

            }
        }
    };


    return (

        <div className="reset-password-page">

            <Helmet>
                <title>
                    Food Paradise | Reset Password
                </title>
            </Helmet>


            <div className="reset-password-container">

                <h1>
                    Reset Password
                </h1>

                <p>
                    Create a new password for your account.
                </p>


                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Reset Token
                        </label>

                        <input
                            type="text"
                            value={token}
                            onChange={(e) =>
                                setToken(e.target.value)
                            }
                            placeholder="Enter reset token"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            New Password
                        </label>

                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            placeholder="Enter new password"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Confirm New Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm new password"
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
                        className="reset-password-btn"
                    >
                        Reset Password
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

export default ResetPassword;