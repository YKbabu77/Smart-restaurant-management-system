//This is About page
import "../styles/About.css";

import restaurant from "../assets/restaurant.jpg";
import chef from "../assets/chef.jpg";
import { Helmet } from "react-helmet-async";
function About(){

return(

<div className="about-page">
    <Helmet>
    <title>Food Paradise | About Us</title>
</Helmet>

<section className="about-hero">

<div className="about-content">

<h1>About Our Restaurant</h1>

<p>

Welcome to Food Paradise, where every meal is prepared
with passion, fresh ingredients, and authentic flavors.

</p>

<p>

Since our beginning, we have served thousands of happy
customers with delicious dishes made by experienced chefs.

</p>

</div>

<div className="about-image">

<img
src={restaurant}
alt="Restaurant"
/>

</div>

</section>

<section className="stats">

<div className="stat-card">

<h2>10+</h2>

<p>Years Experience</p>

</div>

<div className="stat-card">

<h2>15K+</h2>

<p>Happy Customers</p>

</div>

<div className="stat-card">

<h2>100+</h2>

<p>Menu Items</p>

</div>

<div className="stat-card">

<h2>4.8★</h2>

<p>Customer Rating</p>

</div>

</section>

<section className="chef-section">

<div className="chef-image">

<img
src={chef}
alt="Chef"
/>

</div>

<div className="chef-content">

<h2>Meet Our Master Chef</h2>

<p>

Our chefs combine creativity, premium ingredients,
and years of culinary experience to prepare meals
that customers love.

</p>

</div>

</section>

<section className="why-us">

<h2>Why Choose Us?</h2>

<div className="features">

<div className="feature-card">

<h3>🍽 Fresh Ingredients</h3>

<p>
We use only fresh and high-quality ingredients.
</p>

</div>

<div className="feature-card">

<h3>⚡ Fast Service</h3>

<p>
Quick preparation and timely delivery.
</p>

</div>

<div className="feature-card">

<h3>😊 Customer Satisfaction</h3>

<p>
Thousands of happy customers trust us every day.
</p>

</div>

<div className="feature-card">

<h3>👨‍🍳 Expert Chefs</h3>

<p>
Professional chefs with years of experience.
</p>

</div>

</div>

</section>

</div>

);

}

export default About;