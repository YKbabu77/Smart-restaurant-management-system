//This is the orders page
import "../styles/Orders.css";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import { showError } from "../utils/toast";
import { useNavigate } from "react-router-dom";

function Orders() {
    const navigate = useNavigate();
    const [selectedOrderItems, setSelectedOrderItems] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const getStatusLabel = (status) => {

        switch (status) {

            case "PENDING":
                return "Pending";

            case "CONFIRMED":
                return "Confirmed";

            case "PREPARING":
                return "Preparing";

            case "READY_FOR_PICKUP":
                return "Ready For Pickup";

            case "COMPLETED":
                return "Completed";

            case "CANCELLED":
                return "Cancelled";

            default:
                return status;
        }

    };
    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {

            navigate("/login");

            return;

        }

        fetchOrders();

    }, []);
    const fetchOrders = async () => {

        try {

            const user = JSON.parse(localStorage.getItem("user"));

            if (!user) {

                showError("Please login first.");

                navigate("/login");

                return;

            }

            const response = await api.get(`/api/orders/user/${user.id}`);

            setOrders(response.data);

        } catch (error) {

            console.error(error);

            showError("Unable to load orders.");

        } finally {

            setLoading(false);

        }

    };
    if (loading) {
        return <Loader />;
    }

    const viewDetails = async (orderId) => {

        try {
            const order = orders.find(o => o.id === orderId);
            setSelectedOrder(order);

            const response = await api.get(`/api/order-items/order/${orderId}`);

            setSelectedOrderItems(response.data);

            setShowModal(true);

        } catch (error) {

            console.error(error);

            showError("Unable to load order details.");

        }

    };
    if (!loading && orders.length === 0) {

        return (

            <div className="orders-page">

                <Helmet>
                    <title>Food Paradise | My  PickupOrders</title>
                </Helmet>

                <div className="empty-orders">

                    <h2>You haven't placed any pickup orders yet.</h2>

                    <p>
                        Your pickup order history will appear here after your first order.
                    </p>

                    <button
                        className="order-btn"
                        onClick={() => navigate("/menu")}
                    >
                        Order Now
                    </button>

                </div>

            </div>

        );

    }
    return (

        <div className="orders-page">
            <Helmet>
                <title>Food Paradise | My Pickup Orders</title>
            </Helmet>

            <h1 className="orders-title">
                My Pickup Orders
            </h1>

            <div className="orders-container">

                {orders.map(order => (

                    <div
                        className="order-card"
                        key={order.id}
                    >

                        <div className="order-header">

                            <div className="order-id">

                                Order #{order.id}

                            </div>

                            <div className={`order-status ${order.status.toLowerCase()}`}>
                                {getStatusLabel(order.status)}
                            </div>

                        </div>

                        <div className="order-info-grid">

                            <div className="info-box">

                                <span>📅 Order Date</span>

                                <strong>
                                    {new Date(order.orderDate).toLocaleDateString("en-IN", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </strong>

                            </div>

                            <div className="info-box">

                                <span>🕒 Pickup Time</span>

                                <strong>{order.pickupTime}</strong>

                            </div>

                            <div className="info-box">

                                <span>🍳 Ready Time</span>

                                <strong>{order.estimatedReadyTime}</strong>

                            </div>

                        </div>

                        <div className="order-footer">

                            <div className="order-total">

                                <span>Total Amount</span>

                                <h2>
                                    ₹{order.totalAmount}
                                </h2>

                            </div>

                            <button
                                className="order-btn"
                                onClick={() => viewDetails(order.id)}
                            >
                                View Details
                            </button>

                        </div>

                    </div>

                ))}

            </div>
            {showModal && (

                <div className="modal-overlay">

                    <div className="modal">
                        <div className="modal-header">

                            <h2>
                                🍽 Order Details
                            </h2>

                            <button
                                className="modal-close"
                                onClick={() => setShowModal(false)}
                            >
                                ✕
                            </button>

                        </div>
                        <div className="modal-section">

                            <h3>
                                Ordered Items
                            </h3>

                            {selectedOrderItems.map(item => (

                                <div
                                    key={item.id}
                                    className="order-food-card"
                                >

                                    <img
                                        src={item.foodImageUrl}
                                        alt={item.foodName}
                                    />

                                    <div className="food-details">

                                        <h4>
                                            {item.foodName}
                                        </h4>

                                        <p>
                                            Quantity : {item.quantity}
                                        </p>

                                    </div>

                                    <div className="food-price">

                                        <h4>
                                            ₹{item.price}
                                        </h4>

                                        <p>
                                            ₹{item.price * item.quantity}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>
                        <div className="modal-section">

                            <h3>
                                Pickup Information
                            </h3>

                            <div className="pickup-grid">

                                <div className="pickup-card">

                                    <span>🕒 Pickup Time</span>

                                    <h4>{selectedOrder?.pickupTime}</h4>

                                </div>

                                <div className="pickup-card">

                                    <span>🍳 Ready Time</span>

                                    <h4>{selectedOrder?.estimatedReadyTime}</h4>

                                </div>

                                <div className="pickup-card">

                                    <span>💳 Payment</span>

                                    <h4>{selectedOrder?.paymentMethod}</h4>

                                </div>

                            </div>

                        </div>
                        <div className="modal-section">

                            <h3>
                                Instructions
                            </h3>

                            <div className="instructions-box">

                                {selectedOrder?.specialInstructions ||
                                    "No special instructions"}

                            </div>

                        </div>
                        <div className="modal-footer">

                            <div>

                                <span>Total Amount</span>

                                <h2>
                                    ₹{selectedOrder?.totalAmount}
                                </h2>

                            </div>

                            <button
                                className="order-btn"
                                onClick={() => setShowModal(false)}
                            >
                                Close
                            </button>

                        </div>
                    </div>

                </div>

            )}

        </div>

    );

}
export default Orders;