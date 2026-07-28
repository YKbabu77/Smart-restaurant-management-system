//this is the login page 
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
    email: "",
    password: ""
    });

    const [message, setMessage] = useState("");
    const handleChange = (e) => {
    setLoginData({
        ...loginData,
        [e.target.name]: e.target.value
    });
    };
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {

        const response = await axios.post(
            "http://localhost:8080/api/auth/login",
            loginData
        );

        // Save logged-in user
        localStorage.setItem(
            "user",
            JSON.stringify(response.data)
        );

        setMessage("Login Successful!");

        setTimeout(() => {
            navigate("/");
        }, 1000);

    } catch (error) {

    console.log(error);
    console.log(error.response);
    console.log(error.message);

    if (error.response) {

        if (error.response.data.error) {
            setMessage(error.response.data.error);
        } else {
            setMessage("Login Failed");
        }

    } else {

        setMessage(error.message);

    }
    }
    };
    return (

        <div className="login-page">
          <Helmet>
                <title>Food Paradise | Login</title>
            </Helmet>

            <div className="login-container">

                <h1 className="login-title">
                    Welcome Back
                </h1>

                <p className="login-subtitle">
                    Login to your account
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            value={loginData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                             name="password"
                            value={loginData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />

                    </div>

                    <div className="remember-forgot">

                        <label>

                            <input type="checkbox" />

                            {" "}Remember Me

                        </label>

                        <a href="#">
                            Forgot Password?
                        </a>

                    </div>
                    {message && (
                        <p
                            style={{
                            color: message.includes("Successful") ? "green" : "red",
                            marginBottom: "15px",
                            fontWeight: "bold"
                         }}
                        >
                            {message}
                        </p>
                    )}
                    <button
                        className="login-btn"
                        type="submit"
                    >
                        Login
                    </button>

                </form>

                <div className="register-link">

                    Don't have an account?

                    <Link to="/register">

                        {" "}Register

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Login;