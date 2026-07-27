//This is the register page
import "../styles/Register.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Register() {

    return (

        <div className="register-page">
          <Helmet>
    <title>Food Paradise | Register</title>
</Helmet>

            <div className="register-container">

                <h1 className="register-title">
                    Create Account
                </h1>

                <p className="register-subtitle">
                    Register to start ordering delicious food.
                </p>

                <form>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                            type="date"
                        />
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <textarea
                            rows="3"
                            placeholder="Enter your address"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Create a password"
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="register-btn"
                    >
                        Register
                    </button>

                </form>

                <div className="login-link">

                    Already have an account?

                    <Link to="/login">
                        {" "}Login
                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Register;