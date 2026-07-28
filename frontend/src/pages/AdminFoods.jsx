import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminFoods.css";

function AdminFoods() {

    const [foods, setFoods] = useState([]);

    useEffect(() => {
        loadFoods();
    }, []);

    const loadFoods = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/foods"
            );

            setFoods(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="admin-container">

            <AdminSidebar />

            <div className="foods-content">

                <div className="foods-header">

                    <h1>🍕 Food Management</h1>

                    <button className="add-food-btn">
                        + Add Food
                    </button>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Available</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {foods.map(food => (

                            <tr key={food.id}>

                                <td>{food.id}</td>

                                <td>{food.name}</td>

                                <td>{food.categoryName}</td>

                                <td>₹{food.price}</td>

                                <td>
                                    {food.isAvailable ? "Yes" : "No"}
                                </td>

                                <td>

                                    <button>Edit</button>

                                    <button>Delete</button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminFoods;