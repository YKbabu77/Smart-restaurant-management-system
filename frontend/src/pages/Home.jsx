import biryani from "../assets/biryani.jpg";
import "../styles/Home.css";

function Home() {
  return (
    <div>

      {/* Hero Section */}

      <section className="hero">

        <div className="hero-content">

          <h1>
            Delicious Food Delivered Fresh
          </h1>

          <p>
            Enjoy mouth-watering dishes prepared by our expert chefs using
            fresh ingredients and delivered straight to your doorstep.
          </p>

          <button className="hero-btn">
            Order Now
          </button>

        </div>

        <div className="hero-image">
          <img src={biryani} alt="Restaurant Food" />
        </div>

      </section>

      {/* Featured Foods */}

      <section className="section">

        <h2>Featured Dishes</h2>

        <div className="food-container">

          <div className="food-card">
            <h3>🍕 Margherita Pizza</h3>
            <p>$12</p>
          </div>

          <div className="food-card">
            <h3>🍔 Chicken Burger</h3>
            <p>$9</p>
          </div>

          <div className="food-card">
            <h3>🥗 Fresh Salad</h3>
            <p>$10</p>
          </div>

        </div>

      </section>

      {/* Categories */}

      <section className="section categories">

        <h2>Food Categories</h2>

        <div className="category-container">

          <div className="category">🍕 Pizza</div>

          <div className="category">🍔 Burger</div>

          <div className="category">🍗 Chicken</div>

          <div className="category">🥤 Drinks</div>

          <div className="category">🍰 Desserts</div>

        </div>

      </section>

      {/* Why Choose Us */}

      <section className="section why">

        <h2>Why Choose Us?</h2>

        <p>✅ Fresh Ingredients</p>

        <p>🚀 Fast Delivery</p>

        <p>👨‍🍳 Expert Chefs</p>

        <p>⭐ Excellent Taste</p>

      </section>

      {/* Customer Reviews */}

      <section className="section reviews">

        <h2>Customer Reviews</h2>

        <div className="review-card">
          <h3>⭐⭐⭐⭐⭐</h3>
          <p>
            "Amazing food, quick delivery, and excellent service. Highly
            recommended!"
          </p>
        </div>

        <div className="review-card">
          <h3>⭐⭐⭐⭐⭐</h3>
          <p>
            "One of the best restaurants. Delicious food with great quality."
          </p>
        </div>

      </section>

      {/* Call To Action */}

      <section className="section cta">

        <h2>Ready to Order Delicious Food?</h2>

        <button>
          Explore Menu
        </button>

      </section>

    </div>
  );
}

export default Home;