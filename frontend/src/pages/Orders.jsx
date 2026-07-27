//This is the orders page
import "../styles/Orders.css";

const orders = [
    {
        id: 1001,
        date: "25 July 2026",
        status: "Delivered",
        total: 34,
        items: [
            "Margherita Pizza x2",
            "Chicken Burger x1"
        ]
    },
    {
        id: 1002,
        date: "20 July 2026",
        status: "Preparing",
        total: 28,
        items: [
            "Grilled Chicken x1",
            "Cold Drink x2"
        ]
    },
    {
        id: 1003,
        date: "15 July 2026",
        status: "Cancelled",
        total: 18,
        items: [
            "Veg Pizza x1",
            "Soft Drink x1"
        ]
    }
];

function Orders() {

    return (

        <div className="orders-page">

            <h1 className="orders-title">
                My Orders
            </h1>

            <div className="orders-container">

                {orders.map(order => (

                    <div
                        className="order-card"
                        key={order.id}
                    >

                        <div className="order-header">

                            <div className="order-id">

                                Order #{order.id}

                            </div>

                            <div className="order-status">

                                {order.status}

                            </div>

                        </div>

                        <p className="order-date">

                            Date : {order.date}

                        </p>

                        <ul className="order-items">

                            {order.items.map((item,index)=>(

                                <li key={index}>

                                    {item}

                                </li>

                            ))}

                        </ul>

                        <p className="order-total">

                            Total : ${order.total}

                        </p>

                        <button className="order-btn">

                            View Details

                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Orders;