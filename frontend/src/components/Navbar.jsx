import "../styles/Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
    FaShoppingCart,
    FaUtensils,
    FaBars,
    FaTimes,
    FaUserCircle
} from "react-icons/fa";
import { useState } from "react";


function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);  
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));
    const initials = user
    ? user.fullName
          .split(" ")
          .map(name => name[0])
          .join("")
          .substring(0, 2)
          .toUpperCase()
    : "";
    const handleLogout = () => {

    localStorage.removeItem("user");

    setProfileOpen(false);

    setMenuOpen(false);

    navigate("/login");

    };
    return (

        <nav className="navbar">

            <Link to="/" className="logo">

                <FaUtensils />

                <span> Food Paradise</span>

            </Link>

            <div className={menuOpen ? "nav-links active" : "nav-links"}>

                <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>

                <NavLink to="/menu" onClick={() => setMenuOpen(false)}>Menu</NavLink>

                <NavLink to="/categories" onClick={() => setMenuOpen(false)}>Categories</NavLink>

                <NavLink to="/orders" onClick={() => setMenuOpen(false)}>Orders</NavLink>

                <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>

                <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>

                <NavLink
                    to="/cart"
                    className="cart-icon"
                    onClick={() => setMenuOpen(false)}
                >
                    <FaShoppingCart />
                </NavLink>

               {
                user ? (

        <div
    className="user-avatar"
    onClick={() => setProfileOpen(!profileOpen)}
>

    <div className="avatar-circle">

        {initials}

    </div>

    {
        profileOpen && (

            <div className="profile-dropdown">

                <div className="profile-header">

                    <div className="profile-avatar">

                        {initials}

                    </div>

                    <div>

                        <h4>{user.fullName}</h4>

                        <p>{user.email}</p>

                    </div>

                </div>

                <hr />

                <button
                    className="dropdown-btn"
                    onClick={() => {

                        setProfileOpen(false);

                        navigate("/orders");

                    }}
                >

                    📦 My Orders

                </button>

                <button
                    className="dropdown-btn logout"
                    onClick={handleLogout}
                >

                    🚪 Logout

                </button>

            </div>

        )
    }

    </div>

        ) : (

        <>
            <NavLink
                to="/login"
                className="login-btn"
                onClick={() => setMenuOpen(false)}
            >
                Login
            </NavLink>

            <NavLink
                to="/register"
                className="login-btn"
                onClick={() => setMenuOpen(false)}
            >
                Register
            </NavLink>

        </>

    )
    }

            </div>

            <div
                className="menu-toggle"
                onClick={() => setMenuOpen(!menuOpen)}
            >

                {
                    menuOpen ? <FaTimes /> : <FaBars />
                }

            </div>

        </nav>

    );

}

export default Navbar;