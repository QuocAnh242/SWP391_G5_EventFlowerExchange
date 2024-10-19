import React, { useState, useEffect } from "react";
import ProfileInfo from '../components/profilepagecomponent/ProfileInfo.js'; 
import CreatePost from "../components/profilepagecomponent/CreatePost.js";
import ChangeInfor from "../components/profilepagecomponent/ChangeInfor.js";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [userID, setUserID] = useState(null);  // State to store userID

  useEffect(() => {
    // Giả sử bạn lấy userID từ localStorage hoặc từ API
    const fetchedUserID = localStorage.getItem('userID'); // Tạm thời set là 1 nếu chưa có
    setUserID(fetchedUserID);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInfo userID={userID}/>; // Truyền userID cho ProfileInfo nếu cần
      case 'change-infor':
        return <ChangeInfor userID={userID}/>;  // Truyền userID cho ChangeInfor
      case 'orders':
        return null; // Nội dung phần đơn hàng
      case 'create-post':
        return <CreatePost/>;
      default:
        return null;
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
              <li className={`menu-item ${activeTab === 'create-post' ? 'active' : ''}`}>
                <a href="#create-post" onClick={() => setActiveTab('create-post')}>Tạo Post</a>
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
