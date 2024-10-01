import React, { useState } from "react";
import { MenuList } from "../helpers/MenuList"; // Import danh sách các loại hoa
import "../styles/Menu.css";
import Footer from '../components/Footer';
import ImageProduct from '../assets/about-img/a7.jpg'

function Menu() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [recentlyViewed, setRecentlyViewed] = useState([]); // Lưu trữ bài post đã xem
  const [category, setCategory] = useState("Tất cả hoa"); // Lưu loại hoa hiện tại

  const handlePostClick = (post) => {
    setSelectedPost(post);
    // Cập nhật danh sách bài post đã xem gần đây
    setRecentlyViewed((prev) => {
      if (prev.some((p) => p.name === post.name)) return prev; // Nếu đã có thì không thêm nữa
      return [post, ...prev].slice(0, 5); // Giới hạn số bài đã xem là 5
    });
  };

  const handleBackClick = () => {
    setSelectedPost(null); // Quay lại danh sách
  };

  const handleCategoryClick = (category) => {
    setCategory(category); // Thay đổi danh mục hoa
  };

  const filteredMenuList = MenuList.filter((item) =>
    category === "Tất cả hoa" ? true : item.category === category
  );

  if (selectedPost) {
    return (
      <div className="post-detail-container">
        <button onClick={handleBackClick} className="back-button">
          ← Quay lại
        </button>
        <div className="post-detail">
          <h2>{selectedPost.name}</h2>
          <img
            src={selectedPost.image}
            alt={selectedPost.name}
            className="post-detail-image"
          />
          <p>{selectedPost.description}</p>
          <p>
            Giá khuyến mãi:{" "}
            <span className="price">{selectedPost.discountPrice}₫</span>{" "}
            (Giá gốc: <s>{selectedPost.price}₫</s>)
          </p>
          <button className="buy-now-button">Mua Ngay</button>
        </div>

        {/* Bài viết đã xem gần đây */}
        <div className="recently-viewed">
          <h3>Bài viết đã xem gần đây</h3>
          <div className="post-grid">
            {recentlyViewed.map((item, index) => (
              <div
                className="post-card"
                key={index}
                onClick={() => handlePostClick(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="post-card-image"
                />
                <h3>{item.name}</h3>
                <p className="discount-price">Giá: {item.discountPrice}₫</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-container">
      {/* Thanh tùy chọn bên trái */}
      <div className="sidebar">
        <h3 className="sidebar-title">Loại hoa</h3>
        <ul className="category-list">
          <li onClick={() => handleCategoryClick("Tất cả hoa")}>Tất cả hoa</li>
          <li onClick={() => handleCategoryClick("Hoa cưới")}>Hoa cưới</li>
          <li onClick={() => handleCategoryClick("Hoa sinh nhật")}>
            Hoa sinh nhật
          </li>
          <li onClick={() => handleCategoryClick("Hoa chúc mừng")}>
            Hoa chúc mừng
          </li>
          <li onClick={() => handleCategoryClick("Hoa khô")}>Hoa khô</li>
        </ul>
      </div>

      {/* Nội dung chính */}
      <div className="main-content">
        <h1 className="shop-title">Cửa hàng hoa - {category}</h1>
        <div className="post-grid">
          {filteredMenuList.map((item, index) => (
            <div
              className="post-card"
              key={index}
              onClick={() => handlePostClick(item)}
            >
              <img
                /*src={item.image}*/
                src={ImageProduct}
                alt={item.name}
                className="post-card-image"
              />
              <h3>{item.name}</h3>
              <p className="discount-price">Giá: {item.discountPrice}₫</p>
              <p className="feature-content">#Rẻ_Sock chỉ #39k/1 bó 9-10c chùm áp dụng mua từ 2 bó
                                             Lẻ bó #45k
                                             Hồng chùm cam rực rỡ tưng bừng tươi lâu
                                            Màu trendy rất hợp không khí mùa thu
                                           🍂Giá siêu tốt nhất trước tới giờ
                                            Shop nhận đơn trả trong ngày
                                            Mời Anh Chị mua hoa</p>
              <p className="feature-detail">Xem chi tiết</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bài viết đã xem gần đây */}
      {/* {recentlyViewed.length > 0 && (
        <div className="recently-viewed">
          <h3>Bài viết đã xem gần đây</h3>
          <div className="post-grid">
            {recentlyViewed.map((item, index) => (
              <div
                className="post-card"
                key={index}
                onClick={() => handlePostClick(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="post-card-image"
                />
                <h3>{item.name}</h3>
                <p className="discount-price">Giá: {item.discountPrice}₫</p>
              </div>
            ))}
          </div>
        </div>
      )} */}
      <div className="footer"><Footer /></div>
    </div>
    
  );
}

export default Menu;
