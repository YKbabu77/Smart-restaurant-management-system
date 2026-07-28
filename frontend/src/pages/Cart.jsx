//This is the cart page
import "../styles/Cart.css";

// import pizza from "../assets/pizza.jpg";
// import burger from "../assets/burger.jpg";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import { showError, showSuccess } from "../utils/toast";
import { useNavigate } from "react-router-dom";


function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {

        navigate("/login");

        return;

    }

    fetchCart();

    }, []);

    const fetchCart = async () => {
    try {
        // Temporary: userId = 1
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await api.get(`/api/cart/user/${user.id}`);
        setCartItems(response.data);
    } catch (error) {
        console.error(error);
        showError("Unable to load cart.");
    } finally {
        setLoading(false);
    }
};
    if (loading) {
    return <Loader />;
    }

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
    );
    const increaseQuantity = async (item) => {
    try {
        const updatedCart = {
            ...item,
            quantity: item.quantity + 1
        };

        await api.put(`/api/cart/${item.id}`, updatedCart);

        fetchCart(); // Reload cart
    } catch (error) {
        console.error(error);
        showError("Unable to update quantity.");
    }
    };
    const decreaseQuantity = async (item) => {

    if (item.quantity === 1) return;

    try {

        const updatedCart = {
            ...item,
            quantity: item.quantity - 1
        };

        await api.put(`/api/cart/${item.id}`, updatedCart);

        fetchCart();

    } catch (error) {

        console.error(error);

        showError("Unable to update quantity.");

    }
    }
    const removeCartItem = async (id) => {

    try {

        await api.delete(`/api/cart/${id}`);

        showSuccess("Item removed from cart.");

        fetchCart();

    } catch (error) {

        console.error(error);

        showError("Unable to remove item.");

    }

    };
    const checkout = async () => {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        const orderRequest = {

        userId: user.id,

        deliveryAddress: "Ravulapalem, Andhra Pradesh",

        paymentMethod: "CASH"

    };

        await api.post("/api/orders", orderRequest);

        showSuccess("Order placed successfully!");

        fetchCart();

        navigate("/orders");

    } catch (error) {

        console.error(error);

        showError("Unable to place order.");

    }

    };
    if (cartItems.length === 0) {

    return (

        <div className="cart-page">

            <Helmet>
                <title>Food Paradise | Cart</title>
            </Helmet>

            <div className="empty-cart">

                <h2>🛒 Your Cart is Empty</h2>

                <p>
                    Browse our delicious menu and add your favorite dishes.
                </p>

                <button
                    className="continue-btn"
                    onClick={() => navigate("/menu")}
                >
                    Go to Menu
                </button>

            </div>

        </div>

    );

    }
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
                            src={item.foodImageUrl}
                            alt={item.foodName}
                        />

                        <div className="cart-info">

                            <h3>{item.foodName}</h3>

                            <p className="cart-price">
                                ₹{item.price}
                            </p>

                        </div>

                        <div className="quantity">

                           <button onClick={() => decreaseQuantity(item)}>
                                -
                            </button>

                            <span>{item.quantity}</span>

                            <button onClick={() => increaseQuantity(item)}>
                                +
                            </button>

                        </div>

                        <button 
                            className="remove-btn"
                            onClick={() => showSuccess(`${foodName} removed from cart!`)}
                            onClick={() => removeCartItem(item.id)}>
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

                        <button className="continue-btn"
                         onClick={() => navigate("/menu")}>
                            Continue Shopping
                        </button>

                        <button className="checkout-btn"
                         onClick={checkout}
                        >
                            Checkout
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Cart;