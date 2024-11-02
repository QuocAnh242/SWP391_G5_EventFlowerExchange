import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";
import "../styles/FlowerBatchDetail.css";
import f1 from '../assets/flower-detail/f1.jpg';
import f2 from '../assets/flower-detail/f2.jpg';
import f3 from '../assets/flower-detail/f3.jpg';
import f4 from '../assets/flower-detail/f4.jpg';
import FeedbackList from '../components/flowdetailcomponents/FeedbackList.jsx';
import RelatedPosts from '../components/flowdetailcomponents/RelatedPosts.jsx';
import Footer from '../components/Footer.jsx';
import '../styles/popup.css';
import Navbar from "../components/Navbar.jsx";


function FlowerBatchDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [currentImage, setCurrentImage] = useState(f2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const thumbnails = [f1, f2, f3, f4];
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchPost = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/identity/posts/${id}`);
      setPost(response.data);
      console.log(response.data);
    } catch (error) {
      setError("Lỗi khi lấy chi tiết lô hoa. Vui lòng thử lại.");
      console.error("Lỗi khi lấy chi tiết lô hoa: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailClick = (image) => {
    setCurrentImage(image);
  };

  const goToPreviousBatch = () => {
    setCurrentBatchIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const goToNextBatch = () => {
    setCurrentBatchIndex((prevIndex) =>
      post.flowerBatches && prevIndex < post.flowerBatches.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleAddToCart = (currentBatch) => {
    if (!currentBatch) return;

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find(item => item.flowerID === currentBatch.flowerID);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        flowerID: currentBatch.flowerID,
        flowerName: currentBatch.flowerName,
        price: currentBatch.price,
        quantity: 1
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    setPopupMessage("Sản phẩm đã được thêm vào giỏ hàng!");
    setShowPopup(true);
  };

  const handleAddAllEventFlowersToCart = () => {
    if (!post || !post.flowerBatches) return;

    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    post.flowerBatches.forEach((batch) => {
      if (batch.category?.eventName) {
        const existingItem = cartItems.find(item => item.flowerID === batch.flowerID);

        if (existingItem) {
          existingItem.quantity += batch.quantity; // Add the full quantity available
        } else {
          cartItems.push({
            flowerID: batch.flowerID,
            flowerName: batch.flowerName,
            price: batch.price,
            quantity: batch.quantity // Set the initial quantity to the full available quantity
          });
        }
      }
    });

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    setPopupMessage("Tất cả các hoa trong sự kiện và số lượng tối đa của chúng đã được thêm vào giỏ hàng!");
    setShowPopup(true);
  };


  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!post) {
    return <div className="error-message">Không tìm thấy bài viết.</div>;
  }

  const currentBatch = post.flowerBatches?.[currentBatchIndex];

  return (
    <div>
    {/* <Navbar/> */}
      <div className="breadcrumb-flower-detail">
        <Link to="/" className="home-link-breadcrumb-flower">Trang chủ</Link>
        <span> / </span>
        <Link to="/menu" className="home-link-breadcrumb-flower">Bài viết</Link>
        <span> / Chi tiết hoa trong bài post </span>
      </div>

      <div className="flower-detail-container">
        <div className="left-detail-flowerbatch">
          <img src={currentImage} alt={currentBatch?.flowerName || 'Flower'} className="image" />
          <div className="bottom-img">
            {thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(thumb)}
                className={`thumbnail ${currentImage === thumb ? "active" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="right-detail-flowerbatch">
          {currentBatch ? (
            <div key={currentBatch.flowerID}>
              <h2>{currentBatch.flowerName}</h2>
              <p className="flower-description">{currentBatch.description}</p>
              <p><strong>Giá:</strong> <span className="price">{currentBatch.price.toLocaleString()} VNĐ</span></p>
              <p><strong>Số lượng còn lại:</strong> <span className="quantity">{currentBatch.quantity} bó</span></p>
              <p><strong>Sự kiện:</strong> <span className="event-name">{currentBatch.category?.eventName || "Không có sự kiện"}</span></p>
              <div className="stock-availability">
                <p><strong>Tình trạng:</strong> <span className="in-stock">{currentBatch.status}</span></p>
              </div>
            </div>
          ) : (
            <p>Không có thông tin về lô hoa.</p>
          )}

          <div className="star-rating">
            <p><strong>Đánh giá: </strong><span className="stars">⭐⭐⭐⭐⭐</span></p>
          </div>

          <div className="pagination-controls">
            <button onClick={goToPreviousBatch} disabled={currentBatchIndex === 0}>Trước</button>
            <span>Lô hoa {currentBatchIndex + 1} / {post.flowerBatches?.length || 0}</span>
            <button onClick={goToNextBatch} disabled={currentBatchIndex >= (post.flowerBatches?.length || 0) - 1}>Sau</button>
          </div>

          <div className="button-container-post-detail" >
            <button className="add-cart-button-detail" onClick={() => handleAddToCart(currentBatch)}>Thêm vào giỏ hàng</button>
            <button className="buy-all-event-flowers-button" onClick={handleAddAllEventFlowersToCart}>
              Thêm tất cả các hoa trong sự kiện
            </button>
          </div>
        </div>
      </div>

      <div className="feedback-section">
        <FeedbackList productId={id} />
      </div>

      <div className="related-posts-section">
        <RelatedPosts currentProductId={id} />
      </div>

      <Footer />

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-icon">✅</div>
            <h2>Thông báo</h2>
            <p className="popup-message">{popupMessage}</p>
            <button
              className="close-button-popup"
              onClick={() => {
                setShowPopup(false); // Close the popup
                window.location.reload();
              }}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FlowerBatchDetail;
