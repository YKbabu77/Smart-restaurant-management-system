//This is the notfound page
import "../styles/NotFound.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function NotFound() {

    return (

        <div className="notfound-page">\
        <Helmet>
    <title>404 | Page Not Found</title>
</Helmet>

            <div className="notfound-container">

                <div className="error-icon">
                    🍽️
                </div>

                <h1 className="error-code">
                    404
                </h1>

                <h2 className="error-title">
                    Oops! Page Not Found
                </h2>

                <p className="error-text">
                    The page you are looking for doesn't exist or may have been moved.
                    Please return to our homepage to continue exploring our delicious menu.
                </p>

                <Link
                    to="/"
                    className="home-btn"
                >
                    🏠 Back to Home
                </Link>

            </div>

        </div>

    );

}

export default NotFound;