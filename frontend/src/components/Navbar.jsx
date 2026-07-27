import "../styles/Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { FaShoppingCart, FaUtensils, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);

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

                <NavLink
                    to="/login"
                    className="login-btn"
                    onClick={() => setMenuOpen(false)}
                >
                    Login
                </NavLink>

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