// src/pages/ProfilePage.js
import React, { useState, useEffect } from "react";
// import Footer from '../components/Footer';
import ProfileInfo from '../components/profilepagecomponent/ProfileInfo.js'; // Import ProfileInfoComponent
import CreatePost from "../components/profilepagecomponent/CreatePost.js";
// import axios from "axios";
import "../styles/ProfilePage.css";


const ProfilePage = () => {
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [loggedInUserID, setLoggedInUserID] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));

    if (loggedInUser && loggedInUser.userID) {
      setLoggedInUserID(loggedInUser.userID);
    } else {
      setError("No user is logged in.");
    }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileInfo userID={loggedInUserID} />; // Render ProfileInfoComponent with userID
      case 'password':
        return 
      case 'orders':
        return 
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
            <h2 className="sidebar-profile-title">Account Settings</h2>
            <ul className="sidebar-menu">
              <li className={`menu-item ${activeTab === 'profile' ? 'active' : ''}`}>
                <a href="#profile" onClick={() => setActiveTab('profile')}>Profile Info</a>
              </li>
              <li className={`menu-item ${activeTab === 'password' ? 'active' : ''}`}>
                <a href="#password" onClick={() => setActiveTab('password')}>Change Password</a>
              </li>
              <li className={`menu-item ${activeTab === 'orders' ? 'active' : ''}`}>
                <a href="#orders" onClick={() => setActiveTab('orders')}>My Orders</a>
              </li>
              <li className={`menu-item ${activeTab === 'create-post' ? 'active' : ''}`}>
                <a href="#create-post" onClick={() => setActiveTab('create-post')}>Create Post</a>
              </li>
            </ul>
          </aside>
          <section className="profile-content">
            <h1 className="profile-header">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
            </h1>
            {error && <p className="error-message">{error}</p>}
            {renderTabContent()}
          </section>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
