import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import "../styles/AdminFoods.css";

function AdminFoods() {

    const UNDO_DELETE_TTL_MS = 15000;
    const LAST_DELETED_FOOD_KEY = "admin-last-deleted-food";

    const [foods, setFoods] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingFoodId, setEditingFoodId] = useState(null);
    const [lastDeletedFood, setLastDeletedFood] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        categoryId: "",
        isAvailable: true,
        isSpecial: false,
        rating: "0"
    });

    const readStoredDeletedFood = () => {
        try {
            const storedValue = localStorage.getItem(LAST_DELETED_FOOD_KEY);
            if (!storedValue) {
                return null;
            }

            const parsedValue = JSON.parse(storedValue);
            if (Date.now() > parsedValue.expiresAt) {
                localStorage.removeItem(LAST_DELETED_FOOD_KEY);
                return null;
            }

            return parsedValue.food;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const saveDeletedFood = (food) => {
        const payload = {
            food,
            expiresAt: Date.now() + UNDO_DELETE_TTL_MS
        };
        localStorage.setItem(LAST_DELETED_FOOD_KEY, JSON.stringify(payload));
    };

    const clearDeletedFoodStorage = () => {
        localStorage.removeItem(LAST_DELETED_FOOD_KEY);
    };

    useEffect(() => {
        const storedDeletedFood = readStoredDeletedFood();
        if (storedDeletedFood) {
            setLastDeletedFood(storedDeletedFood);
        }

        loadFoods();
        loadCategories();
    }, []);

    useEffect(() => {
        if (!lastDeletedFood) {
            return undefined;
        }

        const storedValue = localStorage.getItem(LAST_DELETED_FOOD_KEY);
        if (!storedValue) {
            setLastDeletedFood(null);
            return undefined;
        }

        try {
            const parsedValue = JSON.parse(storedValue);
            const timeoutId = window.setTimeout(() => {
                setLastDeletedFood(null);
                clearDeletedFoodStorage();
            }, Math.max(0, parsedValue.expiresAt - Date.now()));

            return () => window.clearTimeout(timeoutId);
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }, [lastDeletedFood]);

    const loadFoods = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/foods");
            setFoods(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadCategories = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/categories");
            setCategories(response.data);
            if (response.data.length > 0) {
                setFormData((prev) => ({ ...prev, categoryId: response.data[0].id.toString() }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            price: "",
            imageUrl: "",
            categoryId: categories[0]?.id?.toString() || "",
            isAvailable: true,
            isSpecial: false,
            rating: "0"
        });
    };

    const openAddForm = () => {
        setEditingFoodId(null);
        resetForm();
        setShowForm(true);
    };

    const openEditForm = (food) => {
        setEditingFoodId(food.id);
        setFormData({
            name: food.name || "",
            description: food.description || "",
            price: food.price ?? "",
            imageUrl: food.imageUrl || "",
            categoryId: food.categoryId?.toString() || food.category?.id?.toString() || categories[0]?.id?.toString() || "",
            isAvailable: food.isAvailable ?? true,
            isSpecial: food.isSpecial ?? false,
            rating: food.rating?.toString() || "0"
        });
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingFoodId(null);
        resetForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                imageUrl: formData.imageUrl,
                isAvailable: formData.isAvailable,
                isSpecial: formData.isSpecial,
                rating: Number(formData.rating) || 0,
                category: {
                    id: Number(formData.categoryId)
                }
            };

            if (editingFoodId) {
                await axios.put(`http://localhost:8080/api/foods/${editingFoodId}`, payload);
                alert("Food updated successfully.");
            } else {
                await axios.post("http://localhost:8080/api/foods", payload);
                alert("Food added successfully.");
            }

            setShowForm(false);
            setEditingFoodId(null);
            resetForm();
            loadFoods();
        } catch (error) {
            console.error(error);
            alert(editingFoodId ? "Unable to update food." : "Unable to add food.");
        }
    };

    const deleteFood = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this food?");

        if (!confirmDelete) {
            return;
        }

        try {
            const deletedFood = foods.find((food) => food.id === id);
            await axios.delete(`http://localhost:8080/api/foods/${id}`);
            const foodToStore = deletedFood || null;
            setLastDeletedFood(foodToStore);
            if (foodToStore) {
                saveDeletedFood(foodToStore);
            } else {
                clearDeletedFoodStorage();
            }
            alert("Food deleted successfully.");
            loadFoods();
        } catch (error) {
            console.error(error);
            alert("Unable to delete food.");
        }
    };

    const restoreDeletedFood = async () => {
        if (!lastDeletedFood) {
            return;
        }

        try {
            const categoryId = lastDeletedFood.categoryId
                ?? lastDeletedFood.category?.id
                ?? categories.find((category) => category.name === lastDeletedFood.categoryName)?.id;

            const payload = {
                name: lastDeletedFood.name,
                description: lastDeletedFood.description || "",
                price: Number(lastDeletedFood.price),
                imageUrl: lastDeletedFood.imageUrl || "",
                isAvailable: lastDeletedFood.isAvailable ?? true,
                isSpecial: lastDeletedFood.isSpecial ?? false,
                rating: Number(lastDeletedFood.rating) || 0,
                category: {
                    id: Number(categoryId)
                }
            };

            await axios.post("http://localhost:8080/api/foods", payload);
            setLastDeletedFood(null);
            clearDeletedFoodStorage();
            alert("Food restored successfully.");
            loadFoods();
        } catch (error) {
            console.error(error);
            alert("Unable to restore food.");
        }
    };

    return (
        <div className="admin-container">
            <AdminSidebar />

            <div className="foods-content">
                <div className="foods-header">
                    <h1>🍕 Food Management</h1>
                    <div className="header-actions">
                        {lastDeletedFood && (
                            <button className="undo-btn" type="button" onClick={restoreDeletedFood}>
                                ↺ Undo Delete
                            </button>
                        )}
                        <button className="add-food-btn" onClick={openAddForm}>
                            + Add Food
                        </button>
                    </div>
                </div>

                {showForm && (
                    <div className="food-modal-overlay" onClick={() => setShowForm(false)}>
                        <div className="food-modal" onClick={(e) => e.stopPropagation()}>
                            <div className="food-modal-header">
                                <h2>{editingFoodId ? "Edit Food" : "Add New Food"}</h2>
                                <button className="close-modal-btn" type="button" onClick={closeForm}>
                                    ×
                                </button>
                            </div>

                            <form className="food-form" onSubmit={handleSubmit}>
                                <div className="form-grid">
                                    <label>
                                        Food Name
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="e.g. Margherita Pizza"
                                            required
                                        />
                                    </label>

                                    <label>
                                        Category
                                        <select
                                            name="categoryId"
                                            value={formData.categoryId}
                                            onChange={handleChange}
                                            required
                                        >
                                            {categories.map((category) => (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </label>

                                    <label>
                                        Price (₹)
                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            min="0"
                                            step="0.01"
                                            required
                                        />
                                    </label>

                                    <label>
                                        Rating
                                        <input
                                            type="number"
                                            name="rating"
                                            value={formData.rating}
                                            onChange={handleChange}
                                            min="0"
                                            max="5"
                                            step="0.1"
                                        />
                                    </label>
                                </div>

                                <label>
                                    Description
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="3"
                                        placeholder="Short description of the dish"
                                    />
                                </label>

                                <label>
                                    Image URL
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        placeholder="/images/food-name.jpg"
                                    />
                                </label>

                                <div className="checkbox-row">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="isAvailable"
                                            checked={formData.isAvailable}
                                            onChange={handleChange}
                                        />
                                        Available
                                    </label>

                                    <label>
                                        <input
                                            type="checkbox"
                                            name="isSpecial"
                                            checked={formData.isSpecial}
                                            onChange={handleChange}
                                        />
                                        Special
                                    </label>
                                </div>

                                <div className="form-actions">
                                    <button className="cancel-btn" type="button" onClick={closeForm}>
                                        Cancel
                                    </button>
                                    <button className="save-btn" type="submit">
                                        {editingFoodId ? "Update Food" : "Save Food"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Available</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {foods.map((food) => (
                            <tr key={food.id}>
                                <td>
                                    <img
                                        src={`http://localhost:8080${food.imageUrl}`}
                                        alt={food.name}
                                        className="food-image"
                                    />
                                </td>

                                <td>{food.name}</td>
                                <td>{food.categoryName}</td>
                                <td>₹{food.price}</td>
                                <td>{food.isAvailable ? "✅ Yes" : "❌ No"}</td>
                                <td>⭐ {food.rating}</td>

                                <td>
                                    <button className="edit-btn" onClick={() => openEditForm(food)}>
                                        Edit
                                    </button>
                                    <button className="delete-btn" onClick={() => deleteFood(food.id)}>
                                        Delete
                                    </button>
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