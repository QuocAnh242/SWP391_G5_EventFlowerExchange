import React, { useState, useEffect } from 'react';
import '../styles/Cart.css'; // Importing CSS styles
import Footer from '../components/Footer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Hoa trang trí lễ cưới...',
      image: 'path_to_image', // replace with the actual path to image
      classification: 'Hoa trang trí',
      originalPrice: 423000,
      discountedPrice: 114000,
      quantity: 1 ,
    },
    // Add more items if needed
  ])
  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  ;
  useEffect(() => {
    // Giả lập trạng thái tải dữ liệu
    const timer = setTimeout(() => {
      setLoading(false); // Sau 2 giây, sẽ dừng hiển thị loading
    }, 2000); // Bạn có thể thay đổi thời gian này theo yêu cầu

    // Cleanup timer nếu component bị unmount
    return () => clearTimeout(timer);
  }, []);
  const handleQuantityChange = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };
  if (loading) {
    return (
      <div className="loading-container">
  <div className="spinner"></div>
  <p className="loading-text">Đang tải dữ liệu...</p>
</div>

    );
  }
  const handleDelete = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );


  return (
    <div className="cart">
      {/* Cart Header */}
      <div className="cart-header">
        <h2>Giỏ Hàng</h2>
        <div className="search-bar">
          <input type="text" placeholder="QUÀ MỌI ĐƠN 1.000.000Đ" />
          <button>Search</button>
        </div>
      </div>

      {/* Cart Items */}
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <input type="checkbox" />
            <img src={item.image} alt="Product" />
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>Phân Loại Hàng: {item.classification}</p>
            </div>
            <div className="item-price">
              <span className="original-price">
                {item.originalPrice.toLocaleString()}₫
              </span>
              <span className="discounted-price">
                {item.discountedPrice.toLocaleString()}₫
              </span>
            </div>
            <div className="item-quantity">
              <button onClick={() => handleQuantityChange(item.id, -1)}>-</button>
              <input type="number" value={item.quantity} readOnly />
              <button onClick={() => handleQuantityChange(item.id, 1)}>+</button>
            </div>
            <button className="delete-button" onClick={() => handleDelete(item.id)}>
              Xóa
            </button>
          </div>
        ))}
      </div>

      {/* Voucher Section */}
      <div className="voucher-section">
        <p>Voucher giảm đến 12k <a href="#">Xem thêm voucher</a></p>
      </div>

      {/* Cart Footer */}
      <div className="cart-footer">
        <p>Tổng thanh toán ({cartItems.length} Sản phẩm): {totalPrice.toLocaleString()}₫</p>
        <button>Mua Hàng</button>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
