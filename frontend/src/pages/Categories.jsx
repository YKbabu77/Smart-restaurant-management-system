//This is categories page
import "../styles/Categories.css";

import pizza from "../assets/pizza-category.jpg";
import burger from "../assets/burger-category.jpg";
import chicken from "../assets/chicken-category.jpg";
import drinks from "../assets/drinks-category.jpg";
import dessert from "../assets/dessert-category.jpg";

const categories = [
    {
        id: 1,
        name: "Pizza",
        description: "Cheesy and freshly baked pizzas.",
        image: pizza
    },
    {
        id: 2,
        name: "Burgers",
        description: "Juicy burgers with fresh ingredients.",
        image: burger
    },
    {
        id: 3,
        name: "Chicken",
        description: "Grilled and crispy chicken dishes.",
        image: chicken
    },
    {
        id: 4,
        name: "Drinks",
        description: "Refreshing hot and cold beverages.",
        image: drinks
    },
    {
        id: 5,
        name: "Desserts",
        description: "Sweet treats to end your meal.",
        image: dessert
    }
];

function Categories() {
    return (
        <div className="categories-page">

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
                            src={category.image}
                            alt={category.name}
                        />

                        <div className="category-content">

                            <h2>{category.name}</h2>

                            <p>{category.description}</p>

                            <button className="category-btn">
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