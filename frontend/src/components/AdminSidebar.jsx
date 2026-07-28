import { Link } from "react-router-dom";
import "../styles/AdminSidebar.css";

function AdminSidebar() {
    return (
        <div className="sidebar">
            <h2>🍽 Food Paradise</h2>

            <Link to="/admin">📊 Dashboard</Link>

            <Link to="/admin/foods">🍕 Foods</Link>

            <Link to="/admin/categories">📂 Categories</Link>

            <Link to="/admin/orders">📦 Orders</Link>

            <Link to="/admin/customers">👥 Customers</Link>

            <Link to="/">🏠 Customer Site</Link>
        </div>
    );
}

export default AdminSidebar;