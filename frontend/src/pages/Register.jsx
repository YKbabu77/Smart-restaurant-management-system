//This is the register page
import "../styles/Register.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
    confirmPassword: ""
    });

    const [message, setMessage] = useState("");
    const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    };
    const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password confirmation
    if (formData.password !== formData.confirmPassword) {
        setMessage("Passwords do not match.");
        return;
    }

    try {

        const response = await axios.post(
            "http://localhost:8080/api/auth/register",
            {
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password
            }
        );

        setMessage("Registration Successful!");

        // Clear form
        setFormData({
            fullName: "",
            email: "",
            phone: "",
            dob: "",
            password: "",
            confirmPassword: ""
        });

        // Redirect to Login page after 2 seconds
        setTimeout(() => {
            navigate("/login");
        }, 2000);

    } catch (error) {

        if (error.response) {

            // Validation or duplicate email
            if (error.response.data.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage("Registration Failed");
            }

        } else {
            setMessage("Server is not responding.");
        }

    }
    };
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

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
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
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                        />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                             name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                        />
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