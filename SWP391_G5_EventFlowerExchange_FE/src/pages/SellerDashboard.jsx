import React, { useState, useEffect } from "react";
import CreatePost from "../components/profilepagecomponent/CreatePost.jsx";
import ManagePosts from "../components/profilepagecomponent/ManagePosts.jsx";
// Assuming you have a specific stylesheet
import "../styles/SellerDashboard.css";
import { useNavigate } from 'react-router-dom'; // Assuming you are using React Router for navigation

const SellerDashboard = () => {
  const [userID, setUserID] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('create-post'); // Default to 'create-post' tab
  const navigate = useNavigate(); // Use for programmatic navigation

  useEffect(() => {
    const fetchedUser = JSON.parse(localStorage.getItem("user"));

    if (fetchedUser && fetchedUser.userID) {
      setUserID(fetchedUser.userID);
    } else {
      setError("Không tìm thấy ID người dùng. Vui lòng đăng nhập lại.");
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate loading

    return () => clearTimeout(timer);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'create-post':
        return <CreatePost userID={userID} />;
      case 'manage-posts':
        return <ManagePosts userID={userID} />;
      default:
        return null;
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
    <div className="seller-dashboard">
      {loading ? (
        <div className="loading-spinner">
          <p>Đang tải dữ liệu...</p>
        </div>
      ) : (
        <div className="dashboard-layout">
          <aside className="sidebar-dashboard">
            <h2 className="sidebar-title">Bảng Điều Khiển Người Bán</h2>
            <button 
              className="back-to-profile-btn" 
              onClick={() => navigate('/profile-page') /* Navigate to ProfilePage */}
            >
              Quay lại trang thông tin cá nhân
            </button>
            <ul className="sidebar-menu">
              <li className={`menu-item ${activeTab === 'create-post' ? 'active' : ''}`}>
                <a href="#create-post" onClick={() => setActiveTab('create-post')}>Tạo bài post</a>
              </li>
              <li className={`menu-item ${activeTab === 'manage-posts' ? 'active' : ''}`}>
                <a href="#manage-posts" onClick={() => setActiveTab('manage-posts')}>Quản lý bài post</a>
              </li>
            </ul>
          </aside>
          <section className="dashboard-content">
            {error && <p className="error-message">{error}</p>}
            {renderTabContent()}
          </section>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
