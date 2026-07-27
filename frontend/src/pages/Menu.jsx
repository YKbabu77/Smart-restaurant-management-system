//this is the menu page 
import "../styles/Menu.css";

import pizza from "../assets/pizza.jpg";
import burger from "../assets/burger.jpg";
import chicken from "../assets/chicken.jpg";
import drink from "../assets/coco_cola.jpg";
import { Helmet } from "react-helmet-async";

const foods=[
{
id:1,
name:"Margherita Pizza",
price:12,
image:pizza
},
{
id:2,
name:"Chicken Burger",
price:8,
image:burger
},
{
id:3,
name:"Grilled Chicken",
price:15,
image:chicken
},
{
id:4,
name:"Cold Drink",
price:3,
image:drink
}
];

function Menu(){

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
/>

</center>

<div className="filter">

<center>

<button>All</button>
<button>Pizza</button>
<button>Burger</button>
<button>Chicken</button>
<button>Drinks</button>

</center>

</div>

<div className="food-grid">

{
foods.map(food=>(

<div
className="food-card"
key={food.id}
>

<img src={food.image}/>

<div className="food-details">

<h3>{food.name}</h3>

<p className="food-price">

${food.price}

</p>

<button className="food-btn">

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