import React, { useState, useEffect } from "react";
import { MenuList } from "../helpers/MenuList"; // Import danh sách các loại hoa
import "../styles/Menu.css";

function Menu() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập trạng thái tải dữ liệu
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

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
    <div className="shop-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h3 className="sidebar-title">Categories</h3>
        <ul className="category-list">
          <li>Hoa tươi</li>
          <li>Hoa khô</li>
          <li>Hoa chúc mừng</li>
          <li>Hoa cưới</li>
          <li>Hoa sinh nhật</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar with Filters */}
        <div className="topbar">
          <div className="categories">Tất cả Hoa</div>
          <div className="dropdown">
            <button className="dropbtn">Featured</button>
          </div>
        </div>

        {/* Post Grid */}
        <div className="post-grid">
          {MenuList.map((item, index) => (
            <div className="post-card" key={index}>
              <div className="post-image-container">
                <img src={item.image} alt={item.name} className="post-image" />
              </div>
              <div className="post-info">
                <h4>{item.name}</h4>
                <p>M/L/XL</p>
                <div className="rating">⭐⭐⭐⭐⭐</div>
                <div className="price">${item.price}</div>
                <div className="action-buttons">
                  <button className="action-button">❤️</button>
                  <button className="action-button">👁️</button>
                  <button className="action-button">🛒</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
        </div>
      </div>
    </div>
  );
}

export default Menu;
