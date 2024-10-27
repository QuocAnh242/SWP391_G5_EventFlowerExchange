// ManageOrders.js

import React, { useState, useEffect } from "react";
import axios from 'axios';
 // Đảm bảo bạn có file CSS cho ManageOrders

const ManageSellerOrders = ({ userID }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/identity/orders/`); // API lấy đơn hàng cho user
        setOrders(response.data);
      } catch (err) {
        setError("Không thể tải dữ liệu đơn hàng.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userID]);

  const handleDeliveryStatusUpdate = async (deliveryID) => {
    try {
      await axios.put(`http://localhost:8080/identity/delivery/status/${deliveryID}`, {
        status: "Đã Giao"
      });
      setOrders(orders.map(order => 
        order.deliveryID === deliveryID ? { ...order, availableStatus: "Đã Giao" } : order
      ));
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="manage-seller-orders">
      <h3>Danh sách đơn hàng</h3>
      {error && <p className="error-message">{error}</p>}
      <div className="order-list">
        {orders.map((order) => (
          <div className="order-item" key={order.orderID}>
            <div className="order-details">
              <h3>Mã Đơn Hàng: {order.orderID}</h3>
              <p>Ngày Đặt: {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>Địa Chỉ: {order.shippingAddress}</p>
              <p>Tổng Giá: {order.totalPrice} VND</p>
              <p className="order-status">Trạng Thái: {order.status}</p>
              <button
                className="delivery-button"
                onClick={() => handleDeliveryStatusUpdate(order.orderID)}
                disabled={order.availableStatus === "Đã Giao"}
              >
                {order.availableStatus === "Đã Giao" ? "Đã Giao" : "Đánh Dấu Đã Giao"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSellerOrders;
