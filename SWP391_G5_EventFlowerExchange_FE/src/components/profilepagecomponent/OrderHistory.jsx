import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./OrderHistory.css";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/identity/orders/user/${user.userID}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Lỗi khi tải lịch sử đơn hàng:', error);
      }
    };

    fetchOrderHistory();
  }, [user.userID]);

  return (
    <div className="order-history">
      <h2>Lịch Sử Đơn Hàng</h2>
      {orders.length > 0 ? (
        orders.map(order => (
          <div key={order.orderID} className="order-item">
            <img src={order.productImage || "default-product.png"} alt="Product" />
            <div className="order-details">
              <h3>Đơn hàng #{order.orderID}</h3>
              <p>{order.productName}</p>
              <p className="order-total">{order.totalPrice}₫</p>
              <p>Ngày đặt: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p className="order-status">{order.status}</p>
              <p className="view-details">Xem chi tiết</p>
            </div>
          </div>
        ))
      ) : (
        <p>Không có đơn hàng nào</p>
      )}
    </div>
  );
};

export default OrderHistory;
