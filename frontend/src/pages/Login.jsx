//this is the login page 
import "../styles/Login.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Login() {

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

                <form>

                    <div className="form-group">

                        <label>Email</label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
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