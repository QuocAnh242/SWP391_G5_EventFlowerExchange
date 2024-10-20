import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Cart.css'; // Importing CSS styles
import Footer from '../components/Footer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items from the API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/identity/cart/shoppingCart');
        setCartItems(response.data.products); // Assuming 'products' is the array of cart items
        setLoading(false); // Stop loading
      } catch (error) {
        setError("Lỗi khi lấy giỏ hàng từ API.");
        setLoading(false);
      }
    };
    
    fetchCartItems();
  }, []);

  // Handle changing the quantity of an item
  const handleQuantityChange = async (id, delta) => {
    const updatedItems = cartItems.map((item) => 
      item.flowerID === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCartItems(updatedItems);

    // Update the cart item quantity in the backend
    try {
      const updatedItem = updatedItems.find(item => item.flowerID === id);
      await axios.put(`http://localhost:8080/identity/cart/shoppingCart/updateProduct/${id}`, {
        flowerID: id,
        quantity: updatedItem.quantity,
      });
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  // Handle deleting an item from the cart
  const handleDelete = async (id) => {
    setCartItems((items) => items.filter((item) => item.flowerID !== id));

    // Make a DELETE request to remove the item from the backend cart
    try {
      await axios.delete(`http://localhost:8080/identity/cart/shoppingCart/removeProduct/${id}`);
    } catch (error) {
      console.error('Error removing cart item:', error);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.discountedPrice * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

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
          <div className="cart-item" key={item.flowerID}>
            <input type="checkbox" />
            <img src={item.imageUrl} alt="Product" />
            <div className="item-info">
              <h3>{item.flowerName}</h3>
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
