import React, {useState,useEffect} from "react";
import { FaSeedling, FaStore, FaHandHoldingHeart, FaLeaf } from 'react-icons/fa';
import '../styles/About.css';  // This assumes the file is located in `src/styles/`

const About = () => {
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
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
    <div className="about">
      <div className="about-header">
        <h1>About Us</h1>
        <p>
          Welcome to **Flower Haven**, your online destination for purchasing beautiful real flowers from the best local florists and growers.
        </p>
      </div>

      <div className="about-section">
        <div className="about-card">
          <FaStore className="about-icon" />
          <h2>Our Marketplace</h2>
          <p>
            Flower Haven is a trusted platform for sellers to list and sell a wide variety of flowers, from roses to exotic arrangements. Our mission is to connect flower lovers with talented florists who craft the most beautiful arrangements.
          </p>
        </div>

        <div className="about-card">
          <FaSeedling className="about-icon" />
          <h2>For Sellers</h2>
          <p>
            Become a seller and showcase your floral artistry! List your products with beautiful images, detailed descriptions, and prices. Reach customers nationwide and grow your flower business with ease.
          </p>
        </div>

        <div className="about-card">
          <FaHandHoldingHeart className="about-icon" />
          <h2>For Buyers</h2>
          <p>
            Whether you're looking for a simple bouquet or a large custom arrangement, you’ll find the perfect flowers for any occasion. Support local businesses by buying from nearby sellers, or explore exotic flowers from around the world.
          </p>
        </div>

        <div className="about-card">
          <FaLeaf className="about-icon" />
          <h2>Our Vision</h2>
          <p>
            We believe flowers are more than just a product — they bring joy, beauty, and emotions. Our goal is to make these moments accessible to everyone, by creating a seamless online experience for buyers and sellers alike.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
