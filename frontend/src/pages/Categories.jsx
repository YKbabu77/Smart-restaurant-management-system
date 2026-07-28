//This is categories page
import "../styles/Categories.css";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import { showError } from "../utils/toast";
import { useNavigate } from "react-router-dom";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {

      fetchCategories();

    }, []);
    const fetchCategories = async () => {

    try{

        const response = await api.get("/api/categories");

        setCategories(response.data);

    }
    catch(error){

        console.error(error);

        showError("Unable to load categories.");

    }
    finally{

        setLoading(false);

    }

   };
    if (loading) {
        return <Loader />;
    }
    return (
        <div className="categories-page">
            <Helmet>
    <title>Food Paradise | Categories</title>
</Helmet>

            <h1 className="categories-title">
                Food Categories
            </h1>

            <p className="categories-subtitle">
                Explore our delicious menu categories.
            </p>

            <div className="category-grid">

                {categories.map(category => (

                    <div className="category-card" key={category.id}>

                        <img
                            src={category.imageUrl}
                            alt={category.name}
                        />

                        <div className="category-content">

                            <h2>{category.name}</h2>

                            <p>{category.description}</p>

                            <button className="category-btn"
                             onClick={() =>
                                    navigate(`/menu?category=${encodeURIComponent(category.name)}`)}
                            >
                                View Menu
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Categories;