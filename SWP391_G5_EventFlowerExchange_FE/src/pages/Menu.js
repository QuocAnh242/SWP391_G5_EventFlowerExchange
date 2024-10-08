import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Thêm useNavigate để điều hướng
import "../styles/Menu.css";
import Footer from '../components/Footer';
import a2 from '../assets/about-img/a5.jpg'; // Sample image

function Menu() {
  const [flowerList, setFlowerList] = useState([]); // Danh sách hoa từ API
  const [category, setCategory] = useState("Tất cả hoa"); // Danh mục hiện tại
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading

  // Gọi API khi component được load lần đầu
  useEffect(() => {
    fetchFlowerList();
  }, []);

  // Hàm lấy dữ liệu từ Spring Boot API
  const fetchFlowerList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/identity/post/");
      setFlowerList(response.data); // Lưu dữ liệu hoa vào state
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Hàm xử lý khi nhấn vào một bài viết
  const handlePostClick = (id) => {
    navigate(`/flower/${id}`); // Điều hướng sang trang chi tiết với ID
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Mô phỏng việc tải dữ liệu
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
    <div className="shop-container">
      {/* Sidebar với danh sách các loại hoa */}
      <div className="sidebar-post-exchange">
        <h3 className="sidebar-title">Danh mục hoa</h3>
        <hr className="sidebar-divider" />
        <ul className="category-list">
          <li onClick={() => setCategory("Tất cả hoa")}>Tất cả hoa</li>
          <li onClick={() => setCategory("Hoa cưới")}>Hoa cưới</li>
          <li onClick={() => setCategory("Hoa sinh nhật")}>Hoa sinh nhật</li>
          <li onClick={() => setCategory("Hoa chúc mừng")}>Hoa chúc mừng</li>
          <li onClick={() => setCategory("Hoa khô")}>Hoa khô</li>
        </ul>
      </div>

      {/* Nội dung chính */}
      <div className="main-content">
        <h1 className="shop-title">Cửa hàng hoa - {category}</h1>
        <div className="post-grid">
          {flowerList.map((item, index) => (
            <div className="post-card" key={index} onClick={() => handlePostClick(item.id)}>
              <img src={a2} alt={item.title} className="post-card-image" />
              <h3>{item.title}</h3>
              <p className="discount-price">Giá: {item.price}₫</p>
              <p className="feature-content">{item.description}</p>
              <p className="feature-detail">Xem chi tiết</p>
            </div>
          ))}
        </div>
      </div>

     

      <Footer />
    </div>
  );
}

export default Menu;
