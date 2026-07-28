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
    const handleTryDemo = () => {

    setLoginData({

        email: "demo@foodparadise.com",

        password: "Demo@123"

    });

    setMessage("");

    };
    const handleDemoLogin = async () => {

    try {

        const demoCredentials = {

            email: "demo@foodparadise.com",

            password: "Demo@123"

        };

        const response = await axios.post(

            "http://localhost:8080/api/auth/login",

            demoCredentials

        );

        localStorage.setItem(

            "user",

            JSON.stringify(response.data)

        );

        if (response.data.role === "ADMIN") {
            navigate("/admin");
        } else {
            navigate("/");
        }

    } catch (error) {

        console.error(error);

        setMessage("Demo login failed.");

    }

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

        if (response.data.role === "ADMIN") {
            navigate("/admin");
        } else {
            navigate("/");
        }

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
                <div className="demo-card">

    <h3>🚀 Recruiter Demo</h3>

    <p className="demo-text">
        Use the demo account to explore the application instantly.
    </p>

    <div className="demo-info">

        <p>
            <strong>Email:</strong> demo@foodparadise.com
        </p>

        <p>
            <strong>Password:</strong> Demo@123
        </p>

    </div>

    <div className="demo-buttons">

            <button
            type="button"
            className="demo-btn"
            onClick={handleTryDemo}
            >
            Try Demo
                </button>

                <button
                type="button"
                className="demo-login-btn"
                onClick={handleDemoLogin}
                >
                    One Click Demo Login
                    </button>

                </div>

            </div>

            </div>

        </div>

    );

}

export default Login;