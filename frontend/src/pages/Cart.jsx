//This is the cart page
import "../styles/Cart.css";

import pizza from "../assets/pizza.jpg";
import burger from "../assets/burger.jpg";
import { Helmet } from "react-helmet-async";

const cartItems = [
    {
        id: 1,
        name: "Margherita Pizza",
        price: 299,
        quantity: 2,
        image: pizza
    },
    {
        id: 2,
        name: "Chicken Burger",
        price: 199,
        quantity: 1,
        image: burger
    }
];

function Cart() {

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="cart-page">
          <Helmet>
    <title>Food Paradise | Cart</title>
</Helmet>

            <h1 className="cart-title">
                Shopping Cart
            </h1>

            <div className="cart-container">

                {cartItems.map(item => (

                    <div className="cart-item" key={item.id}>

                        <img
                            src={item.image}
                            alt={item.name}
                        />

                        <div className="cart-info">

                            <h3>{item.name}</h3>

                            <p className="cart-price">
                                ₹{item.price}
                            </p>

                        </div>

                        <div className="quantity">

                            <button>-</button>

                            <span>{item.quantity}</span>

                            <button>+</button>

                        </div>

                        <button className="remove-btn">
                            Remove
                        </button>

                    </div>

                ))}

                <div className="cart-summary">

                    <h2>
                        Order Summary
                    </h2>

                    <p>
                        <strong>Total Items:</strong> {totalItems}
                    </p>

                    <p>
                        <strong>Total Price:</strong> ₹{totalPrice}
                    </p>

                    <div className="cart-buttons">

                        <button className="continue-btn">
                            Continue Shopping
                        </button>

                        <button className="checkout-btn">
                            Checkout
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Cart;