import React, { useState } from "react";
import PizzaLeft from "../assets/background-hoa-hong_045205487.jpg";
import "../styles/Contact.css";
import Footer from "../components/Footer";
// import Navbar from "../components/Navbar.jsx";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5); // Đánh giá mặc định, điều chỉnh nếu cần
  const [feedbackResult, setFeedbackResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/identity/api/feedback/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: message,
          rating,
          // ID người dùng và người bán là giá trị tạm thời, thay đổi hoặc xử lý nếu cần
          id: {
            userID: 2,
            sellerID: 1,
          },
        }),
      });

      const data = await response.json();
      if (data.code === 1000) {
        setFeedbackResult(data.result);
        alert("Phản hồi đã được gửi thành công!");
      } else {
        alert("Không thể gửi phản hồi.");
      }
    } catch (error) {
      console.error("Lỗi khi gửi phản hồi:", error);
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
        <h1>Phản Hồi</h1>

        <form id="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Họ và Tên</label>
          <input
            name="name"
            placeholder="Nhập họ và tên..."
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="Nhập email..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="message">Lời Nhắn</label>
          <textarea
            rows="6"
            placeholder="Nhập lời nhắn..."
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <label htmlFor="rating">Đánh Giá</label>
          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <button type="submit">Gửi Phản Hồi</button>
        </form>

        {/* Hiển thị kết quả phản hồi */}
        {/* {feedbackResult && (
          <div className="feedback-result">
            <h3>Cảm ơn bạn đã gửi phản hồi!</h3>
            <p>Lời nhắn: {feedbackResult.comment}</p>
            <p>Đánh giá: {feedbackResult.rating}</p>
            <p>Thời gian gửi: {new Date(feedbackResult.createdAt).toLocaleString()}</p>
          </div>
        )} */}
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default Contact;
