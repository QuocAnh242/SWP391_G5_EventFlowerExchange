import React, { useState, useEffect } from "react";
import axios from 'axios';
import './ManageSellerOrders.css';

const ManageSellerOrders = ({ userID }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('orderDetails'); // State to handle active tab

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/identity/order-details/orders-by-seller/${userID}`);
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
      await axios.put(`http://localhost:8080/identity/delivery/status/${deliveryID}`, { status: "Đã Giao" });
      setOrders(orders.map(order =>
        order.delivery.deliveryID === deliveryID
          ? { ...order, delivery: { ...order.delivery, availableStatus: "Đã Giao" } }
          : order
      ));
    } catch (err) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", err);
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
    setActiveTab('orderDetails'); // Set default tab to "Order Details" when modal opens
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader-spinner"></div>
        <p className="loader-text">Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="seller-orders-container">
      <h3 className="orders-title">Danh sách đơn hàng của người mua</h3>
      {error && <p className="error-text">{error}</p>}
      <div className="orders-list">
        {orders.map((orderItem) => (
          <div className="order-card" key={orderItem.order.orderID}>
            <div className="order-info">
              <h3 className="order-id">Mã Đơn Hàng: {orderItem.order.orderID}</h3>
              <p className="order-date">Ngày Đặt: {new Date(orderItem.order.orderDate).toLocaleDateString('vi-VN')}</p>
              <p className="order-address">Địa Chỉ: {orderItem.order.shippingAddress}</p>
              <p className="order-total">Tổng Giá: {orderItem.order.totalPrice.toLocaleString()} VND</p>
              <p className="order-status-text">Trạng Thái: {orderItem.order.status}</p>
              <p className="buyer-name">Người Mua: {orderItem.order.user.username}</p>
              <button className="details-button" onClick={() => viewOrderDetails(orderItem)}>Xem Chi Tiết</button>
              <button
                className="mark-delivered-button"
                onClick={() => handleDeliveryStatusUpdate(orderItem.delivery.deliveryID)}
                disabled={orderItem.delivery.availableStatus === "Đã Giao"}
              >
                {orderItem.delivery.availableStatus === "Đã Giao" ? "Đã Giao" : "Đánh Dấu Đã Giao"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalVisible && selectedOrder && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="order-modal">
            <span className="close-modal-button" onClick={closeModal}>×</span>
            
            {/* Tab Navigation */}
            <div className="modal-tabs">
              <button
                className={`tab-button ${activeTab === 'orderDetails' ? 'active' : ''}`}
                onClick={() => setActiveTab('orderDetails')}
              >
                Chi Tiết Đơn Hàng
              </button>
              <button
                className={`tab-button ${activeTab === 'productDetails' ? 'active' : ''}`}
                onClick={() => setActiveTab('productDetails')}
              >
                Chi Tiết Sản Phẩm
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'orderDetails' && (
              <div className="order-details-content">
                <h3 className="modal-title">Chi Tiết Đơn Hàng #{selectedOrder.order.orderID}</h3>
                <p><strong>Ngày Đặt:</strong> {new Date(selectedOrder.order.orderDate).toLocaleDateString('vi-VN')}</p>
                <p><strong>Địa Chỉ Giao Hàng:</strong> {selectedOrder.order.shippingAddress}</p>
                <p><strong>Người Mua:</strong> {selectedOrder.order.user.username}</p>
                <p><strong>Email Người Mua:</strong> {selectedOrder.order.user.email}</p>
                <p><strong>Phương Thức Thanh Toán:</strong> {selectedOrder.payment.method}</p>
                <p><strong>Trạng Thái Thanh Toán:</strong> {selectedOrder.payment.status}</p>
              </div>
            )}

            {activeTab === 'productDetails' && (
              <div className="product-details-content">
                <h4 className="product-details-title">Chi Tiết Sản Phẩm</h4>
                {selectedOrder.flowerBatchesWithQuantity?.map((item, index) => (
                  <div key={index} className="product-details">
                    <p><strong>Sản phẩm:</strong> {item.flowerBatch.flowerName}</p>
                    <p><strong>Số lượng:</strong> {item.orderQuantity}</p>
                    <p><strong>Giá:</strong> {item.flowerBatch.price.toLocaleString()} VND</p>
                    <p><strong>Thành tiền:</strong> {(item.orderQuantity * item.flowerBatch.price).toLocaleString()} VND</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageSellerOrders;
