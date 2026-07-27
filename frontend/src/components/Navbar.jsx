import "../styles/Navbar.css";

import { NavLink, Link } from "react-router-dom";

import { FaShoppingCart } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa";

function Navbar(){

return(

<nav className="navbar">

<Link
to="/"
className="logo"
>

<FaUtensils/>

<span>

 Food Paradise

</span>

</Link>

<div className="nav-links">

<NavLink to="/">Home</NavLink>

<NavLink to="/menu">Menu</NavLink>

<NavLink to="/categories">Categories</NavLink>

<NavLink to="/orders">Orders</NavLink>

<NavLink to="/about">About</NavLink>

<NavLink to="/contact">Contact</NavLink>

</div>

<div className="nav-icons">

<NavLink
to="/cart"
className="cart-icon"
>

<FaShoppingCart/>

</NavLink>

<NavLink
to="/login"
className="login-btn"
>

Login

</NavLink>

</div>

<div className="menu-toggle">

☰

</div>

</nav>

);

}

export default Navbar;