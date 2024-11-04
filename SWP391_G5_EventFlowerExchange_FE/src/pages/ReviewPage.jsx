import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ReviewPage.css";

function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userID, setUserID] = useState(null);
  const [flowerDetails, setFlowerDetails] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  // Fetch userID, flowerID, and product details
  useEffect(() => {
    const orderHistoryDetailArray = JSON.parse(localStorage.getItem("orderHistoryDetail") || "[]");
    if (orderHistoryDetailArray.length > 0) {
      const orderHistoryDetail = orderHistoryDetailArray[0];
      const userID = orderHistoryDetail?.order?.user?.userID;
      setUserID(userID);

      const flowerBatchesWithQuantity = orderHistoryDetail.flowerBatchesWithQuantity || [];
      const details = flowerBatchesWithQuantity.map(item => ({
        flowerID: item.flowerBatch.flowerID,
        flowerName: item.flowerBatch.flowerName,
        quantity: item.flowerBatch.quantity,
        price: item.flowerBatch.price,
        flowerType: item.flowerBatch.category.flowerType,
        rating: 5,
        deliveryRating: 5,
        comment: "",
      }));
      setFlowerDetails(details);
    }
  }, []);

  // Fetch and set image for each flower
  useEffect(() => {
    flowerDetails.forEach((flower) => {
      fetchImage(flower.flowerID);
    });
  }, [flowerDetails]);

  const fetchImage = async (flowerID) => {
    try {
      const response = await axios.get(`http://localhost:8080/identity/flowerImg/batch/${flowerID}/image`, {
        responseType: 'blob',
      });
      const imageUrl = URL.createObjectURL(response.data);
      setImageUrls((prev) => ({ ...prev, [flowerID]: imageUrl }));
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedReviews = [...flowerDetails];
    updatedReviews[index][field] = value;
    setFlowerDetails(updatedReviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!userID) {
      setError("User ID is required.");
      return;
    }

    const reviewsData = flowerDetails.map((flower) => ({
      userID,
      flowerID: flower.flowerID,
      rating: flower.rating,
      deliveryRating: flower.deliveryRating,
      comment: flower.comment,
    }));

    try {
      const response = await axios.post("http://localhost:8080/identity/reviews/", reviewsData);
      setSuccessMessage("Cảm ơn bạn đã đánh giá!");

      // Clear flower details after successful submission
      setFlowerDetails(flowerDetails.map(flower => ({
        ...flower,
        rating: 5,
        deliveryRating: 5,
        comment: ""
      })));

      // Handle the successful response, if necessary
      const createdReviews = response.data.result; // Adjust based on your actual response structure
      setReviews(createdReviews);

      console.log("Reviews created successfully:", response.data);
    } catch (err) {
      setError("Gửi đánh giá thất bại. Vui lòng thử lại sau.");
      console.error(err);
    }
  };

  return (
    <div className="review-page">
      <h2>Đánh Giá Sản Phẩm</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="product-details">
        <h3>Thông Tin Sản Phẩm Đã Mua:</h3>
        <table>
          <thead>
            <tr>
              <th>Ảnh hoa</th>
              <th>Tên hoa</th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>Loại hoa</th>
              <th>Đánh Giá Hoa</th>
              <th>Đánh Giá Giao Hàng</th>
              <th>Bình Luận</th>
            </tr>
          </thead>
          <tbody>
            {flowerDetails.map((flower, index) => (
              <tr key={flower.flowerID}>
                <td>
                  {imageUrls[flower.flowerID] ? (
                    <img src={imageUrls[flower.flowerID]} alt={flower.flowerName} className="flower-image" />
                  ) : (
                    "Loading..."
                  )}
                </td>
                <td>{flower.flowerName}</td>
                <td>{flower.quantity}</td>
                <td>{flower.price} VND</td>
                <td>{flower.flowerType}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={flower.rating}
                    onChange={(e) => handleInputChange(index, "rating", Number(e.target.value))}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={flower.deliveryRating}
                    onChange={(e) => handleInputChange(index, "deliveryRating", Number(e.target.value))}
                  />
                </td>
                <td>
                  <textarea
                    value={flower.comment}
                    onChange={(e) => handleInputChange(index, "comment", e.target.value)}
                    placeholder="Viết đánh giá của bạn ở đây..."
                  ></textarea>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handleSubmit}>Gửi Đánh Giá</button>

      {/* Display created reviews if needed */}
      {reviews.length > 0 && (
        <div className="created-reviews">
          <h3>Đánh Giá Đã Tạo:</h3>
          <ul>
            {reviews.map(review => (
              <li key={review.reviewID}>
                <p><strong>{review.user.username}:</strong> {review.comment} (Đánh giá: {review.rating}⭐)</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;
