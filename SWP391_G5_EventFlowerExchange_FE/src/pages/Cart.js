import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';
import Footer from '../components/Footer';
import '../styles/popup.css';
const Cart = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // Điều khiển hiển thị pop-up
  const [popupMessage, setPopupMessage] = useState(''); // Thông điệp hiển thị trong pop-up
  const [successMessage, setSuccessMessage] = useState('');
  // Handle changing the quantity of an item
  const handleQuantityChange = async (id, delta) => {
    const updatedItems = cartItems.map((item) =>
      item.flowerID === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );

    // Save updated cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  // Handle deleting an item from the cart
  const handleDelete = (id) => {
    const updatedItems = cartItems.filter((item) => item.flowerID !== id);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    setCartItems(updatedItems);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Navigate to the Checkout page with the cart items
  const handlePurchase = () => {
    const user = JSON.parse(localStorage.getItem('user')); // Retrieve the user from localStorage

    if (!user) {
      // If the user is not logged in, redirect to the login page
      // alert('Bạn cần đăng nhập để tiếp tục!');

      setPopupMessage("Bạn cần đăng nhập để tiếp tục!");
      setShowPopup(true); // Hiển thị pop-up
      // navigate('/login');
    } else if (cartItems.length === 0) {
      // alert('Giỏ hàng trống, vui lòng thêm sản phẩm!');
      setSuccessMessage("Giỏ hàng trống, vui lòng thêm sản phẩm !")
    } else {
      // User is logged in, proceed to checkout
      navigate('/checkout', { state: { cartItems, totalPrice } });
      setCartItems([]);
    }
  };

  const [loading, setLoading] = useState(true); // Thêm trạng thái loading
  // Loading trang
  useEffect(() => {
    // Giả lập trạng thái tải dữ liệu
    const timer = setTimeout(() => {
      setLoading(false); // Sau 2 giây, sẽ dừng hiển thị loading
    }, 2000);

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
    <div className="cart">
      <div className="cart-header">
        <h2>Giỏ Hàng</h2>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.flowerID}>
            <img src={item.imageUrl || 'default-image-url'} alt="Product" />
            <div className="item-info">
              <h3>{item.flowerName}</h3>
            </div>
            <div className="item-price">
              <span>{item.price}VNĐ</span>
            </div>
            <div className="item-quantity">
              <button onClick={() => handleQuantityChange(item.flowerID, -1)}>-</button>
              <input type="number" value={item.quantity} readOnly />
              <button onClick={() => handleQuantityChange(item.flowerID, 1)}>+</button>
            </div>
            <button className="delete-button" onClick={() => handleDelete(item.flowerID)}>
              Xóa
            </button>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <p className='cart-title'>Tổng thanh toán ({cartItems.length} Sản phẩm): {totalPrice}₫</p>
        <button onClick={handlePurchase}>Mua Hàng</button>
        {successMessage && <p className="cart-message">{successMessage}</p>}
      </div>
      
      <Footer />

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <div className="popup-icon">❌</div>
            <h2>Thông báo</h2>
            <p className="popup-message">{popupMessage}</p>
            <button
              className="close-button-popup"
              onClick={() => {
                setShowPopup(false); // Close the popup
                navigate("/login")
                
              }}>
              Đóng
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Cart;
