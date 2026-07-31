import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { showSuccess, showError } from "../utils/toast";
import "../styles/SchedulePickup.css";

function SchedulePickup() {
    const navigate = useNavigate();

    const [pickupTime, setPickupTime] = useState("");
    const [specialInstructions, setSpecialInstructions] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("UPI");
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [pickupSlots, setPickupSlots] = useState([]);
    const generatePickupSlots = () => {

        const slots = [];

        const now = new Date();

        // Kitchen preparation time (minutes)
        let preparationTime = 20;

        // Earliest available pickup
        now.setMinutes(now.getMinutes() + preparationTime);

        // Round to next 15 minutes
        let minutes = now.getMinutes();

        let roundedMinutes = Math.ceil(minutes / 15) * 15;

        if (roundedMinutes === 60) {

            now.setHours(now.getHours() + 1);
            now.setMinutes(0);

        } else {

            now.setMinutes(roundedMinutes);

        }

        // Restaurant closing time
        const closing = new Date();

        closing.setHours(23, 0, 0, 0);

        while (now <= closing) {

            const hour = String(now.getHours()).padStart(2, "0");
            const minute = String(now.getMinutes()).padStart(2, "0");

            slots.push(`${hour}:${minute}`);

            now.setMinutes(now.getMinutes() + 15);

        }

        setPickupSlots(slots);

    };
    useEffect(() => {

        fetchCart();
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {

            navigate("/login");

            return;

        }

        generatePickupSlots();

    }, []);
    const fetchCart = async () => {

        try {

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
    const totalItems = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0
    );
    const handleContinue = async () => {

        if (!pickupTime) {
            alert("Please select a pickup time.");
            return;
        }

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            const orderRequest = {

                userId: user.id,
                pickupTime,
                specialInstructions,
                paymentMethod

            };

            await api.post("/api/orders", orderRequest);

            showSuccess("Pickup order scheduled successfully!");

            navigate("/orders");

        } catch (error) {

            console.error(error);

            showError("Unable to place order.");

        }

    };
    const calculateReadyTime = () => {

        if (!pickupTime) return "";

        const [hour, minute] = pickupTime.split(":").map(Number);

        const date = new Date();

        date.setHours(hour);
        date.setMinutes(minute);

        date.setMinutes(date.getMinutes() - 20);

        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        });

    };

    return (
        <div className="schedule-page">
            <section className="pickup-hero">

                <div className="hero-content">

                    <h1>
                        Schedule Your <span>Pickup</span>
                    </h1>

                    <p>
                        Freshly prepared. Ready exactly when you arrive.
                    </p>

                </div>

            </section>

            <div className="pickup-container">

                <div className="pickup-left">

                    <div className="card-header">
                        <h2>📅 Pickup Details</h2>
                        <span>Choose your pickup time and preferences</span>
                    </div>

                    <div className="form-group">

                        <label>Pickup Time</label>
                        {pickupSlots.length === 0 ? (

                            <div className="closed-message">

                                🚫 Online pickup ordering is closed for today.

                                <br />

                                Please visit us tomorrow between

                                <strong>10:00 AM - 11:00 PM</strong>

                            </div>

                        ) : (
                            <select
                                value={pickupTime}
                                onChange={(e) => setPickupTime(e.target.value)}
                            >

                                <option value="">
                                    Select Pickup Time
                                </option>

                                {pickupSlots.map((time) => (
                                    <option key={time} value={time}>
                                        {time}
                                    </option>
                                ))}

                            </select>
                        )}

                    </div>

                    <div className="ready-card">

                        <h3>Estimated Ready Time</h3>

                        <h4>{pickupTime ? calculateReadyTime() : "--:--"}</h4>

                        <p>
                            We will prepare your food fresh before you arrive.
                        </p>

                    </div>

                    <div className="form-group">

                        <label>Payment Method</label>

                        <div className="payment-options">

                            <button
                                className={paymentMethod === "CASH" ? "active" : ""}
                                onClick={() => setPaymentMethod("CASH")}
                            >
                                💵 Cash
                            </button>

                            <button
                                className={paymentMethod === "UPI" ? "active" : ""}
                                onClick={() => setPaymentMethod("UPI")}
                            >
                                📱 UPI
                            </button>

                            <button
                                className={paymentMethod === "CARD" ? "active" : ""}
                                onClick={() => setPaymentMethod("CARD")}
                            >
                                💳 Card
                            </button>

                        </div>

                    </div>

                    <div className="form-group">

                        <label>Special Instructions</label>

                        <textarea
                            rows="4"
                            placeholder="Example: Less spicy, no onions..."
                            value={specialInstructions}
                            onChange={(e) =>
                                setSpecialInstructions(e.target.value)
                            }
                        />

                    </div>

                    <button
                        className="confirm-btn"
                        onClick={handleContinue}
                    >
                        Confirm Pickup Order
                    </button>

                </div>

                <div className="pickup-right">

                    <h2 className="section-title">
                        🍽 Order Summary
                    </h2>

                    <div className="summary-items">

                        {cartItems.map(item => (

                            <div
                                className="summary-item"
                                key={item.id}
                            >

                                <img
                                    src={item.foodImageUrl}
                                    alt={item.foodName}
                                />

                                <div className="summary-info">

                                    <h4>{item.foodName}</h4>

                                    <p>
                                        Qty : {item.quantity}
                                    </p>

                                </div>

                                <span>
                                    ₹{Number(item.price) * item.quantity}
                                </span>

                            </div>

                        ))}

                    </div>

                    <hr />

                    <div className="summary-total">

                        <p>
                            Total Items
                        </p>

                        <strong>{totalItems}</strong>

                    </div>

                    <div className="summary-total">

                        <p>
                            Total Amount
                        </p>

                        <strong>
                            ₹{totalPrice}
                        </strong>

                    </div>

                </div>

            </div>

            <section className="pickup-features">

                <div className="feature-card">
                    <h3>⚡ Fast Preparation</h3>
                    <p>Your order is prepared fresh and on time.</p>
                </div>

                <div className="feature-card">
                    <h3>🛡 Safe & Hygienic</h3>
                    <p>Prepared with strict hygiene standards.</p>
                </div>

                <div className="feature-card">
                    <h3>🛵 On-Time Pickup</h3>
                    <p>Your food will be ready before arrival.</p>
                </div>

                <div className="feature-card">
                    <h3>😊 Great Taste</h3>
                    <p>Enjoy restaurant-quality food every time.</p>
                </div>

            </section>

        </div>
    );
}

export default SchedulePickup;