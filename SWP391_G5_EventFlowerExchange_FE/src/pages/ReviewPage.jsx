import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ReviewPage.css";
import Footer from "../components/Footer";

function ReviewPage() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [userID, setUserID] = useState(null);
  const [flowerDetails, setFlowerDetails] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

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

    const requestData = {
      userID,
      flowerReviews: flowerDetails.map((flower) => ({
        flowerID: flower.flowerID,
        rating: flower.rating,
        comment: flower.comment,
        deliveryRating: flower.deliveryRating,
      })),
    };

    try {
      const response = await axios.post("http://localhost:8080/identity/reviews/", requestData);
      setSuccessMessage("Cảm ơn bạn đã đánh giá!");

      setFlowerDetails(flowerDetails.map(flower => ({
        ...flower,
        rating: 5,
        deliveryRating: 5,
        comment: ""
      })));

      const createdReviews = response.data.result;
      setReviews(createdReviews);
      console.log("Reviews created successfully:", response.data);
    } catch (err) {
      setError("Gửi đánh giá thất bại. Vui lòng thử lại sau.");
      console.error(err);
    }
  };

  return (
    <div className="review-page-container">
      <h2 className="review-title">Đánh Giá Sản Phẩm</h2>
      {successMessage && <p className="review-page-success">{successMessage}</p>}
      {error && <p className="review-page-error">{error}</p>}

      <div className="review-product-details">
        <h3>Thông Tin Sản Phẩm Đã Mua</h3>
        <table className="review-table">
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
              <tr key={flower.flowerID} className="review-row">
                <td>
                  {imageUrls[flower.flowerID] ? (
                    <img src={imageUrls[flower.flowerID]} alt={flower.flowerName} className="review-flower-image" />
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
                    className="review-rating-input"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={flower.deliveryRating}
                    onChange={(e) => handleInputChange(index, "deliveryRating", Number(e.target.value))}
                    className="review-delivery-rating-input"
                  />
                </td>
                <td>
                  <textarea
                    value={flower.comment}
                    onChange={(e) => handleInputChange(index, "comment", e.target.value)}
                    placeholder="Viết đánh giá của bạn ở đây..."
                    className="review-comment-input"
                  ></textarea>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handleSubmit} className="review-submit-button">Gửi Đánh Giá</button>
      <Footer/>
    </div>
  );
}

export default ReviewPage;
