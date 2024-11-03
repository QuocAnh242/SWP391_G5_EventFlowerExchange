import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ReviewPage() {

  const { orderID } = useParams(); // Get flowerID from route parameters
  const [userID, setUserID] = useState(JSON.parse(localStorage.getItem("user")).userID);
  const [rating, setRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!userID || !orderID || rating === 0 || deliveryRating === 0) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/identity/reviews/${]', {
        userID: parseInt(userID), // Adjust based on your actual userID
        flowerID: parseInt(orderID),
        rating,
        deliveryRating,
        comment,
      });
      setSuccessMessage("Thank you for your review!");
      setRating(5); // Reset form fields
      setDeliveryRating(5);
      setComment("");
    } catch (err) {
      setError("Failed to submit review. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div className="review-page">
      <h2>Review the Flower</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label>User ID:</label>
          <input
            type="text"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            placeholder="Enter your user ID"
            required
          />
        </div> */}
        
        <div>
          <label>Flower Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label>Delivery Rating (1-5):</label>
          <input
            type="number"
            min="1"
            max="5"
            value={deliveryRating}
            onChange={(e) => setDeliveryRating(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label>Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
            required
          ></textarea>
        </div>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewPage;
