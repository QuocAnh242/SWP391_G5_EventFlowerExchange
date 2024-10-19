import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get ID from URL
import axios from "axios";
import "../styles/FlowerBatchDetail.css";
import f1 from '../assets/flower-detail/f1.jpg';
import f2 from '../assets/flower-detail/f2.jpg';
import f3 from '../assets/flower-detail/f3.jpg';
import f4 from '../assets/flower-detail/f4.jpg';
import FeedbackList from '../components/flowdetailcomponents/FeedbackList.js';
import RelatedPosts from '../components/flowdetailcomponents/RelatedPosts.js';
import Footer from '../components/Footer';

function FlowerBatchDetail() {
  const { id } = useParams(); // Get the ID from the URL
  const [post, setPost] = useState(null); // Data of the post
  const [currentImage, setCurrentImage] = useState(f2); // State for the large image
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling

  const thumbnails = [f1, f2, f3, f4]; // Array of small images

  useEffect(() => {
    if (id) {
      fetchPost(id); // Truyền id khi gọi hàm fetchPost
    }
  }, [id]);
  console.log(id);  // Log the id to check if it's correct

  
  // Hàm fetchPost nhận id và gọi API chính xác
  const fetchPost = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/identity/posts/${id}`);
      // const response = await axios.get(`http://localhost:8080/identity/posts/3`);
      setPost(response.data); // Lưu dữ liệu nhận được vào state
    } catch (error) {
      setError("Lỗi khi lấy chi tiết lô hoa. Vui lòng thử lại.");
      console.error("Lỗi khi lấy chi tiết lô hoa: ", error);
    } finally {
      setLoading(false); // Tắt trạng thái loading sau khi nhận dữ liệu
    }
  };
  
  

  const handleThumbnailClick = (image) => {
    setCurrentImage(image); // Change the large image when the thumbnail is clicked
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div> {/* Ensure spinner CSS is correctly defined */}
        <p className="loading-text">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!post) {
    return <div className="error-message">Không tìm thấy bài viết.</div>;
  }

  return (
    <div>
      {/* Flower Detail Section */}
      <div className="flower-detail-container">
        <div className="left-detail-flowerbatch">
          <img src={currentImage} alt={post.title} className="image" />
          <div className="bottom-img">
            {thumbnails.map((thumb, index) => (
              <img
                key={index}
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(thumb)}
                className={`thumbnail ${currentImage === thumb ? "active" : ""}`} // Highlight active thumbnail
              />
            ))}
          </div>
        </div>

        <div className="right-detail-flowerbatch">
          {/* Check if flowerBatches exist before mapping */}
          {post.flowerBatches?.length > 0 ? (
            post.flowerBatches.map((flowerBatch) => (
              <div key={flowerBatch.flowerID}>
                <h2>{flowerBatch.flowerName}</h2>
                <p className="flower-description">{flowerBatch.description}</p>
                <p>Giá: <span className="price">{flowerBatch.price}₫</span></p>
                <div className="stock-availability">
                  <p>Tình trạng: <span className="in-stock">{flowerBatch.status}</span></p>
                </div>
              </div>
            ))
          ) : (
            <p>Không có thông tin về lô hoa.</p>
          )}

          <div className="star-rating">
            <p>Đánh giá: <span className="stars">⭐⭐⭐⭐⭐</span></p>
          </div>

          <div className="flower-type-selection">
            <label htmlFor="flowerType">Chọn loại hoa:</label>
            <select id="flowerType">
              <option value="hoa_hong">Hoa Hồng</option>
              <option value="hoa_cam_tu_cau">Hoa Cẩm Tú Cầu</option>
              <option value="hoa_lan">Hoa Lan</option>
              <option value="hoa_cuc">Hoa Cúc</option>
            </select>
          </div>

          <div className="button-container">
            <button className="buy-now-button">Mua Ngay</button>
            <button className="add-cart-button">Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="feedback-section">
        <FeedbackList productId={id} />
      </div>

      {/* Related Posts Section */}
      <div className="related-posts-section">
        <RelatedPosts currentProductId={id} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default FlowerBatchDetail;