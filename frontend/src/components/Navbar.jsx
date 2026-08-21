import "../styles/Navbar.css";

import { Link, NavLink, useNavigate } from "react-router-dom";

import {
    FaShoppingCart,
    FaUtensils,
    FaBars,
    FaTimes
} from "react-icons/fa";

import { useState } from "react";

import { useAuth } from "../context/AuthContext";


function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const navigate = useNavigate();

    // Authentication state
    const {
        user,
        logout,
        isAuthenticated,
        isAdmin
    } = useAuth();


    // Generate user initials
    const initials = user?.fullName
        ? user.fullName
            .split(" ")
            .map(name => name[0])
            .join("")
            .substring(0, 2)
            .toUpperCase()
        : "";


    // Logout
    const handleLogout = () => {

        logout();

        setProfileOpen(false);

        setMenuOpen(false);

        navigate("/login");

    };


    return (

        <nav className="navbar">

            {/* Logo */}

            <Link
                to="/"
                className="logo"
                onClick={() => setMenuOpen(false)}
            >

                <FaUtensils />

                <span> Food Paradise</span>

            </Link>


            {/* Navigation Links */}

            <div
                className={
                    menuOpen
                        ? "nav-links active"
                        : "nav-links"
                }
            >

                <NavLink
                    to="/"
                    onClick={() => setMenuOpen(false)}
                >
                    Home
                </NavLink>


                <NavLink
                    to="/menu"
                    onClick={() => setMenuOpen(false)}
                >
                    Menu
                </NavLink>


                <NavLink
                    to="/categories"
                    onClick={() => setMenuOpen(false)}
                >
                    Categories
                </NavLink>


                <NavLink
                    to="/orders"
                    onClick={() => setMenuOpen(false)}
                >
                    Pickup Orders
                </NavLink>


                <NavLink
                    to="/about"
                    onClick={() => setMenuOpen(false)}
                >
                    About
                </NavLink>


                <NavLink
                    to="/contact"
                    onClick={() => setMenuOpen(false)}
                >
                    Contact
                </NavLink>


                {/* Cart */}

                <NavLink
                    to="/cart"
                    className="cart-icon"
                    onClick={() => setMenuOpen(false)}
                >

                    <FaShoppingCart />

                </NavLink>


                {/* Authentication */}

                {isAuthenticated ? (

                    <div
                        className="user-avatar"
                        onClick={() =>
                            setProfileOpen(!profileOpen)
                        }
                    >

                        {/* Avatar */}

                        <div className="avatar-circle">

                            {initials}

                        </div>


                        {/* Profile Dropdown */}

                        {profileOpen && (

                            <div className="profile-dropdown">

                                <div className="profile-header">

                                    <div className="profile-avatar">

                                        {initials}

                                    </div>


                                    <div>

                                        <h4>
                                            {user.fullName}
                                        </h4>

                                        <p>
                                            {user.email || user.phone}
                                        </p>

                                    </div>

                                </div>


                                <hr />


                                {/* My Orders */}

                                <button
                                    className="dropdown-btn"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        setProfileOpen(false);

                                        navigate("/orders");

                                    }}
                                >

                                    📦 My Pickup Orders

                                </button>


                                {/* Admin Dashboard */}

                                {isAdmin && (

                                    <button
                                        className="dropdown-btn"
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            setProfileOpen(false);

                                            navigate("/admin");

                                        }}
                                    >

                                        🛠️ Admin Dashboard

                                    </button>

                                )}


                                {/* Logout */}

                                <button
                                    className="dropdown-btn logout"
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleLogout();

                                    }}
                                >

                                    🚪 Logout

                                </button>

                            </div>

                        )}

                    </div>

                ) : (

                    <>

                        {/* Login */}

                        <NavLink
                            to="/login"
                            className="login-btn"
                            onClick={() =>
                                setMenuOpen(false)
                            }
                        >

                            Login

                        </NavLink>


                        {/* Register */}

                        <NavLink
                            to="/register"
                            className="login-btn"
                            onClick={() =>
                                setMenuOpen(false)
                            }
                        >

                            Register

                        </NavLink>

                    </>

                )}

            </div>


            {/* Mobile Menu */}

            <div
                className="menu-toggle"
                onClick={() =>
                    setMenuOpen(!menuOpen)
                }
            >

                {menuOpen
                    ? <FaTimes />
                    : <FaBars />
                }

            </div>

        </nav>

    );

}


export default Navbar;