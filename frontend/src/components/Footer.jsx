import "../styles/Footer.css";

import { Link } from "react-router-dom";

import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaYoutube
} from "react-icons/fa";

function Footer(){

return(

<footer className="footer">

<div className="footer-container">

<div>

<div className="footer-logo">

🍽️ Food Paradise

</div>

<p className="footer-description">

Experience delicious food, warm hospitality, and unforgettable dining moments.
Fresh ingredients, expert chefs, and exceptional service await you every day.

</p>

<div className="social-icons">

<a href="https://facebook.com" target="_blank" rel="noreferrer">

<FaFacebookF/>

</a>

<a href="https://instagram.com" target="_blank" rel="noreferrer">

<FaInstagram/>

</a>

<a href="https://twitter.com" target="_blank" rel="noreferrer">

<FaTwitter/>

</a>

<a href="https://youtube.com" target="_blank" rel="noreferrer">

<FaYoutube/>

</a>

</div>

</div>

<div>

<h3>Quick Links</h3>

<ul className="footer-links">

<li><Link to="/">Home</Link></li>

<li><Link to="/menu">Menu</Link></li>

<li><Link to="/categories">Categories</Link></li>

<li><Link to="/about">About</Link></li>

<li><Link to="/contact">Contact</Link></li>

</ul>

</div>

<div className="footer-contact">

<h3>Contact Us</h3>

<p>

📍 Ravulapalem,<br/>
Dr. B.R. Ambedkar Konaseema,<br/>
Andhra Pradesh - 533238

</p>

<p>

📞 +91 9876543210

</p>

<p>

📧 foodparadise@gmail.com

</p>

<p>

🕒 Mon - Sun<br/>

10:00 AM - 11:00 PM

</p>

</div>

</div>

<div className="footer-bottom">

<p>

© {new Date().getFullYear()} Food Paradise. All Rights Reserved.

</p>

</div>

</footer>

);

}

export default Footer;

//This is footer page
// function Footer(){
//     return <h1>Footer</h1>;
// }
// export default Footer;