import React, { useState } from "react";
import PizzaLeft from "../assets/background-hoa-hong_045205487.jpg";
import "../styles/Contact.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar.jsx";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5); // Default rating, adjust as needed
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
          // User and seller IDs are placeholders; replace or handle as needed
          id: {
            userID: 2,
            sellerID: 1,
          },
        }),
      });

      const data = await response.json();
      if (data.code === 1000) {
        setFeedbackResult(data.result);
        alert("Feedback created successfully!");
      } else {
        alert("Failed to create feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="contact">
      <Navbar />
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${PizzaLeft})` }}
      ></div>
      <div className="rightSide">
        <h1>Feedback</h1>

        <form id="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name</label>
          <input
            name="name"
            placeholder="Enter full name..."
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            placeholder="Enter email..."
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <label htmlFor="rating">Rating</label>
          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <button type="submit">Send Feedback</button>
        </form>

        {/* Display feedback result */}
        {feedbackResult && (
          <div className="feedback-result">
            <h3>Thank you for your feedback!</h3>
            <p>Comment: {feedbackResult.comment}</p>
            <p>Rating: {feedbackResult.rating}</p>
            <p>Submitted at: {new Date(feedbackResult.createdAt).toLocaleString()}</p>
          </div>
        )}
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default Contact;
