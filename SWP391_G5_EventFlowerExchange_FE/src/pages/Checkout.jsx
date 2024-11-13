import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import Axios để gọi API
import '../styles/Checkout.css'; // Importing CSS styles
import Footer from '../components/Footer';

const Checkout = () => {
  const location = useLocation();
  const { cartItems,setCartItems, totalPrice } = location.state || { cartItems: [], setCartItems:[], totalPrice: 0 };
  const user = JSON.parse(localStorage.getItem('user')); // Lấy thông tin người dùng từ localStorage
  
  // State để lưu phương thức thanh toán đã chọn
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Xử lý khi chọn phương thức thanh toán
  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Xử lý khi nhấn nút thanh toán
  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán');
      return;
    }
  // Tạo orderDetails từ cartItems
  const orderDetails = cartItems.map(item => ({
    flowerID: item.flowerID,  // Flower ID
    quantity: item.quantity,
    price: item.price,
  }));
  const order = {
    orderDate: new Date().toISOString(),
    totalPrice: totalPrice,
    shippingAddress: user?.address || 'Địa chỉ mặc định',
    user: {
      userID: user?.userID,
    },
    delivery: {
      deliveryDate: new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 ngày sau
      rating: 4, // Có thể thay đổi theo logic của bạn
      availableStatus: 'available',
    },
    payment: {
      paymentID: paymentMethod === 'vnpay' ? 1 : 2,
    },
    orderDetails: orderDetails,
  };

  console.log(order); // Log order để kiểm tra cấu trúc

    try {
      const response = await axios.post('http://localhost:8080/identity/orders/create', order);
      console.log(response.data); // Log toàn bộ phản hồi từ backend
      if (response.status === 200 || response.status === 201) {
        const { code, message, result } = response.data; // Lấy mã và thông báo từ phản hồi
  
        if (paymentMethod === 'vnpay') {
          const vnpUrl = message.split('VNPay URL: ')[1]; // Lấy URL VNPay từ message
          window.location.href = vnpUrl; // Chuyển hướng đến VNPay URL
        } else {
          alert('Đơn hàng đã được tạo thành công. Phương thức thanh toán: ' + paymentMethod);
          
          // Xóa giỏ hàng sau khi thanh toán thành công
          localStorage.removeItem('cartItems'); // Xóa giỏ hàng khỏi localStorage
          setCartItems([]); // Cập nhật state để làm trống giỏ hàng trong UI
        }
      }
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau.');
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
    <div className="checkout">
      <div className="checkout-header">
        <h2>Xác Nhận Đơn Hàng</h2>
      </div>

      <div className="checkout-content">
        {/* Cột bên trái - Tóm tắt đơn hàng */}
        <div className="order-summary">
          <h3>Tóm Tắt Đơn Hàng</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="order-item" key={item.flowerID}>
                <span>{item.flowerName}</span>
                <span>{item.quantity} x {item.price}₫</span>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm trong giỏ hàng</p>
          )}
          <div className="total-price">
            <strong>Tổng cộng: {totalPrice}₫</strong>
          </div>
        </div>

        {/* Cột bên phải - Thông tin người dùng */}
        <div className="user-info">
          <h3>Thông Tin Người Dùng</h3>
          <div className="user-details">
            <p><strong>Họ và tên:</strong> {user?.username || 'N/A'}</p>
            <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
            <p><strong>Số điện thoại:</strong> {user?.phoneNumber || 'N/A'}</p>
            <p><strong>Địa chỉ:</strong> {user?.address || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Phần chọn phương thức thanh toán */}
      <div className="payment-method">
        <h3>Phương Thức Thanh Toán</h3>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              value="momo"
              checked={paymentMethod === 'momo'}
              onChange={handlePaymentChange}
            />
            Thanh toán bằng MoMo
          </label>
          <label>
            <input
              type="radio"
              value="vnpay"
              checked={paymentMethod === 'vnpay'}
              onChange={handlePaymentChange}
            />
            Thanh toán bằng VNPay
          </label>
          <label>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={handlePaymentChange}
            />
            Thanh toán khi nhận hàng (COD)
          </label>
        </div>
        <button className="checkout-btn" onClick={handleCheckout}>
          Xác Nhận Thanh Toán
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
