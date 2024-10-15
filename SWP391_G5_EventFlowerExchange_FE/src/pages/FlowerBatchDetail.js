import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Để lấy ID từ URL
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
  const { id } = useParams(); // Lấy ID từ URL
  const [post, setPost] = useState(null); // Dữ liệu bài viết
  const [currentImage, setCurrentImage] = useState(f2); // State for the large image
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  const thumbnails = [f1, f2, f3, f4]; // Array of small images

  useEffect(() => {
    fetchPost();  
  }, [id]);

  // Gọi API để lấy dữ liệu bài viết theo ID
  const fetchPost = async () => {
    try {
      const response = await axios.get('http://localhost:8080/identity/post/');
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post: ", error);
    }
  };

  // const fetchFloweDetail = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8080/identity/post/');
  //     setPost(response.data);
  //   } catch (error) {
  //     console.error("Error fetching post: ", error);
  //   }
  // };

  const handleThumbnailClick = (image) => {
    setCurrentImage(image); // Change the large image when thumbnail is clicked
  };

  useEffect(() => {
    // Giả lập trạng thái tải dữ liệu
    const timer = setTimeout(() => {
      setLoading(false); // Sau 2 giây, sẽ dừng hiển thị loading
    }, 2000); // Bạn có thể thay đổi thời gian này theo yêu cầu

    // Cleanup timer nếu component bị unmount
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Đang tải dữ liệu...</p>
      </div>
    );
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
                className={`thumbnail ${currentImage === thumb ? "active" : ""}`} // Highlight the active thumbnail
              />
            ))}
          </div>
        </div>

        <div className="right-detail-flowerbatch">
          <h2>{post.title}</h2>
          <p className="flower-description">
            Đang khuyến mãi chỉ 50k một bó gồm 9 đến 10 cành. Mua từ 3 bó trở lên sẽ được giảm giá thêm.
          </p>
          <p>Giá: <span className="price">{post.price}₫</span></p>
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

          <div className="stock-availability">
            <p>Tình trạng: <span className="in-stock">Còn hàng</span></p>
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
      <Footer/>
    </div>
  );
}

export default FlowerBatchDetail;
