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
    const [showModal, setShowModal] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const getStatusLabel = (status) => {

    switch (status) {

        case "PENDING":
            return "Pending";

        case "CONFIRMED":
            return "Confirmed";

        case "DELIVERED":
            return "Delivered";

        case "CANCELLED":
            return "Cancelled";

        default:
            return status;
    }

    };
    useEffect(() => {
        fetchOrders();
    }, []);
    const fetchOrders = async () => {

    try {

        const response = await api.get("/api/orders/user/1");

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
                <title>Food Paradise | My Orders</title>
            </Helmet>

            <div className="empty-orders">

                <h2>You haven't placed any orders yet.</h2>

                <p>
                    Your order history will appear here after your first order.
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
    <title>Food Paradise | My Orders</title>
</Helmet>

            <h1 className="orders-title">
                My Orders
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

                        <p className="order-date">

                            Date : {
                                new Date(order.orderDate).toLocaleDateString("en-IN", {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric"
                                })
                            }

                        </p>

                        {/* <ul className="order-items">

                            {order.items.map((item,index)=>(

                                <li key={index}>

                                    {item}

                                </li>

                            ))}

                        </ul> */}

                        <p className="order-total">

                            Total : ₹{order.totalAmount}

                        </p>

                        <button className="order-btn"
                        onClick={() => viewDetails(order.id)}>

                            View Details

                        </button>

                    </div>

                ))}

            </div>
            {showModal && (

    <div className="modal-overlay">

        <div className="modal">

            <h2>Order Details</h2>

            {selectedOrderItems.map(item => (

                <div key={item.id} className="modal-item">

                    <img
                        src={item.foodImageUrl}
                        alt={item.foodName}
                        width="80"
                    />

                    <div>

                        <h3>{item.foodName}</h3>

                        <p>Price : ₹{item.price}</p>

                        <p>Quantity : {item.quantity}</p>

                        <p>Subtotal : ₹{item.price * item.quantity}</p>

                    </div>

                </div>

            ))}

            <button className="order-btn"
                onClick={() => setShowModal(false)}
            >
                Close
            </button>

        </div>

    </div>

    )}

        </div>

    );

}
export default Orders;