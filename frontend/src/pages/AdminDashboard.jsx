import { useEffect, useState } from "react";
import axios from "axios";

import AdminSidebar from "../components/AdminSidebar";
import StatCard from "../components/StatCard";

import "../styles/AdminDashboard.css";

function AdminDashboard() {

    const [stats, setStats] = useState({
        users: 0,
        foods: 0,
        categories: 0,
        orders: 0,
        revenue: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const [
                usersRes,
                foodsRes,
                categoriesRes,
                ordersRes
            ] = await Promise.all([
                axios.get("http://localhost:8080/api/users"),
                axios.get("http://localhost:8080/api/foods"),
                axios.get("http://localhost:8080/api/categories"),
                axios.get("http://localhost:8080/api/orders")
            ]);

            // Revenue calculation (adjust field name if needed)
            const revenue = ordersRes.data.reduce(
                (sum, order) => sum + (order.totalAmount || 0),
                0
            );

            setStats({
                users: usersRes.data.length,
                foods: foodsRes.data.length,
                categories: categoriesRes.data.length,
                orders: ordersRes.data.length,
                revenue: revenue
            });

        } catch (error) {

            console.error("Dashboard Error:", error);

        }

    };

    return (

        <div className="admin-container">

            <AdminSidebar />

            <div className="dashboard-content">

                <h1>Restaurant Dashboard</h1>

                <div className="stats">

                    <StatCard
                        title="Users"
                        value={stats.users}
                        icon="👥"
                    />

                    <StatCard
                        title="Foods"
                        value={stats.foods}
                        icon="🍕"
                    />

                    <StatCard
                        title="Categories"
                        value={stats.categories}
                        icon="📂"
                    />

                    <StatCard
                        title="Orders"
                        value={stats.orders}
                        icon="📦"
                    />

                    <StatCard
                        title="Revenue"
                        value={`₹${stats.revenue}`}
                        icon="💰"
                    />

                </div>

            </div>

        </div>

    );

}

export default AdminDashboard;








// import "./../styles/AdminDashboard.css";

// function AdminDashboard() {
//     return (
//         <div className="admin-dashboard">
//             <h1>🍽️ Restaurant Admin Dashboard</h1>

//             <p>Welcome Admin 👋</p>

//             <h3>Coming Next...</h3>

//             <ul>
//                 <li>📊 Dashboard Statistics</li>
//                 <li>🍕 Manage Foods</li>
//                 <li>📂 Manage Categories</li>
//                 <li>📦 Manage Orders</li>
//                 <li>👥 Manage Customers</li>
//             </ul>
//         </div>
//     );
// }

// export default AdminDashboard;