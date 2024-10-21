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
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0); // State to track the current flower batch page
  const [categories, setCategories] = useState([]); // Store categories from API
  const [selectedCategory, setSelectedCategory] = useState(''); // Store the selected category
  const [cartMessage, setCartMessage] = useState(""); // Message for cart action feedback
  const thumbnails = [f1, f2, f3, f4]; // Array of small images

  useEffect(() => {
    if (id) {
      fetchPost(id); // Fetch post data based on the ID
    }
  }, [id]);

  // Fetch the post details by ID
  const fetchPost = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/identity/posts/${id}`);
      setPost(response.data); // Set the post data
      console.log(response.data);
    } catch (error) {
      setError("Lỗi khi lấy chi tiết lô hoa. Vui lòng thử lại.");
      console.error("Lỗi khi lấy chi tiết lô hoa: ", error);
    } finally {
      setLoading(false); // Stop the loading indicator
    }
  };

  // Fetch flower categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/identity/catetory/');
        setCategories(response.data); // Set the categories fetched from the API
        console.log(response.data); // Log to see the fetched categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleThumbnailClick = (image) => {
    setCurrentImage(image); // Change the large image when the thumbnail is clicked
  };

  // Handle navigation between flower batches
  const goToPreviousBatch = () => {
    setCurrentBatchIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const goToNextBatch = () => {
    setCurrentBatchIndex((prevIndex) =>
      post.flowerBatches && prevIndex < post.flowerBatches.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  // Handle category selection change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value); // Update selected category
  };

  const handleAddToCart = async (flowerID) => {
    try {
      const currentBatch = post.flowerBatches?.[currentBatchIndex];
  
      if (!currentBatch) {
        setCartMessage("Không có thông tin lô hoa để thêm vào giỏ hàng.");
        return;
      }
  
      const cartData = {
        total: currentBatch.price,
        products: [
          {
            quantity: 1,
            price: currentBatch.price,
            imageUrl: "http://example.com/image/roses.jpg",
            flowerName: currentBatch.flowerName,
            flowerID: currentBatch.flowerID,
          },
        ],
      };
  
      // Log the data you're sending
      console.log("Sending cart data:", cartData);
  
      const response = await axios.post(
        `http://localhost:8080/identity/cart/shoppingCart/addProduct/${flowerID}`, 
        cartData
      );
  
      // Log the server's response
      console.log("Server response:", response);
  
      setCartMessage("Sản phẩm đã được thêm vào giỏ hàng thành công!");
    } catch (error) {
      // Log the error details
      console.error("Error adding to cart:", error);
  
      if (error.response) {
        // Log the specific error response from the server
        console.error("Server responded with:", error.response.data);
      }
  
      setCartMessage("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng.");
    }
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

  const currentBatch = post.flowerBatches?.[currentBatchIndex]; // Get the current flower batch

  return (
    <div>
      {/* Flower Detail Section */}
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
                className={`thumbnail ${currentImage === thumb ? "active" : ""}`} // Highlight active thumbnail
              />
            ))}
          </div>
        </div>

        <div className="right-detail-flowerbatch">
          {/* Render the current flower batch */}
          {currentBatch ? (
            <div key={currentBatch.flowerID}>
              <h2>{currentBatch.flowerName}</h2>
              <p className="flower-description">{currentBatch.description}</p>
              <p>Giá: <span className="price">{currentBatch.price}₫</span></p>
              <p>Số lượng còn lại: <span className="quantity">{currentBatch.quantity}</span></p>
              <div className="stock-availability">
                <p>Tình trạng: <span className="in-stock">{currentBatch.status}</span></p>
              </div>
            </div>
          ) : (
            <p>Không có thông tin về lô hoa.</p>
          )}

          <div className="star-rating">
            <p>Đánh giá: <span className="stars">⭐⭐⭐⭐⭐</span></p>
          </div>

          {/* Flower Type Selection */}
          <div className="flower-type-selection">
            <label htmlFor="flowerType">Loại hoa:</label>
            <select id="flowerType" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">Chọn loại hoa</option>
              {categories.map((category) => (
                <option key={category.categoryID} value={category.flowerType}>
                  {category.flowerType}
                </option>
              ))}
            </select>
          </div>

          {/* Pagination controls for navigating between flower batches */}
          <div className="pagination-controls">
            <button onClick={goToPreviousBatch} disabled={currentBatchIndex === 0}>
              Trước
            </button>
            <span>
              Lô hoa {currentBatchIndex + 1} / {post.flowerBatches?.length || 0}
            </span>
            <button
              onClick={goToNextBatch}
              disabled={currentBatchIndex >= (post.flowerBatches?.length || 0) - 1}
            >
              Sau
            </button>
          </div>

          <div className="button-container-post-detail">
            <button className="buy-now-button-detail">Mua Ngay</button>
            <button className="add-cart-button-detail" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
          </div>

          {/* Cart message */}
          {cartMessage && <p className="cart-message">{cartMessage}</p>}

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
