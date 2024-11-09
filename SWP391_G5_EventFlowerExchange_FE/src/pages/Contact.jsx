import React, { useState } from "react";
import PizzaLeft from "../assets/background-hoa-hong_045205487.jpg";
import "../styles/Contact.css";
import Footer from "../components/Footer";
// import Navbar from "../components/Navbar.jsx";

const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(1);
    const [loading, setLoading] = useState(false);
    const [feedbackResult, setFeedbackResult] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!name || !email || !message) {
            setFeedbackResult("Vui lòng nhập đầy đủ thông tin.");
            setLoading(false);
            return;
        } else if (!emailRegex.test(email)) {
            setFeedbackResult("Vui lòng nhập địa chỉ email hợp lệ.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/identity/api/feedback/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    comment: message,
                    rating,
                }),
            });

            const responseData = await response.json();
            console.log("Response data:", responseData);

            if (response.ok) {
                setFeedbackResult("Phản hồi đã được gửi thành công!");
                // Clear form fields after successful submission
                setName("");
                setEmail("");
                setMessage("");
                setRating(1);
            } else {
                setFeedbackResult("Không thể gửi phản hồi.");
            }
        } catch (error) {
            console.error("Lỗi khi gửi phản hồi:", error);
            setFeedbackResult("Lỗi khi gửi phản hồi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact">
            {/* <Navbar /> */}
            <div
                className="leftSide"
                style={{ backgroundImage: `url(${PizzaLeft})` }}
            ></div>
            <div className="rightSide">
                <h1>Gửi Phản Hồi</h1>

                <form id="contact-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Họ và Tên</label>
                    <input
                        name="name"
                        placeholder="Nhập họ và tên..."
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        placeholder="Nhập email..."
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="message">Lời Nhắn</label>
                    <textarea
                        rows="6"
                        placeholder="Nhập lời nhắn..."
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>

                    <label htmlFor="rating">Đánh Giá</label>
                    <select
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        <option value="1">1 - Rất tệ</option>
                        <option value="2">2 - Tệ</option>
                        <option value="3">3 - Trung bình</option>
                        <option value="4">4 - Tốt</option>
                        <option value="5">5 - Xuất sắc</option>
                    </select>

                    <button type="submit" disabled={loading}>
                        {loading ? "Đang gửi..." : "Gửi Phản Hồi"}
                    </button>
                </form>

                {feedbackResult && <div className="feedback-result">{feedbackResult}</div>}
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Contact;
