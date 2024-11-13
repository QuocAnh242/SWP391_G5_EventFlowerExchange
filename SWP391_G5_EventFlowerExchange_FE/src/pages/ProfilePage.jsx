import React, { useState, useEffect } from "react";
import ProfileInfo from '../components/profilepagecomponent/ProfileInfo.jsx'; 
import ChangeInfor from "../components/profilepagecomponent/ChangeInfor.jsx";
import OrderHistory from "../components/profilepagecomponent/OrderHistory.jsx";
import BecomeSeller from "../components/profilepagecomponent/BecomeSeller.jsx";  
import "../styles/ProfilePage.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ProfilePage = () => {
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null);
  const [userRole, setUserRole] = useState(null); // State to hold user's role
  const navigate = useNavigate(); // Use useNavigate for redirection

  useEffect(() => {
    const fetchedUser = JSON.parse(localStorage.getItem('user'));

    if (fetchedUser && fetchedUser.userID) {
      setUserID(fetchedUser.userID);
      setUserRole(fetchedUser.role); // Set user role
      console.log(fetchedUser.role);  // Log user's role for debugging
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInfo userID={userID} />;
      case 'change-infor':
        return <ChangeInfor userID={userID} />;
      case 'orders':
        return <OrderHistory userID={userID} />;
      case 'become-seller':
        return <BecomeSeller userID={userID} setError={setError} />;
      default:
        return null;
    }
  };

  const handleSellerAccess = () => {
    // Check if the user has the SELLER role
    if (userRole === 'SELLER') {
      navigate('/seller-dashboard'); // Navigate to Seller Dashboard page
    } else {
      // If not a seller, show error message
      setError("Bạn chưa đăng kí trở thành người bán.");
    }
  };

  return (
    <div className="profile-page">
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <div className="profile-layout">
          <aside className="sidebar-profile-page">
            <h2 className="sidebar-profile-title">Cài Đặt Tài Khoản</h2>
            <ul className="sidebar-menu">
              <li className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}>
                <a href="#profile" onClick={() => setActiveTab('profile')}>Thông tin cá nhân</a>
              </li>
              <li className={`menu-item ${activeTab === 'change-infor' ? 'active' : ''}`}>
                <a href="#change-infor" onClick={() => setActiveTab('change-infor')}>Thay đổi thông tin</a>
              </li>
              <li className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`}>
                <a href="#orders" onClick={() => setActiveTab('orders')}>Đơn hàng của tôi</a>
              </li>
              <li className={`menu-item ${activeTab === 'become-seller' ? 'active' : ''}`}>
                <a href="#become-seller" onClick={() => setActiveTab('become-seller')}>Trở thành người bán hàng</a>
              </li>
              {/* Conditionally render the Seller Dashboard link */}
              <li className={`menu-item ${activeTab === 'seller-dashboard' ? 'active' : ''}`}>
                <a href="#seller-dashboard" onClick={handleSellerAccess}>Trang quản lý người bán</a>
              </li>
            </ul>
          </aside>
          <section className="profile-content">
            {error && <p className="error-message">{error}</p>}
            {renderTabContent()}
          </section>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
