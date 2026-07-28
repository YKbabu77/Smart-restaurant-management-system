//this is the menu page 
import "../styles/Menu.css";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import { showError, showSuccess } from "../utils/toast";
import { useLocation } from "react-router-dom";


function Menu(){
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const urlCategory = queryParams.get("category");
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    useEffect(() => {

      fetchFoods();

    }, []);
    const fetchFoods = async () => {

    try{

        const response = await api.get("/api/foods");

        setFoods(response.data);

    }
    catch(error){

        console.error(error);

        showError("Unable to load Menu.");

    }
    finally{

        setLoading(false);

    }

   };
    useEffect(() => {
    if (urlCategory) {
        setSelectedCategory(urlCategory);
    } else {
        setSelectedCategory("All");
    }
}, [urlCategory]);
     if (loading) {
        return <Loader />;
    }
    const filteredFoods = foods.filter((food) => {

    const matchesSearch =
        food.name.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
        selectedCategory === "All" ||
        food.categoryName === selectedCategory;

    return matchesSearch && matchesCategory;
});
    const addToCart = async (food) => {
    try {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
             showError("Please login first.");
            return;
        }

        const cartRequest = {
        userId: user.id,
        foodId: food.id,
        quantity: 1
    };

        await api.post("/api/cart", cartRequest);

        showSuccess(`${food.name} added to cart`);

    } catch (error) {

        console.error(error);
        showError("Unable to add item to cart.");
    }
};
return(
  

<div className="menu-page">
  <Helmet>
                <title>Food Paradise | Menu</title>
                <meta
                    name="description"
                    content="Explore our delicious menu."
                />
            </Helmet>

<h1 className="menu-title">
Our Menu
</h1>

<center>

<input
className="search-box"
placeholder="Search Food..."
value={search}
onChange={(e) => setSearch(e.target.value)}
/>

</center>

<div className="filter">

<center>

<button onClick={() => setSelectedCategory("All")}>
    All
</button>

<button
    className={selectedCategory === "Pizza" ? "active-filter" : ""}
    onClick={() => setSelectedCategory("Pizza")}
>
    Pizza
</button>
<button 
    className={selectedCategory === "Burgers" ? "active-filter" : ""}
    onClick={() => setSelectedCategory("Burgers")}
>
    Burgers
</button>

<button 
    className={selectedCategory === "Chicken" ? "active-filter" : ""}
    onClick={() => setSelectedCategory("Chicken")}>
    Chicken
</button>

<button 
    className={selectedCategory === "Drinks" ? "active-filter" : ""}
    onClick={() => setSelectedCategory("Drinks")}>
    Drinks
</button>

</center>

</div>

<div className="food-grid">

{
filteredFoods.map(food=>(

<div
className="food-card"
key={food.id}
>

<img src={food.imageUrl} alt={food.name}/>

<div className="food-details">

<h3>{food.name}</h3>
<p className="food-description">
    {food.description}
</p>

<p className="food-price">

₹{food.price}

</p>

<button 
    className="food-btn" 
    onClick={() => showSuccess(`${food.name} added to cart!`)}
    onClick={() => addToCart(food)}>

Add To Cart

</button>

</div>

</div>

))
}

</div>

</div>

);

}

export default Menu;