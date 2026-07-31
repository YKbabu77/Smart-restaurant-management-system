import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminOrders.css";
import api from "../services/api";

function AdminOrders() {

    const [orders, setOrders] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [showModal, setShowModal] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState(null);

    const [status, setStatus] = useState("");

    const [paymentStatus, setPaymentStatus] = useState("");
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const [orderDetails, setOrderDetails] = useState(null);

    const [loadingDetails, setLoadingDetails] = useState(false);
    const totalOrders = orders.length;
    const formatTime = (time) => {

        if (!time) return "--";

        const [hour, minute] = time.split(":");

        const h = Number(hour);

        const period = h >= 12 ? "PM" : "AM";

        const displayHour = h % 12 || 12;

        return `${displayHour}:${minute} ${period}`;

    };

    const pendingOrders = orders.filter(
        order => order.status === "PENDING"
    ).length;

    const preparingOrders = orders.filter(
        order => order.status === "PREPARING"
    ).length;

    const readyOrders = orders.filter(
        order => order.status === "READY_FOR_PICKUP"
    ).length;

    const totalRevenue = orders.reduce(
        (sum, order) => sum + Number(order.totalAmount),
        0
    );

    useEffect(() => {
        loadOrders();
    }, []);
    const loadOrders = async () => {

        try {

            const response = await api.get("/api/orders");

            setOrders(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };
    const filteredOrders = useMemo(() => {

        return orders.filter(order => {

            const searchMatch =

                order.customerName
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())

                ||

                order.id
                    .toString()
                    .includes(searchTerm);

            const statusMatch =

                statusFilter === "ALL"

                ||

                order.status === statusFilter;

            return searchMatch && statusMatch;

        });

    }, [orders, searchTerm, statusFilter]);
    const deleteOrder = async (id) => {

        const confirmDelete = window.confirm(
            "Delete this order?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/api/orders/${id}`);

            alert("Order deleted.");

            loadOrders();

        }

        catch (error) {

            console.error(error);

            alert("Unable to delete.");

        }

    };
    const openEditModal = (order) => {

        setSelectedOrder(order);

        setStatus(order.status);

        setPaymentStatus(order.paymentStatus);

        setShowModal(true);

    };
    const updateOrder = async () => {

        try {

            await api.put(

                `/api/orders/${selectedOrder.id}`,

                {

                    ...selectedOrder,

                    status,

                    paymentStatus

                }

            );

            alert("Order updated.");

            setShowModal(false);

            loadOrders();

        }

        catch (error) {

            console.error(error);

            alert("Unable to update order.");

        }

    };
    const updateOrderStatus = async (id, newStatus) => {

        try {

            await api.put(
                `/api/orders/${id}/status`,
                {
                    status: newStatus
                }
            );

            loadOrders();

        }

        catch (error) {

            console.error(error);

            alert("Unable to update order status.");

        }

    };
    const formatInstructions = (text) => {

        if (!text) return "None";

        return text;

    };
    const getNextStatus = (status) => {

        const steps = {

            PENDING: {

                label: "✅ Confirm",
                value: "CONFIRMED",
                className: "confirm-btn"

            },

            CONFIRMED: {

                label: "👨‍🍳 Preparing",
                value: "PREPARING",
                className: "prepare-btn"

            },

            PREPARING: {

                label: "🍽 Ready",
                value: "READY_FOR_PICKUP",
                className: "ready-btn"

            },

            READY_FOR_PICKUP: {

                label: "✔ Complete",
                value: "COMPLETED",
                className: "complete-btn"

            }

        };

        return steps[status] || null;

    };
    const viewOrderDetails = async (id) => {

        try {

            setLoadingDetails(true);

            const response = await api.get(

                `/api/orders/${id}/details`

            );

            setOrderDetails(response.data);

            setShowDetailsModal(true);

        }

        catch (error) {

            console.error(error);

            alert("Unable to load order details.");

        }

        finally {

            setLoadingDetails(false);

        }

    };
    return (
        <div className="admin-container">

            <AdminSidebar />

            <div className="orders-content">

                <div className="orders-header">

                    <h1>📦 Order Management</h1>

                </div>

                {/* Dashboard Cards */}

                <div className="order-cards">

                    <div className="order-card">
                        <h3>Total Orders</h3>
                        <h2>{totalOrders}</h2>
                    </div>

                    <div className="order-card pending">
                        <h3>Pending</h3>
                        <h2>{pendingOrders}</h2>
                    </div>

                    <div className="order-card preparing">
                        <h3>Preparing</h3>
                        <h2>{preparingOrders}</h2>
                    </div>

                    <div className="order-card ready">
                        <h3>Ready</h3>
                        <h2>{readyOrders}</h2>
                    </div>

                    <div className="order-card revenue">
                        <h3>Revenue</h3>
                        <h2>₹{totalRevenue}</h2>
                    </div>

                </div>

                {/* Search + Filter */}

                <div className="order-toolbar">

                    <input
                        type="text"
                        placeholder="Search by Order ID or Customer..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">All Orders</option>
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">
                            Confirmed
                        </option>

                        <option value="PREPARING">
                            Preparing
                        </option>

                        <option value="READY_FOR_PICKUP">
                            Ready For Pickup
                        </option>

                        <option value="COMPLETED">
                            Completed
                        </option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>

                </div>

                {/* Orders Table */}

                <table>

                    <thead>

                        <tr>

                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Pickup Time</th>
                            <th>Ready Time</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredOrders.map((order) => (

                            <tr key={order.id}>

                                <td>#{order.id}</td>

                                <td>{order.customerName}</td>

                                <td>

                                    {formatTime(order.pickupTime)}

                                </td>

                                <td>

                                    {formatTime(order.estimatedReadyTime)}
                                </td>

                                <td>₹{order.totalAmount}</td>

                                <td>{order.paymentMethod}</td>

                                <td>

                                    <span
                                        className={`status-badge ${order.status.toLowerCase()}`}
                                    >
                                        {order.status}
                                    </span>

                                </td>

                                <td className="action-buttons">

                                    <button
                                        className="view-btn"
                                        onClick={() => viewOrderDetails(order.id)}
                                    >
                                        View
                                    </button>

                                    {getNextStatus(order.status) && (

                                        <button
                                            className={getNextStatus(order.status).className}
                                            onClick={() =>
                                                updateOrderStatus(
                                                    order.id,
                                                    getNextStatus(order.status).value
                                                )
                                            }
                                        >   
                                            {getNextStatus(order.status).label}
                                        </button>

                                    )}

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteOrder(order.id)}
                                    >
                                        Delete
                                    </button>

                                </td>
                            </tr>

                        ))}


                    </tbody>

                </table>

                {/* Edit Modal */}

                {showModal && (

                    <div
                        className="food-modal-overlay"
                        onClick={() => setShowModal(false)}
                    >

                        <div
                            className="food-modal"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <div className="food-modal-header">

                                <h2>Edit Order</h2>

                                <button
                                    className="close-modal-btn"
                                    onClick={() => setShowModal(false)}
                                >
                                    ×
                                </button>

                            </div>

                            <div className="food-form">

                                <label>

                                    Order Status

                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >

                                        <option value="PENDING">Pending</option>

                                        <option value="PREPARING">Preparing</option>

                                        <option value="CONFIRMED">
                                            Confirmed
                                        </option>

                                        <option value="READY_FOR_PICKUP">
                                            Ready For Pickup
                                        </option>

                                        <option value="COMPLETED">
                                            Completed
                                        </option>

                                        <option value="CANCELLED">
                                            Cancelled
                                        </option>

                                    </select>

                                </label>

                                <label>

                                    Payment Status

                                    <select
                                        value={paymentStatus}
                                        onChange={(e) =>
                                            setPaymentStatus(e.target.value)
                                        }
                                    >

                                        <option value="PENDING">Pending</option>

                                        <option value="PAID">Paid</option>

                                        <option value="FAILED">Failed</option>

                                    </select>

                                </label>

                                <div className="form-actions">

                                    <button
                                        className="cancel-btn"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="save-btn"
                                        onClick={updateOrder}
                                    >
                                        Update Order
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>

                )}
                {
                    showDetailsModal && orderDetails && (

                        <div
                            className="food-modal-overlay"
                            onClick={() => setShowDetailsModal(false)}
                        >

                            <div
                                className="food-modal order-details-modal"
                                onClick={(e) => e.stopPropagation()}
                            >

                                <div className="order-modal-header">

                                    <h2>

                                        Order #{orderDetails.id}

                                    </h2>

                                    <button
                                        className="close-modal-btn"
                                        onClick={() => setShowDetailsModal(false)}
                                    >

                                        ×

                                    </button>

                                </div>

                                <div className="order-details">

                                    <p>

                                        <strong>Customer :</strong>

                                        {orderDetails.customerName}

                                    </p>

                                    <p>

                                        <strong>Date :</strong>

                                        {new Date(orderDetails.orderDate).toLocaleString()}

                                    </p>

                                    <p>

                                        <strong>Status :</strong>

                                        {orderDetails.status}

                                    </p>

                                    <p>

                                        <strong>Payment :</strong>

                                        {orderDetails.paymentMethod}

                                    </p>

                                    <p>

                                        <strong>Payment Status :</strong>

                                        {orderDetails.paymentStatus}

                                    </p>

                                    <h3>Pickup Information</h3>

                                    <p>

                                        <strong>Pickup Time :</strong>

                                        {formatTime(orderDetails.pickupTime)}

                                    </p>

                                    <p>

                                        <strong>Estimated Ready :</strong>

                                        {formatTime(orderDetails.estimatedReadyTime)}
                                    </p>

                                    <p>

                                        <strong>Special Instructions :</strong>

                                        {formatInstructions(orderDetails.specialInstructions)}

                                    </p>

                                    <hr />

                                    <h3>Ordered Items</h3>

                                    {
                                        orderDetails.items.map(item => (

                                            <div
                                                key={item.id}
                                                className="ordered-item"
                                            >

                                                <img
                                                    src={item.foodImageUrl}
                                                    alt={item.foodName}
                                                />

                                                <div>

                                                    <h4>

                                                        {item.foodName}

                                                    </h4>

                                                    <p>

                                                        Quantity :

                                                        {item.quantity}

                                                    </p>

                                                    <p>

                                                        Price :

                                                        ₹{item.price}

                                                    </p>

                                                </div>

                                            </div>

                                        ))
                                    }

                                    <hr />

                                    <h2>

                                        Total :

                                        ₹{orderDetails.totalAmount}

                                    </h2>

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>

        </div>
    );

}
export default AdminOrders;