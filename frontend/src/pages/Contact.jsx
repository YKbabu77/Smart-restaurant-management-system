//This is the contact page
import "../styles/Contact.css";
import { Helmet } from "react-helmet-async";

function Contact() {

    return (

        <div className="contact-page">
            <Helmet>
    <title>Food Paradise | Contact Us</title>
</Helmet>

            <h1 className="contact-title">
                Contact Us
            </h1>

            <p className="contact-subtitle">
                We'd love to hear from you!
            </p>

            <div className="contact-container">

                <div className="contact-info">

                    <h2>Get In Touch</h2>

                    <div className="info-item">
                        <h3>📍 Address</h3>
                        <p>
                            Food Paradise Restaurant<br />
                            Ravulapalem,<br />
                            Dr. B.R. Ambedkar Konaseema District,<br />
                            Andhra Pradesh - 533238
                        </p>
                    </div>

                    <div className="info-item">
                        <h3>📞 Phone</h3>
                        <p>
                            +91 9876543210
                        </p>
                    </div>

                    <div className="info-item">
                        <h3>📧 Email</h3>
                        <p>
                            foodparadise@gmail.com
                        </p>
                    </div>

                    <div className="info-item">
                        <h3>🕒 Opening Hours</h3>
                        <p>
                            Monday - Sunday
                            <br />
                            10:00 AM - 11:00 PM
                        </p>
                    </div>

                </div>

                <div className="contact-form">

                    <h2>Send Message</h2>

                    <form>

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="form-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                placeholder="Enter subject"
                            />
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                rows="5"
                                placeholder="Write your message"
                            ></textarea>
                        </div>

                        <button
                            className="submit-btn"
                            type="submit"
                        >
                            Send Message
                        </button>

                    </form>

                </div>

            </div>

            <div className="map">

                <h2
                    style={{
                        marginBottom: "20px",
                        color: "#ff6b35"
                    }}
                >
                    Our Location
                </h2>

                <iframe
                    src="https://www.google.com/maps?q=Ravulapalem,+Andhra+Pradesh&output=embed"
                    allowFullScreen
                    loading="lazy"
                    title="Google Map"
                ></iframe>

            </div>

        </div>

    );

}

export default Contact;