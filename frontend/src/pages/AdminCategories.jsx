import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminCategories.css";
import api from "../services/api";




function AdminCategories() {
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [categoryData, setCategoryData] = useState({

        id: "",
        name: "",
        description: "",
        imageUrl: "",
        status: true

    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {

        try {

            const response = await api.get("/api/categories");

            setCategories(response.data);

        } catch (error) {

            console.error(error);

        }

    };
    const deleteCategory = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this category?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/api/categories/${id}`);

            loadCategories();

            alert("Category deleted successfully!");

        } catch (error) {

            console.error(error);
            alert("Unable to delete category.");

        }
    };
    const saveCategory = async () => {

    try {

        if (isEditing) {

            await api.put(`/api/categories/${categoryData.id}`, categoryData);

        }

        else {

            await api.post(

                "/api/categories",

                categoryData

            );

        }

        setShowModal(false);

        loadCategories();

    }

    catch(error){

        console.error(error);

        alert("Unable to save category.");

    }

};

    return (

        <div className="admin-container">

            <AdminSidebar />

            <div className="categories-content">

                <div className="categories-header">

                    <h1>📂 Category Management</h1>

                    <button
                        className="add-category-btn"
                        onClick={() => {

                            setIsEditing(false);

                            setCategoryData({

                                id: "",
                                name: "",
                                description: "",
                                imageUrl: "",
                                status: true

                            });

                            setShowModal(true);

                        }}
                    >
                        + Add Category
                    </button>

                </div>

                <table>

                    <thead>

                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>


                        </tr>

                    </thead>

                    <tbody>

                        {categories.map((category) => (

                            <tr key={category.id}>

                                <td>

                                    <img
                                        src={`https://restaurant-management-system-bf0d.onrender.com${category.imageUrl}`}
                                        alt={category.name}
                                        className="category-image"
                                    />

                                </td>

                                <td>{category.name}</td>

                                <td>{category.description}</td>

                                <td>

                                    {category.status
                                        ? "✅ Active"
                                        : "❌ Inactive"}

                                </td>

                                <td className="actions">
                                    <button
                                        className="edit-btn"
                                        onClick={() => {

                                            setIsEditing(true);

                                            setCategoryData(category);

                                            setShowModal(true);

                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button className="delete-btn"
                                        onClick={() => deleteCategory(category.id)}>
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>
                {
                    showModal && (

                        <div className="modal-overlay">

                            <div className="modal">

                                <h2>

                                    {isEditing ? "Edit Category" : "Add Category"}

                                </h2>

                                <input
                                    type="text"
                                    placeholder="Category Name"
                                    value={categoryData.name}
                                    onChange={(e) =>
                                        setCategoryData({
                                            ...categoryData,
                                            name: e.target.value
                                        })
                                    }
                                />

                                <textarea
                                    placeholder="Description"
                                    value={categoryData.description}
                                    onChange={(e) =>
                                        setCategoryData({
                                            ...categoryData,
                                            description: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={categoryData.imageUrl}
                                    onChange={(e) =>
                                        setCategoryData({
                                            ...categoryData,
                                            imageUrl: e.target.value
                                        })
                                    }
                                />

                                <select
                                    value={categoryData.status}
                                    onChange={(e) =>
                                        setCategoryData({
                                            ...categoryData,
                                            status: e.target.value === "true"
                                        })
                                    }
                                >

                                    <option value={true}>Active</option>

                                    <option value={false}>Inactive</option>

                                </select>

                                <div className="modal-buttons">

                                    <button
                                        className="save-btn"
                                        onClick={saveCategory}
                                    >
                                        Save
                                    </button>

                                    <button
                                        className="cancel-btn"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>

        </div>

    );

}

export default AdminCategories;