import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("orderInfo");
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/identity/orders/user/${user.userID}`);
        setOrders(response.data || []);
        localStorage.setItem('orderHistory', JSON.stringify(response.data));
      } catch (error) {
        console.error('Error fetching order history:', error);
        setOrders([]);
      }
    };

    fetchOrderHistory();
  }, [user.userID]);

  const viewOrderDetails = async (orderID) => {
    try {
      const response = await axios.get(`http://localhost:8080/identity/order-details/by-order/${orderID}`);
      setSelectedOrderDetails(response.data);
      setModalVisible(true);
      setActiveTab("orderInfo");
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedOrderDetails(null);
  };

  const switchTab = (tab) => setActiveTab(tab);

  return (
<div className="order-history">
  <h2>Lịch Sử Đơn Hàng</h2>
  {orders.length > 0 ? (
    orders.map(order => (
      <div key={order.orderID} className="order-item">
        {/* <img src={order.productImage || "default-product.png"} alt="Product" /> */}
        <div className="order-details">
          <h3>Đơn hàng #{order.orderID}</h3>
          {/* <p>{order.productName}</p> */}
          <p className="order-total">{order.totalPrice.toLocaleString()} VNĐ</p>
          <p>Ngày đặt: {new Date(order.orderDate).toLocaleDateString('vi-VN')}</p>
          <p>Phương thức thanh toán: {order.status}</p>
          <button className="view-details" onClick={() => viewOrderDetails(order.orderID)}>Xem chi tiết</button>
        </div>
      </div>
    ))
  ) : (
    <p>Không có đơn hàng nào</p>
  )}

  {isModalVisible && (
    <>
      <div className="overlay" onClick={closeModal}></div>
      <div className="order-detail">
        <span className="close-btn" onClick={closeModal}>×</span>
        <div className="tab-menu">
          <button onClick={() => switchTab("orderInfo")} className={activeTab === "orderInfo" ? "active" : ""}>Thông Tin Đơn Hàng</button>
          <button onClick={() => switchTab("productDetails")} className={activeTab === "productDetails" ? "active" : ""}>Chi Tiết Sản Phẩm</button>
          <button onClick={() => switchTab("deliveryInfo")} className={activeTab === "deliveryInfo" ? "active" : ""}>Thông Tin Giao Hàng</button>
        </div>

        {/* Tab Thông Tin Đơn Hàng */}
        <div className={`tab-content ${activeTab === "orderInfo" ? "active" : ""}`}>
          <h3>Thông Tin Đơn Hàng</h3>
          {selectedOrderDetails && (
            <div className="order-info">
              <p><strong>Mã đơn hàng:</strong> {selectedOrderDetails[0]?.orderDetail?.order?.orderID}</p>
              <p><strong>Ngày đặt:</strong> {selectedOrderDetails[0]?.orderDetail?.order?.orderDate ? new Date(selectedOrderDetails[0]?.orderDetail?.order?.orderDate).toLocaleDateString('vi-VN') : "N/A"}</p>
              <p><strong>Tổng cộng:</strong> {selectedOrderDetails[0]?.orderDetail?.order?.totalPrice?.toLocaleString() || "0"}₫</p>
              <p><strong>Phương thức thanh toán:</strong> {selectedOrderDetails[0]?.orderDetail?.order?.paymentMethodName || "N/A"}</p>
              <p><strong>Địa chỉ giao hàng:</strong> {selectedOrderDetails[0]?.orderDetail?.order?.shippingAddress || "N/A"}</p>
              <p><strong>Trạng thái:</strong> {selectedOrderDetails[0]?.orderDetail?.order?.status || "N/A"}</p>
            </div>
          )}
        </div>

        {/* Tab Chi Tiết Sản Phẩm */}
        <div className={`tab-content ${activeTab === "productDetails" ? "active" : ""}`}>
          <h3>Chi Tiết Sản Phẩm</h3>
          {selectedOrderDetails && (
            <div className="order-details">
              {selectedOrderDetails.map((detail, index) => (
                <div key={index} className="product-detail">
                  <p><strong>Sản phẩm:</strong> {detail.orderDetail?.flowerBatch?.flowerName || "N/A"}</p>
                  <p><strong>Loại hoa:</strong> {detail.orderDetail?.flowerBatch?.category?.flowerType || "N/A"}</p>
                  <p><strong>Số lượng:</strong> {detail.orderDetail?.quantity || "0"}</p>
                  <p><strong>Giá đơn vị:</strong> {detail.orderDetail?.flowerBatch?.price?.toLocaleString() || "0"}₫</p>
                  <p><strong>Tổng tiền :</strong> {(detail.orderDetail?.quantity * detail.orderDetail?.flowerBatch?.price).toLocaleString() || "0"}₫</p>
                  {/* <p><strong>Trạng thái:</strong> {detail.orderDetail?.flowerBatch?.status || "N/A"}</p> */}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tab Thông Tin Giao Hàng */}
        <div className={`tab-content ${activeTab === "deliveryInfo" ? "active" : ""}`}>
          <h3>Thông Tin Giao Hàng</h3>
          {selectedOrderDetails && (
            <div className="delivery-info">
              <p><strong>Ngày giao hàng dự kiến:</strong> {selectedOrderDetails[0]?.delivery?.deliveryDate ? new Date(selectedOrderDetails[0]?.delivery?.deliveryDate).toLocaleDateString('vi-VN') : "N/A"}</p>
              {/* <p><strong>Đánh giá:</strong> {selectedOrderDetails[0]?.delivery?.rating || "Chưa có"}</p> */}
              <p><strong>Trạng thái giao hàng:</strong> {selectedOrderDetails[0]?.delivery?.availableStatus || "N/A"}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )}
</div>

  );
};

export default OrderHistory;
