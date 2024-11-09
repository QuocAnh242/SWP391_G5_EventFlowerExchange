import React, { useState } from "react";
import "../styles/Contact.css";
import Footer from "../components/Footer";

const Contact = ({ setTestimonials }) => {  // Accept setTestimonials as a prop
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(1);
  const [loading, setLoading] = useState(false);
  const [feedbackResult, setFeedbackResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Kiểm tra dữ liệu form
    if (!name || !email || !message) {
      setFeedbackResult("Vui lòng nhập đầy đủ thông tin.");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/identity/api/feedback/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, comment: message, rating }),
      });

      if (response.ok) {
        setFeedbackResult("Phản hồi đã được gửi thành công!");
        setName("");
        setEmail("");
        setMessage("");
        setRating(1);
        // Fetch the updated testimonials after feedback submission
        const responseFeedbacks = await fetch("http://localhost:8080/identity/api/feedback/all");
        const data = await responseFeedbacks.json();
        setTestimonials(data);  // Update the testimonials in the parent component
      } else {
        setFeedbackResult("Không thể gửi phản hồi.");
      }
    } catch (error) {
      setFeedbackResult("Lỗi khi gửi phản hồi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact">
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
          <select id="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
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
      <Footer />
    </div>
  );
};

export default Contact;
