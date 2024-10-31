import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Checkout.css';
import Footer from '../components/Footer';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, setCartItems, totalPrice } = location.state || { cartItems: [], setCartItems: () => { }, totalPrice: 0 };
  const user = JSON.parse(localStorage.getItem('user'));
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(true);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirmCheckout = async () => {
    setConfirmModalVisible(false);
    await handleCheckout(); // Gọi hàm checkout khi người dùng xác nhận "Có"
  };

  const handleShowConfirmModal = () => {
    setConfirmModalVisible(true); // Hiển thị modal khi người dùng nhấn nút
  };

  const handleCheckout = async () => {
    if (!paymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán');
      return;
    }

    const orderDetails = cartItems.map(item => ({
      flowerID: item.flowerID,
      quantity: item.quantity,
      price: item.price,
    }));

    const orderDate = new Date();
    const vnTimeOffset = 7 * 60;
    const vnDate = new Date(orderDate.getTime() + vnTimeOffset * 60 * 1000);

    const paymentMethodName = paymentMethod === 'vnpay' ? 'VNPay' : paymentMethod === 'momo' ? 'MoMo' : 'COD';

    const order = {
      orderDate: vnDate.toISOString(),
      totalPrice: totalPrice,
      shippingAddress: user?.address || 'Địa chỉ mặc định',
      user: { userID: user?.userID },
      delivery: {
        deliveryDate: new Date(new Date().getTime() + 6 * 24 * 60 * 60 * 1000).toISOString(),
        rating: 4,
        availableStatus: 'Đơn hàng đã nhận, người bán hàng sẽ giao cho bạn trong thời gian sớm nhất',
      },
      payment: {
        paymentID: paymentMethod === 'vnpay' ? 1 : paymentMethod === 'momo' ? 2 : 3,
        paymentMethodName: paymentMethodName,  // Add this line
      },
      orderDetails: orderDetails,
    };

    try {
      const response = await axios.post('http://localhost:8080/identity/orders/create', order);
      const createdOrder = response.data; // Assuming the response contains the created order details, including orderID
      console.log(createdOrder);
      if (response.status === 200 || response.status === 201) {
        // Add the orderID to the local order object
        if (createdOrder.orderID) {
          const orderWithID = { ...order, orderID: createdOrder.orderID };
          localStorage.setItem('order', JSON.stringify(orderWithID));
          console.log(orderWithID);
        }

        if (paymentMethod === 'vnpay') {
          const vnpUrl = createdOrder.message.split('Payment URL: ')[1];
          window.location.href = vnpUrl;
        } else if (paymentMethod === 'momo') {
          const momoUrl = createdOrder.message.split('Payment URL: ')[2];
          window.location.href = momoUrl;
        } else {
          alert('Đơn hàng đã được tạo thành công. Phương thức thanh toán: ' + paymentMethod);

          localStorage.removeItem('cartItems');
          if (typeof setCartItems === 'function') {
            setCartItems([]);
          }

          navigate('/success-page');
        }
      }
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error);
      alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau.');
    }
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
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
        <div className="order-summary">
          <h3>Tóm Tắt Đơn Hàng</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="order-item" key={item.flowerID}>
                <span>{item.flowerName}</span>
                <span>{item.quantity} x {item.price.toLocaleString()} VNĐ</span>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm trong giỏ hàng</p>
          )}
          <div className="total-price">
            <strong>Tổng cộng: {totalPrice.toLocaleString()} VNĐ</strong>
          </div>
        </div>

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
        <button className="checkout-btn" onClick={handleShowConfirmModal}>
          Xác Nhận Thanh Toán
        </button>

      </div>

      <Footer />
      {isConfirmModalVisible && (
        <div className="confirm-modal-overlay">
          <div className="confirm-modal">
            <p>Bạn có chắc chắn muốn mua hàng?</p>
            <div className="confirm-modal-buttons">
              <button onClick={handleConfirmCheckout} className="confirm-btn">Có</button>
              <button onClick={() => setConfirmModalVisible(false)} className="cancel-btn">Không</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Checkout;
